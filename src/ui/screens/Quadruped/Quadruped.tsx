import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Tile from './components/Tile';
import ArrowDown from './assets/arr_d.svg';
import ArrowRoundRight from './assets/arr_rr.svg';
import Button from '../../components/Button';
import { NavigationAppStack } from '../../navigation/AppNavigation';
import { styles } from './Quadruped.style';

const size = 100;

const Quadruped = () => {
  const { navigate } = useNavigation<NavigationAppStack<'Joystick'>>();
  return (
    <View style={styles.сontainer}>
      <View style={styles.row}>
        <Tile>
          <ArrowRoundRight
            width={size}
            height={size}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </Tile>
        <Tile>
          <ArrowDown
            width={size}
            height={size}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </Tile>
        <Tile>
          <ArrowRoundRight
            width={size}
            height={size}
          />
        </Tile>
      </View>
      <View style={styles.row}>
        <Tile>
          <ArrowDown
            width={size}
            height={size}
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        </Tile>
        <Tile>
          <View />
        </Tile>
        <Tile>
          <ArrowDown
            width={size}
            height={size}
            style={{ transform: [{ rotate: '-90deg' }] }}
          />
        </Tile>
      </View>
      <View style={styles.row}>
        <Tile>
          <ArrowRoundRight
            width={size}
            height={size}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </Tile>
        <Tile>
          <ArrowDown
            width={size}
            height={size}
          />
        </Tile>
        <Tile>
          <ArrowRoundRight
            width={size}
            height={size}
            style={{ transform: [{ scaleY: -1 }] }}
          />
        </Tile>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="BACK"
          onPress={() => navigate('Main')}
        />
      </View>
    </View>
  );
};

export default Quadruped;
