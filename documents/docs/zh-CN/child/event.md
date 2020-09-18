## 事件监听

<table class='el-table el-table--border'>
    <thead>
    <tr>
        <th>参数</th>
        <th>类型</th>
        <th>事件名</th>
        <th>示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>childOpen</td>
        <td>function</td>
        <td>行展开事件</td>
        <td>
<pre>
childOpen: function (obj) {
    // <span class="hljs-keyword">obj</span> 当前行对象
    // 可从中调用 data/tr/update/del
}
</pre>
        </td>
    </tr>
    <tr>
        <td>childClose</td>
        <td>function</td>
        <td>行关闭事件</td>
        <td>
<pre>
childClose: function (obj) {
    // <span class="hljs-keyword">obj</span> 当前行对象
    // 可从中调用 data/tr/update/del
}
</pre>
        </td>
    </tr>    
    <tr>
        <td>rowEvent</td>
        <td>function</td>
        <td>行单击</td>
        <td>
<pre>
rowEvent: function (obj, pobj) {
    // <span class="hljs-keyword">obj</span> 子表当前行对象
    // 可从中调用 event/data/tr/update/del
    // <span class="hljs-keyword">this.id</span> 通过 this 对象获取当前子表的id
    // <span class="hljs-keyword">pobj</span> 父表当前行数据
    //  pobj.data 父表当前行数据
    //  pobj.tr 父表当前行dom
    //  pobj.update 更新父表当前行数据
    //  pobj.del 删除父表当前行，并关闭子表
    //  pobj.close 关闭父表当前行展开的子表
}
</pre>
        </td>
    </tr>
    <tr>
        <td>rowDoubleEvent</td>
        <td>function</td>
        <td>行双击</td>
        <td>
<pre>
rowDoubleEvent: function (obj, pobj) {
    // <span class="hljs-keyword">obj</span> 子表当前行对象
    // 可从中调用 event/data/tr/update/del
    // <span class="hljs-keyword">this.id</span> 通过 this 对象获取当前子表的id
    // <span class="hljs-keyword">pobj</span> 父表当前行数据
    // 可从pobj中调用 
    //    data/tr/update/del/close
}
</pre>
        </td>
    </tr>
    <tr>
        <td>toolEvent</td>
        <td>function</td>
        <td>行工具</td>
        <td>
<pre>
toolEvent: function (obj, pobj) {
    // <span class="hljs-keyword">obj</span> 子表当前行对象
    // 可从中调用 event/data/tr/update/del
    // <span class="hljs-keyword">this.id</span> 通过 this 对象获取当前子表的id
    // <span class="hljs-keyword">pobj</span> 父表当前行数据
    // 可从pobj中调用 
    //    data/tr/update/del/close
}
</pre>
        </td>
    </tr>
    <tr>
        <td>toolbarEvent</td>
        <td>function</td>
        <td>头部工具栏</td>
        <td>
<pre>
toolbarEvent: function (obj, pobj) {
    // <span class="hljs-keyword">obj</span> 子表当前行对象 obj.event
    // <span class="hljs-keyword">this.id</span> 通过 this 对象获取当前子表的id
    // <span class="hljs-keyword">pobj</span> 父表当前行数据
    // 可从pobj中调用 
    //    data/tr/update/del/close
}
</pre>
        </td>
    </tr>
    <tr>
        <td>checkboxEvent</td>
        <td>function</td>
        <td>复选框选择</td>
        <td>
<pre>
checkboxEvent: function (obj, pobj) {
    // <span class="hljs-keyword">obj</span> 子表当前行对象 obj.event
    // 可从中调用 event/data/tr/update/del
    // <span class="hljs-keyword">this.id</span> 通过 this 对象获取当前子表的id
    // <span class="hljs-keyword">pobj</span> 父表当前行数据
    // 可从pobj中调用 
    //    data/tr/update/del/close
}
</pre>
        </td>
    </tr>
    <tr>
        <td>editEvent</td>
        <td>function</td>
        <td>单元格编辑</td>
        <td>
<pre>
editEvent: function (obj, pobj) {
    // <span class="hljs-keyword">obj.oldValue</span> 修改前的值
    // <span class="hljs-keyword">obj.value</span> 得到修改后的值
    // <span class="hljs-keyword">obj.field</span> 当前编辑的字段名
    // <span class="hljs-keyword">obj.data</span> 所在行的所有相关数据 
    // <span class="hljs-keyword">this.id</span> 通过 this 对象获取当前子表的id
    // <span class="hljs-keyword">pobj</span> 父表当前行数据
    // 可从pobj中调用 
    //    data/tr/update/del/close
}
</pre>
        </td>
    </tr>
    </tbody>
</table>

