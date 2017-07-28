<!--
title: stylus-tutorial
description: a full tutorial of stylus
-->

#### CSS 预处理工具

Stylus 详解
=======

#### [@meathill](https://weibo.com/meathill/)

<!-- page -->

{{> author}}

<!-- page -->

## 教学目标

1. 了解使用预处理工具的必要性
2. 了解选择 Stylus 的原因
3. 学会 Stylus 的常见用法
4. 学会一些日常用法

<!-- page -->

## 课程大纲

1. 什么是 CSS 预处理？
2. 为什么选择 Stylus？
3. Stylus 入门
4. Stylus 进阶
5. Stylus 生态

<!-- page -->

## 什么是 CSS 预处理

<!-- page -->

### CSS 五大里程碑

1. Firebug
2. Chrome
3. CSS3
4. **预处理**
5. Flexbox & Grid

<!-- page -->

### CSS 开发的问题

1. 缺少可编程性
2. 浏览器存在兼容性差异

<!-- page -->

### 预处理器的目标

1. 增加逻辑、循环、函数，提高复用性
2. 增加编译打包，提供模块管理
3. 自动多平台处理
4. 提前使用新功能
4. 提供其它语法糖

<!-- page -->

## 为什么选择 Stylus？

<!-- page -->

### 常见预处理工具

1. LESS
2. SASS + Compass
3. Stylus
4. PostCSS

<!-- page -->

对战开始！

<!-- section -->

### Round 1: Sass vs LESS

### 胜利者：Sass

<!-- section -->

### Round 2: Sass vs Stylus

### 胜利者：Stylus

<!-- page -->

### Round 3: Stylus vs PostCSS

### 势均力敌

1. 都用 JS 实现
2. 都支持扩展

<!-- section -->

Stylus 的优势：

1. 语法上，无限接近 JS
2. 极尽简化，又向上兼容
3. 强力的 `@extend`

<!-- section -->

PostCSS 的优势：

1. 速度快
2. 可配置，插件丰富
3. 语法完全等同 CSS

<!-- section -->

我选择 Stylus 的原因：

1. 语法简单
2. 功能够用，不需要复杂的配置

Note:
我觉得如果你喜欢 React，应该就会喜欢 PostCSS。实际上，阿里系似乎的确推崇 PostCSS。

<!-- page -->

## Stylus 入门

<!-- page -->

```stylus
body
  font 12px Helvetica, Arial, sans-serif

a.button
  border-radius 5px
```

编译为

```css
body {
  font: 12px Helvetica, Arial, sans-serif;
}
a.button {
  border-radius: 5px;
}
```

<!-- page -->

### 嵌套

```stylus
.foo
  color red

  .bar
    color blue
```

编译为：

```css
.foo {
  color: red;
}
.foo .bar {
  color: blue;
}
```

<!-- section -->

### 引用嵌套

```stylus
a
  color red

  &:hover
    color yellow
```

编译为：

```css
a {
  color: red;
}
a:hover {
  color: yellow;
}
```

<!-- page -->

### 变量

```stylus
$font-size = 14px

body
  font-size $font-size
```

编译为：

```css
body {
  font-size: 14px;
}
```

<!-- page -->

### 命令行工具

安装

```bash
npm install stylus -g
```

使用

```bash
stylus [options] [文件|目录...] -o css/
```

<!-- section -->

常用 options

* **-i, --interactive**  启动一个交互工具
* **-U, --inline**  把图片转换成 Data URI
* **-w, --watch**  监测文件状态，自动重编译
* **-o, --out**  输出文件地址
* **-c, --compress**  压缩输出的 CSS
* **-m, --sourcemap**  生成 SourceMap
* **--include-css**  输出文件中包含 `@import` 导入的 CSS
* **-r, --resolve-url**  处理 `url()` 里的路径

<!-- page -->

### 游乐场

