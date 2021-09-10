// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1
}

export const commonAttr = {
  events: {}
}

// 编辑器左侧组件列表
const list = [
  {
    component: 'Chart',
    label: 'Chart',
    propValue: '',
    options: {
      viewName: '年度各大区平均TBOX在线率',
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      dataset: {
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha', 43.3, 85.8, 93.7],
          ['Milk', 83.1, 73.4, 55.1],
          ['Cheese', 86.4, 65.2, 82.5],
          ['Walnut', 72.4, 53.9, 39.1]
        ]
      },
      series: [
        {
          type: 'bar',
          label: {
            show: true,
            color: '#333'
          },
          itemStyle: {
            color: '#c1232b'
          },
          stack: 'stack',
          seriesLayoutBy: 'column',
          markPoint: {
            symbol: 'none',
            data: [
              { type: 'max' }
            ]
          }
        },
        {
          type: 'line',
          label: {
            show: true,
            color: '#333'
          },
          itemStyle: {
            color: '#27727b'
          },
          stack: '',
          seriesLayoutBy: 'column',
          markPoint: {
            symbol: 'pin',
            data: [
              { type: 'max' }
            ]
          },
          smooth: true
        },
        {
          type: 'bar',
          label: {
            show: true,
            color: '#333'
          },
          itemStyle: {
            color: '#fcce10'
          },
          stack: 'stack',
          seriesLayoutBy: 'column',
          markPoint: {
            symbol: 'none',
            data: [
              { type: 'max' }
            ]
          }
        }
      ]
    }
  }
]

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i]
  item.style = { ...commonStyle, ...item.style }
  list[i] = { ...commonAttr, ...item }
}

export default list
