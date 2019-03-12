<template>
    <div id="prompt-box" class="popup">
        <div class="prompt-body fixed-box s-content">
            <div class="content">
                <h3>{{($root.prompts[0]&&$root.prompts[0].title)||last.title||"请输入数据"}}</h3>
                <table class="prompt-table edit">
                    <tbody>
                        <tr v-for="(i,index) in ($root.prompts[0]?$root.prompts[0].data:last.data)" :key="'a'+index">
                            <template v-if="i.type=='text'||i.type==undefined">
                                <td><strong class="required" v-if="i.required">*</strong>{{i.name}}：</td>
                                <td>
                                    <input v-if="i.password" type="password" v-model="i.value" class="focus" :required="i.required" autocomplete="new-password">
                                    <input v-else v-model="i.value" class="focus" :required="i.required">
                                </td>
                            </template>
                            <template v-if="i.type=='select'">
                                <td><strong class="required" v-if="i.required">*</strong>{{i.name}}：</td>
                                <td>
                                    <drop-down :data="i.list" :width="'100%'" @output="i.value=$event.name" :class="{invalid:i.value==''}"></drop-down>
                                </td>
                            </template>
                            <template v-if="i.type=='plugin'">
                                <td><strong class="required" v-if="i.required">*</strong>{{i.name}}：</td>
                                <td>
                                    <div class="focus" v-if="i.plugin=='datepicker'">
                                        <datepicker v-model="i.value" :input-class="['focus','h32']" :class="{invalid:i.value==''}"></datepicker>
                                    </div>
                                    <div class="focus" v-if="i.plugin=='vue-clock-picker'">
                                        <vue-clock-picker @timeset="i.value=$event" :value="i.value" :class="{invalid:i.value==''}" :input-class="'focus h32'"></vue-clock-picker>
                                    </div>
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bts">
                <button class="theme-bt add" @click="confirm" :disabled="!avail">确定</button>
            </div>
            <button class="close" @click="cancel"></button>
        </div>
    </div>
</template>
<style>
    #prompt-box .prompt-body {
        padding: 60px 80px 35px 80px;
        position: relative;
        max-width: 500px;
    }

    #prompt-box .content {
        align-items: center;
        color: #353535;
        font-size: 16px;
        margin-bottom: 20px;
    }

    #prompt-box .content img {
        margin-right: 18px;
    }

    #prompt-box .content h3 {
        margin: 0 0 20px 0;
        text-align: center;
        font-size: 18px;
        font-weight: normal;
        color: #333;
    }

    .prompt-table td:last-child {
        font-size: 14px !important;
    }

    .prompt-table {
        width: 100%;
    }

    .prompt-table td:first-child {
        text-align: right;
        color: #444;
    }

    .prompt-table input {
        width: 100%;
    }

    #prompt-box .bts {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #prompt-box .bts button {
        width: 148px;
        font-size: 16px;
        height: 46px;
    }

    #prompt-box .bts button:hover {
        opacity: .7;
    }

    #prompt-box .bts .yes {
        border: 1px solid #c4a66a;
        color: #c4a66a;
        margin-right: 30px;
    }

    #prompt-box .bts .no {
        border: 1px solid #b2b2b2;
        color: #b2b2b2;
    }

    #prompt-box .close {
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

    #prompt-box .close:hover {
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
        computed: {
            avail: function () {
                var ret = true;
                if (!this.$root.prompts[0]) return false;
                $.each(this.$root.prompts[0].data, function (index, item) {
                    if (item.required && item.value == "") {
                        ret = false;
                    }
                });
                return ret;
            }
        },
        methods: {
            confirm: function () {
                if (!this.$root.prompts[0].keep) {
                    this.last = this.$root.prompts.shift();
                    this.last.fn();
                } else {
                    this.$root.prompts[0].fn();
                }
            },
            cancel: function () {
                this.last = this.$root.prompts.shift();
            }
        }
    })
</script>