import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: { margin: 10 },
  id: { fontSize: 20 },
  name: { fontSize: 40, color: theme.colours.red },
  rssi: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
