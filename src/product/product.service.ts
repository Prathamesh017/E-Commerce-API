import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { responseInterface } from 'src/interface/inteface';
import { PrismaService } from 'src/prisma/prisma.service';
import mongoose from 'mongoose';

@Injectable()
export class ProductService {

  constructor(private prisma: PrismaService) { }
  public async addProduct(title: string, description: string, price: number, rating: number, stock: number, brand: string, category: string, secretKey: string): Promise<Product> {
    if (process.env.SECRET_ADMIN_KEY !== secretKey) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const product: Product = await this.prisma.product.create({
      data: {
        title,
        description,
        price,
        rating,
        stock,
        brand,
        category

      }
    })
    return product;

  }

  public async getAllProducts(): Promise<Product[]> {
    const products = await this.prisma.product.findMany()


    return products;
  }

  public async getProductById(id: string): Promise<Product> {

    if (!this.isObjectIdValid(id)) {
      throw new BadRequestException("Invalid Id")
    }
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      }
    })
    if (!product) {
      throw new NotFoundException("Product Not Found")
    }

    return product;
  }

  public async getAllCategories(): Promise<String[]> {
    const allCategories = await this.prisma.product.findMany({
      distinct: ['category'],
      select: {
        category: true,
      },
    })

    const categoryArr = allCategories.map((obj) => { return obj.category })

    return categoryArr
  }


  public isObjectIdValid(id: string) {
    let ObjectId = mongoose.Types.ObjectId;
    if (ObjectId.isValid(id)) {
      if ((String)(new ObjectId(id)) === id)
        return true;
      return false;
    }
    return false;
  }
}
