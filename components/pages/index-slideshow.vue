<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/home/slideshow.png">轮播管理
            </div>
            <div class="right">
            </div>
        </div>
        <div class="page-body slideshow">
            <div class="top-fns mb20">
                <button class="theme-bt add" @click="$router.push('/index/slideshow/add')" v-permission="'banner_add'">
                    <img src="images/add.png">新增轮播
                </button>
                <v-filter :height="'34px'" :fn="getList">
                    <div>
                        <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :inner-height="'18px'" :data="[{name:'所有位置',value:undefined,selected:true},{name:'主页',value:1,selected:false},{name:'设计师首页',value:2,selected:false},{name:'设计师页面',value:3}]" @select="bannerSite=$event"></drop-down>
                        <drop-down :theme="'simple'" :width="'120px'" :height="'32px'" :inner-height="'18px'" :data="[{name:'全部状态',value:undefined,selected:true},{name:'显示',value:0},{name:'隐藏',value:1}]" @select="isShow=$event;"></drop-down>
                    </div>
                </v-filter>
            </div>
            <table class="common mb20">
                <thead>
                    <tr>
                        <th>排序</th>
                        <th>ID</th>
                        <th>标题</th>
                        <th>图片</th>
                        <th>链接</th>
                        <th>位置</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in list">
                        <td>{{i.bannerOrder}}</td>
                        <td>{{i.id}}</td>
                        <td>{{i.bannerTitle}}</td>
                        <td>
                            <img :src="i.bannerFileurl" class="table-thumb" v-broken-link>
                        </td>
                        <td>
                            <a :href="i.bannerLink" target="_blank">{{i.bannerLink}}</a>
                        </td>
                        <td>
                            {{i.bannerSite==1?"首页":(i.bannerSite==2?"设计师首页":"设计师页面")}}
                        </td>
                        <td>
                            <div class="order-status theme" v-if="i.isShow===0">显示</div>
                            <div class="order-status gray" v-if="i.isShow!==0">隐藏</div>
                        </td>
                        <td>
                            <div class="simple-bts">
                                <button class="simple" @click="$router.push('/index/slideshow/'+i.id)" v-permission="'banner_detail'">编辑</button>
                                <button class="simple" @click="$root.confirms.push({fn:del,arg:i.id,text:'您确定要永久删除该轮播？'})" v-permission="'banner_del'">删除</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pager @pager="pager" :xcurrent-page="currentPage" :xpages="pages"></pager>
        </div>
    </main>
</template>
<style>
    table.common th {
        background-color: #f2f2f2;
    }

    table.common td {
        border-bottom: 1px solid #f2f2f2;
    }

    table.common td:first-child {
        border-left: 1px solid #f2f2f2;
    }

    table.common td:last-child {
        border-right: 1px solid #f2f2f2;
    }

    table.common .theme-bt {
        border-radius: 3px;
        padding: 3px 9px;
    }

    table.common a {
        word-break: break-all;
    }
</style>
<script>
    ({
        data: function () {
            return {
                list: [],
                bannerSite: undefined,
                isShow: undefined
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/banner",
                    data: {
                        pageSize: that.pageSize,
                        currentPage: that.currentPage,
                        bannerSite: that.bannerSite,
                        isShow: that.isShow
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            res.data.sort(function (a, b) {
                                return Number(a.bannerOrder) < Number(b.bannerOrder);
                            });
                            that.list = res.data;
                            that.total = res.total;
                        }
                    }
                });
            },
            del: function (id) {
                var that = this;
                ajax({
                    url: "/admin/banner/" + id,
                    type: "delete",
                    success: function (res) {
                        if (res.code === 0) {
                            that.getList();
                        }
                    }
                });
            }
        },
        mounted: function () {
            this.getList();
        }
    })
</script>