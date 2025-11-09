import {expect} from 'chai';
import {parseCookieHeader} from './parse-cookie-header.js';

describe('parseCookieHeader', function () {
  it('should return an empty object for a null input', function () {
    const result = parseCookieHeader(null);
    expect(result).to.deep.equal({});
  });

  it('should return an empty object for an undefined input', function () {
    const result = parseCookieHeader(undefined);
    expect(result).to.deep.equal({});
  });

  it('should return an empty object for an empty string', function () {
    const result = parseCookieHeader('');
    expect(result).to.deep.equal({});
  });

  it('should parse a single key-value pair correctly', function () {
    const header = 'user=JohnDoe';
    const result = parseCookieHeader(header);
    expect(result).to.deep.equal({user: 'JohnDoe'});
  });

  it('should parse multiple key-value pairs separated by semicolons', function () {
    const header = 'user=JohnDoe; theme=dark; session=12345';
    const result = parseCookieHeader(header);
    expect(result).to.deep.equal({
      user: 'JohnDoe',
      theme: 'dark',
      session: '12345',
    });
  });

  it('should handle leading and trailing whitespace around keys, values, and separators', function () {
    const header = ' user = JohnDoe ;  theme=dark  ';
    const result = parseCookieHeader(header);
    expect(result).to.deep.equal({user: 'JohnDoe', theme: 'dark'});
  });

  it('should decode URL-encoded values correctly', function () {
    const header = 'name=John%20Doe; data=%7B%22id%22%3A1%7D;';
    const result = parseCookieHeader(header);
    expect(result).to.deep.equal({name: 'John Doe', data: '{"id":1}'});
  });

  it('should handle values that contain an equals sign', function () {
    const header = 'redirect=https%3A%2F%2Fexample.com%3Fa%3D1';
    const result = parseCookieHeader(header);
    expect(result).to.deep.equal({redirect: 'https://example.com?a=1'});
  });

  it('should ignore malformed parts that do not contain an equals sign', function () {
    const header = 'user=test;malformed;theme=light';
    const result = parseCookieHeader(header);
    expect(result).to.deep.equal({user: 'test', theme: 'light'});
  });

  it('should ignore parts with an empty key', function () {
    const header = '=someValue; user=test';
    const result = parseCookieHeader(header);
    expect(result).to.deep.equal({user: 'test'});
  });

  it('should handle cookies with an empty value', function () {
    const header = 'session=; user=test';
    const result = parseCookieHeader(header);
    expect(result).to.deep.equal({session: '', user: 'test'});
  });

  it('should return the raw undecoded when URI decoding fails', function () {
    const malformedValue = '%E0%A4%A';
    const header = `badCookie=${malformedValue}`;
    const result = parseCookieHeader(header);
    expect(result).to.deep.equal({badCookie: malformedValue});
  });
});
