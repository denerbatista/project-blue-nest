import { Injectable } from '@nestjs/common';
import Loop from './utils/loop';

@Injectable()
export class AppService {
  getStatus(): string {
    return `Executando ${Loop.convertTime()} - /docs para documentação.`;
  }
}
