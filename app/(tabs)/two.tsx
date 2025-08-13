import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Feather } from '@expo/vector-icons';
import { dp } from '@/app/shared/lib/getDP';
import { VideoView, VideoSource, useVideoPlayer } from 'expo-video';
import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import React from 'react';

export default function TabTwoScreen() {
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null
  );

  const videoSource: VideoSource = file && file?.uri;

  const player = useVideoPlayer(videoSource);

  const handleDocument = async () => {
    try {
      // Разрешаем выбрать любой тип файла
      const res = await DocumentPicker.getDocumentAsync({
        type: ['video/mp4', 'audio/mp3'], // или 'image/*', 'application/pdf' и т.д.
        copyToCacheDirectory: false, // копируем в кэш, чтобы можно было читать
        multiple: false, // если нужен один файл
      });

      if (res.assets) {
        setFile(res.assets[0]);
      }
    } catch (err) {
      Alert.alert('Error', String(err));
    }
  };

  return (
    <View style={styles.container}>
      {!!file?.uri && (
        <View style={styles.videoContainer}>
          <Text style={styles.textName}>{file.name}</Text>
          <VideoView
            player={player}
            nativeControls={true}
            style={styles.videoFile}
          />
        </View>
      )}

      <TouchableOpacity
        style={{ alignItems: 'center', justifyContent: 'center' }}
        onPress={handleDocument}
      >
        <Feather name="folder-plus" size={dp(40)} color="#000000" />
        <Text style={styles.title}>Open Folder</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  videoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: dp(10),
  },
  videoFile: {
    width: '100%',
    backgroundColor: '#7c9599',
    height: dp(300),
    borderRadius: dp(20),
  },
  textName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
});
