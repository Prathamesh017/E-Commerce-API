import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';



@Module({
  imports: [AuthModule, ProductModule, CartModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('cart', "order");
  }
}
