// @ts-check

/** FIXME: Awaiting node-fetch@2.0.0 stable release */
// export type DataType =
//   'arrayBuffer'
//   | 'blob'
//   | 'buffer'
//   | 'json'
//   | 'text'
//   | 'textConverted';
export type DataType =
  'buffer'
  | 'json'
  | 'text';
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

function toDataType(
  response: Response,
  dataType: DataType
) {
  switch (dataType) {
    /** FIXME: Awaiting node-fetch@2.0.0 stable release */
    // case 'arrayBuffer':
    //   return await response.arrayBuffer();
    // case 'blob':
    //   return await response.blob();
    case 'buffer':
      return response.buffer();
    case 'json':
      return response.json();
    case 'text':
    default:
      return response.text();
    // case 'textConverted':
    //   return await response.textConverted();
  }
}

async function fetchThen(
  url: string,
  options: RequestInit = {} as RequestInit,
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

// export function fetchAsArrayBuffer(url: string, options?: RequestInit): Promise<FetchAsData> {
//   return fetchThen(url, options, 'arrayBuffer');
// }

// export function fetchAsBlob(url: string, options?: RequestInit): Promise<FetchAsData> {
//   return fetchThen(url, options, 'blob');
// }

export function fetchAsBuffer(url: string, options?: RequestInit): Promise<FetchAsData> {
  return fetchThen(url, options, 'buffer');
}

export function fetchAsJson(url: string, options?: RequestInit): Promise<FetchAsData> {
  return fetchThen(url, options, 'json');
}

export function fetchAsText(url: string, options?: RequestInit): Promise<FetchAsData> {
  return fetchThen(url, options, 'text');
}

// export function fetchAsTextConverted(url: string, options?: RequestInit): Promise<FetchAsData> {
//   return fetchThen(url, options, 'textConverted');
// }

export const fetchAs = {
  // arrayBuffer: fetchAsArrayBuffer,
  // blob: fetchAsBlob,
  buffer: fetchAsBuffer,
  json: fetchAsJson,
  text: fetchAsText,
  // textConverted: fetchAsTextConverted,
};

export default fetchAs;
