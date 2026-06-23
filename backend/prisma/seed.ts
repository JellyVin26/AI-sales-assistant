import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a demo user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@salespilot.com' },
    update: {},
    create: {
      email: 'demo@salespilot.com',
      password: hashedPassword,
      firstName: 'Alex',
      lastName: 'Admin',
      role: 'ADMIN',
      business: {
        create: {
          name: 'Acme Solutions',
          description: 'Empowering small businesses with AI-driven lead generation.',
          website: 'https://acmesolutions.com',
        }
      }
    },
    include: { business: true }
  });

  const businessId = user.business!.id;

  // 2. Add some products
  const products = [
    { name: 'Product A (Pro Pack)', price: 499, stock: 50, isActive: true },
    { name: 'Product B (Basic)', price: 199, stock: 100, isActive: true },
    { name: 'Cloud Add-on', price: 99, stock: 500, isActive: true },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: { ...p, businessId }
    });
  }

  // 3. Add some recent conversations
  const conversations = [
    { customerName: 'John Doe', customerEmail: 'john@example.com', status: 'ACTIVE' as any },
    { customerName: 'Sarah Miller', customerEmail: 'sarah@example.com', status: 'CLOSED' as any },
    { customerName: 'Robert King', customerEmail: 'robert@example.com', status: 'ACTIVE' as any },
    { customerName: 'Emily Lee', customerEmail: 'emily@example.com', status: 'ACTIVE' as any },
  ];

  for (const c of conversations) {
    const conv = await prisma.conversation.create({
      data: { ...c, businessId }
    });

    // Add a message to each
    await prisma.message.create({
      data: {
        content: `Hi, I am interested in your products.`,
        role: 'USER',
        conversationId: conv.id
      }
    });
    
    await prisma.message.create({
      data: {
        content: `Hello! I'm the SalesPilot AI. How can I help you today?`,
        role: 'ASSISTANT',
        conversationId: conv.id
      }
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
