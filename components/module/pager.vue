<template>
    <div class="pager" v-if="pages>0">
        <div class="main">
            <button class="pick sibling" @click="$emit('pager',xcurrentPage-1<=0?1:xcurrentPage-1)">上一页</button>
            <button :class="['pick',{current:xcurrentPage==1}]" @click="$emit('pager',1)">1</button>
            <span v-if="xcurrentPage-5>0">...</span>
            <button :class="['pick',{current:index+1==xcurrentPage}]" @click="$emit('pager',index+1)" v-for="(item,index) in pages"
                v-if="abs(index+1-xcurrentPage)<4&&index!=0&&index!=pages-1" :key="index">{{index+1}}</button>
            <span v-if="xcurrentPage+5<=pages">...</span>
            <button :class="['pick',{current:xcurrentPage==pages}]" @click="$emit('pager',pages)" v-if="pages>1">{{pages}}</button>
            <button class="pick sibling" @click="$emit('pager',xcurrentPage+1>pages?pages:xcurrentPage+1)">下一页</button>
        </div>
        <div class="sec">
            <span>共{{xpages}}页，到第</span>
            <input type="number" class="pager-num" v-model="page" min="1" :max="xpages<=0?1:xpages">
            <span>页</span>
            <button class="confirm" @click="$emit('pager',page>xpages?(page=xpages):(page<=0?(page=1):page))">确定</button>
        </div>
    </div>
</template>
<style>
    .pager {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        letter-spacing: 2px;
        height: 100px;
        user-select: none;
    }

    .pager .main {
        font-size: 0;
    }

    .pager .main span {
        font-size: 14px;
        vertical-align: bottom;
    }

    .pager .pick {
        border: 1px solid #ddd;
        height: 36px;
        min-width: 36px;
        background-color: transparent;
        margin: 0 8px;
        font-size: 14px;
        color: #333;
        transition: all .2s;
        cursor: pointer;
        vertical-align: top;
    }

    .pager .pick:hover,
    .pager .pick.current {
        color: #c4a66a;
        border-color: #c4a66a;
    }

    .pager .pick.sibling {
        width: 64px;
    }
    .pager .sec {
        font-size: 12px;
        color: #8f8f8f;
    }

    .pager .sec .pager-num {
        height: 26px;
        width: 50px;
        border: 1px solid #ddd;
        text-align: center;
        color: #8f8f8f;
        transition: all .2s;
    }
    .pager .sec .pager-num:hover,
    .pager .sec .pager-num:focus {
        border-color: #c4a66a;
    }
    .pager .sec .confirm {
        width: 46px;
        height: 26px;
        border: 1px solid #ddd;
        background-color: transparent;
        color: #8f8f8f;
        cursor: pointer;
    }

    .pager .sec .confirm:hover {
        color: #c4a66a;
        border-color: #c4a66a;
    }
</style>
<script>
    ({
        props: {
            xpages: {},
            xcurrentPage: {
                default: 1
            }
        },
        data: function () {
            return {
                page: 1,
                pagesArr: new Array(this.xpages)
            }
        },
        methods: {
            abs: function (v) {
                return Math.abs(v);
            }
        },
        computed:{
            pages:function(){
                return Math.max(this.xpages,this.xcurrentPage);
            }
        }
    })
</script>