var browser = {
    webkit: navigator.userAgent.indexOf("WebKit") != -1 && navigator.userAgent.indexOf("Edge") == -1,
    edge: navigator.userAgent.indexOf("Edge") != -1,
    firefox: navigator.userAgent.indexOf("Firefox") != -1,
    ie: navigator.userAgent.indexOf("MSIE") != -1 || navigator.userAgent.indexOf("Trident") != -1
}

function preFetch(url) {
    $("head").append("<link rel='prefetch' href='" + url + "'>");
}
Object.assign = Object.assign || function () {
    for (var i in arguments) {
        for (var j in arguments[i]) {
            arguments[0][j] = arguments[i][j];
        }
    }
    return arguments[0];
}

function saveXSL(tab) {
    var tab_text = "<table border='2px'><tr bgcolor='#c4a66a'>";
    var textRange;
    var j = 0;
    for (j = 0; j < tab.rows.length; j++) {
        tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
        //tab_text=tab_text+"</tr>";
    }
    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params
    if (browser.ie) // If Internet Explorer
    {
        var iframe = document.createElement("iframe");
        $(iframe).css({
            width: 0,
            height: 0,
        });
        document.body.appendChild(iframe);
        var txtArea1 = iframe.contentWindow;
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "698.xls");
        $(iframe).remove();
    } else //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
    return (sa);
}

function ajax(obj) {
    this.ajaxStatus = "working"; //如需使用组件加载状态，则需call this
    var that = this;
    obj.data = obj.data || {};
    $.ajax({
        url: config.apiBase + obj.url,
        type: obj.type || "get",
        async: obj.async || true,
        dataType: obj.dataType || "json",
        data: (["put", "post", "delete"].indexOf(obj.type ? obj.type.toLowerCase() : "") != -1 && (obj.url != "/oauth/token") && obj.data.constructor.toString().search('FormData') == -1) ? JSON.stringify(obj.data) : obj.data,
        contentType: (["put", "post", "delete"].indexOf(obj.type ? obj.type.toLowerCase() : "") != -1 && (obj.url != "/oauth/token") && obj.data.constructor.toString().search('FormData') == -1) ? "application/json" : obj.contentType,
        processData: obj.processData,
        headers: $.extend(/^(\/api|\/admin|\/oauth\/authentication\/loginout)/.test(obj.url) ? {
            "Authorization": "Bearer " + localStorage.access_token
        } : {}, obj.headers),
        xhrFields: obj.xhrFields,
        xhr: obj.xhr,
        success: function (res, status, xhr) {
            if (res.code === 1 && obj.url != "/oauth/authentication/loginout") {
                app.alerts.push(res.msg);
                that.ajaxStatus = "ready";
            }
            obj.success(res, status, xhr)
        },
        error: function (err) {
            console.log(err);
            switch (err.status) {
                case 401:
                    app.clearLogin();
                    sessionStorage.loginBack = "1";
                    app.$router.push("/login");
                    break;
                case 403:
                    app.alerts.push({
                        text: "权限不足!"
                    });
                    break;
                case 405:
                    app.alerts.push({
                        text: "请求方式不被允许！"
                    });
                    break;
                case 500:
                    app.alerts.push({
                        text: "内部服务器错误！"
                    });
                    break;
                case 502:
                    app.alerts.push({
                        text: "服务器重启中！"
                    });
                    break;
                case 0:
                    app.alerts.push({
                        text: "服务器未响应！"
                    });
                    break;
                default:
                    app.alerts.push({
                        text: err.status + "[" + err.statusText + "]"
                    });
            }
            obj.error && obj.error(err);
        }
    });
}

