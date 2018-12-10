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
        	M_salesStatus: [
        	    { value: "1", label: "待售卖" },
        	    { value: "2", label: "已售卖" },
        	],
        	M_adUploadStatus: [
        	    { value: "1", label: "已上画"},
        	    { value: "2", label: "未上画"},
        	],
        	M_dataState: [
                { value: "1", label: "有效" },
                { value: "2", label: "无效" },
            ],
            M_StaffType: [
                { value: "1", label: "管理员" },
                { value: "2", label: "销售" },
                { value: "3", label: "计调" },
                { value: "4", label: "上画" },
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