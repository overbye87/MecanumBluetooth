import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tile from './components/Tile';
import ArrowDown from './assets/arr_d.svg';
import ArrowRoundRight from './assets/arr_rr.svg';

const size = 100;

const Quadruped = () => {
  return (
    <View style={styles.сontainer}>
      <View style={styles.row}>
        <Tile>
          <ArrowDown width={size} height={size} />
        </Tile>
        <Tile>
          <ArrowDown width={size} height={size} />
        </Tile>
        <Tile>
          <ArrowDown width={size} height={size} />
        </Tile>
      </View>
      <View style={styles.row}>
        <Tile>
          <ArrowDown width={size} height={size} />
        </Tile>
        <Tile>
          <ArrowDown width={size} height={size} />
        </Tile>
        <Tile>
          <ArrowDown width={size} height={size} />
        </Tile>
      </View>
      <View style={styles.row}>
        <Tile>
          <ArrowRoundRight width={size} height={size} />
        </Tile>
        <Tile>
          <ArrowRoundRight width={size} height={size} />
        </Tile>
        <Tile>
          <ArrowRoundRight width={size} height={size} />
        </Tile>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  сontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Quadruped;
