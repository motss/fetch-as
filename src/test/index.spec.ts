// @ts-check

/** Import project dependencies */
import nock from 'nock';

/** Import other modules */
import fetchAs, {
  fetchAsArrayBuffer,
  fetchAsBlob,
  fetchAsBuffer,
  fetchAsJson,
  fetchAsText,
  fetchAsTextConverted,
} from '../';

/** Setting up */
const testUrl = 'http://localhost:5353';
const toBuffer = (ab) => {
  let buf = new Buffer(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
  }

  return buf;
};

beforeEach(() => {
  nock(testUrl)
    .get(uri => /^\/(ok|bad)$/i.test(uri))
    .reply((uri) => {
      const isOK = /ok$/i.test(uri);
      const rs = isOK ? 200 : 400;

      return [
        rs, {
          [rs > 399 ? 'error' : 'data']: {
            status: rs,
            message: isOK ? 'OK' : 'Bad',
          },
        },
      ];
    });
});

afterEach(() => nock.cleanAll());

describe('fetch-as', async () => {
  test('fetch-as', async () => {
    try {
      /** FIXME: Awaiting node-fetch@2.0.0 stable release */
      expect(fetchAs).toMatchObject({
        arrayBuffer: expect.any(Function),
        blob: expect.any(Function),
        buffer: expect.any(Function),
        json: expect.any(Function),
        text: expect.any(Function),
        textConverted: expect.any(Function),
      });
      expect(fetchAs).toMatchObject({
        buffer: expect.any(Function),
        json: expect.any(Function),
        text: expect.any(Function),
      });
    } catch (e) {
      throw e;
    }
  });

  test('invalid URL', async () => {
    try {
      await fetchAsJson('/invalid-url');
    } catch (e) {
      expect(e instanceof Error).toBe(true);
      expect(e.message).toEqual('Only absolute URLs are supported');
    }
  });

  test('fetchAsArrayBuffer works', async () => {
    try {
      const d = await fetchAsArrayBuffer(`${testUrl}/ok`);

      expect(d.status).toEqual(200);
      expect(toBuffer(d.data)).toEqual(Buffer.from(JSON.stringify({
        data: {
          status: 200,
          message: 'OK',
        },
      })));
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsArrayBuffer fails', async () => {
    try {
      const d = await fetchAsArrayBuffer(`${testUrl}/bad`);

      expect(d.status).toBeGreaterThan(399);
      expect(toBuffer(d.error)).toEqual(Buffer.from(JSON.stringify({
        error: {
          status: 400,
          message: 'Bad',
        },
      })))
    } catch (e) {
      throw e;
    }
  });
  
  test('fetchAsBlob works', async () => {
    try {
      const d = await fetchAsBlob(`${testUrl}/ok`);

      expect(d.status).toEqual(200);
      expect(d.data.size).toEqual(38);
      expect(d.data.type).toEqual('application/json');
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsBlob fails', async () => {
    try {
      const d = await fetchAsBlob(`${testUrl}/bad`);

      expect(d.status).toBeGreaterThan(399);
      expect(d.error.size).toEqual(40);
      expect(d.error.type).toEqual('application/json');
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsBuffer works', async () => {
    try {
      const d = await fetchAsBuffer(`${testUrl}/ok`);

      expect(d.status).toEqual(200);
      expect(d.data).toEqual(Buffer.from(JSON.stringify({
        data: {
          status: 200,
          message: 'OK',
        },
      })));
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsBuffer fails', async () => {
    try {
      const d = await fetchAsBuffer(`${testUrl}/bad`);

      expect(d.status).toBeGreaterThan(399);
      expect(d.error).toEqual(Buffer.from(JSON.stringify({
        error: {
          status: 400,
          message: 'Bad',
        },
      })));
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsJson works', async () => {
    try {
      const d = await fetchAsJson(`${testUrl}/ok`);

      expect(d.status).toEqual(200);
      expect(d.data).toEqual({
        data: {
          status: 200,
          message: 'OK',
        },
      });
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsJson fails', async () => {
    try {
      const d = await fetchAsJson(`${testUrl}/bad`);

      expect(d.status).toBeGreaterThan(399);
      expect(d.error).toEqual({
        error: {
          status: 400,
          message: 'Bad',
        },
      });
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsText works', async () => {
    try {
      const d = await fetchAsText(`${testUrl}/ok`);

      expect(d.status).toEqual(200);
      expect(d.data).toEqual(JSON.stringify({
        data: {
          status: 200,
          message: 'OK',
        },
      }));
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsText fails', async () => {
    try {
      const d = await fetchAsText(`${testUrl}/bad`);

      expect(d.status).toBeGreaterThan(399);
      expect(d.error).toEqual(JSON.stringify({
        error: {
          status: 400,
          message: 'Bad',
        },
      }));
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsTextConverted works', async () => {
    try {
      const d = await fetchAsTextConverted(`${testUrl}/ok`);

      expect(d.data).toEqual(JSON.stringify({
        data: {
          status: 200,
          message: 'OK',
        },
      }));
    } catch (e) {
      throw e;
    }
  });

  test('fetchAsTextConverted fails', async () => {
    try {
      const d = await fetchAsTextConverted(`${testUrl}/bad`);

      expect(d.status).toBeGreaterThan(399);
      expect(d.error).toEqual(JSON.stringify({
        error: {
          status: 400,
          message: 'Bad',
        },
      }));
    } catch (e) {
      throw e;
    }
  });

});
