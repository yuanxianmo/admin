<template>
    <label :class="['drop-down',theme,{readonly:readonly,disabled:disabled,invalid:invalid}]" :style="{lineHeight:height,height:height,width:width,minWidth:minWidth}">
        <input type="text" class="hidden-text" :disabled="disabled">
        <dt :style="{height:innerHeight}">
            <template v-if="!selected.input">{{selected[name]||(data.length?(placeholder||"请选择"):placeholder)}}</template>
            <input v-model="current[name]" @mouseenter="$event.target.focus()" @click.prevent="$event.target.parentElement.previousElementSibling.focus()" v-else @input="$emit('output',{name:current[name]})" v-focus placeholder="请输入">
        </dt>
        <dd>
            <ul :style="{maxHeight:maxHeight}">
                <li @mousedown="!readonly&&init()" v-if="all">{{all}}</li>
                <li v-permission="i.permission||''" v-if="(!i.permission||$root.hasPermission(i.permission))" v-for="(i,index) in dataCloned" @mousedown="!readonly&&select(i);" :key="keyName+','+index" :class="{input:i.input}">{{i[name]||"&nbsp;"}}</li>
            </ul>
        </dd>
    </label>
</template>
<style>
    .drop-down {
        border: 1px solid #dadada;
        background-color: #fafafa;
        font-size: 12px;
        box-sizing: border-box;
        line-height: 21px;
        color: #353535;
        position: relative;
        text-align: left;
        display: inline-flex;
        white-space: nowrap;
        margin: 0;
        align-items: center;
        user-select: none;
        flex-basis: auto;
        transition: all .2s;
    }

    .drop-down.invalid,
    .drop-down.invalid ul {
        border-color: #ff000059 !important;
    }

    .drop-down.disabled {
        opacity: .5;
        pointer-events: none;
    }

    .drop-down .hidden-text {
        width: 0;
        height: 0;
        opacity: 0;
        flex: 0;
        border: none;
        padding: 0;
        max-width: 0;
    }

    .drop-down.readonly {
        cursor: not-allowed;
    }

    .drop-down dt {
        padding-right: 40px;
        padding-left: 5px;
        transition: background-color .3s;
        flex: 1;
        display: flex;
        align-items: center;
        background-image: url(images/arrow_down.png);
        background-position: calc(100% - 5px) center;
        background-repeat: no-repeat;
    }

    .drop-down dt input {
        width: 100%;
        height: 100%;
        border: none;
        background-color: transparent;
    }

    .drop-down.readonly:hover dd {
        display: none;
    }

    .drop-down dd {
        position: absolute;
        left: -1px;
        top: calc(100% + 1px);
        margin: 0;
        min-width: calc(100% + 2px);
        display: none;
        z-index: 20;
        overflow: hidden;
    }

    .drop-down dd:active {
        display: none !important;
    }

    .drop-down dd ul {
        list-style: none;
        padding: 0;
        margin: 0;
        overflow-y: auto;
        animation: from-top .2s;
        border: 1px solid #dadada;
        border-top: none;
        background-color: white;
        transition: all .2s;
    }

    .drop-down dd ul::-webkit-scrollbar {
        width: 2px;
    }

    .drop-down dd li {
        padding: 0 5px;
        cursor: pointer;
        transition: all .1s;
    }

    .drop-down dd li.input {
        padding-left: 24px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACnUlEQVRYR7WWPYgTURDH//PyEpWAx2GhhV6sRDkrU5yCeiGehx/Ivg1oaWV7pWAhtjaWFgfHFdpYhOTtRkXl/MLjQBTksFFQVBDUQgyICHE3O/KCB0sue/nwbboNu/v77cy8mSGk/KtUKgeYeZ6ZtwO45HnerTiS0uQ7jnNECPEAwJY1DjPPeZ53fe06NQGl1DEAd4loU4+PvKi1vmb+T03Add1HAMq9IszMTESTWus31gWUUiUhRD4IgidSShP+wwlpPqO1vmNVwMAB3Cci896TYRg+z2Qyj4loKi7BzO+z2exktVr9Y00gBu/knJlbRHRKSvkiCIKHMYmvURRN+b7/2VoNdMNjFW8kZqSUq0EQPCOighDiYK1We2ftFCTBYxK/mbmcy+XetlqtQqPReG2tD/SDx0DfpJQFk/Pughy5BoaA/yKicr1ef9nrNIwkYAs+UhHahA8t4LrucWa+ndBe4xHeMOwjFaGBm94OINtngA0MHzgCacEHEkgT3lcgbfggAvcAnLCZ84EakeM4u4QQe5vN5vL4+PjSBiN1qIIbuBEppS4T0RUAp8MwXEmY6/8NT0yBUuojEe0GEBCRa5aL+Fxn5p9CiJmk9jrMnrmuFbuuOw3gaWyahcx8LpfLLZm5DmAfgGnP81aHASXd20vgBoDzXQ+0oyg6ayTa7faeer3+ygZ8XQpmZ2fz+Xz+O4DNXSvUJ2Ze8H3/qll2bMHXCTiOc0EIsfAPEADwDdjzPHMSrIJ7bkRKqRUA24hoUUq5WK1Wf9j82g2PYalUkmNjY4d8319OGzrSNExLqnMKisVidmJiYo6Zt6YGIvqgtb7ZsxUrpRQR6bTga++Nouhod4o7EahUKjuZ2SyNO9KSYOZmFEX7G43GlzjjL2EZKjBI3P7WAAAAAElFTkSuQmCC");
        background-position: 5px center;
        background-repeat: no-repeat;
        background-size: 12px;
    }

    .drop-down:not(.readonly):hover {
        background-color: white;
        border-color: #c4a66a;
    }

    .drop-down:not(.readonly):hover dd ul {
        border-color: #c4a66a;
    }

    .drop-down .hidden-text:focus~dt {
        background-image: url(images/arrow_up.png);
    }

    .drop-down .hidden-text:focus~dd {
        display: block;
    }

    .drop-down dd li:hover {
        background-color: #c4a66a;
        color: white;
    }

    main {
        padding-bottom: 100px;
    }

    .drop-down.simple {
        background-color: white;
        border: none;
    }
