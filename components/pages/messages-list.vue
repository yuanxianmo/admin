<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/home/order.png">消息列表
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/messages/message/add')">
                    <img src="images/add.png">新增消息
                </button>
            </div>
        </div>
        <div class="page-body">
            <div class="top-fns mb20">
                <search :placeholder="'请输入关键字、ID'"></search>
            </div>
            <table class="common row-border">
                <thead>
                    <tr>
                        <td>消息ID</td>
                        <td>发布人</td>
                        <td>标题</td>
                        <td>形式</td>
                        <td>发布时间</td>
                        <td>插入链接</td>
                        <td>状态</td>
                        <td>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>01</td>
                        <td>超级管理员</td>
                        <td>注意注意注意注意 注意注意注意注意 注意</td>
                        <td>邮件</td>
                        <td>208-06-06 17:51</td>
                        <td>无</td>
                        <td>
                            <div class="order-status theme">已推送</div>
                        </td>
                        <td>
                            <div class="simple-bts">
                                <button class="simple" @click="$router.push('/messages/message/'+3)">编辑</button>
                                <button class="simple" @click="$root.confirms.push({fn:aa,arg:33,text:11})">删除</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>01</td>
                        <td>超级管理员</td>
                        <td>注意注意注意注意 注意注意注意注意 注意</td>
                        <td>邮件</td>
                        <td>208-06-06 17:51</td>
                        <td>无</td>
                        <td>
                            <div class="order-status gray">未推送</div>
                        </td>
                        <td>
                            <div class="simple-bts">
                                <button class="simple" @click="$router.push('/messages/message/'+3)">编辑</button>
                                <button class="simple" @click="$root.confirms.push({fn:aa,arg:33,text:11})">删除</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pager :current-page="currentPage" :xpages="20"></pager>
        </div>
    </main>
</template>
<style>
</style>
<script>
    ({
        methods: {
            aa: function () {}
        }
    })
</script>