<template>
    <div id="confirm-box" class="popup">
        <div class="confirm-body fixed-box s-content">
            <div class="content">
                <img src="images/alert.png">
                <p>{{($root.confirms[0]&&$root.confirms[0].text)||last.text||"您确定要进行此操作？"}}</p>
            </div>
            <div class="bts">
                <button class="yes" @click="confirm">确定</button>
                <button class="no" @click="cancel">取消</button>
            </div>
            <button class="close" @click="cancel"></button>
        </div>
    </div>
</template>
<style>

    #confirm-box .confirm-body {
        padding: 80px 80px 35px 80px;
        position: relative;
        max-width: 500px;
    }

    #confirm-box .content {
        display: flex;
        align-items: center;
        color: #353535;
        font-size: 16px;
        margin-bottom: 45px;
    }

    #confirm-box .content img {
        margin-right: 18px;
    }

    #confirm-box .content p {
        margin: 0;
    }

    #confirm-box .bts {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #confirm-box .bts button {
        width: 150px;
        height: 50px;
        background-color: white;
        font-size: 16px;
        border-radius: 1px;
        transition: all .2s;
    }

    #confirm-box .bts button:hover {
        opacity: .7;
    }

    #confirm-box .bts .yes {
        border: 1px solid #c4a66a;
        color: #c4a66a;
        margin-right: 30px;
    }

    #confirm-box .bts .no {
        border: 1px solid #b2b2b2;
        color: #b2b2b2;
    }

    #confirm-box .close {
        width: 22px;
        height: 22px;
        background-image: url(images/alert_close.png);
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        right: 32px;
        top: 22px;
        background-color: white;
        border: none;
        transition: all .2s;
    }

    #confirm-box .close:hover {
        opacity: .7;
    }
</style>
<script>
    ({
        data: function () {
            return {
                last: {}
            }
        },
        methods: {
            confirm: function () {
                this.$root.confirms[0].fn(this.$root.confirms[0].arg);
                this.last = this.$root.confirms.shift();
            },
            cancel: function () {
                this.last = this.$root.confirms.shift();
            }
        }
    })
</script>