function getObjByKey(key, value, arr) {
    for (var i in arr) {
        if (arr[i][key] == value) {
            return arr[i];
        }
    }
}
var quillFont = Quill.import('formats/font');
quillFont.whitelist = ['Arial', '宋体', '黑体', '微软雅黑', '楷体'];
Quill.register(quillFont, true);
//设置
var quillOption = {
    theme: 'snow',
    placeholder: "请输入内容",
    modules: {
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{
                    "header": 1
                }, {
                    "header": 2
                }],
                [{
                    "list": "ordered"
                }, {
                    "list": "bullet"
                }],
                [{
                    "script": "sub"
                }, {
                    "script": "super"
                }],
                [{
                    "indent": "-1"
                }, {
                    "indent": "+1"
                }],
                [{
                    "direction": "rtl"
                }],
                [{
                    "size": ["small", false, "large", "huge"]
                }],
                [{
                    "header": [1, 2, 3, 4, 5, 6, false]
                }],
                [{
                    "color": []
                }, {
                    "background": []
                }],
                [{
                    "font": ['Arial', '宋体', '黑体', '微软雅黑', '楷体']
                }],
                [{
                    "align": []
                }],
                ["clean"],
                ["link", "image", "video"]
            ],
            handlers: {
                image: function (v) {}.bind(this)
            }
        }
    }
}
Vue.use(window.VueQuillEditor, quillOption);
Vue.directive("set-key", {
    inserted: function (el, binding, vnode) {
        if (binding.value[0][binding.value[1]] === undefined) {
            vnode.context.$set(binding.value[0], binding.value[1], binding.value[2]);
        }
    }
});
Vue.directive("focus", {
    inserted: function (el) {
        el.focus();
    }
});
Vue.directive("copy", {
    inserted: function (el, binding) {
        $(el).click(function () {
            var input = $("<input>");
            $("body").append(input);
            input.val(binding.value);
            input[0].select();
            if (document.execCommand && document.execCommand("copy")) {
                $(el).html("复制成功");
            } else {
                $(el).html("复制失败");
            };
            input.remove();
        });
    }
});
Vue.directive("set-height", {
    inserted: function (el, binding, vnode) {
        if (!binding.value.height.height) {
            binding.value.height.height = vnode.elm.clientHeight;
        }
        $(vnode.elm).css("maxHeight", binding.value.height.height + "px");
    }
});
Vue.directive("fit-content", {
    inserted: function (el, binding, vnode) {
        var style = getComputedStyle(el);
        var fontSize = style.fontSize;
        var letterSpacing = style.letterSpacing;
        var padding = style.padding
        var clone = $("<div style='display:inline-block;opacity:0;position:fixed;left:-1000px;top:-1000px;'></div>");
        clone.css({
            fontSize: style.fontSize,
            letterSpacing: style.letterSpacing,
            padding: style.padding,
            border: style.border
        });
        clone.text(el.value);
        $("body").append(clone);
        $(el).css("width", clone[0].getBoundingClientRect().width + "px");
    },
    update: function (el, binding, vnode) {
        var style = getComputedStyle(el);
        var fontSize = style.fontSize;
        var letterSpacing = style.letterSpacing;
        var padding = style.padding
        var clone = $("<div style='display:inline-block;opacity:0;position:fixed;left:-1000px;top:-1000px;'></div>");
        clone.css({
            fontSize: style.fontSize,
            letterSpacing: style.letterSpacing,
            padding: style.padding,
            border: style.border
        });
        clone.text(el.value);
        $("body").append(clone);
        $(el).css("width", clone[0].getBoundingClientRect().width + "px");
    }
});
Vue.directive("visible", {
    inserted: function (el, binding) {
        if (!binding.value) {
            $(el).css("visibility", "hidden");
        }
    }
});
Vue.directive("permission", {
    inserted: function (el, binding, vnode) {
        $("body").on("keydown", function (e) {
            if (e.altKey && e.keyCode == 220) {
                el.innerHTML = typeof binding.value == "string" ? (binding.value || "未分配权限") : (binding.value[0] || "未分配权限");
            }
        });
        vnode.context.$root.$watch("userInfo.btnList", function () {
            if (!vnode.context.$root.hasPermission(typeof binding.value == "string" ? binding.value : binding.value[0])) {
                $(el).prop("disabled", true).addClass("no-permission");
            } else if (typeof binding.value == "string") {
                $(el).prop("disabled", false).removeClass("no-permission");
            }
        }, {
            immediate: true,
            deep: true
        });
    }
});
Vue.directive("brokenLink", {
    inserted: function (el, binding, vnode) {
        $(el).on("error", function () {
            $(this).addClass("img-error");
            $(this).prop("src", "data:image/png;base64,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");
        });
    }
});
Vue.filter("dateStr", function (v) {
    var addZero = function (v) {
        if (v.toString().length == 1) {
            return "0" + v.toString();
        } else return v;
    };
    var dt = new Date(v);
    return dt.getFullYear() + "-" + addZero(dt.getMonth() + 1) + "-" + addZero(dt.getDate()) + "  " + addZero(dt.getHours()) + ":" + addZero(dt.getMinutes()) + ":" + addZero(dt.getSeconds());
});
Vue.component("datepicker", vuejsDatepicker);
var VueComponent = {
    config: {},
    load: function (name, url) {
        Vue.component(name, function (resolve) {
            $.get(url).then(function (res) {
                var comObj = $("<div>" + res + "</div>");
                var scriptString = $.trim($("script:not(src)", comObj).html()) || "({})";
                var script = new Function("return (" + scriptString + ")")();
                script.template = $("template", comObj).html();
                var scriptFiles = $("script[src]", comObj);
                var linkFiles = $("link", comObj);
                var mixin = {
                    name: name,
                    data: function () {
                        return {
                            comObj: comObj,
                            styleCloned: null,
                            scriptCloned: null,
                            ajaxStatus: "ready",
                            ajaxQueue: 1,
                            currentPage: 1,
                            pageSize: 10,
                            total: 0
                        }
                    },
                    computed: {
                        pages: function () {
                            return Math.ceil(this.total / this.pageSize);
                        }
                    },
                    methods: {
                        pager: function (page) {
                            this.currentPage = page;
                        }
                    },
                    watch: {
                        currentPage: function () {
                            this.getList && this.getList();
                        }
                    },
                    created: function () {
                        this.styleCloned = $("style", this.comObj).clone();
                        this.styleCloned.attr("component", name);
                        $("head").append(this.styleCloned).append(scriptFiles).append(linkFiles);
                    },
                    mounted: function () {
                        this.$root.coms[name] = this;
                        this.$root.$el.scrollTop = 0;
                        if (!localStorage.access_token) {
                            sessionStorage.loginBack = "1";
                            this.$router.push("/login");
                        }
                    },
                    destroyed: function () {
                        this.styleCloned.remove();
                        scriptFiles.remove();
                        linkFiles.remove();
                    }
                };
                script.mixins = [mixin];
                resolve(script);
            });
        });
    },
    init: function () {
        for (var i in this.config.pre) {
            var url = this.config.path + this.config.pre[i] + ".vue?v=" + this.config.version;
            this.load(this.config.pre[i].split("/").pop(), url);
        }
    }
};

