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
                        layui.soulTable.render(this)
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
                        layui.soulTable.render(this)
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
                        {title: '操作', width: 300, templet: function(row) {
                           return '<a class="layui-btn layui-btn-xs" lay-event="childEdit">编辑并更新当前行数据</a>' +
                            '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="childDel">删除并重载子表</a>'
                        }}
                    ]]
                    ,toolEvent: function (obj, pdata) {
                        // obj 子表当前行对象
                        // pdata 父表当前行数据
                        
                        var childId = this.id; // 通过 this 对象获取当前子表的id
                        
                        if (obj.event === 'childEdit') {
                            layer.confirm('修改成功！调用<span style="color: #FF5722">行对象</span>修改当前行数据', {icon: 3}, function(index) {
                               layer.close(index)
                               obj.update({
                                  title: '我被修改了！'
                               })
                           })
                        } else if (obj.event === 'childDel') {
                            layer.confirm('删除成功! 调用<span style="color: #FF5722">table.reload(childId)</span>来重载子表', {icon: 3}, function(index) {
                               layer.close(index)
                               table.reload(childId)
                            })
                        }

                    }
                    ,done: function () {
                        layui.soulTable.render(this)
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

### 4.子表重载 reload

我们只需要获取到子表的id，就可以通过 `table.reload(id)` 来重载表格。 

<br>

获取 **子表id** 有以下两种方式

1.(**推荐使用，如果外部使用，可以这些方法传出tableId**)通过 `url/data/where/done/toolEvent/rowEvent/rowDoubleEvent` ，都可以在其 `function` 中 通过 `this.id` 获取，具体可参考上个示例: **3.子表的tool事件**

2.直接通过命名方式获取，子表的Id命名方式为 **父表id+父表展开行+同级第几个(children的下表)** 

<br>

如下重载第二行，第一个子表，重载前，请打开第二行子表

:::demo
```html
<a class="layui-btn" id="updateChild">更新第二行，第一个子表</a>
<table id="myTable4" lay-filter="myTable4"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable4'
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
                    ,done: function() {
                        layui.soulTable.render(this)
                        layer.msg('子表加载完成')
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, sort:true}
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    layui.$('#updateChild').on('click', function() {
        // 父表ID: myTable4
        // 第2行下标: 1
        // 第一个子表下标(children下标): 0
        var childId = 'myTable4'+'1'+'0';
        if (layui.table.cache[childId]) {
            table.reload(childId)
        } else {
            layer.msg('请先展开第二行的子表')
        }
        
    })
})
</script>
```
:::


