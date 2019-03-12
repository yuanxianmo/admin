<template>
    <main>
        <div class="page-head mb20">
            <div class="left">
                <img src="images/home/slideshow.png">起印数量设置
            </div>
        </div>
        <div class="page-index">
            <table class="edit">
                <tbody>
                    <tr>
                        <td>起印数量：</td>
                        <td>
                            <input v-model="printnumber" class="focus w300" type="number" step="100" min="0">
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action :text="'提交'" @click.native="submit" v-permission="'printnumber_edit'"></action>
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
                printnumber: 0
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/settings/getPrintNumberSettings",
                    success: function (res) {
                        if (res.code === 0) {
                            that.printnumber = res.data.zdyPrintNumber;
                            that.ajaxStatus = "ready";
                        }
                    }
                });
            },
            submit: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/settings/setPrintNumberSettings",
                    type: "post",
                    data: {
                        zdyPrintNumber: that.printnumber
                    },
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