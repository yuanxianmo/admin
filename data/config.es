({
    urlBase: $("base").attr("urlbase"), //前台地址
    apiBase: $("base").attr("apibase"), //接口地址
    vueComponents: {
        path: "components/",
        version: "1.1.45",
        pre: [
            "module/v-header",
            "module/aside-menu",
            "module/search",
            "module/pager",
            "module/tabs",
            "module/drop-down",
            "module/users-selector",
            "module/images-selector",
            "module/images-selected",
            "module/address-selector",
            "module/action",
            "module/confirm",
            "module/alert",
            "module/prompt",
            "module/v-filter",
            "module/ping",
            "module/artists-selector",
            "module/rating",
            "pages/not-found",
            "pages/login",
            "pages/index",
            "pages/index-home",
            "pages/index-slideshow",
            "pages/index-slideshow-detail",
            "pages/index-links",
            "pages/works",
            "pages/works-list",
            "pages/works-detail",
            "pages/works-profession",
            "pages/works-profession-detail",
            "pages/works-structure",
            "pages/works-structure-detail",
            "pages/users",
            "pages/users-list",
            "pages/users-detail",
            "pages/users-groups",
            "pages/users-groups-detail",
            "pages/orders",
            "pages/orders-list",
            "pages/orders-detail",
            "pages/orders-design",
            "pages/orders-design-detail",
            "pages/orders-invoice",
            "pages/orders-invoice-detail",
            "pages/artists",
            "pages/artists-list",
            "pages/artists-detail",
            "pages/artists-works",
            "pages/artists-works-detail",
            "pages/backend",
            "pages/backend-roles",
            "pages/backend-roles-detail",
            "pages/backend-admin",
            "pages/backend-admin-detail",
            "pages/backend-website",
            "pages/backend-trade",
            "pages/backend-logs",
            "pages/backend-permission",
            "pages/backend-printnumber",
            "pages/backend-shipping",
            "pages/messages",
            "pages/messages-list",
            "pages/messages-detail",
            "pages/messages-native",
            "pages/messages-template",
            "pages/price",
            "pages/price-list",
            "pages/price-detail",
            "pages/price-technology",
            "pages/price-unit",
            "pages/service",
            "pages/service-list",
            "pages/service-detail",
            "pages/service-chat",
            "pages/service-chat-detail",
            "pages/service-group",
            "pages/service-group-detail",
        ]
    },
    router: {
        base: $("base").attr("href"),
        mode: "history",
        routes: [{
                path: "/",
                component: {
                    template: "<index></index>"
                },
                children: [{
                        path: "",
                        component: {
                            template: "<index-home></index-home>"
                        },
                        meta: {
                            group: "index",
                            title: "698管理后台"
                        }
                    },
                    {
                        path: "index/slideshow",
                        component: {
                            template: "<index-slideshow></index-slideshow>"
                        },
                        meta: {
                            group: "index",
                            title: "轮播管理"
                        }
                    },
                    {
                        path: "index/slideshow/add",
                        component: {
                            template: "<index-slideshow-detail></index-slideshow-detail>"
                        },
                        meta: {
                            group: "index",
                            title: "新增轮播"
                        }
                    },
                    {
                        path: "index/slideshow/:id",
                        component: {
                            template: "<index-slideshow-detail></index-slideshow-detail>"
                        },
                        meta: {
                            group: "index",
                            title: "编辑轮播"
                        }
                    },
                    {
                        path: "index/links",
                        component: {
                            template: "<index-links></index-links>"
                        },
                        meta: {
                            group: "index",
                            title: "专题链接"
                        }
                    }
                ]
            },
            {
                path: "/login",
                name: "login",
                component: {
                    template: "<login></login>"
                },
                meta: {
                    title: "698管理后台登录"
                }
            },
            {
                path: "/works",
                component: {
                    template: "<works></works>"
                },
                children: [{
                        path: "",
                        component: {
                            template: "<works-list></works-list>"
                        },
                        meta: {
                            title: "作品管理",
                            group: "works",
                            keepAlive: true
                        }
                    },
                    {
                        path: "profession",
                        component: {
                            template: "<works-profession></works-profession>"
                        },
                        meta: {
                            title: "作品行业分类",
                            keepAlive: true
                        }
                    },
                    {
                        path: "structure",
                        component: {
                            template: "<works-structure></works-structure>"
                        },
                        meta: {
                            title: "作品结构分类"
                        }
                    },
                    {
                        path: "add",
                        component: {
                            template: "<works-detail></works-detail>"
                        },
                        meta: {
                            title: "作品详情",
                            group: "works"
                        }
                    },
                    {
                        path: "custom",
                        component: {
                            template: "<works-detail></works-detail>"
                        },
                        meta: {
                            title: "成品作品详情",
                            group: "works",
                            type: "custom"
                        }
                    },
                    {
                        path: "custom/:id",
                        component: {
                            template: "<works-detail></works-detail>"
                        },
                        meta: {
                            title: "自定义作品详情",
                            group: "works",
                            type: "custom"
                        }
                    },
                    {
                        path: ":id",
                        component: {
                            template: "<works-detail></works-detail>"
                        },
                        meta: {
                            title: "作品详情",
                            group: "works"
                        }
                    },
                    {
                        path: "profession/add",
                        component: {
                            template: "<works-profession-detail></works-profession-detail>"
                        },
                        meta: {
                            title: "新增作品行业分类"
                        }
                    },
                    {
                        path: "profession/:id",
                        component: {
                            template: "<works-profession-detail></works-profession-detail>"
                        },
                        meta: {
                            title: "作品行业分类-详情"
                        }
                    }
                ]
            },
            {
                path: "/users",
                component: {
                    template: "<users></users>"
                },
                children: [{
                        path: "",
                        component: {
                            template: "<users-list></users-list>"
                        },
                        meta: {
                            title: "用户列表",
                            group: "users"
                        }
                    },
                    {
                        path: "groups",
                        component: {
                            template: "<users-groups></users-groups>"
                        },
                        meta: {
                            title: "用户分组"
                        }
                    },
                    {
                        path: ":id",
                        component: {
                            template: "<users-detail></users-detail>"
                        },
                        meta: {
                            title: "用户详情",
                            group: "users"
                        }
                    },
                    {
                        path: "groups/add",
                        component: {
                            template: "<users-groups-detail></users-groups-detail>"
                        },
                        meta: {
                            title: "新增用户分组"
                        }
                    },
                    {
                        path: "groups/:id",
                        component: {
                            template: "<users-groups-detail></users-groups-detail>"
                        },
                        meta: {
                            title: "用户分组详情"
                        }
                    }
                ]
            },
            {
                path: "/orders",
                component: {
                    template: "<orders></orders>"
                },
                children: [{
                        path: "",
                        component: {
                            template: "<orders-list></orders-list>"
                        },
                        meta: {
                            title: "印刷订单列表",
                            group: "home",
                            type: "ys",
                            keepAlive: true
                        }
                    },
                    {
                        path: "u/:id",
                        component: {
                            template: "<orders-list></orders-list>"
                        },
                        meta: {
                            title: "指定用户印刷订单列表",
                            group: "home",
                            type: "ys",
                            keepAlive: true
                        }
                    },
                    {
                        path: "design",
                        component: {
                            template: "<orders-design></orders-design>"
                        },
                        meta: {
                            title: "设计订单列表",
                            type: "sj"
                        }
                    },
                    {
                        path: "design/:id",
                        component: {
                            template: "<orders-design-detail></orders-design-detail>"
                        },
                        meta: {
                            title: "设计订单详情",
                            type: "sj"
                        }
                    },
                    {
                        path: "custom",
                        component: {
                            template: "<orders-list></orders-list>"
                        },
                        meta: {
                            title: "自定义订单列表",
                            type: "zdy",
                            keepAlive: true
                        }
                    },
                    {
                        path: "custom/u/:id",
                        component: {
                            template: "<orders-list></orders-list>"
                        },
                        meta: {
                            title: "指定用户自定义订单列表",
                            type: "zdy"
                        }
                    },
                    {
                        path: "custom/:id",
                        component: {
                            template: "<orders-detail></orders-detail>"
                        },
                        meta: {
                            title: "自定义订单详情",
                            type: "zdy"
                        }
                    },
                    {
                        path: "invoice",
                        component: {
                            template: "<orders-invoice></orders-invoice>"
                        },
                        meta: {
                            title: "发票管理",
                            keepAlive: true
                        }
                    },
                    {
                        path: "invoice/:id",
                        component: {
                            template: "<orders-invoice-detail></orders-invoice-detail>"
                        },
                        meta: {
                            title: "发票管理"
                        }
                    },
                    {
                        path: ":id",
                        component: {
                            template: "<orders-detail></orders-detail>"
                        },
                        meta: {
                            title: "印刷订单详情",
                            group: "home",
                            type: "ys"
                        }
                    }
                ]
            },
            {
                path: "/artists",
                component: {
                    template: "<artists></artists>"
                },
                children: [{
                        path: "",
                        component: {
                            template: "<artists-list></artists-list>"
                        },
                        meta: {
                            title: "设计师列表"
                        }
                    },
                    {
                        path: "works",
                        component: {
                            template: "<artists-works></artists-works>"
                        },
                        meta: {
                            title: "设计师作品列表"
                        }
                    },
                    {
                        path: "works/add",
                        component: {
                            template: "<artists-works-detail></artists-works-detail>"
                        },
                        meta: {
                            title: "设计师作品详情"
                        }
                    },
                    {
                        path: "works/:id",
                        component: {
                            template: "<artists-works-detail></artists-works-detail>"
                        },
                        meta: {
                            title: "设计师作品详情"
                        }
                    },
                    {
                        path: "add",
                        component: {
                            template: "<artists-detail></artists-detail>"
                        },
                        meta: {
                            title: "设计师添加",
                            group: "artists"
                        }
                    },
                    {
                        path: ":id",
                        component: {
                            template: "<artists-detail></artists-detail>"
                        },
                        meta: {
                            title: "设计师详情",
                            group: "artists"
                        }
                    }
                ]
            },
            {
                path: "/backend",
                component: {
                    template: "<backend></backend>"
                },
                children: [{
                        path: "",
                        component: {
                            template: "<backend-roles></backend-roles>"
                        },
                        meta: {
                            title: "角色管理",
                            group: "roles"
                        }
                    },
                    {
                        path: "roles/add",
                        component: {
                            template: "<backend-roles-detail></backend-roles-detail>"
                        },
                        meta: {
                            title: "新增角色",
                            group: "roles"
                        }
                    },
                    {
                        path: "roles/:id",
                        component: {
                            template: "<backend-roles-detail></backend-roles-detail>"
                        },
                        meta: {
                            title: "编辑角色",
                            group: "roles"
                        }
                    },
                    {
                        path: "admin",
                        component: {
                            template: "<backend-admin></backend-admin>"
                        },
                        meta: {
                            title: "操作员管理"
                        }
                    },
                    {
                        path: "admin/add",
                        component: {
                            template: "<backend-admin-detail></backend-admin-detail>"
                        },
                        meta: {
                            title: "新增操作员"
                        }
                    },
                    {
                        path: "admin/:id",
                        component: {
                            template: "<backend-admin-detail></backend-admin-detail>"
                        },
                        meta: {
                            title: "编辑操作员"
                        }
                    },
                    {
                        path: "website",
                        component: {
                            template: "<backend-website></backend-website>"
                        },
                        meta: {
                            title: "网站设置"
                        }
                    },
                    {
                        path: "trade",
                        component: {
                            template: "<backend-trade></backend-trade>"
                        },
                        meta: {
                            title: "交易设置"
                        }
                    },
                    {
                        path: "logs",
                        component: {
                            template: "<backend-logs></backend-logs>"
                        },
                        meta: {
                            title: "系统操作日志"
                        }
                    },
                    {
                        path: "permission",
                        component: {
                            template: "<backend-permission></backend-permission>"
                        },
                        meta: {
                            title: "权限设置"
                        }
                    },
                    {
                        path: "permission/add",
                        component: {
                            template: "<backend-permission-detail></backend-permission-detail>"
                        },
                        meta: {
                            title: "新增权限"
                        }
                    },
                    {
                        path: "printnumber",
                        component: {
                            template: "<backend-printnumber></backend-printnumber>"
                        },
                        meta: {
                            title: "起印数量"
                        }
                    },
                    {
                        path: "shipping",
                        component: {
                            template: "<backend-shipping></backend-shipping>"
                        },
                        meta: {
                            title: "邮费设置"
                        }
                    },
                    {
                        path: "permission/:id",
                        component: {
                            template: "<backend-permission-detail></backend-permission-detail>"
                        },
                        meta: {
                            title: "修改权限"
                        }
                    }
                ]
            },
            {
                path: "/messages",
                component: {
                    template: "<messages></messages>"
                },
                children: [{
                        path: "",
                        component: {
                            template: "<messages-list></messages-list>"
                        },
                        meta: {
                            title: "消息列表",
                            group: "messages"
                        }
                    },
                    {
                        path: "message/add",
                        component: {
                            template: "<messages-detail></messages-detail>"
                        },
                        meta: {
                            title: "新增消息",
                            group: "messages"
                        }
                    },
                    {
                        path: "message/:id",
                        component: {
                            template: "<messages-detail></messages-detail>"
                        },
                        meta: {
                            title: "编辑消息",
                            group: "messages"
                        }
                    },
                    {
                        path: "native",
                        component: {
                            template: "<messages-native></messages-native>"
                        },
                        meta: {
                            title: "站内信"
                        }
                    },
                    {
                        path: "template",
                        component: {
                            template: "<messages-template></messages-template>"
                        },
                        meta: {
                            title: "消息模板"
                        }
                    }
                ]
            },
            {
                path: "/price",
                component: {
                    template: "<price></price>"
                },
                children: [{
                        path: "",
                        component: {
                            template: "<price-list></price-list>"
                        },
                        meta: {
                            title: "自动报价价格列表",
                            keepAlive: true
                        }
                    },
                    {
                        path: "auto/add",
                        component: {
                            template: "<price-detail></price-detail>"
                        },
                        meta: {
                            title: "新增自动报价价格",
                            group: "price"
                        }
                    },
                    {
                        path: "auto/:id",
                        component: {
                            template: "<price-detail></price-detail>"
                        },
                        meta: {
                            title: "编辑报价价格列表",
                            group: "price"
                        }
                    },
                    {
                        path: "technology",
                        component: {
                            template: "<price-technology></price-technology>"
                        },
                        meta: {
                            title: "工艺分类管理"
                        }
                    },
                    {
                        path: "unit",
                        component: {
                            template: "<price-unit></price-unit>"
                        },
                        meta: {
                            title: "单位管理"
                        }
                    }
                ]
            },
            {
                path: "/service",
                component: {
                    template: "<service></service>"
                },
                children: [{
                        path: "",
                        component: {
                            template: "<service-list></service-list>"
                        },
                        meta: {
                            title: "客服列表"
                        }
                    },
                    {
                        path: "cs/add",
                        component: {
                            template: "<service-detail></service-detail>"
                        },
                        meta: {
                            title: "新增客服",
                            group: "service"
                        }
                    },
                    {
                        path: "cs/:id",
                        component: {
                            template: "<service-detail></service-detail>"
                        },
                        meta: {
                            title: "编辑客服",
                            group: "service"
                        }
                    },
                    {
                        path: "chat",
                        component: {
                            template: "<service-chat></service-chat>"
                        },
                        meta: {
                            title: "聊天管理"
                        }
                    },
                    {
                        path: "chat/:id",
                        component: {
                            template: "<service-chat-detail></service-chat-detail>"
                        },
                        meta: {
                            title: "聊天记录"
                        }
                    },
                    {
                        path: "group",
                        component: {
                            template: "<service-group></service-group>"
                        },
                        meta: {
                            title: "客服组"
                        }
                    },
                    {
                        path: "group/add",
                        component: {
                            template: "<service-group-detail></service-group-detail>"
                        },
                        meta: {
                            title: "新增客服组"
                        }
                    },
                    {
                        path: "group/:id",
                        component: {
                            template: "<service-group-detail></service-group-detail>"
                        },
                        meta: {
                            title: "编辑客服组"
                        }
                    }
                ]
            },
            {
                path: "*",
                component: {
                    template: "<not-found></not-found>"
                },
                meta: {
                    title: "页面未找到"
                }
            }
        ]
    }
})