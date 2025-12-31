import { IsString, IsOptional, IsEnum, IsNotEmpty, IsUUID } from 'class-validator'

export enum Status {
  CREATED = 'CREATED',
  SETTLED = 'SETTLED',
  FAILDED = 'FAILED',
}

export class CreateTransactionDto {
  // @IsNotEmpty()
  // @IsEnum(Status)
  // status: Status;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
