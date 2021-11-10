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
    component: 'VBar',
    label: 'Bar',
    options: {
      viewName: '年度各大区平均TBOX在线率',
      xAxis: {
        type: 'category',
        axisLabel: {
          rotate: 0
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          rotate: 0
        }
      },
      grid: {
        left: '15%'
      },
      dataset: {
        source: [{ 'product': '官网', 'assignedClue': 9, 'unassignedClue': 3 }, { 'product': '三方采买', 'assignedClue': 2, 'unassignedClue': 2 }, { 'product': '百度推广', 'assignedClue': 6, 'unassignedClue': 0 }, { 'product': '老带新', 'assignedClue': 2, 'unassignedClue': 4 }, { 'product': '自主到店', 'assignedClue': 10, 'unassignedClue': 2 }, { 'product': 'BOSS直聘', 'assignedClue': 4, 'unassignedClue': 13 }, { 'product': '400', 'assignedClue': 10, 'unassignedClue': 2 }, { 'product': '抖音信息流', 'assignedClue': 6, 'unassignedClue': 6 }, { 'product': '地推', 'assignedClue': 36, 'unassignedClue': 16 }, { 'product': '公众号', 'assignedClue': 7, 'unassignedClue': 6 }, { 'product': '58同城', 'assignedClue': 30, 'unassignedClue': 20 }]
        // source: [
        //   ['product', '2015', '2016', '2017'],
        //   ['Matcha', 43.3, 85.8, 93.7],
        //   ['Milk', 83.1, 73.4, 55.1],
        //   ['Cheese', 86.4, 65.2, 82.5],
        //   ['Walnut', 72.4, 53.9, 39.1]
        // ]
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
        }
        // {
        //   type: 'bar',
        //   label: {
        //     show: true,
        //     color: '#333'
        //   },
        //   itemStyle: {
        //     color: '#fcce10'
        //   },
        //   stack: 'stack',
        //   seriesLayoutBy: 'column',
        //   markPoint: {
        //     symbol: 'none',
        //     data: [
        //       { type: 'max' }
        //     ]
        //   }
        // }
      ]
    }
  },
  {
    component: 'VCard',
    label: 'Card',
    options: {
      viewName: '年度各大区平均TBOX在线率',
      data: {
        advance_rate: '提退比',
        advance_rate_value: 3.8,
        average_lease_rate: '平均出租率',
        o_average_lease_rate_value: 40,
        average_lease_rate_value: 342,
        delivery_car: '交车数量',
        o_delivery_car_value: -10,
        delivery_car_value: 16292,
        growth_car: '净增数量',
        growth_car_value: 11991,
        kjf_stock_rate: '可交付库存占比',
        kjf_stock_rate_value: 16.4,
        rental_quantity_num: '平均租赁数量',
        rental_quantity_num_value: 120857,
        return_car: '退车数量',
        return_car_value: 4301,
        withdrawal_rate: '退车率',
        withdrawal_rate_value: 3.6
      }
    }
  }
]

// for (let i = 0, len = list.length; i < len; i++) {
//   const item = list[i]
//   item.style = { ...commonStyle, ...item.style }
//   list[i] = { ...commonAttr, ...item }
// }

export default list
