import { api } from '../utils/api';

class Loop {
  static countTime = -10;

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

  static async start(): Promise<void> {
    setTimeout(() => this.start(), 600000);
    this.countTime += 10;
    try {
      await api.get('/');
      console.log(`Running ${this.convertTime()}`);
    } catch (error) {
      console.log('Error Loop start', error);
    }
  }
}

export default Loop;
