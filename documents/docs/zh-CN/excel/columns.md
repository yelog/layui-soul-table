## 指定列导出

按照指定的列进行导出  
`columns: Array`   
可配置在方法/表格中  

### 效果
可以通过配置 `columns: ['title', 'author', 'createTime']` 指定导出这三列（无视拖动顺序及隐藏）

:::demo 
```html
<button class="layui-btn" id="export"><i class="layui-icon layui-icon-download-circle"></i>导出</button>
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    var myTable = table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,height: 500
        ,page: false
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true, 
              excel: {color:'FFFFFF',bgColor:'5FB878'} // 导出excel显示样式
            },
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true, excel: function(row) {
               // row 为当前行数据
               return {
                   color: row.dynasty === '唐代' ? 'FFFFFF' : '000000', // 唐代显示为黄色
                   bgColor: row.dynasty === '唐代' ? '01AAED' : 'FFFFFF', // 唐代显示为浅蓝色底色
               }
            }},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true, excel:{cellType: 'n'}},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right',excel: {cellType: 'd'}},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
    
    layui.$('#export').on('click', function() {
      soulTable.export(myTable, {
          filename: '指定列导出.xlsx',
          columns: ['title', 'author', 'createTime']
      });
    })
})
</script>
```
:::
