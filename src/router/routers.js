import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/view/single-page/home')
    }]
  },
  {
    path: '/order',
    name: 'order',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '订单'
    },
    children: [{
      path: 'sale',
      name: '销售',
      meta: {
        icon: 'ios-hammer',
        title: '销售'
      },
      component: () => import('@/view/order/sale.vue')
    },{
        path: 'metering',
        name: '计调',
        meta: {
          icon: 'ios-infinite',
          title: '计调'
        },
        component: () => import('@/view/order/metering.vue')
      }
    ]
  },
  {
    path: '/paint',
    name: '上画任务',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '上画任务'
    },
    children: [{
      path: 'task',
      name: '任务生成',
      meta: {
        icon: 'ios-hammer',
        title: '任务生成'
      },
      component: () => import('@/view/paint/task.vue')
    },{
        path: 'painting',
        name: '上画',
        meta: {
          icon: 'ios-infinite',
          title: '上画'
        },
        component: () => import('@/view/paint/painting.vue')
      },{
        path: 'metering',
        name: '上画计调',
        meta: {
          icon: 'ios-infinite',
          title: '计调'
        },
        component: () => import('@/view/paint/metering.vue')
      }
    ]
  },
{
    path: '/login',
    name: '验收材料导出',
    meta: {
      title: '验收材料导出',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
	{
    path: '/info',
    name: '基础信息维护',
    component: Main,
    meta: {
      icon: 'logo-buffer',
      title: '基础信息维护'
    },
    children: [{
      path: 'community',
      name: '小区信息维护',
      meta: {
        icon: 'ios-hammer',
        title: '小区信息维护'
      },
      component: () => import('@/view/info/community.vue')
    },{
        path: 'point/:communityId?',
        name: '点位信息维护',
        meta: {
          icon: 'ios-infinite',
          title: '点位信息维护'
        },
        component: () =>  import('@/view/info/point.vue')
      },{
        path: 'Metering',
        name: '客户信息维护',
        meta: {
          icon: 'ios-infinite',
          title: '客户信息维护'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },{
        path: 'Metering',
        name: '员工信息维护',
        meta: {
          icon: 'ios-infinite',
          title: '员工信息维护'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },{
        path: 'Metering',
        name: '销售合同维护',
        meta: {
          icon: 'ios-infinite',
          title: '销售合同维护'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },{
        path: 'Metering',
        name: '菜单信息维护',
        meta: {
          icon: 'ios-infinite',
          title: '菜单信息维护'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },{
        path: 'Metering',
        name: '角色信息维护',
        meta: {
          icon: 'ios-infinite',
          title: '角色信息维护'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      }
    ]
  },





  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
       hideInMenu: true,
      title: '组件'
    },
    component: Main,
    children: [{
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      hideInMenu: true,
      title: '数据上传'
    },
    component: Main,
    children: [{
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          hideInMenu: true,
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          hideInMenu: true,
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      hideInMenu: true,
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [{
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
        hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'tools_methods_page',
      name: 'tools_methods_page',
      meta: {
        icon: 'ios-hammer',
        title: '工具方法',
        beforeCloseName: 'before_close_normal'
      },
      component: () => import('@/view/tools-methods/tools-methods.vue')
    }]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'i18n_page',
      name: 'i18n_page',
      meta: {
        icon: 'md-planet',
        title: 'i18n - {{ i18n_page }}'
      },
      component: () => import('@/view/i18n/i18n-page.vue')
    }]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'error_store_page',
      name: 'error_store_page',
      meta: {
        icon: 'ios-bug',
        title: '错误收集'
      },
      component: () => import('@/view/error-store/error-store.vue')
    }]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [{
      path: 'error_logger_page',
      name: 'error_logger_page',
      meta: {
        icon: 'ios-bug',
        title: '错误收集'
      },
      component: () => import('@/view/single-page/error-logger.vue')
    }]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
        hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'directive_page',
      name: 'directive_page',
      meta: {
        icon: 'ios-navigate',
        title: '指令'
      },
      component: () => import('@/view/directive/directive.vue')
    }]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
        hideInMenu: true,
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [{
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [{
          path: 'level_2_2_1',
          name: 'level_2_2_1',
          meta: {
            icon: 'md-funnel',
            title: '三级'
          },
          component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
        }]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
        hideInMenu: true,
      hideInMenu: true
    },
    component: Main,
    children: [{
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
