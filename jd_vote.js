/*
 * @Author: shylocks https://github.com/shylocks
 * @Date: 2021-01-19
 * @Last Modified by:   shylocks
 * @Last Modified time: 2021-01-19
 */
/*
京年团圆pick
抽奖可获得京豆，白号100豆，黑号全是空气
活动时间：2021年1月11日至2021年1月20日
活动入口：https://pro.m.jd.com/mall/active/2jTAYLGdEkxLvK8ZC7RrM6pEBoY2/index.html
已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#京年团圆pick
5 0 19,20 1 * https://raw.githubusercontent.com/shylocks/Loon/main/jd_vote.js, tag=京年团圆pick, img-url=https://raw.githubusercontent.com/yogayyy/Scripts/master/Icon/shylocks/jd_wechat_sign.jpg, enabled=true

================Loon==============
[Script]
cron "5 0 19,20 1 *" script-path=https://raw.githubusercontent.com/shylocks/Loon/main/jd_vote.js,tag=京年团圆pick

===============Surge=================
京年团圆pick = type=cron,cronexp="5 0 19,20 1 *",wake-system=1,timeout=200,script-path=https://raw.githubusercontent.com/shylocks/Loon/main/jd_vote.js

============小火箭=========
京年团圆pick = type=cron,script-path=https://raw.githubusercontent.com/shylocks/Loon/main/jd_vote.js, cronexpr="5 0 19,20 1 *", timeout=200, enable=true
 */
