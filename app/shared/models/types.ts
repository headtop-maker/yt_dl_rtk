export interface DlState {
  mediaInfo: TMediaInfo | undefined;
  currentLink: string;
  downloadInfo: TDownloadInfo | undefined;
  actionState: TActionState;
}

export interface TMediaInfo {
  title: string;
  thumbnail: string;
  duration: string;
  uploader: string;
}

export type TActionState = {
  loading: boolean;
  error: string | undefined;
};

export type TDownloadInfo = {
  fileName: string;
  downloadLink: string;
};

export interface TDownloadLink {
  fileName: string;
}
