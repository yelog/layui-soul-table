## 拖拽行

### 1. 开启效果

拖动行上下移动即可, `trigger` 缺省为 `row`, 即整行都能触发

:::demo
```html
<table id="myTable" ></table>
<script type="text/html" id="myBar">
    <div>
        行拖拽: <input type="checkbox" lay-skin="switch" lay-filter="rowDragSwitch" lay-text="启用|暂停" checked>
    </div>
</script>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        form = layui.form,
        soulTable = layui.soulTable;

    var myTable = table.render({
        id: 'myTable',
        elem: '#myTable'
        ,url: 'data-1.json'
        ,toolbar: '#myBar'
        ,height: 500
        ,rowDrag: {/*trigger: 'row',*/ done: function(obj) {
            // 完成时（松开时）触发
            // 如果拖动前和拖动后无变化，则不会触发此方法
            console.log(obj.row) // 当前行数据
            console.log(obj.cache) // 改动后全表数据
            console.log(obj.oldIndex) // 原来的数据索引
            console.log(obj.newIndex) // 改动后数据索引
        }}
        ,totalRow: true
        ,cols: [[
            {type: 'radio', title: '##', fixed: 'left'},
            {type: 'checkbox', title: '##', fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'author', title: '作者-可编辑列', edit: 'text', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 75, fixed: 'right', totalRow: true},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    form.on('switch(rowDragSwitch)', function(data){
      soulTable.suspend('myTable', 'rowDrag', !data.elem.checked)
    });
})
</script>
```
:::

### 2. 序号和even和后台分页

开启序号后，拖拽默认会自动同步数据和UI

可通过以下配置配置取消同步
```js
rowDrag: {
  numbers: false
}
```

:::demo
```html
<table id="myTable2" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'https://soultable.saodiyang.com/layui-soul-table-java/poetry/dataGrid'
        ,toolbar: true
        ,height: 500
        ,page: true
        ,rowDrag: {/*trigger: 'row',*/ done: function(obj) {
            // 完成时（松开时）触发
            // 如果拖动前和拖动后无变化，则不会触发此方法
            console.log(obj.row) // 当前行数据
            console.log(obj.cache) // 改动后全表数据
            console.log(obj.oldIndex) // 原来的数据索引
            console.log(obj.newIndex) // 改动后数据索引
        }}
        ,even: true
        ,totalRow: true
        ,cols: [[
            {type: 'numbers', title: '序号', fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 75, fixed: 'right', totalRow: true},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 3. 指定拖动元素
如下，只绑定到作者这列的这个图标上，`trigger: '.layui-icon-snowflake'`
:::demo
```html
<table id="myTable3" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable3'
        ,url: 'data-1.json'
        ,toolbar: true
        ,height: 500
        ,rowDrag: {trigger: '.layui-icon-snowflake', done: function(obj) {
            // 完成时（松开时）触发
            // 如果拖动前和拖动后无变化，则不会触发此方法
            console.log(obj.row) // 当前行数据
            console.log(obj.cache) // 改动后表格数据
            console.log(obj.oldIndex) // 原来的数据索引
            console.log(obj.newIndex) // 改动后数据索引
        }}
        ,totalRow: true
        ,cols: [[
            {field: 'author', title: '作者', width: 165, fixed: 'left', templet: '<div><i class="layui-icon layui-icon-snowflake" />{{d.author}}</div>'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 75, fixed: 'right', totalRow: true},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 4. before - 在拖拽松开时触发，如果返回 false，则还原。
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
        ,toolbar: true
        ,height: 500
        ,rowDrag: {before: function(obj) {
            // 完成之前的操作(拖拽结束松开鼠标，首先触发，如果返回false，则还原)
            // 如果拖动前和拖动后无变化，则不会触发此方法
            console.log(obj.cache) // 表格数据
            console.log(obj.row) // 当前行数据
            console.log(obj.oldIndex) // 原来的数据索引
            console.log(obj.newIndex) // 改动后数据索引
            layer.msg('不符合要求，操作还原')
            // 返回 false 时，还原操作
            return false;
        }}
        ,totalRow: true
        ,cols: [[
            {field: 'author', title: '作者', width: 165, fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 75, fixed: 'right', totalRow: true},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::