const $ = new Env('京年团圆pick');
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message;
let url = [
  "https://pro.m.jd.com/mall/active/2XQN8n7fXeSFzCNaaPeoULL6cuHx/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/3NoCHsaa2LdN3pS9P7bxY252byao/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/2jtpaBtHpJ1JkGg9nAEXDKYtM7ke/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/XAbBRbJFoaLYHvJ3txgRyhcQpgT/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/3bxHbwieMXmfhHU24cMfCBmspE7P/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/3uWpXVrRgCojNC88JLUufJrdyzwg/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/2kd77WRH1RJpb9jBKpDL96uq9JvZ/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/3RUTWaYXeyPR12DFW29qCvSx8CGp/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/iFw2ebLVbdcXkfM7Wco5pJgx1b7/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/4GvSBcD43hRrJShVzTFmoVrTF8of/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66",
  "https://pro.m.jd.com/mall/active/28HnUrCN9b5zzgm8HEch7DALPkxJ/index.html?cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2001008602_&utm_term=57d3b56893854c5e9bd74c26a6c28c66"
]
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0)
} else {
  let cookiesData = $.getdata('CookiesJD') || "[]";
  cookiesData = jsonParse(cookiesData);
  cookiesArr = cookiesData.map(item => item.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
}

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {"open-url": "https://bean.m.jd.com/"});
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      $.beans = 0
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/`, {"open-url": "https://bean.m.jd.com/"});
        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        } else {
          $.setdata('', `CookieJD${i ? i + 1 : ""}`);//cookie失效，故清空cookie。$.setdata('', `CookieJD${i ? i + 1 : "" }`);//cookie失效，故清空cookie。
        }
        continue
      }
      await jdVote()
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function jdVote() {
  $.beans = 0
  for(let vo of url) {
    await getActInfo(vo)
  }
  await showMsg();
}

function getActInfo(url) {
  return new Promise(resolve => {
    $.get({
      url: url
    }, async (err, resp, data) => {
      try{
        let sysConfig = JSON.parse(data.match(/window.__react_data__ = (.*)\n/)[1])
        $.actId = sysConfig.activityInfo.encodeActivityId
        $.pageId = sysConfig.activityData.channelPoint.pageId
        let votes = (sysConfig.activityData.floorList.filter(vo => vo.template === 'vote'))
        if (votes.length) {
          let vote = votes[0]
          $.voteKey = vote['config']['encodeVoteKey']
          $.voteId = vote['config']['voteId']
          $.voteGroupId = vote['voteActivity']['voteGroupId']
          $.playId = vote['voteActivity']['playId']
          let count = 0
          $.canVote = true
          for (let vo of vote['voteActivity']['voteItemList']) {
            await voteItem(vo['voteItemId'])
            await $.wait(500)
            count++
            if (count >= 10 || !$.canVote) break
          }
        }
      }
      catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function voteItem(itemId) {
  let body = {
    "activityId": $.actId,
    "pageId": $.pageId,
    "voteId": $.voteId,
    "encodeVoteKey": $.voteKey,
    "requestType": "0",
    "activityType": "1",
    "playId": $.playId,
    "voteGroupId": $.voteGroupId,
    "voteItemId": itemId,
    "mitemAddrId": "",
    "geo": {"lng": "", "lat": ""},
    "addressId": "",
    "posLng": "",
    "posLat": "",
    "homeLng": "",
    "homeLat": "",
    "focus": "",
    "innerAnchor": "",
    "cv": "2.0"
  }
  return new Promise(resolve => {
    $.post(jdUrl('babelUserVoteSituation', body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${err}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data)
            if (data.code === '0' && data.voteResult) {
              if (data.voteResult.code === '200') {
                if (data.voteResult.voteLotterys.length) {
                  console.log(`投票成功，获得${data.voteResult.voteLotterys[0].awardName}`)
                  $.beans +=10
                }
                else
                  console.log(`投票成功，获得空气`)
              } else {
                console.log(data.voteResult.errorMessage)
                if (data.voteResult.errorCode === '8') $.canVote = false
              }
            } else {
              console.log(`投票失败，错误信息${JSON.stringify(data)}`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function showMsg() {
  return new Promise(resolve => {
    message += `本次运行获得${$.beans}京豆`
    $.msg($.name, '', `京东账号${$.index}${$.nickName}\n${message}`);
    resolve()
  })
}


function getUserInfo() {
  return new Promise(resolve => {
    $.get(taskUrl('query'), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${err}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          $.userInfo = JSON.parse(data.match(/query\((.*)\n/)[1]).data
          // console.log(`您的好友助力码为${$.userInfo.shareid}`)
          console.log(`当前幸运值：${$.userInfo.bless}`)
          for (let task of $.info.config.tasks) {
            if (!$.userInfo.complete_task_list.includes(task['_id'])) {
              console.log(`去做任务${task['_id']}`)
              await doTask(task['_id'])
              await $.wait(500)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function doTask(taskId) {
  let body = `task_bless=10&taskid=${taskId}`
  return new Promise(resolve => {
    $.get(taskUrl('completeTask', body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${err}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data.match(/query\((.*)\n/)[1])
          if (data.data.complete_task_list.includes(taskId)) {
            console.log(`任务完成成功，当前幸运值${data.data.curbless}`)
            $.userInfo.bless = data.data.curbless
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function draw() {
  return new Promise(resolve => {
    $.get(taskUrl('draw'), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${err}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          data = JSON.parse(data.match(/query\((.*)\n/)[1])
          if (data.data.drawflag) {
            if ($.prize.filter(vo => vo.prizeLevel === data.data.level).length > 0) {
              console.log(`获得${$.prize.filter(vo => vo.prizeLevel === data.data.level)[0].prizename}`)
              if ($.prize.filter(vo => vo.prizeLevel === data.data.level)[0].beansPerNum)
                $.beans += $.prize.filter(vo => vo.prizeLevel === data.data.level)[0].beansPerNum
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

function jdUrl(functionId, body = {}) {
  return {
    url: `https://api.m.jd.com/client.action?functionId=${functionId}`,
    body: `body=${escape(JSON.stringify(body))}&screen=750*1334&client=wh5&clientVersion=1.0.0&sid=&uuid=1&area=`,
    headers: {
      'Host': 'api.m.jd.com',
      'accept': '*/*',
      'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.141',
      'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
      'content-type': 'application/x-www-form-urlencoded',
      'origin': 'https://pro.m.jd.com',
      'dnt': '1',
      'referer': 'https://pro.m.jd.com/',
      'Cookie': cookie
    }
  }
}

