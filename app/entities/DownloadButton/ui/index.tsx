import { downloadFiles } from '@/app/shared/lib/downloadFiles';
import { dp } from '@/app/shared/lib/getDP';
import { Ionicons } from '@expo/vector-icons';
import React, { FC, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
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
  callBack,
}) => {
  const { downloadFiles, progressPercent } = useDownloadFiles();
  const dispatch = useAppDispatch();
  let intId: ReturnType<typeof setInterval>;

  useEffect(() => {
    if (progressPercent > 98) {
      clearInterval(intId);
    }
  }, [progressPercent]);

  const handleInterval = () => {
    intId = setInterval(() => {
      dispatch(extendDeleteFile({ filename: name }));
    }, DELETE_DELAY_MS * 3);
  };

  const handleDownload = async () => {
    if (callBack) {
      callBack();
    }
    await downloadFiles(downloadLink, name);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        handleDownload();
        handleInterval();
      }}
      style={styles.button}
      disabled={isDisabled}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eb0f0f',
    paddingVertical: dp(12),
    paddingHorizontal: dp(20),
    borderRadius: dp(12),
    alignItems: 'center',
    justifyContent: 'space-around',
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
