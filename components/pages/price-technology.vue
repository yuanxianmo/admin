<template>
    <main>
        <div class="page-head mb20 sticky">
            <div class="left">
                <img src="images/price/technology.png">工艺分类管理
            </div>
            <div class="right">
                <button class="theme-bt add" @click="mode='add';type='tech';tree.push(currentBranch={name:'',status:0});" v-if="type=='root'"
                    v-permission="'technology_name_add'">
                    新增工艺
                </button>
                <button class="theme-bt add" @click="mode='add';type='techAttr';currentBranch.attrs.push(currentBranch={technologyId:currentBranch.id});"
                    v-if="type=='tech'" v-permission="'technology_attr_add'">
                    新增工艺属性
                </button>
                <button class="theme-bt add" @click="mode='edit'" v-if="type=='tech'" v-permission="'technology_name_edit'" key="editTech">
                    编辑
                </button>
                <button class="theme-bt add" @click="mode='edit'" v-if="type=='techAttr'" v-permission="'technology_attr_edit'" key="editTechAttr">
                    编辑
                </button>
                <button class="theme-bt add" v-if="type=='tech'&&currentBranch.status===0" @click="del" v-permission="'technology_name_del'">
                    禁用
                </button>
                <button class="theme-bt add" v-if="type=='techAttr'&&currentBranch.status===0" @click="del" v-permission="'technology_attr_del'">
                    禁用
                </button>
                <button class="theme-bt add" v-if="type=='tech'&&currentBranch.status===1" @click="enable" v-permission="'technology_name_enable'">
                    启用
                </button>
                <button class="theme-bt add" v-if="type=='techAttr'&&currentBranch.status===1" @click="enable" v-permission="'technology_attr_enable'">
                    启用
                </button>
            </div>
        </div>
        <div class="page-body tree">
            <div id="tree" @click="currentBranch={id:undefined};type='root'" :class="{readonly:mode!=='read'}">
                <dl class="branch" v-for="l1 in tree">
                    <dt :class="{disabled:l1.status==1,expand:l1.expand,'has-children':true,current:currentBranch==l1}" @click.stop="mode='read';currentBranch=l1;parentBranch={id:-1};type='tech'"
                        @dblclick.stop="l1.expand=!l1.expand;">{{l1.name}}</dt>
                    <transition name="tree">
                        <dd v-if="l1.expand">
                            <dl class="branch" v-for="l2 in l1.attrs">
                                <dt :class="{disabled:l2.status==1,expand:l2.expand,'has-children':false,current:currentBranch==l2}" @click.stop="mode='read';currentBranch=l2;parentBranch=l1;type='techAttr'"
                                    @dblclick.stop="l2.expand=!l2.expand;">{{l2.name}}</dt>
                            </dl>
                        </dd>
                    </transition>
                </dl>
            </div>
            <div id="edit-tree" :class="{readonly:mode=='read'}" v-if="type!='root'">
                <table class="edit">
                    <tbody>
                        <tr v-if="type=='techAttr'">
                            <td>所属工艺ID</td>
                            <td>
                                <input class="focus" readonly :value="currentBranch.technologyId">
                            </td>
                        </tr>
                        <tr>
                            <td><strong class="required">*</strong>{{type=='techAttr'?"工艺属性名称":"工艺名称"}}</td>
                            <td>
                                <input required class="focus" :placeholder='type=="techAttr"?"工艺属性名称":"工艺名称"' v-model="currentBranch.name" :readonly="mode=='read'"
                                    min="0">
                            </td>
                        </tr>
                        <tr v-if="type=='tech'">
                            <td><strong class="required">*</strong>类型</td>
                            <td>
                                <input required class="focus" placeholder="工艺类型" v-model="currentBranch.type">
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td class="actions">
                                <action :text="'提交'" @click.native="save" v-if="mode!='read'" :disabled="type=='tech'&&(currentBranch.name==''||currentBranch.type=='')||type=='techAttr'&&currentBranch.name==''"></action>
                                <button class="black-simple" @click="mode='read';getTree()" v-if="mode!='read'">取消</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>
