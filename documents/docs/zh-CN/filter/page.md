## 分页

### 前台分页

在前台分页的情况下，仍然可以直接使用筛选功能
:::demo
```html
<table id="myTable" lay-filter="myTable"></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    table.render({
        elem: '#myTable'
        ,height: 500
        ,limit: 20
        ,page: true
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
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    search({});
    function search(data) {
        var loading = layer.load(2);
        $.ajax({
            url: 'data.json',
            data: data,
            dataType: 'json',
            success: function (res) {
                // myTable.reload({
                //     data: res.data
                // })
                table.reload('myTable', {
                    data: res.data
                })
            },
            complete: function () {
                layer.close(loading)
            }
        })
    }
})
</script>
```
:::

### 后台分页
后台分页的筛选，由于前台数据不全，所以需要后台插件支持。

**java** 的 `mybatis/mybatis-plus` 版 ：[https://github.com/yelog/layui-soul-table-java](https://github.com/yelog/layui-soul-table-java) 

其他版本的后台插件可以加qq群详聊：<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=3cbfbd2169afc3f4d11732101388941b0db5330a64755e68f27740b604409629"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="layui-使用交流" title="layui-使用交流"></a>

:::demo
```html
<div class="layui-row layui-form">
    <div class="layui-col-sm5">
        <div class="layui-inline">
            <label class="layui-form-label">诗词</label>
            <div class="layui-input-inline" >
                <input type="text" name="title"
                       class="layui-input" placeholder="请输入诗词关键字">
            </div>
        </div>
    </div>
    <div class="layui-col-sm5">
        <div class="layui-inline">
            <label class="layui-form-label">内容</label>
            <div class="layui-input-inline">
                <input type="text" name="content"
                       class="layui-input" placeholder="请选择内容关键词">
            </div>
        </div>
    </div>
    <div class="layui-col-sm2">
        <button class="layui-btn mgl-20" lay-submit="" lay-filter="search"><i class="layui-icon">&#xe615;</i>查询</button>
    </div>
</div>
<table id="myTable2" lay-filter="myTable2"></table>
<script>
    layui.use(['form', 'table','soulTable'], function () {
        var table = layui.table,
            soulTable = layui.soulTable,
            form = layui.form;

        table.render({
            id: 'myTable2'
            ,elem: '#myTable2'
            ,url: 'https://soultable.saodiyang.com/back/poetry/dataGrid'
            ,height: 400 
            ,limit: 20
            ,page: true
            ,cols: [[
                {type: 'checkbox', fixed: 'left'},
                {field: 'title', title: '诗词', fixed:'left', width: 200, sort: true, filter: true},
                {field: 'dynasty', title: '朝代',fixed: 'left', width: 100, sort: true, filter: true},
                {field: 'author', title: '作者', width: 165 , filter: true},
                {field: 'content', title: '内容', width: 123, filter: true},
                {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
                {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                {field: 'createTime', title: '录入时间', width: 165,fixed:'right',  filter: {type: 'date[yyyy-MM-dd HH:mm:ss]'}, sort:true},
            ]]
            ,done: function () {
                soulTable.render(this)
            }
        });
        form.on('submit(search)', function (data) {
            table.reload('myTable2', {
                where: data.field
            })
        })
    })
</script>
```
:::
