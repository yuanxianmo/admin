<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/home/slideshow.png">轮播管理
            </div>
        </div>
        <div class="page-index">
            <table class="edit">
                <tbody>
                    <tr>
                        <td>轮播标题：</td>
                        <td>
                            <input class="focus w400" v-model="data.bannerTitle">
                        </td>
                    </tr>
                    <tr>
                        <td>排序：</td>
                        <td>
                            <input class="focus w400" placeholder="数字越大，排名越靠前" v-model="data.bannerOrder" type="number">
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top lh32">轮播图片：</td>
                        <td>
                            <div class="flex-input mb10 w400">
                                <input readonly="readonly" placeholder="请选择作品展示大图，展示在首页、分类、搜索、详情" class="desc h32" :value="data.bannerFileurl">
                                <button class="black" @click="selectImage=true" v-if="$route.params.id" v-permission="'banner_edit'">选择图片</button>
                                <button class="black" @click="selectImage=true" v-else v-permission="'banner_add'">选择图片</button>
                            </div>
                            <images-selected @del="data.bannerFileurl=''" :data="[data.bannerFileurl]" v-if="data.bannerFileurl"><images-selected>
                            <p class="tip">
                                <strong class="required">*</strong>建议尺寸:450*450, 图片大小1M以内；请将所有作品图片尺寸保持一致
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>轮播链接：</td>
                        <td>
                            <input class="focus w400" placeholder="请填写指向的链接" v-model="data.bannerLink" maxlength="255">
                        </td>
                    </tr>
                    <tr>
                        <td>轮播位置：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="position" :value="1" v-model="data.bannerSite">
                                <div></div>
                                <span>首页</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="position" :value="2" v-model="data.bannerSite">
                                <div></div>
                                <span>首页设计师</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="position" :value="3" v-model="data.bannerSite">
                                <div></div>
                                <span>设计师页面</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>是否显示：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" :value="0" name="open" v-model="data.isShow">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio">
                                <input type="radio" :value="1" name="open" v-model="data.isShow">
                                <div></div>
                                <span>否</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action :text="'提交'" @click.native="edit" v-permission="'banner_edit'" v-if="$route.params.id"></action>
                            <action :text="'提交'" @click.native="add" v-permission="'banner_add'" v-else></action>
                            <button class="black-simple" @click="$router.push('/index/slideshow')">返回</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <transition name="fade">
            <keep-alive>
                <images-selector v-if="selectImage" :upload-url="'/api/oss/uploadBanner'" :single="true" :history-url="'/admin/banner/getHistoryPhotUrl'" @confirm="pushImages"
                    @close="selectImage=false"><images-selector>
            </keep-alive>
        </transition>
    </main>
</template>
<style>
    .w400 {
        width: 400px;
    }

    .lh32 {
        line-height: 32px !important;
    }
</style>
<script>
    ({
        data: function () {
            return {
                selectImage: false,
                data: {
                    bannerFileurl: "",
                    bannerLink: "",
                    bannerOrder: "",
                    bannerSite: 1,
                    bannerTitle: "",
                    createTime: "",
                    id: undefined,
                    isShow: 0,
                    status: undefined
                },
                aa:""
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/banner/" + that.$route.params.id,
                    success: function (res) {
                        if (res.code === 0) {
                            that.data = res.data;
                        }
                    }
                });
            },
            save: function () {
                if (this.$route.params.id) {
                    this.edit();
                } else {
                    this.add();
                }
            },
            edit: function () {
                var that = this;
                ajax.call(this,{
                    url: "/admin/banner",
                    type: "put",
                    data: that.data,
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/index/slideshow");
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this,{
                    url: "/admin/banner",
                    type: "post",
                    data: that.data,
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/index/slideshow");
                        }
                    }
                });
            },
            pushImages: function (images) {
                this.data.bannerFileurl = images[images.length - 1];
            }
        },
        mounted: function () {
            if (this.$route.params.id) {
                this.getData();
            }
        }
    })
</script>