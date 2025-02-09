'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { trackingNumber, courier, remark } = event;
  
  // 数据校验
  if (!trackingNumber || !courier) {
    return {
      code: 400,
      message: '快递单号和快递公司为必填项'
    };
  }

  try {
    const result = await db.collection('feedback').add({
      trackingNumber,
      courier,
      remark: remark || '',
      createTime: Date.now()
    });
    
    return {
      code: 200,
      message: '提交成功',
      data: result
    };
  } catch (error) {
    return {
      code: 500,
      message: '服务器错误',
      error: error.message
    };
  }
}; 