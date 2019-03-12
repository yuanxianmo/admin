<template>
    <main>
        <div class="page-head mb20 sticky">
            <div class="left">
                <img src="images/backend/permission.png">权限设置
                <i>?</i>
                <span>按Alt+\查看页面已配置权限标识</span>
            </div>
            <div class="right">
                <button class="theme-bt add" @click="mode='add';currentBranch={parentId:currentBranch.menuId};" v-if="currentBranch.type!==1" v-permission="'permission_add'">
                    {{currentBranch.parentId==-2?"新增根权限":"新增子权限"}}
                </button>
                <button class="theme-bt add" @click="mode='edit'" v-if="currentBranch.menuId!==undefined&&currentBranch.menuId!==-1" v-permission="'permission_edit'">
                    编辑权限
                </button>
                <button class="theme-bt add" v-if="currentBranch.menuId!==undefined&&currentBranch.menuId!==-1" @click="del" v-permission="'permission_del'">
                    删除权限
                </button>
            </div>
        </div>
        <div class="page-body tree">
            <div id="tree" @click="currentBranch={menuId:-1,parentId:-2};parentBranch={menuId:-2};level=1">
                <dl class="branch" v-for="l1 in tree">
                    <dt :class="{disabled:l1.status==1,expand:l1.expand,'has-children':l1.children.length,current:currentBranch==l1,'to-add':mode=='add'&&currentBranch.parentId==l1.menuId}" @click.stop="mode='read';currentBranch=l1;parentBranch={menuId:-1};level=2" @dblclick.stop="l1.expand=!l1.expand;">{{l1.label}}</dt>
                    <transition name="tree">
                        <dd v-if="l1.expand">
                            <dl class="branch" v-for="l2 in l1.children">
                                <dt :class="{expand:l2.expand,'has-children':l2.children.length,current:currentBranch==l2,'to-add':mode=='add'&&currentBranch.parentId==l2.menuId}" @click.stop="mode='read';currentBranch=l2;parentBranch=l1;level=3" @dblclick.stop="l2.expand=!l2.expand;">{{l2.label}}</dt>
                                <transition name="tree">
                                    <dd v-if="l2.expand">
                                        <dl class="branch" v-for="l3 in l2.children">
                                            <dt :class="{expand:l3.expand,'has-children':l3.children.length,current:currentBranch==l3,'to-add':mode=='add'&&currentBranch.parentId==l3.menuId}" @click.stop="mode='read';currentBranch=l3;parentBranch=l2">{{l3.label}}</dt>
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
                                <input class="focus" placeholder="请输入父级节点ID" readonly :value="currentBranch.parentId">
                            </td>
                        </tr>
                        <tr>
                            <td>标题</td>
                            <td>
                                <input class="focus" placeholder="请输入标题" v-model="currentBranch.name" :readonly="mode=='read'">
                            </td>
                        </tr>
                        <tr>
                            <td>权限标识</td>
                            <td>
                                <input class="focus" placeholder="请输入权限标识" v-model="currentBranch.permission" :readonly="mode=='read'">
                            </td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td>
                                <drop-down :width="'100%'" @select="select" :readonly="mode=='read'" :key-name="'type'" :data="[{name:'菜单',value:0,selected:currentBranch.type==0},{name:'按钮',value:1,selected:currentBranch.type==1}]"></drop-down>
                            </td>
                        </tr>
                        <tr>
                            <td>排序</td>
                            <td>
                                <input class="focus" placeholder="请输入排序" v-model="currentBranch.sort" :readonly="mode=='read'">
                            </td>
                        </tr>
                        <tr>
                            <td>请求方法</td>
                            <td>
                                <drop-down :width="'100%'" @select="select" :readonly="mode=='read'" :key-name="'method'" :data="[{name:'GET',value:'GET',selected:currentBranch.method=='GET'},{name:'POST',value:'POST',selected:currentBranch.method=='POST'},{name:'PUT',value:'PUT',selected:currentBranch.method=='PUT'},{name:'DELETE',value:'DELETE',selected:currentBranch.method=='DELETE'}]"></drop-down>
                            </td>
                        </tr>
                        <tr>
                            <td>API链接</td>
                            <td>
                                <input class="focus" placeholder="请输入API链接" v-model="currentBranch.url" :readonly="mode=='read'">
                            </td>
                        </tr>
                        <tr>
                            <td>前端组件</td>
                            <td>
                                <input class="focus" placeholder="请输入描述" v-model="currentBranch.component" :readonly="mode=='read'">
                            </td>
                        </tr>
                        <tr>
                            <td>状态</td>
                            <td>
                                <drop-down :width="'100%'" @select="select" :readonly="mode=='read'" :key-name="'status'" :data="[{name:'正常',value:0,selected:currentBranch.status===0||currentBranch.status===undefined},{name:'删除',value:1,selected:currentBranch.status===1}]"></drop-down>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td class="actions">
                                <action :text="'提交'" @click.native="save" v-if="mode!='read'"></action>
                                <button class="black-simple" @click="mode='read'" v-if="mode!='read'">取消</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</template>
<style>
    .page-head .left i {
        border-radius: 50%;
        display: flex;
        width: 20px;
        height: 20px;
        border: 1px solid #dddd;
        justify-content: center;
        align-items: center;
        font-style: normal;
        font-size: 12px;
        margin: 0 5px;
        cursor: help;
    }

    .page-head .left i:hover+span {
        display: block;
    }

    .page-head .left span {
        display: none;
        font-size: 12px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                tree: [],
                currentBranch: {
                    menuId: -1,
                    parentId: -2
                },
                parentBranch: {},
                mode: "read",
                level: -1
            }
        },
        methods: {
            getTree: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/permission/select",
                    success: function (res) {
                        if (res.code === 0) {
                            $.each(res.data, function (index, item) {
                                item.expand = false;
                                $.each(item.children, function (index2, item2) {
                                    item2.expand = false;
                                    $.each(item2.children, function (index3, item3) {
                                        item3.expand = false;
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
                    url: "/admin/permission/update",
                    type: "put",
                    data: that.currentBranch,
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
                    url: "/admin/permission",
                    type: "post",
                    data: that.currentBranch,
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
                    text: "确定删除该权限?",
                    fn: function () {
                        ajax.call(that, {
                            url: "/admin/permission/del/" + that.currentBranch.menuId,
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