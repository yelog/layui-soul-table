## 记忆功能 - 由于会占用浏览器资源，**大型项目不建议开启**
将table配置写入浏览器缓存（`localStorage`），用于下次访问（刷新页面）后，仍可以保留上次的更改
### 1. 配置开启
配置 `filter.cache = true` 开启，并在下拉菜单（`filter.items`） 中配置 清除缓存（`clearCache`）功能  

如下，当**拖动列顺序**、**隐藏列**操作后，刷新页面，将会保留操作后的影响，通过 `soulTable.clearCache(tableId)` 进行还原

:::demo
```html
<a class="layui-btn layui-btn-sm" id="reload" ><i class="layui-icon layui-icon-refresh"></i>重载</a>
<a class="layui-btn layui-btn-sm layui-btn-normal" id="clear" ><i class="layui-icon layui-icon-delete"></i>清除缓存</a>
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable,
        $ = layui.$;

    var myTable = table.render({
        elem: '#myTable'
        ,url: 'data-1.json'
        ,height: 400
        ,toolbar: true
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', fixed: 'left', filter: true, width: 200, sort: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true},
            {field: 'author', title: '作者', width: 165},
            {field: 'content', title: '内容', width: 123},
            {field: 'type', title: '类型', width: 112, sort:true},
            {field: 'heat', title: '点赞数', fixed: 'right', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, fixed: 'right', sort:true},
        ]]
        ,filter: {
            items:['column','data','condition','editCondition','excel','clearCache'],
            cache: true
        }
        ,done: function () {
            soulTable.render(this)
        }
    });
    $('#reload').on('click', function() {
        table.reload('myTable')
    })
    $('#clear').on('click', function() {
        soulTable.clearCache(myTable.config.id)
        layer.msg('已还原！', {icon: 1, time: 1000})
    })
})
</script>
```
:::


### 2. 拖动列宽 记忆开启
如果想要拖拽列宽也实现`记忆`，重载和刷新浏览器也不会恢复，则可以通过修改源码的方式实现, 在 `lay/modules/table.js` 中找到如下代码，添加一行 `if (layui.soulTable) { layui.soulTable.fixTableRemember(that.config, dict)}`, 上下文如下

```js
on('mouseup', function(e){
  if(thisTable.eventMoveElem){
    var th = thisTable.eventMoveElem; // 当前触发拖拽的 th 元素
    var id = th.closest('.' + ELEM_VIEW).attr('lay-id');
    var thatTable = getThisTable(id);

    if(!thatTable) return;

    var key = th.data('key');
    var col = thatTable.col(key);
    var filter = thatTable.config.elem.attr('lay-filter');

    // 重置过度信息
    dict = {};
    _BODY.css('cursor', '');
    thatTable.scrollPatch();

    // 清除当前拖拽信息
    th.removeData(DATA_MOVE_NAME);
    delete thisTable.eventMoveElem;

    // 列拖拽宽度后的事件
    thatTable.getCssRule(key, function(item){
      col.width = parseFloat(item.style.width);
      layui.event.call(th[0], MOD_NAME, 'colResized('+ filter +')', {
        col: col,
        config: thatTable.config
      });
    });
    if (layui.soulTable) { layui.soulTable.fixTableRemember(thatTable.config, dict) } //这是要添加的那一行
  }
});
;
```

### 3.工具栏列显示隐藏 记忆开启
如果要实现工具栏实现 `记忆` , 重载和刷新浏览器也不会恢复，也可通过修改源码的方式实现， `lay/modules/table.js`

添加一行（同上） `if (layui.soulTable) { layui.soulTable.fixTableRemember(that.config, dict)}`, 上下文如下

```js
form.on('checkbox(LAY_TABLE_TOOL_COLS)', function(obj){
  var othis = $(obj.elem);
  var checked = this.checked;
  var key = othis.data('key');
  var col = that.col(key);
  var hide = col.hide;
  var parentKey = othis.data('parentkey');

  if(!col.key) return;

  // 同步勾选列的 hide 值和隐藏样式
  col.hide = !checked;
  that.elem.find('*[data-key="'+ key +'"]')[
    checked ? 'removeClass' : 'addClass'
    ](HIDE);

  // 根据列的显示隐藏，同步多级表头的父级相关属性值
  if(hide != col.hide){
    that.setParentCol(!checked, parentKey);
  }

  // 重新适配尺寸
  that.resize();

  // 列筛选（显示或隐藏）后的事件
  layui.event.call(this, MOD_NAME, 'colToggled('+ filter +')', {
    col: col,
    config: options
  });
  if (layui.soulTable) { layui.soulTable.fixTableRemember(that.config, dict)}
});
```


