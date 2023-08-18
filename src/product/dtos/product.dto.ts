import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number


  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  rating: number


  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number


  @IsNotEmpty()
  @IsString()
  brand: string


  @IsNotEmpty()
  @IsString()
  category: string
}

