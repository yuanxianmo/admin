<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/works/works.png">作品列表
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/artists/works/add')" v-permission="'artists_works_add'">
                    <img src="images/add.png">新增作品
                </button>
            </div>
        </div>
        <div class="page-body">
            <div class="top-fns mb20">
                <search :placeholder="'请输入关键字、ID'" v-model="filter.param" @search="currentPage==1?getList():currentPage=1"></search>
                <v-filter :height="'34px'" @filter="currentPage==1?getList():currentPage=1">
                    <div>
                        <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :placeholder="'状态'" :all="'全部'" :inner-height="'18px'" :data="[{name:'显示',value:0,selected:false},{name:'隐藏',value:1,selected:false}]" @select="filter.status=$event"></drop-down>
                    </div>
                </v-filter>
            </div>
            <table class="common row-border">
                <thead>
                    <tr>
                        <th>作品ID</th>
                        <th>排序</th>
                        <th>作品名称</th>
                        <th>设计师</th>
                        <th>作品图片</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in list">
                        <td>{{i.id}}</td>
                        <td>{{i.sort}}</td>
                        <td>{{i.opusName}}</td>
                        <td>{{i.designerName}}</td>
                        <td>
                            <img class="table-thumb" :src="i.imgSrc" v-broken-link>
                        </td>
                        <td>
                            <div class="order-status theme" v-if="i.status=='0'">显示</div>
                            <div class="order-status gray" v-else>隐藏</div>
                        </td>
                        <td>
                            <div class="simple-bts">
                                <button class="simple">复制链接</button>
                                <button class="simple" @click="$router.push('/artists/works/'+i.id)" v-permission="'artists_works_detail'">编辑</button>
                                <button class="simple" v-if="i.status=='1'" @click="show(i)" v-permission="'artists_works_show'">显示</button>
                                <button class="simple" v-else @click="hide(i)" v-permission="'artists_works_hide'">隐藏</button>
                                <button class="simple" @click="del(i.id)" v-permission="'artists_works_del'">删除</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pager @pager="currentPage=$event" :xcurrent-page="currentPage" :xpages="pages"></pager>
        </div>
    </main>
</template>
<style>
</style>
<script>
    ({
        data: function () {
            return {
                list: [],
                filter: {}
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/designerOpus/select",
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
            show: function (obj) {
                var that = this;
                ajax({
                    url: "/admin/designerOpus/showDesigner",
                    type: "put",
                    data: {
                        id: obj.id
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            obj.status = '0';
                        }
                    }
                });
            },
            hide: function (obj) {
                var that = this;
                ajax({
                    url: "/admin/designerOpus/hideDesignerOpus",
                    type: "put",
                    data: {
                        id: obj.id
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            obj.status = '1';
                        }
                    }
                });
            },
            del: function (id) {
                var that = this;
                this.$root.confirms.push({
                    fn: function () {
                        ajax({
                            url: "/admin/designerOpus/delDesignerOpus",
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
                    text: "您确定要永久删除该设计师作品？"
                });
            }
        },
        mounted: function () {
            this.getList();
        },
        activated: function () {
            this.getList();
        }
    })
</script>