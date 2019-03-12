<template>
    <main>
        <div class="page-head mb10">
            <div class="left">
                <img src="images/home/order.png">{{id?"编辑":"新增"}}价格管理
            </div>
        </div>
        <div class="page-body" v-if="data">
            <table class="edit technology">
                <tbody>
                    <tr>
                        <td><strong class="required">*</strong>工艺分类：</td>
                        <td>
                            <div class="flex">
                                <drop-down :width="'310px'" :data="techTree" :value="'id'" v-permission="'technology_list_normal'" @output="selectedTech=$event;selectedTechAttr={}" :class="{invalid:!selectedTech.id}"></drop-down>
                                <drop-down :width="'310px'" :data="selectedTech.attrs" v-permission="'technology_list_normal'" :value="'id'" @output="selectedTechAttr=$event" :class="{invalid:!selectedTechAttr.id}"></drop-down>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><strong class="required">*</strong>起码版价格：</td>
                        <td>
                            <div class="flex">
                                <input class="focus w420" placeholder="请输入起码版价格" v-model.number="data.basePrice" required>
                                <input class="focus w200" placeholder="请输入单位" v-model="data.baseUnit" required>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>其他价格：</td>
                        <td>
                            <div class="flex">
                                <input class="focus w200" placeholder="请输入名称" v-model="data.otherName">
                                <input class="focus w200" placeholder="请输入价格" v-model.number="data.otherPrice">
                                <input class="focus w200" placeholder="请输入单位" v-model="data.otherUnit">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><strong class="required">*</strong>单价：</td>
                        <td>
                            <div class="flex">
                                <input class="focus w420" placeholder="请输入单价" v-model="data.price" required>
                                <input class="focus w200" placeholder="请输入单位" v-model="data.unit" required>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td><strong class="required">*</strong>计算价格公式：</td>
                        <td>
                            <drop-down :width="'200px'" :data="formulaType" v-permission="'price_detail'" :name="'label'" @select="data.formulaType=$event" :invalid="!data.formulaType"></drop-down>
                        </td>
                    </tr>
                    <tr>
                        <td>是否显示：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="up" :value="0" v-model="data.status">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="up" :value="1" v-model="data.status">
                                <div></div>
                                <span>否</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="actions">
                            <action :text="'保存价格'" @click.native="save" v-permission="id?'price_edit':'price_add'"></action>
                            <button class="black-simple" @click="$router.push('/price')">返回列表</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<style>
    table.technology td:last-of-type .flex {
        font-size: 0;
        align-items: center;
        display: flex;
    }

    table.technology td:last-of-type * {
        font-size: 14px;
    }

    table.technology td:last-of-type .flex>*:not(:last-child) {
        margin-right: 20px;
    }

    .w200 {
        width: 200px;
    }

    .w420 {
        width: 420px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                data: {
                    status: 0,
                    formulaType:undefined
                },
                id: this.$route.params.id,
                techTree: [],
                selectedTech: {},
                selectedTechAttr: {},
                formulaType: []
            }
        },
        methods: {
            getData: function () {
                var that = this;
                ajax({
                    url: "/admin/technologyPrice/" + that.id,
                    success: function (res) {
                        if (res.code === 0) {
                            that.data = res.data;
                            that.getTechTree();
                            that.getFormulaType();
                        }
                    }
                });
            },
            getTechTree: function () {
                var that = this;
                ajax({
                    url: "/admin/technology/selectTechAndAttr",
                    success: function (res) {
                        if (res.code === 0) {
                            $.each(res.data, function (index, item) {
                                item.selected = item.id == that.data.technologyId;
                                if (item.id == that.data.technologyId) {
                                    that.selectedTech = item;
                                }
                                $.each(item.attrs, function (index2, item2) {
                                    item2.selected = item2.id == that.data.technologyAttrId;
                                    if (item2.id == that.data.technologyAttrId) {
                                        that.selectedTechAttr = item2;
                                    }
                                });
                            });
                            that.techTree = res.data;
                        }
                    }
                });
            },
            getFormulaType: function () {
                var that = this;
                ajax({
                    url: "/admin/technologyPrice/getFormulaType",
                    success: function (res) {
                        if (res.code === 0) {
                            if (that.id) {
                                $.each(res.data, function (index, item) {
                                    item.selected = that.data.formulaType == item.value;
                                });
                            }
                            that.formulaType = res.data;

                        }
                    }
                });
            },
            save: function () {
                this.data.otherName = this.data.otherName || undefined;
                this.data.otherPrice = this.data.otherPrice || 0;
                this.data.otherUnit = this.data.otherUnit || undefined;
                if (this.id) {
                    this.edit();
                } else {
                    this.add();
                }
            },
            edit: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/technologyPrice",
                    type: "put",
                    data: $.extend({}, that.data, {
                        technologyAttrId: that.selectedTechAttr.id,
                        technologyId: that.selectedTech.id,
                    }),
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/price/");
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/technologyPrice",
                    type: "post",
                    data: $.extend({}, that.data, {
                        technologyAttrId: that.selectedTechAttr.id,
                        technologyId: that.selectedTech.id,
                    }, {
                        id: undefined
                    }),
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/price/");
                        }
                    }
                });
            }
        },
        mounted: function () {
            if (this.id) {
                this.getData();
            } else {
                this.getTechTree();
                this.getFormulaType();
            }
        },
        activated: function () {
            if (this.id) {
                this.getData();
            } else {
                this.getTechTree();
                this.getFormulaType();
            }
        }
    })
</script>