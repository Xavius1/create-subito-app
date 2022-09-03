import e from './env.js';

describe('env.js', () => {
  // MYSQL_MAIN_PASSWORD
  test('MYSQL_MAIN_PASSWORD type should be', () => {
    expect(e._types.MYSQL_MAIN_PASSWORD) // eslint-disable-line no-underscore-dangle
      .toBe('secret');
  });
  // MYSQL_MAIN_HOST
  test('MYSQL_MAIN_HOST default value should be', () => {
    expect(e._defaultValues.MYSQL_MAIN_HOST) // eslint-disable-line no-underscore-dangle
      .toBe('mysql');
  });
  // MYSQL_MAIN_USER
  test('MYSQL_MAIN_USER default value should be', () => {
    expect(e._defaultValues.MYSQL_MAIN_USER) // eslint-disable-line no-underscore-dangle
      .toBe('admin');
  });
  // MYSQL_MAIN_DBNAME
  test('MYSQL_MAIN_DBNAME default value should be', () => {
    expect(e._defaultValues.MYSQL_MAIN_DBNAME) // eslint-disable-line no-underscore-dangle
      .toBe('app');
  });
});
