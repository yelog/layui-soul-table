## 包含表单元素的导出

### 效果 - 导出为修改后的结果

:::demo
```html
<button class="layui-btn" id="export"><i class="layui-icon layui-icon-download-circle"></i>导出</button>
<button class="layui-btn layui-btn-normal" id="export2"><i class="layui-icon layui-icon-download-circle"></i>导出勾选数据</button>
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    var myTable = table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词(input)', width: 200, sort: true, templet: function(row) {
                return '<input class="layui-input" style="height:28px" value=' + row.title + ' />'
            }},
            {field: 'dynasty', title: '朝代(select)', width: 150, sort: true, templet: function(row) {
                return '<select lay-ignore>' +
                 '<option value="">请选择</option>' +
                 '<option ' + (row.dynasty === '清代' ? 'selected' : '') + '>清代</option>' +
                 '<option ' + (row.dynasty === '宋代' ? 'selected' : '') + '>宋代</option>' +
                 '<option ' + (row.dynasty === '唐代' ? 'selected' : '') + '>唐代</option>' +
                 '<option ' + (row.dynasty === '五代' ? 'selected' : '') + '>五代</option>' +
                 '<option ' + (row.dynasty === '明代' ? 'selected' : '') + '>明代</option>' +
                 '<option ' + (row.dynasty === '元代' ? 'selected' : '') + '>元代</option>' +
                  '</select>'
            }},
            {field: 'author', title: '作者(可编辑列)', edit: 'text', width: 165, sort: true},
            {field: 'content', title: '内容', width: 123, sort: true},
            {field: 'type', title: '类型', width: 112, sort: true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    $('#export').on('click', function() {
      soulTable.export(myTable, {
          filename: '包含表单元素.xlsx' 
      });
    })
    $('#export2').on('click', function() {
      if (table.checkStatus('myTable2').data.length > 0) {
        soulTable.export(myTable, {
            filename: '包含表单元素.xlsx',
            checked: true
        });
      } else {
          layer.msg('勾选数据不能为空！');
      }
      
    })
})
</script>
```
:::
