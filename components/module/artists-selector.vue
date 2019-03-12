<template>
    <div id="artists-selector" class="popup">
        <div class="s-content fixed-box">
            <div class="as-head mb20">选择设计师<button class="close" @click="$emit('close')"></button></div>
            <div class="as-filter">
                <drop-down :data="levelList" :width="'120px'" @select="filter.level=$event" :placeholder="'等级'" :all="'全部'" :value="'id'" :name="'title'"></drop-down>
                <input placeholder="请输入设计师姓名" class="as-name focus h30 flex1" v-model="filter.param">
                <button class="go-search theme-bt h30" @click="getList">搜索</button>
            </div>
            <table class="common row-border">
                <tbody>
                    <tr v-for="i in list">
                        <td>
                            <img :src="i.imgSrc" class="as-thumb">
                        </td>
                        <td class="w100 a-name">{{i.name}}</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="open" :value="i" v-model="selected">
                                <div></div>
                                <span>选择</span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <pager @pager="currentPage=$event" :xcurrent-page="currentPage" :xpages="pages"></pager>
        </div>
    </div>
</template>
<style>
    #artists-selector .s-content {
        padding: 20px;
        width: 720px;
    }

    #artists-selector .as-head {
        border-left: 6px solid #C4A66A;
        color: #C4A66A;
        font-size: 18px;
        font-weight: bold;
        padding-left: 6px;
        line-height: 17px;
        position: relative;
    }

    #artists-selector table.common td {
        padding: 5px;
        vertical-align: middle;
    }

    .as-filter {
        display: flex;
        align-items: center;
        border-top: 1px solid #d2d2d2;
        padding-top: 15px;
        margin-bottom: 10px;
    }

    .as-thumb {
        width: 30px;
        height: 30px;
        object-fit: cover;
        vertical-align: middle;
    }

    .as-name {
        margin: 0 10px;
    }

    table.common td.a-name {
        text-align: left;
    }

    #artists-selector .go-search {
        padding: 0 15px;
    }

    #artists-selector .close {
        width: 22px;
        height: 22px;
        background-image: url(images/alert_close.png);
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        right: 0;
        top: 0;
        background-color: white;
        border: none;
        transition: all .2s;
    }

    #artists-selector .close:hover {
        opacity: .7;
    }
</style>
<script>
    ({
        data: function () {
            return {
                list: [],
                filter: {},
                selected: {},
                levelList: []
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/designer/select",
                    data: $.extend({
                        currentPage: that.currentPage,
                        pageSize: that.pageSize
                    }, that.filter),
                    success: function (res) {
                        if (res.code === 0) {
                            that.list = res.data;
                            that.total = res.total;
                        }
                    }
                });
            },
            getLevel: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/designerLevel/select",
                    success: function (res) {
                        if (res.code === 0) {
                            that.levelList = res.data;
                        }
                    }
                });
            }
        },
        mounted: function () {
            this.getList();
            this.getLevel();
        },
        watch: {
            selected: function () {
                this.$emit("output", this.selected);
                this.$emit("close");
            }
        }
    })
</script>