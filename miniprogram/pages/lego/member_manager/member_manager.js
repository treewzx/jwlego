// miniprogram/pages/lego/member_manager/member_manager.js
var handletime = 0;
var totalUsedTime = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    phoneInputHint: "请输入会员手机号码",
    nameInputHint: "请输入会员姓名",
    setInter: '',
    or: '或者',
    phone: "",
    name: ""

  },
  // 获取输入手机号
  phoneInput: function(e) {
    //判断输入的是手机号码还是姓名
    this.setData({
      inputValue: e.detail.value
    })
    var phonetel = /^(((1[0-9]{2}))+\d{8})$/;

    if (phonetel.test(this.data.inputValue)) {
      this.setData({
        phone: this.data.inputValue,
        name: ""
      })
    }else{
      this.setData({
        phone: "",
        name: this.data.inputValue
      })
    }
  },
  getConsumerInfo: function() {
    if(this.data.inputValue.length==0){
      wx.showToast({
        title: '输入不能为空',
        duration: 2000
      })
    }
    wx.navigateTo({
      url: '../member_info/member_info?phone=' + this.data.phone + "&name=" + this.data.name,
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
      inputValue: ""
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