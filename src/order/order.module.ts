import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartModule } from 'src/cart/cart.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [PrismaModule, CartModule, ProductModule]
})
export class OrderModule { }
