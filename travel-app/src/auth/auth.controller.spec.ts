import { Test, TestingModule} from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    getProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto: RegisterDto = {
        username: 'testuser',
        password: 'password123',
        role: 'tourist',
      };

      const expectedResponse = {
        user: { id: 1, username: 'testuser', role: 'tourist' },
        token: 'jwt-token',
      };

      mockAuthService.register.mockResolvedValue(expectedResponse);

      const result = await controller.register(registerDto);

      expect(result).toEqual(expectedResponse);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(authService.register).toHaveBeenCalledTimes(1);
    });

    it('should throw error when user already exists', async () => {
      const registerDto: RegisterDto = {
        username: 'existinguser',
        password: 'password123',
        role: 'tourist',
      };

      mockAuthService.register.mockRejectedValue(new Error('Такой пользователь уже существует'));

      await expect(controller.register(registerDto)).rejects.toThrow('Такой пользователь уже существует');
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'password123',
      };

      const expectedResponse = {
        user: { id: 1, username: 'testuser', role: 'tourist' },
        token: 'jwt-token',
      };

      mockAuthService.login.mockResolvedValue(expectedResponse);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expectedResponse);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should throw error when credentials are invalid', async () => {
      const loginDto: LoginDto = {
        username: 'wronguser',
        password: 'wrongpass',
      };

      mockAuthService.login.mockRejectedValue(new Error('Неверный пароль'));

      await expect(controller.login(loginDto)).rejects.toThrow('Неверный пароль');
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const mockRequest = { user: { userId: 1 } };
      const expectedProfile = {
        id: 1,
        username: 'testuser',
        role: 'tourist',
        tourist: { name: 'testuser', photo: '' },
      };

      mockAuthService.getProfile.mockResolvedValue(expectedProfile);

      const result = await controller.getProfile(mockRequest);

      expect(result).toEqual(expectedProfile);
      expect(authService.getProfile).toHaveBeenCalledWith(1);
    });
  });
});