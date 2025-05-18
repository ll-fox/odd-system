'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { trackingNumber, courier, remark } = event;

  // 数据校验
  if (!trackingNumber) {
    return {
      code: 400,
      message: '快递单号不能为空',
    };
  }

  if (!courier) {
    return {
      code: 400,
      message: '快递公司不能为空',
    };
  }

  try {
    // 查询记录是否存在，并且状态是否为"待处理"或"处理中"
    const queryRes = await db.collection('feedback')
      .where({
        trackingNumber: trackingNumber,
        status: db.command.in(['待处理', '处理中'])
      })
      .get();

    if (queryRes.data.length === 0) {
      return {
        code: 403,
        message: '该记录不存在或当前状态不允许编辑',
      };
    }

    // 更新快递信息
    const updateRes = await db.collection('feedback')
      .where({
        trackingNumber: trackingNumber
      })
      .update({
        courier: courier,
        remark: remark
      });

    if (updateRes.updated === 1) {
      return {
        code: 200,
        message: '更新成功'
      };
    } else {
      return {
        code: 500,
        message: '更新失败'
      };
    }
  } catch (error) {
    console.error('更新快递信息错误:', error);
    return {
      code: 500,
      message: '服务器错误',
      error: error.message
    };
  }
}; 