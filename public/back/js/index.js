/**
 * Created by Administrator on 2018/6/26 0026.
 */

//图表的实现js
$(function(){
  // 基于准备好的dom，初始化echarts实例
  var ecahrts_1 = echarts.init(document.querySelector(".ecahrts_1"));

  // 指定图表的配置项和数据
  var option = {
    // 大标题
    title: {
      text: '2017年注册人数'
    },
    // 提示框组件
    tooltip: {
      trigger: "item"   // 必须要移动到数据项才显示提示框
      //trigger: "axis"   // 必须要移动到数据项才显示提示框
    },
    // 图例
    legend: {
      // data 里面的内容必须和 数据项的 name 组合使用, 必须一一比对
      data:['人数']
    },
    // x轴坐标
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    // y轴, 没有设置刻度, y轴一般不需要设置刻度, 根据数据自动生成
    yAxis: {},
    // 数据项
    series: [{
      name: '人数',
      // bar 表示柱状图, line 表示折线图, pie 表示饼图
      type: 'bar',
      data: [1000, 1500, 1800, 1200, 2500, 1800]
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  ecahrts_1.setOption(option);


  //--------------------------------------2----------------------------
  // 基于准备好的dom，初始化echarts实例
  var ecahrts_2 = echarts.init(document.querySelector(".ecahrts_2"));

  // 指定图表的配置项和数据
  var option = {
    title : {
      text: '热门品牌销售',
      subtext: '2018年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','阿迪王']
    },
    series : [
      {
        name: '品牌',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'李宁'},
          {value:1548, name:'阿迪王'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  ecahrts_2.setOption(option);
})