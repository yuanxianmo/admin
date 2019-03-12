<template>
    <main>
        <div class="page-head mb10">
            <div class="left">
                <img src="images/backend/website.png">网站设置
            </div>
        </div>
        <div class="page-index">
            <table class="edit">
                <tbody>
                    <tr>
                        <td><strong class="required">*</strong>网站名称：</td>
                        <td>
                            <input class="focus w400" placeholder="网站标签页显示名称" v-model="data.websiteName" required>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top lh32"><strong class="required">*</strong>网站Logo：</td>
                        <td>
                            <div class="flex-input mb10 w538">
                                <input readonly="readonly" placeholder="网站标签页显示logo " class="desc h32" :value="data.websiteLogo">
                                <button class="black" @click="selectImage=true">选择图片</button>
                            </div>
                            <images-selected @del="data.websiteLogo=''" :data="[data.websiteLogo]" v-if="data.websiteLogo">
                            </images-selected>
                            <p class="tip">
                                <strong class="required">*</strong>建议尺寸:25*25, 图片大小1M以内
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top lh32"><strong class="required">*</strong>网站简介：</td>
                        <td>
                            <textarea class="focus" id="website-desc" v-model="data.websiteIntroduction" required></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td><strong class="required">*</strong>客服电话：</td>
                        <td>
                            <input type="tel" class="focus w400" placeholder="公司电话" v-model="data.websitePhone" required>
                        </td>
                    </tr>
                    <tr>
                        <td><strong class="required">*</strong>版权信息：</td>
                        <td>
                            <input class="focus w400" placeholder="版权所有©后面的字样" v-model="data.websiteVersion" required>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action :text="'提交'" @click.native="submit" v-permission="'website_edit'" :disabled="data.websiteIntroduction==''||data.websiteLogo==''||data.websiteName==''||data.websitePhone==''||data.websiteVersion==''"></action>
                            <button @click="getData" class="black-simple">取消</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <transition name="fade">
            <keep-alive>
                <images-selector v-if="selectImage" :upload-url="'/api/oss/uploadOther'" :single="true" @confirm="pushImages"
                    @close="selectImage=false">
                    <images-selector>
            </keep-alive>
        </transition>
    </main>
</template>
<style>
    table.edit input {
        width: 538px;
    }

    .w538 {
        width: 538px;
    }

    #website-desc {
        width: 538px;
        height: 100px;
        border: 1px solid #d2d2d2;
        resize: vertical;
        padding: 7px;
        transition: all .2s;
    }
</style>
<script>
    ({
        data: function () {
            return {
                selectImage: false,
                selectedImages: [],
                data: {}
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/settings/getWebInfo",
                    success: function (res) {
                        if (res.code === 0) {
                            that.data = res.data;
                        }
                    }
                });
            },
            pushImages: function (images) {
                this.data.websiteLogo = images[images.length - 1];
            },
            submit:function(){
                var that=this;
                ajax.call(this,{
                    url:"/admin/settings/setWebInfo",
                    type:"post",
                    data:that.data,
                    success:function(res){
                        if (res.code===0) {
                            that.ajaxStatus="ready";
                            that.$root.alerts.push({
                                text:"操作成功！"
                            });
                        }
                    }
                });
            }
        },
        mounted: function () {
            this.getData();
        }
    })
</script>