## 安装
### 下载地址
<el-link href="https://github.com/yelog/layui-soul-table" type="primary" target="_blank">[github]</el-link>      <el-link href="https://gitee.com/saodiyang/layui-soul-table" type="primary" style="margin-left: 20px;" target="_blank">[gitee]</el-link>

### 将下面模块放入到自己的项目中

>soulTable.js     总入口  
  tableFilter.js  表头筛选   
  excel.js        excel导出    
  tableChild.js   子表 [可单独使用](#/zh-CN/component/child/alone)   
  tableMerge.js   单元格合并 [可单独使用](#/zh-CN/component/merge/alone)   

源码版位置：`ext`
压缩版位置：`docs/ext`

### 将模块引入项目中
```js
// 自定义模块，这里只需要开放soulTable即可
layui.config({
    base: 'ext/',   // 模块所在目录
    version: 'v1.4.4' // 插件版本号
}).extend({                         
    soulTable: 'soulTable'  // 模块别名
});
```
### 引入 CSS 
将 `soulTable.css` 引入项目 （在项目根目录可找到）

### 使用
```js
table.render({
    done: function() {
      // 在 done 中开启
      soulTable.render(this)
    }
})
```
