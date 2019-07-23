## excel导出
所见即所得：

1.拖拽调整列宽、双击自适应列宽后，导出也是调整后的列宽

2.左右列顺序调整后，导出也是调整后的顺序

3.layui 的 table 的对齐方式 `align` 也会作用于导出后的文件

4.条件筛选/表头筛选，导出是筛选过的结果

### 1.基本效果
默认开启，下拉菜单默认有**excel导出**配置，也可以通过 `filter.items:['excel']` 配置入口
:::demo 通过 `filter: true` 开启筛选
```html
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right'},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 2.全局配置
通过参数 `excel` 来配置， 包括 **文件名**、**字号**、**颜色**等，具体参见 **显示代码**
#### API
<table class='el-table el-table--border'><thead><tr><th colspan=2>参数</th><th>类型</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td colspan="2">on</td><td>boolean</td><td>表头下拉中开启excel导出功能（默认：true）</td><td>true</td></tr><tr><td colspan="2">filename</td><td>string/function</td><td>导出excel文件名（默认：表格数据.xlsx）,支持后缀：xlsx/xls&lt;br&gt; 也可传入方法,带上当天日期：<code>function(){return '诗词'+util.todatestring(new date(), 'yyyymmdd')+'xlsx'}</code></td><td>'诗词.xlsx'</td></tr><tr><td rowspan="4">head</td><td>family</td><td>string</td><td>表头字体（默认：calibri）</td><td>'helvetica'</td></tr><tr><td>size</td><td>number</td><td>表头字号（默认：12）</td><td>15</td></tr><tr><td>color</td><td>string</td><td>表头颜色（默认：'000000'） 注意：这里只能用hex（十六进制颜色码），且不能加 `#` 如红色：'ff0000'</td><td>'ff0000'</td></tr><tr><td>bgcolor</td><td>string</td><td>表头背景色（默认：'c7c7c7'）注意事项参考 head-&gt;color</td><td>'c7c7c7'</td></tr><tr><td rowspan="4">font</td><td>family</td><td>string</td><td>表头字体（默认：calibri）</td><td>'helvetica'</td></tr><tr><td>size</td><td>number</td><td>表头字号（默认：12）</td><td>15</td></tr><tr><td>color</td><td>string</td><td>表头颜色（默认：'000000'） 注意事项参考 head-&gt;color</td><td>'ff0000'</td></tr><tr><td>bgcolor</td><td>string</td><td>表头背景色（默认：'ffffff'）注意事项参考 head-&gt;color</td><td>'c7c7c7'</td></tr></tbody></table>

#### 示例
:::demo 通过 `excel` 进行设置
```html
<table id="myTable2" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,excel:{ // 导出excel配置, （以下值均为默认值）
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
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 3.自定义列配置
通过列的 `excel` 参数进行配置，可以设定每个单元格的 **样式**、**类型**等

这个 `excel` 你甚至可以通过访问返回的方式进行自定义
```js
excel: function(row) {
   // row 为当前行数据
   return {
       color: row.dynasty === '唐代' ? 'FFB800' : '000000', // 唐代显示为黄色
       bgColor: row.dynasty === '唐代' ? '01AAED' : 'FFFFFF', // 唐代显示为浅蓝色底色
   }
}
```
#### API
<table class='el-table el-table--border'><thead><tr><th>参数</th><th>类型</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td>family</td><td>string</td><td>表头字体（默认：calibri）</td><td>'helvetica'</td></tr><tr><td>size</td><td>number</td><td>表头字号（默认：12）</td><td>15</td></tr><tr><td>color</td><td>string</td><td>表头颜色（默认：'000000'） 注意：这里只能用hex（十六进制颜色码），且不能加 `#` 如红色：'ff0000'</td><td>'ff0000'</td></tr><tr><td>bgcolor</td><td>string</td><td>表头背景色（默认：'c7c7c7'）注意事项参考 head-&gt;color</td><td>'c7c7c7'</td></tr><tr><td>cellType</td><td>String</td><td>单元格格式 `b` 布尔值, `n` 数字, `e` 错误, `s` 字符, `d` 日期</td><td>'s'</td></tr></tbody></table>


下面例子设置了朝代一列的样式为**绿底白字**，并设置录入时间一列为**日期格式**
:::demo 通过列的 `excel` 进行设置
```html
<table id="myTable3" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable3'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true, 
              style: 'background-color: #5FB878; color: #FFFFFF;', // 表格显示样式
              excel: {color:'FFFFFF',bgColor:'5FB878'} // 导出excel显示样式
            },
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true, excel: function(row) {
               // row 为当前行数据
               return {
                   color: row.dynasty === '唐代' ? 'FFB800' : '000000', // 唐代显示为黄色
                   bgColor: row.dynasty === '唐代' ? '01AAED' : 'FFFFFF', // 唐代显示为浅蓝色底色
               }
            }},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right',excel: {cellType: 'd'}},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 4.export方法
除了可以通过框架导出之外，你也可以通过调用 `export` 方法进行自定义导出。
```js
var myTable = table.render({}); // 渲染表格

// 导出 excel
soulTable.export(myTable)

// 或者你也可以自定义文件名及样式
soulTable.export(myTable, {
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
});
```
:::demo 通过列的 `excel` 进行设置
```html
<button class="layui-btn" id="export"><i class="layui-icon layui-icon-download-circle"></i>导出</button>
<table id="myTable4" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    var myTable = table.render({
        elem: '#myTable4'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true, 
              style: 'background-color: #5FB878; color: #FFFFFF;', // 表格显示样式
              excel: {color:'FFFFFF',bgColor:'5FB878'} // 导出excel显示样式
            },
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true, excel: function(row) {
               // row 为当前行数据
               return {
                   color: row.dynasty === '唐代' ? 'FFB800' : '000000', // 唐代显示为黄色
                   bgColor: row.dynasty === '唐代' ? '01AAED' : 'FFFFFF', // 唐代显示为浅蓝色底色
               }
            }},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right',excel: {cellType: 'd'}},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    layui.$('#export').on('click', function() {
      soulTable.export(myTable, {
          filename: '手动导出.xlsx' 
      });
    })
})
</script>
```
:::
