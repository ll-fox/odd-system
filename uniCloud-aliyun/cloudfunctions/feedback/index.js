'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { trackingNumber, courier, remark, status } = event;
  
  // 数据校验
  if (!trackingNumber || !courier) {
    return {
      code: 400,
      message: '快递单号和快递公司为必填项'
    };
  }

  try {
    // 新增查重逻辑
    const checkRes = await db.collection('feedback')
      .where({
        trackingNumber: trackingNumber
      })
      .get();

    if (checkRes.data.length > 0) {
      return {
        code: 400,
        message: '快递单号已存在，请勿重复提交'
      };
    }

    const result = await db.collection('feedback').add({
      trackingNumber,
      courier,
      remark: remark || '',
      status: status || '待处理',
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