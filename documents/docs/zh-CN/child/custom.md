## 自定义展开内容
children 支持通过传入 `layTpl` 使用方法和表格的 [templet](https://www.layui.com/doc/modules/table.html#templet) 一致

同时支持子表的其他参数如：手风琴、铺满父表、弹窗展示、是否显示入口、多入口、复杂表格等等

自定义展开支持以下三种模板方式：
<img src="images/children-tpl.png" style="width: 100%" alt="三种模板方式">

### 1.展示父表当前行数据
同时配置了 手风琴风格 `collapse: true` 和 铺满父表 `childWidth: 'full'` 效果如下所示

可以通过示例右下角 **在线运行** 来在线调试各个参数
:::demo
```html
<table id="myTable" lay-filter="myTable"></table>
<script type="text/html" id="expandAll">
  <div class="detailView">
    <div class="detailTitle">{{d.title}}</div>
    <div class="detailAuthor">{{d.dynasty}}: {{d.author}}</div>
    <div class="detailContent">{{d.content}}</div>
  </div>
</script>
<style>
.detailView {
    padding: 20px;
    background-color: #F0EFE2;
    color: #0F0F0F;
    white-space: pre-line;
}
.detailTitle {
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    height: 22px;
    margin-bottom: 10px;
}
.detailAuthor {
    font-size: 12px;
    color: #65645F;
    margin-bottom: 15px;
}
.detailContent {
    
}
</style>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,page: false
        ,cols: [[
            {title: '#', width: 50, collapse: true, children: '#expandAll', childWidth: 'full'},
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

### 2.多入口 + 复杂表头 + 固定列

:::demo
```html
<table id="myTable2" ></table>
<script type="text/html" id="expandAll2">
  <div class="detailView">
    <div class="detailTitle">{{d.title}}</div>
    <div class="detailAuthor">{{d.dynasty}}: {{d.author}}</div>
    <div class="detailContent">{{d.content}}</div>
  </div>
</script>
<style>
.detailView {
    padding: 20px;
    background-color: #F0EFE2;
    color: #0F0F0F;
    white-space: pre-line;
}
.detailTitle {
    font-size: 20px;
    font-weight: 500;
    line-height: 22px;
    height: 22px;
    margin-bottom: 10px;
}
.detailAuthor {
    font-size: 12px;
    color: #65645F;
    margin-bottom: 15px;
}
.detailContent {
    
}
</style>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable2'
        ,url: 'data-1.json'
        ,page: false
        ,cols: [[
            {title: '父表信息', width: 100, rowspan: 3, fixed: 'left', children: '#expandAll2'},
            {title: '1-1', colspan: 3, align: 'center'},
            {title: '1-2', colspan: 2},
            {field: 'heat', title: '点赞数', rowspan: 3, sort:true},
        ],[
            {title: '2-1', colspan: 2},
            {field: 'author', title: '作者', rowspan: 2, width: 165},
            {title: '2-2', colspan: 2}
        ],[
            {title: '子表数据', width: 100, children:[
                {
                    title: '子表二 > 表格一'
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
                        {field: 'heat', title: '点赞数', width: 112,  filter: true, sort:true},
                        {field: 'createTime', title: '录入时间', width: 165, sort:true}
                    ]]
                    ,done: function () {
                       soulTable.render(this);
                    }
                }
            ]},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112}
        ]]
        ,excel: {filename: '复杂表头导出.xlsx'}
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::
