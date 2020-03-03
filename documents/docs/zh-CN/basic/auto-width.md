## 自适应列宽

### 1. 默认开启双击列边适应列宽
无需其他配置，只要引入 `soulTable.render(this)` 即可使用  
双击列头右边的边线，将会根据此列内容进行自适应调整（即按照最宽的那个为准）

:::demo
```html
<table id="myTable" lay-filter="myTable"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="reload">table.reload(\'tableId\')</a><a class="layui-btn layui-btn-normal layui-btn-sm" lay-event="resize">table.resize(\'tableId\')</a></div>'
        ,height: 500
        ,limit: 10
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', fixed: 'left', width: 200},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', fixed: 'right', width: 112},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    table.on('toolbar(myTable)', function(obj){
        if (obj.event === 'reload') {
            table.reload('myTable')
        } else if (obj.event === 'resize') {
            table.resize('myTable')
        }
    });
})
</script>
```
:::

### 2. 初始化表格时自动调整列宽
设置 `autoColumnWidth.init = true` 则在表格初始化的时候自动调整列宽

`cols` 中设置的 `width` 将失效，交给 `soulTable` 根据当前列的数据自动调整

如果只是想在初始化时某些列自动列宽，则设置 `autoColumnWidth.init = ['title', 'author']` 即可，数组为 cols 中的 field

:::demo
```html
<table id="myTable2" lay-filter="myTable2"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'data-1.json'
        ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="reload">table.reload(\'tableId\')</a><a class="layui-btn layui-btn-normal layui-btn-sm" lay-event="resize">table.resize(\'tableId\')</a></div>'
        ,height: 500
        ,limit: 10
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', fixed: 'left', width: 200},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', fixed: 'right', width: 112},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,autoColumnWidth: {
            init: true
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
    table.on('toolbar(myTable2)', function(obj){
        if (obj.event === 'reload') {
            table.reload('myTable2')
        } else if (obj.event === 'resize') {
            table.resize('myTable2')
        }
    });
})
</script>
```
:::

### 3. tab 示例
:::demo
```html
<div class="layui-tab" lay-filter="myTab">
  <ul class="layui-tab-title">
    <li class="layui-this">表格一</li>
    <li>表格二</li>
  </ul>
  <div class="layui-tab-content">
    <div class="layui-tab-item layui-show"><table id="myTable31" lay-filter="myTable31"></table></div>
    <div class="layui-tab-item"><table id="myTable32" lay-filter="myTable32"></table></div>
  </div>
</div>

<script>
layui.use(['form', 'element', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    layui.element.on('tab(myTab)', function(data){
        table.resize()
    });


    // 表格一
    table.render({
        elem: '#myTable31'
        ,url: 'data-1.json'
        ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="reload">table.reload(\'tableId\')</a><a class="layui-btn layui-btn-normal layui-btn-sm" lay-event="resize">table.resize(\'tableId\')</a></div>'
        ,height: 500
        ,limit: 10
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词1', fixed: 'left', width: 200},
            {field: 'dynasty', title: '朝代1', width: 100},
            {field: 'author', title: '作者1', width: 165 },
            {field: 'content', title: '内容1', width: 123},
            {field: 'type', title: '类型1', width: 112},
            {field: 'heat', title: '点赞数1', fixed: 'right', width: 112},
            {field: 'createTime', title: '录入时间1', fixed: 'right', width: 165},
        ]]
        ,autoColumnWidth: {
            init: true
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
    table.on('toolbar(myTable31)', function(obj){
        if (obj.event === 'reload') {
            table.reload('myTable31')
        } else if (obj.event === 'resize') {
            table.resize('myTable31')
        }
    });
    
    // 表格二
    table.render({
        elem: '#myTable32'
        ,url: 'data-1.json'
        ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="reload">table.reload(\'tableId\')</a><a class="layui-btn layui-btn-normal layui-btn-sm" lay-event="resize">table.resize(\'tableId\')</a></div>'
        ,height: 500
        ,limit: 10
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词2', fixed: 'left', width: 200},
            {field: 'dynasty', title: '朝代2', width: 100},
            {field: 'author', title: '作者2', width: 165 },
            {field: 'content', title: '内容2', width: 123},
            {field: 'type', title: '类型2', width: 112},
            {field: 'heat', title: '点赞数2', fixed: 'right', width: 112},
            {field: 'createTime', title: '录入时间2', fixed: 'right', width: 165},
        ]]
        ,autoColumnWidth: {
            init: true
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
    table.on('toolbar(myTable32)', function(obj){
        if (obj.event === 'reload') {
            table.reload('myTable32')
        } else if (obj.event === 'resize') {
            table.resize('myTable32')
        }
    });

})
</script>
```
:::

### 5. 复杂表头

:::demo
```html
<table id="myTable5" lay-filter="myTable5"></table>
<script>
layui.use(['form', 'table', 'soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    var myTable = table.render({
        elem: '#myTable5'
        ,url: 'data-1.json'
        ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="reload">table.reload(\'tableId\')</a><a class="layui-btn layui-btn-normal layui-btn-sm" lay-event="resize">table.resize(\'tableId\')</a></div>'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'numbers', title: '序号', rowspan: 3, fixed: 'left'},
            {title: '1-1', colspan: 3, align: 'center'},
            {title: '1-2', colspan: 2},
            {field: 'heat', title: '点赞数', width: 112, rowspan: 3},
            {field: 'createTime', title: '录入时间', rowspan: 3, width: 165, fixed: 'right'}
        ],[
            {title: '2-1', colspan: 2},
            {field: 'author', title: '作者', rowspan: 2, width: 165},
            {title: '2-2', colspan: 2}
        ],[
            {field: 'title', title: '诗词', width: 200},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112}
        ]]
        ,autoColumnWidth: {
            init: true
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    table.on('toolbar(myTable5)', function(obj){
        if (obj.event === 'reload') {
            table.reload('myTable5')
        } else if (obj.event === 'resize') {
            table.resize('myTable5')
        }
    });
})
</script>
```
:::

### 4. 关闭自动列宽
设置 `autoColumnWidth = false` 或 `autoColumnWidth.dblclick = false` 则会关闭双击自动列宽功能

:::demo
```html
<table id="myTable4" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable4'
        ,url: 'data-1.json'
        ,height: 500
        ,limit: 10
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', fixed: 'left', width: 200},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', fixed: 'right', width: 112},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,autoColumnWidth: false
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::