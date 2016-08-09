/**
 * Created by Rain on 2016/6/30.
 */
var carousel = {};

carousel.fader = function () {
  return {
    //开始轮转
    init: function (options) {
      //options :id(必选)：图片列表父标签；auto（可选）：自运行时间；
      //         index（可选）：开始的运行图片序号
      var $fader = $('#' + options.id);
      var ul = $fader.find('ul')[0];
      var li = this.li = $(ul).find('li');

      this.a = options.auto || 2;//自动运行间隔
      this.index = options.position || 0;//开始运行的图片序号
      this.l = li.length;
      this.cur = this.z = 0;//当前显示的图片 序号&&z-index 变量
      this.pos(this.index);
    },

    //自动跳转
    auto: function () {
      this.li.a = setInterval(new Function('carousel.fader.move(1)'), this.a * 1000);
    },

    // 参数i 有两种选择， 1和-1，1表示下一张，-1表示上一张
    move: function (i) {
      var n = this.cur + i;
      var m = i == 1 ? n == this.l ? 0 : n : n < n ? this.l - 1 : n;
      this.pos(m);
    },

    pos: function (i) {
      clearInterval(this.li.a);
      this.z++;
      // this.li[i].style.zIndex = this.z; //每次让下一张图片z-index加一
      $(this.li[i]).css('z-index', this.z);
      this.cur = i;//绑定当前显示图片的正确序号
      this.auto();
    }
  }
}();