//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasLogined: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.open();
  },
  open: function () {

    wx.getStorage({
      key: 'isLogined',
      success: res => {
        console.log(res.data)
        this.setData({
          hasLogined: res.data
        })
        if (res.data) {
          wx.switchTab({
            url: '/pages/house/house'
          })
        }
      }
    })

   
  },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      console.log("go to this")
      wx.switchTab({
        url: '/pages/house/house'
      })

      try {
        wx.setStorage({
          key: "isLogined",
          data: true
        })

        wx.setStorage({
          key: "userInfo",
          data: e.detail.userInfo
        })


        // wx.setStorageSync("isLogined", true)
        // var info = JSON.stringify(e.detail.userInfo);
        // wx.setStorageSync("userInfo", info)
        // console.log(info)
        // wx.setStorageSync("nickName", e.detail.userInfo.nickName)
        // wx.setStorageSync("avatarUrl", e.detail.userInfo.avatarUrl)
      } catch (e) {
        console.error('setStoragefail')
      }
    }else{
      wx.showToast({
        title: '只有允许小程序使用您的头像和昵称才能进入哦',
        icon: 'none',
        duration: 2000
      })
    }
    
   
  },
  clickImg:function(){
    console.log()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})
