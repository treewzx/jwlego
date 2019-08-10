// miniprogram/pages/lego/consume_manager/consume_manager.js
var netUtil = require("../../../utils/network.js");
var dateUtil = require("../../../utils/util.js");
var timer;
var deskName;
var deskId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true, //是否隐藏对话框
    deskList: [],
    toyId: "--",
    startTime: "--",
    customerInfo: "",
    usedTime: "--",
    leftTime: "--",


  },

  startPlay: function(e) {
   deskId = parseInt(e.currentTarget.id);
    for (var i = 0; i < this.data.deskList.length; i++) {
      if (deskId === this.data.deskList[i].id) {
        deskName = this.data.deskList[i].deskName;
        break;
      }
    }
    wx.navigateTo({
      url: '../start_play/start_play?deskId=' + deskId + "&deskName=" + deskName,
    })
  },

  //暂停游戏
  pausePlay: function(e) {
   deskId = parseInt(e.currentTarget.id);
    var params = {
      id: deskId
    }
    netUtil.postRequest("xiaofei/stopGame", params, this.onDialogStart, this.onPauseSuccess, this.onFailed);

  },
  //继续游戏
  continuePlay: function(e) {
   deskId = parseInt(e.currentTarget.id);
    var params = {
      id: deskId
    }
    netUtil.postRequest("xiaofei/secondStartGame", params, this.onDialogStart, this.onContinueSuccess, this.onFailed);
  },

  //结束游戏
  stopPlay: function(e) {
   deskId = parseInt(e.currentTarget.id);
    for (var i = 0; i < this.data.deskList.length; i++) {
      if (deskId === this.data.deskList[i].id) {
         deskName = this.data.deskList[i].deskName;
        break;
      }
    }
   
    wx.navigateTo({
      url: '../end_play/end_play?deskId=' + deskId + "&deskName=" + deskName,
    })
  },
  //更换玩具
  changeToy: function(e) {
   deskId = parseInt(e.currentTarget.id);
    for (var i = 0; i < this.data.deskList.length;i++){
      if (deskId ===this.data.deskList[i].id){
        var toyId = this.data.deskList[i].number;
         deskName = this.data.deskList[i].deskName;
        break;
      }
    }
   
    wx.navigateTo({
      url: '../change_toy/change_toy?deskId=' + deskId + "&toyId=" + toyId+"&deskName="+deskName,
    })
  },
  detailPlay: function(e) {
   deskId = parseInt(e.currentTarget.id);
    wx.navigateTo({
      url: '../play_detail/play_detail?deskId=' + deskId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    var that = this;
    netUtil.postRequest("xiaofei/deskList", {}, this.onStart, this.onSuccess, this.onFailed);
    timer = setInterval(function() {
      netUtil.postRequest("xiaofei/deskList", {}, that.onStart, that.onSuccess, that.onFailed);
    }, 20000);
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(timer);
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
    let dataList = res.deskList; //获取到的数据
    dataList.forEach((item) => {
      item.startTime = item.startTime.substring(11, item.startTime.length); //要截取字段的字符串
    })
    this.setData({
      deskList: dataList,
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
      wx.showToast({
        title: msg,
      })
    }
  },

  onDialogStart: function() {
    wx.showLoading({
      title: '正在加载',
    })
  },
  onPauseSuccess: function(res) {
    wx.hideLoading();
    wx.showToast({
      title: '暂停成功',
    })

    netUtil.postRequest("xiaofei/deskList", {}, this.onStart, this.onSuccess, this.onFailed);
  },
  onContinueSuccess: function(res) {
    wx.hideLoading();
    wx.showToast({
      title: '继续成功',
    })
    netUtil.postRequest("xiaofei/deskList", {}, this.onStart, this.onSuccess, this.onFailed);
  },
  onEndSuccess: function(res) {
    wx.hideLoading();
    wx.showToast({
      title: '结束游戏成功',
    })
    netUtil.postRequest("xiaofei/deskList", {}, this.onStart, this.onSuccess, this.onFailed);
  },

})