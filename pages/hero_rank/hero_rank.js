const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        limit: 20,
        order: 'desc',
        nomore: false,
        rate_data: [],
        order_by: 'winrate',
        filter: 4
    },

    sort: function(e) {
        let type = e.currentTarget.dataset.type;

        this.setData({
            filter: type,
            nomore: false,
            page: 1,
            order_by: (() => {
                if (type == 1) {
                    return 'popularity';
                } else if (type == 2) {
                    return 'banrate'
                } else if (type == 3) {
                    return 'appearrate'
                } else if (type == 4) {
                    return 'winrate'
                }
            })()

        })
        wx.showLoading({
            title: '正在加载',
        })
        db.collection('rank')
            .orderBy(this.data.order_by, this.data.order)
            .skip((this.data.page - 1) * this.data.limit)
            .limit(this.data.limit).get({
                success: res => {
                    wx.hideLoading();
                    this.setData({
                        rate_data: res.data
                    })
                }
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    format: function(num) {
        return (num * 100).toFixed(1) + '%';
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.showLoading({
            title: '正在加载',
        })

        db.collection('rank')
            .orderBy(this.data.order_by, this.data.order)
            .skip((this.data.page - 1) * this.data.limit)
            .limit(this.data.limit).get({
                success: res => {
                    wx.hideLoading();
                    this.setData({
                        rate_data: res.data
                    })
                }
            })
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
        if (this.data.nomore) {
            return;
        }
       
        this.setData({
            page: this.data.page + 1
        })

        db.collection('rank')
            .orderBy(this.data.order_by, this.data.order)
            .skip((this.data.page - 1) * this.data.limit)
            .limit(this.data.limit).get({
                success: res => {
                   
                    if (res.data.length) {
                        this.setData({
                            rate_data: this.data.rate_data.concat(
                                res.data
                            )
                        })
                    } else {
                        this.setData({
                            nomore: true
                        })
                    }
                }
            })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})