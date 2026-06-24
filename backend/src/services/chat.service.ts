import OpenAI from 'openai';
import { ConversationRepository, MessageRepository, ProductRepository, DocumentRepository, BusinessRepository } from '../repositories';
import { SendMessageRequest, ChatResponse } from '../dtos';
import { NotFoundError } from '../exceptions';
import { env, prisma } from '../config';

export class ChatService {
  private conversationRepository: ConversationRepository;
  private messageRepository: MessageRepository;
  private productRepository: ProductRepository;
  private documentRepository: DocumentRepository;
  private businessRepository: BusinessRepository;
  private openai: OpenAI;

  constructor() {
    this.conversationRepository = new ConversationRepository();
    this.messageRepository = new MessageRepository();
    this.productRepository = new ProductRepository();
    this.documentRepository = new DocumentRepository();
    this.businessRepository = new BusinessRepository();
    this.openai = new OpenAI({ apiKey: env.openai.apiKey });
  }

  async sendMessage(businessId: string, data: SendMessageRequest): Promise<ChatResponse> {
    // Get or create conversation
    let conversation;
    if (data.conversationId) {
      conversation = await this.conversationRepository.findById(data.conversationId);
      if (!conversation) throw new NotFoundError('Conversation');
    } else {
      conversation = await this.conversationRepository.create({
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        business: { connect: { id: businessId } },
      });
    }

    // Save user message
    const userMessage = await this.messageRepository.create({
      content: data.message,
      role: 'USER',
      conversation: { connect: { id: conversation.id } },
    });

    // If conversation is closed (human takeover), AI should not respond
    if (conversation.status === 'CLOSED') {
      return {
        conversationId: conversation.id,
        message: {
          id: userMessage.id,
          content: userMessage.content,
          role: userMessage.role,
          createdAt: userMessage.createdAt,
        },
      };
    }

    // Build context
    const context = await this.buildContext(businessId);
    const messages = await this.messageRepository.findByConversationId(conversation.id);

    // Get AI response
    const aiResponse = await this.getAIResponse(context, messages, data.message);

    // Save AI response
    const assistantMessage = await this.messageRepository.create({
      content: aiResponse,
      role: 'ASSISTANT',
      conversation: { connect: { id: conversation.id } },
    });

    return {
      conversationId: conversation.id,
      message: {
        id: assistantMessage.id,
        content: assistantMessage.content,
        role: assistantMessage.role,
        createdAt: assistantMessage.createdAt,
      },
    };
  }

  async getConversations(userId: string, page: number = 1, limit: number = 10) {
    const business = await this.businessRepository.findByUserId(userId);
    if (!business) throw new NotFoundError('Business');
    return this.conversationRepository.findByBusinessId(business.id, page, limit);
  }

  async getConversation(conversationId: string) {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) throw new NotFoundError('Conversation');
    return conversation;
  }

  async takeoverConversation(businessId: string, conversationId: string) {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) throw new NotFoundError('Conversation');
    if (conversation.businessId !== businessId) throw new Error('Unauthorized');

    return this.conversationRepository.updateStatus(conversationId, 'CLOSED');
  }

  async replyToConversation(businessId: string, conversationId: string, message: string) {
    const conversation = await this.conversationRepository.findById(conversationId);
    if (!conversation) throw new NotFoundError('Conversation');
    if (conversation.businessId !== businessId) throw new Error('Unauthorized');

    const adminMessage = await this.messageRepository.create({
      content: message,
      role: 'SYSTEM',
      conversation: { connect: { id: conversationId } },
    });

    // Update conversation's updatedAt timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    });

    return {
      id: adminMessage.id,
      content: adminMessage.content,
      role: adminMessage.role,
      createdAt: adminMessage.createdAt,
    };
  }

  private async buildContext(businessId: string): Promise<string> {
    const products = await this.productRepository.findActiveByBusinessId(businessId);
    const documents = await this.documentRepository.findAllByBusinessId(businessId);

    let context = '## Available Products:\n';
    products.forEach((p) => {
      context += `- ${p.name}: ${p.description || 'No description'} | Price: $${p.price} | Stock: ${p.stock} | SKU: ${p.sku || 'N/A'}\n`;
    });

    context += '\n## Business Knowledge Base:\n';
    documents.forEach((d) => {
      if (d.content) {
        context += `### ${d.title}:\n${d.content.substring(0, 2000)}\n\n`;
      }
    });

    return context;
  }

  private async getAIResponse(
    context: string,
    previousMessages: { content: string; role: string }[],
    currentMessage: string
  ): Promise<string> {
    const systemPrompt = `You are a helpful AI sales assistant. Your job is to assist customers with their questions about products, shipping, payment, return policies, and recommendations.

IMPORTANT RULES:
1. Only answer questions based on the provided context (products and knowledge base).
2. If you don't know the answer, say "I don't have that information. Please contact our support team for more details."
3. Never make up information or hallucinate.
4. Be friendly, professional, and helpful.
5. When recommending products, only suggest products from the available inventory.
6. If a customer seems ready to purchase, guide them through the next steps.

Business Context:
${context}`;

    const chatMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...previousMessages.slice(-10).map((m) => ({
        role: m.role.toLowerCase() as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user', content: currentMessage },
    ];

    // Check if we have a real API key or a placeholder
    if (!env.openai.apiKey || env.openai.apiKey === 'your_openai_api_key_here') {
      console.warn('Using simulated OpenAI response because OPENAI_API_KEY is not configured');
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return `(Simulated AI Response) Hello! Thanks for reaching out. Based on your message "${currentMessage}", I can help you find what you're looking for. Our store has many great products. How can I assist you further today?`;
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: env.openai.model,
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0]?.message?.content || 'I apologize, I was unable to generate a response. Please try again.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate AI response. Please check your API key configuration.');
    }
  }
}
