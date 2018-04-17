// pages/schedule/schedule.js
const moment = require('../../utils/moment.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    schedule: null,
    requestTask: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  refresh: function () {
    wx.showToast({
      icon: 'loading',
      duration: 20000,
    })
    let task = wx.request({
      url: 'https://kpldata.duapp.com/schedule',
      success: res => {

        if (res.data.status === 200) {
          this.setData({
            schedule: this.parseData(res.data.result)
          })
        } else {

        }
        wx.hideToast()
        this.scroll();
      },
      fail: res => {
        console.log('fail');
      }
    })
    this.setData({
      requestTask: task
    })
  },
  parseData: function (data) {
    let result = {};
    data.forEach((v, i) => {
      if (moment().valueOf() > moment(v.date).valueOf()) {
        v.state = 1;
      } else {
        v.state = 0;
      }

      v.time = moment(v.date).format('HH:mm');
      let date = moment(v.date).format('MM-DD');
      if (!result[date]) {
        result[date] = [];
      }

      result[date].push(v);
    });

    return result;
  },

  scroll: function () {
    let date = moment();
    let day = date.day();
    if (day === 1) {
      date = date.day(-0);
    } else if (day === 2) {
      date = date.day(-1);
    }
    let query = wx.createSelectorQuery()
    query.select(`#node-${date.format('MM-DD')}`).boundingClientRect()
    query.exec(function (res) {
      wx.pageScrollTo({
        scrollTop: res[0].top - 200,
        duration: 300
      })
    })
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
    if (!this.data.schedule) {
      this.refresh();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.data.requestTask.abort();
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

  }
})