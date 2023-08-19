import { Controller, Get, Param, Post } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { UserInfo, responseInterface } from 'src/interface/inteface';
import { OrderService } from './order.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags("order")
@ApiBearerAuth("JWT-auth")
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {

  }


  @Get("history")
  public async getOrderHistory(@User() user: UserInfo): Promise<responseInterface> {

    const order = await this.orderService.getOrderHistory(user.id)
    const result: responseInterface = {
      message: "Order History",
      data: order
    }
    return result;

  }
  @Get(":id")
  public async getOrder(@User() user: UserInfo, @Param('id') id: string): Promise<responseInterface> {
    const order = await this.orderService.getOrderById(id, user.id)
    const result: responseInterface = {
      message: "Order Details",
      data: [order]
    }
    return result;

  }
  @Post()
  public async createOrder(@User() user: UserInfo): Promise<responseInterface> {
    const order = await this.orderService.createOrder(user.id)
    const result: responseInterface = {
      message: "Order Placed Successfully",
      data: [order]
    }
    return result;

  }
}
