import { dp } from '@/app/shared/lib/getDP';
import { View } from '@/components/Themed';
import { StyleSheet } from 'react-native';

const Separator = () => {
  return (
    <View
      style={styles.separator}
      lightColor="#eee"
      darkColor="rgba(255,255,255,0.1)"
    />
  );
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    marginVertical: dp(10),
    height: 1,
    width: '83%',
    alignSelf: 'center',
  },
});
