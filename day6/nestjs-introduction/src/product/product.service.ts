import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    { id: 1, name: 'mobile', price: 20000 },
    { id: 2, name: 'tablet', price: 40000 },
    { id: 3, name: 'Laptop', price: 80000 },
  ];
  getAllProducts() {
    return this.products;
  }
  getProductById(id: number) {
    return this.products.find((products) => products.id == id);
  }
}
