<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/list.png">行业分类列表>{{data.id?"编辑":"新增"}}分类
            </div>
        </div>
        <div class="wrap">
            <table class="edit">
                <tbody>
                    <!-- <tr>
                        <td>上级分类：</td>
                        <td class="lighter">顶级分类</td>
                    </tr>
                    <tr>
                        <td>分类链接：</td>
                        <td class="copy">
                            <input readonly value="http://bing.com">
                            <span>（点击复制）</span>
                        </td>
                    </tr> -->
                    <tr>
                        <td><strong class="required">*</strong>分类名称：</td>
                        <td>
                            <input class="focus w400" placeholder="请输入分类名称" v-model="data.name" required>
                        </td>
                    </tr>
                    <tr v-if="data.id">
                        <td>是否启用：</td>
                        <td>
                            <label class="radio" v-permission="'profession_enable'">
                                <input type="radio" :value="0" name="open" v-model="data.status">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio" v-permission="'profession_disable'">
                                <input type="radio" :value="1" name="open" v-model="data.status">
                                <div></div>
                                <span>否</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action @click.native="save" :text="'提交'" v-permission="data.id?'profession_edit':'profession_add'" :disabled="data.name==''"></action>
                            <button class="black-simple" @click="$router.push('/works/profession')">返回列表</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style>
    td.copy {
        color: #C4A66A;
    }

    td.copy input {
        border: none;
        background-color: transparent;
        margin-right: 10px;
    }

    .mb10 {
        margin-bottom: 10px;
    }

    table.edit .tip {
        font-size: 12px;
        color: #8f8f8f;
        margin: 0;
    }

    main .wrap {
        padding-right: 300px;
    }

    main {
        padding-bottom: 100px;
    }

    .lighter {
        color: #353535;
    }

    .w400 {
        width: 400px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                data: {
                    id: this.$route.params.id,
                    name: "",
                    status: 0
                },
                oStatus: 0
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/goodsprofession/selectById",
                    data: {
                        id: that.data.id
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.oStatus = res.data.status;
                            that.data = res.data;
                        }
                    }
                });
            },
            save: function () {
                if (this.data.id) {
                    if (this.data.status != this.oStatus) {
                        this.updateStatus();
                    } else {
                        this.edit();
                    }
                } else {
                    this.add();
                }
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/goodsprofession/addProfession?name=" + encodeURIComponent(that.data.name),
                    type: "post",
                    data: that.data,
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/works/profession");
                        }
                    }
                });
            },
            updateStatus: function () {
                var that = this;
                if (that.data.status == 0) {
                    ajax.call(this, {
                        url: "/admin/goodsprofession/updateProfessionStatus?gid=" + that.data.id,
                        type: "put",
                        success: function (res) {
                            if (res.code == 0) {
                                that.edit();
                            }
                        }
                    });
                } else {
                    ajax.call(this, {
                        url: "/admin/goodsprofession/delProfession?gid=" + that.data.id,
                        type: "delete",
                        success: function (res) {
                            if (res.code == 0) {
                                that.edit();
                            }
                        }
                    });
                }
            },
            edit: function () {
                var that = this;
                ajax({
                    url: "/admin/goodsprofession/updateProfessionName?gid=" + that.data.id + "&name=" +
                        encodeURIComponent(that.data.name),
                    type: "put",
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/works/profession");
                        }
                    }
                });
            }
        },
        mounted: function () {
            if (this.data.id) {
                this.getData();
            }
        }
    })
</script>