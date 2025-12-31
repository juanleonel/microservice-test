import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator'

export enum Status {
  CREATED = 'CREATED',
  SETTLED = 'SETTLED',
  FAILDED = 'FAILED',
}

export class CreateTransactionDto {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
