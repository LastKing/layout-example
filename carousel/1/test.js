/**
 * Created by Rain on 2016/6/30.
 */
var carousel = {};

carousel.fader = function () {
  return {
    init: function (options) { //options参数：id（必选）：图片列表父标签id；auto（可选）：自动运行时间；index（可选）：开始的运行的图片序号
      var wp = $('#' + options.id), // 获取图片列表父元素
          ul = wp.find('ul')[0], // 获取
          li = this.li = $(ul).find('li');
      this.a = options.auto ? options.auto : 2; //自动运行间隔
      this.index = options.position ? options.position : 0; //开始运行的图片序号（从0开始）
      this.l = li.length;
      this.cur = this.z = 0; //当前显示的图片序号&&z-index变量
      this.pos(this.index); //变换函数
    },
    auto: function () {
      this.li.a = setInterval(new Function('carousel.fader.move(1)'), this.a * 1000);
    },
    move: function (i) {//参数i有两种选择，1和-1,1代表运行到下一张，-1代表运行到上一张
      var n = this.cur + i;
      var m = i == 1 ? n == this.l ? 0 : n : n < 0 ? this.l - 1 : n; //下一张或上一张的序号（注意三元选择符的运用）
      this.pos(m); //变换到上一张或下一张
    },
    pos: function (i) {
      clearInterval(this.li.a);
      this.z++;
      this.li[i].style.zIndex = this.z; //每次让下一张图片z-index加一
      this.cur = i; //绑定当前显示图片的正确序号
      this.auto(); //自动运行
    }
  }
}();