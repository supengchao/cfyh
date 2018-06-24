// pages/house/housebuilding/housebuilding1/housebuilding1.js
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
    // this.addBuildingData()
    this.queryBuildingData()
  },
  addBuildingData: function () {
    var imageList = [{
      title: "入户大厅首次曝光",
      image: "http://7xt41p.com1.z0.glb.clouddn.com/hall1.jpg"
    }];
    new Building({
      imageList: imageList,
      buildingNo: 12
    }).save();
  },
  queryBuildingData: function () {
    var that = this;
    var query = new AV.Query('Building');
    query.equalTo('buildingNo', 1);
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