import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';

import {
  isArray,
  microCount,
  selfMap,
  reNumToString,
  keyWordHeightLight,
  maxDenom,
  minMulti,
  addStr,
  addSeparator
} from './src/utils'

Array.prototype.selfMap = selfMap

const { width, height } = Dimensions.get('window')

const setFour = microCount(width - 40)

const sMap = [1, 2, 3, 4]
const ingredients = ['wine', 'tomato', 'onion', 'mushroom']
const valueA = '7986543212345678909999999'
const valueB = '987654321011111'

let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // step()
    console.log("==== reNumToString >>>", reNumToString(1234))

    let res = sMap.selfMap(number => number * 2)
    console.log('=== res >>>>', res)

    let search = keyWordHeightLight('关山难越，谁悲失路之人', '路')
    console.log('==== search >>>>', search)

    let wineReduction = ingredients.reduce((sauce, item) => {
      return sauce += this.cook(item) + ', '
    }, '')

    console.log("=== maxDenom >>>> ", maxDenom(12, 15))

    console.log("=== maxDenom >>>> ", minMulti(4, 6))

    console.log('wineReduction >>>>', wineReduction)

    // console.log('addStr >>>>', addStr(valueA, valueB))

    console.log('=== addSeparator >>', addSeparator(valueA))
  }

  reSetThree = (list) => {
    let res = []

    const map = list.reduce((res, v) => (res[v.id] = v, res), {})
    console.log('=== map >>>>', map)
    // list.forEach((item) => {
    //   const props = {
    //     ...item,
    //
    //   }
    // })

    return list
  }

  cook = (ingredient) => {
    return `cooked ${ingredient}`
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          {'Botare'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
