<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/home/order.png">设计师列表
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/artists/add')" v-permission="'artists_add'">
                    <img src="images/add.png"> 新增设计师
                </button>
            </div>
        </div>
        <div class="page-body">
            <div class="top-fns mb20">
                <search :placeholder="'请输入关键字、ID'" v-model="filter.param" @search="currentPage==1?getList():currentPage=1"></search>
                <v-filter :height="'34px'" @filter="currentPage==1?getList():currentPage=1">
                    <div>
                        <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :placeholder="'等级'" :all="'全部'" :inner-height="'18px'" :value="'id'" :name="'title'" :data="levelList" @select="filter.level=$event"></drop-down>
                        <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :placeholder="'状态'" :all="'全部'" :inner-height="'18px'" :data="[{name:'显示',value:0,selected:false},{name:'隐藏',value:1,selected:false}]" @select="filter.status=$event"></drop-down>
                    </div>
                </v-filter>
            </div>
            <table class="artists common row-border mb20">
                <thead>
                    <tr>
                        <th>设计师ID</th>
                        <th>设计师头像</th>
                        <th>设计师名称</th>
                        <th>设计师等级</th>
                        <th>上传作品数</th>
                        <th>邀约价格</th>
                        <th>邀约次数</th>
                        <th>设计状态</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in list">
                        <td>{{i.id}}</td>
                        <td><img :src="i.imgSrc" class="table-thumb" v-broken-link></td>
                        <td>{{i.name}}</td>
                        <td>{{i.levelName}}</td>
                        <td>{{i.opuses}}</td>
                        <td>￥{{i.price}}</td>
                        <td>{{i.employNum}}次</td>
                        <td>{{i.free===0?"空闲":"设计中"}}</td>
                        <td>
                            <div class="order-status theme" v-if="i.status==0">显示</div>
                            <div class="order-status gray" v-else>隐藏</div>
                        </td>
                        <td>
                            <div class="simple-bts">
                                <button class="simple" @click="$router.push('/artists/'+i.id)" v-permission="'artists_detail'">编辑</button>
                                <button class="simple" v-if="i.status===1" @click="show(i)" v-permission="'artists_show'">显示</button>
                                <button class="simple" v-else @click="hide(i)" v-permission="'artists_hide'">隐藏</button>
                                <button class="simple" @click="del(i.id)" v-permission="'artists_del'">删除</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button class="theme-bt add" onclick="saveXSL($('.artists.common')[0])">导出EXCEL</button>
            <pager @pager="pager" :xcurrent-page="currentPage" :xpages="pages"></pager>
        </div>
    </main>
</template>
<style></style>
<script>
    ({
        data: function () {
            return {
                list: [],
                levelList: [],
                filter: {
                    status: undefined,
                    param: "",
                    level: undefined
                }
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/designer/select",
                    data: $.extend({
                        currentPage: that.currentPage,
                        pageSize: that.pageSize
                    }, that.filter),
                    success: function (res) {
                        if (res.code === 0) {
                            that.list = res.data;
                            that.total = res.total;
                        }
                    }
                });
            },
            getLevel: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/designerLevel/select",
                    success: function (res) {
                        if (res.code === 0) {
                            that.levelList = res.data;
                        }
                    }
                });
            },
            show: function (obj) {
                var that = this;
                ajax({
                    url: "/admin/designer/showDesigner",
                    type: "put",
                    data: {
                        id: obj.id
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            obj.status = 0;
                        }
                    }
                });
            },
            hide: function (obj) {
                var that = this;
                ajax({
                    url: "/admin/designer/hideDesigner",
                    type: "put",
                    data: {
                        id: obj.id
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            obj.status = 1;
                        }
                    }
                });
            },
            del: function (id) {
                var that = this;
                this.$root.confirms.push({
                    fn: function () {
                        ajax({
                            url: "/admin/designer/delDesigner",
                            type: "delete",
                            data: {
                                id: id
                            },
                            success: function (res) {
                                if (res.code === 0) {
                                    that.getList();
                                }
                            }
                        });
                    },
                    text: "您确定要永久删除该设计师？"
                });
            }
        },
        mounted: function () {
            this.getList();
            this.getLevel();
        }
    })
</script>