### 1. 展开/关闭 事件监听
:::demo
```html
<table id="myTable5" lay-filter="myTable5"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable5'
        ,url: 'data-1.json'
        ,page: false
        ,cols: [[
            {title: '#', width: 50, childWidth: 'full', children:[
                {
                    title: '表格一'
                    ,url: 'data-1.json'
                    ,height: 300
                    ,page: false
                    ,cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                        {field: 'author', title: '作者', width: 165 , filter: true},
                        {field: 'content', title: '内容', width: 123, filter: true},
                        {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                        {field: 'heat', title: '点赞数', width: 112, filter: true, sort:true},
                    ]]
                    ,done: function () {
                       soulTable.render(this);
                    }
                }
            ], childOpen: function(obj) {
                // 行展开事件
                // obj 当前行对象
                obj.tr.css({'background':'#5FB878'}).siblings().removeAttr('style')
                console.log(obj.tr) //得到当前行元素对象
                console.log(obj.data) //得到当前行数据
                //obj.del(); //删除当前行
                //obj.update(fields) //修改当前行数据
                layer.msg('展开事件！');
                obj.update({
                  heat: parseInt(obj.data.heat||0) + 1
                })
              console.log()
            }, childClose: function(obj) {
                // 行关闭事件
                // obj 当前行对象
                obj.tr.removeAttr('style')
                console.log(obj.tr) //得到当前行元素对象
                console.log(obj.data) //得到当前行数据
                //obj.del(); //删除当前行
                //obj.update(fields) //修改当前行数据
                layer.msg('关闭事件！');
            }},
            {field: 'title', title: '诗词', width: 200, sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112, fixed: 'right', sort:true}
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 1.子表的 row/rowDouble/tool/toolbar/edit/checkbox 事件监听
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
                    ,width: 700
                    ,toolbar: '<div><a class="layui-btn layui-btn-sm" lay-event="reload">重载</a> <a class="layui-btn layui-btn-normal layui-btn-sm" lay-event="update">更新父表（朝代+1）</a> <a class="layui-btn layui-btn-danger layui-btn-sm" lay-event="delete">删除父表当前行</a> <a class="layui-btn layui-btn-sm layui-btn-warm" lay-event="close">关闭子表</a></div>'
                    ,page: false
                    ,cols: [[
                        {type: 'checkbox', fixed: 'left'},
                        {field: 'title', title: '诗词（可编辑列）', edit: 'text', width: 200, sort: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true},
                        {title: '操作', width: 300, templet: function(row) {
                           return '<a class="layui-btn layui-btn-xs" lay-event="childEdit">编辑并更新当前行数据</a>' +
                            '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="childDel">删除并重载子表</a>'
                        }}
                    ]]
                    ,rowEvent: function (obj, pobj) {
                        // 单击行事件
                        // obj 子表当前行对象
                        // pobj 父表当前行对象
                        obj.tr.css({'background':'#5FB878'}).siblings().removeAttr('style')
                        console.log(obj.tr) //得到当前行元素对象
                        console.log(obj.data) //得到当前行数据
                        console.log(pobj) //得到当前行数据
                        //obj.del(); //删除当前行
                        //obj.update(fields) //修改当前行数据
                    }
                    ,rowDoubleEvent: function (obj, pobj) {
                        // 双击行事件
                        // obj 子表当前行对象
                        // pobj 父表当前行对象
                        obj.tr.css({'background':'#FF5722'}).siblings().removeAttr('style')
                        console.log(obj.tr) //得到当前行元素对象
                        console.log(obj.data) //得到当前行数据
                        //obj.del(); //删除当前行
                        //obj.update(fields) //修改当前行数据
                    }
                    ,toolEvent: function (obj, pobj) {
                        // obj 子表当前行对象
                        // pobj 父表当前行对象
                        
                        var childId = this.id; // 通过 this 对象获取当前子表的id
                        
                        if (obj.event === 'childEdit') {
                            layer.confirm('确定要修改吗？调用<span style="color: #FF5722">行对象</span>修改当前行数据', {icon: 3}, function(index) {
                               layer.close(index)
                               obj.update({
                                  title: '我被修改了！'
                               })
                           })
                        } else if (obj.event === 'childDel') {
                            layer.confirm('确定要删除吗？调用<span style="color: #FF5722">table.reload(childId)</span>来重载子表', {icon: 3}, function(index) {
                               layer.close(index)
                               table.reload(childId)
                            })
                        }

                    }
                    ,toolbarEvent: function (obj, pobj) {
                        // obj 子表当前行对象
                        // pobj 父表当前行对象
                        if (obj.event === 'reload') {
                            table.reload(this.id)
                            layer.msg('子表重载成功！')
                        } else if (obj.event === 'delete') {
                            pobj.del()
                        } else if (obj.event === 'update') {
                            pobj.update({dynasty: pobj.data.dynasty + '+1'})
                        } else if (obj.event === 'close') {
                            pobj.close()
                        }
                    }
                    ,checkboxEvent: function(obj, pobj) {
                        // obj 子表当前行对象
                        // pobj 父表当前行对象
                        if (obj.type === 'all') {
                            layer.msg('父表全选，是否选中：' + obj.checked)
                        } else if (obj.type === 'one'){
                            layer.msg('父表 checkbox 事件，是否选中：' + obj.checked)
                        }
                    }
                    ,editEvent: function(obj, pobj) {
                      // obj 子表当前行对象
                      // pobj 父表当前行对象
                      layer.msg(obj.oldValue + " 已成功改为：" + obj.value);
                    }
                    ,done: function () {
                       soulTable.render(this)
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true},
            {field: 'dynasty', edit: 'text', title: '朝代', width: 100, sort: true},
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
    
   table.on('edit(myTable)', function(obj){      
      console.log('父表编辑事件');     
    });
})
</script>
```
:::

