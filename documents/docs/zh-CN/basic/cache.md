## 记忆功能 - 由于会占用浏览器资源，**大型项目不建议开启**
将table配置写入浏览器缓存（`localStorage`），用于下次访问（刷新页面）后，仍可以保留上次的更改
### 1. 配置开启
配置 `filter.cache = true` 开启，并在下拉菜单（`filter.items`） 中配置 清除缓存（`clearCache`）功能  

如下，当**拖动列顺序**、**隐藏列**操作后，刷新页面，将会保留操作后的影响，通过 **下拉菜单>清除缓存** 恢复

:::demo
```html
<a class="layui-btn" id="reload" >重载</a>
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,height: 500
        ,toolbar: true
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165, filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112, sort:true, filter: true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', sort:true},
        ]]
        ,filter: {
            items:['column','data','condition','editCondition','excel','clearCache'] // 加入了清除缓存按钮
            ,cache: true 
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
    $('#reload').on('click', function() {
        table.reload('myTable')
    })
})
</script>
```
:::


### 2. 拖动列宽 记忆开启
如果想要拖拽列宽也实现`记忆`，重载和刷新浏览器也不会恢复，则可以通过修改源码的方式实现, `lay/modules/table.js:1403`

添加一行 `if (layui.soulTable) { layui.soulTable.fixTableRemember(that.config, dict)}`, 上下文如下

```js
//拖拽中
_DOC.on('mousemove', function(e){
  if(dict.resizeStart){
    if (layui.soulTable) { layui.soulTable.fixTableRemember(that.config, dict)} //这是要添加的那一行
    e.preventDefault();
    if(dict.rule){
      var setWidth = dict.ruleWidth + e.clientX - dict.offset[0];
      if(setWidth < dict.minWidth) setWidth = dict.minWidth;
      dict.rule.style.width = setWidth + 'px';
      layer.close(that.tipsIndex);
    }
    resizing = 1
  }
})
```

### 3.工具栏列显示隐藏 记忆开启
如果要实现工具栏实现 `记忆` , 重载和刷新浏览器也不会恢复，也可通过修改源码的方式实现， `lay/modules/table.js`

添加一行（同上） `if (layui.soulTable) { layui.soulTable.fixTableRemember(that.config, dict)}`, 上下文如下

```js
form.on('checkbox(LAY_TABLE_TOOL_COLS)', function(obj){
    var othis = $(obj.elem)
    ,checked = this.checked
    ,key = othis.data('key')
    ,parentKey = othis.data('parentkey');

    layui.each(options.cols, function(i1, item1){
      layui.each(item1, function(i2, item2){
        if(i1+ '-'+ i2 === key){
          var hide = item2.hide;

          //同步勾选列的 hide 值和隐藏样式
          item2.hide = !checked;
          that.elem.find('*[data-key="'+ options.index +'-'+ key +'"]')
          [checked ? 'removeClass' : 'addClass'](HIDE);

          //根据列的显示隐藏，同步多级表头的父级相关属性值
          if(hide != item2.hide){
            that.setParentCol(!checked, parentKey);
          }

          //重新适配尺寸
          that.resize();
        }
      });
    });
    if (layui.soulTable) { layui.soulTable.fixTableRemember(that.config, dict)}   //这是要添加的那一行
});
```


