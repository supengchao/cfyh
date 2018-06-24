// pages/house/housebuilding/housebuilding4/housebuilding4.js
const Building = require('../../../../model/building.js');
const AV = require('../../../../utils/av-weapp-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryBuildingData()
  },
  queryBuildingData: function () {
    var that = this;
    var query = new AV.Query('Building');
    query.equalTo('buildingNo', 4);
    query.first().then(function (results) {
      that.setData({
        imageList: results.imageList
      });
    }, function (error) {
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