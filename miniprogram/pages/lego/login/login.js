// miniprogram/pages/lego/login/login.js
var netUtil = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  // 获取输入账号
  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 登录
  login: function() {
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'loading',
        duration: 2000
      })
    } else {
      // 这里修改成跳转的页面
      var params = {
        username: this.data.username,
        password: this.data.password
      }
      netUtil.postRequest("user/login", params, this.onStart, this.onSuccess, this.onFailed);

    }
  },

  onStart: function() { //onStart回调
    wx.showLoading({
      title: '正在加载',
    })
  },
  onSuccess: function(data) { //onSuccess回调
    wx.hideLoading();
    wx.showToast({
      title: data.msg,
      icon: 'success',
      duration: 2000
    })
    //缓存token 和userId
    wx.setStorageSync("userId", data.userId);
    wx.setStorageSync("token", data.token);
    wx.setStorageSync("isAdmin", data.isAdmin);
    //进入主页面
    wx.switchTab({
      url: '../member_add/member_add',
    })
  },
  onFailed: function(msg) { //onFailed回调
    wx.hideLoading();
    if (msg) {
      wx.showToast({
        title: msg,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (wx.getStorageSync("token") != null && wx.getStorageSync("token") != "") {
      //进入主页面
      wx.switchTab({
        url: '../member_add/member_add',
      })
    }
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

  }
})