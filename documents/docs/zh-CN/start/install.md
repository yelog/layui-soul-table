## 一、项目地址
<el-link href="https://github.com/yelog/layui-soul-table" type="primary" target="_blank">[github]</el-link>      <el-link href="https://gitee.com/saodiyang/layui-soul-table" type="primary" style="margin-left: 20px;" target="_blank">[gitee]</el-link>

## 二、完整安装
### 1. 引入 CSS 
将 `soulTable.css` 引入项目 （在项目根目录可找到）

### 2. 将插件文件夹拷贝到自己的项目中
源码版位置：`ext`  
压缩版位置：`docs/ext`
> 说明
>1. soulTable.js     总入口  
>2. tableFilter.js  表头筛选   
>3. excel.js        excel导出    
>4. tableChild.js  子表  
>5. tableMerge.js  单元格合并  

### 3. 将模块引入项目中
假设你放置的第三方插件目录为 `static/modules/`,
`soulTable` 相关插件都在目录 `static/modules/soulTable`
```js
// 自定义模块，这里只需要开放soulTable即可
layui.config({
    base: 'static/modules/',   // 第三方模块所在目录
    version: 'v1.6.4' // 插件版本号
}).extend({                         
    soulTable: 'soulTable/soulTable',
    tableChild: 'soulTable/tableChild',
    tableMerge: 'soulTable/tableMerge',
    tableFilter: 'soulTable/tableFilter',
    excel: 'soulTable/excel',
});
```

### 4. 使用
```js
table.render({
    done: function() {
      // 在 done 中开启
      soulTable.render(this)
    }
})
```
## 三、独立使用
### 1. soulTable 独立使用
`soulTable.slim` 移除 表格筛选/excel导出/子表/单元格合并，单个 js 文件即可支持 左侧菜单 `基本功能` 里面的功能。

依赖 `soulTable.css` 和 `soulTable.slim` 两个文件
```js
// 自定义模块，这里只需要开放soulTable即可
layui.config({
    base: 'static/modules/',   // 第三方模块所在目录
    version: 'v1.6.4' // 插件版本号
}).extend({                         
    soulTable: 'soulTable/soulTable.slim'
});

// 使用
table.render({
    done: function() {
      // 在 done 中开启
      soulTable.render(this)
    }
})
```
### 2. 子表独立使用
子表 [可单独使用](#/zh-CN/component/child/alone) 

### 3. 单元格合并独立使用
单元格合并 [可单独使用](#/zh-CN/component/merge/alone)  

## 四、CDN
此项目会同步 `npm` 上，所以可以通过 `unpkg.com` 或者 `cdn.jsdelivr.net` 进行访问，如下
### 1. css
```html
<link rel="stylesheet" href="https://unpkg.com/layui-soul-table/docs/soulTable.css" media="all"/>
<!-- 或者 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/layui-soul-table/docs/soulTable.css" media="all"/>
```
### 2. js
```js
layui.config({
    base: 'static/modules/',   // 使用CDN的话，这个就没有用了，如果有其他第三方的的插件，则配置其地址
    version: 'v1.6.4' // 插件版本号
}).extend({                         
    soulTable: '{/}https://cdn.jsdelivr.net/npm/layui-soul-table/docs/ext/soulTable',
    tableChild: '{/}https://cdn.jsdelivr.net/npm/layui-soul-table/docs/ext/tableChild',
    tableMerge: '{/}https://cdn.jsdelivr.net/npm/layui-soul-table/docs/ext/tableMerge',
    tableFilter: '{/}https://cdn.jsdelivr.net/npm/layui-soul-table/docs/ext/tableFilter',
    excel: '{/}https://cdn.jsdelivr.net/npm/layui-soul-table/docs/ext/excel'
});
```
>**unpkg.com的访问路径：**  
>soulTable: '{/}https://unpkg.com/layui-soul-table/docs/ext/soulTable',  
tableChild: '{/}https://unpkg.com/layui-soul-table/docs/ext/tableChild',  
tableMerge: '{/}https://unpkg.com/layui-soul-table/docs/ext/tableMerge',  
tableFilter: '{/}https://unpkg.com/layui-soul-table/docs/ext/tableFilter',  
excel: '{/}https://unpkg.com/layui-soul-table/docs/ext/excel'  

### 3. 独立使用 soulTable
>不依赖 筛选/子表/excel导出，只有 左侧菜单[基本功能]里的功能  
注意：需要引入 css

```js
layui.config({
    base: 'static/modules/',   // 使用CDN的话，这个就没有用了，如果有其他第三方的的插件，则配置其地址
    version: 'v1.6.4' // 插件版本号
}).extend({                         
    soulTable: '{/}https://cdn.jsdelivr.net/npm/layui-soul-table/docs/ext/soulTable.slim'
});
```
### 4. 独立使用 子表/单元格合并
> 这两个功能是不依赖 css 的，下面是子表的引入示例，单元格合并同理
```js
layui.config({
    base: 'static/modules/',   // 使用CDN的话，这个就没有用了，如果有其他第三方的的插件，则配置其地址
    version: 'v1.6.4' // 插件版本号
}).extend({                         
    tableChild: '{/}https://cdn.jsdelivr.net/npm/layui-soul-table/docs/ext/tableChild',
});

```
## 五、npm
```shell
npm install layui-soul-table
```
