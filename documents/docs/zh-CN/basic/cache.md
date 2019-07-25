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
        ,cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'title', title: '诗词', width: 200, sort: true, filter: true},
            {field: 'dynasty', title: '朝代', width: 100, sort: true, filter: true},
            {field: 'author', title: '作者', width: 165, filter: true},
            {field: 'content', title: '内容', width: 123, filter: true},
            {field: 'type', title: '类型', width: 112, sort:true, filter: true},
            {field: 'heat', title: '点赞数', width: 112, sort:true},
            {field: 'createTime', title: '录入时间', width: 165, sort:true},
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


### 2. 拖动列宽记录
如果想要拖拽列宽也实现记录，重载后也不会改变，则可以通过修改源码的方式实现, `lay/modules/table.js:1374`

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
