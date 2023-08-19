import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/product.dto';
import { responseInterface } from 'src/interface/inteface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("product")
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @Get()
  public async getAllProducts(): Promise<responseInterface> {
    const products = await this.productService.getAllProducts()
    const result: responseInterface = {
      message: "List of All Products",
      size: products.length,
      data: products
    }
    return result;
  }


  @Get('/category')
  public async getCategories(): Promise<responseInterface> {
    const categoryArr = await this.productService.getAllCategories();
    const result: responseInterface = {
      message: "All Categories",
      data: categoryArr
    }

    return result;
  }
  @Get(':id')
  public async getProduct(@Param("id") id: string): Promise<responseInterface> {
    const product = await this.productService.getProductById(id);
    const result: responseInterface = {
      message: "Product Details",
      data: [product]
    }

    return result;
  }

  @Post(":secretKey")
  public async addProducts(@Body() createProductDto: CreateProductDto, @Param('secretKey') secretKey: string): Promise<responseInterface> {

    let { title, description, price, rating, stock, brand, category } = createProductDto
    const product = await this.productService.addProduct(title, description, price, rating, stock, brand, category, secretKey)
    const result: responseInterface = {
      message: "Product Added Successfully",
      data: [product]
    }

    return result;
  }

}
