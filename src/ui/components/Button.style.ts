import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    backgroundColor: theme.colours.button,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    minWidth: 150,
  },
  disabled: {
    backgroundColor: theme.colours.gray,
  },
  text: {
    color: theme.colours.buttonText,
  },
});
