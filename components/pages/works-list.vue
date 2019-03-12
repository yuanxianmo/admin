<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/works/works.png">作品列表
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/works/custom')" v-permission="'goods_add'">
                    <img src="images/add.png"> 新增自定义作品
                </button>
                <button class="theme-bt add" @click="$router.push('/works/add')" v-permission="'goods_add'">
                    <img src="images/add.png"> 新增成品
                </button>
            </div>
        </div>
        <div class="page-body">
            <div class="top-fns">
                <search :placeholder="'请输入作品名称、ID'" v-model="keyword" @search="currentPage==1?getList():currentPage=1"></search>
                <v-filter :height="'34px'" @filter="currentPage==1?getList():currentPage=1">
                    <div>
                        <drop-down :theme="'simple'" :min-width="'135px'" :height="'32px'" :inner-height="'18px'" :data="tree" :value="'name'" @output="structure_1=$event;structure_2=[];structure_3=[]"
                            :placeholder="'一级结构分类'" :disabled="tree.length==0" :all="'全部'" v-permission="'structure_list'"></drop-down>
                        <drop-down :theme="'simple'" :min-width="'135px'" :height="'32px'" :inner-height="'18px'" :data="structure_1.nextStructure"
                            :value="'name'" @output="structure_2=$event;structure_3=[]" :placeholder="'二级结构分类'" :disabled="!structure_1.id"
                            :all="'全部'" v-permission="'structure_list'"></drop-down>
                        <drop-down :theme="'simple'" :min-width="'135px'" :height="'32px'" :inner-height="'18px'" :data="structure_2.nextStructure"
                            :value="'name'" @output="structure_3=$event" :placeholder="'三级结构分类'" :disabled="!structure_2.id"
                            :all="'全部'" v-permission="'structure_list'"></drop-down>
                        <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :placeholder="'状态'" :all="'全部'" :inner-height="'18px'"
                            :data="[{name:'已上架',value:'shelf',selected:false},{name:'已下架',value:'offshelf',selected:false}]"
                            @select="filter.status=$event"></drop-down>
                        <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :placeholder="'作品分类'" :all="'全部'" :inner-height="'18px'"
                            :data="[{name:'成品',value:'cp'},{name:'自定义作品',value:'zdy'}]" @select="filter.type=$event"></drop-down>
                    </div>
                </v-filter>
            </div>
            <table class="list common orders row-border">
                <thead>
                    <tr>
                        <th>作品ID</th>
                        <th>排序</th>
                        <th>作品名称</th>
                        <th>作品分类</th>
                        <th>作品结构分类</th>
                        <th>作品图片</th>
                        <th>价格</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i,index) in list" :key="i.id">
                        <td>{{i.id}}</td>
                        <td>{{i.orderid}}</td>
                        <td>{{i.name}}</td>
                        <td>{{i.type=="1"?"自定义作品":"成品"}}</td>
                        <td>{{i.pfsname||"未分类"}}</td>
                        <td>
                            <img :src="i.imgSrc" class="table-thumb" :key="i.id" onload="this.classList.add('img-loaded')" v-broken-link>
                        </td>
                        <td>
                            <strong>￥{{i.price}}</strong>
                        </td>
                        <td>
                            <div class="order-status theme" v-if="i.status===0">上架</div>
                            <div class="order-status gray" v-if="i.status===1">下架</div>
                        </td>
                        <td>
                            <div class="flex-column action">
                                <button class="theme-bt simple" v-copy="$root.config.urlBase+'/'+(i.type=='2'?'shoppingCart':'DIY')+'?id='+i.id">复制链接</button>
                                <button class="theme-bt simple" @click="copyWork(i.id)" v-if="ajaxStatus=='ready'" v-permission="'goods_add'">复制作品</button>
                                <button class="theme-bt simple" v-else-if="copyId==i.id">正在复制</button>
                                <button class="theme-bt" @click="$router.push((i.type=='1'?'/works/custom/':'/works/')+i.id)" v-permission="'goods_detail'">编辑</button>
                                <button class="theme-bt simple" @click="setOn(i.id)" v-if="i.status===1" v-permission="'goods_enable'">上架</button>
                                <button class="theme-bt simple" @click="setOff(i.id)" v-if="i.status===0" v-permission="'goods_disable'">下架</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pager @pager="pager" :xcurrent-page="currentPage" :xpages="pages"></pager>
    </main>
