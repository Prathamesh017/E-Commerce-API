import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { UserInfo, responseInterface } from 'src/interface/inteface';
import { CartService } from './cart.service';
import { AddCartDto, DeleteDto } from './dtos/cart.dto';




@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {

  }


  @Get("view")
  public async getCart(@User() user: UserInfo): Promise<responseInterface> {
    return this.cartService.getCart(user.id);

  }

  @Post("add")
  public async createCart(@Body() addCartDto: AddCartDto, @User() user: UserInfo): Promise<responseInterface> {
    let { productId, quantity } = addCartDto
    return this.cartService.addToCart(productId, user.id, quantity);
  }
  @Post("remove")
  public async deleteCart(@Body() addCartDto: DeleteDto, @User() user: UserInfo): Promise<responseInterface> {
    let { productId } = addCartDto
    return this.cartService.deleteFromCart(productId, user.id,);
  }
}
