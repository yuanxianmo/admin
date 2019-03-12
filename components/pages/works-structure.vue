<template>
    <main>
        <div class="page-head mb20 sticky">
            <div class="left">
                <img src="images/home/order.png">作品结构分类
            </div>
            <div class="right">
                <button class="theme-bt add" :key="'structure_add'" @click="mode='add';currentBranch={fid:currentBranch.id||0};" :disabled="level==3"
                    v-permission="['structure_add',true]">
                    新增结构
                </button>
                <button class="theme-bt add" :key="'structure_edit'" @click="mode='edit'" :disabled="currentBranch.id==undefined" v-permission="['structure_edit',true]">
                    编辑结构
                </button>
                <button class="theme-bt add" :key="'structure_del'" :disabled="currentBranch.id==undefined" @click="del" v-permission="['structure_del',true]">
                    删除结构
                </button>
            </div>
        </div>
        <div class="page-body tree">
            <div id="tree" @click="currentBranch={fid:0};parentBranch={id:0};level=0">
                <dl class="branch" v-for="l1 in tree">
                    <dt :class="{expand:l1.expand,'has-children':l1.nextStructure.length,current:currentBranch==l1,'to-add':mode=='add'&&currentBranch.fid==l1.id}"
                        @click.stop="mode='read';currentBranch=l1;parentBranch={id:0};level=1" @dblclick.stop="l1.expand=!l1.expand">{{l1.name}}</dt>
                    <transition name="tree">
                        <dd v-if="l1.expand">
                            <dl class="branch" v-for="l2 in l1.nextStructure">
                                <dt :class="{expand:l2.expand,'has-children':l2.nextStructure.length,current:currentBranch==l2,'to-add':mode=='add'&&currentBranch.fid==l2.id}"
                                    @click.stop="mode='read';currentBranch=l2;parentBranch=l1;level=2" @dblclick.stop="l2.expand=!l2.expand">{{l2.name}}</dt>
                                <transition name="tree">
                                    <dd v-if="l2.expand">
                                        <dl class="branch" v-for="l3 in l2.nextStructure">
                                            <dt :class="{expand:l3.expand,'has-children':l3.nextStructure.length,current:currentBranch==l3,'to-add':mode=='add'&&currentBranch.fid==l3.id}"
                                                @click.stop="mode='read';currentBranch=l3;parentBranch=l2;level=3" @dblclick.stop="l3.expand=!l3.expand">{{l3.name}}</dt>
                                        </dl>
                                    </dd>
                                </transition>
                            </dl>
                        </dd>
                    </transition>
                </dl>
            </div>
            <div id="edit-tree" :class="{readonly:mode=='read'}">
                <table class="edit">
                    <tbody>
                        <tr>
                            <td>父级节点</td>
                            <td>
                                <input class="focus" placeholder="请输入父级节点ID" readonly :value="currentBranch.fid">
                            </td>
                        </tr>
                        <tr>
                            <td><strong class="required">*</strong>标题</td>
                            <td>
                                <input required class="focus" placeholder="请输入标题" v-model="currentBranch.name" :readonly="mode=='read'">
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td class="actions">
                                <action :text="'提交'" @click.native="save" v-if="mode!='read'" :disabled="currentBranch.name==''"></action>
                                <button class="black-simple" @click="mode='read';getTree();currentBranch={fid:0}" v-if="mode!='read'">取消</button>
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
                    fid: 0
                },
                parentBranch: {},
                mode: "read",
                level: 0
            }
        },
        methods: {
            getTree: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/goodsstructure/selectAll",
                    success: function (res) {
                        if (res.code === 0) {
                            $.each(res.data, function (index, item) {
                                item.expand = true;
                                $.each(item.nextStructure, function (index2, item2) {
                                    item2.expand = true;
                                    $.each(item2.nextStructure, function (index3,
                                        item3) {
                                        item3.expand = true;
                                    });
                                });
                            });
                            that.tree = res.data;
                            that.ajaxStatus = "ready";
                        }
                    }
                });
            },
            save: function () {
                if (this.mode == 'edit') {
                    this.edit();
                } else if (this.mode == 'add') {
                    this.add();
                }
            },
            edit: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/goodsstructure/updateStructureName?gid=" + that.currentBranch.id +
                        "&name=" + encodeURIComponent(that.currentBranch.name),
                    type: "put",
                    success: function (res) {
                        if (res.code === 0) {
                            that.mode = "read";
                            that.getTree();
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/goodsstructure/addStructure?fid=" + that.currentBranch.fid + "&name=" +
                        encodeURIComponent(that.currentBranch.name),
                    type: "post",
                    success: function (res) {
                        if (res.code === 0) {
                            that.mode = "read";
                            that.getTree();
                        }
                    }
                });
            },
            del: function () {
                var that = this;
                this.$root.confirms.push({
                    text: "确定永久删除改结构分类？",
                    fn: function () {
                        ajax.call(that, {
                            url: "/admin/goodsstructure/delStructure?gid=" + that.currentBranch
                                .id,
                            type: "delete",
                            success: function (res) {
                                if (res.code === 0) {
                                    that.getTree();
                                }
                            }
                        });
                    }
                });
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