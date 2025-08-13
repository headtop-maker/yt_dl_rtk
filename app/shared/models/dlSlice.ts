import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DlState } from './types';
import { getDownloadLink, getMediaInfo } from '@/app/(tabs)/models/actions';

const initialState: DlState = {
  mediaInfo: undefined,
  actionState: { error: '', loading: false },
  downloadInfo: undefined,
  currentLink: '',
};

export const dlSlice = createSlice({
  name: 'dlSlice',
  initialState,
  reducers: {
    resetMediaInfo: (state) => {
      state.mediaInfo = undefined;
    },
    resetDownloadInfo: (state) => {
      state.downloadInfo = undefined;
    },
    setCurrentLink: (state, action: PayloadAction<DlState['currentLink']>) => {
      state.currentLink = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMediaInfo.pending, (state) => {
      state.actionState.loading = true;
      state.actionState.error = '';
    });
    builder.addCase(getMediaInfo.fulfilled, (state, action) => {
      state.actionState.loading = false;
      state.mediaInfo = action.payload;
    });
    builder.addCase(getMediaInfo.rejected, (state) => {
      state.actionState.loading = false;
      state.actionState.error = 'Ошибка запроса';
    });

    builder.addCase(getDownloadLink.fulfilled, (state, action) => {
      state.actionState.loading = false;
      state.downloadInfo = action.payload;
    });
  },
});

export const { resetMediaInfo, setCurrentLink, resetDownloadInfo } =
  dlSlice.actions;

export default dlSlice.reducer;