</template>
<style>
    .top-fns {
        margin-bottom: 20px;
    }

    table.list .theme-bt {
        padding: 5px 9px;
    }

    .page-body {
        padding: 20px 0;
    }

    table.list strong {
        color: #c7000a;
        font-weight: normal;
        font-size: 14px;
    }

    .page-head button.add {
        margin-left: 10px;
    }

    .action {
        align-items: center;
    }

    .action button {
        padding: 5px 9px;
    }

    .action .theme-bt:not(.simple) {
        border-radius: 2px;
        margin: 2px 0;
    }
</style>
<script>
    ({
        data: function () {
            return {
                list: [],
                filter: {
                    status: undefined,
                    type: undefined
                },
                keyword: "",
                copyId: "",
                tree: [],
                structure_1: {},
                structure_2: {},
                structure_3: {},
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/goods/select",
                    type: "get",
                    data: {
                        currentPage: that.currentPage,
                        pageSize: that.pageSize,
                        type: that.filter.type,
                        status: that.filter.status,
                        name: $.trim(that.keyword),
                        structureFid: that.structure_1.id,
                        structureSid: that.structure_2.id,
                        structureTid: that.structure_3.id,
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.list = res.data;
                            that.total = res.total;
                            that.currentPage = res.currentPage;
                        }
                    }
                });
            },
            getTree: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/goodsstructure/selectAll",
                    success: function (res) {
                        if (res.code === 0) {
                            res.data = res.data.filter(function (v) {
                                return v.status == 0;
                            });
                            $.each(res.data, function (index, item) {
                                item.nextStructure = item.nextStructure.filter(function (v) {
                                    return v.status == 0;
                                });
                                item.selected = false;
                                $.each(item.nextStructure, function (index2, item2) {
                                    item2.nextStructure = item2.nextStructure.filter(
                                        function (v) {
                                            return v.status == 0;
                                        });
                                    item2.selected = false;
                                    $.each(item2.nextStructure, function (index3,
                                        item3) {
                                        item3.selected = false;
                                    });
                                });
                            });
                            that.tree = res.data;
                            that.ajaxStatus = "ready";
                        }
                    }
                });
            },
            setPage: function (v) {
                if (Number(v) < 1) {
                    this.currentPage = 1;
                } else if (Number(v) > this.pages) {
                    this.currentPage = this.pages;
                } else {
                    this.currentPage = Number(v);
                }
            },
            setOff: function (id) {
                var that = this;
                ajax({
                    url: "/admin/goods/delGoods?gid=" + id,
                    type: "delete",
                    success: function (res) {
                        that.getList();
                    }
                });
            },
            setOn: function (id) {
                var that = this;
                ajax({
                    url: "/admin/goods/updateGoodsStatus?gid=" + id,
                    type: "put",
                    success: function (res) {
                        that.getList();
                    }
                });
            },
            pager: function (v) {
                this.currentPage = v;
            },
            copyWork: function (id) {
                var that = this;
                var data = {};
                this.$root.confirms.push({
                    text: "确定复制该商品？",
                    fn: function () {
                        this.copyId = id;
                        this.ajaxStatus = "working";
                        ajax({
                            url: "/admin/goods/selectGoodsDetail",
                            data: {
                                id: id
                            },
                            success: function (res) {
                                if (res.code === 0) {
                                    data = res.data;
                                    ajax({
                                        url: "/admin/goods/addGoods",
                                        type: "post",
                                        data: data,
                                        success: function (res) {
                                            if (res.code == 0) {
                                                that.ajaxStatus = "ready";
                                                that.getList();
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        },
        mounted: function () {
            var that = this;
            this.getList();
            this.$root.hasPermission("structure_list", function () {
                that.getTree();
            });
        },
        activated: function () {
            var that = this;
            this.getList();
            this.$root.hasPermission("structure_list", function () {
                that.getTree();
            });
        }
    })
</script>