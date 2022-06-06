import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { theme } from '../../../styles/theme';
import { styles } from './Tile.style';

type Props = {
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
  children?: React.ReactNode,
  loading?: boolean,
  disabled?: boolean,
  style?: StyleProp<ViewStyle>,
};

const Tile: React.FC<Props> = ({
  onPress,
  children,
  loading,
  disabled,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={loading ? undefined : onPress}
      style={[styles.tile, style, disabled && styles.disabled]}
    >
      {
        loading
          ? (
            <ActivityIndicator
              size="large"
              color={theme.colours.buttonText}
            />
          )
          : (
            children
          )
      }
    </TouchableOpacity>
  );
};

Tile.defaultProps = {
  onPress: undefined,
  style: null,
  children: null,
  disabled: false,
  loading: false,
};

export default Tile;