* [官方游乐场](http://stylus-lang.com/try.html#?code=body%20%7B%0A%20%20font%3A%2014px%2F1.5%20Helvetica%2C%20arial%2C%20sans-serif%3B%0A%20%20%23logo%20%7B%0A%20%20%20%20border-radius%3A%205px%3B%0A%20%20%7D%0A%7D)

<!-- page -->

## Stylus 进阶

<!-- page -->

### Gulp

```bash
npm i gulp-stylus gulp-clean-css -D
```

gulpfile.js

```javascript
gulp.task('stylus', () => {
  return gulp.src('./styl/screen.styl')
    .pipe(stylus({
      compress: true,
      'include css': true
    }))
    .pipe(cleanCSS({
      level: 2,
      rebaseTo: 'css/'
    }))
    .pipe(gulp.dest(DEST + 'css/'));
});
```

<!-- page -->

### 选择器 `^[N..M]`

```stylus
a
  b
    c
      d
        font-size 14px

        .abc ^[-1..-1]:hover
          color red
```

编译为：

```css
a b c d {
  font-size: 14px;
}
.abc d:hover {
  color: #f00;
}
```

[Playground](http://stylus-lang.com/try.html#?code=a%0A%20%20b%0A%20%20%20%20c%0A%20%20%20%20%20%20d%0A%20%20%20%20%20%20%20%20font-size%2014px%0A%0A%20%20%20%20%20%20%20%20.abc%20%5E%5B-1..-1%5D%3Ahover%0A%20%20%20%20%20%20%20%20%20%20color%20red)

<!-- page -->

### 引用属性值

```stylus
p
  margin 10px
  padding (@margin / 2)
```

编译为：

```css
p {
  margin: 10px;
  padding: 5px;
}
```

<!-- section -->

适用场景：用绝对定位居中

```stylus
#logo
  position absolute
  top 50%
  left 50%
  width 150px
  height 80px
  margin-left -(@width / 2)
  margin-top -(@height / 2)
```

<!-- page -->

### 循环

```stylus
for n in 1..10
  .col-{n}
    width 10% * n
```

编译成

```css
.col-1 {
  width: 10%;
}
.col-2 {
  width: 20%;
}
....
```

<!-- section -->

适用场景：[日历组件](https://meathill-freelance.github.io/date-picker/)

```stylus
for n in (0..6)
  saturday = 8 - n
  sunday = 9 - n

  &.empty-{n}
    counter-reset date
    flex n n 14.285714%*n
    min-width 14.285714%*n
    max-width 100%

    ~ :nth-child(7n + {saturday}),
    ~ :nth-child(7n + {sunday})
      color orange
```

<!-- section -->

适用场景：[spinkit](https://codepen.io/meathill/pen/xLwQaX?editors=0100)

```stylus
.bar
  animation shousuo 1s ease-in-out infinite

  for n in 1..5
    &:nth-child({n})
      animation-delay .1s * n
```

其它 [spinkit](http://tobiasahlin.com/spinkit/)

<!-- page -->

### Mixin & Functions

```stylus
border-radius(n)
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

form input[type=button]
  border-radius(5px) // function
  border-radius 5px // mixin
```

编译为：

```css
form input[type=button] {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
```

<!-- page -->

### 内建函数

* 颜色函数，如`darken`/`lighten`
* 嵌入图片 `embedurl`
* 添加前缀 `+prefix-classes(prefix)`

<!-- section -->

### 颜色函数

<!-- section -->

### 嵌入图片

<!-- section -->

### 添加前缀

<!-- page -->

## Stylus 生态

<!-- page -->

### [Nib](http://tj.github.io/nib/)

1. Nib 是 Stylus 样式库，用于将样式进行兼容性处理
2. 类似 Compass

<!-- page -->

## CSS 小技巧

* [固定比例的容器](https://www.catswhocode.com/blog/advanced-css-tricks-and-techniques)

<!-- page -->

Q&A

<!-- page -->

参考阅读：


* [Stylus 官方文档](http://stylus-lang.com/)
* [Sass vs LESS](https://css-tricks.com/sass-vs-less/)
* [Stylus vs PostCSS](https://www.slant.co/versus/762/767/~stylus_vs_postcss)