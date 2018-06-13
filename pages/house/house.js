// pages/house/house.js
const AV = require('../../utils/av-weapp-min.js');
const HomePage = require('../../model/homepage.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    tabList: [],
    pageList: [],
    houseDesc: ""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.addHomePageData()
    this.queryHomePageData()
  },
  
  //查询首页的数据
  queryHomePageData: function () {
    var that = this
    var query = new AV.Query('HomePage');
    query.find().then(result => {

      that.setData({
        imageList: result[0].imageList,
        tabList: result[0].tabList,
        pageList: result[0].pageList,
        houseDesc: result[0].houseDesc
      });
      console.log(this.data.resultData[0].imageList)
    }, function (error) { });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('page ready');
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