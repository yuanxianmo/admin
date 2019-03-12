<template>
    <main>
        <tabs :tabs="['基本信息','设计师详情']">
            <div class="tab-wrap" slot="0">
                <table class="edit">
                    <tbody>
                        <tr>
                            <td>
                                <strong class="required">*</strong>
                                设计师名称
                            </td>
                            <td>
                                <input class="focus w486" placeholder="请输入设计师的名称" required v-model="data.name">
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong class="required">*</strong>
                                设计师等级
                            </td>
                            <td>
                                <label class="radio" v-for="i in level">
                                    <input type="radio" name="level" v-model="data.level" :value="i.id">
                                    <div></div>
                                    <span>{{i.title}}</span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td class="v-top lh32">
                                <strong class="required">*</strong>
                                设计师头像：
                            </td>
                            <td>
                                <div class="flex-input mb10 w486">
                                    <input readonly="readonly" :value="data.imgSrc" placeholder="请选择设计师头像，展示在邀约详情" class="desc h32">
                                    <button class="black" @click="imgPos='thumb',selectImage=true">选择图片</button>
                                </div>
                                <images-selected :data="[data.imgSrc]" @del="data.imgSrc=''">
                                </images-selected>
                                <p class="tip">
                                    <strong class="required">*</strong>建议尺寸:450*450, 图片大小1M以内；请将所有作品图片尺寸保持一致
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td><strong class="required">*</strong>邀约价格</td>
                            <td>
                                <input class="focus w486" v-model="data.price" type="number" step="0.01" min="0" required>
                            </td>
                        </tr>
                        <tr>
                            <td>是否上架</td>
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
                    </tbody>
                </table>
            </div>
            <div class="tab-wrap" slot="1">
                <table class="edit">
                    <tbody>
                        <tr>
                            <td class="v-top">设计师详情：</td>
                            <td>
                                <quill-editor ref="quillEditor" :options="editorOption" v-model="data.content">
                                </quill-editor>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </tabs>
        <div class="actions">
            <action @click.native="save" v-permission="id?'artists_edit':'artists_add'" :text="'保存设计师'"></action>
            <button class="black-simple" @click="$router.push('/artists')">返回列表</button>
        </div>
        <transition name="fade">
            <keep-alive>
                <images-selector v-if="selectImage" :file-mode="fileMode" :single="true" @close="selectImage=false" @confirm="selectImg">
                </images-selector>
            </keep-alive>
        </transition>
    </main>
</template>
<style>
    .w486 {
        width: 486px;
    }

    table.edit td:last-child {
        width: 100%;
    }

    .tab-wrap {
        padding: 30px;
    }

    .rich-text {
        width: 540px;
        height: 180px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                id: this.$route.params.id,
                data: {},
                level: [],
                selectImage: false,
                fileMode: false,
                imgSingle: true,
                imgPos: "",
                uploadUrl: "",
                editorOption: {
                    bounds: "main",
                    theme: 'snow',
                    placeholder: "请输入内容",
                    modules: {
                        toolbar: {
                            container: [
                                ["bold", "italic", "underline", "strike"],
                                ["blockquote", "code-block"],
                                [{
                                    "header": 1
                                }, {
                                    "header": 2
                                }],
                                [{
                                    "list": "ordered"
                                }, {
                                    "list": "bullet"
                                }],
                                [{
                                    "script": "sub"
                                }, {
                                    "script": "super"
                                }],
                                [{
                                    "indent": "-1"
                                }, {
                                    "indent": "+1"
                                }],
                                [{
                                    "direction": "rtl"
                                }],
                                [{
                                    "size": ["small", false, "large", "huge"]
                                }],
                                [{
                                    "header": [1, 2, 3, 4, 5, 6, false]
                                }],
                                [{
                                    "color": []
                                }, {
                                    "background": []
                                }],
                                [{
                                    "font": ['Arial', '宋体', '黑体', '微软雅黑', '楷体']
                                }],
                                [{
                                    "align": []
                                }],
                                ["clean"],
                                ["link", "image", "video"]
                            ],
                            handlers: {
                                image: function (v) {
                                    this.imgSingle = true;
                                    this.imgPos = "editor";
                                    this.selectImage = true;
                                }.bind(this)
                            }
                        }
                    }
                },
            }
        },
        components: {
            LocalQuillEditor: VueQuillEditor.quillEditor
        },
        computed: {
            editor: function () {
                return this.$refs.quillEditor.quill
            },
        },
        methods: {
            selectImg: function (imgs) {
                if (this.imgPos == 'editor') {
                    this.editor.insertEmbed(this.editor.getSelection(true).index, 'image', imgs[0]);
                } else {
                    this.data.imgSrc = imgs[0];
                }
            },
            getData: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/designer/selectDetail",
                    data: {
                        id: that.id
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.data = res.data;
                            that.getLevel();
                        }
                    }
                });
            },
            getLevel: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/designerLevel/select",
                    success: function (res) {
                        if (res.code === 0) {
                            that.level = res.data;
                            that.ajaxStatus = "ready";
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
                    url: "/admin/designer/updateDesigner",
                    type: "put",
                    data: that.data,
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/artists");
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/designer/addDesigner",
                    type: "post",
                    data: that.data,
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/artists");
                        }
                    }
                });
            }
        },
        mounted: function () {
            if (this.id) {
                this.getData();
            } else {
                this.getLevel();
            }
        }
    })
</script>