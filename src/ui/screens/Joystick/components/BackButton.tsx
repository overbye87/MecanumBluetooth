import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import BackLogo from '../../../../assets/back-svgrepo-com.svg';

type Props = {
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
  style?: StyleProp<ViewStyle>,
};

const BackButton: React.FC<Props> = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      <BackLogo width={60} height={60} />
    </TouchableOpacity>
  );
};

BackButton.defaultProps = {
  onPress: undefined,
  style: null,
};

export default BackButton;
