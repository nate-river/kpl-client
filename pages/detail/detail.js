Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail_data: [],
    current: 0,
    match_id: null
  },
  change_current: function (e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },
  refresh: function () {
    // if (this.data.match_id) {
    wx.showToast({
      icon: 'loading',
      duration: 10000,
    })
    wx.request({
      url: 'https://kpldata.duapp.com/match',
      data: {
        id: this.data.match_id || 40339
      },
      success: res => {
        wx.hideToast()

        if (res.data.status === 200) {
          this.setData({
            detail_data: res.data.data.reverse()
          })
        } else {
          wx.showToast({
            title: '网络不给力',
            icon: 'none',
            duration: 500
          })
        }
      }
    })
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        match_id: options.id
      })
    }
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
    if (!this.data.detail_data.length) {
      this.refresh();
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
    // this.refresh();
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