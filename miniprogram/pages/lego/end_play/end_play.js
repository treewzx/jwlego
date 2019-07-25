// miniprogram/pages/lego/end_play/end_play.js
var netUtil = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['请选择', 1, 2, 3, 4, 5],
    guanchaindex: "0",
    kongjianindex: "0",
    zhuanzhuindex: "0",
    guifanindex: "0",
    wanzhengindex: "0",
    kangcuoindex: "0",
    goutongindex: "0",
    deskId: "",
    deskInfo: "",
    usedTime: "0",
    quan: "0",
    jifen: "0",
    detailList: [],
  },
  usedTimeInput: function(e) {
    this.setData({
      usedTime: e.detail.value
    })
  },
  quanInput: function(e) {
    this.setData({
      quan: e.detail.value
    })
  },
  jifenInput: function(e) {
    this.setData({
      jifen: e.detail.value
    })
  },
  guanchaChange: function(e) {
    this.setData({
      guanchaindex: e.detail.value
    })
  },
  zhuanzhuChange: function(e) {
    this.setData({
      zhuanzhuindex: e.detail.value
    })
  },
  kongjianChange: function(e) {
    this.setData({
      kongjianindex: e.detail.value
    })
  },
  guifanChange: function(e) {
    this.setData({
      guifanindex: e.detail.value
    })
  },
  wanzhengChange: function(e) {
    this.setData({
      wanzhengindex: e.detail.value
    })
  },
  kangcuoChange: function(e) {
    this.setData({
      kangcuoindex: e.detail.value
    })
  },
  goutongChange: function(e) {
    this.setData({
      goutongindex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      deskId: options.deskId,
    })
    var params = {
      id: options.deskId
    }
    netUtil.postRequest("xiaofei/beforehandEndGame", params, this.onStart, this.onSuccess, this.onFailed);

  },

  stopGame: function(e) {
    var params = {
      id: this.data.deskId,
      xiaofeiTime: this.data.usedTime,
      couponNumber: this.data.quan,
      integral: this.data.jifen,
      guancha: (this.data.guanchaindex != "0" ? this.data.guanchaindex : "5"),
      goutong: (this.data.goutongindex != "0" ? this.data.goutongindex : "5"),
      guifan: (this.data.guifanindex != "0" ? this.data.guifanindex : "5"),
      kangcuozhe: (this.data.kangcuoindex != "0" ? this.data.kangcuoindex : "5"),
      kongjian: (this.data.kongjianindex != "0" ? this.data.kongjianindex : "5"),
      wanzheng: (this.data.wanzhengindex != "0" ? this.data.wanzhengindex : "5"),
      zhuanzhu: (this.data.zhuanzhuindex != "0" ? this.data.zhuanzhuindex : "5"),
    }
    netUtil.postRequest("xiaofei/endGame", params, this.onStart, this.onEndSuccess, this.onFailed);
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
  },

  onSuccess: function(res) { //onSuccess回调
    this.setData({
      phone: res.endGame.username,
      consumerName: res.endGame.name,
      consumerType: res.endGame.type,
      startTime: res.endGame.start_time,
      beforUsedTime: res.endGame.sumLength,
      unUsedTime: res.endGame.surplusLength,
      usedTime: res.endGame.xiaofeiTime,
      countUsedTime: res.endGame.xiaofeiTime,
      detailList: res.detailList,
    })
  },
  onEndSuccess: function(res) { //onSuccess回调
    wx.showToast({
      title: '结束成功',
    })
    wx.navigateBack({})

  },
  onFailed: function(msg) { //onFailed回调
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
})