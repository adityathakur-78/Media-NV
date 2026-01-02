import { Injectable } from '@nestjs/common';
import { Customer } from './interface/customer-interface';
import { CreateCustomerDTO } from './dto/create-customer-dto-';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [];

  getAllCustomers(): Customer[] {
    return this.customers;
  }

  addCustomer(CreateCustomerDTO: CreateCustomerDTO): Customer {
    const newCustomer: Customer = {
      id: Date.now(),
      ...CreateCustomerDTO,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
}
