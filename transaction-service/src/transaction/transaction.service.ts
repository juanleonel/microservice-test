import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { AccountApiResponse } from '../dto/account.dto';
import { KafkaService } from 'src/kafka/kafka.service';

const BASE_URL = `http://localhost:3001/v1`;

@Injectable()
export class TransactionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly kafkaService: KafkaService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { accountId, description } = createTransactionDto;

    const accountApiResponse = await this.httpService.axiosRef.get<any>(
      `${BASE_URL}/accounts/${accountId}`,
    );
    const { account } =
      accountApiResponse.data as unknown as AccountApiResponse;

    if (!account) {
      throw new Error('Transaction creation failed: Account not found');
    }

    if (account.status == 'new' || account.status == 'active') {
      return this.prismaService.transaction.create({
        data: { accountId, description, status: 'CREATED' },
      });
    }

    return this.prismaService.transaction.create({
      data: { accountId, description, status: 'FAILED' },
    });
  }

  findAll() {
    return this.prismaService.transaction.findMany();
  }

  findOne(id: number) {
    return this.prismaService.transaction.findUnique({
      where: { id }
    });
  }

  async fraud(id: number) {
    const transaction = await this.findOne(id);

    if (transaction && transaction.status !== 'FRAUD' && transaction.status !== 'FAILED') {
      const newTransaction = this.prismaService.transaction.update({
        where: { id },
        data: { status: 'FRAUD' },
      });
      this.kafkaService.send(transaction, null);

      return newTransaction;
    }

    throw new Error('Transaction is not in a valid status');
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
