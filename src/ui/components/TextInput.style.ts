import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    borderColor: theme.colours.gray,
    marginBottom: 10,
    padding: 0,
  },
});
