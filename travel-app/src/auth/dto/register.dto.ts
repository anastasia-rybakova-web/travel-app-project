import { IsString, IsEmail, IsOptional, MinLength, IsIn, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john_doe', description: 'Имя пользователя' })
  @IsString()
  @MinLength(3, { message: 'Имя пользователя должно быть не менее 3 символов' })
  username: string;

  @ApiProperty({ example: 'password123', description: 'Пароль' })
  @IsString()
  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;

  @ApiProperty({ example: 'tourist', enum: ['guide', 'tourist'], description: 'Роль пользователя' })
  @IsIn(['guide', 'tourist'], { message: 'Роль должна быть guide или tourist' })
  role: 'guide' | 'tourist';

  @ApiPropertyOptional({ example: '+375291234567', description: 'Телефон (только для гидов)' })
  @IsOptional()
  @Matches(/^[\+]?[0-9\s\-\(\)]+$/, { message: 'Некорректный формат телефона' })
  phone?: string;

  @ApiPropertyOptional({ example: 'user@mail.ru', description: 'Email (для гидов и туристов)' }) 
  @IsOptional()
  @IsEmail({}, { message: 'Некорректный формат email' })
  email?: string;

}