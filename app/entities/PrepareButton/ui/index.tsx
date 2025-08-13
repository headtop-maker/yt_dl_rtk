import { FC } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import React, { Feather } from '@expo/vector-icons';
import { dp } from '@/app/shared/lib/getDP';

type Props = {
  onPress: () => void;
  loading?: boolean;
};

const PrepareButton: FC<Props> = ({ onPress, loading }: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <View style={styles.content}>
          <Feather
            name="file-plus"
            size={dp(20)}
            color="#fff"
            style={{ marginRight: dp(8) }}
          />
          <Text style={styles.text}>Prepare Media</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: dp(12),
    paddingHorizontal: dp(20),
    borderRadius: dp(12),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: dp(16),
    fontWeight: '600',
  },
});

export default PrepareButton;
