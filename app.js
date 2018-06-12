//app.js
const AV = require('./utils/av-weapp-min.js');

AV.init({
  appId: 'onTBneN0GQF9GClhjS0wILLy-9Nh9j0Va',
  appKey: 'px4Akk8OhKr4b7mC2boc2G1o'
});

App({
  onLaunch: function () {
    // 展示本地存储能力

    try {
      //   var nickName = wx.getStorageSync('nickName')
      // var nickName = wx.getStorageSync('nickName')
      // var avatarUrl = wx.getStorageSync('avatarUrl')
      // console.log("nickName=" + nickName + "avatarUrl=" + avatarUrl)
      // console.log("========")
      // var userInfo = wx.getStorageSync("userInfo")
      // console.log("userinfo=" + userinfo)
      wx.getStorage({
        key: 'userInfo',
        success: res => {
          console.log(res.data)
          var userinfo = res.data
          if (userinfo) {
            console.log("userinfo=" + userinfo)
            this.globalData.userInfo = userinfo

          }
          console.log("hahahahah" + this.globalData.userInfo)
        }
      })

    } catch (e) {
      console.error("getStorageSync fail")
    }
   
    // 登录
    this.login();

    // const user = AV.User.current();
    // this.globalData.user = user.toJSON();
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {

    //           user.set(res.userInfo).save().then(user => {
    //             // 成功，此时可在控制台中看到更新后的用户信息
    //             this.globalData.user = user.toJSON();
    //           }).catch(console.error);

    //           // 可以将 res 发送给后台解码出 unionId
    //           // this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  login: function () {
    return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null)
      .then(user => user ? user : AV.User.loginWithWeapp()).catch(error =>
        console.error(error.message));
  },
  globalData: {
    userInfo: null
  }
})