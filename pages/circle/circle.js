// pages/circle/circle.js
const AV = require('../../utils/av-weapp-min.js');
const Moment = require('../../model/moment.js');
const util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},//用户信息  
    resultData: [],//存放数据
    timesData: [],
    userStatus: {},//存放地理位置
    scrolltop: 20,//滑动轴top
    page: 1,//页码
    cz_flag: false,
    cz_right: 0,
    cz_top: 80,
    dz_id: null//点赞id

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    that.setData({
      userInfo: AV.User.current().toJSON()
    });
    that.data.userStatus['state'] = e.state;
    //console.debug(e.state)
    // 上一个页面传过来的用户信息参数赋值
    that.data.userStatus['name'] = e.name;
    that.data.userStatus['address'] = e.address;
    that.data.userStatus['userId'] = e.userId;
    that.data.userStatus['userId'] = app.userId;
    that.bindLoding()
    that.onloadRequest(0)

    var dataTop = { 'detail': { 'scrollTop': 0 } }
    that.scrollHandle(dataTop)
  },
  onloadRequest: function (e, page) {
    page = page == undefined ? 0 : page
    var that = this
    if (e == 0) {
      that.queryMomentData()
    } else if (e == 1) {

    }
  },
  queryMomentData: function () {
    var that = this;
    var query = new AV.Query('Moment');
    query.limit(10);
    query.descending('createdAt');
    query.find().then(function (result) {
      that.setData({
        resultData: result
      });

      for (var i = 0; i < result.length; i++) {
        var time = result[i].get('createdAt');
        that.data.timesData.push(util.getDateDiff(time));
      }
      that.setData({
        timesData: that.data.timesData
      });
    }, function (error) { });

  }, bindLoding: function () { // LOADING加载
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
  },
  onPullDownRefresh: function () { //下拉刷新
    var that = this
    that.bindLoding()
    that.onloadRequest(0)
    that.setData({
      page: 1,
      resultData: []
    })

  },
  scrollHandle: function (e) { //滚动事件

    var anum = e.detail.scrollTop <= 20 ? 20 : e.detail.scrollTop
    var that = this
    that.donghua(anum)
  }, scrollLoading: function () { //滚动加载
    var that = this

    that.setData({
      page: that.data.page + 1
    })
    that.bindLoding()
    that.onloadRequest(1, that.data.page)
    that.setData({
      scrolltop: that.data.scrolltop
    })
  },
  donghua: function (topNum) // 发布按钮动画
  {
    var that = this
    // 动画1
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
    })

    var animation1 = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
      delay: 0,
    })

    animation.opacity(0).translateY(topNum + 5).step()
    animation1.opacity(0).translateY(topNum + 5).step()

    that.setData({
      animationData1: animation.export(),
      animationData2: animation1.export()
    })

    setTimeout(function () {
      animation.opacity(1).step()
      animation1.opacity(1).step()

      that.setData({
        animationData1: animation.export(),
        animationData2: animation1.export()
      })
    }, 1500)


    // this.setData({
    //   animationData1:animation.export(),
    //   animationData2:animation1.export()
    // })



    // animation.translateY(topNum).step().opacity(1).step()
    // animation1.translateY(topNum).opacity(1).step()




  },
  bindDele: function (event) { //删除评论
    var that = this
    // 弹出提示让用户确认是否删除
    wx.showModal({
      content: '您确定要删除当前评论吗, 删除后将无法恢复!',
      success: function (res) {
        if (res.confirm) {
          // 执行REQUEST 删除当前记录

        }
      }
    })
  }, bindAdd: function () {// 跳转朋友圈
    var that = this
    // 用户朋友圈输入
    wx.showActionSheet({
      itemList: ['发布'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)

          if (res.tapIndex == 0) {
            wx.redirectTo({
              url: '../../pages/addComment/addComment?userId=' + that.data.userStatus.userId + '&address=' + that.data.userStatus.address + '&name=' + that.data.userStatus.name + '&lat=' + that.data.userStatus.lat + '&lnt=' + that.data.userStatus['lnt']
            })
          }
        }
      }
    })
  }, previewImage: function (e) { // 展示图片
    var current = e.target.dataset.src
    var count = e.target.dataset.count
    wx.previewImage({
      current: current,
      urls: count
    })
  }, bindCaoZuo: function (e) {  //评论点赞
    var that = this
    var userId = app.userId
    var dz_id = e.currentTarget.dataset.id
    // 获取当前节点的偏移TOP值计算当前点赞操作的位置
    var offsetTop = Math.floor(e.currentTarget.offsetTop)
    // 赋值计算好的TOP值显示按钮
    that.setData({
      dz_id: dz_id,
      cz_top: offsetTop,
      cz_flag: true
    })

    // 动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
      delay: 0,
    })

    // 0.3秒后滑动
    setTimeout(function () {
      animation.right(40).opacity(1).step()
      that.setData({
        animationData: animation.export()
      })
    }, 300)

    // 5秒后自动隐藏按钮
    var timeout = setTimeout(function () {
      animation.right(0).opacity(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 5000)

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