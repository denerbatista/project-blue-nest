import { api } from '../utils/api';

class Loop {
  static countTime = -10;

  static async function1(): Promise<void> {
    setTimeout(() => this.function2(), 600000);
    this.countTime += 10;
    try {
      await api.get('/');
      console.log(`Running ${this.convertTime()}`);
    } catch (error) {
      console.log('error', error);
    }
  }

  static async function2(): Promise<void> {
    setTimeout(() => this.function1(), 600000);
    this.countTime += 10;
    try {
      await api.get('/');
      console.log(`Running ${this.convertTime()}`);
    } catch (error) {
      console.log('error', error);
    }
  }

  static convertTime(
    For = 'for',
    Days = 'days',
    Hours = 'hours and',
    Minutes = 'minutes.',
  ): string {
    return `${For} ${(this.countTime / 60 / 24).toFixed(0)} ${Days} ${(
      (this.countTime / 60) %
      24
    ).toFixed(0)} ${Hours} ${(this.countTime % 60) % 60} ${Minutes}`;
  }
}

export default Loop;