### 2.父表的行点击事件
由于 layui 的行事件中获取的 `obj.tr` 没有精确获取，导致有子表的时候，`obj.tr` 还会包含子表的对应行对象。这时如果操作 `obj.tr` 则会影响子表

为了解决这个问题， 给父表也提供了 `rowEvent` 、 `rowDoubleEvent` 、 `toolEvent` 、 `toolbarEvent` 、`checkboxEvent` 和 `editEvent` 事件，可以正常调用, 和 layui 原生一样

打开控制台，更好地观察事件的触发情况
:::demo
```html
<table id="myTable2" lay-filter="myTable2"></table>
<script type="text/html" id="toolbar">
  <a class="layui-btn  layui-btn-sm" lay-event="reload">重载</a>
</script>
<script type="text/html" id="tool">
  <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
  <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'data-1.json'
        ,height: 500
        ,toolbar: '#toolbar'
        ,page: false
        ,cols: [[
            {type: 'checkbox'},
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
                       soulTable.render(this)
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者（可编辑）', edit: 'text', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, sort:true},
            {fixed: 'right', width:150, align:'center', toolbar: '#tool'}
        ]]
        ,checkboxEvent: function (obj) {
            if (obj.type === 'all') {
                layer.msg('父表全选，是否选中：' + obj.checked)
            } else if (obj.type === 'one'){
                layer.msg('父表 checkbox 事件，是否选中：' + obj.checked)
            }
        }
        ,editEvent: function (obj) {
           layer.msg(obj.oldValue + " 已成功改为：" + obj.value);
        }
        ,toolbarEvent: function (obj) {
            // obj 当前行对象
            if (obj.event === 'reload') {
                table.reload(this.id)
                layer.msg('重载成功！')
            }
        }
        ,rowEvent: function (obj) {
            obj.tr.css({'background':'#5FB878','color':'white'}).siblings().removeAttr('style') // 设置当前行颜色
            console.log('[父表行单击事件] 当前行对象:', obj.tr) //得到当前行元素对象
            console.log('[父表行单机事件] 当前行数据:', obj.data) //得到当前行数据
            // obj.tr.find('.childTable').trigger('click'); // 触发展开/关闭当前行子表
            // obj.del(); //删除当前行
            // obj.update(fields) //修改当前行数据
        }
        ,rowDoubleEvent: function (obj) {
            obj.tr.css({'background':'#FF5722','color':'white'}).siblings().removeAttr('style')
            console.log('[父表行双击行事件] 当前行对象:', obj.tr) //得到当前行元素对象
            console.log('[父表行双击事件] 当前行数据:', obj.data) //得到当前行数据
            //obj.del(); //删除当前行
            //obj.update(fields) //修改当前行数据
        },
        toolEvent: function (obj) {
            var layEvent = obj.event, // 获取 lay-event 对应的值
                tr = obj.tr, // 获取当前行 的 dom 对象（如果有的话）
                data = obj.data; // 当前行数据
            console.log('[父表tool事件] 当前行对象:', tr)
            console.log('[父表tool事件] 当前行数据:', data)
            if (layEvent === 'edit') {
               //同步更新缓存对应的值
               obj.update({
                 author: '123'
                 ,title: 'xxx'
               }); 
               layer.msg('更新成功！')
            } else if (layEvent === 'del') {
               layer.confirm('真的删除行么', function(index){
                 obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                 layer.close(index);
                 //向服务端发送删除指令
               }); 
            }
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    table.on('tool(myTable2)', function (obj){
        console.log('tool')
        var data = obj.data; //获得当前行数据
          var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
          var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
         
          if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
              obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
              layer.close(index);
              //向服务端发送删除指令
            });
          } else if(layEvent === 'edit'){ //编辑
            //do something
            
            //同步更新缓存对应的值
            obj.update({
              author: '123'
              ,title: 'xxx'
            });
          }
    })

})
</script>
```
:::

### 3.子表重载 reload

我们只需要获取到子表的id，就可以通过 `table.reload(id)` 来重载表格。 

<br>

获取 **子表id** 有以下两种方式

1.(**推荐使用，如果外部使用，可以这些方法传出tableId**)通过 `url/data/where/done/toolEvent/rowEvent/rowDoubleEvent` ，都可以在其 `function` 中 通过 `this.id` 获取，具体可参考上个示例: **1.子表的 row/rowDouble/tool/toolbar/edit/checkbox 事件监听**

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
                       soulTable.render(this)
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

