## 无限层级
子表也可以有子表，无深度限制

### 展开方式 （默认方式）
下面为一个四层的子表
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
            {title: '#', width: 50, children:[
                {
                    title: '子表'
                    ,url: 'data-1.json'
                    ,height: 500
                    ,page: false
                    ,cols: [[
                        {title: '#', width: 50, children:[
                            {
                                title: '子表的子表'
                                ,url: 'data-1.json'
                                ,height: 300
                                ,page: false
                                ,cols: [[
                                    {title: '#', width: 50, children:[
                                        {
                                            title: '子表的子表的子表'
                                            ,url: 'data-1.json'
                                            ,height: 300
                                            ,page: false
                                            ,cols: [[
                                                {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                                                {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                                                {field: 'author', title: '作者', width: 165 , filter: true},
                                                {field: 'content', title: '内容', width: 123, filter: true},
                                                {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                                                {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                                                {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                                                {title: '操作', width: 156, templet: '#childBar'}
                                            ]]
                                            ,done: function () {
                                                soulTable.render(this);
                                            }
                                        }
                                    ]},
                                    {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                                    {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                                    {field: 'author', title: '作者', width: 165 , filter: true},
                                    {field: 'content', title: '内容', width: 123, filter: true},
                                    {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                                    {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                                    {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                                    {title: '操作', width: 156, templet: '#childBar'}
                                ]]
                                ,done: function () {
                                    soulTable.render(this);
                                }
                            }
                        ]},
                        {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                        {field: 'author', title: '作者', width: 165 , filter: true},
                        {field: 'content', title: '内容', width: 123, filter: true},
                        {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                        {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                        {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                        {title: '操作', width: 156, templet: '#childBar'}
                    ]]
                    ,done: function () {
                        soulTable.render(this);
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 弹窗方式
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
            {title: '#', show: 2, width: 50, children:[
                {
                    title: '子表'
                    ,url: 'data-1.json'
                    ,height: 500
                    ,page: false
                    ,cols: [[
                        {title: '#', show: 2, width: 50, children:[
                            {
                                title: '子表的子表'
                                ,url: 'data-1.json'
                                ,height: 300
                                ,page: false
                                ,cols: [[
                                    {title: '#', show: 2, width: 50, children:[
                                        {
                                            title: '子表的子表的子表'
                                            ,url: 'data-1.json'
                                            ,height: 300
                                            ,page: false
                                            ,cols: [[
                                                {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                                                {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                                                {field: 'author', title: '作者', width: 165 , filter: true},
                                                {field: 'content', title: '内容', width: 123, filter: true},
                                                {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                                                {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                                                {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                                                {title: '操作', width: 156, templet: '#childBar'}
                                            ]]
                                            ,done: function () {
                                               soulTable.render(this);
                                            }
                                        }
                                    ]},
                                    {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                                    {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                                    {field: 'author', title: '作者', width: 165 , filter: true},
                                    {field: 'content', title: '内容', width: 123, filter: true},
                                    {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                                    {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                                    {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                                    {title: '操作', width: 156, templet: '#childBar'}
                                ]]
                                ,done: function () {
                                   soulTable.render(this);
                                }
                            }
                        ]},
                        {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
                        {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
                        {field: 'author', title: '作者', width: 165 , filter: true},
                        {field: 'content', title: '内容', width: 123, filter: true},
                        {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                        {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                        {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
                        {title: '操作', width: 156, templet: '#childBar'}
                    ]]
                    ,done: function () {
                       soulTable.render(this);
                    }
                }
            ]},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

