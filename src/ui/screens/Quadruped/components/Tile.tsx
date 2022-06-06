import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { theme } from '../../../styles/theme';

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

const styles = StyleSheet.create({
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

export default Tile;
