'use strict';
const db = uniCloud.database()

exports.main = async (event) => {
  const { trackingNumber, secondaryFeedback, feedbackTime } = event
  
  try {
    const res = await db.collection('feedback')
      .where({ trackingNumber })
      .update({
        secondaryFeedback,
        feedbackTime,
        status: '待处理' // 更新状态
      })
      
    if (res.updated === 1) {
      return { code: 200, message: '更新成功' }
    }
    return { code: 404, message: '未找到对应记录' }
  } catch (error) {
    return { code: 500, message: '服务器错误' }
  }
} 