import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/product.dto';
import { responseInterface } from 'src/interface/inteface';


@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @Get()
  public async getAllProducts(): Promise<responseInterface> {
    return this.productService.getAllProducts()
  }


  @Get('/category')
  public async getCategories(): Promise<responseInterface> {
    return await this.productService.getAllCategories();
  }
  @Get(':id')
  public async getProduct(@Param("id") id: string): Promise<responseInterface> {
    return await this.productService.getProductById(id);
  }

  @Post(":secretKey")
  public async addProducts(@Body() createProductDto: CreateProductDto, @Param('secretKey') secretKey: string): Promise<responseInterface> {

    let { title, description, price, rating, stock, brand, category } = createProductDto
    return this.productService.addProduct(title, description, price, rating, stock, brand, category, secretKey)
  }

}
