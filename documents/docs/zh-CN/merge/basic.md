## 列自动合并
<table class='el-table el-table--border'>
    <thead>
    <tr>
        <th>属性名</th>
        <th>属性值</th>
        <th>例子</th>
        <th>描述</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td rowspan="3">merge</td>
        <td>boolean</td>
        <td>merge: true</td>
        <td>开启合并，并根据 当前列 相同值 自动合并</td>
    </tr>
    <tr>
        <td>string</td>
        <td>merge: 'name'</td>
        <td>开启合并，并根据 指定列 相同值 自动合并</td>
    </tr>
    <tr>
        <td>array</td>
        <td>merge: ['name', 'type']</td>
        <td>开启合并，并先根据 name值 分组后，再以 type值 相同的合并对应行<br>注：数组无数量限制</td>
    </tr>
    </tbody>
</table>

### 效果
:::demo
```html
<table id="mergeTable"></table>
<script>
layui.use(['table','element','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    /**
     * 自动合并表格
     */
    table.render({
        elem: '#mergeTable'
        ,height: 550
        ,url: 'merge.json'
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'poetry', title:'诗词', width:188, fixed: 'left'}
            ,{field:'name', merge: true, title:'诗人', width:100, fixed: 'left'}              // 根据 当前列 相同值 的自动合并
            ,{field:'type', merge: ['name','type'], title:'类型', width:100, fixed: 'left'}   // 根据 name 分组后，再以 type值 相同的合并对应行
            ,{field:'type', merge: true, title:'类型', width:100}                             // 根据 当前列 相同值 的自动合并
            ,{field:'dynasty', title:'朝代', merge: ['name', 'type'], width:150}              // 根据 name 分组后，再以 type值 相同的自动合并
            ,{field:'dynasty', title:'朝代', merge: 'name', width:150}                        // 根据 name值 相同的自动合并
            ,{field:'dynasty', title:'朝代', merge: true, width:150}                          // 根据 当前列 相同值 的自动合并
            ,{field:'sentences', title:'名句', width:400}
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    })

})
</script>

```
:::

### 合并后的单元格多行显示
:::demo
```html
<table id="mergeTable2"></table>
<script>
layui.use(['table','element','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    /**
     * 自动合并表格
     */
    table.render({
        elem: '#mergeTable2'
        ,height: 550
        ,url: 'merge.json'
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'poetry', title:'诗词', width:188, fixed: 'left'}
            ,{field:'name', merge: true, title:'诗人', width:100, fixed: 'left'}        
            ,{field:'sentences', title:'名句',  merge: ['name', 'type'], width:150}// 根据 当前列 相同值 的自动合并
            ,{field:'type', merge: ['name','type'], title:'类型', width:100}   // 根据 name 分组后，再以 type值 相同的合并对应行
            ,{field:'dynasty', title:'朝代', merge: true}                          // 根据 当前列 相同值 的自动合并
            
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    })

})
</script>

```
:::
