<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/home/order.png">客服列表>编辑/新增客服
            </div>
        </div>
        <div class="page-body">
            <table class="edit">
                <tbody>
                    <tr>
                        <td><strong class="required">*</strong>客服名称：</td>
                        <td class="w100">
                            <input class="focus w100" placeholder="请输入客服名称" v-model="data.name" required>
                        </td>
                    </tr>
                    <tr>
                        <td><strong class="required">*</strong>登录账号：</td>
                        <td class="w100">
                            <input class="focus w100" placeholder="请输入客服登录账号" v-model="data.account" required>
                        </td>
                    </tr>
                    <tr>
                        <td><strong class="required" v-if="!id">*</strong>登录密码：</td>
                        <td class="w100">
                            <input class="focus w100" type="password" placeholder="请输入客服登录密码" v-model="data.password" :required="!id">
                        </td>
                    </tr>
                    <tr>
                        <td><strong class="required" v-if="!id">*</strong>再次输入登录密码：</td>
                        <td class="w100">
                            <input class="focus w100" type="password" placeholder="请再次输入客服登录密码" v-model="data.passwordAgain" :required="!id">
                        </td>
                    </tr>
                    <tr>
                        <td>客服组：</td>
                        <td class="w100">
                            <label class="radio" v-for="i in groups">
                                <input type="radio" name="open" :value="i.id" v-model="data.groupId">
                                <div></div>
                                <span>{{i.name}}</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top lh32"><strong class="required">*</strong>客服头像：</td>
                        <td class="w100">
                            <div class="flex-input mb10 w100">
                                <input readonly class="desc h32" :value="data.header" placeholder="请选择作品展示大图，展示在首页、分类、搜索、详情">
                                <button class="black" @click="selectImage=true">选择图片</button>
                            </div>
                            <images-selected :data="[data.header]" @del="data.header=undefined" :key="'imgsl'"></images-selected>
                            <p class="tip">
                                <strong class="required">*</strong>建议尺寸:256*256, 图片大小1M以内；
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>是否可用：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="up" :value="0" v-model.number="data.status">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="up" :value="1" v-model.number="data.status">
                                <div></div>
                                <span>否</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions w100">
                            <action @click.native="save" :text="'保存客服'" v-permission="id?'service_edit':'service_add'"></action>
                            <button class="black-simple" @click="$router.push('/service')">返回列表</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <transition name="fade">
            <keep-alive>
                <images-selector v-if="selectImage" :single="true" @close="selectImage=false" @confirm="$set(data,'header',$event[0])">
                    <images-selector>
            </keep-alive>
        </transition>
    </main>
</template>
<style>
    main .page-body {
        padding-right: 300px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                selectImage: false,
                imgs: [],
                data: {},
                groups: [],
                id: this.$route.params.id
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/customerservice/" + that.id,
                    success: function (res) {
                        if (res.code === 0) {
                            that.data = res.data;
                            that.getGroups();
                        }
                    }
                });
            },
            getGroups: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/customergroup",
                    success: function (res) {
                        if (res.code === 0) {
                            that.groups = res.data;
                            that.ajaxStatus = "ready";
                        }
                    }
                });
            },
            save: function () {
                if (this.password != this.passwordAgain) {
                    this.$root.alerts.push({
                        text: "两次密码输入不一致！"
                    });
                    return;
                }
                this.id ? this.edit() : this.add();
            },
            edit: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/customerservice",
                    data: that.data,
                    type: "put",
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/service");
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/customerservice",
                    data: that.data,
                    type: "post",
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/service");
                        }
                    }
                });
            }
        },
        mounted: function () {
            if (this.id) {
                this.getData();
            } else {
                this.getGroups();
            }
        }
    })
</script>