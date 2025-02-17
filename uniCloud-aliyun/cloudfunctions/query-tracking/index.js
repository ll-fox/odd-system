'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { trackingNumber } = event;

  // 数据校验
  if (!trackingNumber) {
    return {
      code: 400,
      message: '快递单号不能为空',
    };
  }

  try {
    // 在查询前后添加日志
    console.log('查询单号:', trackingNumber);
    const res = await db.collection('feedback')
      .where({
        trackingNumber: trackingNumber // 直接使用原始单号
      })
      .get();
    console.log('查询结果:', res);

    if (res.data.length > 0) {
      const feedback = res.data[0];
      console.log('反馈数据:', feedback);
      
      return {
        code: 200,
        data: {
          trackingNumber: feedback.trackingNumber, // 快递单号
          courier: feedback.courier, // 快递公司
          remark: feedback.remark, // 备注
          status: feedback.status, // 状态
          feedback: feedback.processingOpinion, // 处理意见
          createdAt: feedback.createTime, // 创建时间（时间戳）
          secondaryFeedback: feedback.secondaryFeedback,
          feedbackTime: feedback.feedbackTime
        },
      };
    } else {
      return {
        code: 404,
        message: '未找到相关记录',
      };
    }
  } catch (error) {
    return {
      code: 500,
      message: '服务器错误',
      error: error.message,
    };
  }
}; 