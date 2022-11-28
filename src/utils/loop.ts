import { api } from '../utils/api';

class Loop {
  static countTime = -10;

  static async function1(): Promise<void> {
    setTimeout(() => this.function2(), 600000);
    this.countTime += 10;
    try {
      await api.get('/');
      console.log(`Executando ${this.convertTime()}`);
    } catch (error) {
      console.log('error', error);
    }
  }

  static async function2(): Promise<void> {
    setTimeout(() => this.function1(), 600000);
    this.countTime += 10;
    try {
      await api.get('/');
      console.log(`Executando ${this.convertTime()}`);
    } catch (error) {
      console.log('error', error);
    }
  }

  static convertTime(): string {
    return `por ${(this.countTime / 60 / 24).toFixed(0)} dias ${(
      (this.countTime / 60) %
      24
    ).toFixed(0)} horas e ${(this.countTime % 60) % 60} minutos.`;
  }
}

export default Loop;