function getConfig(path) {
    $.get({
        url: path,
        dataType: "text",
        cache: false,
        success: function (res) {
            var res = new Function("return (" + res + ")")();
            var router = new VueRouter(res.router);
            window.config = res;
            VueComponent.config = res.vueComponents;
            VueComponent.init();
            $.each(res.preFetch, function (index, item) {
                preFetch(item);
            });
            $.each(res.style, function (index, item) {
                $("head").append($("<link rel='stylesheet' href='" + item + "'>"));
            });
            window.app = new Vue({
                el: "#app",
                router: router,
                data: {
                    browser: browser,
                    coms: {},
                    config: res,
                    asideLinks: [],
                    userInfo: {
                        btnList: []
                    },
                    alerts: [],
                    confirms: [],
                    prompts: [],
                    showNav: true,
                    ping: -1
                },
                methods: {
                    getDate: function (dt) {
                        return new Date(dt);
                    },
                    getDateStr: function (dt) {
                        var dt = new Date(dt);
                        return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
                    },
                    pager: function (dt) {
                        return {
                            pages: Math.ceil(dt.total / dt.pageSize)
                        }
                    },
                    cs: function () {},
                    getUserInfo: function (fn) {
                        var fn = fn || function () {};
                        var that = this;
                        var startTime = Date.now();
                        ajax({
                            url: "/admin/user/getUserInfo",
                            success: function (res) {
                                if (res.code === 0) {
                                    localStorage.userInfo = JSON.stringify(res.data);
                                    that.userInfo = res.data;
                                    fn();
                                }
                            }
                        });
                    },
                    pingServer: function () {
                        var that = this;
                        var startTime = Date.now();
                        $.ajax({
                            url: "/",
                            cache: false,
                            success: function () {
                                that.ping = Date.now() - startTime;
                            },
                            error: function (e) {
                                if (e.status == 0) {
                                    that.ping = -1;
                                } else {
                                    that.ping = Date.now() - startTime;
                                }
                            }
                        });
                    },
                    clearLogin: function () {
                        delete localStorage.userInfo;
                        delete localStorage.access_token;
                        this.userInfo = {};
                    },
                    objLength: function (obj) {
                        return Object.keys(obj).length;
                    },
                    setSelected: function (arr, v, keyName) {
                        var that = this;
                        $.each(arr, function (index, item) {
                            that.$set(item, "selected", item[keyName] == v);
                        });
                    },
                    hasPermission: function (v, fn) {
                        if (fn) {
                            this.$watch("userInfo.btnList", function (after) {
                                if ((this.userInfo.btnList && this.userInfo.btnList.indexOf(v) != -1) || v == "") {
                                    fn();
                                }
                            }, {
                                immediate: true
                            });
                        }
                        return (this.userInfo.btnList && this.userInfo.btnList.indexOf(v) != -1) || v == "";
                    }
                },
                mounted: function () {
                    var that = this;
                    this.asideLinks = this.$route.meta.asideLinks;
                    document.title = this.$route.meta.title;
                    if (this.$route.name != "login") {
                        this.getUserInfo(function () {
                            that.userInfo = JSON.parse(localStorage.userInfo || "{}");
                        });
                    }
                },
                computed: {},
                watch: {
                    "$route": function (to, from) {
                        to.meta.asideLinks && (this.asideLinks = to.meta.asideLinks);
                        document.title = this.$route.meta.title;
                    }
                }
            });
        }
    });
}
$(function () {
    getConfig("data/config.es");
});