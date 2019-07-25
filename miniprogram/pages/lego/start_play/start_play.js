// miniprogram/pages/lego/start_play/start_play.js
var Toast = require('../../../components/showToast/showToast');
var netUtil = require("../../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMember: true,
    deskNum: 1,
    deskId: 1,
    userId: "",
    toyId: "",
    userInfo: "",
    memberInfo: "",
    textColor: 'red',
    userCanStart: false,
    toyCanStart: false,
    toyNum: "",
    toyInfo: "",
    toyColor: '#26cd58',
    menbers: [{
        name: 'member',
        value: '会员',
        checked: 'true'
      },
      {
        name: 'no_menber',
        value: '非会员'
      },
    ]
  },
  memberChange: function(e) {
    this.setData({
      isMember: (e.detail.value === "member" ? true : false)
    })
  },
  userInput: function(e) {
    this.setData({
      userInfo: e.detail.value
    })
  },

  toyNumInput: function(e) {
    this.setData({
      toyNum: e.detail.value
    })
  },
  noMembePhoneInput: function(e) {
    this.setData({
      noMemberPhone: e.detail.value
    })
  },
  noMembeNameInput: function(e) {
    this.setData({
      noMembername: e.detail.value
    })
  },

  memberSearch: function(e) {
    this.setData({
      userCanStart: false
    })
    if (this.data.userInfo.length == 0) {
      Toast.showToast({
        title: '请输入正确的用户',
        duration: 2000
      })
    } else {
      var params = {
        phone: this.data.userInfo
      }
      netUtil.postRequest("xiaofei/queryByPhone", params, this.onStart, this.onSearchPhoneSuccess, this.onFailed);

    }
  },
  toySearch: function(e) {
    this.setData({
      toyCanStart: false
    })
    if (this.data.toyNum.length == 0) {
      Toast.showToast({
        title: '请输入玩具编码',
        duration: 2000
      })
    } else {
      var params = {
        number: this.data.toyNum
      }
      netUtil.postRequest("xiaofei/queryByNumber", params, this.onStart, this.onSearchToySuccess, this.onSearchToyFailed);

    }
  },

  startPlay: function() {
    if (this.data.isMember) {
      //会员
      if (!this.data.userCanStart) {
        Toast.showToast({
          title: '请先查询会员，并确保会员可用',
          duration: 2000
        })
        return;
      }
      if (!this.data.toyCanStart) {
        Toast.showToast({
          title: '请先校验玩具确保玩具存在',
          duration: 2000
        })
        return;
      }
      var params = {
        type: 0,
        userId: this.data.userId,
        wjId: this.data.toyId,
        zid: this.data.deskId,
      }
      netUtil.postRequest("xiaofei/startGame", params, this.onStart, this.onStartGameSuccess, this.onFailed);

    } else {
      if (!this.data.toyCanStart) {
        Toast.showToast({
          title: '请先校验玩具确保玩具存在',
          duration: 2000
        })
        return;
      }
      var params = {
        type: 1,
        wjId: this.data.toyId,
        zid: this.data.deskId,
        name: this.data.noMembername,
        phone: this.data.noMemberPhone,
      }
      netUtil.postRequest("xiaofei/startGame", params, this.onStart, this.onStartGameSuccess, this.onFailed);
    }


  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      deskId: options.deskId,
      deskNum: options.deskId,
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
  },
  onSearchPhoneSuccess: function(res) { //onSuccess回调
    this.setData({
      memberInfo: "会员:" + res.phone + ";\n  姓名:" + res.name + ";\n  剩余时长:" + res.surplus_length + "分钟; \n 有效期至:" + res.end_time,
      userId: res.id
    })
    var currentTime = Date.parse(new Date());
    var endTime = res.end_time.replace(/-/g, '/');
    var endTime = Date.parse(new Date(endTime));
    if (res.surplus_length > 0 && currentTime < endTime) {
      this.setData({
        textColor: '#26cd58',
        userCanStart: true
      })
    } else {
      this.setData({
        textColor: 'red',
        userCanStart: false
      })
    }

  },

  onSearchToySuccess: function(res) {
    this.setData({
      toyInfo: "套餐名称：" + res.name,
      toyColor: '#26cd58',
      toyCanStart: true,
      toyId: res.id
    })
  },

  onStartGameSuccess: function(res) {
    wx.navigateBack({})
  },

  onSearchToyFailed: function(res) {
    this.setData({
      toyInfo: "玩具套餐不存在",
      toyColor: 'red'
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