/**
 * @Author : HuiWen
 * @Date : 2019-07-22
 * @Description :
 **/

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

const lightColor = ['#F53', '#CF1', '#37c']

const light = (time, cb, color) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb(color);
      resolve();
    }, time)
  })
}

let currColor = '#fff'

class Light extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currColor,
    }
  }

  componentDidMount() {
    this.step()
  }

  step = () => {
    Promise.resolve()
      .then(() => {
        return light(3000, this.setColor, lightColor[0]);
      }).then(() => {
      return light(2000, this.setColor, lightColor[2]);
    }).then(() => {
      return light(1000, this.setColor, lightColor[1]);
    }).then(() => {
      this.step();
    });
  }

  setColor = (currColor) => {
    this.setState({ currColor })
  }


  render() {
    const { currColor } = this.state
    return (
      <View style={styles.container}>
        <View style={[styles.lightView, { backgroundColor: `${currColor}` }]}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2'
  },
  lightView: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#37c'
  }
})

export default Light