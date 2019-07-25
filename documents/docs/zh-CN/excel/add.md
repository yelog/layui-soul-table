## 添加自定义内容

### 添加表头、表尾

:::demo 通过 `filter: true` 开启筛选
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
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165 , filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112,  filter: {split:','}, sort:true},
            {field: 'heat', title: '点赞数', width: 112,  filter: true, fixed: 'right', sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right'},
        ]]
        ,excel: {
            filename: '添加自定义内容.xlsx',
            add: {
                top: {
                    data: [
                        ['表头1-1'], //头部第一行数据，由于我设置了后面的数据merge了，就只写一个
                        ['表头2-1', '','','表头2-2'] // 头部第二行数据, 中间的空数据是为了 merge 使用
                    ],
                    heights: [100,50],
                    merge: [['1,1','1,7'],['2,1','2,3'], ['2,4','2,7']]
                },
                bottom: {
                    data: [
                        ['表尾1-1', '','','表尾1-2'], // 尾部第一行数据, 中间的空数据是为了 merge 使用
                        ['表尾2-1'] //尾部第二行数据，由于我设置了后面的数据merge了，就只写一个
                    ],
                    heights: [50,100],
                    merge: [['2,1','2,7'],['1,1','1,3'], ['1,4','1,7']]
                }
            }
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### API
<table class='el-table el-table--border'>
    <thead>
    <tr>
        <th>参数</th>
        <th>类型</th>
        <th>说明</th>
        <th>示例</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td rowspan="3">top/bottom</td>
        <td>data</td>
        <td> 二维数组，代表多行数据 [[第一行数据], [第二行数据]]</td>
        <td>[['第一列','第二列','第三列'], ['第一列','第二列','第三列']]</td>
    </tr>
    <tr>
        <td>heights</td>
        <td>一维数组，上述 data 对应数据的行高，和data的length相同 [第一行高度, 第二行高度]</td>
        <td>[100,50]</td>
    </tr>
    <tr>
        <td>merge</td>
        <td>二维数组，上述 data 进行合并，坐标为data数据的坐标, <br>['1,1','1,7'] 就代表 从 第1行第1个 到 第1行第7个 进行单元格合并 </td>
        <td>[['1,1','1,7'],['2,1','2,3'], ['2,4','2,7']]</td>
    </tr>
    </tbody>
</table>
