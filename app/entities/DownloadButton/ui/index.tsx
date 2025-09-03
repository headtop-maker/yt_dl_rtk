import { dp } from '@/app/shared/lib/getDP';
import { Ionicons } from '@expo/vector-icons';
import React, { FC, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { CustomFonts } from '@/constants/CustomFonts';
import { useAppDispatch } from '@/app/shared/models/storeHooks';
import { extendDeleteFile } from '@/app/(tabs)/models/actions';
import { useDownloadFiles } from '@/app/shared/hooks/useDownloadFiles';

type TDownloadButton = {
  downloadLink: string;
  name: string;
  isDisabled: boolean;
  callBack?: () => void;
};

const DELETE_DELAY_MS = 60 * 1000;

const DownloadButton: FC<TDownloadButton> = ({
  downloadLink,
  name,
  isDisabled,
}) => {
  const {
    downloadFiles,
    resumeDownload,
    pauseDownload,
    progressPercent,
    isDownloading,
    isFinish,
  } = useDownloadFiles();

  const dispatch = useAppDispatch();
  let intId = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    console.log('clearId', intId.current, isFinish);
    if (isFinish) {
      console.log('clearId', intId.current);
      clearInterval(intId.current);
    }
  }, [isFinish]);

  const handleInterval = () => {
    console.log(intId.current);
    if (intId.current) {
      clearInterval(intId.current);
    }
    intId.current = setInterval(() => {
      dispatch(extendDeleteFile({ filename: name }));
      console.log(intId.current);
    }, DELETE_DELAY_MS * 3);
  };

  const handleDownload = async () => {
    console.log(isDownloading, progressPercent);
    if (!isDownloading && progressPercent === 0) {
      if (intId.current) {
        clearInterval(intId.current);
      }
      await downloadFiles(downloadLink, name);
      handleInterval();
    }
    if (isDownloading && progressPercent > 0 && progressPercent !== 100) {
      pauseDownload();
    }
    if (!isDownloading && progressPercent > 0 && progressPercent !== 100) {
      resumeDownload();
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleDownload();
      }}
      style={[
        styles.button,
        { justifyContent: progressPercent > 0 ? 'space-between' : 'center' },
      ]}
      disabled={isDisabled}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Ionicons
          name="cloud-download-outline"
          size={dp(23)}
          color="#FFFFFF"
          style={{ marginRight: dp(8) }}
        />
        <Text style={styles.text}>Download file</Text>
      </View>
      {progressPercent > 0 && (
        <Text style={styles.text}>{progressPercent + `%`}</Text>
      )}
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
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  text: {
    color: '#fff',
    fontFamily: CustomFonts.openSansBold,
    fontSize: dp(18),
    right: 0,
  },
});

export default DownloadButton;
