// pages/hero_equs/hero_equs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hero_id: null,
    items: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hero_id: options.hero_id || '136'
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
    if (!this.data.items) {
      wx.showNavigationBarLoading()
      wx.request({
        url: 'https://kpldata.duapp.com/hero_equs',
        data: {
          hero_id: this.data.hero_id
        },
        success: res => {
          wx.hideNavigationBarLoading()
          if (res.data.length) {
            this.setData({
              items: res.data
            })
          } else {
            wx.showToast({
              title: '该英雄本届kpl暂时未上场',
              icon:'none',
              success:function(){
                
              },
              duration:2000,
            })
            // setTimeout(()=>{
            //   wx.navigateBack()
            // },2000)
          }
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