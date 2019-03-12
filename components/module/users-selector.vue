<template>
    <div id="users-selector" class="popup">
        <div class="s-content fixed-box">
            <div class="us-head">
                <search></search>
                <button class="close" @click="$emit('close')"></button>
            </div>
            <div class="us-body">
                <ul class="type-select mb20">
                    <li class="current">不限</li>
                    <li>默认</li>
                    <li>年结用户</li>
                    <li>XX用户组</li>
                </ul>
                <br>
                <ul class="type-select mb20">
                    <li class="current">不限</li>
                    <li></li>
                </ul>
                <table class="common row-border">
                    <thead>
                        <tr>
                            <th>
                                <label class="checkbox">
                                    <input type="checkbox" checked="checked">
                                    <div></div>
                                    <span>全选</span>
                                </label>
                            </th>
                            <th>用户ID</th>
                            <th>绑定手机</th>
                            <th>绑定邮箱</th>
                            <th>用户分组</th>
                            <th>注册时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label class="checkbox">
                                    <input type="checkbox" checked="checked">
                                    <div></div>
                                </label>
                            </td>
                            <td>12354648</td>
                            <td>13692289195</td>
                            <td>794554200@qq.com</td>
                            <td>未分组</td>
                            <td>2018-06-06</td>
                        </tr>
                        <tr>
                            <td>
                                <label class="checkbox">
                                    <input type="checkbox" checked="checked">
                                    <div></div>
                                </label>
                            </td>
                            <td>12354648</td>
                            <td>13692289195</td>
                            <td>794554200@qq.com</td>
                            <td>未分组</td>
                            <td>2018-06-06</td>
                        </tr>
                    </tbody>
                </table>
                <pager :xpages="20"></pager>
                <div class="actions">
                    <action :text="'提交'" @click.native="save"></action>
                    <button class="black-simple" @click="$emit('close')">返回</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .us-head {
        display: flex;
        justify-content: space-between;
        padding: 20px 25px;
        border-bottom: 1px solid #d2d2d2;
        align-items: center;
    }

    .us-body {
        padding: 20px 25px;
    }

    #users-selector .close {
        width: 18px;
        height: 18px;
        background-image: url(images/users_close.png);
        background-repeat: no-repeat;
        border: none;
        background-color: transparent;
    }

    .us-body label.checkbox span {
        color: inherit;
    }
</style>
<script></script>