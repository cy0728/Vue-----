module.exports = {
  plugins: {
    autoprefixer: {
      //兼容的机型
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    //px转换为vw单位的插件
    "postcss-px-to-viewport": {
      //1vw = 3.2
      viewportWidth: 375,
      //1vh = 5.68
      viewportHeight: 812,
      // px to vw无法整除时，保留几位小数
      unitPrecision: 5,
      // 转换成vw单位
      viewportUnit: 'vw',
      //不转换的类名
      selectorBlackList: [],
      // 小于1px不转换
      minPixelValue: 1,
      //允许媒体查询中转换
      mediaQuery: false,
      //排除node_modules文件中第三方css文件
      exclude: /(\/|\\)(node_modules)(\/|\\)/
    },
  }
};