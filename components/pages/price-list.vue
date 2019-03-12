<template>
    <main :class="ajaxStatus">
        <div class="page-head">
            <div class="left">
                <img src="images/price/list.png">价格管理列表
            </div>
            <div class="right">
                <button class="theme-bt add" @click="$router.push('/price/auto/add')" v-permission="'price_add'">
                    <img src="images/add.png"> 新增价格
                </button>
            </div>
        </div>
        <div class="page-body">
            <table class="common row-border">
                <thead>
                    <tr>
                        <th>价格ID</th>
                        <th>计算价格因子</th>
                        <th>单价</th>
                        <th>其他价格</th>
                        <th>起码版价格</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in list">
                        <td>{{i.id}}</td>
                        <td>{{i.technologyName+">"+i.technologyAttrName}}</td>
                        <td>￥{{i.price+"/"+i.unit}}</td>
                        <td>{{i.otherName}}：￥{{i.otherPrice+"/"+i.otherUnit}}</td>
                        <td>￥{{i.basePrice+"/"+i.baseUnit}}</td>
                        <td>
                            <div class="order-status theme" v-if="i.status==0">显示</div>
                            <div class="order-status gray" v-else>隐藏</div>
                        </td>
                        <td>
                            <div class="simple-bts">
                                <button class="simple" @click="$router.push('/price/auto/'+i.id)" v-permission="'price_detail'">编辑</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <pager @pager="pager" :xcurrent-page="currentPage" :xpages="pages"></pager>
    </main>
</template>
<style></style>
<script>
    ({
        data: function () {
            return {
                list: []
            }
        },
        methods: {
            getList: function () {
                var that = this;
                ajax({
                    url: "/admin/technologyPrice",
                    data: {
                        currentPage: that.currentPage
                    },
                    success: function (res) {
                        if (res.code === 0) {
                            that.list = res.data;
                            that.total = res.total;
                        }
                    }
                });
            }
        },
        mounted: function () {
            this.getList();
        },
        activated: function () {
            this.getList();
        }
    })
</script>