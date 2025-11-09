import {expect} from 'chai';
import {parseUrlQuery} from './parse-url-query.js';

describe('parseUrlQuery', function () {
  it('should return an empty object for a null input', function () {
    const result = parseUrlQuery(null);
    expect(result).to.deep.equal({});
  });

  it('should return an empty object for an undefined input', function () {
    const result = parseUrlQuery(undefined);
    expect(result).to.deep.equal({});
  });

  it('should return an empty object for an empty string', function () {
    const result = parseUrlQuery('');
    expect(result).to.deep.equal({});
  });

  it('should return an empty object for a URL with no query string', function () {
    const result = parseUrlQuery('/api/users/123');
    expect(result).to.deep.equal({});
  });

  it('should return an empty object for a URL with a question mark but no params', function () {
    const result = parseUrlQuery('/api/users?');
    expect(result).to.deep.equal({});
  });

  it('should parse a single key-value pair correctly', function () {
    const result = parseUrlQuery('/search?q=typescript');
    expect(result).to.deep.equal({q: 'typescript'});
  });

  it('should parse multiple unique key-value pairs', function () {
    const result = parseUrlQuery('/api/data?id=123&format=json&pretty=true');
    expect(result).to.deep.equal({
      id: '123',
      format: 'json',
      pretty: 'true',
    });
  });

  it('should keep only the last value for duplicated keys', function () {
    const result = parseUrlQuery('/items?tag=clothing&tag=summer&tag=sale');
    expect(result).to.deep.equal({tag: 'sale'});
  });

  it('should automatically decode URL-encoded characters in both keys and values', function () {
    const result = parseUrlQuery(
      '/submit?user%20name=John%20Doe&data=%7B%22status%22%3A%22ok%22%7D',
    );
    expect(result).to.deep.equal({
      'user name': 'John Doe',
      data: '{"status":"ok"}',
    });
  });

  it('should handle keys with empty values', function () {
    const result = parseUrlQuery('/config?token=&user=admin');
    expect(result).to.deep.equal({token: '', user: 'admin'});
  });

  it('should handle keys without an explicit value as having an empty string value', function () {
    const result = parseUrlQuery('/flags?enabled&mode=test');
    expect(result).to.deep.equal({enabled: '', mode: 'test'});
  });

  it('should correctly parse a full URL, not just a path', function () {
    const result = parseUrlQuery(
      'https://example.com/api/v1?token=xyz123&user_id=42',
    );
    expect(result).to.deep.equal({token: 'xyz123', user_id: '42'});
  });

  it('should handle a query string without a leading path', function () {
    const result = parseUrlQuery('?a=1&b=2');
    expect(result).to.deep.equal({a: '1', b: '2'});
  });
});