function taskUrl(function_id, body = '') {
  body = `activeid=${$.info.activeId}&token=${$.info.actToken}&sceneval=2&shareid=&_=${new Date().getTime()}&callback=query&${body}`
  return {
    url: `https://wq.jd.com/activet2/piggybank/${function_id}?${body}`,
    headers: {
      'Host': 'wq.jd.com',
      'Accept': 'application/json',
      'Accept-Language': 'zh-cn',
      'Content-Type': 'application/json;charset=utf-8',
      'Origin': 'wq.jd.com',
      'User-Agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
      'Referer': `https://anmp.jd.com/babelDiy/Zeus/xKACpgVjVJM7zPKbd5AGCij5yV9/index.html?wxAppName=jd`,
      'Cookie': cookie
    }
  }
}

function taskPostUrl(function_id, body) {
  return {
    url: `https://lzdz-isv.isvjcloud.com/${function_id}`,
    body: body,
    headers: {
      'Host': 'lzdz-isv.isvjcloud.com',
      'Accept': 'application/json',
      'Accept-Language': 'zh-cn',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://lzdz-isv.isvjcloud.com',
      'User-Agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
      'Referer': `https://lzdz-isv.isvjcloud.com/dingzhi/book/develop/activity?activityId=${ACT_ID}`,
      'Cookie': `${cookie} isvToken=${$.isvToken};`
    }
  }
}

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0") : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie过期
              return
            }
            $.nickName = data['base'].nickname;
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie')
      return [];
    }
  }
}

// prettier-ignore
function Env(t,s){return new class{constructor(t,s){this.name=t,this.data=null,this.dataFile="box.dat",this.logs=[],this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}getScript(t){return new Promise(s=>{$.get({url:t},(t,e,i)=>s(i))})}runScript(t,s){return new Promise(e=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=s&&s.timeout?s.timeout:o;const[h,a]=i.split("@"),r={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":h,Accept:"*/*"}};$.post(r,(t,s,i)=>e(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s),o=JSON.stringify(this.data);e?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(s,o):this.fs.writeFileSync(t,o)}}lodash_get(t,s,e){const i=s.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return e;return o}lodash_set(t,s,e){return Object(t)!==t?t:(Array.isArray(s)||(s=s.toString().match(/[^.[\]]+/g)||[]),s.slice(0,-1).reduce((t,e,i)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(s[i+1])>>0==+s[i+1]?[]:{},t)[s[s.length-1]]=e,t)}getdata(t){let s=this.getval(t);if(/^@/.test(t)){const[,e,i]=/^@(.*?)\.(.*?)$/.exec(t),o=e?this.getval(e):"";if(o)try{const t=JSON.parse(o);s=t?this.lodash_get(t,i,""):s}catch(t){s=""}}return s}setdata(t,s){let e=!1;if(/^@/.test(s)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(s),h=this.getval(i),a=i?"null"===h?null:h||"{}":"{}";try{const s=JSON.parse(a);this.lodash_set(s,o,t),e=this.setval(JSON.stringify(s),i)}catch(s){const h={};this.lodash_set(h,o,t),e=this.setval(JSON.stringify(h),i)}}else e=$.setval(t,s);return e}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,s){return this.isSurge()||this.isLoon()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status),s(t,e,i)}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(e,null),s.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)))}post(t,s=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status),s(t,e,i)});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t));else if(this.isNode()){this.initGotEnv(t);const{url:e,...i}=t;this.got.post(e,i).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t))}}time(t){let s={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in s)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?s[e]:("00"+s[e]).substr((""+s[e]).length)));return t}msg(s=t,e="",i="",o){const h=t=>!t||!this.isLoon()&&this.isSurge()?t:"string"==typeof t?this.isLoon()?t:this.isQuanX()?{"open-url":t}:void 0:"object"==typeof t&&(t["open-url"]||t["media-url"])?this.isLoon()?t["open-url"]:this.isQuanX()?t:void 0:void 0;this.isSurge()||this.isLoon()?$notification.post(s,e,i,h(o)):this.isQuanX()&&$notify(s,e,i,h(o)),this.logs.push("","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="),this.logs.push(s),e&&this.logs.push(e),i&&this.logs.push(i)}log(...t){t.length>0?this.logs=[...this.logs,...t]:console.log(this.logs.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();e?$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t={}){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,s)}
