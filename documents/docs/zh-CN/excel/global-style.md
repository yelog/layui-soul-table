## 全局参数设置

### 设置字体/背景色/文件名

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
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,excel:{ // 导出excel配置, （以下值均为默认值）
            on: true, //是否启用, 默认开启
            filename: '全局样式设置.xlsx', // 文件名
            head:{ // 表头样式
                family: 'Calibri', // 字体
                size: 12, // 字号
                color: 'FFFFFF', // 字体颜色
                bgColor: 'FF5722' // 背景颜色
            },
            font: { // 正文样式
                family: 'Calibri', // 字体
                size: 12, // 字号
                color: 'FFFFFF', // 字体颜色
                bgColor: '01AAED' //背景颜色
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

### API

<table class='el-table el-table--border'>
    <thead>
    <tr>
        <th colspan=2>参数</th>
        <th>类型</th>
        <th>说明</th>
        <th>示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td colspan="2">on</td>
        <td>boolean</td>
        <td>表头下拉中开启excel导出功能（默认：true）</td>
        <td>true</td>
    </tr>
    <tr>
        <td colspan="2">checked</td>
        <td>boolean</td>
        <td>仅导出勾选的数据（默认：false）</td>
        <td>true</td>
    </tr>
    <tr>
        <td colspan="2">filename</td>
        <td>string/function</td>
        <td>导出excel文件名（默认：表格数据.xlsx）,支持后缀：xlsx/xls&lt;br&gt; 也可传入方法,带上当天日期：<code>function(){return
            '诗词'+util.todatestring(new date(), 'yyyymmdd')+'xlsx'}</code></td>
        <td>'诗词.xlsx'</td>
    </tr>
    <tr>
        <td rowspan="4">head</td>
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
        <td rowspan="4">font</td>
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
        <td>表头颜色（默认：'000000'） 注意事项参考 head-&gt;color</td>
        <td>'ff0000'</td>
    </tr>
    <tr>
        <td>bgcolor</td>
        <td>string</td>
        <td>表头背景色（默认：'ffffff'）注意事项参考 head-&gt;color</td>
        <td>'c7c7c7'</td>
    </tr>
    <tr>
        <td rowspan="4">border</td>
        <td>top</td>
        <td>{ style: <a href='javascript:void(0)' @click='goAnchor("border_style")'>BORDER_STYLE</a>, color: <a href='javascript:void(0)' @click='goAnchor("color_spec")'>COLOR_SPEC</a> }</td>
        <td>上边框样式</td>
        <td>{ style: 'thin', color: 'FF5722' }</td>
    </tr>
    <tr>
        <td>bottom</td>
        <td>{ style: <a href='javascript:void(0)' @click='goAnchor("border_style")'>BORDER_STYLE</a>, color: <a href='javascript:void(0)' @click='goAnchor("color_spec")'>COLOR_SPEC</a> }</td>
        <td>下边框样式</td>
        <td>{ style: 'thin', color: 'FF5722' }</td>
    </tr>
    <tr>
        <td>left</td>
        <td>{ style: <a href='javascript:void(0)' @click='goAnchor("border_style")'>BORDER_STYLE</a>, color: <a href='javascript:void(0)' @click='goAnchor("color_spec")'>COLOR_SPEC</a> }</td>
        <td>左边框样式</td>
        <td>{ style: 'thin', color: 'FF5722' }</td>
    </tr>
    <tr>
        <td>right</td>
        <td>{ style: <a href='javascript:void(0)' @click='goAnchor("border_style")'>BORDER_STYLE</a>, color: <a href='javascript:void(0)' @click='goAnchor("color_spec")'>COLOR_SPEC</a> }</td>
        <td>右边框样式</td>
        <td>{ style: 'thin', color: 'FF5722' }</td>
    </tr>
    </tbody>
</table>
