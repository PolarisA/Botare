import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';

import XingePush from 'react-native-pure-xinge-push'


function alert(name, data) {
  console.log(name, data)
  Alert.alert(
    name,
    JSON.stringify(data)
  )
}


XingePush.addEventListener('start', function (data) {
  alert('start', data)
})

XingePush.addEventListener('stop', function (data) {
  alert('stop', data)
})

XingePush.addEventListener('bindAccount', function (data) {
  alert('bindAccount', data)
})

XingePush.addEventListener('unbindAccount', function (data) {
  alert('unbindAccount', data)
})

XingePush.addEventListener('bindTag', function (data) {
  alert('bindTag', data)
})

XingePush.addEventListener('unbindTag', function (data) {
  alert('unbindTag', data)
})

XingePush.addEventListener('register', function (data) {
  alert('resgiter', data)
})

XingePush.addEventListener('notification', function (data) {
  alert('notification', data)
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // this.openPush()
  }

  // openPush() {
  //   console.log("==== openPush >>> ")
  //   // 安卓开启厂商推送
  //   XingePush.enableOtherPush(true)
  //   XingePush.setDebug(true)
  //   XingePush.start('2100339680', 'A12Z6I6E6LBP')
  //
  //   // 监听事件
  //   let binder = XingePush.addEventListener('register', function (data) {
  //
  //     // 信鸽错误码
  //     // ios: https://xg.qq.com/docs/ios_access/ios_returncode.html
  //     // android: https://xg.qq.com/docs/android_access/android_returncode.html
  //     console.log("=== data.error >>> ", data.error)
  //     if (data.error) {
  //       return
  //     }
  //
  //     console.log('==== get data >>>>', data)
  //
  //     // // 获取 deviceToken
  //     // data.deviceToken()
  //
  //     // 绑定帐号 (string)
  //     XingePush.bindAccount('account')
  //
  //     // 解除绑定帐号 (string)
  //     XingePush.unbindAccount('account')
  //
  //     // 绑定标签 (Array)
  //     XingePush.bindTags(['tag1', 'tag2'])
  //
  //     // 解除绑定标签 (Array)
  //     XingePush.unbindTags(['tag1', 'tag2'])
  //   })
  // }

  onPushStart = () => {
    XingePush.start(2100339680, 'A12Z6I6E6LBP')
    console.log("==== onPushStart XingePush >>> ", XingePush)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.onPushStart}>
          {'Botare'}
        </Text>

        <Text style={styles.welcome} onPress={() => {
          XingePush.stop()
        }}>
          stop
        </Text>
        <Text style={styles.welcome} onPress={() => {
          XingePush.bindAccount('tester')
        }}>
          bindAccount
        </Text>
        <Text style={styles.welcome} onPress={() => {
          XingePush.unbindAccount('tester')
        }}>
          unbindAccount
        </Text>

        <Text style={styles.welcome} onPress={() => {
          XingePush.setBadge(0)
        }}>
          setBadge(0)
        </Text>
        <Text style={styles.welcome}
              onPress={() => {
                XingePush.getBadge().then(data => {
                  alert('getBadge', data)
                })
              }}>
          getBadge()
        </Text>
        <Text style={styles.welcome} onPress={() => {
          XingePush.setDebug(true)
        }}>
          setDebug(true)
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
});
