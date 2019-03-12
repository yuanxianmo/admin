<template>
    <main>
        <tabs :tabs="['全部聊天','黄小姐','吴小姐']">
            <div class="page-body" slot="0">
                <div class="top-fns mb20">
                    <search></search>
                    <v-filter :height="'34px'" :fn="getList">
                        <div>
                            <drop-down :theme="'simple'" :min-width="'100px'" :height="'32px'" :inner-height="'18px'" :data="[{name:'时间',value:undefined,selected:true},{name:'三天内',value:0,selected:false},{name:'一周内',value:1,selected:false},{name:'一月内',value:1,selected:false}]"></drop-down>
                        </div>
                    </v-filter>
                </div>
                <table class="common row-border">
                    <thead>
                        <tr>
                            <th>用户</th>
                            <th>客服组</th>
                            <th>最新消息</th>
                            <th>最后日期</th>
                            <th>客服名称</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>13692289195</td>
                            <td>设计客服</td>
                            <td class="simple-bts">
                                <span>在不在？</span>
                                <button class="simple">点击进入</button>
                            </td>
                            <td>2018-06-06 17:20</td>
                            <td>黄小姐</td>
                            <td>
                                <div class="simple-bts">
                                    <button class="simple" @click="showChat=true">查看聊天记录</button>
                                    <button class="simple">删除</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>13692289195</td>
                            <td>设计客服</td>
                            <td class="simple-bts">
                                <span>在不在？</span>
                                <button class="simple">点击进入</button>
                            </td>
                            <td>2018-06-06 17:20</td>
                            <td>黄小姐</td>
                            <td>
                                <div class="simple-bts">
                                    <button class="simple" @click="showChat=true">查看聊天记录</button>
                                    <button class="simple">删除</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>13692289195</td>
                            <td>设计客服</td>
                            <td class="simple-bts">
                                <span>在不在？</span>
                                <button class="simple">点击进入</button>
                            </td>
                            <td>2018-06-06 17:20</td>
                            <td>黄小姐</td>
                            <td>
                                <div class="simple-bts">
                                    <button class="simple" @click="showChat=true">查看聊天记录</button>
                                    <button class="simple">删除</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pager :xpages="20"></pager>
            </div>
        </tabs>
        <transition name="fade">
            <div id="chat-box" class="popup" v-if="showChat">
                <div class="chat-body fixed-box s-content">
                    <div class="head">
                        <h3>
                            <img src="images/home/order.png">聊天记录
                        </h3>
                        <button class="close" @click="showChat=false"></button>
                    </div>
                    <div class="body">
                        <p class="time">2018-06-06 17:12</p>
                        <dl class="customer chat-content">
                            <dt>小明</dt>
                            <dd>双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式</dd>
                        </dl>
                        <dl class="self chat-content">
                            <dt>小明</dt>
                            <dd>双方的十六分十六飞机萨勒夫技术对接方式</dd>
                        </dl>
                        <dl class="customer chat-content">
                            <dt>小明</dt>
                            <dd>双方的十六分十六飞机萨勒夫技术对接方式</dd>
                        </dl>
                        <dl class="self chat-content">
                            <dt>小明</dt>
                            <dd>双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式双方的十六分十六飞机萨勒夫技术对接方式</dd>
                        </dl>
                        <dl class="customer chat-content">
                            <dt>小明</dt>
                            <dd>双方的十六分十六飞机萨勒夫技术对接方式</dd>
                        </dl>
                        <dl class="self chat-content">
                            <dt>小明</dt>
                            <dd>双方的十六分十六飞机萨勒夫技术对接方式</dd>
                        </dl>
                        <dl class="customer chat-content">
                            <dt>小明</dt>
                            <dd>双方的十六分十六飞机萨勒夫技术对接方式</dd>
                        </dl>
                        <dl class="self chat-content">
                            <dt>小明</dt>
                            <dd>双方的十六分十六飞机萨勒夫技术对接方式</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </transition>
    </main>
</template>
<style>
    .tabs .wrap {
        padding: 20px;
    }

    #chat-box .chat-body {
        width: 860px;
    }

    #chat-box .chat-body .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #D2D2D2;
        padding: 15px 20px;
    }

    #chat-box .chat-body .head h3 {
        display: flex;
        align-items: center;
        color: #222;
        font-size: 16px;
        font-weight: normal;
        margin: 0;
    }

    #chat-box .chat-body .head h3 img {
        margin-right: 5px;
    }

    #chat-box .close {
        width: 26px;
        height: 26px;
        background-image: url(images/close.png);
        background-repeat: no-repeat;
        background-position: center;
        background-color: white;
        border: none;
        transition: all .2s;
    }

    #chat-box .time {
        text-align: center;
        margin: 0 0 20px 0;
        color: #8F8F8F;
    }

    #chat-box .body {
        padding: 20px 40px 50px 40px;
        font-size: 12px;
        max-height: 700px;
        overflow-y: auto;
    }

    #chat-box .chat-content {
        display: flex;
        align-items: flex-start;
    }

    #chat-box .chat-content dt {
        line-height: 34px;
        font-weight: bold;
        color: #222;
    }

    #chat-box .chat-content dd {
        max-width: 560px;
        border-radius: 4px;
        padding: 5px 10px;
        line-height: 24px;
        position: relative;
        letter-spacing: 1px;
    }

    #chat-box .chat-content.customer dt {
        margin-right: 10px;
    }

    #chat-box .chat-content.customer dd {
        background-color: #F0F0F0;
        color: #8F8F8F;
    }

    #chat-box .chat-content.customer dd::after {
        content: "";
        display: block;
        border-right: 5px solid #F0F0F0;
        border-top: 5px solid transparent;
        border-left: 5px solid transparent;
        border-bottom: 5px solid transparent;
        position: absolute;
        right: 100%;
        top: 13px;
    }

    #chat-box .chat-content:not(:last-child) {
        margin-bottom: 20px;
    }

    #chat-box .chat-content.self {
        justify-content: flex-end;
    }

    #chat-box .chat-content.self dt {
        order: 2;
    }

    #chat-box .chat-content.self dd {
        background-color: #c4a66a;
        color: white;
        order: 1;
        margin-right: 10px;
    }

    #chat-box .chat-content.self dd::after {
        content: "";
        display: block;
        border-left: 5px solid #c4a66a;
        border-top: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid transparent;
        position: absolute;
        left: 100%;
        top: 13px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                showChat: false
            }
        },
        methods: {
            getList: function () {}
        }
    })
</script>