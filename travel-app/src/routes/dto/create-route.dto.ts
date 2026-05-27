import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRouteDto {
  @ApiProperty({ example: 'Замки Беларуси', description: 'Название маршрута' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Посетите потрясающие памятники архитектуры', description: 'Краткое описание' })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiPropertyOptional({ example: 'Отправьтесь в уникальное путешествие...', description: 'Полное описание' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '3 дня', description: 'Длительность' })
  @IsOptional()
  @IsString()
  duration?: string;

  @ApiPropertyOptional({ example: '15', description: 'Количество человек' })
  @IsOptional()
  @IsString()
  people?: string;

  @ApiPropertyOptional({ example: '200', description: 'Цена' })
  @IsOptional()
  @IsString()
  price?: string;

  @ApiPropertyOptional({ example: 'исторический, культурный', description: 'Тип маршрута' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: ['https://example.com/photo1.jpg'], description: 'Фотографии' })
  @IsOptional()
  @IsArray()
  photos?: string[];

  @ApiPropertyOptional({ example: 1, description: 'ID гида' })
  @IsOptional()
  @IsNumber()
  guideUserId?: number;

  @ApiPropertyOptional({ example: [1, 2, 3], description: 'ID мест, входящих в маршрут' })
  @IsOptional()
  @IsArray()
  placeIds?: number[];

  @ApiPropertyOptional({ example: ['2026-06-13', '2026-06-14'], description: 'Даты проведения' })
  @IsOptional()
  @IsArray()
  dates?: Date[];
}