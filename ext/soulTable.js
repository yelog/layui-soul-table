/**
 * Created by YujieYang.
 * @name:  表格筛选扩展
 * @author: 杨玉杰
 * @version: 1.0
 */
layui.define(['table', 'tableFilter', 'tableChild', 'tableMerge'], function (exports) {

    var tableFilter = layui.tableFilter,
        tableChild = layui.tableChild,
        tableMerge = layui.tableMerge,
        $ = layui.$,
        table = layui.table,
        HIDE = 'layui-hide',
        isFirst = true; // 第一次加载表格

    // 封装方法
    var mod = {
        render: function (myTable) {
            var curTableSession = localStorage.getItem(location.pathname + location.hash + myTable.id);

            if (myTable.filter && myTable.filter.cache && isFirst && curTableSession) {
               myTable.cols = this.deepParse(curTableSession);
               isFirst = false;
               table.reload(myTable.id, myTable)
            } else {
                tableFilter.render(myTable);
                tableChild.render(myTable);
                tableMerge.render(myTable);

                if (typeof myTable.drag === 'undefined' || myTable.drag) {
                    this.drag(myTable);
                }
                if (myTable.rowDrag) {
                    this.rowDrag(myTable)
                }
                this.autoColumnWidth(myTable)
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
        , autoColumnWidth: function (myTable) {
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
            var getCssRule = function(that, key, callback){
                var style = that.elem.next().find('style')[0]
                    ,sheet = style.sheet || style.styleSheet || {}
                    ,rules = sheet.cssRules || sheet.rules;
                layui.each(rules, function(i, item){
                    if(item.selectorText === ('.laytable-cell-'+ key)){
                        return callback(item), true;
                    }
                });
            };
            th.add(fixTh).on('dblclick', function(e){
                var othis = $(this)
                    ,field = othis.data('field')
                    ,key = othis.data('key')
                    ,oLeft = othis.offset().left
                    ,pLeft = e.clientX - oLeft;
                if(othis.attr('colspan') > 1){
                    return;
                }
                if (othis.width() - pLeft<=10) {
                    var maxWidth = othis.text().width(othis.css('font'))+21, font = othis.css('font');
                    $tableBodytr.children('td[data-field="'+field+'"]').each(function (index, elem) {
                        var curWidth = $(this).text().width(font);
                        if ( maxWidth <curWidth) {
                            maxWidth = curWidth
                        }
                    })

                    maxWidth +=32;

                    getCssRule(myTable, key, function(item){
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
            })
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
                                            if (!isInFixed && $totalTable.length>0) {
                                                $totalTable.find('td[data-key="' + key + '"]').each(function () {
                                                    $(this).after($(this).clone().css('visibility', 'hidden').attr('data-clone', ''));
                                                    $(this).addClass('isDrag').css({
                                                        'position': 'absolute',
                                                        'z-index': 1,
                                                        'border-left': '1px solid #e6e6e6',
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
                                        $('#soul-columns' + tableId + '>li[data-value=' + field + ']').after($('#soul-columns' + tableId + '>li[data-value=' + field + ']').prev())

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
                                        $('#soul-columns' + tableId + '>li[data-value=' + field + ']').before($('#soul-columns' + tableId + '>li[data-value=' + field + ']').next())

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
                                        } else {
                                            $tableBody.find('td[data-key="' + key + '"][data-clone]').each(function () {
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
                                                $totalTable.find('td[data-key="' + key + '"][data-clone]').each(function () {
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
                                            }
                                        }

                                        $cloneHead = null;

                                        // 处理 toolbar 事件
                                        if (toolbar) {
                                            if ($dragBar.children('.active').length > 0 && $dragBar.children('.active').attr('data-type') !== $dragBar.attr('data-type')) {
                                                var targetFix = $dragBar.children('.active').attr('data-type'),
                                                    i, j, curPos, targetPos;
                                                console.log('移动到' + targetFix)
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
                $totalTable = $table.next().children('.layui-table-total').children('table'),
                tableId = myTable.id,
                isDraging = false;
            $tableBody.children('tbody').children('tr').on('mousedown', function (e) {
                if (e.button !== 0) {
                    return;
                }
                e.preventDefault();

                var $this = $(this),
                    index = parseInt($this.data('index')),
                    $bodyTr = $noFixedBody.children('tbody').children('tr[data-index='+ index +']'),
                    $cloneTr = $bodyTr.clone().css('visibility', 'hidden'),
                    $FixBodyTr = $fixedBody.children('tbody').children('tr[data-index='+ index +']'),
                    originTop = $this.position().top,
                    disY = e.clientY - originTop; // 鼠标距离被移动元素上侧的距离

                $('body').on('mousemove', function (e) {

                    if (!isDraging) {
                        isDraging = true;
                        // 设置鼠标样式
                        $table.next().find('style').append('.layui-table-view .layui-table td{cursor: move;}.layui-table tr{transition: none}')

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

                    var top = e.clientY - disY, // 计算当前被移动列左侧位置应该哪里
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

                        $bodyTr.css({'position': 'initial','z-index': 'inherit'});
                        $bodyTr.next().remove();
                        $FixBodyTr.each(function () {
                            $(this).css({'position': 'initial','z-index': 'inherit'});
                            $(this).next().remove()
                        })

                        // 恢复样式
                        var style = $table.next().find('style')[0],
                            sheet = style.sheet || style.styleSheet || {},
                            rules = sheet.cssRules || sheet.rules;
                        layui.each(rules, function(i, item){
                            if(item.selectorText === ('.layui-table-view .layui-table td')){
                                item.style.cursor = 'default';
                            } else if (item.selectorText === '.layui-table tr') {
                                item.style.transition = 'all .3s'
                            }
                        });

                        var newIndex = $this.index();
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
