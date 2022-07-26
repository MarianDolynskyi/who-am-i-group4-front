import checkGuess from './check-guess';

describe('Check guess for XSS', () => {
  let longStr = [];
  longStr.length = 129;
  longStr.fill('a', 0, 128);
  longStr = longStr.join('');

  test('Catches javascript', () => {
    expect(checkGuess('javascript')).toBe(true);
  });

  test('Catches too short string', () => {
    expect(checkGuess('1')).toBe(true);
  });

  test('Catches too long string', () => {
    expect(checkGuess(longStr + 'a')).toBe(true);
  });

  test('Cathes tags', () => {
    expect(checkGuess('<<<<>>>>>>>')).toBe(true);
  });

  test('Lets in correct string', () => {
    expect(checkGuess(longStr)).toBe(false);
  });
});
