/**
 * Created by Rain on 2016/3/29.
 */
var c = document.getElementById("canvas-club");
var ctx = c.getContext("2d");

var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var clearColor = 'rgba(0,0,0,.1)';//画板背景，注意最后的透明度0.1,这是残生叠加效果的基础

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function RainDrop() {
}

RainDrop.prototype = {
  init: function () {
    this.x = random(0, w); //雨滴的位置x
    this.y = 0; //余地的位置y
    this.color = 'hsl(180,100%,50%)';
    this.vy = random(4, 5);
    this.hit = random(h * 8, h * 9);//下落的最大值
    this.size = 2;//长方形
  },
  draw: function () {
    if (this.y < this.hit) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size * 5);//绘制长方形，通过多次叠加长方形，形成雨滴下落效果
    }
    this.update();
  },

  update: function () {
    if (this.y < this.hit) {
      this.y += this.vy;//未达到底部，增加雨滴y坐标
    }
  }
};

function resize() {
  w = c.width = window.innerWidth;
  h = c.height = window.innerHeight;
}

//初始化一个余地
var r = new RainDrop();
r.init();

function anim() {
  ctx.fillStyle = clearColor;//每一帧都填充背景颜色
  ctx.fillRect(0, 0, w, h);
  r.draw();
  requestAnimationFrame(anim);
}

window.addEventListener("resize", resize);

anim();
