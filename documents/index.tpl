<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="//at.alicdn.com/t/font_137970_p1tpzmomxp9cnmi.css">
    <link rel="stylesheet" href="layui/css/layui.css">
    <link rel="stylesheet" href="codemirror/codemirror.css">
    <link rel="stylesheet" href="soulTable.css" media="all"/>
    <title>示例文档 | layui-soul-table</title>
    <meta name="description" content="layui-soul-table 为layui table 扩展的 表头筛选, 表格筛选, 子表, 父子表, 列拖拽, excel导出" />
    <style>
        #runjsParent #runjs{
            display: none;
            height: 100%;
      }
      #runjs .layui-row {
        height: 100%;
      }
      #runjs .layui-row>div{
        height: 97%;
      }
      #runjs .site-demo-btn {
            position: absolute;
            bottom: 15px;
            right: 20px;
            z-index: 10000;
      }
      #runjs .CodeMirror {
          width: 100%;
          height: 100%;
      }
      #runjsDemo {
        width: 100%;
        height: 100%;
        border: none;
      }
    </style>
  </head>
  <body>
    <script>
      if (!window.Promise) {
        document.write('<script src="//cdn.jsdelivr.net/npm/es6-promise@4.1.1/dist/es6-promise.min.js"><\/script><script>ES6Promise.polyfill()<\/script>')
      }
    </script>
    <div id="app"></div>
     <div id="runjsParent">
      <div id="runjs">
        <div class="layui-row">
          <div class="layui-col-xs6">
            <textarea id="code"></textarea>
            <div class="site-demo-btn">
              <a type="button" class="layui-btn" id="LAY_demo_run">运行代码</a>
            </div>
          </div>
          <div class="layui-col-xs6">
            <iframe id="runjsDemo" src='runjs.html' >

            </iframe>
          </div>
        </div>
      </div>
    </div>
    <script src="layui/layui.js"></script>
    <script src="codemirror/codemirror.js"></script>
    <script src="codemirror/selection-pointer.js"></script>
    <script src="codemirror/xml.js"></script>
    <script src="codemirror/javascript.js"></script>
    <script src="codemirror/css.js"></script>
    <script src="codemirror/htmlmixed.js"></script>
    <% if (process.env.NODE_ENV === 'production') { %>
      <script src="//shadow.elemecdn.com/npm/vue@2.5.21/dist/vue.runtime.min.js"></script>
      <script src="//shadow.elemecdn.com/npm/vue-router@3.0.1/dist/vue-router.min.js"></script>
      <script src="//shadow.elemecdn.com/app/element/highlight.pack.b1f71b31-3c07-11e9-ba1a-55bba1877129.js"></script>
    <% } %>
  </body>
  <% if (process.env.NODE_ENV === 'production') { %><script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-84335471-1', 'auto');
    ga('send', 'pageview');

    window.addEventListener('hashchange', function () {
      ga('set', 'page', window.location.href);
      ga('send', 'pageview');
    });
  </script><% } %>
  <% if (process.env.NODE_ENV !== 'production') { %><script>
    var ga = function() {
      console.log(arguments)
    };
  </script><% } %>
  <script>
  // 自定义模块
      layui.config({
          base: 'ext/',   // 模块目录
          version: 'v1.3.28'
      }).extend({                         // 模块别名
          soulTable: 'soulTable'
      });
      var tableFilter;
      layui.use('tableFilter', function() {
        tableFilter = layui.tableFilter,

        layui.$.ajax({
            url: 'runjs.html',
            dataType: 'html',
            success: function(res) {
                $('#runjs textarea').val(res)
            }
        })
        layui.$('#LAY_demo_run').on('click', function() {
            var ifr = document.getElementById("runjsDemo");
            var code = window.editor.getValue();
            ifr.contentWindow.document.body.innerHTML = "";
            ifr.contentWindow.document.write(code);
        })
     })
  </script>
</html>
