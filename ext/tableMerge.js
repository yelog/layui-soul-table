/**
 * Created by YujieYang.
 * @name:  子表格扩展
 * @author: 杨玉杰
 * @version 1.0
 */
layui.define(['table'], function (exports) {

    var $ = layui.jquery;

    // 封装方法
    var mod = {
        /**
         * 渲染入口
         * @param myTable
         */
        render: function (myTable) {
            var tableBox = $(myTable.elem).next().children('.layui-table-box'),
                $main = $(tableBox.children('.layui-table-body').children('table').children('tbody').children('tr').toArray().reverse()),
                $fixLeft = $(tableBox.children('.layui-table-fixed-l').children('.layui-table-body').children('table').children('tbody').children('tr').toArray().reverse()),
                $fixRight = $(tableBox.children('.layui-table-fixed-r').children('.layui-table-body').children('table').children('tbody').children('tr').toArray().reverse()),
                cols = myTable.cols[0], mergeRecord = {};

            for (let i = 0; i < cols.length; i++) {
                var item3 = cols[i], field=item3.field;
                if (item3.merge) {
                    var mergeField = [field];
                    if (item3.merge !== true) {
                        if (typeof item3.merge == 'string') {
                            mergeField = [item3.merge]
                        } else {
                            mergeField = item3.merge
                        }
                    }
                    mergeRecord[i] = {mergeField: mergeField, rowspan:1}
                }
            }

            $main.each(function (i) {

                for (var item in mergeRecord) {
                    if (i==$main.length-1 || isMaster(i, item)) {
                        $(this).children('[data-key$="-'+item+'"]').attr('rowspan', mergeRecord[item].rowspan).css('position','static');
                        $fixLeft.eq(i).children('[data-key$="-'+item+'"]').attr('rowspan', mergeRecord[item].rowspan).css('position','static');
                        $fixRight.eq(i).children('[data-key$="-'+item+'"]').attr('rowspan', mergeRecord[item].rowspan).css('position','static');
                        mergeRecord[item].rowspan = 1;
                    } else {
                        $(this).children('[data-key$="-'+item+'"]').remove();
                        $fixLeft.eq(i).children('[data-key$="-'+item+'"]').remove();
                        $fixRight.eq(i).children('[data-key$="-'+item+'"]').remove();
                        mergeRecord[item].rowspan +=1;
                    }
                }
            })

            function isMaster (index, item) {
                var mergeField = mergeRecord[item].mergeField;
                var dataLength = layui.table.cache[myTable.id].length;
                for (var i=0; i<mergeField.length; i++) {

                    if (layui.table.cache[myTable.id][dataLength-2-index][mergeField[i]]
                        !== layui.table.cache[myTable.id][dataLength-1-index][mergeField[i]]) {
                        return true;
                    }
                }
                return false;
            }

        }
    };

    // 输出
    exports('tableMerge', mod);
});

