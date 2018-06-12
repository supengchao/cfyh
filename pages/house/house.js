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
  //初始化数据库插入数据用
  addHomePageData: function () {
    new HomePage({
      imageList: [
        "https://src.leju.com/imp/imp/deal/81/10/2/3cad6dc63859424ef986a470a7f_p7_mk7_s698X523_wm47.jpg",
        "https://src.leju.com/imp/imp/deal/99/79/8/d65c2a68618f071f35c970ba2c8_p7_mk7_s698X523_wm47.jpg",
        "https://src.leju.com/imp/imp/deal/5c/2d/b/33329dbeff7196fba18490202a2_p7_mk7_s698X523_wm47.jpg",
        "https://src.leju.com/imp/imp/deal/c1/0d/f/21dcdec55222e8994b3410d4711_p7_mk7_s698X523_wm47.jpg"
      ],
      tabList: ["遇见新闻", "壹号视频", "楼幢信息"],
      houseDesc: '"遇见长风壹号"小程序是"遇见壹号"公众号的补充版，致力于为长风壹号业主提供一个分享、交流、沟通和维权的平台。',
      pageList: ["housenews", "housevideo", "housebuilding"],
    }).save().then((todo) => { }).catch(error => console.error(error.message));
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