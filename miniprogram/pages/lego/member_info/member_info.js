// miniprogram/pages/lego/member_info/member_info.js
var netUtil = require("../../../utils/network.js");
var searchPhone;
Page({

  /**
   * 页面的初始数据s
   */
  data: {
    memberNum: 0,
    userId: ""
  },


  modifySecondPhone: function() {
    wx.navigateTo({
      url: '../modify_secphone/modify_secphone?userId=' + this.data.userId + "&secondPhone=" + this.data.secondPhone,
    })
  },

  upgradeMeatSel: function() {
    wx.navigateTo({
      url: '../update_setmeal/update_setmeal?userId=' + this.data.userId,
    })
  },
  //续费phoneNum
  reNewal: function() {
    wx.navigateTo({
      url: '../renewal/renewal?userId=' + this.data.userId + "&name=" + this.data.name + "&phoneNum=" + this.data.phoneNum,
    })
  },
  history: function() {
    wx.navigateTo({
      url: '../member_history/member_history?userId=' + this.data.userId + "&name=" + this.data.name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    searchPhone = options.phone


  },


  onStart: function() { //onStart回调
    wx.showLoading({
      title: '正在加载',
    })
  },
  onSuccess: function(res) { //onSuccess回调
    wx.hideLoading();
    this.setData({
      memberNum: 1,
      phoneNum: res.user.username,
      name: res.user.name,
      secondPhone: res.user.mobile,
      birthday: res.user.birthday,
      mealSet: res.user.setMeal,
      startTime: res.user.startTime,
      endTime: res.user.endTime,
      sumLength: res.user.sumLength,
      createName: res.user.createName,
      surplusLength: res.user.surplusLength,
      timeLength: res.user.timeLength,
      xiaofeiTime: res.user.xiaofeiTime,
      freeLength: res.user.freeLength,
      deptName: res.user.deptName,
      lastTime: res.user.lastTime,
      integral: res.user.integral,
      extension1: res.user.extension1,
      extension2: res.user.extension2,
      userId: res.user.userId

    })
  },
  onFailed: function(msg) { //onFailed回调
    wx.hideLoading();
    if (msg.match("token")) {
      wx.setStorageSync("token", "");
      wx.setStorageSync("userId", "");
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      this.setData({
        memberNum: 0
      })
      wx.showToast({
        title: msg,
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
    var params = {
      phone: searchPhone,
    }
    netUtil.postRequest("user/queryUsersByphone", params, this.onStart, this.onSuccess, this.onFailed);
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