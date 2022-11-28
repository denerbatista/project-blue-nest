import { Injectable } from '@nestjs/common';
import Loop from './utils/loop';

@Injectable()
export class AppService {
  getHello(): string {
    return `Executando ${Loop.convertTime()} - /docs para documentação.`;
  }
}
