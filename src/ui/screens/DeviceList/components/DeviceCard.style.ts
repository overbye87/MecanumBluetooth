import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: theme.colours.gray,
    borderRadius: 5,
    backgroundColor: theme.colours.white,
    padding: 10,
    margin: 5,
  },
  selected: {
    backgroundColor: theme.colours.button,
  },
  id: {
  },
  name: {
    fontSize: 20,
  },
  connected: {
    color: 'darkgreen',
  },
});