<style>
</style>
<script>
    ({
        data: function () {
            return {
                tree: [],
                currentBranch: {
                    type: undefined,
                    parentId: -1
                },
                parentBranch: {},
                mode: "read",
                type: "root"
            }
        },
        methods: {
            getTree: function (current) {
                var that = this;
                this.mode = "read";
                ajax.call(this, {
                    url: "/admin/technology/selectAll",
                    success: function (res) {
                        if (res.code === 0) {
                            $.each(res.data, function (index, item) {
                                item.expand = false;
                                $.each(item.attrs, function (index2, item2) {
                                    item2.expand = false;
                                });
                            });
                            if (current) {
                                if (current.tp == "tech") {
                                    $.each(that.tree, function (index, item) {
                                        if (item.id == current.id) {
                                            item.name = current.name;
                                            item.status = current.status;
                                            item.type = current.type;
                                            item.attrs = current.attrs;
                                        }
                                    });
                                } else {
                                    $.each(that.tree, function (index, item) {
                                        $.each(item.attrs, function (index2, item2) {
                                            if (item2.id == current.id) {
                                                item2.name = current.name;
                                                item2.price = current.price;
                                                item2.status = current.status;
                                                item2.technologyId = current.technologyId;
                                            }
                                        })
                                    })
                                }
                            } else {
                                that.tree = res.data;
                            }
                            that.ajaxStatus = "ready";
                            that.type = "root";
                        }
                    }
                });
            },
            save: function () {
                if (this.currentBranch.name == "" || this.currentBranch.name == undefined) {
                    this.$root.alerts.push({
                        text: "请输入名称"
                    });
                    return;
                }
                if (this.mode == 'edit') {
                    this.edit();
                } else if (this.mode == 'add') {
                    this.add();
                }
            },
            edit: function () {
                var that = this;
                if (this.type == 'tech') {
                    ajax.call(this, {
                        url: "/admin/technology/updateTechnology?name=" + encodeURIComponent(that.currentBranch
                                .name || "无") +
                            "&tid=" + that.currentBranch.id + "&status=" + that.currentBranch.status +
                            "&type=" + that.currentBranch.type,
                        type: "put",
                        success: function (res) {
                            if (res.code == 0) {
                                that.getTree($.extend({
                                    tp: that.type
                                }, that.currentBranch));
                            }
                        }
                    });
                } else if (this.type == 'techAttr') {
                    ajax.call(this, {
                        url: "/admin/technology/updateTechAttr?techName=" + encodeURIComponent(that.currentBranch
                                .name || "无") +
                            "&price=" + that.currentBranch.price + "&taid=" + that.currentBranch.id +
                            "&status=" + that.currentBranch.status,
                        type: "put",
                        success: function (res) {
                            if (res.code == 0) {
                                that.getTree($.extend({
                                    tp: that.type
                                }, that.currentBranch));
                            }
                        }
                    });
                }
            },
            add: function () {
                var that = this;
                if (this.type == 'tech') {
                    ajax.call(this, {
                        url: "/admin/technology/addTech?techName=" + encodeURIComponent(that.currentBranch
                            .name || "无") + "&type=" + that.currentBranch.type,
                        type: "post",
                        success: function (res) {
                            if (res.code == 0) {
                                that.getTree();
                            }
                        }
                    });
                } else if (this.type == 'techAttr') {
                    ajax.call(this, {
                        url: "/admin/technology/addTechAttr?techName=" + encodeURIComponent(that.currentBranch
                                .name || "无") +
                            "&price=" + that.currentBranch.price + "&tid=" + that.currentBranch.technologyId,
                        type: "post",
                        success: function (res) {
                            if (res.code == 0) {
                                that.getTree();
                            }
                        }
                    });
                }
            },
            del: function () {
                var that = this;
                if (this.type == 'tech') {
                    ajax.call(this, {
                        url: "/admin/technology/delTechnology?tid=" + that.currentBranch.id,
                        type: "delete",
                        success: function (res) {
                            if (res.code == 0) {
                                that.getTree($.extend({
                                    tp: that.type
                                }, that.currentBranch, {
                                    status: 1
                                }));
                            }
                        }
                    });
                } else if (this.type == 'techAttr') {
                    ajax.call(this, {
                        url: "/admin/technology/delTechAttr?taid=" + that.currentBranch.id,
                        type: "delete",
                        success: function (res) {
                            if (res.code == 0) {
                                that.getTree($.extend({
                                    tp: that.type
                                }, that.currentBranch, {
                                    status: 1
                                }));
                            }
                        }
                    });
                }
            },
            enable: function () {
                var that = this;
                if (this.type == 'tech') {
                    ajax.call(this, {
                        url: "/admin/technology/updateTechnologyStatus?tid=" + that.currentBranch.id,
                        success: function (res) {
                            if (res.code == 0) {
                                that.getTree($.extend({
                                    tp: that.type
                                }, that.currentBranch, {
                                    status: 0
                                }));
                            }
                        }
                    });
                } else if (this.type == 'techAttr') {
                    ajax.call(this, {
                        url: "/admin/technology/updateTechAttrStatus?taid=" + that.currentBranch.id,
                        success: function (res) {
                            if (res.code == 0) {
                                that.getTree($.extend({
                                    tp: that.type
                                }, that.currentBranch, {
                                    status: 0
                                }));
                            }
                        }
                    });
                }
            },
            select: function (v) {
                this.currentBranch[v[0]] = v[1]
            }
        },
        mounted: function () {
            this.getTree();
        }
    })
</script>