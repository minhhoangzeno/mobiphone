import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get('/:categoryId')
  async getProduct(@Param('categoryId') categoryId) {
    return this.productService.findByCategory(categoryId);
  }

  @Get('home/iphone')
  async getProductHome() {
    return this.productService.findByCategoryIphone();
  }

  @Get('category/amount')
  async getProducAmountCategory() {
    return this.productService.amountProductsByCategory();
  }

  @Get('home/new')
  async getNewProductsHome() {
    return this.productService.findNewProducts();
  }


  @Get('admin/skip?')
  async getProductAdmin(@Query('categoryId') categoryId, @Query('skipNumber') skipNumber) {
    return this.productService.findByCategoryAdmin(categoryId, skipNumber);
  }

  @Get('detail/:productId')
  async getProductById(@Param('productId') productId) {
    return this.productService.findById(productId);
  }

  @Get()
  async getProductByDate() {
    return this.productService.findByCreateDate();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${(file.originalname)}`)
      }
    })
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: ProductDto) {
    return this.productService.create(body, file.filename)
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        cb(null, `${randomName}${(file.originalname)}`)
      }
    })
  }))
  async updateBlog(@UploadedFile() file: Express.Multer.File, @Body() body, @Param('id') id) {
    if (file) {
      return this.productService.edit(id, body, file.filename)
    } else {
      return this.productService.edit(id, body)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async removeBlog(@Param('id') id) {
    return this.productService.delete(id)
  }

}
