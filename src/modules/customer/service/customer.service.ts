import { Injectable } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';
import { CreateCustomerInput, CustomerUpdate } from '../customer.type';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async signupUser(payload: CreateCustomerInput) {
    const existUser = await this.customerRepository.findByPhone(payload.phone);
    if (existUser) {
      throw new Error(`User with phone ${payload.phone} already exists`);
    }
    return this.customerRepository.create(payload);
  }

  async updateUser(customerId: string, payload: CustomerUpdate) {
    const existUser = await this.customerRepository.findById(customerId);
    if (!existUser) {
      throw new Error(`User with id ${customerId} does not exist`);
    }
    return this.customerRepository.update(customerId, payload);
  }
}
