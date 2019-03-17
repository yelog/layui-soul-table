/**
 * Created by YujieYang.
 * @name:  子表格扩展
 * @author: 杨玉杰
 */
layui.define(['table', 'tableFilter' ,'element', 'form'], function (exports) {

    var $ = layui.jquery,
        table = layui.table,
        tableFilter = layui.tableFilter,
        tableChildren={};

    // 封装方法
    var mod = {
        /**
         * 渲染入口
         * @param myTable
         */
        render: function (myTable) {
            var _this = this,
                $table = $(myTable.elem),
                tableId = $table.attr('id'),
                $tableHead = $table.next().children('.layui-table-box').children('.layui-table-header').children('table'),
                $tableBody = $table.next().children('.layui-table-box').children('.layui-table-body').children('table'),
                columns = myTable.cols[0],
                child, childIndex ;


            // 获取子表配置信息
            for (var i=0;i<columns.length;i++) {
                if (columns[i].children) {
                    child = columns[i];
                    childIndex=i;
                    break;
                }
            }
            if (child) {
                var width = child.width? child.width : 50;
                $tableHead.find('th:eq('+childIndex+')>div').css('width', width);
                $tableBody.find('tr').find('td[data-key$="'+child.key+'"]>div').attr('lay-event','childTable').css({'width': width,'cursor': 'pointer'}).html('<i style="font-weight: bolder" class="layui-icon layui-icon-right"></i>');
                // $tableBody.find('tr').find('td:eq('+childIndex+'):not([child])>div').css({'width':'50px'});

                table.on('tool('+$table.attr('lay-filter')+')', function (obj) {
                    if (obj.event === 'childTable') {

                        if (child.show == 2) { // 展开模式

                            layer.open({type: 1, title: '子表', maxmin: true ,content: _this.getTables(this, obj, child, tableId), area: '1000px'});
                            _this.renderTable(this, obj, child, tableId);


                        } else { // 弹窗模式

                            $(this).find('i').toggleClass('layui-icon-down');
                            var rowspanIndex=$(this).parents('td').attr("rowspan");

                            if ($(this).find('i').hasClass('layui-icon-down')) {
                                var newTr = [];
                                newTr.push('<tr class="noHover childTr"><td colspan="'+$tableHead.find('th:visible').length+'" style="padding: 0; width: '+$(this).parents('tr').width()+'px">');
                                newTr.push(_this.getTables(this, obj, child, tableId));

                                newTr.push('</td></tr>');

                                if(rowspanIndex){
                                    var index=parseInt($(this).parents('tr').data("index"))+parseInt(rowspanIndex)-1;
                                    $(this).parents('table').children().children("[data-index='"+index+"']").after(newTr.join(''));
                                }else{
                                    $(this).parents('tr').after(newTr.join(''));
                                }
                                _this.renderTable(this, obj, child, tableId);
                            } else {
                                if(rowspanIndex){
                                    var index=$(this).parents('tr').index()+parseInt(rowspanIndex);
                                    $(this).parents('table').children().children('tr:eq('+index+')').remove()
                                }else{
                                    $(this).parents('tr').next().remove();
                                }
                                var tables = tableChildren[tableId + $(this).parents('tr').data('index')];
                                tableFilter.destroy(tables);
                                delete tableChildren[tableId + $(this).parents('tr').data('index')]
                            }

                        }
                    }
                });

            }
        },
        /**
         * 生成子表内容
         * @param _this
         * @param obj
         * @param child
         * @param tableId
         * @returns {string}
         */
        getTables: function (_this, obj, child, tableId) {
            var tables = [];
            tables.push('<div class="layui-tab layui-tab-card" style="margin: 0;border: 0;"><ul class="layui-tab-title">');
            for (var i=0;i<child.children.length;i++) {
                tables.push('<li class="'+(i==0?'layui-this':'')+'">'+(typeof child.children[i].title === 'function' ? child.children[i].title(obj.data) :child.children[i].title)+'</li>');
            }
            tables.push('</ul><div class="layui-tab-content" style="padding-bottom: 10px;">');
            for (var i=0;i<child.children.length;i++) {
                var childTableId = tableId + $(_this).parents('tr').data('index') + i;
                tables.push('<div class="layui-tab-item layui-show"><form action="" class="layui-form" ><table id="'+childTableId+'" lay-filter="'+childTableId+'"></table></form></div>');
            }
            tables.push('</div></div>');
            return tables.join('')
        },
        /**
         * 渲染子表
         * @param _this
         * @param obj
         * @param child
         * @param tableId
         */
        renderTable: function (_this, obj, child, tableId) {
            var tables = [];
            for (var i=0;i<child.children.length;i++) {
                var param = this.cloneJSON(child.children[i]),
                    childTableId = tableId + $(_this).parents('tr').data('index') + i;
                param.where = child.children[i].where;
                param.id = childTableId;
                param.elem = '#'+childTableId;
                typeof param.where === 'function' && (param.where = param.where(obj.data));
                tables.push(table.render(param));
                if (i!=0) {
                    $('#'+childTableId).parents('.layui-tab-item').removeClass('layui-show'); //解决隐藏时计算表格高度有问题
                }
            }
            tableChildren[tableId + $(_this).parents('tr').data('index')]=tables
        },
        cloneJSON: function (obj) {
            var JSON_SERIALIZE_FIX = {
                PREFIX : "[[JSON_FUN_PREFIX_",
                SUFFIX : "_JSON_FUN_SUFFIX]]"
            };
            var sobj = JSON.stringify(obj,function(key, value){
                if(typeof value === 'function'){
                    return JSON_SERIALIZE_FIX.PREFIX+value.toString()+JSON_SERIALIZE_FIX.SUFFIX;
                }
                return value;
            });
            return JSON.parse(sobj,function(key, value){
                if(typeof value === 'string' &&
                    value.indexOf(JSON_SERIALIZE_FIX.SUFFIX)>0 && value.indexOf(JSON_SERIALIZE_FIX.PREFIX)==0){
                    return eval("("+value.replace(JSON_SERIALIZE_FIX.PREFIX,"").replace(JSON_SERIALIZE_FIX.SUFFIX,"")+")");
                }
                return value;
            })||{};
        }
    };

    // 输出
    exports('tableChild', mod);
});

