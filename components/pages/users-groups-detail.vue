<template>
    <main>
        <div class="page-head mb10">
            <div class="left">
                <img src="images/users/layers.png">分组列表>{{id?"编辑":"新增"}}用户分组
            </div>
            <div class="right">
                <button class="theme-bt add" @click="groupDescript.push([''])">
                    <img src="images/add.png">添加更多特权
                </button>
            </div>
        </div>
        <div class="page-body">
            <table class="edit">
                <tbody>
                    <tr>
                        <td><strong class="required">*</strong>分组名称：</td>
                        <td>
                            <input class="focus" placeholder="请输入分组名称" v-model="groupName" required>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top lh32"><strong class="required">*</strong>成为组员的特权：</td>
                        <td>
                            <div class="group-descript" v-for="(i,index) in groupDescript">
                                <input class="focus" placeholder="简述成为组员能获得的特权" v-model="i[0]" required>
                                <button class="x simple" @click="groupDescript.length>1&&groupDescript.splice(index,1)" v-show="groupDescript.length>1"></button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action @click.native="update" :text="'提交'" v-permission="'group_edit'" v-if="id"></action>
                            <action @click.native="insert" :text="'提交'" v-permission="'group_add'" v-else></action>
                            <button class="black-simple" @click="$router.push('/users/groups')">返回列表</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style>
    table.edit input {
        width: 400px;
    }

    .group-descript {
        display: flex;
        align-items: center;
    }

    .group-descript:not(:last-child) {
        margin-bottom: 5px;
    }

    button.x {
        width: 15px;
        height: 15px;
        background-image: url(images/x.png);
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 10px;
    }
    table.edit td:first-child{
        width: 200px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                id: this.$route.params.id,
                groupName: null,
                groupDescript: [
                    [""]
                ]
            }
        },
        computed: {
            submitGroupDescript: function () {
                var ret = [];
                $.each(this.groupDescript, function (index, item) {
                    ret.push(item[0]);
                });
                return ret.join("||")
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/group/" + that.id,
                    success: function (res) {
                        if (res.code === 0) {
                            that.groupName = res.data.groupName;

                            that.groupDescript = (function () {
                                var ret = [];
                                $.each(res.data.groupDescript.split("||"), function (index,
                                    item) {
                                    ret.push([item]);
                                });
                                return ret;
                            })();
                        }
                    }
                });
            },
            update: function (fn) {
                var that = this;
                ajax.call(this, {
                    url: "/admin/group",
                    type: "put",
                    data: {
                        id: that.id,
                        groupName: that.groupName,
                        groupDescript: that.submitGroupDescript
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/users/groups");
                        }
                    }
                });
            },
            insert: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/group",
                    type: "post",
                    data: {
                        groupName: that.groupName,
                        groupDescript: that.submitGroupDescript
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/users/groups");
                        }
                    }
                });
            },
            save: function () {
                if (this.id) {
                    this.update();
                } else {
                    this.insert();
                }
            }
        },
        mounted: function () {
            if (this.id) {
                this.getData();
            }
        }
    })
</script>