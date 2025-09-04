import { useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

export const useDownloadFiles = () => {
  const [progressPercent, setProgressPercent] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  let downloadResumable = useRef<FileSystem.DownloadResumable | null>(null);

  const cbProgress = (downloadProgress: FileSystem.DownloadProgressData) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    const percent = +(progress * 100).toFixed(1);

    setProgressPercent(percent);
  };

  const downloadFiles = async (url: string, name: string) => {
    if (!!downloadResumable.current) {
      await downloadResumable.current.cancelAsync();
    }

    setProgressPercent(0);
    setIsFinish(false);
    downloadResumable.current = FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + name,
      {},
      cbProgress
    );

    try {
      const result = await downloadResumable.current.downloadAsync();
      if (result) {
        saveFile(result.uri);
        setProgressPercent(0);
        setIsFinish(true);
      }
    } catch (e) {
      console.log('Download error:', e);
    }
  };

  const readFiles = async () => {
    if (FileSystem.documentDirectory) {
      await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    }
  };

  const saveFile = async (uri: string) => {
    shareAsync(uri);
    readFiles();
  };

  return {
    downloadFiles,
    isFinish,
    progressPercent,
  };
};
