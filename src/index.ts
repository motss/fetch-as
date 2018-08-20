// @ts-check

export interface FetchAsInfo extends Pick<Response, 'size'|'timeout'|'type'> {
  headers: {
    [key: string]: any;
  };
}
export interface FetchAsReturnType {
  status: number;
  info: FetchAsInfo;

  data?: any;
  error?: any;
}
export interface FetchAsData<T extends FetchAsReturnType> extends FetchAsReturnType {
  data?: T['data'];
  error?: T['error'];
}

declare type DataType =
  'arrayBuffer'
  | 'blob'
  | 'buffer'
  | 'json'
  | 'text'
  | 'textConverted';
declare interface ReturnFetchAs<T, U> extends FetchAsReturnType {
  data?: T;
  error?: U;
}

import { Blob, Headers, RequestInit, Response } from 'node-fetch';

import fetch from 'node-fetch';

function getResponseHeaders(headers: Headers) {
  const d = {};

  for (const [k, v] of headers) {
    d[k] = v;
  }

  return d;
}

async function fetchThen<T extends FetchAsReturnType>(
  dataType: DataType,
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  try {
    const r = await fetch(url, options);
    const rstat = r.status;
    const rHeaders = getResponseHeaders(r.headers);
    const d = await r[dataType]();

    return {
      status: rstat,
      info: {
        headers: rHeaders,
        timeout: r.timeout,
        size: r.size,
        type: r.type,
      },

      [rstat > 399 ? 'error' : 'data']: d,
    };
  } catch (e) {
    throw e;
  }
}

export async function fetchAsArrayBuffer<T extends ReturnFetchAs<ArrayBuffer, ArrayBuffer>>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('arrayBuffer', url, options);
}

export async function fetchAsBlob<T extends ReturnFetchAs<Blob, Blob>>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('blob', url, options);
}

export async function fetchAsBuffer<T extends ReturnFetchAs<Buffer, Buffer>>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('buffer', url, options);
}

export async function fetchAsJson<T extends ReturnFetchAs<{}, {}>>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('json', url, options);
}

export async function fetchAsText<T extends ReturnFetchAs<string, {}>>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('text', url, options);
}

export async function fetchAsTextConverted<T extends ReturnFetchAs<string, {}>>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('textConverted', url, options);
}

export default {
  arrayBuffer: fetchAsArrayBuffer,
  blob: fetchAsBlob,
  buffer: fetchAsBuffer,
  json: fetchAsJson,
  text: fetchAsText,
  textConverted: fetchAsTextConverted,
};
