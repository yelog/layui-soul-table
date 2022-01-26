<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="//at.alicdn.com/t/font_137970_p1tpzmomxp9cnmi.css">
    <link rel="stylesheet" href="layui/css/layui.css">
    <link rel="stylesheet" href="codemirror/codemirror.css">
    <link rel="stylesheet" href="codemirror/darcula.css">
    <link rel="stylesheet" href="soulTable.css" media="all"/>
    <title>示例文档 | layui-soul-table</title>
    <meta name="description" content="layui-soul-table 为layui table 扩展的 表头筛选, 表格筛选, 子表, 父子表, 列拖拽, excel导出" />
    <style>
        #runjsParent #runjs{
            display: none;
            height: 100%;
            width: 100%
      }
      #runjs .runParent {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
      }
      .editArea {
        width: 50%;
        position: relative;
      }
      .resize-handle {
        display: none;
        border-radius: 15px;
        background: grey;
        color: white;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
        font-weight: 800;
        cursor: col-resize;
        height: 30px;
        width: 30px;
        position: absolute;
        z-index: 99999;
        left: 100%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      .resize-cover {
        display: none;
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 99998
      }
      .showArea {
        flex: 1
      }
      #runjs .site-demo-btn {
            position: absolute;
            bottom: 20px;
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
      #commonTpl {
        display: none
      }
    </style>
  </head>
  <body>
  <script src="layui/layui.js"></script>
    <script>
      if (!window.Promise) {
        document.write('<script src="//cdn.jsdelivr.net/npm/es6-promise@4.1.1/dist/es6-promise.min.js"><\/script><script>ES6Promise.polyfill()<\/script>')
      }
      // 自定义模块
        layui.config({
            base: 'ext/',   // 模块目录
            version: 'v1.6.4'
        }).extend({                         // 模块别名
            soulTable: 'soulTable'
        });
        var $, layer;
        layui.use(['jquery', 'layer'], function() {
          $ = layui.$;
          layer = layui.layer;
          $.ajax({
                url: 'runjs.html',
                dataType: 'html',
                success: function(res) {
                    $('#runjs textarea').val(res)
                }
            })
            $('#LAY_demo_run').on('click', function() {
                var ifr = document.getElementById("runjsDemo");
                var code = window.editor.getValue();
                ifr.contentWindow.document.body.innerHTML = "";
                ifr.contentWindow.document.write(code);
            })

        // 在线运行 resize
         var dict = {}, _BODY=$('body'), _DOC = $(document), _HANDLE = $('.resize-handle'), _COVER = $('.resize-cover');
         $('.editArea').on('mousemove', function(e){
               var othis = $(this)
               ,oLeft = othis.offset().left
               ,pLeft = e.clientX - oLeft;
               dict.allowResize = othis.width() - pLeft <= 15; //是否处于拖拽允许区域
               _BODY.css('cursor', (dict.allowResize ? 'col-resize' : ''));
               _HANDLE.css('display', (dict.allowResize ? 'block' : 'none'))

             }).on('mouseleave', function(){
               var othis = $(this);
               if(dict.resizeStart) return;
               _BODY.css('cursor', '');
               _HANDLE.hide();
               _COVER.hide();
             }).on('mousedown', function(e){
               var othis = $(this);
               if(dict.allowResize){
                 e.preventDefault();
                 _COVER.show();
                 _HANDLE.show();
                 dict.resizeStart = true; //开始拖拽
                 dict.offset = [e.clientX, e.clientY]; //记录初始坐标
                 dict.ruleWidth = othis.width()
                 dict.othis = othis
               }
             });

             //拖拽中
             _DOC.on('mousemove', function(e){
               if(dict.resizeStart){
                 e.preventDefault();
                 if(dict.othis){
                   var setWidth = dict.ruleWidth + e.clientX - dict.offset[0];
                   dict.othis.css('width', setWidth + 'px');
                 }
               }
             }).on('mouseup', function(e){
               if(dict.resizeStart){
                 dict = {};
                 _BODY.css('cursor', '');
                 _HANDLE.hide();
                 _COVER.hide();
               }
             });
      })
    </script>
    <div id="app"></div>
     <div id="runjsParent">
      <div id="runjs">
        <div class='runParent'>
             <div class="editArea">
                <textarea id="code"></textarea>
                <div class="site-demo-btn">
                  <a type="button" class="layui-btn" id="LAY_demo_run">运行代码</a>
                </div>
                <div class='resize-handle layui-icon layui-icon-screen-full'></div>
              </div>
              <div class="showArea">
                <iframe id="runjsDemo" src='runjs.html' >

                </iframe>
              </div>
              <div class='resize-cover'>

              </div>
        </div>
      </div>
    </div>
    <div id="commonTpl"></div>

    <script src="codemirror/codemirror.js"></script>
    <script src="codemirror/selection-pointer.js"></script>
    <script src="codemirror/xml.js"></script>
    <script src="codemirror/javascript.js"></script>
    <script src="codemirror/css.js"></script>
    <script src="codemirror/htmlmixed.js"></script>
  </body>
  <script>
     function HTMLDecode(text) {
     var temp = document.createElement("div");
     temp.innerHTML = text;
     var output = temp.innerText || temp.textContent;
     temp = null;
     return output;
     }
     function showRunJs(runJsTpl) {
        layer.open({
         type: 1,
         title: 'soulTable 在线运行',
         content: $('#runjs'),
         maxmin: true,
         area: ['90%', '90%'],
         success: function () {
           if (runJsTpl) {
              $('#runjs textarea').val(runJsTpl)
           } else {
                $.ajax({
                   url: 'runjs.html',
                   async: false,
                   dataType: 'html',
                   success: function(res) {
                       $('#runjs textarea').val(res)
                   }
                })
           }
           $('#runjs .CodeMirror').remove();
           var mixedMode = {
             name: "htmlmixed",
             scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
               mode: null},
               {matches: /(text|application)\/(x-)?vb(a|script)/i,
                 mode: "vbscript"}]
           };
           window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
             mode: mixedMode,
             // 显示行号
             lineNumbers:true,
             // 括号匹配
             matchBrackets:true,
             theme: "darcula",
             tabSize: 4,
             selectionPointer: true
           });
           var ifr = document.getElementById("runjsDemo");
           var code = window.editor.getValue();
           ifr.contentWindow.document.body.innerHTML = "";
           ifr.contentWindow.document.write(code);
         }
       })
     }
  </script>
</html>
