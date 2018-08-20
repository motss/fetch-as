// @ts-check

export type DataType =
  'arrayBuffer'
  | 'blob'
  | 'buffer'
  | 'json'
  | 'text'
  | 'textConverted';
interface FetchAsReturnType {
  data?: { [key: string]: any; };
  error?: { [key: string]: any; };
}
export interface FetchAsData<T extends FetchAsReturnType> {
  status: number;
  data?: T['data'];
  error?: T['error'];
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

async function fetchThen<T>(
  dataType: DataType,
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  try {
    const r = await fetch(url, options);
    const rstat = r.status;
    const d = await toDataType(r, dataType);

    return { status: rstat, [rstat > 399 ? 'error' : 'data']: d };
  } catch (e) {
    throw e;
  }
}

export function fetchAsArrayBuffer<T>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('arrayBuffer', url, options);
}

export function fetchAsBlob<T>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('blob', url, options);
}

export function fetchAsBuffer<T>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('buffer', url, options);
}

export function fetchAsJson<T>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('json', url, options);
}

export function fetchAsText<T>(
  url: string,
  options?: RequestInit
): Promise<FetchAsData<T>> {
  return fetchThen<T>('text', url, options);
}

export function fetchAsTextConverted<T>(
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
