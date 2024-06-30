import { EOL } from 'node:os';

export default class BrainfuckEncode {
  constructor() {}

  public encode(text: string, options: Options = {}): string {
    const codes = this.getCharCodes(text);
    const [min, max] = [Math.min(...codes), Math.max(...codes)];
    const d = max - min;
    let a = Math.floor(min + d / 2);
    if (a % 2 !== 0) a = a + 1;
    const b = this.divisor(a);
    const c = a / b;
    const l = this.loop(b, c, text.length);
    const f = this.fill(a, codes);
    const encoded = `${l}${f}`;
    if (options.ugly !== true) return encoded;
    return this.uglify(encoded);
  }

  private fill(a: number, codes: number[]): string {
    let result = '';
    for (const code of codes) {
      const dec = a > code;
      const d = Math.abs(code - a);
      const c = dec ? '-' : '+';
      result += this.break('> ' + c.repeat(d) + '.');
      result += EOL;
    }
    return result;
  }

  private loop(b: number, c: number, l: number): string {
    const [min, max] = [Math.min(b, c), Math.max(b, c)];
    let result = this.break('+'.repeat(max));
    result += EOL + '[' + EOL;
    result += this.break(` > ${'+'.repeat(min)}${EOL}`.repeat(l));
    result += EOL + this.break(' ' + '<'.repeat(l) + ' -');
    result += EOL + ']' + EOL;
    return result;
  }

  private getCharCodes(text: string): number[] {
    return text.split('').map((_, idx) => text.charCodeAt(idx));
  }

  private divisor(n: number): number {
    let highest: number = 2;
    let idx = Math.sqrt(n);
    while (true) {
      if (idx <= 2) break;
      const remainder = n % idx;
      if (remainder !== 0) {
        idx--;
        continue;
      }
      highest = idx;
      break;
    }
    return highest;
  }

  private uglify(text: string): string {
    return text.replace(/\s+/g, '');
  }

  private break(text: string): string {
    return (
      text
        .match(/.{1,5}/g)
        ?.join(' ')
        .match(/.{1,60}/g)
        ?.join(EOL) ?? ''
    );
  }
}

interface Options {
  ugly?: boolean;
}
