// @ts-check

export type DataType =
  'arrayBuffer'
  | 'blob'
  | 'buffer'
  | 'json'
  | 'text'
  | 'textConverted';
export interface FetchAsData {
  status: number;
  data?: any;
  error?: any;
}

import {
  RequestInit,
  Response,
} from 'node-fetch';

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

async function fetchThen(dataType: DataType, url: string, options?: RequestInit) {
  try {
    const r = await fetch(url, options);
    const rstat = r.status;
    const d = await toDataType(r, dataType);

    return { status: rstat, [rstat > 399 ? 'error' : 'data']: d };
  } catch (e) {
    throw e;
  }
}

export function fetchAsArrayBuffer(url: string, options?: RequestInit): Promise<FetchAsData> {
  return fetchThen('arrayBuffer', url, options);
}

export function fetchAsBlob(url: string, options?: RequestInit): Promise<FetchAsData> {
  return fetchThen('blob', url, options);
}

export function fetchAsBuffer(url: string, options?: RequestInit): Promise<FetchAsData> {
  return fetchThen('buffer', url, options);
}

export function fetchAsJson(url: string, options?: RequestInit): Promise<FetchAsData> {
  return fetchThen('json', url, options);
}

export function fetchAsText(url: string, options?: RequestInit): Promise<FetchAsData> {
  return fetchThen('text', url, options);
}

export function fetchAsTextConverted(url: string, options?: RequestInit): Promise<FetchAsData> {
  return fetchThen('textConverted', url, options);
}

export { RequestInit };

export default this;
