## 为 layui 扩展的 下拉多选select
当前layui版本：**2.3.0** （2.2.5版本可在release中找到）  
在线demo： [http://yelog.org/layui-select-multiple/](http://yelog.org/layui-select-multiple/)

这个在线 demo就是本项目的 `index.html`。 可将项目 `clone` 到本地查看效果。
## 效果图
![效果](http://oncj6b2vl.bkt.clouddn.com/FjNTC1ToZP0X0e7WbFZao4Cwc9B8.png)

## 参数
| 属性名 | 属性值 | 备注 |
|:-|:-|:-|
| multiple | 无 | 开启多选 |
| lay-search | 无 | 开启搜索 |
| lay-case | 无 | 大小写敏感 |
| lay-omit | 无 | 开启多选简写，显示勾选条数 |
| lay-tools | 无 | 开启多选工具栏（多选、清空、反选）|
## 使用
1. 将项目中的 `form.js` 覆盖自己项目中的 `form.js`。
2. 引入下面css
```css
select[multiple]+.layui-form-select>.layui-select-title>input.layui-input{ border-bottom: 0}
select[multiple]+.layui-form-select dd{ padding:0;}
select[multiple]+.layui-form-select .layui-form-checkbox[lay-skin=primary]{ margin:0 !important; display:block; line-height:36px !important; position:relative; padding-left:26px;}
select[multiple]+.layui-form-select .layui-form-checkbox[lay-skin=primary] span{line-height:36px !important; float:none;}
select[multiple]+.layui-form-select .layui-form-checkbox[lay-skin=primary] i{ position:absolute; left:10px; top:0; margin-top:9px;}
.multiSelect{ line-height:normal; height:auto; padding:4px 10px; overflow:hidden;min-height:38px; margin-top:-38px; left:0; z-index:99;position:relative;background:none;}
.multiSelect a{ padding:2px 5px; background:#908e8e; border-radius:2px; color:#fff; display:block; line-height:20px; height:20px; margin:2px 5px 2px 0; float:left;}
.multiSelect a span{ float:left;}
.multiSelect a i {float:left;display:block;margin:2px 0 0 2px;border-radius:2px;width:8px;height:8px;padding:4px;position:relative;-webkit-transition:all .3s;transition:all .3s}
.multiSelect a i:before, .multiSelect a i:after {position:absolute;left:8px;top:2px;content:'';height:12px;width:1px;background-color:#fff}
.multiSelect a i:before {-webkit-transform:rotate(45deg);transform:rotate(45deg)}
.multiSelect a i:after {-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}
.multiSelect a i:hover{ background-color:#545556;}
.multiOption{display: inline-block; padding: 0 5px;cursor: pointer; color: #999;}
.multiOption:hover{color: #5FB878}

@font-face {font-family: "iconfont"; src: url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff')}
.iconfont {font-family:"iconfont" !important;font-size:16px;font-style:normal;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}
.icon-fanxuan:before { content: "\e837"; }
.icon-quanxuan:before { content: "\e623"; }
.icon-qingkong:before { content: "\e63e"; }
```

## 使用实例
下面实例 开启了下拉多选（`multiple`）, 并开启了检索功能（`lay-search`）。
效果可以参考 在线实例 的 `多选+搜索+大小写不敏感` 模块
```html
<select name="多选+搜索+大小写不敏感" lay-verify="required" multiple lay-search>
    <option value="">请选择您的兴趣爱好</option>
    <option>sing1</option>
    <option selected>sing2</option>
    <option>SING1-大写</option>
    <option>movie1</option>
    <option selected>movie2</option>
    <option>movie3</option>
    <option>MOVIE4</option>
    <option>swim</option>
    <option>moon</option>
</select>
```
> **更多实例参考 在线实例、或 `index.html`。**

## 声明
此项目基于 https://gitee.com/layuicms/XiaLaDuoXuan 项目修改得来，修复了一些bug，扩展了 简化多选、多选搜索、大小写敏感控制等功能。