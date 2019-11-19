const db = wx.cloud.database()

var database = [];


Page({

    /**
     * 页面的初始数据
     */
    data: {
        category: [{
                name: '全部',
                value: 0
            },
            {
                name: '刺客',
                value: 4
            },
            {
                name: '射手',
                value: 5
            },
            {
                name: '法师',
                value: 2
            },
            {
                name: '战士',
                value: 1
            },
            {
                name: '坦克',
                value: 3
            },
            {
                name: '辅助',
                value: 6
            }
        ],

        herotype: 0,

        orderby: 'winrate',


        show: []

    },

    setType: function(e) {
        this.setData({
            herotype: e.currentTarget.dataset.herotype,
            orderby: 'winrate'
        })

        if (this.data.herotype) {
            this.setData({
                show: database.filter(v => {
                    return v.herotype.indexOf(String(this.data.herotype)) !== -1
                })
            })
        } else {
            this.setData({
                show: database
            })
        }
    },

    sort: function(e) {
        this.setData({
            orderby: e.currentTarget.dataset.orderby
        })

        this.setData({
            show: this.data.show.sort((a, b) => {
                return b[this.data.orderby] - a[this.data.orderby] 
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: new Date().toLocaleDateString() + ' 排位胜率',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        wx.showLoading({
            title: '正在加载',
        })

        wx.cloud.callFunction({
            // 要调用的云函数名称
            name: 'get_all_rank',

            success: res => {

                database = res.result.data

                this.setData({
                    show: res.result.data
                })
            },

            fail: err => {},

            complete: () => {
                wx.hideLoading();
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})