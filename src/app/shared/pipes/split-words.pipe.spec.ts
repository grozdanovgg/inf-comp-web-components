import { SplitWordsPipe } from './split-words.pipe';

describe('SplitWordsPipe', () => {
  const pipe = new SplitWordsPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "HelloWorld" to "Hello World"', () => {
    expect(pipe.transform('HelloWorld')).toBe('Hello World');
  });

  it('transforms "helloWorld" to "hello World"', () => {
    expect(pipe.transform('helloWorld')).toBe('hello World');
  });

  it('transforms "SplitWordsPipe" to "Split Words Pipe"', () => {
    expect(pipe.transform('SplitWordsPipe')).toBe('Split Words Pipe');
  });
});
