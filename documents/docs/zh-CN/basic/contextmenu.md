## 右键菜单

```js
contextmenu: {
    // 表头右键菜单配置
    // header: [] 菜单列表
    // header: false 禁用浏览器默认菜单
    header: [
        {
            name: '名字', // 显示的菜单名
            icon: 'layui-icon layui-icon-theme', // 显示图标
            click: function(obj) { //点击事件
                console.log(obj.elem) // 右键的单元格(td/th) DOM对象
                console.log(obj.trElem) // 右击的行(tr) DOM对象，兼容固定列
                console.log(obj.text) // 当前单元格的内容(渲染后)
                console.log(obj.field) // 当前列的 field
            
                // body 的 click 独有
                console.log(obj.row) // 当前行数据 {id:1,author:'阁主'....}
                obj.del() // 删除当前行数据
                obj.update({author: obj.row.author + '+1'}) // 更新当前行数据
            },
            children: [
                // 子菜单，配置同父菜单，无限层级
            ]
        }
    ],
   // 表格内容右键菜单配置
    body: [
        // 参考 header
    ],
    // 合计栏右键菜单配置
    total: [
        // 参考 header
    ]
}
```

### 1.全表效果

下面的头部、body、合计栏都设置了右击呼出菜单的功能，可以尝试鼠标右击下面表格区域

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
        ,toolbar: true
        ,height: 500
        ,totalRow: true
        ,contextmenu: {
            // 表头右键菜单配置
            header: [
                {
                    name: '复制',
                    icon: 'layui-icon layui-icon-template',
                    click: function(obj) {
                        soulTable.copy(obj.text)
                        layer.msg('复制成功！') 
                    }
                },
                {
                    name: '导出excel',
                    click: function() {
                      soulTable.export(this.id)
                    }
                },
                {
                    name: '重载表格',
                    icon: 'layui-icon layui-icon-refresh-1',
                    click: function() {
                        table.reload(this.id)
                    }
                },
                {
                    name: '字体颜色',
                    icon: 'layui-icon layui-icon-theme',
                    children: [
                        {
                             name: '红色',
                             children: [
                                 {
                                    name: '大红色',
                                    click: function(obj) {
                                      obj.elem.css('color', 'red')
                                    }
                                 },
                                 {
                                    name: '粉红色',
                                    click: function(obj) {
                                      obj.elem.css('color', 'pink')
                                    }
                                 },
                             ]
                        },
                        {
                             name: '绿色',
                             click: function(obj) {
                               obj.elem.css('color', '#009688')
                             }
                         }
                     ] 
                }
                ,
                {
                    name: '背景色',
                    icon: 'layui-icon layui-icon-theme',
                    children: [
                        {
                             name: '蓝色',
                             click: function(obj) {
                                obj.elem.css('background', '#01AAED')
                             }
                        },
                        {
                             name: '黄色',
                             click: function(obj) {
                               obj.elem.css('background', '#FFB800')
                             }
                         }
                     ] 
                }
            ],
            // 表格内容右键菜单配置
            body: [
                {
                   name: '复制',
                   icon: 'layui-icon layui-icon-template',
                   click: function(obj) {
                       soulTable.copy(obj.text)
                       layer.msg('复制成功！') 
                   }
                },
                {
                    name: '删除当前行数据',
                    click: function(obj) {
                        obj.del() 
                    }
                },
                {
                    name: '更新数据',
                    click: function(obj) {
                        obj.update({author: obj.row.author + '+1'})
                    }
                },
                {
                    name: '行-蓝色',
                    click: function(obj) {
                        obj.trElem.css('background', '#01AAED')
                    }
                },
                {
                    name: '红色',
                    click: function(obj) {
                      obj.elem.css('color', 'red')
                    }
                }
            ],
            // 合计栏右键菜单配置
            total: [
                {
                    name: '背景黄色',
                    click: function(obj) {
                      obj.elem.css('background', '#FFB800')
                    }
                }
            ] 
        }
        ,cols: [[
            {type: 'checkbox', title: '##', fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'author', title: '作者', width: 165 },
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 75, fixed: 'right', totalRow: true},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::

### 2.单独一列设置
在 `cols` 中 配置 `contextmenu` 

如下，禁用了其他单元格的右键事件，只启用 `作者` 这一列的右击事件
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
        ,toolbar: true
        ,height: 500
        ,totalRow: true
        ,contextmenu: {
            header: false, // false 禁用右键（组织浏览器的右键菜单）
            body: false,
            total: false
        }
        ,cols: [[
            {type: 'checkbox', title: '##', fixed: 'left'},
            {field: 'title', title: '诗词', width: 100, fixed: 'left', totalRowText: '合计'},
            {field: 'dynasty', title: '朝代', width: 100},
            {field: 'author', title: '作者-此列右键事件', width: 165 , contextmenu: {
               // 表头右键菜单配置
               header: [
                   {
                       name: '复制',
                       icon: 'layui-icon layui-icon-template',
                       click: function(obj) {
                           soulTable.copy(obj.text)
                           layer.msg('复制成功！') 
                       }
                   },
                   {
                       name: '导出excel',
                       click: function() {
                         soulTable.export(this.id)
                       }
                   },
                   {
                       name: '重载表格',
                       icon: 'layui-icon layui-icon-refresh-1',
                       click: function() {
                           table.reload(this.id)
                       }
                   },
                   {
                       name: '字体颜色',
                       icon: 'layui-icon layui-icon-theme',
                       children: [
                           {
                                name: '红色',
                                children: [
                                    {
                                       name: '大红色',
                                       click: function(obj) {
                                         obj.elem.css('color', 'red')
                                       }
                                    },
                                    {
                                       name: '粉红色',
                                       click: function(obj) {
                                         obj.elem.css('color', 'pink')
                                       }
                                    },
                                ]
                           },
                           {
                                name: '绿色',
                                click: function(obj) {
                                  obj.elem.css('color', '#009688')
                                }
                            }
                        ] 
                   }
                   ,
                   {
                       name: '背景色',
                       icon: 'layui-icon layui-icon-theme',
                       children: [
                           {
                                name: '蓝色',
                                click: function(obj) {
                                   obj.elem.css('background', '#01AAED')
                                }
                           },
                           {
                                name: '黄色',
                                click: function(obj) {
                                  obj.elem.css('background', '#FFB800')
                                }
                            }
                        ] 
                   }
               ],
               // 表格内容右键菜单配置
               body: [
                   {
                       name: '删除当前行数据',
                       click: function(obj) {
                           obj.del() 
                       }
                   },
                   {
                       name: '更新数据',
                       click: function(obj) {
                           obj.update({author: obj.row.author + '+1'})
                       }
                   },
                   {
                       name: '行-蓝色',
                       click: function(obj) {
                           obj.trElem.css('background', '#01AAED')
                       }
                   },
                   {
                       name: '红色',
                       click: function(obj) {
                         obj.elem.css('color', 'red')
                       }
                   }
               ],
                // 合计栏右键菜单配置
                total: [
                    {
                        name: '背景黄色',
                        click: function(obj) {
                          obj.elem.css('background', '#FFB800')
                        }
                    }
                ] 
            }},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112},
            {field: 'heat', title: '点赞数', width: 75, fixed: 'right', totalRow: true},
            {field: 'createTime', title: '录入时间', fixed: 'right', width: 165},
        ]]
        ,done: function () {
            soulTable.render(this)
        }
    });
})
</script>
```
:::
