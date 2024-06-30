import BrainfuckDecode from './BrainfuckDecode';
import BrainfuckEncode from './BrainfuckEncode';

export default class Brainfuck {
  private readonly brainfuckEncode = new BrainfuckEncode();
  private readonly brainfuckDecode = new BrainfuckDecode();

  constructor() {}

  public encode = this.brainfuckEncode.encode.bind(this.brainfuckEncode);
  public decode = this.brainfuckDecode.decode.bind(this.brainfuckDecode);
}
