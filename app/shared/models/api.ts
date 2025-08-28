import axios, { AxiosResponse } from 'axios';
import { DEV_API } from './constants';
import { TDownloadLink, TMediaInfo } from './types';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=UTF-8',
  Connection: 'keep-alive',
  'x-api-key': 'mobileAgent',
};

const axiosInstance = axios.create({
  headers,
});

export const mediaInfoApi = (
  url: string
): Promise<AxiosResponse<TMediaInfo, unknown>> =>
  axiosInstance({
    data: {
      currentLink: url,
    },
    method: 'POST',
    url: `${DEV_API}/uploadVideo/info`,
  });

export const extendDeleteFileApi = (
  fileName: string
): Promise<AxiosResponse<unknown, unknown>> =>
  axiosInstance({
    data: {
      fileName: fileName,
    },
    method: 'POST',
    url: `${DEV_API}/uploadVideo/extendDelete`,
  });

export const checkFileApi = (
  fileName: string
): Promise<AxiosResponse<boolean, unknown>> =>
  axiosInstance({
    timeout: 300000,
    method: 'GET',
    url: `${DEV_API}/uploadVideo/isread?fileName=${fileName}`,
  });

export const getFileSizeApi = (
  fileName: string
): Promise<AxiosResponse<boolean, unknown>> =>
  axiosInstance({
    timeout: 300000,
    method: 'GET',
    url: `${DEV_API}/uploadVideo/filesize?fileName=${fileName}`,
  });

export const mediaDownloadLinkApi = (
  url: string
): Promise<AxiosResponse<TDownloadLink, unknown>> =>
  axiosInstance({
    data: {
      currentLink: url,
    },
    method: 'POST',
    url: `${DEV_API}/uploadVideo/uploadFile`,
  });
