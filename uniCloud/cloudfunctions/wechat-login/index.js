'use strict';
const uniID = require('uni-id')

exports.main = async (event, context) => {
  console.log('收到登录请求:', event)
  
  try {
    const { code, userInfo } = event
    
    if (!code) {
      return {
        code: 1001,
        msg: '缺少code参数'
      }
    }
    
    // 使用uni-id进行微信登录
    const res = await uniID.loginByWeixin({
      code,
      userInfo
    })
    
    console.log('登录结果:', res)
    
    if (res.code) {
      return res
    }
    
    return {
      code: 0,
      msg: '登录成功',
      token: res.token,
      userInfo: res.userInfo
    }
  } catch (error) {
    console.error('登录出错:', error)
    return {
      code: 500,
      msg: '服务器内部错误',
      error: error.message
    }
  }
} 