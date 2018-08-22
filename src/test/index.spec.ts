// @ts-check

declare interface TestSuccessData {
  message: string;
}
declare interface TestErrorData {
  type: string;
  message: string;
}

import nock from 'nock';
import fetch from 'node-fetch';

import {
  fetchAsArrayBuffer,
  fetchAsBlob,
  fetchAsBuffer,
  fetchAsJson,
  fetchAsText,
  fetchAsTextConverted,
} from '../';

function toBuffer(ab) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);

  for (let i = 0; i < buf.length; i += 1) {
    buf[i] = view[i];
  }

  return buf;
}

function timeoutNock(url) {
  return nock(url)
    .persist(true)
    // .log(console.log)
    .get(uri => /^\/timeout/i.test(uri))
    .delay(5e3)
    .reply(500, () => {
      return {};
    });
}

function errorNock(url, data) {
  return nock(url)
    .persist(true)
    // .log(console.log)
    .get(uri => /^\/error/i.test(uri))
    .reply(404, () => {
      return { ...data };
    });
}

function successNock(url, data) {
  return nock(url)
    .persist(true)
    // .log(console.log)
    .get(uri => /^\/ok/i.test(uri))
    .reply(200, (uri) => {
      return { ...data };
    });
}

describe('fetch-as', async () => {
  const url = 'http://localhost:5353';
  const successData: TestSuccessData = {
    message: 'OK',
  };
  const errorData: TestErrorData = {
    type: 'not_found',
    message: 'Not found',
  };

  let nocks: (nock.Scope)[];

  beforeAll(() => {
    nocks = [
      errorNock(url, errorData),
      timeoutNock(url),

      successNock(url, successData),
    ];
  });

  describe('error', () => {
    it('throws when invalid URL', async () => {
      try {
        await fetchAsJson('/invalid-url');
      } catch (e) {
        expect(e).toStrictEqual(new TypeError('Only absolute URLs are supported'));
      }
    });

    it('throws when socket timed out', async () => {
      try {
        await fetchAsJson(`${url}/timeout`, { timeout: 3e3 });
      } catch (e) {
        expect(e.type).toStrictEqual('request-timeout');
        expect(e.message).toStrictEqual(`network timeout at: ${url}/timeout`);
        expect(e.name).toStrictEqual('FetchError');
      }
    }, 10e3);

  });

  describe('ok', () => {
    it(`returns response with 'fetchAsArrayBuffer'`, async () => {
      try {
        const d = await fetchAsArrayBuffer<ArrayBuffer, ArrayBuffer>(`${url}/ok`);

        expect(d.status).toStrictEqual(200);
        expect(toBuffer(d.data)).toStrictEqual(Buffer.from(JSON.stringify({ ...successData })));
      } catch (e) {
        throw e;
      }
    });

    it(`returns response with 'fetchAsBlob'`, async () => {
      try {
        const d = await fetchAsBlob(`${url}/ok`);

        expect(d.status).toStrictEqual(200);
        expect(d.data.size).toStrictEqual(16);
        expect(d.data.type).toStrictEqual('application/json');
      } catch (e) {
        throw e;
      }
    });

    it(`returns response with 'fetchAsBuffer'`, async () => {
      try {
        const d = await fetchAsBuffer(`${url}/ok`);

        expect(d.status).toStrictEqual(200);
        expect(d.data).toStrictEqual(Buffer.from(JSON.stringify({ ...successData })));
      } catch (e) {
        throw e;
      }
    });

    it(`returns response with 'fetchAsJson'`, async () => {
      try {
        const d = await fetchAsJson(`${url}/ok`);

        expect(d.status).toStrictEqual(200);
        expect(d.data).toStrictEqual({ ...successData });
      } catch (e) {
        throw e;
      }
    });

    it(`returns response with 'fetchAsText'`, async () => {
      try {
        const d = await fetchAsText(`${url}/ok`);

        expect(d.status).toStrictEqual(200);
        expect(d.data).toStrictEqual(JSON.stringify({ ...successData }));
      } catch (e) {
        throw e;
      }
    });

    it(`returns response with 'fetchAsTextConverted'`, async () => {
      try {
        const d = await fetchAsTextConverted(`${url}/ok`);

        expect(d.data).toStrictEqual(JSON.stringify({ ...successData }));
      } catch (e) {
        throw e;
      }
    });

    it(`returns response with defined 'info'`, async () => {
      try {
        const d = await fetchAsJson<TestSuccessData, TestErrorData>(`${url}/ok`, { timeout: 3e3 });

        expect(d).toStrictEqual({
          status: 200,
          info: {
            headers: { 'content-type': 'application/json' },
            size: 0,
            timeout: 3e3,
            type: undefined,
          },

          data: { ...successData },
        } as FetchAsData<TestSuccessData>);
      } catch (e) {
        throw e;
      }
    });

  });

  describe('fail', () => {
    it(`returns failed response with 'fetchAsArrayBuffer'`, async () => {
      try {
        const d = await fetchAsArrayBuffer(`${url}/error`);

        expect(d.status).toBeGreaterThan(399);
        expect(toBuffer(d.error)).toStrictEqual(Buffer.from(JSON.stringify({ ...errorData })));
      } catch (e) {
        throw e;
      }
    });

    it(`returns failed response with 'fetchAsBlob'`, async () => {
      try {
        const d = await fetchAsBlob(`${url}/error`);

        expect(d.status).toBeGreaterThan(399);
        expect(d.error.size).toStrictEqual(42);
        expect(d.error.type).toStrictEqual('application/json');
      } catch (e) {
        throw e;
      }
    });

    it(`returns failed response with 'fetchAsBuffer'`, async () => {
      try {
        const d = await fetchAsBuffer(`${url}/error`);

        expect(d.status).toBeGreaterThan(399);
        expect(d.error).toStrictEqual(Buffer.from(JSON.stringify({ ...errorData })));
      } catch (e) {
        throw e;
      }
    });

    it(`returns failed response with 'fetchAsJson'`, async () => {
      try {
        const d = await fetchAsJson(`${url}/error`);

        expect(d.status).toBeGreaterThan(399);
        expect(d.error).toStrictEqual({ ...errorData });
      } catch (e) {
        throw e;
      }
    });

    it(`returns failed response with 'fetchAsText'`, async () => {
      try {
        const d = await fetchAsText(`${url}/error`);

        expect(d.status).toBeGreaterThan(399);
        expect(d.error).toStrictEqual(JSON.stringify({ ...errorData }));
      } catch (e) {
        throw e;
      }
    });

    it(`returns failed response with 'fetchAsTextConverted`, async () => {
      try {
        const d = await fetchAsTextConverted(`${url}/error`);

        expect(d.status).toBeGreaterThan(399);
        expect(d.error).toStrictEqual(JSON.stringify({ ...errorData }));
      } catch (e) {
        throw e;
      }
    });

  });

  afterAll(() => {
    nocks.forEach(n => n.persist(false));
    nock.cleanAll();
  });
});
