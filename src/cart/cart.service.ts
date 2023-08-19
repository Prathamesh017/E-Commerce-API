import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { responseInterface } from 'src/interface/inteface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService, private readonly productService: ProductService) {
  }
  public async getCartById(userId: string): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    })




    return cart;
  }

  public async addToCart(productId: string, userId: string, quantity: number): Promise<Cart> {

    if (!this.productService.isObjectIdValid(productId)) {
      throw new BadRequestException("Invalid Product  Id")
    }
    await this.productService.getProductById(productId);

    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    })

    let new_cart: Cart;
    if (!cart) {
      new_cart = await this.prisma.cart.create({
        data: {
          userId,
          items: [
            {
              productId,
              quantity,
            }
          ]
        }
      })

    }
    else {
      cart.items.push({ productId, quantity })
      new_cart = await this.prisma.cart.update({
        where: {
          userId,
        },
        data: {
          items: cart.items,
        },
      })

    }





    return new_cart;
  }
  public async deleteFromCart(productId: string, userId: string): Promise<Cart> {

    if (!this.productService.isObjectIdValid(productId)) {
      throw new BadRequestException("Invalid Product  Id")
    }
    await this.productService.getProductById(productId);

    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    })

    if (!cart) {
      throw new BadRequestException("No Cart Exists to Delete From")

    }
    cart.items = cart?.items.filter((item) => {
      return item.productId !== productId
    })




    let new_cart = await this.prisma.cart.update({
      where: {
        userId,
      },
      data: {
        items: cart.items,
      },
    })





    return new_cart
  }
  public async emptyCartById(cartId: string) {

    if (!this.productService.isObjectIdValid(cartId)) {
      throw new BadRequestException("Invalid Id")
    }







    await this.prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        items: [],
      },
    })






  }
}
