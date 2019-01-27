/**
 * Created by YujieYang.
 * @name:  表格筛选扩展
 * @author: 杨玉杰
 */
layui.define(['tableFilter', 'tableChild'], function (exports) {

    var tableFilter = layui.tableFilter,
        tableChild = layui.tableChild;

    // 封装方法
    var mod = {
        render: function (myTable) {
            tableFilter.render(myTable);
            tableChild.render(myTable);
        }
    }

    // 输出
    exports('soulTable', mod);
});