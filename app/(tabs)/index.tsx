import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import LinkInput from '../entities/LinkInput/ui';
import { dp } from '@/app/shared/lib/getDP';
import { CustomFonts } from '@/constants/CustomFonts';

import { useAppDispatch, useAppSelector } from '../shared/models/storeHooks';
import { getMediaInfo } from './models/actions';
import { selectIsLoading } from '../shared/models/selectors';
import { selectMediaInfo } from './models/selectors';
import VideoInfoCard from '../entities/VideoInfoCard/ui';
import { secToMin } from '../shared/lib/secToMin';

import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from '../entities/Separator';
import PrepareFile from '../widgets/PrepareFile';

export default function TabOneScreen() {
  const loading = useAppSelector(selectIsLoading);
  const mediaInfo = useAppSelector(selectMediaInfo);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <LinkInput
        setStateLink={(link: string) => {
          dispatch(getMediaInfo({ link }));
        }}
        disableSearch={false}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <Separator />
          <Text style={{ fontFamily: CustomFonts.openSansBold, fontSize: 18 }}>
            getting information
          </Text>
          <ActivityIndicator size={'large'} />
        </View>
      )}

      {!!mediaInfo && (
        <ScrollView style={{ width: '100%', height: '100%' }}>
          <Separator />
          <VideoInfoCard
            data={{
              title: mediaInfo.title,
              thumbnail: mediaInfo.thumbnail,
              duration: secToMin(Number(mediaInfo.duration)) + ' min',
              uploader: mediaInfo.uploader,
            }}
          />
          <Separator />
          <PrepareFile />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dp(20),
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  loadingContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: dp(20),
  },
});
