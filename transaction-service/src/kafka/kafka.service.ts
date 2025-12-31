import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
  private readonly producer: Producer;
  private readonly topic: string | undefined;

  constructor(private readonly configService: ConfigService) {
    const clientId = this.configService.get<string>('KAFKA_CLIENT_ID');
    const brokers =
      this.configService.get<string>('KAFKA_BROKERS')?.split(',') ?? [];
    this.topic = this.configService.get<string>('KAFKA_TOPIC');
    const kafka = new Kafka({ clientId: clientId, brokers: brokers });
    this.producer = kafka.producer({ retry: { retries: 3 } });
  }

  async onModuleInit(): Promise<void> {
    await this.producer.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer.disconnect();
  }

  async send(value: any, key?: string | null): Promise<void> {
    const messages = [{ key, value: JSON.stringify(value) }];
    await this.producer.send({ topic: this.topic ?? '', messages });
  }
}
