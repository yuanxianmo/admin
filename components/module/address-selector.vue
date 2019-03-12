<template>
    <div id="address-box" class="popup">
        <div class="address-body fixed-box s-content">
            <div class="content">
                <h3>编辑收货地址</h3>
                <table class="address-table edit">
                    <tbody>
                        <tr>
                            <td>
                                <strong class="required">*</strong>姓名：</td>
                            <td>
                                <input v-model="cName" class="focus w100" placeholder="请填写收货人姓名" required>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong class="required">*</strong>手机：</td>
                            <td>
                                <input v-model="cPhone" type="tel" class="focus w100" placeholder="请填写收货人手机号" required>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong class="required">*</strong>省份：</td>
                            <td>
                                <drop-down :data="provinces" :width="'100%'" :name="'label'" :max-height="'240px'" @select="init=false;selectedProvince={label:$event[0],value:$event[1]}"></drop-down>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong class="required">*</strong>城市：</td>
                            <td>
                                <drop-down :data="cities" :width="'100%'" :name="'label'" :max-height="'240px'" @select="init=false;selectedCity={label:$event[0],value:$event[1]}"></drop-down>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong class="required">*</strong>区域：</td>
                            <td>
                                <drop-down :data="areas" :width="'100%'" :name="'label'" :max-height="'240px'" @select="init=false;selectedArea={label:$event[0],value:$event[1]}"></drop-down>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong class="required">*</strong>详细地址：</td>
                            <td>
                                <input class="focus w100" placeholder="请填写详细地址" v-model="cAddress" required>
                            </td>
                        </tr>
                        <tr>
                            <td>邮编：</td>
                            <td>
                                <input class="focus w100" placeholder="请填写邮编" v-model="cZipcode">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="bts">
                <button class="theme-bt add" @click="confirm">确定</button>
            </div>
            <button class="close" @click="cancel"></button>
        </div>
    </div>
</template>
<style>
    #address-box .address-body {
        padding: 45px 80px 35px 80px;
        position: relative;
        max-width: 500px;
    }

    #address-box .content {
        align-items: center;
        color: #353535;
        font-size: 16px;
        margin-bottom: 20px;
    }

    #address-box .content img {
        margin-right: 18px;
    }

    #address-box .content h3 {
        margin: 0 0 20px 0;
        text-align: center;
        font-size: 18px;
        font-weight: normal;
        color: #333;
    }

    .address-table {
        width: 100%;
        font-size: 13px;
    }

    .address-table td:first-child {
        text-align: right;
        color: #444;
    }

    .address-table input {
        width: 100%;
    }

    #address-box .bts {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #address-box .bts button {
        width: 148px;
        font-size: 16px;
        height: 46px;
    }

    #address-box .bts button:hover {
        opacity: .7;
    }

    #address-box .bts .yes {
        border: 1px solid #c4a66a;
        color: #c4a66a;
        margin-right: 30px;
    }

    #address-box .bts .no {
        border: 1px solid #b2b2b2;
        color: #b2b2b2;
    }

    #address-box .close {
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

    #address-box .close:hover {
        opacity: .7;
    }

    .address-table td:last-child {
        width: 100%;
    }

    table.edit td:first-child {
        font-size: 13px;
    }

    .address-table .drop-down {
        font-size: 13px;
    }
