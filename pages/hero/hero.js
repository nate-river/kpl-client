// pages/hero/hero.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rate_data: [],
    filter: 1
  },

  sort: function (e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      filter: type,
      rate_data: this.data.rate_data.sort((a, b) => {
        if (type === 1) {
          return b.popularity - a.popularity;
        }
        else if (type === 2) {
          return b.banrate - a.banrate;
        }
        else if (type === 3) {
          return (b.popularity + b.banrate) - (a.popularity + a.banrate);
        }
        else if (type === 4) {
          return b.winrate - a.winrate;
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  format: function (num) {
    return (num * 100).toFixed(1) + '%';
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
    if (!this.data.rate_data.length) {
      wx.showNavigationBarLoading()
      wx.request({
        url: 'https://kpldata.duapp.com/rate',
        success: res => {
          wx.hideNavigationBarLoading()
          let d = res.data.map((v, i) => {
            v.total = this.format(v.popularity + v.banrate);
            v.pop = this.format(v.popularity);
            v.ban = this.format(v.banrate);
            v.win = this.format(v.winrate);
            return v;
          })
          this.setData({
            rate_data: d
          })
        },
        fail: res => {
          wx.showToast({
            title: '网络不给力',
            icon: 'none',
            duration: 500
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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