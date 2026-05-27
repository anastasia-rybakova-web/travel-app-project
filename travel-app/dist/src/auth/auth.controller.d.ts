import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    getProfile(req: any): Promise<{
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
