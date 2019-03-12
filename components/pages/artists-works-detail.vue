<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/home/order.png">设计师作品>新增/编辑设计师作品
            </div>
        </div>
        <div class="page-body">
            <table class="edit">
                <tbody>
                    <tr>
                        <td class="lh32 v-top">
                            <strong class="required">*</strong>
                            作品名称：
                        </td>
                        <td>
                            <input class="focus h32 w100" required placeholder="请输入作品名称" v-model="data.name">
                        </td>
                    </tr>
                    <tr>
                        <td class="lh32 v-top">
                            <strong class="required">*</strong>
                            关联设计师：
                        </td>
                        <td>
                            <div class="flex-input mb10">
                                <input readonly required class="desc h32" placeholder="请选择设计师" :value="data.designerName">
                                <button class="black" @click="selectArtists=true;" v-permission="'artists_list'">选择设计师</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="lh32 v-top">
                            <strong class="required">*</strong>作品大图：</td>
                        <td>
                            <div class="flex-input mb10">
                                <input readonly class="desc h32" placeholder="请选择作品展示大图，展示在首页、分类、搜索、详情" :value="data.majorPhoto[0]">
                                <button class="black" @click="imgPos='major';imgSingle=true;selectImage=true">选择图片</button>
                            </div>
                            <images-selected :data="data.majorPhoto" @del="data.majorPhoto=[]"></images-selected>
                            <p class="tip">
                                <strong class="required">*</strong>建议尺寸:450*450, 图片大小1M以内；请将所有作品图片尺寸保持一致
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="lh32 v-top">作品小图：</td>
                        <td>
                            <div class="flex-input mb10">
                                <input readonly class="desc h32" placeholder="请选择作品展示小图，展示在详情" :value="data.minorPhotos[data.minorPhotos.length-1]">
                                <button class="black" @click="imgPos='minor';imgSingle=false;selectImage=true">选择图片</button>
                            </div>
                            <images-selected :draggable="true" :data="data.minorPhotos" @del="data.minorPhotos.splice($event,1)" @output="data.minorPhotos=$event">
                            </images-selected>
                        </td>
                    </tr>
                    <tr>
                        <td class="lh32 v-top">作品编号：</td>
                        <td><input class="focus h32 w100" placeholder="作品的排序，数字越大越靠前" type="number" v-model="data.sort"></td>
                    </tr>
                    <tr>
                        <td>是否上架：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="status" :value="0" v-model="data.status">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="status" :value="1" v-model="data.status">
                                <div></div>
                                <span>否</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action @click.native="save" v-permission="id?'artists_works_edit':'artists_works_add'">保存作品</action>
                            <button class="black-simple" @click="$router.push('/artists/works')">返回列表</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <transition name="fade">
            <keep-alive>
                <images-selector v-if="selectImage" :file-mode="fileMode" :single="imgSingle" @close="selectImage=false" @confirm="getImage">
                </images-selector>
            </keep-alive>
        </transition>
        <transition name="fade">
            <keep-alive>
                <artists-selector v-if="selectArtists" @close="selectArtists=false" @output="data.designerId=$event.id;data.designerName=$event.name"></artists-selector>
            </keep-alive>
        </transition>
    </main>
</template>
<style>
    table.edit td:last-child {
        width: 100%;
    }
</style>
<script>
    ({
        data: function () {
            return {
                id: this.$route.params.id,
                data: {
                    majorPhoto: [],
                    minorPhotos: [],
                    designerId: undefined,
                    designerName: undefined,
                    status: 0
                },
                imgPos: "",
                designerList: [],
                currentDesignerList: [],
                fileMode: false,
                selectImage: false,
                imgSingle: false,
                selectArtists: false
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/designerOpus/selectDetail",
                    data: {
                        id: that.id
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            res.data.photos.sort(function (a, b) {
                                return a.sort > b.sort;
                            });
                            res.data.photos = (function () {
                                var ret = [];
                                $.each(res.data.photos, function (index, item) {
                                    ret.push(item.imgSrc);
                                });
                                return ret;
                            })();
                            res.data.majorPhoto = [res.data.photos[0]];
                            res.data.minorPhotos = res.data.photos.splice(1);
                            that.data = res.data;
                            that.ajaxStatus = "ready";
                        }
                    }
                });
            },
            getImage: function (e) {
                switch (this.imgPos) {
                    case "major":
                        this.data.majorPhoto = e;
                        break;
                    case "minor":
                        this.data.minorPhotos = this.data.minorPhotos.concat(e);
                        break;
                }
            },
            save: function () {
                this.id ? this.edit() : this.add();
            },
            edit: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/designerOpus/updateDesignerOpus",
                    data: that.submitData,
                    type: "put",
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/artists/works");
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/designerOpus/addDesignerOpus",
                    data: that.submitData,
                    type: "post",
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/artists/works");
                        }
                    }
                });
            }
        },
        computed: {
            submitData: function () {
                var that = this;
                var ret = $.extend({}, this.data);
                ret.photos = (function () {
                    var r = [];
                    $.each(ret.majorPhoto.concat(ret.minorPhotos), function (index, item) {
                        r.push({
                            imgSrc: item,
                            sort: index + 1
                        });
                    });
                    return r;
                })();
                delete ret.majorPhoto;
                delete ret.minorPhotos;
                return ret;
            }
        },
        mounted: function () {
            if (this.id) {
                this.getData();
            }
        }
    })
</script>