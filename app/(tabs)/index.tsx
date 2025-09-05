import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
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
import { AdRequest, BannerAdSize, BannerView, Gender } from 'yandex-mobile-ads';

const createBanner = async () => {
  let adSize = await BannerAdSize.inlineSize(
    Dimensions.get('window').width,
    100
  );

  let adRequest = new AdRequest({
    age: '20',
    contextQuery: 'context-query',
    contextTags: ['context-tag'],
    gender: Gender.Male,
  });

  return (
    <BannerView
      size={adSize}
      adUnitId={'demo-banner-yandex'} // or 'demo-banner-yandex'
      adRequest={adRequest}
      onAdLoaded={() => console.log('Did load')}
      onAdFailedToLoad={(event: any) =>
        console.log(
          `Did fail to load with error: ${JSON.stringify(event.nativeEvent)}`
        )
      }
      onAdClicked={() => console.log('Did click')}
      onLeftApplication={() => console.log('Did leave application')}
      onReturnToApplication={() => console.log('Did return to application')}
      onAdImpression={(event: any) =>
        console.log(
          `Did track impression: ${JSON.stringify(
            event.nativeEvent.impressionData
          )}`
        )
      }
      onAdClose={() => console.log('Did close')}
    />
  );
};

export default function TabOneScreen() {
  const loading = useAppSelector(selectIsLoading);
  const mediaInfo = useAppSelector(selectMediaInfo);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
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
      <View>{createBanner()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: dp(20),
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
