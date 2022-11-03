import e from './env.js';

describe('e.RABBITMQ_HOST', () => {
  test('RABBITMQ_HOST default value should be', () => {
    expect(e._defaultValues.RABBITMQ_HOST) // eslint-disable-line no-underscore-dangle
      .toBe('rabbitmq');
  });
  test('RABBITMQ_HOST type should be', () => {
    expect(e._types.RABBITMQ_HOST) // eslint-disable-line no-underscore-dangle
      .toBe(1);
  });
});

describe('e.RABBITMQ_LOGIN', () => {
  test('RABBITMQ_LOGIN default value should be', () => {
    expect(e._defaultValues.RABBITMQ_LOGIN) // eslint-disable-line no-underscore-dangle
      .toBe('dev');
  });
  test('RABBITMQ_LOGIN type should be', () => {
    expect(e._types.RABBITMQ_LOGIN) // eslint-disable-line no-underscore-dangle
      .toBe(0);
  });
});

describe('e.RABBITMQ_PASSWORD', () => {
  test('RABBITMQ_PASSWORD default value should be', () => {
    expect(e._defaultValues.RABBITMQ_PASSWORD) // eslint-disable-line no-underscore-dangle
      .toBe('dev');
  });
  test('RABBITMQ_PASSWORD type should be', () => {
    expect(e._types.RABBITMQ_PASSWORD) // eslint-disable-line no-underscore-dangle
      .toBe(0);
  });
});
