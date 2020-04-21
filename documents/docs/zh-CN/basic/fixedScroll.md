## 固定列支持滚轮滚动

### 默认开启

>**实现原理**: 放开固定列滚动条，并设置滚动条不可见。监听固定列滚动事件，同步非固定列位置   

:::demo
```html
<table id="myTable" ></table>
<script>
layui.use(['form', 'table','soulTable'], function () {
    var table = layui.table,
        soulTable = layui.soulTable;

    table.render({
        elem: '#myTable'
        ,url: 'data.json'
        ,toolbar: true
        ,height: 500
        ,totalRow: true
        ,cols: [[
            {type: 'radio', title: '##', fixed: 'left'},
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
>**优化**：由于主表区域滚动会同步固定列，所以会递归调用，不至于死循环，但是会引起固定列滚动卡卡的效果，可以通过修改 `table.js` 源码来优化这个问题

你可以在 layui 的 `table.js` 中找到如下代码
```js
//同步滚动条
that.layMain.on('scroll', function(){
  var othis = $(this)
  ,scrollLeft = othis.scrollLeft()
  ,scrollTop = othis.scrollTop();

  that.layHeader.scrollLeft(scrollLeft);
  that.layTotal.scrollLeft(scrollLeft);
  that.layFixed.find(ELEM_BODY).scrollTop(scrollTop);

  layer.close(that.tipsIndex);
});
```
然后把这一行 `that.layFixed.find(ELEM_BODY).scrollTop(scrollTop);`   
改为`that.layFixed.find(ELEM_BODY+':not(.soul-fixed-scroll)').scrollTop(scrollTop);`  
修改后如下
```js
//同步滚动条
that.layMain.on('scroll', function(){
  var othis = $(this)
  ,scrollLeft = othis.scrollLeft()
  ,scrollTop = othis.scrollTop();

  that.layHeader.scrollLeft(scrollLeft);
  that.layTotal.scrollLeft(scrollLeft);
  that.layFixed.find(ELEM_BODY+':not(.soul-fixed-scroll)').scrollTop(scrollTop);

  layer.close(that.tipsIndex);
});
```