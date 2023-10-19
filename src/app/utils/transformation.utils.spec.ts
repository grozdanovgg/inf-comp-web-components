import { extractKeyProperty } from "./transformation.utils";

describe("Transformation utils", () => {
  it('should transform the object according to name property', () => {
    const entry = [
      {
        name: 'Bob',
        age: 3
      },
      {
        name: 'Alice',
        age: 4
      }
    ];

    const output = {
      Bob: { age: 3 },
      Alice: { age: 4 }
    };

    expect(extractKeyProperty(entry, 'name')).toEqual(output);
    expect(entry).toEqual([
      {
        name: 'Bob',
        age: 3
      },
      {
        name: 'Alice',
        age: 4
      }
    ]); // It shouldn't change the entry
  });
});