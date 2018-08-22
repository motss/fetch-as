// @ts-check

export interface FetchAsInfo extends Pick<Response, 'size'|'timeout'|'type'> {
  headers: {
    [key: string]: any;
  };
}

export interface FetchAsReturnType<T, U> {
  status: number;
  info: FetchAsInfo;

  data?: T;
  error?: U;
}

declare type FetchType =
'arrayBuffer'
  | 'blob'
  | 'buffer'
  | 'json'
  | 'text'
  | 'textConverted';

import { Blob, Headers, RequestInit, Response } from 'node-fetch';

import fetch from 'node-fetch';

function getResponseHeaders(headers: Headers) {
  const d = {};

  for (const [k, v] of headers) {
    d[k] = v;
  }

  return d;
}

function fetchAs<T, U>(fetchType: FetchType):
(url: string, options?: RequestInit) => Promise<FetchAsReturnType<T, U>> {
  return async (url: string, options?: RequestInit):
  Promise<FetchAsReturnType<T, U>> => {
    try {
      const r = await fetch(url, options);
      const d = await r[fetchType]();

      return {
        status: r.status,
        info: {
          headers: getResponseHeaders(r.headers),
          timeout: r.timeout,
          size: r.size,
          type: r.type,
        },

        [r.status > 399 ? 'error' : 'data']: d,
      };
    } catch (e) {
      throw e;
    }
  };
}

export async function fetchAsArrayBuffer<T extends ArrayBuffer, U extends ArrayBuffer>(
  url: string, options?: RequestInit) {
  return fetchAs<T, U>('arrayBuffer')(url, options);
}

export async function fetchAsBlob<T extends Blob, U extends Blob>(
  url: string, options?: RequestInit) {
  return fetchAs<T, U>('blob')(url, options);
}

export async function fetchAsBuffer<T extends Buffer, U extends Buffer>(
  url: string, options?: RequestInit) {
  return fetchAs<T, U>('buffer')(url, options);
}

export async function fetchAsJson<T extends {}, U extends {}>(url: string, options?: RequestInit) {
  return fetchAs<T, U>('json')(url, options);
}

export async function fetchAsText<T extends string, U extends any>(
  url: string, options?: RequestInit) {
  return fetchAs<T, U>('text')(url, options);
}

export async function fetchAsTextConverted<T extends string, U extends any>(
  url: string, options?: RequestInit) {
  return fetchAs<T, U>('textConverted')(url, options);
}

export default {
  arrayBuffer: fetchAsArrayBuffer,
  blob: fetchAsBlob,
  buffer: fetchAsBuffer,
  json: fetchAsJson,
  text: fetchAsText,
  textConverted: fetchAsTextConverted,
};
