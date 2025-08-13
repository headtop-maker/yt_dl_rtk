import { getDownloadLink } from '@/app/(tabs)/models/actions';
import {
  selectDownloadLink,
  selectFileName,
} from '@/app/(tabs)/models/selectors';
import DownloadButton from '@/app/entities/DownloadButton/ui';
import FileInfo from '@/app/entities/FileInfo/ui';
import PrepareButton from '@/app/entities/PrepareButton/ui';
import Separator from '@/app/entities/Separator';
import { useSSEvents } from '@/app/shared/hooks/useSSEvents';
import { dp } from '@/app/shared/lib/getDP';
import { useAppDispatch, useAppSelector } from '@/app/shared/models/storeHooks';
import { useEffect } from 'react';
import { Linking, TouchableOpacity, Text, StyleSheet } from 'react-native';

const PrepareFile = () => {
  const downloadLink = useAppSelector(selectDownloadLink);
  const fileName = useAppSelector(selectFileName);
  const dispatch = useAppDispatch();

  const { data, handleSSEConnect, cleanSSEConnect } = useSSEvents<{
    fileName: string;
    fileSize: number;
  }>();

  const predicateData =
    data &&
    typeof data === 'object' &&
    'fileName' in data &&
    data.fileName !== '';

  useEffect(() => {
    handleSSEConnect();
    return () => {
      cleanSSEConnect();
    };
  }, []);

  console.log('downloadLink', downloadLink);
  return (
    <>
      {predicateData && (
        <>
          <FileInfo name={data.fileName} size={data.fileSize} />
          <Separator />
        </>
      )}

      {!downloadLink && (
        <PrepareButton
          onPress={() => {
            dispatch(getDownloadLink());
          }}
          loading={false}
        />
      )}
      {!!downloadLink && (
        <>
          <TouchableOpacity
            onPress={() => Linking.openURL(downloadLink)}
            style={styles.openLink}
          >
            <Text>{downloadLink}</Text>
          </TouchableOpacity>
          <DownloadButton
            downloadLink={downloadLink}
            name={fileName || 'yt_dl_file.mp4'}
            isDisabled={false}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  openLink: {
    alignItems: 'center',
    margin: dp(18),
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default PrepareFile;
