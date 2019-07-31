// miniprogram/pages/lego/change_toy/change_toy.js
var netUtil = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */

  data: {
    deskName:"",
    deskId: 1,
    toyId: 1,
    newToyId: "",
    toyCanStart: false,
    toyInfo: "",
    toyColor: '#26cd58',

  },
  toyNumInput: function(e) {
    this.setData({
      newToyId: e.detail.value
    })
  },
  toySearch: function(e) {
    this.setData({
      toyCanStart: false
    })
    if (this.data.newToyId.length == 0) {
      Toast.showToast({
        title: '请输入更换后的玩具编码',
        duration: 2000
      })
    } else {
      var params = {
        number: this.data.newToyId,
      }
      netUtil.postRequest("xiaofei/queryByNumber", params, this.onStart, this.onSearchToySuccess, this.onSearchToyFailed);
    }
  },
  changeToy: function(e) {
    if (!this.data.toyCanStart) {
      this.setData({
        toyInfo: '请先校验玩具',
        toyColor: 'red'
      })
      return;
    } else {
      var params = {
        id: this.data.newToyId,
        zid: this.data.deskId
      }
      netUtil.postRequest("xiaofei/changeSetMeal", params, this.onStart, this.onChangeToySuccess, this.onChangeToyFailed);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      deskId: options.deskId,
      toyId: options.toyId,
      deskName:options.deskName,
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
    this.setData({
      toyCanStart: false
    })
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
  onSearchToySuccess: function(res) {
    this.setData({
      toyInfo: "套餐名称：" + res.name,
      toyColor: '#26cd58',
      toyCanStart: true,
      toyId: res.id
    })
  },
  onSearchToyFailed: function(res) {
    this.setData({
      toyInfo:"玩具套餐不存在",
      toyColor:"red",
      toyCanStart:false
    })
    if (msg.match("token")) {
      wx.setStorageSync("token", "");
      wx.setStorageSync("userId", "");
      wx.redirectTo({
        url: '../login/login',
      })
    } 
  },

  onChangeToySuccess: function(res) {
    wx.showToast({
      title: '更换套餐成功',
    })
    wx.navigateBack({})
  },
  onChangeToyFailed: function(res) {
    if (msg.match("token")) {
      wx.setStorageSync("token", "");
      wx.setStorageSync("userId", "");
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      wx.showToast({
        title: '更换套餐失败',
      })
    }

  },
})