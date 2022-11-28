import { api } from '../utils/api';

class Loop {
  static countTime = -10;

  static function1(): void {
    setTimeout(() => this.function2(), 600000);
    this.countTime += 10;
    api
      .get('/')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
    return console.log('tested');
  }

  static function2(): void {
    setTimeout(() => this.function1(), 600000);
    this.countTime += 10;
    api
      .get('/')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log('error', err);
      });
    return console.log('tested');
  }

  static convertTime(): string {
    return `por ${(this.countTime / 60 / 24).toFixed(0)} dias ${(
      (this.countTime / 60) %
      24
    ).toFixed(0)} horas e ${(this.countTime % 60) % 60} minutos.`;
  }
}

export default Loop;
