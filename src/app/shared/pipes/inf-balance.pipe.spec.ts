import { InfBalancePipe } from './inf-balance.pipe';

describe('InfBalancePipe', () => {
  let pipe: InfBalancePipe;

  beforeEach(() => {
    pipe = new InfBalancePipe();
  });

  it('create an instance', () => {  
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should return the value devided by 100_000_000', () => {
      expect(pipe.transform(100_000_000)).toBe(1); 
      expect(pipe.transform(1000_000_000)).toBe(10); 
      expect(pipe.transform(1)).toBe(0.000_000_01); 
    });
  });
});
