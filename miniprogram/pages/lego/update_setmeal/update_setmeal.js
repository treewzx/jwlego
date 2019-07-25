// miniprogram/pages/lego/update_setmeal/update_setmeal.js
var netUtil = require("../../../utils/network.js");
var indexNum = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    name: "",
    phone: "",
    userId: "",
    quan: 0,
    freetime: 0,
    mealSetId: "1",
    mealSet: [],
    mealSetName: "",
    mealSetTime: [],
    mealSetIds: [],
    mealSetNames: [],
    mealSetStartTime: [],
    mealSetEndTime: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userId: options.userId
    })
    var params = {
      id: this.data.userId,
    };
    netUtil.postRequest("user/queryDictById", params, this.onStart, this.onQuerySuccess, this.onFailed);
    this.setData({
      index: [0],
      timeIndex: [0],
    })
  },
  //获取赠送时长
  freeTimeInput: function(e) {
    this.setData({
      freetime: e.detail.value
    })
  },
  //套餐更改事件(获取入参：套餐Id)
  mealSetChange: function(e) {
    indexNum = e.detail.value;
    this.setData({
      index: e.detail.value,
      timeIndex: e.detail.value,
      mealSetId: this.data.mealSetIds[indexNum],
      cardStartDate: this.data.mealSetStartTime[indexNum],
      cardEndDate: this.data.mealSetEndTime[indexNum],
      quanEndTimedates: this.data.mealSetEndTime[indexNum],
      mealSetName: this.data.mealSet[indexNum]
    })
  },
  // 获取选择的券有效期
  quanEndTimeDateChange: function(e) {
    this.setData({
      quanEndTimedates: e.detail.value
    })
  },
  upgrade: function() {
    this.setData({
      dialogMsg: "确定为用户" + this.data.name + this.data.phone + "升级套餐:" + this.data.mealSetName + "吗",
      modalHidden: !this.data.modalHidden,
    })
  },
  //确定按钮点击事件
  modalBindaconfirm: function() {
    var params = {
      userid: this.data.userId,
      id: this.data.mealSetId,
      freeLength: this.data.freetime,
      couponNumber: this.data.quan,
      couponIndate: this.data.quanEndTimedates,
    }
    netUtil.postRequest("user/shengji", params, this.onStart, this.onUpgradeSuccess, this.onFailed);
  },
  //取消按钮点击事件
  modalBindcancel: function() {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


  onStart: function() { //onStart回调
    wx.showLoading({
      title: '正在加载',
    })
  },
  onQuerySuccess: function(res) { //onSuccess回调
    wx.hideLoading();
    var dict = res.dict;
    let mealSet = this.data.mealSet;
    let mealSetTime = this.data.mealSetTime;
    let mealSetStartTime = this.data.mealSetStartTime;
    let mealSetEndTime = this.data.mealSetEndTime;
    let mealSetIds = this.data.mealSetIds;
    for (let i = 0; i < dict.length; i++) {
      mealSet.push(dict[i].name);
      mealSetTime.push(dict[i].value);
      mealSetStartTime.push(dict[i].start_time)
      mealSetEndTime.push(dict[i].end_time)
      mealSetIds.push(dict[i].id);
    }
    this.setData({
      mealSet,
      mealSetTime,
      mealSetStartTime,
      mealSetEndTime,
      mealSetIds,
      name:res.user.name,
      phone:res.user.username,
      mealSetName: mealSet[0],
      mealSetId: mealSetIds[0],
      cardStartDate: dict[0].start_time,
      cardEndDate: dict[0].end_time,
      quanEndTimedates: dict[0].end_time
    })
  },
  onUpgradeSuccess: function (res) { //onSuccess回调
    wx.hideLoading();
    //升级成功
    this.setData({
      modalHidden: true,
    })
    wx.navigateTo({
      url: '../member_info/member_info?phone=' + this.data.phone,
    })
  },
  onUpgradeFailed: function (msg) {
    wx.hideLoading();
    if (this.data.modalHidden == false) {
      this.setData({
        modalHidden: true,
      })
    }
    if (msg.match("token")) {
      wx.setStorageSync("token", "");
      wx.setStorageSync("userId", "");
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      wx.showToast({
        title: msg,
      })
    }
  },
  onFailed: function(msg) { //onFailed回调
    wx.hideLoading();
    if (msg) {
      wx.showToast({
        title: msg,
      })
    }
  },

})