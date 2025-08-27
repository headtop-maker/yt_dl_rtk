import React, { FC, Suspense } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { dp } from '@/app/shared/lib/getDP';
import { DEV_API } from '@/app/shared/models/constants';
import { CustomFonts } from '@/constants/CustomFonts';

type VideoInfo = {
  title: string;
  thumbnail: string;
  duration: string;
  uploader: string;
};

type Props = {
  data: VideoInfo | null;
};

const VideoInfoCard: FC<Props> = ({ data }: Props) => {
  if (!data) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Suspense fallback={<ActivityIndicator size={'large'} />}>
        <Image
          source={{
            uri: `${DEV_API}/proxy?url=${data.thumbnail}`,
          }}
          style={styles.thumbnail}
        />
      </Suspense>

      <View style={styles.info}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.textWithIcon}>
          <Ionicons size={24} name="timer-outline" />
          <Text style={styles.detail}>{data.duration}</Text>
        </View>
        <View style={styles.textWithIcon}>
          <Ionicons size={24} name="cloud-upload-outline" />
          <Text style={styles.detail}>{data.uploader}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  thumbnail: {
    width: '100%',
    height: dp(200),
  },
  textWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  info: {
    padding: dp(12),
  },
  title: {
    fontSize: dp(18),
    fontFamily: CustomFonts.openSansRegular,
    marginBottom: 6,
    color: '#000000',
  },
  detail: {
    fontSize: 16,
    color: '#666',
    margin: dp(3),
    fontFamily: CustomFonts.openSansRegular,
  },
  emptyContainer: {
    marginTop: dp(40),
    padding: dp(20),
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default VideoInfoCard;
