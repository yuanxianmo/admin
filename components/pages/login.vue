<template>
    <main>
        <div class="wrap">
            <div class="left">
                <img src="images/login/left.jpg">
                <h3>698管理后台</h3>
            </div>
            <div class="right">
                <h3>欢迎登录</h3>
                <div class="row">
                    <img src="images/login/user.png" class="icon">
                    <input type="text" autocomplete="username" placeholder="请输入账号名" v-model="username" autofocus>
                </div>
                <div class="row password">
                    <img src="images/login/lock.png" class="icon">
                    <input type="password" autocomplete="password" placeholder="请输入登录密码" v-model="password" @keypress.enter="login">
                </div>
                <!-- <div class="img-code row">
                    <img :src="$root.config.apiBase+'/expand/getImageCode?token='+randomStr" @click="random()">
                    <input v-model="code">
                </div> -->
                <button type="button" id="submit" @click="login" :disabled="ajaxStatus!='ready'">
                    <div class="bg"></div>
                    <div class="text">登录</div>
                </button>
            </div>
        </div>
        <div class="copyright">Copyright © 2018 深圳市超仁信息科技有限公司 粤ICP备 15109122号-4</div>
    </main>
</template>
<style>
    html {
        height: 100%;
    }

    html body {
        padding-top: 0;
        padding-bottom: 0;
        background-image: url(images/login/background.jpg);
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    main .wrap {
        padding: 0;
        display: flex;
        box-shadow: 1px 0px 30px rgba(0, 0, 0, 0.25);
        margin-bottom: 10px;
    }

    main .left img {
        vertical-align: top;
    }

    main .left {
        position: relative;
        z-index: 100;
    }

    main .left h3 {
        position: absolute;
        font-size: 30px;
        right: 35px;
        bottom: 40px;
        font-weight: normal;
        color: #353535;
        margin: 0;
    }

    main .right {
        width: 400px;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 30px;
    }

    main .right h3 {
        font-size: 22px;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px;
        font-weight: normal;
    }

    main .right h3:after {
        content: "";
        display: block;
        width: 70px;
        height: 4px;
        border-radius: 2px;
        background-color: #C4A66A;
        margin-top: 3px;
    }

    main .right .row {
        display: flex;
        align-items: center;
        padding-bottom: 7px;
        padding-left: 13px;
        padding-right: 13px;
        border-bottom: 1px solid #d2d2d2;
        margin-bottom: 30px;
        align-self: stretch;
    }

    main .right .row.password .icon {
        margin-left: 1px;
        margin-right: 18px;
    }

    main .right .icon {
        margin-right: 17px;
    }

    main .right input {
        border: none;
        border-left: 1px solid #d2d2d2;
        background-color: transparent;
        font-size: 16px;
        padding: 0 12px;
        line-height: 18px;
        color: #666;
        flex: 1;
    }

    main .right input::-webkit-input-placeholder {
        color: #b2b2b2;
    }

    main .right input::-moz-placeholder {
        color: #b2b2b2;
    }

    main .copyright {
        text-align: center;
        color: white;
        font-size: 12px;
    }

    #submit {
        width: 266px;
        height: 44px;
        border: none;
        color: white;
        font-size: 16px;
        margin-top: 40px;
        transition: all .4s;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        box-shadow: 1px 0px 9px rgba(0, 0, 0, 0.36);
        transition: all .5s;
    }

    #submit:disabled .bg {
        background-image: linear-gradient(to left, #ccc, #eee, #ccc);
    }

    #submit .bg {
        position: absolute;
        width: 200%;
        height: 100%;
        background-image: linear-gradient(to left, #C4A66A, #C37841, #C4A66A);
        right: 0;
        top: 0;
        z-index: 10;
        transition: all .5s;
    }

    #submit .text {
        position: relative;
        z-index: 20;
    }

    #submit:hover {
        box-shadow: 6px 5px 9px rgba(0, 0, 0, 0.36);
    }

    #submit:active {
        box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.36);
        transition: all .1s;
    }

    #submit:hover .bg {
        transform: translateX(50%);
        -webkit-transform: translateX(50%);
        -o-transform: translateX(50%);
    }

    @keyframes show {
        from {
            margin-left: -400px;
        }
    }
</style>
<script>
    ({
        data: function () {
            return {
                username: "",
                password: "",
                randomStr: Math.random(),
                code: ""
            }
        },
        methods: {
            login: function () {
                var that = this;
                ajax.call(this,{
                    url: "/oauth/token",
                    type: "post",
                    data: {
                        username: that.username,
                        password: that.password,
                        grant_type: "password",
                        scope: "server",
                        randomStr: that.randomStr,
                        code: that.code,
                        type:"login"
                    },
                    headers: {
                        "Authorization": "Basic c3VwZXJraW5kOnN1cGVya2luZA=="
                    },
                    success: function (res) {
                        switch (res.code) {
                            case "1":
                                that.$root.alerts.push(res.msg);
                                that.ajaxStatus = "ready";
                                break;
                            case undefined:
                                localStorage.access_token = res.access_token;
                                that.$root.getUserInfo();
                                if (sessionStorage.loginBack === "1") {
                                    sessionStorage.loginBack = "0";
                                    that.$router.back();
                                } else {
                                    that.$router.push("/");
                                }
                                break;
                        }
                    }
                });
            },
            random: function () {
                this.randomStr = Math.random();
            }
        },
        mounted: function () {
            this.$root.showNav = false;
            var that = this;
            this.$root.getUserInfo(function () {
                if (sessionStorage.loginBack === "1") {
                    sessionStorage.loginBack = "0";
                    that.$router.back();
                } else {
                    that.$router.push("/");
                }
            });
        },
        beforeDestroy: function () {
            this.$root.showNav = true;
        }
    })
</script>