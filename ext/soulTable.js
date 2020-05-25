/**
 *
 * @name:  表格增强插件
 * @author: yelog
 * @link: https://github.com/yelog/layui-soul-table
 * @license: MIT
 * @version: v1.5.11
 */
layui.define(['table', 'tableFilter', 'tableChild', 'tableMerge'], function (exports) {

    var tableFilter = layui.tableFilter,
        tableChild = layui.tableChild,
        tableMerge = layui.tableMerge,
        $ = layui.$,
        table = layui.table,
        HIDE = 'layui-hide',
        tables = {},
        isFirst = true; // 第一次加载表格

    // 封装方法
    var mod = {
        render: function (myTable) {
            tables[myTable.id] = myTable
            var curTableSession = localStorage.getItem(location.pathname + location.hash + myTable.id);

            if (myTable.filter && myTable.filter.cache && isFirst && curTableSession) {
               myTable.cols = this.deepParse(curTableSession);
               isFirst = false;
               table.reload(myTable.id, myTable)
            } else {
                tableFilter.render(myTable);
                tableChild.render(myTable);
                tableMerge.render(myTable);

                // 修复合计栏固定列问题
                if (myTable.fixTotal) {
                    this.fixTotal(myTable)
                }
                if (typeof myTable.drag === 'undefined' || myTable.drag) {
                    this.drag(myTable);
                }
                if (myTable.rowDrag) {
                    this.rowDrag(myTable)
                }
                if (typeof myTable.autoColumnWidth === 'undefined' || myTable.autoColumnWidth) {
                    this.autoColumnWidth(myTable)
                }

                this.contextmenu(myTable);

                if (typeof myTable.fixResize === 'undefined' || myTable.fixResize) {
                    this.fixResizeRightFixed(myTable);
                }

                if (myTable.overflow) {
                    this.overflow(myTable);
                }

                this.fixFixedScroll(myTable);
            }

        }
        /**
         * excel表格导出
         * @param myTable
         * @param curExcel
         */
        , export: function (myTable, curExcel) {
            tableFilter.export(myTable.config||myTable, curExcel);
        }
        ,getCssRule: function(that, key, callback){
            var style = that.elem.next().find('style')[0]
                ,sheet = style.sheet || style.styleSheet || {}
                ,rules = sheet.cssRules || sheet.rules;
            layui.each(rules, function(i, item){
                if(item.selectorText === ('.laytable-cell-'+ key)){
                    return callback(item), true;
                }
            });
        }
        , autoColumnWidth: function (myTable) {
            var _this = this;
            if (typeof myTable === 'object') {
                innerColumnWidth(_this, myTable)
            } else if (typeof myTable === 'string') {
                innerColumnWidth(_this, tables[myTable])
            } else if (typeof myTable === 'undefined'){
                layui.each(tables, function(){
                    innerColumnWidth(_this, this)
                });
            }
            function innerColumnWidth(_this, myTable) {
                var $table = $(myTable.elem),
                    th = $table.next().children('.layui-table-box').children('.layui-table-header').children('table').children('thead').children('tr').children('th'),
                    fixTh = $table.next().children('.layui-table-box').children('.layui-table-fixed').children('.layui-table-header').children('table').children('thead').children('tr').children('th'),
                    $tableBodytr = $table.next().children('.layui-table-box').children('.layui-table-body').children('table').children('tbody').children('tr');
                String.prototype.width = function(font) {
                    var f = font || $('body').css('font'),
                        o = $('<div>' + this + '</div>')
                            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
                            .appendTo($('body')),
                        w = o.width();

                    o.remove();
                    return w;
                }
                if (typeof myTable.autoColumnWidth === 'undefined' || typeof myTable.autoColumnWidth.dblclick === 'undefined' || myTable.autoColumnWidth.dblclick) {
                    th.add(fixTh).on('dblclick', function(e){
                        var othis = $(this),
                            pLeft = e.clientX - othis.offset().left;
                        handleColumnWidth(myTable, othis,  othis.parents('.layui-table-fixed-r').length>0 ? pLeft<=10 : othis.width() - pLeft<=10);
                    })
                }
                // 初始化表格后，自动调整所有列宽
                if (myTable.autoColumnWidth && myTable.autoColumnWidth.init) {
                    th.add(fixTh).each(function (e) {
                        var colKey = $(this).attr('data-key').split('-')
                        if (myTable.cols[colKey[1]][colKey[2]].autoWidth !== false && (!Array.isArray(myTable.autoColumnWidth.init) || myTable.autoColumnWidth.init.indexOf($(this).attr('data-field')) !== -1)) {
                            handleColumnWidth(myTable, $(this), true);
                        }
                    })
                }
                function handleColumnWidth(myTable, othis, isHandle) {
                    var field = othis.data('field')
                        ,key = othis.data('key')
                    if(othis.attr('colspan') > 1){
                        return;
                    }
                    if (isHandle) {
                        var maxWidth = othis.text().width(othis.css('font'))+21, font = othis.css('font');
                        $tableBodytr.children('td[data-field="'+field+'"]').each(function (index, elem) {
                            var curWidth = 0
                            if ($(this).children().children() && $(this).children().children().length > 0) {
                                curWidth += $(this).children().html().width(font)
                            } else {
                                curWidth = $(this).text().width(font);
                            }

                            // var curWidth = $(this).text().width(font);
                            if ( maxWidth <curWidth) {
                                maxWidth = curWidth
                            }
                        })

                        maxWidth +=32;

                        _this.getCssRule(myTable, key, function(item){
                            item.style.width = maxWidth+'px'
                        });
                        for (var i = 0; i < myTable.cols.length; i++) {
                            for (var j = 0; j < myTable.cols[i].length; j++) {
                                if (myTable.cols[i][j].field === field) {
                                    myTable.cols[i][j].width = maxWidth;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        /**
         * 左右拖拽调整列顺序、向上拖隐藏列
         * @param myTable
         */
        , drag: function (myTable) {
            if (myTable.cols.length>1) {
                // 如果是复杂表头，则自动禁用拖动效果
                return;
            }
            var _this = this,
                $table = $(myTable.elem),
                $tableBox = $table.next().children('.layui-table-box'),
                $tableHead = $.merge($tableBox.children('.layui-table-header').children('table'),$tableBox.children('.layui-table-fixed').children('.layui-table-header').children('table')),
                $fixedBody = $tableBox.children('.layui-table-fixed').children('.layui-table-body').children('table'),
                $noFixedBody = $tableBox.children('.layui-table-body').children('table'),
                $tableBody = $.merge($tableBox.children('.layui-table-body').children('table'), $fixedBody),
                $totalTable = $table.next().children('.layui-table-total').children('table'),
                $fixedTotalTable = $table.next().children('.layui-table-total').children('table.layui-table-total-fixed'),
                $noFixedTotalTable = $table.next().children('.layui-table-total').children('table:eq(0)'),
                tableId = myTable.id,
                isSimple = myTable.drag === 'simple' || (myTable.drag && myTable.drag.type === 'simple'), // 是否为简易拖拽
                toolbar = myTable.drag && myTable.drag.toolbar, // 是否开启工具栏
                isDraging = false, isStart = false;

            if (!$tableHead.attr('drag')) {
                $tableHead.attr('drag', true);
                if (toolbar) {
                    $tableBox.append('<div class="soul-drag-bar"><div data-type="left">左固定</div><div data-type="none">不固定</div><div data-type="right">右固定</div></div>')
                    var $dragBar = $tableBox.children('.soul-drag-bar');
                    $dragBar.children('div').on('mouseenter', function () {
                        $(this).addClass('active')
                    }).on('mouseleave', function () {
                        $(this).removeClass('active')
                    })
                }

                $tableHead.find('th').each(function () {
                    var $this = $(this),
                        field = $this.data('field'),
                        key = $this.data('key');
                    if (!key) {return;}

                    var keyArray = key.split('-'),
                        curColumn = myTable.cols[keyArray[1]][keyArray[2]],
                        curKey = keyArray[1] + '-' + keyArray[2],
                        isInFixed = $this.parents('.layui-table-fixed').length>0;
                    // 绑定鼠标按下事件
                    $(this).find('span:first,.laytable-cell-checkbox')
                        .css('cursor', 'move')
                        .on('mousedown', function (e) {
                            if (e.button !== 0) {
                                return;
                            }
                            e.preventDefault();
                            var $cloneHead = $this.clone().css('visibility', 'hidden'),
                                originLeft = $this.position().left,
                                originTop = $this.offset().top,
                                disX = e.clientX - originLeft, // 鼠标距离被移动元素左侧的距离
                                color = $this.parents('tr:eq(0)').css("background-color"),
                                width = $this.width(), moveDistince = 0,
                                $that = $(this),
                                isFixed = curColumn.fixed;
                            isStart = true;
                            //区分click、drag事件


                            // 阻止文本选中
                            $(document).bind("selectstart", function () {
                                return false;
                            });

                            // 移动事件
                            $('body').on('mousemove', function (e) {
                                if (isStart && $cloneHead) {
                                    $tableBox.removeClass('no-left-border');
                                    if (!isDraging) {
                                        if (toolbar) {
                                            $dragBar.attr('data-type', isFixed || 'none')
                                            $dragBar.addClass('active')
                                        }

                                        $this.after($cloneHead);
                                        $this.addClass('isDrag').css({
                                            'position': 'absolute',
                                            'z-index': 1,
                                            'border-left': '1px solid #e6e6e6',
                                            'background-color': color,
                                            'width': width + 1
                                        });

                                        if (isSimple) {
                                            //设置蒙板
                                        } else {
                                            (isInFixed ? $fixedBody : $tableBody).find('td[data-key="' + key + '"]').each(function () {
                                                $(this).after($(this).clone().css('visibility', 'hidden').attr('data-clone', ''));
                                                $(this).addClass('isDrag').css({
                                                    'position': 'absolute',
                                                    'z-index': 1,
                                                    'border-left': '1px solid #e6e6e6',
                                                    'background-color': $(this).css('background-color'),
                                                    'width': width + 1
                                                });
                                            })
                                            if ($totalTable.length>0) {
                                                (isInFixed ? $fixedTotalTable : $totalTable).find('td[data-key="' + key + '"]').each(function () {
                                                    $(this).after($(this).clone().css('visibility', 'hidden').attr('data-clone', ''));
                                                    $(this).addClass('isDrag').css({
                                                        'position': 'absolute',
                                                        'z-index': 1,
                                                        'background-color': $(this).parents('tr:eq(0)').css('background-color'),
                                                        'width': width + 1
                                                    });
                                                })
                                            }
                                        }
                                    }
                                    isDraging = true;
                                    var x, y, i, j, tempCols,
                                        left = e.clientX - disX, // 计算当前被移动列左侧位置应该哪里
                                        $leftTh = $cloneHead.prev().prev(),
                                        hasLeftTh = $leftTh.length > 0,
                                        leftKey = hasLeftTh ? $leftTh.data('key').split('-') : [],
                                        $rightTh = $cloneHead.next().hasClass('layui-table-patch') ? [] : $cloneHead.next(),
                                        hasRightTh = $rightTh.length > 0,
                                        rightKey = hasRightTh ? $rightTh.data('key').split('-') : [],
                                        leftMove = hasLeftTh && ($cloneHead.position().left - left > $leftTh.width() / 2.0),
                                        rightMove = hasRightTh && (left - $cloneHead.position().left > $rightTh.width() / 2.0);
                                    moveDistince = Math.abs($cloneHead.position().left - left); //记录移动距离
                                    // 移动到左右两端、checbox/radio 固定列等停止移动
                                    if ($cloneHead.position().left - left > 0
                                        ? !hasLeftTh || !!isFixed !== !!myTable.cols[leftKey[1]][leftKey[2]].fixed
                                        : !hasRightTh || !!isFixed !== !!myTable.cols[rightKey[1]][rightKey[2]].fixed) {
                                        $this.css('left',$cloneHead.position().left);
                                        $tableBody.find('td[data-key="' + key + '"][data-clone]').each(function (e) {
                                            $(this).prev().css('left', $cloneHead.position().left);
                                        })
                                        if ($totalTable.length>0) {
                                            $totalTable.find('td[data-key="' + key + '"][data-clone]').each(function (e) {
                                                $(this).prev().css('left', $cloneHead.position().left);
                                            })
                                        }
                                        $tableBox.addClass('no-left-border');
                                        return;
                                    }
                                    $this.css('left', left);

                                    if (leftMove) {
                                        $cloneHead.after($leftTh);

                                        // 更新隐藏列顺序
                                        $('#soul-columns' + tableId + '>li[data-value="' + field + '"]').after($('#soul-columns' + tableId + '>li[data-value="' + field + '"]').prev())

                                        // 更新配置信息
                                        for (i = 0; i < myTable.cols.length; i++) {
                                            for (j = 0; j < myTable.cols[i].length; j++) {
                                                if (myTable.cols[i][j].key === curKey) {
                                                    x = i;
                                                    y = j;
                                                    break;
                                                }
                                            }
                                            if (typeof x !== 'undefined' && typeof y !== 'undefined') {
                                                break;
                                            }
                                        }
                                        tempCols = myTable.cols[x][y - 1];
                                        myTable.cols[x][y - 1] = myTable.cols[x][y];
                                        myTable.cols[x][y] = tempCols;
                                        if (myTable.filter && myTable.filter.cache) {
                                            localStorage.setItem(location.pathname + location.hash + myTable.id, _this.deepStringify(myTable.cols))
                                        }
                                    } else if (rightMove) {
                                        $cloneHead.prev().before($rightTh);

                                        // 更新隐藏列顺序
                                        $('#soul-columns' + tableId + '>li[data-value="' + field + '"]').before($('#soul-columns' + tableId + '>li[data-value="' + field + '"]').next())

                                        // 更新配置信息
                                        for (i = 0; i < myTable.cols.length; i++) {
                                            for (j = 0; j < myTable.cols[i].length; j++) {
                                                if (myTable.cols[i][j].key === curKey) {
                                                    x = i;
                                                    y = j;
                                                    break;
                                                }
                                            }
                                            if (typeof x !== 'undefined' && typeof y !== 'undefined') {
                                                break;
                                            }
                                        }
                                        tempCols = myTable.cols[x][y + 1];
                                        myTable.cols[x][y + 1] = myTable.cols[x][y];
                                        myTable.cols[x][y] = tempCols;
                                        if (myTable.filter && myTable.filter.cache) {
                                            localStorage.setItem(location.pathname + location.hash + myTable.id, _this.deepStringify(myTable.cols))
                                        }
                                    }

                                    $tableBody.find('td[data-key="' + key + '"][data-clone]').each(function () {
                                        $(this).prev().css('left', left);

                                        if (leftMove) {
                                            if ($(this).prev().prev().length !== 0) {
                                                $(this).after($(this).prev().prev());
                                            }
                                        } else if (rightMove) {
                                            if ($(this).next().length !== 0) {
                                                $(this).prev().before($(this).next());
                                            }
                                        }
                                    })
                                    if ($totalTable.length>0) {
                                        $totalTable.find('td[data-key="' + key + '"][data-clone]').each(function () {
                                            $(this).prev().css('left', left);

                                            if (leftMove) {
                                                if ($(this).prev().prev().length !== 0) {
                                                    $(this).after($(this).prev().prev());
                                                }
                                            } else if (rightMove) {
                                                if ($(this).next().length !== 0) {
                                                    $(this).prev().before($(this).next());
                                                }
                                            }
                                        })
                                    }

                                    /* 拖动隐藏列 */
                                    if (e.clientY - originTop < -15) {
                                        if ($('#column-remove').length === 0) {
                                            $('body').append('<i id="column-remove" class="layui-red layui-icon layui-icon-delete"></i>')
                                        }
                                        $('#column-remove').css({
                                            top: e.clientY - $('#column-remove').height() / 2,
                                            left: e.clientX - $('#column-remove').width() / 2,
                                            'font-size': (originTop - e.clientY) + 'px'
                                        })
                                        $('#column-remove').show();
                                    } else {
                                        $('#column-remove').hide();
                                    }
                                }
                            }).on('mouseup', function () {
                                $(document).unbind("selectstart");
                                $('body').off('mousemove').off('mouseup')
                                if (isStart && $cloneHead) {
                                    isStart = false;
                                    if (isDraging) {
                                        if (curColumn.type !== 'checkbox') {
                                            $that.on('click', function (e) {
                                                e.stopPropagation();
                                            });
                                        }

                                        isDraging = false;
                                        $tableBox.removeClass('no-left-border')
                                        $this.removeClass('isDrag').css({
                                            'position': 'relative',
                                            'z-index': 'inherit',
                                            'left': 'inherit',
                                            'border-left': 'inherit',
                                            'width': 'inherit',
                                            'background-color': 'inherit'
                                        });
                                        $this.next().remove();
                                        var prefKey = $this.prev().data('key');
                                        if (isFixed) {
                                            var $noFixedTh = $tableBox.children('.layui-table-header').children('table').find('th[data-key="' + key + '"]');
                                            if (prefKey) {
                                                $noFixedTh.parent().children('th[data-key="' + prefKey + '"]').after($noFixedTh)
                                            } else {
                                                if (isFixed === 'right') {
                                                    if ($this.siblings().length > 0) {
                                                        $tableBox.children('.layui-table-header').children('table').find('th[data-key="' + $this.next().data('key') + '"]').prev().after($noFixedTh);
                                                    }
                                                } else {
                                                    $noFixedTh.parent().prepend('<th class="layui-hide"></th>');
                                                    $noFixedTh.parent().children('th:first').after($noFixedTh);
                                                    $noFixedTh.parent().children('th:first').remove();
                                                }

                                            }
                                        }
                                        if (isSimple) {
                                            $tableBody.find('td[data-key="' + key + '"]').each(function () {
                                                if (prefKey) {
                                                    $(this).parent().children('td[data-key="' + prefKey + '"]').after($(this))
                                                } else {
                                                    if (isFixed === 'right') {
                                                        if ($this.siblings().length > 0) {
                                                            var $preTd = $(this).parent().children('td[data-key="' + $this.next().data('key') + '"]').prev();
                                                            if ($preTd.length>0) {
                                                                $preTd.after($(this));
                                                            } else {
                                                                $(this).parent().prepend('<td class="layui-hide"></td>');
                                                                $(this).parent().children('td:first').after($(this));
                                                                $(this).parent().children('td:first').remove();
                                                            }
                                                        }
                                                    } else {
                                                        $(this).parent().prepend('<td class="layui-hide"></td>');
                                                        $(this).parent().children('td:first').after($(this));
                                                        $(this).parent().children('td:first').remove();
                                                    }
                                                }
                                            });
                                            if ($totalTable.length>0) {
                                                $totalTable.find('td[data-key="' + key + '"]').each(function () {
                                                    if (prefKey) {
                                                        $(this).parent().children('td[data-key="' + prefKey + '"]').after($(this))
                                                    } else {
                                                        if (isFixed === 'right') {
                                                            var $preTd = $(this).parent().children('td[data-key="' + $this.next().data('key') + '"]').prev();
                                                            if ($preTd.length>0) {
                                                                $preTd.after($(this));
                                                            } else {
                                                                $(this).parent().prepend('<td class="layui-hide"></td>');
                                                                $(this).parent().children('td:first').after($(this));
                                                                $(this).parent().children('td:first').remove();
                                                            }
                                                        } else {
                                                            $(this).parent().prepend('<td class="layui-hide"></td>');
                                                            $(this).parent().children('td:first').after($(this));
                                                            $(this).parent().children('td:first').remove();
                                                        }
                                                    }
                                                });
                                            }
                                        } else if (isInFixed) {
                                            $noFixedBody.find('td[data-key="' + key + '"]').each(function () {
                                                if (prefKey) {
                                                    $(this).parent().children('td[data-key="' + prefKey + '"]').after($(this))
                                                } else {
                                                    if (isFixed === 'right') {
                                                        if ($this.siblings().length > 0) {
                                                            var $preTd = $(this).parent().children('td[data-key="' + $this.next().data('key') + '"]').prev();
                                                            if ($preTd.length>0) {
                                                                $preTd.after($(this));
                                                            } else {
                                                                $(this).parent().prepend('<td class="layui-hide"></td>');
                                                                $(this).parent().children('td:first').after($(this));
                                                                $(this).parent().children('td:first').remove();
                                                            }
                                                        }
                                                    } else {
                                                        $(this).parent().prepend('<td class="layui-hide"></td>');
                                                        $(this).parent().children('td:first').after($(this));
                                                        $(this).parent().children('td:first').remove();
                                                    }
                                                }
                                            });
                                            $fixedBody.find('td[data-key="' + key + '"][data-clone]').each(function () {
                                                $(this).prev().removeClass('isDrag').css({
                                                    'position': 'relative',
                                                    'z-index': 'inherit',
                                                    'left': 'inherit',
                                                    'border-left': 'inherit',
                                                    'width': 'inherit',
                                                    'background-color': 'inherit'
                                                });
                                                $(this).remove();
                                            });
                                            if ($totalTable.length>0) {
                                                $noFixedTotalTable.find('td[data-key="' + key + '"]').each(function () {
                                                    if (prefKey) {
                                                        $(this).parent().children('td[data-key="' + prefKey + '"]').after($(this))
                                                    } else {
                                                        if (isFixed === 'right') {
                                                            var $preTd = $(this).parent().children('td[data-key="' + $this.next().data('key') + '"]').prev();
                                                            if ($preTd.length>0) {
                                                                $preTd.after($(this));
                                                            } else {
                                                                $(this).parent().prepend('<td class="layui-hide"></td>');
                                                                $(this).parent().children('td:first').after($(this));
                                                                $(this).parent().children('td:first').remove();
                                                            }
                                                        } else {
                                                            $(this).parent().prepend('<td class="layui-hide"></td>');
                                                            $(this).parent().children('td:first').after($(this));
                                                            $(this).parent().children('td:first').remove();
                                                        }
                                                    }
                                                });
                                                $fixedTotalTable.find('td[data-key="' + key + '"][data-clone]').each(function () {
                                                    $(this).prev().removeClass('isDrag').css({
                                                        'position': 'relative',
                                                        'z-index': 'inherit',
                                                        'left': 'inherit',
                                                        'width': 'inherit',
                                                        'background-color': 'inherit'
                                                    });
                                                    $(this).remove();
                                                });
                                            }
                                        } else {
                                            $tableBody.find('td[data-key="' + key + '"][data-clone]').each(function () {
                                                $(this).prev().removeClass('isDrag').css({
                                                    'position': 'relative',
                                                    'z-index': 'inherit',
                                                    'left': 'inherit',
                                                    'width': 'inherit',
                                                    'background-color': 'inherit'
                                                });
                                                $(this).remove();
                                            });
                                            if ($totalTable.length>0) {
                                                $totalTable.find('td[data-key="' + key + '"][data-clone]').each(function () {
                                                    $(this).prev().removeClass('isDrag').css({
                                                        'position': 'relative',
                                                        'z-index': 'inherit',
                                                        'left': 'inherit',
                                                        'width': 'inherit',
                                                        'background-color': 'inherit'
                                                    });
                                                    $(this).remove();
                                                });
                                            }
                                        }

                                        $cloneHead = null;

                                        // 处理 toolbar 事件
                                        if (toolbar) {
                                            if ($dragBar.children('.active').length > 0 && $dragBar.children('.active').attr('data-type') !== $dragBar.attr('data-type')) {
                                                var targetFix = $dragBar.children('.active').attr('data-type'),
                                                    i, j, curPos, targetPos;
                                                for (i = 0; i < myTable.cols.length; i++) {
                                                    for (j = 0; j < myTable.cols[i].length; j++) {
                                                        if (targetFix==='right' || (targetFix === 'none' && $dragBar.attr('data-type') === 'right')) {
                                                            if (typeof  targetPos === 'undefined') {
                                                                if (myTable.cols[i][j].fixed === 'right') {
                                                                    targetPos = {x: i, y: j};
                                                                } else if (j === myTable.cols[i].length-1) {
                                                                    targetPos = {x: i, y: j+1};
                                                                }

                                                            }
                                                        } else {
                                                            if (typeof targetPos === 'undefined' && (!myTable.cols[i][j].fixed || myTable.cols[i][j].fixed === 'right')) {
                                                                targetPos = {x: i, y: j};
                                                            }
                                                        }
                                                        if (myTable.cols[i][j].key === curKey) {
                                                            curPos = {x: i, y: j};
                                                        }
                                                    }
                                                }
                                                curColumn['fixed'] = targetFix === 'none' ? false : targetFix;

                                                if (curPos.y !== targetPos.y) {
                                                    myTable.cols[curPos.x].splice(curPos.y, 1);

                                                    if (curPos.y < targetPos.y) {
                                                        targetPos.y -= 1
                                                    }

                                                    myTable.cols[targetPos.x].splice(targetPos.y, 0, curColumn)

                                                    if (myTable.filter && myTable.filter.cache) {
                                                        localStorage.setItem(location.pathname + location.hash + myTable.id, _this.deepStringify(myTable.cols))
                                                    }
                                                }
                                                table.reload(tableId)
                                            }
                                            $dragBar.removeClass('active')
                                        }

                                    } else {
                                        $that.unbind('click');
                                    }
                                    if ($('#column-remove').is(':visible')) {
                                        $tableHead.find('thead>tr>th[data-key=' + key + ']').addClass(HIDE);
                                        $tableBody.find('tbody>tr>td[data-key="' + key + '"]').addClass(HIDE);
                                        $totalTable.find('tbody>tr>td[data-key="' + key + '"]').addClass(HIDE);
                                        // 同步配置
                                        curColumn['hide'] = true
                                        if (myTable.filter && myTable.filter.cache) {
                                            localStorage.setItem(location.pathname + location.hash + myTable.id, _this.deepStringify(myTable.cols))
                                        }
                                        // 更新下拉隐藏
                                        $('#soul-columns' + tableId).find('li[data-value="' + field + '"]>input').prop('checked', false);
                                        tableFilter.resize(myTable)
                                    }
                                    $('#column-remove').hide();
                                }
                            })
                        });
                })
            }
        },
        rowDrag: function (myTable) {
            var _this = this,
                $table = $(myTable.elem),
                $tableBox = $table.next().children('.layui-table-box'),
                $fixedBody = $tableBox.children('.layui-table-fixed').children('.layui-table-body').children('table'),
                $noFixedBody = $tableBox.children('.layui-table-body').children('table'),
                $tableBody = $.merge($tableBox.children('.layui-table-body').children('table'), $fixedBody),
                tableId = myTable.id,
                isDraging = false,
                trigger = myTable.rowDrag.trigger || 'row',
                $trs = trigger === 'row' ? $tableBody.children('tbody').children('tr') : $tableBody.find(trigger);
            if (trigger !== 'row') {
                $tableBody.find(trigger).css('cursor', 'move')
            }
            $trs.on('mousedown', function (e) {
                if (e.button !== 0) {
                    return;
                }
                var $this = trigger === 'row' ? $(this) : $(this).parents('tr:eq(0)'),
                    index = parseInt($this.data('index')),
                    $bodyTr = $noFixedBody.children('tbody').children('tr[data-index='+ index +']'),
                    $cloneTr = $bodyTr.clone().css('visibility', 'hidden'),
                    $FixBodyTr = $fixedBody.children('tbody').children('tr[data-index='+ index +']'),
                    bodyScrollTop = $tableBox.children('.layui-table-body').scrollTop(), // 记录当前滚动条位置
                    originTop = $this.position().top,
                    disY = e.clientY - originTop; // 鼠标距离被移动元素上侧的距离

                $('body').on('mousemove', function (e) {

                    if (!isDraging) {
                        isDraging = true;
                        // 设置鼠标样式
                        // $table.next().find('style').append('.layui-table-view .layui-table td{cursor: move;}.layui-table tr{transition: none}')
                        var style = $table.next().find('style')[0],
                            sheet = style.sheet || style.styleSheet || {};
                        _this.addCSSRule(sheet, '.layui-table-view .layui-table td', 'cursor: move')
                        _this.addCSSRule(sheet, '.layui-table tr', 'transition: none')

                        $tableBox.addClass('noselect'); // 禁止选中文本

                        $bodyTr.after($cloneTr);
                        $bodyTr.css({
                            'position': 'absolute',
                            'z-index': 1
                        })

                        $FixBodyTr.each(function () {
                            $(this).after($(this).clone().css('visibility', 'hidden'))
                            $(this).css({
                                'position': 'absolute',
                                'z-index': 102
                            })
                        })
                    }

                    var top = e.clientY - disY + ($tableBox.children('.layui-table-body').scrollTop() - bodyScrollTop), // 计算当前被移动行top位置应该哪里
                        trTop = $cloneTr.position().top, //当前行所在位置
                        $UpTr = $bodyTr.prev(),
                        hasUpTr = $UpTr.length > 0,
                        $downTr = $cloneTr.next(),
                        hasDownTr = $downTr.length > 0,
                        upMove = hasUpTr && (trTop - top > $UpTr.height() / 2.0),
                        downMove = hasDownTr && (top - trTop > $downTr.height() / 2.0);

                    if (trTop - top > 0 ? !hasUpTr : !hasDownTr) {
                        $bodyTr.css('top', trTop);
                        $FixBodyTr.each(function () {
                            $(this).css('top', trTop);
                        })
                        return;
                    }

                    $bodyTr.css('top', top);
                    $FixBodyTr.each(function () {
                        $(this).css('top', top);
                    })

                    if (upMove) {
                        updateDataIndex($bodyTr, -1)
                        $cloneTr.after(updateDataIndex($UpTr, 1));
                        $FixBodyTr.each(function () {
                            updateDataIndex($(this), -1)
                            $(this).next().after(updateDataIndex($(this).prev(), 1));
                        })
                    } else if (downMove) {
                        updateDataIndex($bodyTr, 1).before(updateDataIndex($downTr, -1))
                        $FixBodyTr.each(function () {
                            updateDataIndex($(this), 1);
                            $(this).before(updateDataIndex($(this).next().next(), -1));
                        })
                    }

                    // 同步 data-index
                    function updateDataIndex ($el, diff) {
                        var tempIndex = parseInt($el.data('index')) + diff;
                        $el.data('index', tempIndex);
                        $el.attr('data-index', tempIndex);
                        return $el
                    }

                }).on('mouseup', function (e) {
                    $('body').off('mousemove').off('mouseup');

                    if (isDraging) {
                        isDraging = false;

                        $tableBox.removeClass('noselect'); // 取消禁止选中文本
                        $bodyTr.css({'position': 'inherit','z-index': 'inherit'});
                        $bodyTr.next().remove();
                        $FixBodyTr.each(function () {
                            $(this).css({'position': 'inherit','z-index': 'inherit'});
                            $(this).next().remove()
                        })

                        // 恢复样式
                        var style = $table.next().find('style')[0],
                            sheet = style.sheet || style.styleSheet || {},
                            rules = sheet.cssRules || sheet.rules;
                        layui.each(rules, function(i, item){
                            if(item.selectorText === ('.layui-table-view .layui-table td')){
                                item.style.cursor = 'default';
                            }
                        });

						var newIndex = $this.index();
						//前置事件
						if (typeof myTable.rowDrag.before === 'function') {
							if( newIndex !== index ) {
								var cache = layui.table.cache[tableId]
								// flag == false 取消拖拽
								var flag = myTable.rowDrag.before.call(myTable, {
										row: cache[index],
										newIndex: newIndex,
										oldIndex: index,
										before:newIndex > index ? cache[newIndex]:cache[newInde - 1],
										after:newIndex > index ? cache[newIndex + 1] : cache[newIndex],
										cache: cache
									})
								if (!flag) { // 取消拖拽
									if(index > newIndex){
										$bodyTr.insertAfter($bodyTr.parent().find("tr").eq(index))
									}
									if(index < newIndex){
										$bodyTr.insertBefore($bodyTr.parent().find("tr").eq(index))
									}
									//修正index
									$bodyTr.parent().find("tr").each(function(index, item){
										$(item).data('index', index);
										$(item).attr('data-index', index);
									})
																
								}
							}							
						}
                        if (newIndex !== index) { // 有位置变动
                            if (typeof myTable.rowDrag.done === 'function') {
                                var cache = layui.table.cache[tableId],
                                    row = cache.splice(index, 1)[0];
                                cache.splice(newIndex , 0, row);
                                myTable.rowDrag.done.call(myTable, {
                                    row: row,
                                    newIndex: newIndex,
                                    oldIndex: index,
                                    cache: cache
                                })
                            }
                        }

                    }
                })
            })
        },
        fixTableRemember: function(myTable, dict) {
            if (myTable.filter && myTable.filter.cache) {
                if (dict && dict.rule) {
                    myTable.cols[dict.rule.selectorText.split('-')[3]][dict.rule.selectorText.split('-')[4]].width = dict.rule.style.width.replace('px','');
                }
                localStorage.setItem(location.pathname + location.hash + myTable.id, this.deepStringify(myTable.cols))
            }
        },
        overflow: function (myTable) {
            var options = {};
            if (typeof myTable.overflow === 'string') {
                options = {
                    type: myTable.overflow
                }
            } else if (typeof myTable.overflow === 'object') {
                 options = myTable.overflow
            } else {
                return;
            }
            var $table = $(myTable.elem),
                layBody = $table.next().find('.layui-table-body'),
                tooltipIndex,
                hoverTime = options.hoverTime || 0,
                tooltipTimeOut,
                color = options.color || 'white',
                bgColor = options.bgColor || 'black',
                minWidth = options.minWidth || 300,
                maxWidth = options.maxWidth || 300;

            if (options.type === 'tips') {
                layBody.off('mouseenter', 'td').on('mouseenter', 'td', function () {
                    var _this = this;
                    tooltipTimeOut = setTimeout(function () {
                        toopTip.call(_this)
                    }, hoverTime)
                }).on('mouseleave', 'td', function () {
                    toopTip.call(this, 'hide')
                })

                function toopTip(hide) {
                    clearTimeout(tooltipTimeOut);
                    var othis = $(this)
                        ,elemCell = othis.children('.layui-table-cell')
                        ,width = elemCell.outerWidth()
                        ,layerWidth = width < minWidth ? minWidth : width > maxWidth ? maxWidth : width;
                    if(othis.data('off')) return;

                    if (hide) {
                        layer.close(tooltipIndex)
                    } else if(elemCell.prop('scrollWidth') > width) {
                        tooltipIndex = layer.tips('<span style="color: '+color+'">' + $(this).text() + '</span>', this, {
                            tips: [1, bgColor],
                            maxWidth: layerWidth,
                            time: 0
                        });
                    }
                }
            } else if (options.type === 'title') {
                layBody.off('mouseenter', 'td').on('mouseenter', 'td', function () {
                    var othis = $(this)
                        ,elemCell = othis.children('.layui-table-cell');
                    if(othis.data('off')) return;

                    if(elemCell.prop('scrollWidth') > elemCell.outerWidth()) {
                        elemCell.attr('title', $(this).text())
                    }
                })
            }

        },
        // 右键菜单配置
        contextmenu: function (myTable) {
            var $table = $(myTable.elem),
                $tableBox = $table.next().children('.layui-table-box'),
                $tableHead = $.merge($tableBox.children('.layui-table-header').children('table'),$tableBox.children('.layui-table-fixed').children('.layui-table-header').children('table')),
                $fixedBody = $tableBox.children('.layui-table-fixed').children('.layui-table-body').children('table'),
                $tableBody = $.merge($tableBox.children('.layui-table-body').children('table'), $fixedBody),
                $totalTable = $table.next().children('.layui-table-total').children('table'),
                tableId = myTable.id,
                header = myTable.contextmenu ? myTable.contextmenu.header : '',
                body = myTable.contextmenu ? myTable.contextmenu.body : '',
                total = myTable.contextmenu ? myTable.contextmenu.total: '',
                options = {header: {box: $tableHead, tag:'th', opts: header, cols:{}},
                    body: {box: $tableBody, tag:'td', opts: body, cols:{}, isBody: true},
                    total: {box: $totalTable, tag: 'td', opts: total, cols:{}}},
                hasColsContext = false;

            for (var i = 0; i < myTable.cols.length; i++) {
                for (var j = 0; j < myTable.cols[i].length; j++) {
                    if (myTable.cols[i][j].contextmenu) {
                        hasColsContext = true
                        options.header.cols[myTable.cols[i][j].key] = myTable.cols[i][j].contextmenu.header
                        options.body.cols[myTable.cols[i][j].key] = myTable.cols[i][j].contextmenu.body
                        options.total.cols[myTable.cols[i][j].key] = myTable.cols[i][j].contextmenu.total
                    }
                }
            }

            if (!myTable.contextmenu && !hasColsContext) {
                return;
            }


            for (var name in options) {
                (function (name) {
                    options[name].box.find(options[name].tag).on('contextmenu', function (e) {
                        $('#soul-table-contextmenu-wrapper').remove();
                        $('body').append('<div id="soul-table-contextmenu-wrapper"></div>');
                        $('#soul-table-contextmenu-wrapper').on('click', function (e) {
                            e.stopPropagation()
                        })
                        var curColsOpts = options[name].cols[$(this).data('key').substr($(this).data('key').indexOf('-')+1)];
                        if (curColsOpts === false) {
                            return false
                        } else if (curColsOpts && curColsOpts.length>0) {
                            genePanel($('#soul-table-contextmenu-wrapper'), e.pageX, e.pageY, curColsOpts, $(this), options[name].box, options[name].tag, options[name].isBody);
                            return false
                        } else if (options[name].opts === false) {
                            return false
                        } else if (options[name].opts && options[name].opts.length>0) {
                            genePanel($('#soul-table-contextmenu-wrapper'), e.pageX, e.pageY, options[name].opts, $(this), options[name].box, options[name].tag, options[name].isBody);
                            return false
                        }
                    })
                })(name)
            }


            $('body').on('click', function () {
                $('#soul-table-contextmenu-wrapper').remove();
            })

            function genePanel($parent, left, top, options, $this, box, tag, isBody) {
                var html = [], i;

                html.push('<ul class="soul-table-contextmenu">');
                for (i = 0; i < options.length; i++) {
                    html.push('<li data-index="'+i+'" class="'+(options[i].children && options[i].children.length>0 ? 'contextmenu-children' : '')+'">')
                    if (options[i].icon) {
                        html.push('<i class="prefixIcon '+options[i].icon+'" />')
                    } else {
                        html.push('<i class="prefixIcon" />')
                    }
                    html.push(options[i].name)

                    if (options[i].children && options[i].children.length>0) {
                        html.push('<i class="endIcon layui-icon layui-icon-right" />')
                    }

                    html.push('</li>')
                }
                html.push('</ul>');
                $parent.append(html.join(''));
                var $curPanel = $parent.children().last();
                if (top + $curPanel.outerHeight() > $('body').prop('scrollHeight')) {
                    top = top - $curPanel.outerHeight()
                    if (top < 0) {
                        top = 0
                    }
                }
                if ($parent.parent().data('direction') === 'left' && ($parent.offset().left - $curPanel.outerWidth()) > 0) {
                    left = - $curPanel.outerWidth();
                    $curPanel.data('direction', 'left')
                } else if (left + $curPanel.outerWidth() + $parent.offset().left > $('body').prop('scrollWidth')) {
                    left = left - $curPanel.outerWidth() - $parent.outerWidth()
                    if (left + $parent.offset().left < 0) {
                        left = - $parent.offset().left
                    }
                    $curPanel.data('direction', 'left')
                }
                $curPanel.css({
                    top: top + 'px',
                    left: left + 'px'
                })

                for (i = 0; i < options.length; i++) {
                    if (typeof options[i].click === "function") {
                        (function (i) {
                            $parent.children('.soul-table-contextmenu:last').children('li[data-index="'+i+'"]').on('click', function () {
                            var index = $this.parents('tr:eq(0)').data('index'),
                                tr = box.find('tr[data-index="'+ index +'"]'),
                                row = layui.table.cache[tableId][index];

                                options[i].click.call(myTable, {
                                    cell: $this,
                                    elem: tag === 'th' ? $this : isBody ? box.children('tbody').children('tr[data-index="'+index+'"]').children('[data-key="'+$this.data('key')+'"]') : box.find('[data-key="'+$this.data('key')+'"]'),
                                    trElem: box.children('tbody').children('tr[data-index="'+index+'"]'),
                                    text: $this.text(),
                                    field: $this.data('field'),
                                    del: !isBody? '' : function() {
                                        table.cache[tableId][index] = [];
                                        tr.remove();
                                        table.resize(tableId);
                                    },
                                    update: !isBody?'':function(fields) {
                                        fields = fields || {};
                                        layui.each(fields, function(key, value){
                                            if(key in row){
                                                var templet, td = tr.children('td[data-field="'+ key +'"]');
                                                row[key] = value;
                                                table.eachCols(tableId, function(i, item2){
                                                    if(item2.field == key && item2.templet){
                                                        templet = item2.templet;
                                                    }
                                                });
                                                td.children('.layui-table-cell').html(function(){
                                                    return templet ? function(){
                                                        return typeof templet === 'function'
                                                            ? templet(row)
                                                            : layui.laytpl($(templet).html() || value).render(row)
                                                    }() : value;
                                                }());
                                                td.data('content', value);
                                            }
                                        });
                                    },
                                    row: isBody ? row : {},
                                })
                                $('#soul-table-contextmenu-wrapper').remove();
                            })
                        })(i)
                    }
                }
                $parent.children('.soul-table-contextmenu:last').children('li').on('mouseenter', function (e) {
                    e.stopPropagation()
                    $(this).siblings('.contextmenu-children').children('ul').remove();
                    if ($(this).hasClass('contextmenu-children')) {
                        genePanel($(this), $(this).outerWidth(), $(this).position().top, options[$(this).data('index')].children, $this, box, tag, isBody)
                    }
                })
            }

        },
        fixTotal: function (myTable) {
            var $table = $(myTable.elem),
                $total = $table.next().children('.layui-table-total'),
                style = $table.next().find('style')[0],
                sheet = style.sheet || style.styleSheet || {};
            if ($total.length > 0) {
                var $tableBox = $table.next().children('.layui-table-box'),
                    $fixedLeft = $tableBox.children('.layui-table-fixed-l').children('.layui-table-body').children('table').children('tbody').children('tr:eq(0)').children('td'),
                    $fixedRight = $tableBox.children('.layui-table-fixed-r').children('.layui-table-body').children('table').children('tbody').children('tr:eq(0)').children('td'),
                    html = [];

                $total.children('.layui-table-total-fixed').remove()

                if ($fixedLeft.length > 0) {
                    this.addCSSRule(sheet, '.layui-table-total-fixed-l .layui-table-patch', 'display: none')
                    $table.next().css('position', 'relative');
                    html.push('<table style="position: absolute;background-color: #fff;left: 0;top: '+ ($total.position().top + 1) +'px" cellspacing="0" cellpadding="0" border="0" class="layui-table layui-table-total-fixed layui-table-total-fixed-l"><tbody><tr>');
                    $fixedLeft.each(function () {
                        if ($(this).data('key')) {
                            html.push($total.children('table:eq(0)').find('[data-key="' + $(this).data('key') + '"]').prop("outerHTML"))
                        }
                    })
                    html.push('</tr></tbody></table>');
                    $total.append(html.join(''))
                }
                if ($fixedRight.length > 0) {
                    this.addCSSRule(sheet, '.layui-table-total-fixed-r td:first-child', 'border-left:1px solid #e6e6e6')
                    this.addCSSRule(sheet, '.layui-table-total-fixed-r td:last-child', 'border-left: none')
                    $table.next().css('position', 'relative');
                    html = [];
                    html.push('<table style="position: absolute;background-color: #fff;right: 0;top: '+ ($total.position().top + 1) +'px" cellspacing="0" cellpadding="0" border="0" class="layui-table layui-table-total-fixed layui-table-total-fixed-r"><tbody><tr>');
                    $fixedRight.each(function () {
                        html.push($total.children('table:eq(0)').find('[data-key="' + $(this).data('key') + '"]').prop("outerHTML"))
                    })
                    html.push('</tr></tbody></table>')
                    $total.append(html.join(''))
                }
            }

        },
        fixResizeRightFixed: function (myTable) {
            var _this = this,
                $table = $(myTable.elem),
                $tableBox = $table.next().children('.layui-table-box'),
                $fixedHead = $tableBox.children('.layui-table-fixed-r').children('.layui-table-header').children('table'),
                dict = {},_BODY = $('body'),_DOC = $(document), resizing, ELEM_SORT='layui-table-sort', ELEM_NO_SORT='layui-table-sort-invalid';
            if ($fixedHead.length>0) {
                $fixedHead.find('th').off('mousemove').on('mousemove', function (e) {
                    var othis = $(this)
                        ,oLeft = othis.offset().left
                        ,pLeft = e.clientX - oLeft;
                    if(othis.data('unresize') || dict.resizeStart){
                        return;
                    }
                    if (othis.width() - pLeft <= 10) {
                        _BODY.css('cursor', 'initial')
                    }
                    dict.allowResize = pLeft <= 10; //是否处于拖拽允许区域
                    _BODY.css('cursor', (dict.allowResize ? 'col-resize' : ''));
                }).off('mousedown').on('mousedown', function (e) {
                    var othis = $(this);
                    if(dict.allowResize){
                        othis.find('.'+ELEM_SORT).removeClass(ELEM_SORT).addClass(ELEM_NO_SORT)
                        var key = othis.data('key');
                        e.preventDefault();
                        dict.resizeStart = true; //开始拖拽
                        dict.offset = [e.clientX, e.clientY]; //记录初始坐标

                        _this.getCssRule(myTable, key, function(item){
                            var width = item.style.width || othis.outerWidth();
                            dict.rule = item;
                            dict.ruleWidth = parseFloat(width);
                            dict.othis = othis;
                            dict.minWidth = othis.data('minwidth') || myTable.cellMinWidth;
                        });
                    }
                });
                //拖拽中
                _DOC.on('mousemove', function(e){
                    if(dict.resizeStart){
                        layui.soulTable.fixTableRemember(myTable, dict)
                        e.preventDefault();
                        if(dict.rule){
                            var setWidth = dict.ruleWidth - e.clientX + dict.offset[0];
                            if(setWidth < dict.minWidth) setWidth = dict.minWidth;
                            dict.rule.style.width = setWidth + 'px';
                        }
                        resizing = 1
                    }
                }).on('mouseup', function(e){
                    if(dict.resizeStart){
                        setTimeout(function () {
                            dict.othis.find('.'+ELEM_NO_SORT).removeClass(ELEM_NO_SORT).addClass(ELEM_SORT)
                            _BODY.css('cursor', '');
                            dict = {};
                            _this.scrollPatch(myTable);
                        }, 30)
                    }
                    if(resizing === 2){
                        resizing = null;
                    }
                });
            }
        },
        fixFixedScroll: function (myTable) {
            var $table = $(myTable.elem),
                layFixed = $table.next().children('.layui-table-box').children('.layui-table-fixed'),
                layMain = $table.next().children('.layui-table-box').children('.layui-table-main');

            layFixed.on('mouseenter', function () {
                $(this).children('.layui-table-body').addClass('soul-fixed-scroll').on('scroll', function () {
                    var scrollTop = $(this).scrollTop()
                    // layFixed.children('.layui-table-body[class!="soul-fixed-scroll"]').scrollTop(scrollTop);
                    layMain.scrollTop(scrollTop);
                })
            }).on('mouseleave', function () {
                $(this).children('.layui-table-body').removeClass('soul-fixed-scroll').off('scroll');
            })
        },
        scrollPatch: function (myTable) {
            var $table = $(myTable.elem),
                layHeader = $table.next().children('.layui-table-box').children('.layui-table-header'),
                layTotal = $table.next().children('.layui-table-total'),
                layMain = $table.next().children('.layui-table-box').children('.layui-table-main'),
                layFixed = $table.next().children('.layui-table-box').children('.layui-table-fixed'),
                layFixRight = $table.next().children('.layui-table-box').children('.layui-table-fixed-r'),
                layMainTable = layMain.children('table'),
                scollWidth = layMain.width() - layMain.prop('clientWidth'),
                scollHeight = layMain.height() - layMain.prop('clientHeight'),
                outWidth = layMainTable.outerWidth() - layMain.width() //表格内容器的超出宽度

                //添加补丁
                ,addPatch = function(elem){
                    if(scollWidth && scollHeight){
                        elem = elem.eq(0);
                        if(!elem.find('.layui-table-patch')[0]){
                            var patchElem = $('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>'); //补丁元素
                            patchElem.find('div').css({
                                width: scollWidth
                            });
                            elem.find('tr').append(patchElem);
                        }
                    } else {
                        elem.find('.layui-table-patch').remove();
                    }
                }

            addPatch(layHeader);
            addPatch(layTotal);

            //固定列区域高度
            var mainHeight = layMain.height()
                ,fixHeight = mainHeight - scollHeight;
            layFixed.find('.layui-table-body').css('height', layMainTable.height() >= fixHeight ? fixHeight : 'auto');

            //表格宽度小于容器宽度时，隐藏固定列
            layFixRight[outWidth > 0 ? 'removeClass' : 'addClass'](HIDE);

            //操作栏
            layFixRight.css('right', scollWidth - 1);
        },
        /**
         * 一键粘贴
         * @param  {String} text [需要 copy 的属性，默认是 innerText，主要用途例如赋值 a 标签上的 href 链接]
         *
         * range + selection
         *
         * 1.创建一个 range
         * 2.把内容放入 range
         * 3.把 range 放入 selection
         *
         * 注意：参数 attr 不能是自定义属性
         * 注意：对于 user-select: none 的元素无效
         * 注意：当 id 为 false 且 attr 不会空，会直接复制 attr 的内容
         */
        copy: function (text) {
            var target;

            if (text) {
                target = document.createElement('div');
                target.id = 'tempTarget';
                target.style.opacity = '0';
                target.innerText = text;
                document.body.appendChild(target);
            } else {
                target = document.querySelector('#' + id);
            }

            try {
                var range = document.createRange();
                range.selectNode(target);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
            } catch (e) {
                console.log('复制失败')
            }

            if (text) {
                // remove temp target
                target.parentElement.removeChild(target);
            }
        },
        addCSSRule: function(sheet, selector, rules, index) {
            if ('insertRule' in sheet) {
                sheet.insertRule(selector + '{' + rules + '}', index)
            } else if ('addRule' in sheet) {
                sheet.addRule(selector, rules, index)
            }
        },
        deepStringify: function (obj) {
            var JSON_SERIALIZE_FIX = {
                PREFIX : "[[JSON_FUN_PREFIX_",
                SUFFIX : "_JSON_FUN_SUFFIX]]"
            };
            return JSON.stringify(obj,function(key, value){
                if(typeof value === 'function'){
                    return JSON_SERIALIZE_FIX.PREFIX+value.toString()+JSON_SERIALIZE_FIX.SUFFIX;
                }
                return value;
            });
        },
        deepParse: function (str) {
            var JSON_SERIALIZE_FIX = {
                PREFIX : "[[JSON_FUN_PREFIX_",
                SUFFIX : "_JSON_FUN_SUFFIX]]"
            };
            return JSON.parse(str,function(key, value){
                if(typeof value === 'string' &&
                    value.indexOf(JSON_SERIALIZE_FIX.SUFFIX)>0 && value.indexOf(JSON_SERIALIZE_FIX.PREFIX)===0){
                    return eval("("+value.replace(JSON_SERIALIZE_FIX.PREFIX,"").replace(JSON_SERIALIZE_FIX.SUFFIX,"")+")");
                }
                return value;
            })||{};
        },
        clearFilter: function (myTable) {
            tableFilter.clearFilter(myTable);
        },
        cache: tableFilter.cache

    }

    // 输出
    exports('soulTable', mod);
});
