import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class AddCartDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
export class DeleteDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: string;
}

