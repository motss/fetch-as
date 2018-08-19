// @ts-check

export type DataType =
  'arrayBuffer'
  | 'blob'
  | 'buffer'
  | 'json'
  | 'text'
  | 'textConverted';
export interface FetchAsData<T, U> {
  status: number;
  data?: T;
  error?: U;
}

import { RequestInit, Response } from 'node-fetch';

import fetch from 'node-fetch';

function toDataType(response: Response, dataType: DataType) {
  switch (dataType) {
    case 'arrayBuffer':
      return response.arrayBuffer();
    case 'blob':
      return response.blob();
    case 'buffer':
      return response.buffer();
    case 'json':
      return response.json();
    case 'text':
    default:
      return response.text();
    case 'textConverted':
      return response.textConverted();
  }
}

async function fetchThen<T, U>(
  dataType: DataType,
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T, U>> {
  try {
    const r = await fetch(url, options);
    const rstat = r.status;
    const d = await toDataType(r, dataType);

    return { status: rstat, [rstat > 399 ? 'error' : 'data']: d };
  } catch (e) {
    throw e;
  }
}

export function fetchAsArrayBuffer<T, U>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T, U>> {
  return fetchThen<T, U>('arrayBuffer', url, options);
}

export function fetchAsBlob<T, U>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T, U>> {
  return fetchThen<T, U>('blob', url, options);
}

export function fetchAsBuffer<T, U>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T, U>> {
  return fetchThen<T, U>('buffer', url, options);
}

export function fetchAsJson<T, U>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T, U>> {
  return fetchThen<T, U>('json', url, options);
}

export function fetchAsText<T, U>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T, U>> {
  return fetchThen<T, U>('text', url, options);
}

export function fetchAsTextConverted<T, U>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T, U>> {
  return fetchThen<T, U>('textConverted', url, options);
}

export { RequestInit };

export default this;
