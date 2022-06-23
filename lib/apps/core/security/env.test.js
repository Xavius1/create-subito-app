import e from './env.js';

describe('env.js', () => {
  // NODE_ENV
  test('NODE_ENV should allow', () => {
    expect(e._allowedValues.NODE_ENV) // eslint-disable-line no-underscore-dangle
      .toStrictEqual(['development', 'test', 'production']);
  });

  // APP_ENV
  test('APP_ENV should allow', () => {
    expect(e._allowedValues.APP_ENV) // eslint-disable-line no-underscore-dangle
      .toStrictEqual(['local', 'current', 'develop', 'integration', 'staging', 'production']);
  });

  // INTERNAL_GATEWAY
  test('INTERNAL_GATEWAY default value should be', () => {
    expect(e._defaultValues.INTERNAL_GATEWAY) // eslint-disable-line no-underscore-dangle
      .toBe('server');
  });

  // JWT_KEY
  test('JWT_KEY type should be', () => {
    expect(e._types.JWT_KEY) // eslint-disable-line no-underscore-dangle
      .toBe('secret');
  });

  // PWD
  test('PWD type should be', () => {
    expect(e._types.PWD) // eslint-disable-line no-underscore-dangle
      .toBe('secret');
  });
});
