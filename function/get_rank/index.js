const cloud = require('wx-server-sdk')
const request = require('request');
cloud.init()
const db = cloud.database();
const _ = db.command


const get_hero_list = async(start) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://pvp.qq.com/web201605/js/herolist.json',
        }, (err, header, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body.trim()))
            }
        })
    })
}
const fetch = async(start) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'https://pvp.ingame.qq.com/php/ingame/smoba/top_heros.php?partition=1119&roleid=90876401&area=1&physicalID=1&algorithm=v2&version=2.14.6a&timestamp=1493112232746&appid=1104466820&sig=11a92c24e8f0d1fc74e31bb8c5203a09&encode=2&msdkEncodeParam=E5CB3C064B7A772867B1B552594434FCA26621A002CCB5AF47407E70297E2D6EE7962AC5C4D05234943B0144EDFBDCC4C2A285820C8983E5DE4E22B38EF167CCCA62220D5B3FF8BF83283431B8FF17FB790EDAA0932201873DEC7556F3CFF3AD325B51D6FF5A451618921BA48FF6818B53191FA3C7ED56E51021350FDC66A01CB44BB53178F3C501&game=smoba&start=' + start + '&num=20&ordertype=1&filter=0&grade=-1&herotype=0&matchtype=2',
        }, (err, header, body) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body).data.herolist)
            }
        })
    })
}


// 云函数入口函数
exports.main = async(event, context) => {

    try {
        await db.collection('rank').where({
            rank: _.gt(0)
        }).remove()
    } catch (e) {
        console.error(e)
    }
    let hero_list = await get_hero_list();

    let dict = {};
    hero_list.forEach(v => {
        dict[v.ename] = v.cname
    })
    // 插入数据
    let arr = [];
    for (let i = 1; i <= 81; i += 20) {
        let s = await fetch(i)
        arr = arr.concat(s);
    }
    arr = arr.map(v => {
        v.hero_name = dict[v.heroid]
        return v;
    })
    for (let i = 0; i < arr.length; i++) {
        try {
            await db.collection('rank').add({
                data: arr[i]
            })
        } catch (e) {
            console.error(e)
        }
    }
    return 'ok';
}