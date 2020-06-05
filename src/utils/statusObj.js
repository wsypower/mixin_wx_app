/**
 * statusObj: 状态集合
 * statusId：控制颜色以及按钮显示与否
 * iconStatusId： 控制进度显示区域
 * statusName：显示状态文本
 */
const statusObj = {
    '-0-': {
        statusId: 0,
        iconStatusId: 0,
        statusName: '未提交',
    },
    '-10-60-': {
        statusId: 1,
        iconStatusId: 1,
        statusName: '审核中',
    },
    '-25-85-': {
        statusId: 3,
        iconStatusId: 0,
        statusName: '审核未通过',
    },
    '-20-': {
        statusId: 2,
        iconStatusId: 2,
        statusName: '审核通过',
    },
    '-30-': {
        statusId: 1,
        iconStatusId: 2,
        statusName: '审核中',
    },
    '-45-': {
        statusId: 5,
        iconStatusId: 2,
        statusName: '审核未通过',
    },
    '-40-80-': {
        statusId: 4,
        iconStatusId: 3,
        statusName: '已登记',
    }
}

export default statusObj