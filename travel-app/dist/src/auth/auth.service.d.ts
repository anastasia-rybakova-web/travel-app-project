import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly emailClient;
    constructor(prisma: PrismaService, jwtService: JwtService, emailClient: ClientProxy);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: number;
            username: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: number;
            username: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        token: string;
    }>;
    private generateToken;
    getProfile(userId: number): Promise<{
        guide: {
            userId: number;
            name: string;
            phone: string | null;
            email: string | null;
            photo: string | null;
            about: string | null;
            rating: import("@prisma/client/runtime/library").Decimal;
        };
        tourist: {
            userId: number;
            name: string;
            email: string | null;
            photo: string | null;
        };
        id: number;
        username: string;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
}
