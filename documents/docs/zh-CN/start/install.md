## 安装
### 将下面模块放入到自己的项目中

>soulTable.js     总入口  
  tableFilter.js  表头筛选   
  tableChild.js   子表    
  tableMerge.js   单元格合并    
  excel.js        excel导出    
  FileSaver.js    excel导出   
  xlsx.js         excel导出   

### 将模块引入项目中
```js
// 自定义模块，这里只需要开放soulTable即可
layui.config({
    base: 'ext/',   // 模块所在目录
}).extend({                         
    soulTable: 'soulTable'  // 模块别名
});
```
### 使用
```js
table.render({
    done: function() {
      // 在 done 中开启
      soulTable.render(this)
    }
})
```
