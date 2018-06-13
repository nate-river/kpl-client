// pages/hero_rank/hero_rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hero_rank:null,
    filter:4,
  },
  sort: function (e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      filter: type,
      hero_rank: this.data.hero_rank.sort((a, b) => {
        if (type == 3) {
          return b.gameactpercnt - a.gameactpercnt;
        }
        else if (type == 4) {
          return b.winpercent - a.winpercent;
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    if(!this.data.hero_rank){
      wx.showNavigationBarLoading()
      wx.request({
        url: 'https://kpldata.duapp.com/hero_rank',
        success:res=>{
          wx.hideNavigationBarLoading();
          this.setData({
            hero_rank:res.data
          })
        },
        fail:function(){
          wx.showToast({
            title: '加载失败',
            icon:'none'
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