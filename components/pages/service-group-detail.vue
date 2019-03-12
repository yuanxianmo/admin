<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/home/order.png">客服组
            </div>
        </div>
        <div class="page-body">
            <table class="edit">
                <tbody>
                    <tr>
                        <td><strong class="required">*</strong>客服组名称：</td>
                        <td>
                            <input class="focus w400" placeholder="请输入客服组的名称" v-model="data.name" required>
                        </td>
                    </tr>
                    <tr>
                        <td>服务内容：</td>
                        <td>
                            <input class="focus w400" placeholder="简述该组客服的主要工作职责" v-model="data.descript">
                        </td>
                    </tr>
                    <tr>
                        <td>状态：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="up" :value="0" v-model="data.status">
                                <div></div>
                                <span>启用</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="up" :value="1" v-model="data.status">
                                <div></div>
                                <span>禁用</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action @click.native="save" class="black" :text="'提交'" v-permission="id?'service_group_edit':'service_group_add'"></action>
                            <button class="black-simple" @click="$router.push('/service/group')">返回列表</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style>
    .w400 {
        width: 400px;
    }

    main .page-body {
        padding-right: 200px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                id: this.$route.params.id,
                data: {status:0}
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/customergroup/" + that.id,
                    success: function (res) {
                        if (res.code === 0) {
                            that.data = res.data;
                        }
                    }
                });
            },
            save: function () {
                this.id ? this.edit() : this.add();
            },
            edit: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/customergroup",
                    data: that.data,
                    type: "put",
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/service/group");
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/customergroup",
                    data: that.data,
                    type: "post",
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/service/group");
                        }
                    }
                });
            }
        },
        mounted: function () {
            if (this.id) {
                this.getData();
            }
        }
    })
</script>