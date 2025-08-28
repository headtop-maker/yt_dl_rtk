import {
  extendDeleteFileApi,
  mediaDownloadLinkApi,
  mediaInfoApi,
} from '@/app/shared/models/api';
import { DEV_API, dlFetchApiDomain } from '@/app/shared/models/constants';
import { RootState } from '@/app/shared/models/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectCurrentLink } from './selectors';
import {
  resetDownloadInfo,
  resetMediaInfo,
  setCurrentLink,
} from '@/app/shared/models/dlSlice';

export const getMediaInfo = createAsyncThunk(
  `${dlFetchApiDomain}/getInfo`,
  async (params: { link: string }, { dispatch, rejectWithValue }) => {
    const { link } = params;
    dispatch(resetMediaInfo());
    dispatch(resetDownloadInfo());
    try {
      const { data } = await mediaInfoApi(link);
      console.log('getMediaInfo', data);
      dispatch(setCurrentLink(link));
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getDownloadLink = createAsyncThunk(
  `${dlFetchApiDomain}/getDownloadLink`,
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const currentLink = selectCurrentLink(state);
    try {
      const { data } = await mediaDownloadLinkApi(currentLink);
      console.log('downloadLink', `${DEV_API}/downloads/${data.fileName}`);
      return {
        fileName: data.fileName,
        downloadLink: `${DEV_API}/downloads/${data.fileName}`,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const extendDeleteFile = createAsyncThunk(
  `${dlFetchApiDomain}/extendDeleteFile`,
  async (params: { filename: string }, { dispatch, rejectWithValue }) => {
    const { filename } = params;

    try {
      const { data } = await extendDeleteFileApi(filename);
      console.log('extendDeleteFileApi', data);
      return;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
