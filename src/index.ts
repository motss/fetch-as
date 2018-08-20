// @ts-check

export type FetchAsOptionals = Pick<Response, 'body'|'headers'|'size'|'type'>;
export interface FetchAsReturnType {
  status: number;
  optionals: FetchAsOptionals;
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

import { Blob, RequestInit, Response } from 'node-fetch';

import fetch from 'node-fetch';

async function fetchThen<T extends FetchAsReturnType>(
  dataType: DataType,
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  try {
    const r = await fetch(url, options);
    const rstat = r.status;
    const optionals = {
      body: r.body,
      headers: r.headers,
      size: r.size,
      type: r.type,
    };
    const d = await r[dataType]();

    return {
      optionals,
      status: rstat,
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
