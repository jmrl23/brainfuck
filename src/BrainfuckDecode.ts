export default class BrainfuckDecode {
  private readonly memory = new Uint8Array({ length: 1000 });
  private pointer = 0;

  constructor() {}

  public decode(text: string): string {
    const decoded = this.process(text.split(''));
    this.reset();
    return decoded;
  }

  private process(list: string[]): string {
    let result = '';
    while (list.length > 0) {
      const character = this.action(list);
      if (character !== undefined) result += character;
      list.shift();
    }
    return result;
  }

  private action(list: string[]): string | undefined {
    const character = list[0];
    switch (character) {
      case '>':
        this.pointer++;
        break;
      case '<':
        this.pointer--;
        break;
      case '+':
        this.memory[this.pointer]++;
        break;
      case '-':
        this.memory[this.pointer]--;
        break;
      case '[':
        const end = list.indexOf(']');
        if (end < 0) throw new Error('Invalid');
        const from = 1;
        const to = end - 1;
        const chunk = list.splice(from, to);
        const loopedChunk = chunk
          .join('')
          .repeat(this.memory[this.pointer])
          .split('');
        return this.process(loopedChunk);
      case '.':
        return String.fromCharCode(this.memory[this.pointer]);
    }
  }

  private reset(): void {
    this.memory.fill(0, 0, this.memory.length);
    this.pointer = 0;
  }
}
