export const globalVar = {
    data() {
        return {
            M_pageSize: 10,
        	M_orderStatusArr: [
        	    { value: "1", label: "待提交"},
                { value: "2", label: "已提交"},
                { value: "3", label: "已退回"},
                { value: "4", label: "已通过"},
                { value: "5", label: "已分配"},
        	],
        	M_carTypeArr: [
        	    { value: "0", label: "无车" },
        	    { value: "1", label: "有车有按揭" },
        	    { value: "2", label: "有车无按揭" },
        	],
        	M_houseTypeArr: [
        	    { value: "0", label: "无房产/租用"},
        	    { value: "1", label: "本地有房产/有按揭"},
        	    { value: "2", label: "本地有房产/无按揭"},
        	    { value: "3", label: "外地有房产/有按揭"},
        	    { value: "4", label: "外地有房产/无按揭"},
        	],
        	M_relationTypeArr: [
                { value: "0", label: "配偶" },
                { value: "1", label: "亲属" },
                { value: "2", label: "同事" },
                { value: "3", label: "朋友" },
            ],
            M_payStatusArr: [
                { value: "0", label: "成功" },
                { value: "9", label: "失败" },
			],
			M_StatusArr: [
                { value: "0", label: "有效" },
                { value: "1", label: "无效" },
            ],
			M_saleName: [
				{ value: "10004", label: "张三" },
				{ value: "10006", label: "李四" },
				{ value: "10008", label: "王小" },
				{ value: "10010", label: "啊o" },
			],
			M_taskStatusArr: [
				{ value: "1", label: "未提交" },
				{ value: "2", label: "已提交" },
				{ value: "3", label: "已退回" },
				{ value: "4", label: "已通过" },
			],
        }
    },
    methods: {
         
    }
};