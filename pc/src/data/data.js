// 说明：vue页面中不要出现较长的常量，将部分较长的常量抽离出来
// 和过滤器的区别：过滤器用来将变量格式化，本文件多用来循环打印标签

// 会议地点
export const meetingSites = [
  { label: '601', value: '601' },
  { label: '602', value: '602' },
  { label: '603', value: '603' },
  { label: '604', value: '604' },
  { label: '605', value: '605' },
]

// 参会者
export const meetingParticipants = [
  { name: '赵先生', value: '赵先生' },
  { name: '钱先生', value: '钱先生' },
  { name: '孙女士', value: '孙女士' },
  { name: '李先生', value: '李先生' },
]

// 地区
export const regionOptions = [
  {
    label: '中国',
    value: '中国',
    children: [
      {
        label: '山东',
        value: '山东',
        children: [
          {
            label: '济南',
            value: '济南'
          },
          {
            label: '淄博',
            value: '淄博'
          },
        ]
      },
      {
        label: '浙江',
        value: '浙江',
        children: [
          {
            label: '杭州',
            value: '杭州'
          },
          {
            label: '温州',
            value: '温州'
          },
        ]
      },
    ]
  }
]