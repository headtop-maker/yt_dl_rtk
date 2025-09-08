import { RootState } from './store';

export const selectIsLoading = (state: RootState) =>
  state.dlStore.actionState.loading;

export const selectMediaInfo = (state: RootState) => state.dlStore.mediaInfo;

export const selectCurrentLink = (state: RootState) =>
  state.dlStore.currentLink;

export const selectDownloadLink = (state: RootState) =>
  state.dlStore.downloadInfo?.downloadLink;

export const selectFileName = (state: RootState) =>
  state.dlStore.downloadInfo?.fileName;
