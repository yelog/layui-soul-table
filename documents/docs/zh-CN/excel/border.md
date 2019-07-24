## 边框样式设置

### 红色虚线边框 - 全局设置
:::demo
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
            filename: '红色虚线边框-全局设置.xlsx', // 文件名
            border: {
                style: 'dashed',
                color: 'FF0000'
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

### 精准边框样式
诗词一列为绿色边框，点赞数大于50为红色边框，唐代为蓝色边框
:::demo
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
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true, excel: {
                border: {
                    style: 'thick',
                    color: '5FB878'
                }
            }},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true, excel: function(row) {
                return {
                    border: {
                        style: row.dynasty === '唐代' ? 'thick' : '',
                        color: row.dynasty === '唐代' ? '1E9FFF' : ''
                    }
                }
            }},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true, excel: function(row, index, length) {
              return {
                  border: {
                      top: {
                          style: index === 0 ? 'thick' : '',
                          color: index === 0 ? '0000FF' : '',
                      },
                      bottom: {
                          style: index+1 === length ? 'thick' : '',
                          color: index+1 === length ? '0000FF' : '',
                      },
                      left: {
                          style: 'thick',
                          color: '0000FF',
                      },
                      right: {
                        style: 'thick',
                        color: '0000FF',
                      }
                  }
              }
            }},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true, excel: function(row) {
                return {
                    border: {
                        style: row.heat > 50 ? 'thick' : '',
                        color: row.heat > 50 ? 'FF5722' : ''
                    }
                }
            }},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,excel:{ 
            filename: '精准边框样式.xlsx' // 文件名
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
        <td rowspan="6">border</td>
        <td>color</td>
        <td>上下左右边框颜色 <a href='javascript:void(0)' @click='goAnchor("color_spec")'>COLOR_SPEC</a> </td>
        <td>'FF5722'</td>
    </tr>
    <tr>
        <td>style</td>
        <td>上下左右边框样式 <a href='javascript:void(0)' @click='goAnchor("border_style")'>BORDER_STYLE</a></td>
        <td>'thin'</td>
    </tr>
    <tr>
        <td>top</td>
        <td>上边框样式{ style: <a href='javascript:void(0)' @click='goAnchor("border_style")'>BORDER_STYLE</a>, color: <a href='javascript:void(0)' @click='goAnchor("color_spec")'>COLOR_SPEC</a> }</td>
        <td>{ style: 'thin', color: 'FF5722' }</td>
    </tr>
    <tr>
        <td>bottom</td>
        <td>下边框样式{ style: <a href='javascript:void(0)' @click='goAnchor("border_style")'>BORDER_STYLE</a>, color: <a href='javascript:void(0)' @click='goAnchor("color_spec")'>COLOR_SPEC</a> }</td>
        <td>{ style: 'thin', color: 'FF5722' }</td>
    </tr>
    <tr>
        <td>left</td>
        <td>左边框样式{ style: <a href='javascript:void(0)' @click='goAnchor("border_style")'>BORDER_STYLE</a>, color: <a href='javascript:void(0)' @click='goAnchor("color_spec")'>COLOR_SPEC</a> }</td>
        <td>{ style: 'thin', color: 'FF5722' }</td>
    </tr>
    <tr>
        <td>right</td>
        <td>右边框样式{ style: <a href='javascript:void(0)' @click='goAnchor("border_style")'>BORDER_STYLE</a>, color: <a href='javascript:void(0)' @click='goAnchor("color_spec")'>COLOR_SPEC</a> }</td>
        <td>{ style: 'thin', color: 'FF5722' }</td>
    </tr>
    </tbody>
</table>

### COLOR_SPEC
这里只能用hex（十六进制颜色码），且不能加 `#` 如红色：'ff0000'

### BORDER_STYLE
**BORDER_STYLE**: 边框支持以下几种样式:

`thin`(细边框)

`medium`(中等)

`thick`(厚)

`dotted`(点线)

`hair`(毛)

`dashed`(虚线)

`mediumDashed`(中等宽度虚线)

`dashDot`(点)

`mediumDashDot`(中等宽度点)

`dashDotDot`(虚线带点)

`mediumDashDotDot`(中等虚线带点)

`slantDashDot`(倾斜虚线点--楼主也没明白啥意思╮(╯▽╰)╭)
