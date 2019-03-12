<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/users/user.png">用户列表
            </div>
        </div>
        <div class="page-body">
            <div class="top-fns mb10">
                <search :width="'300px'" :placeholder="'请输入姓名/手机号/邮箱'" v-model="filter.keyword" @search="getList()"></search>
                <v-filter :height="'34px'" :fn="getList">
                    <div>
                        <drop-down :theme="'simple'" :min-width="'100px'" :height="'32px'" :inner-height="'18px'" :data="groups" @select="filter.groupId=$event"
                            :name="'groupName'" :value="'id'" :placeholder="'分组'" :all="'全部'"></drop-down>
                        <drop-down :theme="'simple'" :min-width="'100px'" :height="'32px'" :inner-height="'18px'" :data="[{name:'正常',value:0},{name:'黑名单',value:1}]"
                            @select="filter.status=$event" :placeholder="'状态'" :all="'全部'"></drop-down>
                    </div>
                </v-filter>
            </div>
            <table class="common row-border mb20">
                <thead>
                    <tr>
                        <th>用户ID</th>
                        <th>推荐人</th>
                        <th>用户账号</th>
                        <th>绑定邮箱</th>
                        <th>绑定手机号</th>
                        <th>注册时间</th>
                        <th>成交量</th>
                        <th>用户组</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in data">
                        <td>{{i.id}}</td>
                        <td>无</td>
                        <td class="word-break">{{i.username}}</td>
                        <td class="word-break">{{i.email||"未绑定"}}</td>
                        <td>{{i.phone||"未绑定"}}</td>
                        <td>{{$root.getDateStr(i.createTime)}}</td>
                        <td>{{i.orderCount||0}}</td>
                        <td>
                            <template v-if="i.userGroupInfoVOS.length">
                                <div v-for="j in i.userGroupInfoVOS||[]">{{j.groupName}}</div>
                            </template>
                            <div v-else>未分组</div>
                        </td>
                        <td>
                            <div class="theme order-status" v-if="i.status===0">正常</div>
                            <div class="gray order-status" v-else>黑名单</div>
                        </td>
                        <td>
                            <drop-down :no-select="true" :width="'80px'" @select="action" :placeholder="'操作'" :data="[{name:'用户详情',value:['detail',i.id],selected:false,permission:'user_detail'},{name:'印刷订单',value:['print',i.id],selected:false,permission:'order_list'},{name:'自定义订单',value:['custom',i.id],selected:false,permission:'order_list'},{name:'设为黑名单',value:['delete',i.id],selected:false,permission:'admin_del'},{name:'发私信',value:'pm',selected:false}]"></drop-down>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button class="theme-bt export" onclick="saveXSL($('table.common')[0])">导出EXCEL</button>
            <pager @pager="pager" :xcurrent-page="currentPage" :xpages="pages"></pager>
        </div>
    </main>
</template>
<style>
    main .status {
        padding: 3px 8px;
        border-radius: 4px;
    }

    main .export {
        padding: 5px 10px;
        border-radius: 4px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                data: [],
                groups: [],
                filter: {
                    groupId: undefined,
                    status: undefined,
                    keyword: ""
                }
            }
        },
        methods: {
            action: function (v) {
                switch (v[0]) {
                    case "detail":
                        this.$router.push("/users/" + v[1]);
                        break;
                    case "delete":
                        this.$root.confirms.push({
                            text: "确定加入到黑名单？",
                            fn: function () {
                                this.delete(v[1]);
                            }.bind(this)
                        });
                        break;
                    case "print":
                        this.$router.push("/orders/u/" + v[1]);
                        break;
                    case "custom":
                        this.$router.push("/orders/custom/u/" + v[1]);
                        break;
                }
            },
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/user/userList",
                    data: {
                        status: that.filter.status,
                        groupId: that.filter.groupId,
                        currentPage: that.currentPage,
                        pageSize: that.pageSize,
                        phone: that.filter.keyword
                    },
                    type: "get",
                    success: function (res) {
                        if (res.code == 0) {
                            that.data = res.data;
                            that.total = res.total;
                        }
                    }
                });
            },
            getGroups: function () {
                var that = this;
                ajax({
                    url: "/admin/group",
                    data: {
                        currentPage: 1,
                        pageSize: 1000
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.groups = res.data;
                        }
                    }
                });
            },
            delete: function (id) {
                var that = this;
                ajax({
                    url: "/admin/user/" + id,
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
            this.getGroups();
            this.getList();
        }
    })
</script>