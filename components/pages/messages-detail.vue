<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/home/order.png">消息列表>新增/编辑消息
            </div>
        </div>
        <div class="page-body">
            <table class="edit">
                <tbody>
                    <tr>
                        <td>消息标题：</td>
                        <td>
                            <input class="focus w540" placeholder="请输入标题">
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top lh32">消息内容：</td>
                        <td>
                            <textarea placeholder="请输入225字以内的消息" class="focus w540 v-top"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>发送形式：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="type" checked="checked">
                                <div></div>
                                <span>邮件</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="type" checked="checked">
                                <div></div>
                                <span>站内信</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top lh32">发送用户：</td>
                        <td class="lh32">
                            <label class="radio">
                                <input type="radio" name="user" checked="checked">
                                <div></div>
                                <span>私信</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="user" checked="checked">
                                <div></div>
                                <span>全部用户</span>
                            </label>
                            <div class="flex-input w540">
                                <input readonly="readonly" placeholder="选择接收用户，若是选择全部用户则此选择框不出现" class="desc h32">
                                <button class="black" @click="showUS=true">选择用户</button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top lh32">插入图片：</td>
                        <td>
                            <div class="flex-input mb10 w540">
                                <input readonly="readonly" placeholder="不选择则不插入" class="desc h32">
                                <button class="black">选择图片</button>
                            </div>
                            <images-selected :data="[]">
                            </images-selected>
                            <p class="tip">
                                <strong class="required">*</strong>建议尺寸:450*450, 图片大小1M以内；请将所有作品图片尺寸保持一致
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>插入链接：</td>
                        <td>
                            <input class="focus w540" placeholder="不选择则不插入">
                        </td>
                    </tr>
                    <tr>
                        <td>立即发布：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="ins" checked="checked">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="ins" checked="checked">
                                <div></div>
                                <span>否
                                    <span class="tip">不选择时间则只是保存</span>
                                </span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action :text="'提交'"></action>
                            <button class="black-simple">返回列表</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <transition name="fade">
            <keep-alive>
                <users-selector v-if="showUS==true" @close="showUS=false"></users-selector>
            </keep-alive>
        </transition>
    </main>
</template>
<style>
    .w540 {
        width: 540px;
    }

    table.edit textarea {
        resize: vertical;
    }

    label.radio .tip {
        margin-left: 10px;
        font-size: 12px;
        color: #A6A6A6;
    }
</style>
<script>
    ({
        data: function () {
            return {
                showUS: false
            }
        }
    })
</script>