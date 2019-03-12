<template>
        <main>
            <div class="page-head mb20">
                <div class="left">
                    <img src="images/home/slideshow.png">邮费设置
                </div>
            </div>
            <div class="page-index">
                <table class="edit">
                    <tbody>
                        <tr>
                            <td><strong class="required">*</strong>首重价格（元）：</td>
                            <td>
                                <input v-model.number="data.szPrice" class="focus w300" type="number" min="0" required step="0.01">
                            </td>
                        </tr>
                        <tr>
                            <td><strong class="required">*</strong>首重重量（千克）：</td>
                            <td>
                                <input v-model.number="data.szQuantity" class="focus w300" type="number" min="0" required step="0.001">
                            </td>
                        </tr>
                        <tr>
                            <td><strong class="required">*</strong>续重价格单位（元）：</td>
                            <td>
                                <input v-model.number="data.xzPrice" class="focus w300" type="number" min="0" required step="0.01">
                            </td>
                        </tr>
                        <tr>
                            <td><strong class="required">*</strong>续重重量单位（千克）：</td>
                            <td>
                                <input v-model.number="data.xzQuantity" class="focus w300" type="number" min="0" required step="0.001">
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td class="actions">
                                <action :text="'提交'" @click.native="submit" v-permission="'shipping_edit'" :disabled="data.szPrice===''||data.szQuantity===''||data.xzPrice===''||data.xzQuantity===''||data.szPrice<0||data.szQuantity<0||data.xzPrice<0||data.xzQuantity<0"></action>
                                <button @click="getData" class="black-simple">取消</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </template>
    <style>
        table.edit td:last-child {
            width: 100%;
        }
    </style>
    <script>
        ({
            data: function () {
                return {
                    data: {}
                }
            },
            methods: {
                getData: function () {
                    var that = this;
                    ajax.call(this, {
                        url: "/admin/settings/getPostSettings",
                        success: function (res) {
                            if (res.code === 0) {
                                that.data=res.data;
                                that.ajaxStatus = "ready";
                            }
                        }
                    });
                },
                submit: function () {
                    var that = this;
                    ajax.call(this, {
                        url: "/admin/settings/setPostSettings",
                        type: "post",
                        data: that.data,
                        success: function (res) {
                            that.ajaxStatus = "ready";
                            that.$root.alerts.push({text:"修改成功！"});
                        }
                    });
                }
            },
            mounted: function () {
                this.getData();
            }
        })
    </script>