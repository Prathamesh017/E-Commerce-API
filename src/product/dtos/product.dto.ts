import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  rating: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  brand: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string
}

