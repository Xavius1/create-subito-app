import e from './env.js';

describe('env.js', () => {
  // MONGODB_MAIN_NAME
  test('MONGODB_MAIN_NAME default value should be', () => {
    expect(e._defaultValues.MONGODB_MAIN_NAME) // eslint-disable-line no-underscore-dangle
      .toBe('app');
  });
  // MONGODB_MAIN_AUTH
  test('MONGODB_MAIN_AUTH default value should be', () => {
    expect(e._defaultValues.MONGODB_MAIN_AUTH) // eslint-disable-line no-underscore-dangle
      .toBe('app');
  });
  // MONGODB_MAIN_REPLICASET
  test('MONGODB_MAIN_REPLICASET default value should be', () => {
    expect(e._defaultValues.MONGODB_MAIN_REPLICASET) // eslint-disable-line no-underscore-dangle
      .toBe('rs0');
  });
  // MONGODB_SUBITOAPP_NAME
  test('MONGODB_SUBITOAPP_NAME default value should be', () => {
    expect(e._defaultValues.MONGODB_SUBITOAPP_NAME) // eslint-disable-line no-underscore-dangle
      .toBe('subitoapp');
  });
  // MONGODB_SUBITOAPP_CURSOR
  test('MONGODB_SUBITOAPP_CURSOR default value should be', () => {
    expect(e._defaultValues.MONGODB_SUBITOAPP_CURSOR) // eslint-disable-line no-underscore-dangle
      .toBe('createdAt');
  });
  // MONGODB_SUBITOAPP_CSTYPE
  test('MONGODB_SUBITOAPP_CSTYPE default value should be', () => {
    expect(e._defaultValues.MONGODB_SUBITOAPP_CSTYPE) // eslint-disable-line no-underscore-dangle
      .toBe('Date');
  });
});
