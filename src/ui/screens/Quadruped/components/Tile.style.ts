import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/theme';

export const styles = StyleSheet.create({
  tile: {
    minHeight: 100,
    minWidth: 100,
    // backgroundColor: theme.colours.button,
    margin: 10,
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: theme.colours.gray,
  },
});
