# cfyh
微信小程序
### 注销掉的页面


```
"pages/house/housedetails/baseinfo/baseinfo",
"pages/house/housedetails/complementinfo/complementinfo",
"pages/house/housedetails/planinfo/planinfo",
"pages/house/housedetails/projectinfo/projectinfo",
"pages/house/housedetails/housedetails",
"pages/circle/addMoment/addMoment",
```
### 添加“我的”页面的数据
```
addTabInfo: function () {
    new About({
      tabList: ["发表说说", "我的发布", "关于"],
      pageList: ['../circle/addMoment/addMoment', 'myMoments/myMoments', 'about/about']
    }).save();
  },
```

### 初始化数据库插入数据用
```
  addHomePageData: function () {
    new HomePage({
      imageList: [
        "https://src.leju.com/imp/imp/deal/81/10/2/3cad6dc63859424ef986a470a7f_p7_mk7_s698X523_wm47.jpg",
        "https://src.leju.com/imp/imp/deal/99/79/8/d65c2a68618f071f35c970ba2c8_p7_mk7_s698X523_wm47.jpg",
        "https://src.leju.com/imp/imp/deal/5c/2d/b/33329dbeff7196fba18490202a2_p7_mk7_s698X523_wm47.jpg",
        "https://src.leju.com/imp/imp/deal/c1/0d/f/21dcdec55222e8994b3410d4711_p7_mk7_s698X523_wm47.jpg"
      ],
      tabList: ["遇见新闻", "壹号视频", "楼幢信息","小区详情"],
      houseDesc: '"遇见一号"小程序是"遇见壹号"公众号的补充版，致力于为长风壹号业主提供一个分享、交流、沟通和维权的平台。',
      pageList: ["housenews", "housevideo", "housebuilding","housedetails"],
    }).save().then((todo) => { }).catch(error => console.error(error.message));
  },
```
### 添加buinding图片
```
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
```

