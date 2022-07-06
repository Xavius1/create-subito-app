import e from './env.js';

describe('env.js', () => {
  // NODE_ENV
  test('NODE_ENV should be defined', () => {
    expect(e.NODE_ENV) // eslint-disable-line no-underscore-dangle
      .toBeDefined();
  });

  // APP_ENV
  test('APP_ENV should be defined', () => {
    expect(e.APP_ENV) // eslint-disable-line no-underscore-dangle
      .toBeDefined();
  });

  // INTERNAL_GATEWAY
  test('INTERNAL_GATEWAY default value should be', () => {
    expect(e._defaultValues.INTERNAL_GATEWAY) // eslint-disable-line no-underscore-dangle
      .toBe('server');
  });

  // SERVICE_AUTH_KEY
  test('SERVICE_AUTH_KEY type should be', () => {
    expect(e._types.SERVICE_AUTH_KEY) // eslint-disable-line no-underscore-dangle
      .toBe('secret');
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

  // FORCE_DEBUG
  test('FORCE_DEBUG type should be', () => {
    expect(e._types.PWD) // eslint-disable-line no-underscore-dangle
      .toBe(EnvType.VAR);
  });
  test('FORCE_DEBUG default value should be', () => {
    expect(e._defaultValues.FORCE_DEBUG) // eslint-disable-line no-underscore-dangle
      .toBe(true);
  });

  // Rabbitmq
  test('RABBITMQ_HOST default value should be', () => {
    expect(e._defaultValues.RABBITMQ_HOST) // eslint-disable-line no-underscore-dangle
      .toBe('rabbitmq');
  });
  test('RABBITMQ_LOGIN default value should be', () => {
    expect(e._defaultValues.RABBITMQ_LOGIN) // eslint-disable-line no-underscore-dangle
      .toBe('guest');
  });
  test('RABBITMQ_PASSWORD default value should be', () => {
    expect(e._defaultValues.RABBITMQ_PASSWORD) // eslint-disable-line no-underscore-dangle
      .toBe('guest');
  });
});
