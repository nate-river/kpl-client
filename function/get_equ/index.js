const cloud = require('wx-server-sdk')
const request = require('request');
cloud.init()
const db = cloud.database();
const _ = db.command


const get_equ = async(hero_id) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://www.wanplus.com/api.php?_param=810f42df2056df92fd1b32a456d33158|ios|200|4.5.5|28|1548011180|748205|xvgit7D0ZHfma0D7mj79nb7JA/Xl9CTAcpU50FWhtZC059Puk/PSTnA23945TKo|1&c=App_Hero&eid=765&gm=kog&heroid=' + hero_id + '&m=matchHistory&sig=f8ccfadd27bc21fa313ec1fb511ec7e4',
        }, (err, header, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body.trim()))
            }
        })
    })
}



// 云函数入口函数
exports.main = async(event, context) => {
    let r = await db.collection('equ').where({
        hero_id: event.hero_id
    }).get()

    if (r.data.length) {
        return r.data[0]
    } else {
        let o = await get_equ(event.hero_id);
        o.hero_id = event.hero_id;
        await db.collection('equ').add({
            data: o
        })
        return o;
    }
}