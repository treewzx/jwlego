// miniprogram/pages/lego/member_manager/member_manager.js
var handletime = 0;
var totalUsedTime = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    phoneInputHint: "请输入会员手机号码",
    nameInputHint: "请输入会员姓名",
    setInter: '',
    or: '或者'

  },
  // 获取输入手机号
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getConsumerInfo: function() {
    wx.navigateTo({
      url: '../member_info/member_info?phone=' + this.data.phone,
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
    this.setData({
      phone: ""
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

  }
})