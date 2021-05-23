## 调用方法导出

### API
除了可以通过框架导出之外，你也可以通过调用 `export` 方法进行自定义导出。
```js
var myTable = table.render({id:'myTable'}); // 渲染表格

// 导出 excel
soulTable.export(myTable)
// 或者tableId也行
soulTable.export('myTable')

// 或者你也可以自定义文件名及样式
soulTable.export(myTable, {
   checked: true, // 导出当前勾选数据数据
   data: [], // 指定数据导出
   filename: '诗词.xlsx', // 文件名
   head:{ // 表头样式
       family: 'Calibri', // 字体
       size: 12, // 字号
       color: '000000', // 字体颜色
       bgColor: 'C7C7C7' // 背景颜色
   },
   font: { // 正文样式
       family: 'Calibri', // 字体
       size: 12, // 字号
       color: '000000', // 字体颜色
       bgColor: 'FFFFFF' //背景颜色
   } 
});
```
### 前台分页情况下
:::demo 通过列的 `excel` 进行设置
```html
<table id="myTable" lay-filter="myTable" ></table>
<script type="text/html" id="myToolbar">
    <button class="layui-btn layui-btn-primary layui-btn-sm" lay-event="export">
        <i class="layui-icon layui-icon-download-circle"></i>导出所有页数据
    </button>
    <button class="layui-btn layui-btn-primary layui-btn-sm" lay-event="exportOnePage">
        <i class="layui-icon layui-icon-download-circle"></i>导出当前页数据
    </button>
    <button class="layui-btn layui-btn-normal layui-btn-sm" lay-event="export2">
        <i class="layui-icon layui-icon-download-circle"></i>导出勾选数据
    </button>
    <button class="layui-btn layui-btn-sm" lay-event="export3">
        <i class="layui-icon layui-icon-download-circle"></i>导出自定义数据
    </button>
</script>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    var myTable = table.render({
        elem: '#myTable'
        ,height: 500
        ,page: true
        ,toolbar: '#myToolbar'
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, 
              excel: {color:'FFFFFF',bgColor:'5FB878'} // 导出excel显示样式
            },
            {field: 'dynasty', title: '朝代', width: 100, sort: true, excel: function(row) {
               // row 为当前行数据
               return {
                   color: row.dynasty === '唐代' ? 'FFFFFF' : '000000', // 唐代显示为黄色
                   bgColor: row.dynasty === '唐代' ? '01AAED' : 'FFFFFF', // 唐代显示为浅蓝色底色
               }
            }},
            {field: 'author', title: '作者', width: 165, templet: function(row) {
              return row.author + '_'
            } },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', width: 112, fixed: 'right', sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right',excel: {cellType: 'd'}},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    search();
    function search() {
        var loading = layer.load(2);
        $.ajax({
            url: 'data.json',
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

    table.on('toolbar(myTable)', function(obj) {
      switch (obj.event) {
        case 'reload': search(); break;
        case 'export': 
            soulTable.export(myTable, {
                filename: '手动导出.xlsx' 
            });
            break;
        case 'exportOnePage': 
            soulTable.export(myTable, {
                filename: '手动导出.xlsx',
                curPage: true
            });
            break;
        case 'export2':
            if (table.checkStatus('myTable').data.length > 0) {
              soulTable.export(myTable, {
                  filename: '勾选数据.xlsx',
                  checked: true // 只导出勾选数据
              });
            } else {
                layer.msg('勾选数据不能为空！');
            }
            break;
        case 'export3':
            soulTable.export(myTable, {
                filename: '自定义数据.xlsx',
                data: [{
                 "title": "如梦令·黄叶青苔归路",
                 "dynasty": "清代",
                 "author": "纳兰性德",
                 "content": "黄叶青苔归路，屧粉衣香何处。消息竟沉沉，今夜相思几许。秋雨，秋雨，一半因风吹去。(版本一)木叶纷纷归路，残月晓风何处。消息竟沉沉，今夜相思几许。秋雨，秋雨，一半因风吹去。(版本二)",
                 "type": "写雨,抒情,思念,愁绪",
                 "heat": 28,
                 "createTime": "2019-03-16 01:35:41"
               }]
            });
            break;
      }
    })
})
</script>
```
:::
