import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories';
import { BusinessRepository } from '../repositories';
import { RegisterRequest, LoginRequest, AuthResponse } from '../dtos';
import { ConflictError, UnauthorizedError } from '../exceptions';
import { env } from '../config';

export class AuthService {
  private userRepository: UserRepository;
  private businessRepository: BusinessRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.businessRepository = new BusinessRepository();
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.userRepository.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    await this.businessRepository.create({
      name: data.businessName,
      userId: user.id,
    });

    const token = this.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = this.generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    const business = await this.businessRepository.findByUserId(userId);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      business: business ? { id: business.id, name: business.name } : null,
    };
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, env.jwt.secret, {
      expiresIn: env.jwt.expiresIn,
    } as jwt.SignOptions);
  }
}
