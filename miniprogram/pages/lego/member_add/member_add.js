// miniprogram/pages/lego/member_add/member_add.js
var util = require('../../../utils/util.js');
var netUtil = require("../../../utils/network.js");
var indexNum = 0;


Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,//是否隐藏对话框
    dialogMsg:"",
    phone: "",
    name: "",
    sex: "男",
    jifen:0,
    quan:0,
    freetime:0,
    secondPhone:"",
    dates: util.formatTime(new Date()),
    mealSetId:"1",
    mealSet: [],
    mealSetTime: [],
    mealSetIds:[],
    mealSetEndTime:[],
    sexs: [{
        name: '男',
        value: '男',
        checked: 'true'
      },
      {
        name: '女',
        value: '女'
      },
    ]
  },

  // 获取输入手机号
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 获取输入会员姓名
  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //获取会员性别
  sexChange: function(e) {
    this.setData({
      sex: e.detail.value
    })
  },
  // 获取选择的生日
  bornDateChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  //获取第二联系电话
  secondPhoneInput:function(e) {
    this.setData({
      secondPhone: e.detail.value
    })
  },

  //套餐更改事件(获取入参：套餐Id)
  mealSetChange: function(e) {
    indexNum = e.detail.value;
      this.setData({
        index: e.detail.value,
        timeIndex: e.detail.value,
        cardEndDate: this.data.mealSetEndTime[indexNum] ,
        mealSetId: this.data.mealSetIds[indexNum],
        quanEndTimedates: this.data.mealSetEndTime[indexNum],
      })


  },

  //获取赠送时长
  freeTimeInput: function (e) {
    this.setData({
      freetime: e.detail.value
    })
  },

//获取输入的积分
  jifenInput: function(e) {
    this.setData({
      jifen: e.detail.value
    })
  },
  //获取输入的券数
  quanInput: function (e) {
    this.setData({
      quan: e.detail.value
    })
  },

  // 获取选择的券有效期
  quanEndTimeDateChange: function (e) {
    this.setData({
      quanEndTimedates: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取套餐
    netUtil.postRequest("user/queryDict", {}, this.onStart, this.serachOnSuccess, this.onFailed);
    this.setData({
      index: [0],
      timeIndex: [0],
    })

  },

//添加会员
  addMember:function(){
    if(this.data.phone.length==0 ||this.data.name.length==0){
        wx.showToast({
          title: '请填写完整的信息',
        })
        return;
    }
    if(this.data.secondPhone.length==0 || this.data.secondPhone.length<13){
      this.setData({
        secondPhone:this.data.phone
      })
    }
    this.setData({
      dialogMsg: "确定将用户" + this.data.name + this.data.phone + "添加为会员吗？",
      modalHidden: !this.data.modalHidden,
    })
  },
  //确定按钮点击事件
  modalBindaconfirm: function () {
    var params = {
      username: this.data.phone,
      name: this.data.name,
      sex: this.data.sex,
      birthday: this.data.dates,
      mobile: this.data.secondPhone,
      setMeal: this.data.mealSetId,
      freeLength: this.data.freetime,
      integral: this.data.jifen,
      extension1: this.data.quan,
      extension2: this.data.quanEndTimedates,
    }
    netUtil.postRequest("user/tianjia", params, this.onStart, this.addOnSuccess, this.onFailed);
  },
  //取消按钮点击事件
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
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
  serachOnSuccess: function(res) { //onSuccess回调
    var dict = res.dict;
    let mealSet = this.data.mealSet;
    let mealSetTime = this.data.mealSetTime;
    let mealSetEndTime = this.data.mealSetEndTime;
    let mealSetIds = this.data.mealSetIds;
    for (let i = 0; i < dict.length; i++) {
      mealSet.push(dict[i].name);
      mealSetTime.push(dict[i].value);
      mealSetEndTime.push(dict[i].end_time)
      mealSetIds.push(dict[i].id);
    }
    this.setData({
      mealSet,
      mealSetTime,
      mealSetIds,
      openCardDate: dict[0].start_time,
      cardEndDate:dict[0].end_time,
      mealSetId: mealSetIds[0],
      quanEndTimedates:dict[0].end_time
    })
  },
  addOnSuccess: function (res) { //onSuccess回调
   //添加会员成功
    this.setData({
      modalHidden: true,
    })
   wx.navigateTo({
     url: '../member_info/member_info?phone=' + this.data.phone,
   })
  },
  onFailed: function(msg) { //onFailed回调
    if (this.data.modalHidden == false){
      this.setData({
        modalHidden: true,
      })
    }
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