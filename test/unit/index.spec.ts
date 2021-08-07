import { Properties } from '../../src/VariablesExtra';

describe('Test 1', () => {
  it('should pass', () => {
    const properties = new Properties([]);
    expect(properties.getOne('foo')).toBe(undefined);
  });
});
