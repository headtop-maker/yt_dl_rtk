import { dp } from '@/app/shared/lib/getDP';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FileInfoProps {
  name: string;
  size: number; // в байтах
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const FileInfo: React.FC<FileInfoProps> = ({ name, size }) => {
  const extension = name.split('.').pop()?.toUpperCase() || '';
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Text style={styles.extension}>{extension}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.size}>{formatBytes(size)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: dp(16),
    paddingVertical: dp(12),
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  iconBox: {
    width: dp(44),
    height: dp(44),
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  extension: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  size: {
    fontSize: 14,
    color: '#8E8E93',
  },
});

export default FileInfo;
