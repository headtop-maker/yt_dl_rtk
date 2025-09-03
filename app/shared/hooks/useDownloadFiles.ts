import { useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

export const useDownloadFiles = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const [progressPercent, setProgressPercent] = useState(0);
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
    downloadResumable.current = FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + name,
      {},
      cbProgress
    );

    try {
      console.log('start dl');
      const result = await downloadResumable.current.downloadAsync();
      setIsDownloading(true);
      if (result) {
        saveFile(result.uri);
      }
      console.log('stop dl');
      setIsDownloading(false);
    } catch (e) {
      console.log('Download error:', e);
      setIsDownloading(false);
    }
  };

  const readFiles = async () => {
    if (FileSystem.documentDirectory) {
      await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    }
  };

  const pauseDownload = async () => {
    console.log('pauseDownload');
    if (downloadResumable.current) {
      try {
        await downloadResumable.current.pauseAsync();
        setIsDownloading(false);
      } catch (e) {
        console.log('Pause error:', e);
      }
    }
  };

  const resumeDownload = async () => {
    console.log('resumeDownload');
    if (downloadResumable.current) {
      try {
        await downloadResumable.current.resumeAsync();
        setIsDownloading(true);
      } catch (e) {
        console.log('Resume error:', e);
      }
    }
  };

  const saveFile = async (uri: string) => {
    shareAsync(uri);
    readFiles();
  };

  return {
    downloadFiles,
    pauseDownload,
    resumeDownload,
    progressPercent,
    isDownloading,
  };
};
