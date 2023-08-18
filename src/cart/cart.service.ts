import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart, Prisma } from '@prisma/client';
import { responseInterface } from 'src/interface/inteface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService, private readonly productService: ProductService) {
  }
  public async getCart(userId: string): Promise<responseInterface> {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    })


    const result: responseInterface = {
      message: "Cart Items",
      size: cart?.items.length || 0,
      data: [cart] || []
    }

    return result;
  }

  public async addToCart(productId: string, userId: string, quantity: number): Promise<responseInterface> {

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

    console.log(new_cart);
    let result: responseInterface
      = {
      message: "Items Added to the Cart",
      size: new_cart.items.length,
      data: [new_cart]
    }


    return result;
  }
  public async deleteFromCart(productId: string, userId: string): Promise<responseInterface> {

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



    let result: responseInterface = {
      message: "Items Updated to the Cart",
      size: new_cart.items.length,
      data: [new_cart]
    }

    return result
  }
}
