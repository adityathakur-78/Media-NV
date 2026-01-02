import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer-dto-';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCustomers() {
    return this.customerService.getAllCustomers();
  }

  @Post()
  addCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    return this.customerService.addCustomer(createCustomerDTO);
  }
}
