import React from 'react';
import {
  TextInput as ReactTextInput,
} from 'react-native';

import { styles } from './TextInput.style';

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

export default TextInput;
