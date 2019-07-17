/*
* @Author: Jeffrey Wang
* @Desc:  整理强大的 SheetJS 功能，依赖 XLSX.js 和 FileSaver
* @Version: v1.4
* @Date:   2018-03-24 09:54:17
* @Last Modified by:   Jeffrey Wang
* @Last Modified time: 2019-01-15 11:49:09
*/
layui.define(['jquery', 'xlsx', 'FileSaver'], function(exports){
	var $ = layui.jquery;
	exports('excel', {
		/**
		 * 兼容老版本的导出函数
		 * @param  {[type]} data     [description]
		 * @param  {[type]} filename [description]
		 * @param  {[type]} type     [description]
		 * @return {[type]}          [description]
		 */
		downloadExl: function(data, filename, type) {
			type = type ? type : 'xlsx';
			this.exportExcel({sheet1: data}, filename+'.'+type, type);
		},
		/**
		 * 导出Excel并弹出下载框，具体使用方法和范围请参考文档
		 * @param  {[type]} data     [description]
		 * @param  {[type]} filename [description]
		 * @param  {[type]} type     [description]
		 * @param  {[type]} opt      [description]
		 * @return {[type]}          [description]
		 */
		exportExcel : function(data, filename, type, opt) {
			type = type ? type : 'xlsx';
			filename = filename ? filename : '导出数据.'+type;

			// 创建一个 XLSX 对象
			var wb = XLSX.utils.book_new();
			// 1. 定义excel对的基本属性
			var Props = {
				Title: filename,
				Subject: 'Export From web browser',
				Author: "excel.wj2015.com",
				Manager: '',
				Company: '',
				Category: '',
				Keywords: '',
				Comments: '',
				LastAuthor: '',
				CreatedData: new Date(),
			};
			opt && opt.Props && (Props = $.extend(Props, opt.Props));
			wb.Props = Props;
			// 特殊属性实现，比如合并单元格
			var wbExtend = {
				'!merges': null
				,'!margins': null
				,'!cols': null
				,'!rows': null
				,'!protect': null
				,'!autofilter': null
			};
			opt && opt.extend && (wbExtend = $.extend(wbExtend, opt.extend));
			// 清理空配置
			for (key in wbExtend) {
				if (!wbExtend[key]) {
					delete wbExtend[key];
				}
			}

			for(sheet_name in data) {
				var content = data[sheet_name];
				// 2. 设置sheet名称
				wb.SheetNames.push(sheet_name);
				// 3. 分配工作表对象到 sheet
				var is_aoa = false;
				if (content.length && content[0] && $.isArray(content[0])) {
					is_aoa = true;
				}
				if (is_aoa) {
					var ws = XLSX.utils.aoa_to_sheet(content);
				} else {
					var option = {};
					if (content.length) {
						option.headers = content.unshift();
						option.skipHeader = true;
						// 分离并重组样式
						var splitRes = this.splitContent(content);
					}
					var ws = XLSX.utils.json_to_sheet(content, option);
					// 特殊属性，支持单独设置某个sheet的属性
					if (wbExtend[sheet_name]) {
						$.extend(ws, wbExtend[sheet_name]);
					} else {
						$.extend(ws, wbExtend);
					}
					// 合并样式
					if (typeof splitRes != 'undefined') {
						this.mergeCellOpt(ws, splitRes.style);
					}
				}
				wb.Sheets[sheet_name] = ws;
			};

			// 4. 输出工作表
			var wbout = XLSX.write(wb, {bookType: type, type: 'binary', cellStyles: true});

			// 5. 跨浏览器支持，采用 FileSaver 三方库
			saveAs(new Blob([this.s2ab(wbout)], {type: "application/octet-stream"}), filename);
		},
		/**
		 * 分离内容和样式
		 * @param  {[type]} content [description]
		 * @return {[type]}         [description]
		 */
		splitContent: function(content) {
			var styleContent = {};
			// 扫描每个单元格，如果是对象则等表格转换完毕后分离出来重新赋值
			for (line in content) {
				var lineData = content[line];
				var rowIndex = 0;
				for (row in lineData) {
					var rowData = lineData[row];
					var t = typeof rowData;
					if (typeof rowData == 'object') {
						// typeof null == object
						if (rowData !== null) {
							styleContent[this.numToTitle(rowIndex+1)+(parseInt(line)+1)] = rowData;
						} else {
							lineData[row] = '';
						}
					}
					rowIndex++;
				}
			}
			return {
				content: content,
				style: styleContent,
			};
		},
		/**
		 * 合并内容和样式
		 * @param  {[type]} ws    [description]
		 * @param  {[type]} style [description]
		 * @return {[type]}       [description]
		 */
		mergeCellOpt: function(ws, style) {
			for (var row in style) {
				var rowOpt = style[row];
				if (ws[row]) {
					// 其他属性做一个初始化
					var otherOpt = ['t', 'w', 'f', 'r', 'h', 'c', 'z', 'l', 's'];
					for (var i in otherOpt) {
						ws[row][otherOpt[i]] = ws[row][otherOpt[i]];
					}
					$.extend(ws[row], rowOpt);
				}
			}
		},
		// 测试代码：
		// 		for(i=1;i<100;i++){var change = layui.excel.numToTitle(i);console.log(i, change, layui.excel.titleToNum(change));}
		// numsToTitle备忘录提效
		numsTitleCache: {},
		// titleToTitle 备忘录提效
		titleNumsCache: {},
		/**
		 * 将数字(从一开始)转换为 A、B、C...AA、AB
		 * @param  {[type]} num [description]
		 * @return {[type]}     [description]
		 */
		numToTitle: function(num) {
			if (this.numsTitleCache[num]) {
				return this.numsTitleCache[num];
			}
			if (num > 26) {
				// 要注意小心 26 的倍数导致的无线递归问题
				var dec = num % 26;
				var ans = this.numToTitle((num - dec)/26) + this.numToTitle(dec?dec:26);
				this.numsTitleCache[num] = ans;
				this.titleNumsCache[ans] = num;
				return ans;
			} else {
				// A 的 ascii 为 0，顺位相加
				var ans = String.fromCharCode(64 + num);
				this.numsTitleCache[num] = ans;
				this.titleNumsCache[ans] = num;
				return ans;
			}
		},
		/**
		 * 将A、B、AA、ABC转换为 1、2、3形式的数字
		 * @param  {[type]} title [description]
		 * @return {[type]}       [description]
		 */
		titleToNum: function(title) {
			if (this.titleNumsCache[title]) {
				return this.titleNumsCache[title];
			}
			var len = title.length;
			var total = 0;
			var char = title;
			var code = char.charCodeAt() - 64;
			total += code * Math.pow(26, len - index - 1);
			this.numsTitleCache[total] = title;
			this.titleNumsCache[title] = total;
			return total;
		},
		/**
		 * 合并单元格快速生成配置的函数 传入 [ ['开始坐标 A1', '结束坐标 D2'], ['开始坐标 B2', '结束坐标 E3'] ]
		 * @param  {[type]} origin [description]
		 * @return {[type]}        [description]
		 */
		makeMergeConfig: function(origin) {
			var merge = [];
			for (var index in origin) {
				merge.push({
					s: this.splitPosition(origin[index][0]),
					e: this.splitPosition(origin[index][1]),
				});
			}
			return merge;
		},
		/**
		 * 自动生成列宽配置
		 * @param  {[type]} data    [description]
		 * @param  {[type]} defaultNum [description]
		 * @return {[type]}         [description]
		 */
		makeColConfig: function(data, defaultNum) {
			defaultNum = defaultNum > 0 ? defaultNum : 50;
			// 将列的 ABC 转换为 index
			var change = [];
			var startIndex = 0;
			for (index in data) {
				var item = data[index];
				if (index.match && index.match(/[A-Z]*/)) {
					var currentIndex = this.titleToNum(index) - 1;
					// 填充未配置的单元格
					while (startIndex < currentIndex) {
						change.push({wpx: defaultNum});
						startIndex++;
					}
					startIndex = currentIndex+1;
					change.push({wpx: item > 0 ? item : defaultNum});
				}
			};
			return change;
		},
		/**
		 * 自动生成列高配置
		 * @param  {[type]} data    [description]
		 * @param  {[type]} defaultNum [description]
		 * @return {[type]}         [description]
		 */
		makeRowConfig: function(data, defaultNum) {
			defaultNum = defaultNum > 0 ? defaultNum : 10;
			// 将列的 ABC 转换为 index
			var change = [];
			var startIndex = 0;
			for (index in data) {
				var item = data[index];
				if (index.match && index.match(/[0-9]*/)) {
					var currentIndex = parseInt(index) - 1;
					// 填充未配置的行
					while (startIndex < currentIndex) {
						change.push({hpx: defaultNum});
						startIndex++;
					}
					startIndex = currentIndex+1;
					change.push({hpx: item > 0 ? item : defaultNum});
				}
			};
			return change;
		},
		/**
		 * 将A1分离成 {c: 0, r: 1} 格式的数据
		 * @param  {[type]} pos [description]
		 * @return {[type]}     [description]
		 */
		splitPosition: function(pos) {
			var res = pos.match('^([A-Z]+)([0-9]+)$');
			if (!res) {
				return false;
			}
			// 转换结果相比需要的结果需要减一转换
			return {
				c: this.titleToNum(res[1]) - 1,
				r: parseInt(res[2]) - 1
			}
		},
		/**
		 * 将二进制数据转为8位字节
		 * @param  {[type]} s [description]
		 * @return {[type]}   [description]
		 */
		s2ab: function(s) {
			var buf = new ArrayBuffer(s.length);
			var view = new Uint8Array(buf);
			for (var i = 0; i < s.length; i++) {
				view[i] = s.charCodeAt(i) & 0xFF;
			}
			return buf;
		},
		/**
		 * 将导出的数据格式，转换为可以aoa导出的格式
		 * @return {[type]} [description]
		 */
		filterDataToAoaData: function(filterData){
			var aoaData = [];
			layui.each(filterData, function(index, item) {
				var itemData = [];
				for (var i in item) {
					itemData.push(item[i]);
				}
				aoaData.push(itemData);	
			});
			return aoaData;
		},
		/**
		 * 梳理导出的数据，包括字段排序和多余数据过滤，具体功能请参见文档
		 * @param  {[type]} data   [需要梳理的数据]
		 * @param  {[type]} fields [支持数组和对象，用于映射关系和字段排序]
		 * @return {[type]}        [description]
		 */
		filterExportData: function(data, fields) {
			// PS:之所以不直接引用 data 节省内存，是因为担心如果 fields 可能存在如下情况： { "id": 'test_id', 'test_id': 'new_id' }，会导致处理异常
			var exportData = [];
			var true_fields = {};
			// filed 支持两种模式，数组则单纯排序，对象则转换映射关系，为了统一处理，将数组转换为符合要求的映射关系对象
			if (Array.isArray(fields)) {
				for (var i in fields) {
					true_fields[fields[i]] = fields[i]
				}
			} else {
				true_fields = fields;
			}
			for (i = 0; i < data.length; i++) {
				var item = data[i];
				exportData[i] = {};
				for (var key in true_fields) {
					var new_field_name = key;
					var old_field_name = true_fields[key];
					// 如果传入的是回调，则回调的值则为新值
					if (typeof old_field_name == 'function' && old_field_name.apply) {
						exportData[i][new_field_name] = old_field_name.apply(window, [new_field_name, item, data, i]);
					} else {
						if (typeof item[old_field_name] != 'undefined') {
							exportData[i][new_field_name] = item[old_field_name];
						} else {
							exportData[i][new_field_name] = '';
						}
					}
					if (i!=0 && new_field_name === 'LAY_TABLE_INDEX') {
						exportData[i][new_field_name].v = i
					}
				}
			}
			return exportData;
		},
		/**
		 * 梳理导入的数据，参数意义可参考 filterExportData
		 * @param  {[type]} data   [description]
		 * @param  {[type]} fields [description]
		 * @return {[type]}        [description]
		 */
		filterImportData: function(data, fields) {
			var that = this;
			layui.each(data, function(fileindex, xlsx) {
				layui.each(xlsx, function(sheetname, content) {
					xlsx[sheetname] = that.filterExportData(content, fields);
				});
			});
			return data;
		},
		/**
		 * 读取Excel，支持多文件多表格读取
		 * @param  {[type]}   files    [description]
		 * @param  {[type]}   opt      [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		importExcel: function(files, opt, callback) {
			var option = {
				header: 'A',
				range: null,
				fields: null,
			};
			$.extend(option, opt);
			var that = this;

			if (files.length < 1) {
				throw {code: 999, 'message': '传入文件为空'};
			}
			var supportReadMime = [
				'application/vnd.ms-excel',
				'application/msexcel',
				'application/x-msexcel',
				'application/x-ms-excel',
				'application/x-excel',
				'application/x-dos_ms_excel',
				'application/xls',
				'application/x-xls',
				'application/vnd-xls',
				'application/csv',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			];
			layui.each(files, function(index, item) {
				if (supportReadMime.indexOf(item.type) == -1) {
					throw {code: 999, message: item.name+'（'+item.type+'）为不支持的文件类型'};
				}
			});

			// 按照二进制读取
			var data = {};
			layui.each(files, function(index, item) {
				var reader = new FileReader();
				if (!reader) {
					throw {code: 999, message: '不支持FileReader，请更换更新的浏览器'};
				}
				// 读取excel表格对象
				reader.onload = function(ev) {
					var wb = XLSX.read(ev.target.result, {
						type: 'binary',
					});
					var excelData = {};
					layui.each(wb.Sheets, function(sheet, sheetObj) {
						// 全为空的去掉
						if (wb.Sheets.hasOwnProperty(sheet)) {
							var opt = {
								header: option.header,
							}
							if (!option.range) {
								opt.range = option.range;
							}
							excelData[sheet] = XLSX.utils.sheet_to_json(sheetObj, opt);
							// 支持梳理数据
							if (option.fields) {
								excelData[sheet] = that.filterExportData(excelData[sheet], option.fields);
							}
						}
					});
					data[index] = excelData;
					// 全部读取完毕才执行
					if (index == files.length - 1) {
						callback && callback.apply && callback.apply(window, [data]);
					}
				}
				reader.readAsBinaryString(item);
			});
		}
	});
});
