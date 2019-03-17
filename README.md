## 给 layui-table 注入点灵魂
当前layui版本：**2.4.5**  
在线demo： [https://yelog.org/layui-soul-table/](https://yelog.org/layui-soul-table/)

## 效果图
![表头下拉](http://img.xiangzhangshugongyi.com/FqU51fkRhFSIGHfss0cqzzBvcTDb.png)
![编辑筛选](http://img.xiangzhangshugongyi.com/FvE5cOkkArnG96mcTklWyugWrCiq.png)

## 扩展功能
1. 表头筛选、自定义条件（支持前端筛选、mybatis后台筛选[oracle|mysql]）
2. 拖动列调整顺序、隐藏列
3. excel导出（根据筛选条件和列顺序导出）

## 快速上手
1.将下面js放到自己项目中:
>soulTable.js     总入口  
  tableFilter.js  表头筛选   
  tableChild.js   子表    
  excel.js        excel导出    
  FileSaver.js    excel导出   
  xlsx.js         excel导出   
  
2.定义入口模块`soulTable`  
```js
// 自定义模块
layui.config({
    base: 'ext/',   // 模块目录
}).extend({                         // 模块别名
    soulTable: 'soulTable'
});
```  
3.在 `table.render()` 中使用。   
①`done` 中加入  `soulTable.render(this)`   
②在需要下拉筛选的列中加入 `filter: true` 即可生效  
```js
var myTable = table.render({
    elem: '#myTable'
    ,height: $(document).height() - $('#myTable').offset().top - 20
    ,limit: 20
    ,page: true
    ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field:'poetry', title:'诗词', width:188}
        ,{field:'name',  title:'诗人', width:100, filter:true, sort: true}
        ,{field:'type', title:'类型', width:100, filter:true}
        ,{field:'dynasty', title:'朝代',  width:150, filter:true}
        ,{field:'sentences', title:'名句', width:400, filter:true}
        ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
    ]]
    ,done: function () {
        soulTable.render(this)
    }
});
```
## 详细参数
### 筛选相关
1.时间类型增强, `filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}` ,格式根据具体的显示格式
```js
var myTable = table.render({
    ... 
    ,cols: [[
        ...
        ,{field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true}
        ... 
    ]]
    ,done: function () {
        soulTable.render(this)
    }
});
```
2.调整下拉菜单的顺序、显示（去掉下面数组的某一项即可隐藏）
此 `filter` 参数非必须，缺省即为下面所示内容
```js
var myTable = table.render({
    ... 
    cols: [[
       ... 
    ]]
    , filter: {
        //用于控制表头下拉显示，可以控制顺序、显示, 依次是：表格列、筛选数据、筛选条件、编辑筛选条件、导出excel
        items:['column','data','condition','editCondition','excel'] 
    }
    , done: function (res, curr, count) {
        soulTable.render(this)
    }
});
```
### 导出excel相关
1.配置默认样式  
<table><thead><tr><th colspan=2>参数</th><th>类型</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td colspan="2">on</td><td>boolean</td><td>表头下拉中开启excel导出功能（默认：true）</td><td>true</td></tr><tr><td colspan="2">filename</td><td>string/function</td><td>导出excel文件名（默认：表格数据.xlsx）,支持后缀：xlsx/xls&lt;br&gt; 也可传入方法,带上当天日期：`function(){return '诗词'+util.todatestring(new date(), 'yyyymmdd')+'xlsx'}`</td><td>'诗词.xlsx'</td></tr><tr><td rowspan="4">head</td><td>family</td><td>string</td><td>表头字体（默认：calibri）</td><td>'helvetica'</td></tr><tr><td>size</td><td>number</td><td>表头字号（默认：12）</td><td>15</td></tr><tr><td>color</td><td>string</td><td>表头颜色（默认：'000000'） 注意：这里只能用hex（十六进制颜色码），且不能加 `#` 如红色：'ff0000'</td><td>'ff0000'</td></tr><tr><td>bgcolor</td><td>string</td><td>表头背景色（默认：'c7c7c7'）注意事项参考 head-&gt;color</td><td>'c7c7c7'</td></tr><tr><td rowspan="4">font</td><td>family</td><td>string</td><td>表头字体（默认：calibri）</td><td>'helvetica'</td></tr><tr><td>size</td><td>number</td><td>表头字号（默认：12）</td><td>15</td></tr><tr><td>color</td><td>string</td><td>表头颜色（默认：'000000'） 注意事项参考 head-&gt;color</td><td>'ff0000'</td></tr><tr><td>bgcolor</td><td>string</td><td>表头背景色（默认：'ffffff'）注意事项参考 head-&gt;color</td><td>'c7c7c7'</td></tr></tbody></table>
>下面为默认配置，如果不改，可直接去掉excel参数

```js
var myTable = table.render({
    ...
    , cols: [[
        ...
    ]]
    , excel:{ // 导出excel配置, （以下值均为默认值）
        on: true, //是否启用, 默认开启
        filename: '诗词.xlsx', // 文件名
        head:{ // 表头样式
            family: 'Calibri', // 字体
            size: 12, // 字号
            color: '000000', // 字体颜色
            bgColor: 'C7C7C7' // 背景颜色
        },
        font: { // 正文样式
            family: 'Calibri', // 字体
            size: 12, // 字号
            color: '000000', // 字体颜色
            bgColor: 'FFFFFF' //背景颜色
        }
    }
    , done: function (res, curr, count) {
        soulTable.render(this)
    }
});
```
 

## 依赖项目
| 开源项目名称 | 地址 | 用于 |
|:-|:-|:-|
| layui | https://github.com/sentsin/layui | 土壤框架 |
| layui-excel | https://github.com/wangerzi/layui-excel | excel文件导出 |