</style>
<script>
    ({
        data: function () {
            return {
                provinces: [],
                cities: [],
                areas: [],
                selectedProvince: {},
                selectedCity: {},
                selectedArea: {},
                cName: this.name,
                cPhone: this.phone,
                cAddress: this.address,
                cPhone: this.phone,
                cZipcode: this.zipcode,
                init: true
            }
        },
        props: {
            name: {
                default: ""
            },
            phone: {
                default: ""
            },
            province: {
                default: function () {
                    return {}
                }
            },
            city: {
                default: function () {
                    return {}
                }
            },
            area: {
                default: function () {
                    return {}
                }
            },
            address: {
                default: ""
            },
            zipcode: {
                default: ""
            }
        },
        methods: {
            confirm: function () {
                if (this.cName == "" || this.cName == undefined) {
                    this.$root.alerts.push("请输入姓名");
                    return
                }
                if (!/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.cPhone)) {
                    this.$root.alerts.push("请输入正确手机号");
                    return
                }
                if (this.selectedArea.value == undefined) {
                    this.$root.alerts.push("请选择区域");
                    return
                }
                if (this.cAddress == "" || this.cAddress == undefined) {
                    this.$root.alerts.push("请输入详细地址");
                    return
                }
                this.$emit('confirm', {
                    name: this.cName,
                    phone: this.cPhone,
                    province: this.selectedProvince,
                    city: this.selectedCity,
                    area: this.selectedArea,
                    address: this.cAddress,
                    zipcode: this.cZipcode
                });
            },
            cancel: function () {
                this.$emit("close");
            },
            getProvinces: function (fn) {
                var that = this;
                ajax({
                    url: "/api/proinvce/1",
                    success: function (res) {
                        if (res.code === 0) {
                            fn && fn(res);
                            $.each(res.data, function (index, item) {
                                item.selected = (that.province.value == item.value || that.province
                                    .label == item.label);
                                item.value = [item.label, item.value];
                            });
                            that.provinces = res.data;
                        }
                    }
                });
            },
            getCities: function (fn) {
                var that = this;
                ajax({
                    url: "/api/proinvce/area/" + that.selectedProvince.value,
                    success: function (res) {
                        if (res.code === 0) {
                            fn && fn(res);
                            $.each(res.data, function (index, item) {
                                item.selected = (that.selectedCity.value == item.value ||
                                    that.selectedCity.label == item.label);
                                item.value = [item.label, item.value];
                            });
                            that.cities = res.data;
                        }
                    }
                });
            },
            getAreas: function (fn) {
                var that = this;
                ajax({
                    url: "/api/proinvce/area/" + that.selectedCity.value,
                    success: function (res) {
                        if (res.code === 0) {
                            fn && fn(res);
                            $.each(res.data, function (index, item) {
                                item.selected = (that.selectedArea.value == item.value ||
                                    that.selectedArea.label == item.label);
                                item.value = [item.label, item.value];
                            });
                            that.areas = res.data;
                        }
                    }
                });
            }
        },
        mounted: function () {
            var that = this;
            this.getProvinces(function (res) {
                if (that.city.value == -1) {
                    $.each(res.data, function (index, item) {
                        if (item.label == that.province.label) {
                            that.selectedProvince.value = that.province.value = item.value;
                            that.selectedProvince.label = that.province.label = item.label;
                            that.getCities(function (res) {
                                $.each(res.data, function (index, item) {
                                    if (item.label == that.city.label) {
                                        that.selectedCity.value = that.city.value =
                                            item.value;
                                        that.selectedCity.label = that.city.label =
                                            item.label;
                                        that.getAreas(function (res) {
                                            $.each(res.data, function (
                                                inde, item) {
                                                if (item.label ==
                                                    that.area.label
                                                ) {
                                                    that.selectedArea
                                                        .value =
                                                        that.area
                                                        .value =
                                                        item.value;
                                                    that.selectedArea
                                                        .label =
                                                        that.area
                                                        .label =
                                                        item.label;
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });
                }
            });
            if (this.province.value && this.province.value != -1) {
                this.selectedProvince = {
                    label: this.province.label,
                    value: this.province.value
                };
            };
            if (this.city.value && this.city.value != -1) {
                this.selectedCity = {
                    label: this.city.label,
                    value: this.city.value
                };
                if (this.province.value) {
                    this.getCities();
                }
            };
            if (this.area.value && this.area.value != -1) {
                this.selectedArea = {
                    label: this.area.label,
                    value: this.area.value
                };
                if (this.city.value) {
                    this.getAreas();
                }
            }
        },
        watch: {
            selectedProvince: function (after, before) {
                if (this.init) return;
                this.selectedCity = {};
                this.selectedArea = {};
                this.areas = []
                if (this.selectedProvince.value) {
                    this.getCities();
                }
            },
            selectedCity: function (after, before) {
                if (this.init) return;
                this.selectedArea = {};
                if (this.selectedCity.value) {
                    this.getAreas();
                }
            }
        }
    })
</script>