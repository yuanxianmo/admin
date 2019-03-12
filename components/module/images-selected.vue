<template>
    <div class="img-upload-list">
        <div class="img" v-for="(i,index) in data" v-if="i" @drop="drop($event,index);$($event.currentTarget).removeClass(['drag-over-right','drag-over-left'])" @dragleave="$($event.currentTarget).removeClass(['drag-over-right','drag-over-left'])" @dragover.prevent="drag.startIndex>index?$event.currentTarget.classList.add('drag-over-left'):(drag.startIndex!=index&&$event.currentTarget.classList.add('drag-over-right'))"
            @dragstart="dragStart(index);$event.dataTransfer.effectAllowed='move';" :draggable="draggable">
            <img :src="i" v-if="!fileMode">
            <a v-else :href="i" download target="_blank">{{i.split(".").pop()}}</a>
            <div class="del" @click="$emit('del',index)" v-if="!fileMode" :style="{cursor:draggable?'move':'pointer'}">删除{{draggable?"/排序":""}}</div>
        </div>
    </div>
</template>
<style>
    .img-upload-list .img {
        width: 80px;
        height: 80px;
        position: relative;
        background-color: black;
        display: inline-block;
        user-select: none;
        box-sizing: content-box;
        transition: all .2s;
    }

    .img-upload-list .img:not(:last-child) {
        margin-right: 10px;
    }

    .img-upload-list .img.drag-over-left:before {
        content: "";
        display: block;
        width: 4px;
        height: 100%;
        background-color: #c4a66a;
        right: calc(100% + 3px);
        top: 0;
        position: absolute;
    }

    .img-upload-list .img.drag-over-right:before {
        content: "";
        display: block;
        width: 4px;
        height: 100%;
        background-color: #c4a66a;
        left: calc(100% + 3px);
        top: 0;
        position: absolute;
    }

    .img-upload-list .img img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .img-upload-list .del {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        color: white;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0;
        transition: all .2s;
        -webkit-transition: all .2s;
        -moz-transition: all .2s;
        -ms-transition: all .2s;
        -o-transition: all .2s;
    }

    .img-upload-list .img:hover:not(:active) .del {
        opacity: 1;
    }

    .img-upload-list a {
        width: 100%;
        height: 100%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        text-transform: uppercase;
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
            fileMode: {
                default: false
            },
            draggable: {
                default: false
            }
        },
        data: function () {
            return {
                drag: {
                    data: [],
                    startIndex: 0
                }
            }
        },
        methods: {
            dragStart: function (index) {
                this.drag.startIndex = index;
                this.drag.data = [].concat(this.data);

            },
            drop: function (e, index) {
                var data = [].concat(this.drag.data);
                data.splice(index, 0, data.splice(this.drag.startIndex, 1)[0]);
                this.$emit("output", data);
            },
            $: $
        }
    })
</script>