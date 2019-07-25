// miniprogram/pages/lego/admin_manage/admin_manage.js

var netUtil = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  accountInput: function(e) {
    this.setData({
      account: e.detail.value,
    })
  },
  pwdInput: function(e) {
    this.setData({
      pwd: e.detail.value,
    })
  },
  nameInput: function(e) {
    this.setData({
      name: e.detail.value,
    })
  },
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value,
    })
  },
  addMember: function() {
    var params = {
      username: this.data.account,
      password: this.data.pwd,
      name: this.data.name,
      monile: this.data.phone,
    }
    netUtil.postRequest("info/addSysUser", params, this.onStart, this.onAddSuccess, this.onFailed);
  },

  selectClick: function (event) {

    // this.data.model[event.currentTarget.id].selectImage

    for (var i = 0; i < this.data.userList.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.userList[i].selected = true
      }
      else {
        this.data.userList[i].selected = false
      }
    }
    this.setData(this.data)
  },

  delAdmin:function(){
    for (var i = 0; i < this.data.userList.length; i++) {
      if(this.data.userList[i].selected){
        var params = {
          id: this.data.userList[i].userId
        }
        netUtil.postRequest("info/delUserById", params, this.onStart, this.onDelSuccess, this.onFailed);

      }
    }
  },


  onLoad: function(options) {
    this.setData({
      type: options.type,
    })
    if (options.type == 3 || options.type == 2) {
      //查询
      netUtil.postRequest("info/list", {}, this.onStart, this.onSkimSuccess, this.onFailed);

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

  },
  onStart: function() { //onStart回调
  },
  onAddSuccess: function(res) { //onSuccess回调
    wx.showToast({
      title: '添加成功',
    })
    wx.navigateBack({})
  },
  onSkimSuccess: function(res) { //onSuccess回调
    for (var i = 0; i < res.userList.length;i++){
      res.userList[i].selected = false;
    }
    this.setData({
      userList: res.userList
    })
  },
  onDelSuccess: function (res) { //onSuccess回调
   wx.showToast({
     title: '删除成功',
   })
   wx.navigateBack({
   })
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