</style>
<script>
    ({
        props: {
            data: {
                default: function () {
                    return []
                }
            },
            placeholder: {
                default: ""
            },
            maxHeight: {
                default: "300px"
            },
            height: {
                default: "30px"
            },
            minWidth: {
                default: "auto"
            },
            innerHeight: {
                default: "100%"
            },
            width: {
                default: "auto"
            },
            readonly: {
                default: false
            },
            keyName: {
                default: undefined
            },
            name: {
                default: 'name'
            },
            value: {
                default: 'value'
            },
            theme: {
                default: ''
            },
            disabled: {
                default: false
            },
            invalid: {
                default: false
            },
            all: {
                default: ""
            },
            noSelect: {
                default: false
            }
        },
        data: function () {
            return {
                dataCloned: [],
                current: {}
            }
        },
        computed: {
            selected: function () {
                var ret = {};
                $.each(this.dataCloned, function (index, item) {
                    if (item.selected) {
                        ret = item;
                    }
                });
                return JSON.parse(JSON.stringify(ret));
            },
            tmp: function () {
                return JSON.parse(JSON.stringify(this.data));
            }
        },
        methods: {
            select: function (obj) {
                this.current = obj;
                var that = this;
                if (obj[this.name] == this.selected[this.name]) return;


                if (!this.noSelect) {
                    $.each(this.dataCloned, function (index, item) {
                        if (obj != item) {
                            that.$set(item, "selected", false);
                        }
                    });
                    this.$set(obj, "selected", true);
                }



                if (this.keyName == undefined) {
                    this.$emit('select', obj[this.value]);
                } else {
                    this.$emit('select', [this.keyName, obj[this.value]]);
                }
                this.$emit("output", obj);
            },
            init: function () {
                var obj = {};
                obj[this.name] = "";
                obj[this.value] = "";
                this.dataCloned = JSON.parse(JSON.stringify(this.tmp));
                this.select(obj);
            }
        },
        watch: {
            tmp: function (after, before) {
                if (JSON.stringify(after) !== JSON.stringify(before)) {
                    this.dataCloned = JSON.parse(JSON.stringify(this.data));
                }
            }
        },
        mounted: function () {
            this.dataCloned = JSON.parse(JSON.stringify(this.tmp));
        },
        activated:function(){
            this.dataCloned = JSON.parse(JSON.stringify(this.tmp));
        }
    })
</script>