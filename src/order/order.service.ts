import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CartService } from 'src/cart/cart.service';
import { GetOrders, Item } from 'src/interface/inteface';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { Order } from 'src/interface/inteface';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private cartService: CartService, private productService: ProductService) {

  }
  public async createOrder(userId: string): Promise<Order> {

    const cart = await this.cartService.getCartById(userId);


    if (!cart || cart.items.length === 0) {
      throw new NotFoundException("No Items Added In Cart")
    }

    const totalPrice = await this.calculateTotal(cart.items)
    const allProducts = await this.getAllProducts(cart.items)

    const order = await this.prisma.order.create({
      data: {
        cartId: cart.id,
        userId,
        totalPrice,
        orderNumber: await this.generateOrderId(),
        products: cart.items
      }
    })

    await this.cartService.emptyCartById(cart.id)
    return {
      orderNumber: order.orderNumber,
      id: order.id,
      userId: order.userId,
      cartId: order.cartId,
      totalPrice: order.totalPrice,
      products: allProducts
    }




  }
  public async getOrderHistory(userId: string): Promise<GetOrders> {

    const allOrders = []
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
      },
    })
    if (orders?.length === 0) {
      throw new NotFoundException("No Orders Created")
    }

    for (let index = 0; index < orders.length; index++) {
      const products = await this.getAllProducts(orders[index].products)
      allOrders.push({ id: orders[index].id, totalPrice: orders[index].totalPrice, orderNumber: orders[index].orderNumber, products: products })

    }

    return {
      userId: orders[0].userId,
      cartId: orders[0].cartId,
      orders: allOrders

    }


  }

  public async getOrderById(id: string, userId: string): Promise<Order> {
    if (!this.productService.isObjectIdValid(id)) {
      throw new BadRequestException("Invalid Id")
    }

    const order = await this.prisma.order.findUnique({
      where: {
        id: id,
        userId: userId,
      }
    })
    if (!order) {
      throw new NotFoundException("Order Doesn't Exist")
    }

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      userId: order.userId,
      cartId: order.cartId,
      totalPrice: order.totalPrice,
      products: await this.getAllProducts(order.products)
    }


  }

  private async calculateTotal(items: Item[]): Promise<number> {

    let totalPrice = 0;
    for (let index = 0; index < items.length; index++) {
      const product = await this.productService.getProductById(items[index].productId);
      totalPrice += product.price * items[index].quantity

    }
    return totalPrice

  }
  private async getAllProducts(items: Item[]): Promise<Product[]> {

    let productArr = [];
    for (let index = 0; index < items.length; index++) {
      const product = await this.productService.getProductById(items[index].productId);
      productArr.push(product)

    }
    return productArr;
  }
  public async generateOrderId() {
    try {
      const orders = (await this.prisma.order.findMany({})).length + 1
      const paddedCounter = String(orders).padStart(4, '0')
      return `Order-${paddedCounter}`
    } catch (error) {
      throw new Error(error)
    }
  }
}
