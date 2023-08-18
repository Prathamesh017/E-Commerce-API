import { IsNotEmpty, IsPositive } from 'class-validator';

export class AddCartDto {
  @IsNotEmpty()
  productId: string;
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
export class DeleteDto {
  @IsNotEmpty()
  productId: string;
}

