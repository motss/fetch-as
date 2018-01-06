// @ts-check

export type DataType = 'text' | 'json' | 'blob' | 'arrayBuffer' | 'buffer' | 'textConverted';
export declare interface FetchAsData {
  status: number;
  data: any;
}

/** Import typings */
import {
  RequestInit,
  Response,
} from 'node-fetch';

/** Import project dependencies */
import fetch from 'node-fetch';

async function toDataType(
  response: Response,
  dataType: DataType
) {
  try {
    switch (dataType) {
      case 'text':
        return await response.text();
      case 'json':
        return await response.json();
      case 'blob':
        return await response.blob();
      case 'arrayBuffer':
        return await response.arrayBuffer();
      case 'buffer':
        return await response.buffer();
      case 'textConverted':
        return await response.textConverted();
    }
  } catch (e) {
    throw e;
  }
}

async function fetchThen(
  url: string,
  options: RequestInit,
  dataType: DataType
) {
  try {
    const r = await fetch(url, options);
    const rstat = r.status;
    const d = await toDataType(r, dataType);

    return {
      status: rstat,
      data: (rstat > 399 ? d.error : d.data) || d,
    };
  } catch (e) {
    throw e;
  }
}

export function fetchAsText(url: string, options: RequestInit): Promise<FetchAsData> {
  return fetchThen(url, options, 'text');
}

export function fetchAsJson(url: string, options: RequestInit): Promise<FetchAsData> {
  return fetchThen(url, options, 'json');
}

export function fetchAsBlob(url: string, options: RequestInit): Promise<FetchAsData> {
  return fetchThen(url, options, 'blob');
}

export function fetchAsArrayBuffer(url: string, options: RequestInit): Promise<FetchAsData> {
  return fetchThen(url, options, 'arrayBuffer');
}

export function fetchAsBuffer(url: string, options: RequestInit): Promise<FetchAsData> {
  return fetchThen(url, options, 'buffer');
}

export function fetchAsTextConverted(url: string, options: RequestInit): Promise<FetchAsData> {
  return fetchThen(url, options, 'textConverted');
}

export const fetchAs = {
  text: fetchAsText,
  json: fetchAsJson,
  blob: fetchAsBlob,
  arrayBuffer: fetchAsArrayBuffer,
  buffer: fetchAsBuffer,
  textConverted: fetchAsTextConverted,
};

export default fetchAs;
