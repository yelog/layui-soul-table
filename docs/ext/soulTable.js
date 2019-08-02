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

                if (typeof myTable.drag == 'undefined' || myTable.drag) {
                    this.drag(myTable);
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
                $tableHead = $table.next().children('.layui-table-box').children('.layui-table-header').children('table'),
                $tableBody = $table.next().children('.layui-table-box').children('.layui-table-body').children('table'),
                $totalTable = $table.next().children('.layui-table-total').children('table'),
                columns = [].concat.apply([], myTable.cols),
                tableId = myTable.id,
                isDraging = false, isStart = false;

            var fieldMap = {};
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].field) {
                    fieldMap[columns[i]['field']] = columns[i]
                } else if (columns[i].type==='numbers') {
                    fieldMap[i] = columns[i]
                }
            }

            if (!$tableHead.attr('drag')) {
                $tableHead.attr('drag', true);
                $tableHead.find('th').each(function () {
                    var $this = $(this);
                    if (!fieldMap[$this.data('field')] || fieldMap[$this.data('field')].fixed) {
                        return true;
                    }
                    // 绑定鼠标按下事件
                    $(this).find('span:first')
                        .css('cursor', 'move')
                        .on('mousedown', function (e) {
                            if (e.button != 0) {
                                return;
                            }
                            e.preventDefault();
                            var $cloneHead = $this.clone().css('visibility', 'hidden'),
                                originLeft = $this.position().left,
                                originTop = $this.offset().top,
                                disX = e.clientX - originLeft,
                                color = $this.parents('tr').css("background-color"),
                                width = $this.width(), moveDistince = 0,
                                $that = $(this);
                            isStart = true;
                            //区分click、drag事件


                            // 阻止文本选中
                            $(document).bind("selectstart", function () {
                                return false;
                            });

                            // 移动事件
                            $('body').on('mousemove', function (e) {
                                if (isStart && $cloneHead) {
                                    if (!isDraging) {
                                        $this.after($cloneHead);
                                        $this.css({
                                            'position': 'absolute',
                                            'z-index': 1,
                                            'border-left': '1px solid #e6e6e6',
                                            'background-color': color,
                                            'width': width + 1
                                        });

                                        $tableBody.find('td[data-field=' + $this.data('field') + ']').each(function (e) {
                                            $(this).after($(this).clone().css('visibility', 'hidden').attr('data-clone', ''));
                                            $(this).css({
                                                'position': 'absolute',
                                                'z-index': 1,
                                                'border-left': '1px solid #e6e6e6',
                                                'background-color': $(this).css('background-color'),
                                                'width': width
                                            });
                                        })
                                        if ($totalTable.length>0) {
                                            $totalTable.find('td[data-field=' + $this.data('field') + ']').each(function (e) {
                                                $(this).after($(this).clone().css('visibility', 'hidden').attr('data-clone', ''));
                                                $(this).css({
                                                    'position': 'absolute',
                                                    'z-index': 1,
                                                    'border-left': '1px solid #e6e6e6',
                                                    'background-color': $(this).css('background-color'),
                                                    'width': width
                                                });
                                            })
                                        }
                                    }
                                    isDraging = true;
                                    var left = e.clientX - disX,
                                        leftMove = $cloneHead.position().left - left > $cloneHead.prev().prev().width() / 2.0,
                                        rightMove = left - $cloneHead.position().left > $cloneHead.next().width() / 2.0;
                                    moveDistince = Math.abs($cloneHead.position().left - left); //记录移动距离
                                    if ($cloneHead.position().left - left > 0
                                        ? myTable.cols[$cloneHead.prev().prev().data('key').split('-')[1]][$cloneHead.prev().prev().data('key').split('-')[2]].fixed ||['checkbox','radio'].indexOf(myTable.cols[$cloneHead.prev().prev().data('key').split('-')[1]][$cloneHead.prev().prev().data('key').split('-')[2]].type)!==-1
                                        : myTable.cols[$cloneHead.prev().prev().data('key').split('-')[1]][$cloneHead.next().data('key').split('-')[2]].fixed || ['checkbox','radio'].indexOf(myTable.cols[$cloneHead.prev().prev().data('key').split('-')[1]][$cloneHead.next().data('key').split('-')[2]].type)!==-1) {
                                        $this.css('left',$cloneHead.position().left);
                                        $tableBody.find('td[data-field=' + $this.data('field') + '][data-clone]').each(function (e) {
                                            $(this).prev().css('left', $cloneHead.position().left);
                                        })
                                        if ($totalTable.length>0) {
                                            $totalTable.find('td[data-field=' + $this.data('field') + '][data-clone]').each(function (e) {
                                                $(this).prev().css('left', $cloneHead.position().left);
                                            })
                                        }
                                        return;
                                    }
                                    $this.css('left', left);
                                    var curKey = $this.data('key').split('-')[1] + '-' + $this.data('key').split('-')[2]
                                    if (leftMove) {
                                        if ($cloneHead.prev().prev().length != 0) {
                                            $cloneHead.after($cloneHead.prev().prev());

                                            // 更新隐藏列顺序
                                            $('#soul-columns' + tableId + '>li[data-value=' + $this.data('field') + ']').after($('#soul-columns' + tableId + '>li[data-value=' + $this.data('field') + ']').prev())

                                            // 更新配置信息
                                            var x, y;
                                            for (var i = 0; i < myTable.cols.length; i++) {
                                                for (var j = 0; j < myTable.cols[i].length; j++) {
                                                    if (myTable.cols[i][j].key === curKey) {
                                                        x = i;
                                                        y = j;
                                                        break;
                                                    }
                                                }
                                                if (typeof x != 'undefined' && typeof y != 'undefined') {
                                                    break;
                                                }
                                            }
                                            var tempCols = myTable.cols[x][y - 1];
                                            myTable.cols[x][y - 1] = myTable.cols[x][y];
                                            myTable.cols[x][y] = tempCols;
                                            if (myTable.filter && myTable.filter.cache) {
                                                localStorage.setItem(location.pathname + location.hash + myTable.id, _this.deepStringify(myTable.cols))
                                            }
                                        }
                                    } else if (!$cloneHead.next().hasClass('layui-table-patch') && rightMove) {
                                        if ($cloneHead.next().length != 0) {
                                            $cloneHead.prev().before($cloneHead.next());

                                            // 更新隐藏列顺序
                                            $('#soul-columns' + tableId + '>li[data-value=' + $this.data('field') + ']').before($('#soul-columns' + tableId + '>li[data-value=' + $this.data('field') + ']').next())

                                            // 更新配置信息
                                            var x, y;
                                            for (var i = 0; i < myTable.cols.length; i++) {
                                                for (var j = 0; j < myTable.cols[i].length; j++) {
                                                    if (myTable.cols[i][j].key == curKey) {
                                                        x = i;
                                                        y = j;
                                                        break;
                                                    }
                                                }
                                                if (typeof x != 'undefined' && typeof y != 'undefined') {
                                                    break;
                                                }
                                            }
                                            var tempCols = myTable.cols[x][y + 1];
                                            myTable.cols[x][y + 1] = myTable.cols[x][y];
                                            myTable.cols[x][y] = tempCols;
                                            if (myTable.filter && myTable.filter.cache) {
                                                localStorage.setItem(location.pathname + location.hash + myTable.id, _this.deepStringify(myTable.cols))
                                            }
                                        }
                                    }

                                    $tableBody.find('td[data-field=' + $this.data('field') + '][data-clone]').each(function (e) {
                                        $(this).prev().css('left', left);

                                        if (leftMove) {
                                            if ($(this).prev().prev().length != 0) {
                                                $(this).after($(this).prev().prev());
                                            }
                                        } else if (rightMove) {
                                            if ($(this).next().length != 0) {
                                                $(this).prev().before($(this).next());
                                            }
                                        }
                                    })
                                    if ($totalTable.length>0) {
                                        $totalTable.find('td[data-field=' + $this.data('field') + '][data-clone]').each(function (e) {
                                            $(this).prev().css('left', left);

                                            if (leftMove) {
                                                if ($(this).prev().prev().length != 0) {
                                                    $(this).after($(this).prev().prev());
                                                }
                                            } else if (rightMove) {
                                                if ($(this).next().length != 0) {
                                                    $(this).prev().before($(this).next());
                                                }
                                            }
                                        })
                                    }

                                    /* 拖动隐藏列 */
                                    if (e.clientY - originTop < -15) {
                                        if ($('#column-remove').length == 0) {
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
                                        $that.on('click', function (e) {
                                            e.stopPropagation();
                                        });
                                        isDraging = false;
                                        $this.css({
                                            'position': 'relative',
                                            'z-index': 'inherit',
                                            'left': 'inherit',
                                            'border-left': 'inherit',
                                            'background-color': 'inherit'
                                        });
                                        $this.next().remove();
                                        $tableBody.find('td[data-field=' + $this.data('field') + '][data-clone]').each(function (e) {
                                            $(this).prev().css({
                                                'position': 'relative',
                                                'z-index': 'inherit',
                                                'left': 'inherit',
                                                'border-left': 'inherit',
                                                'background-color': 'inherit'
                                            });
                                            $(this).remove();
                                        });
                                        if ($totalTable.length>0) {
                                            $totalTable.find('td[data-field=' + $this.data('field') + '][data-clone]').each(function (e) {
                                                $(this).prev().css({
                                                    'position': 'relative',
                                                    'z-index': 'inherit',
                                                    'left': 'inherit',
                                                    'border-left': 'inherit',
                                                    'background-color': 'inherit'
                                                });
                                                $(this).remove();
                                            });
                                        }
                                        $cloneHead = null;
                                    } else {
                                        $that.unbind('click');
                                    }
                                    if ($('#column-remove').is(':visible')) {
                                        $this.data('field');
                                        $table.next().children('.layui-table-box').children('.layui-table-header').find('thead>tr>th[data-field=' + $this.data('field') + ']').addClass(HIDE);
                                        $table.next().children('.layui-table-box').children('.layui-table-body').find('tbody>tr>td[data-field=' + $this.data('field') + ']').addClass(HIDE);
                                        $table.next().children('.layui-table-total').find('tbody>tr>td[data-field=' + $this.data('field') + ']').addClass(HIDE);
                                        if ($this.data('fixed')) {
                                            $table.next().children('.layui-table-box').children('.layui-table-fixed-' + $this.data('fixed').substr(0, 1)).find('[data-field=' + $this.data('field') + ']').addClass(HIDE);
                                        }
                                        // 同步配置
                                        for (var i = 0; i < columns.length; i++) {
                                            if (columns[i].field && columns[i].field == $this.data('field')) {
                                                columns[i]['hide'] = true;
                                            }
                                        }
                                        if (myTable.filter && myTable.filter.cache) {
                                            localStorage.setItem(location.pathname + location.hash + myTable.id, _this.deepStringify(myTable.cols))
                                        }
                                        // 更新下拉隐藏
                                        $('#soul-columns' + tableId).find('li[data-value="' + $this.data('field') + '"]>input').prop('checked', false);
                                    }
                                    $('#column-remove').hide();
                                }
                            })
                        });
                })
            }
        },

        fixTableRemember: function(myTable, dict) {
            if (myTable.filter && myTable.filter.cache) {
                myTable.cols[dict.rule.selectorText.split('-')[3]][dict.rule.selectorText.split('-')[4]].width = dict.rule.style.width.replace('px','');
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
                    value.indexOf(JSON_SERIALIZE_FIX.SUFFIX)>0 && value.indexOf(JSON_SERIALIZE_FIX.PREFIX)==0){
                    return eval("("+value.replace(JSON_SERIALIZE_FIX.PREFIX,"").replace(JSON_SERIALIZE_FIX.SUFFIX,"")+")");
                }
                return value;
            })||{};
        },
        cache: tableFilter.cache

    }

    // 输出
    exports('soulTable', mod);
});
