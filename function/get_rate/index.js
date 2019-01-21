const cloud = require('wx-server-sdk')
const request = require('request');
const moment = require('moment');
cloud.init()
const db = cloud.database();
const _ = db.command

const fetch = async(page) => {
    return new Promise((resolve, reject) => {
        let start_date = moment().subtract(30, 'days').format('YYYY-MM-DD');
        let end_date = moment().format('YYYY-MM-DD');
        request({
            url: 'https://cgi.datamore.qq.com/datamore/smobac/hero/index?page=' + page + '&page_size=20&start_date=' + start_date + '&end_date=' + end_date + '&sort_field=pick_cnt&sort_dir=desc&season_id=all&hero_id=all&team_id=all&export=0&acctype=weixin',
            headers: {
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
                cookie: 'eas_sid=71T503U8Z3B1y2U3o6n6e6T110; LW_uid=p1y5O3k8K3V1d2r3M6J6F8v6p5; pgv_pvid=9366823694; pgv_pvi=5424618496; RK=qEq9Swz0H0; ptcz=4e598780893e994a80467bc569c6896a52cc107a537c48d2b2f886c72f4dbf0b; tvfe_boss_uuid=bf6bc085f22eae45; o_cookie=380037343; pt2gguin=o0380037343; ptui_loginuin=380037343@qq.com; pac_uid=1_380037343; pgv_si=s2510375936; pgv_info=ssid=s9939178225; ts_refer=pvp.qq.com/; ts_uid=3137514100; wxcode=001CDAgm0ZPFEs1MJXfm0yYQgm0CDAgs; openid=owanlsnSOo_dGmbMb_kGPJHbMHmY; access_token=17_bdgn8of1ls7pc-t70_wv1O9pGeANNEc5v2jnhOP3rh9akerEN0BaE81GRHlrG1TIT98CSgis-hBAlVVWB3uUgQ; acctype=wx; appid=wx95a3a4d7c627e07d; rankv=2019010718; LW_sid=A1Y5I4u7O9H9y6K3y6K202v0Z4; IED_LOG_INFO2=userUin%3DowanlsnSOo_dGmbMb_kGPJHbMHmY%26nickName%3D%26userLoginTime%3D1548003818; ts_last=datamore.qq.com/project/wzmatch/dist/index.html'
            }
        }, (err, header, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).data.main)
            }
        })
    })
}


// 云函数入口函数
exports.main = async(event, context) => {

    try {
        await db.collection('rate').where({
            'hero_id': _.neq('0')
        }).remove()
    } catch (e) {
        console.error(e)
    }
    // 插入数据
    let arr = [];
    for (let i = 1; i <= 4; i++) {
        let s = await fetch(i)
        arr = arr.concat(s);
    }
    for (let i = 0; i < arr.length; i++) {
        try {
            await db.collection('rate').add({
                data: arr[i]
            })
        } catch (e) {
            console.error(e)
        }
    }
    return 'ok';
}