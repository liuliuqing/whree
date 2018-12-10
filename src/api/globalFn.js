export const globalFn = {
	data() {
		return {}
	},
	methods: {
		//格式化时间,可以转以下四种情况：
		// a. 20170101091030 → 2017-01-01 09:10:30
		// b. 20170101       → 2017-01-01
		// c. 091030         → 09:10:30
		// d. new Date       → 2017-01-01(举个例子，事实上不是2017-01-01,是相应的年月日，这个用来转换查询条件的开始时间和结束时间)
		// t: 判断是否需要获取时间, 默认是不需要
		M_dateFormat(date, t) {
			if (!date) {
				return ''
			}
			let strDate = '' // 必须写 = ''，不能直接写let strDate,因为default里面要用到字符串拼接
			switch ((date + '').length) {
				case 14:
					strDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2) +
						" " + date.substr(8, 2) + ":" + date.substr(10, 2) + ":" + date.substr(12, 2)
					break

				case 8:
					strDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2)
					break

				case 6:
					strDate = date.substr(0, 2) + ":" + date.substr(2, 2) + ":" + date.substr(4, 2)
					break

				case 42: // 查询条件的开始时间和结束时间的情况
					let ymdArr = [
						date.getFullYear(),
						(date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1),
						date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
					]
					strDate = ymdArr.join('-')
					if (t) {
						let objTime = {
							"h+": date.getHours() >= 10 ? date.getHours() : '0' + date.getHours(), //小时
							"m+": date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes(), //分
							"s+": date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
						}
						for (let k in objTime) {
							strDate += objTime[k]
						}
					}
					break

				default: // 如果后台写的数据不是正常的，就直接返回
					strDate = date + ''
			}
			return strDate
		},
		//获取当前日期 type = "-"
		M_getTodayFormat(type) {
			type = type || "-";
			let date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				strDate = date.getDate(),
				currentdate = "";
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			currentdate = year + type + month + type + strDate;
			return currentdate;
		},
		M_deepCopy(templateData) {
            let obj={};
            obj=JSON.parse(JSON.stringify(templateData)); //this.templateData是父组件传递的对象
            return obj
       	},
		 /**
         * 用星号替换内容
         * type = 'phone', 中间四位数替换
         * type = 'idCard', 身份证
         * type = 'all', 全部替换
         */
         M_replaceWithStar(code, type) {
            let num = '';
            switch (type) {
                case 'phone':
                    num = code.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                    break;
                case 'all':
                    let len = code.length;
                    num = code.replace(code, "*****");
                    break;
                default:
                    break;
            }
            return num;
        },
	}
};
