// pages/circle/addMoment/addMoment.js
const AV = require('../../../utils/av-weapp-min.js');
const Moment = require('../../../model/moment.js');
const util = require('../../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    addressData: null,
    userStatus: {},
    addRessName: '',
    content: '',
    httpImg: [],
    imgLength: 0,
    imageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    });

    that.data.userStatus['name'] = e.name;
    that.data.userStatus['address'] = e.address;
    that.data.userStatus['lat'] = e.lat;
    that.data.userStatus['lnt'] = e.lnt;
    that.data.userStatus['userId'] = e.userId;
  },
  // 提交信息
  formSubmit: function (e) {
    var that = this;
    console.log(e.detail.value.content);
    if (e.detail.value.content == '' && that.data.imgLength == 0) {
      wx.showModal({
        content: '您还没有写任何东西，请填写内容后再点击提交哦',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('click confirm btn');
          }
        }
      });
    } else {
      if (that.data.addressData == null) {
        that.data.addressData = that.data.userStatus;
      }
      wx.showLoading({
        title: '正在发送...'
      });
      that.uploadImgList(e);
    }
  },
  requestCommitApi: function () {

    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setReadAccess(AV.User.current(), true);
    acl.setWriteAccess(AV.User.current(), true);

    new Moment({
      nickName: that.data.userInfo.nickName,
      avatarUrl: that.data.userInfo.avatarUrl,
      name: that.data.addressData.name,
      address: that.data.addressData.address,
      latitude: that.data.addressData.latitude,
      longitude: that.data.addressData.longitude,
      content: e.detail.value.content,
      userId: that.data.userStatus.userId,
      imgLength: that.data.imgLength,
      imageList: that.data.imageList,
      user: AV.User.current()
    }).setACL(acl).save().then((todo) => {
      wx.hideLoading();
      wx.showToast({
        title: '发表成功',
        icon: 'success',
        duration: 5000
      });
      wx.navigateBack({
        delta: 1
      })
      that.setData({
        httpImg: []
      });
    }).catch(error => console.error(error.message));
  },

  //reset
  formReset: function () {
    console.log('form发生了reset事件');
  },
  // 选择地址
  bindAddress: function () {
    var that = this;

    wx.chooseLocation({
      success: function (res) {
        that.data.addressData = res;
        that.setData({
          addRessName: res.name
        })
      },
    })
  },
  // 选择上传照片
  chooseImage: function () {
    var that = this;
    // that.setData({
    //   httpImg: []
    // });

    wx.chooseImage({
      count: 9 - that.data.imgLength,
      sourceType: ['album', 'camera'],
      sizeType: ['original', 'compressed'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++) {
          that.data.imageList.push(tempFilePaths[i])
        }

        that.setData({
          imgLength: that.data.imageList.length,
          imageList: that.data.imageList
        })
        // that.data.imgLength = tempFilePaths.length
        // 将单次选择的图片轮训上传后端，得到图片url


      },
    })
  },
  uploadImgList: function (e) {//轮询上传服务器图片
    var that = this;

    that.data.imageList.map(tempFilePath => () => new AV.File('filename', {
      blob: {
        uri: tempFilePath,
      },
    }).save()).reduce(
      (m, p) => m.then(v => AV.Promise.all([...v, p()])),
      AV.Promise.resolve([])
      ).then(files => files.map(file =>
        that.data.httpImg.push(file.url())
      )).catch(console.error);


    // for (var a = 0; a < that.data.imgLength; a++) {
    //   var name = "file";
    //   var list = that.data.imageList;
    //   var localFile = list[a];
    //   new AV.File(name, {
    //     blob: {
    //       uri: localFile,
    //     },
    //   }).save().then(file => {
    //     console.log("上传图片的地址：" + file.url())
    //     that.data.httpImg.push(file.url())
    //   }).catch(console.error);
    // }

    var timeS = 0;
    var timeOut = setInterval(function () {
      console.info(that.data.imgLength + "--" + that.data.httpImg.length)
      if (that.data.imgLength == that.data.httpImg.length) {
        that.setData({
          imgLength: that.data.httpImg.length,
          imageList: that.data.httpImg
        })
        // this.requestCommitApi();
        clearInterval(timeOut);


        // var acl = new AV.ACL();
        // acl.setPublicReadAccess(false);
        // acl.setPublicWriteAccess(false);
        // acl.setReadAccess(AV.User.current(), true);
        // acl.setWriteAccess(AV.User.current(), true);

        new Moment({
          nickName: that.data.userInfo.nickName,
          avatarUrl: that.data.userInfo.avatarUrl,
          name: that.data.addressData.name,
          address: that.data.addressData.address,
          latitude: that.data.addressData.latitude,
          longitude: that.data.addressData.longitude,
          content: e.detail.value.content,
          userId: that.data.userStatus.userId,
          imgLength: that.data.imgLength,
          imageList: that.data.imageList,
          user: AV.User.current()
        }).save().then((todo) => {
          wx.hideLoading();
          wx.showToast({
            title: '发表成功',
            icon: 'success',
            duration: 2000
          });
          wx.switchTab({
            url: '../../circle/circle'
          })
          that.setData({
            httpImg: [],
            imgLength: 0,
            imageList: []
          });
        }).catch(error => console.error(error.message));


      }
      else {
        if (timeS > 50) {
          console.log('图片上传失败,请重试')
          clearInterval(timeOut)
        }
      }

      timeS++;

    }, 1000)
  },
  // 预览图片
  previewImage: function (e) // 显示图片大图
  {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  bindLoding: function () { // LOADING加载
    wx.showToast({
      title: '图片上传中',
      icon: 'loading'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})