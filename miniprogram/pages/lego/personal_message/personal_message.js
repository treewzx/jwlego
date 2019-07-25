// miniprogram/pages/lego/personal_message/personal_message.js
var netUtil = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  logout: function() {
    var params = {}
    netUtil.postRequest("user/tuichu", params, this.onStart, this.onSuccess, this.onFailed);

  },
  addManager: function () {
   wx.navigateTo({
     url: '../admin_manage/admin_manage?type=1',
   })
  },
  delManager: function () {
    wx.navigateTo({
      url: '../admin_manage/admin_manage?type=2',
    })
  },
  skimManager: function () {
    wx.navigateTo({
      url: '../admin_manage/admin_manage?type=3',
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var params = {}
    netUtil.postRequest("info/checkToken", params, this.onStart, this.onCheckSuccess, this.onFailed);
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

  },
  onStart: function () { //onStart回调
  },
  onSuccess: function (res) { //onSuccess回调
    wx.setStorageSync("token", "");
    wx.setStorageSync("userId", "");
    wx.redirectTo({
      url: '../login/login',
    })
  },
  onCheckSuccess: function (res) { //onSuccess回调
    this.setData({
      account:res.username,
      name:res.name,
      isAdmin:res.isAdmin,
    })
  },

  onFailed: function (msg) { //onFailed回调
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