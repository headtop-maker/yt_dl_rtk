import { downloadFiles } from '@/app/shared/lib/downloadFiles';
import { dp } from '@/app/shared/lib/getDP';
import { Ionicons } from '@expo/vector-icons';
import React, { FC, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { CustomFonts } from '@/constants/CustomFonts';

type TDownloadButton = {
  downloadLink: string;
  name: string;
  isDisabled: boolean;
  callBack?: () => void;
};

const DownloadButton: FC<TDownloadButton> = ({
  downloadLink,
  name,
  isDisabled,
  callBack,
}) => {
  const [progressPercent, setProgressPercent] = useState(0);

  const cbProgress = (downloadProgress: FileSystem.DownloadProgressData) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgressPercent(+(progress * 100).toFixed(1));
  };

  const handleDownload = async () => {
    if (callBack) {
      callBack();
    }
    setProgressPercent(0);
    await downloadFiles(downloadLink, name, cbProgress);
  };

  return (
    <TouchableOpacity
      onPress={handleDownload}
      style={styles.button}
      disabled={isDisabled}
    >
      <Ionicons
        name="cloud-download-outline"
        size={dp(23)}
        color="#FFFFFF"
        style={{ marginRight: dp(8) }}
      />
      <Text style={styles.text}>
        Download file {progressPercent > 0 && progressPercent + `%`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#eb0f0f',
    paddingVertical: dp(12),
    paddingHorizontal: dp(20),
    borderRadius: dp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  text: {
    color: '#fff',
    fontFamily: CustomFonts.openSansBold,
    fontSize: dp(18),
  },
});

export default DownloadButton;
