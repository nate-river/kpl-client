// pages/hero_equs/hero_equs.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            hero_name: options.hero_name
        })
        wx.showLoading({
            title: '正在加载',
        })
        wx.cloud.callFunction({
            name: 'get_equ',
            data: {
                hero_id: options.hero_id
            },
            success:res=>{
                wx.hideLoading();
                wx.setNavigationBarTitle({
                    title: options.hero_name + '实战出装',
                })
                this.setData({
                    list:res.result.data.list
                })
            }
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

    }
})