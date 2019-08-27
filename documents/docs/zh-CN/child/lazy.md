## 懒加载

### 多个同级（tab）开启懒加载
默认多个子表(tab)，在展开时会同时加载进来。如果设置同级子表过多，可能会出现加载较慢的情况。

这时可以通过设置 `lazy: true` ，其他tab页默认不加载，点击显示时才会加载

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
        ,height: 600
        ,page: false
        ,cols: [[
            {title: '#', width: 50, lazy: true, children:[
                {
                    title: '表格一'
                    ,url: 'data-1.json'
                    ,height: 300
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
                       soulTable.render(this);
                    }
                },
                {
                    title: '表格二'
                    ,url: 'data-1.json'
                    ,height: 300
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
                       soulTable.render(this);
                    }
                },
                 {
                     title: '表格三'
                     ,url: 'data-1.json'
                     ,height: 300
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
                 },
                  {
                      title: '表格四'
                      ,url: 'data-1.json'
                      ,height: 300
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
                         soulTable.render(this);
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
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::


### 子表默认展开（**不建议开启，因为所有的子表逻辑会同时执行，造成卡顿**）
设置 `spread: true` 默认展开子表
:::demo
```html
<table id="myTable2" lay-filter="myTable"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'child.json'
        ,height: 600
        ,page: false
        ,cols: [[
            {title: '#', width: 50, spread: true, children:[
                {
                    title: '表格一'
                    ,data: function(row) {
                      return row.children;
                    }
                    ,height: 300
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
                       soulTable.render(this);
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
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::




