import { Injectable, UnauthorizedException, ConflictException, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  @Inject('EMAIL_SERVICE') private readonly emailClient: ClientProxy, 
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password, role, phone, email } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      throw new ConflictException('Такой пользователь уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.$transaction(async (prisma) => {
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          role: role as any,
        },
      });

      if (role === 'tourist') {
        await prisma.tourist.create({
          data: {
            userId: newUser.id,
            name: username,
            photo: '',
            email: email || '', 
          },
        });

      } else if (role === 'guide') {
        await prisma.guide.create({
          data: {
            userId: newUser.id,
            name: username,
            about: '',
            phone: phone || '',
            email: email || '',
            photo: '',
            rating: 0,
          },
        });
      }

      return newUser;
    });

 if (email) {
      this.emailClient.emit('user_registered', {
        email,
        username,
        role,
      });
    }
    
    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      token,
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не существует');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      token,
    };
  }

  private generateToken(user: any) {
    const payload = { 
      sub: user.id, 
      username: user.username, 
      role: user.role 
    };
    return this.jwtService.sign(payload);
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        guide: true,
        tourist: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}