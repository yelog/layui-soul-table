## 事件监听
### 1.子表的行点击事件
通过设置 `rowEvent` 和 `rowDoubleEvent` 来设置子表的点击与双击事件
```js
,rowEvent: function (obj, pdata) {
    // 单击行事件
    // obj 子表当前行对象
    // pdata 父表当前行数据
}
```
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
        ,height: 500
        ,page: false
        ,cols: [[
            {title: '#', width: 50, children:[
                {
                    title: '表格一'
                    ,url: 'data-1.json'
                    ,height: 400
                    ,page: false
                    ,cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field: 'title', title: '诗词', width: 200, sort: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true},
                        {field: 'author', title: '作者', width: 165 },
                        {field: 'content', title: '内容', width: 123},
                        {field: 'type', title: '类型', width: 112, sort:true},
                        {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                        {field: 'createTime', title: '录入时间', width: 165, sort:true}
                    ]]
                    ,rowEvent: function (obj, pdata) {
                        // 单击行事件
                        // obj 子表当前行对象
                        // pdata 父表当前行数据
                        layer.msg('子表-单击行事件')
                        obj.tr.css({'background':'#5FB878','color':'white'}).siblings().removeAttr('style')
                        console.log(obj.tr) //得到当前行元素对象
                        console.log(obj.data) //得到当前行数据
                        //obj.del(); //删除当前行
                        //obj.update(fields) //修改当前行数据
                    }
                    ,rowDoubleEvent: function (obj, pdata) {
                        // 双击行事件
                        // obj 子表当前行对象
                        // pdata 父表当前行数据
                        layer.msg('子表-双击行事件')
                        obj.tr.css({'background':'#FF5722','color':'white'}).siblings().removeAttr('style')
                        console.log(obj.tr) //得到当前行元素对象
                        console.log(obj.data) //得到当前行数据
                        //obj.del(); //删除当前行
                        //obj.update(fields) //修改当前行数据
                    }
                    ,done: function () {
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, sort:true}
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 2.父表的行点击事件
由于 layui 的行点击事件中获取的 `obj.tr` 没有精确获取，导致有子表的时候，`obj.tr` 还会包含子表的对应行对象。这时如果操作 `obj.tr` 则会影响子表

为了解决这个问题， 给父表也提供了 `rowEvent` 和 `rowDoubleEvent` 事件，可以正常调用, 和 layui 原生一样
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
        ,height: 500
        ,page: false
        ,cols: [[
            {title: '#', width: 50, children:[
                {
                    title: '表格一'
                    ,url: 'data-1.json'
                    ,height: 400
                    ,page: false
                    ,cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field: 'title', title: '诗词', width: 200, sort: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true},
                        {field: 'author', title: '作者', width: 165 },
                        {field: 'content', title: '内容', width: 123},
                        {field: 'type', title: '类型', width: 112, sort:true},
                        {field: 'heat', title: '点赞数', width: 112, sort:true},
                        {field: 'createTime', title: '录入时间', width: 165, sort:true}
                    ]]
                    ,done: function () {
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, sort:true},
        ]]
        ,rowEvent: function (obj) {
            layer.msg('父表行单击行事件！')
            obj.tr.css({'background':'#5FB878','color':'white'}).siblings().removeAttr('style')
            console.log(obj.tr) //得到当前行元素对象
            console.log(obj.data) //得到当前行数据
            //obj.del(); //删除当前行
           //obj.update(fields) //修改当前行数据
        }
        ,rowDoubleEvent: function (obj) {
            layer.msg('父表行双击行事件！')
            obj.tr.css({'background':'#FF5722','color':'white'}).siblings().removeAttr('style')
            console.log(obj.tr) //得到当前行元素对象
            console.log(obj.data) //得到当前行数据
            //obj.del(); //删除当前行
            //obj.update(fields) //修改当前行数据
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 3.子表的tool事件
通过子表的 `toolEvent` 来监听子表的 tool 事件，如下子表的**编辑**、**删除**按钮事件绑定
:::demo
```html
<table id="myTable3" lay-filter="myTable3"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    table.render({
        elem: '#myTable3'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {title: '#', width: 50, children:[
                {
                    title: '表格一'
                    ,url: 'data-1.json'
                    ,height: 400
                    ,page: false
                    ,cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field: 'title', title: '诗词', width: 200, sort: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true},
                        {field: 'author', title: '作者', width: 165 },
                        {title: '操作', width: 156, templet: function(row) {
                           return '<a class="layui-btn layui-btn-xs" lay-event="childEdit">编辑</a><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="childDel">删除</a>'
                        }}
                    ]]
                    ,toolEvent: function (obj, pdata) {
                        // obj 子表当前行对象
                        // pdata 父表当前行数据
                        if (obj.event === 'childEdit') {
                            layer.msg('子表-编辑事件')
                        } else if (obj.event === 'childDel') {
                            layer.msg('子表-删除事件')
                        }

                    }
                    ,done: function () {
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>

```
:::
