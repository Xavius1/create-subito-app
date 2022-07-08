import e from './env.js';

describe('env.js', () => {
  // env
  test('env shoul have some default values', () => {
    expect(e._defaultValues.APP_ENV) // eslint-disable-line no-underscore-dangle
      .toBe('local');
  });

});
