import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { UserInfo, responseInterface } from 'src/interface/inteface';
import { CartService } from './cart.service';
import { AddCartDto, DeleteDto } from './dtos/cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



@ApiTags("cart")
@ApiBearerAuth("JWT-auth")
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {

  }


  @Get("view")
  public async getCart(@User() user: UserInfo): Promise<responseInterface> {

    const cart = await this.cartService.getCartById(user.id);
    const result: responseInterface = {
      message: "Cart Items",
      size: cart?.items.length || 0,
      data: [cart] || []
    }
    return result;

  }

  @Post("add")
  public async createCart(@Body() addCartDto: AddCartDto, @User() user: UserInfo): Promise<responseInterface> {
    let { productId, quantity } = addCartDto
    const Cart = await this.cartService.addToCart(productId, user.id, quantity);
    let result: responseInterface
      = {
      message: "Items Added to the Cart",
      size: Cart.items.length,
      data: [Cart]
    }
    return result;
  }
  @Post("remove")
  public async deleteCart(@Body() addCartDto: DeleteDto, @User() user: UserInfo): Promise<responseInterface> {
    let { productId } = addCartDto
    const cart = await this.cartService.deleteFromCart(productId, user.id,);
    let result: responseInterface = {
      message: "Items Updated to the Cart",
      size: cart.items.length,
      data: [cart]
    }
    return result;
  }
}
