## 精确参数设置

### 设置 单列/单元格 颜色/背景色

:::demo 通过 `excel` 进行设置
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
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true, 
              excel: {color:'FFFFFF',bgColor:'5FB878'} // 导出excel显示样式
            },
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true, excel: function(row) {
               // row 为当前行数据
               return {
                   color: row.dynasty === '唐代' ? 'FFFFFF' : '000000', // 唐代显示为黄色
                   bgColor: row.dynasty === '唐代' ? '01AAED' : 'FFFFFF', // 唐代显示为浅蓝色底色
               }
            }},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right'},
        ]]
        ,excel: {
            filename: '精确样式设置.xlsx'
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 设置 单元格 格式
如下，设置 **录入时间** 列为日期类型，设置 **点赞数** 列为数值类型
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
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right',excel: {cellType: 'd'}},
        ]]
        ,excel: {
            filename: '设置单元格格式.xlsx'
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### API
<table class='el-table el-table--border'>
    <thead>
    <tr>
        <th>参数</th>
        <th>类型</th>
        <th>说明</th>
        <th>示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>family</td>
        <td>string</td>
        <td>表头字体（默认：calibri）</td>
        <td>'helvetica'</td>
    </tr>
    <tr>
        <td>size</td>
        <td>number</td>
        <td>表头字号（默认：12）</td>
        <td>15</td>
    </tr>
    <tr>
        <td>color</td>
        <td>string</td>
        <td>表头颜色（默认：'000000'） 注意：这里只能用hex（十六进制颜色码），且不能加 `#` 如红色：'ff0000'</td>
        <td>'ff0000'</td>
    </tr>
    <tr>
        <td>bgcolor</td>
        <td>string</td>
        <td>表头背景色（默认：'c7c7c7'）注意事项参考 head-&gt;color</td>
        <td>'c7c7c7'</td>
    </tr>
    <tr>
        <td>cellType</td>
        <td>String</td>
        <td>单元格格式 `b` 布尔值, `n` 数字, `e` 错误, `s` 字符, `d` 日期</td>
        <td>'s'</td>
    </tr>
    </tbody>
</table>
