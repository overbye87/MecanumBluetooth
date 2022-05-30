import React from 'react';
import {
  StyleSheet,
  TextInput as ReactTextInput,
} from 'react-native';

import { theme } from '../styles/theme';

type Props = {
  value: string,
  onChangeText: (text: string) => void | undefined,
};

const TextInput: React.FC<Props> = ({ value, onChangeText }) => {
  return (
    <ReactTextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
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

export default TextInput;
