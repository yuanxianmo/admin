<template>
    <div id="alert-box" class="popup">
        <div class="alert-body fixed-box s-content">
            <div class="content">
                <img src="images/alert.png">
                <p>{{$root.alerts[0]?($root.alerts[0][0]?$root.alerts[0]:$root.alerts[0].text):(last[0]?last:last.text)}}</p>
            </div>
            <div class="bts">
                <button class="yes" @click="close">知道了</button>
            </div>
        </div>
    </div>
</template>
<style>
    #alert-box .alert-body {
        padding: 80px 80px 35px 80px;
        position: relative;
        max-width: 600px;
    }

    #alert-box .content {
        display: flex;
        align-items: center;
        color: #353535;
        font-size: 16px;
        margin-bottom: 45px;
    }

    #alert-box .content img {
        margin-right: 18px;
    }

    #alert-box .content p {
        margin: 0;
        word-break: break-word;
        max-height: 500px;
        overflow-y: auto;
    }

    #alert-box .content p::-webkit-scrollbar {
        width: 0;
    }

    #alert-box .content p:hover::-webkit-scrollbar {
        width: 2px;
    }

    #alert-box .bts {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #alert-box .bts button {
        width: 150px;
        height: 50px;
        background-color: white;
        font-size: 16px;
        border-radius: 1px;
        transition: all .2s;
    }

    #alert-box .bts button:hover {
        opacity: .7;
    }

    #alert-box .bts .yes {
        border: 1px solid #c4a66a;
        color: #c4a66a;
    }

    #alert-box .bts .no {
        border: 1px solid #b2b2b2;
        color: #b2b2b2;
    }

    #alert-box .close {
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

    #alert-box .close:hover {
        opacity: .7;
    }
</style>
<script>
    ({
        data: function () {
            return {
                last: ""
            }
        },
        methods: {
            close: function () {
                this.last = this.$root.alerts.shift();
                if (typeof this.last == "object") {
                    this.last.fn&&this.last.fn();
                }
            }
        }
    })
</script>