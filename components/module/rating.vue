<template>
    <div class="rating">
        <div class="bottom">
            <img src="images/star_empty.png">
            <img src="images/star_empty.png">
            <img src="images/star_empty.png">
            <img src="images/star_empty.png">
            <img src="images/star_empty.png">
        </div>
        <div class="cover" :style="{width:rating*100/5+'%'}">
            <img src="images/star.png">
            <img src="images/star.png">
            <img src="images/star.png">
            <img src="images/star.png">
            <img src="images/star.png">
        </div>
    </div>
</template>
<style>
    .rating {
        display: inline-block;
        font-size: 0;
    }
    .rating .bottom {
        height: 14px;
    }
    .rating .cover {
        white-space: nowrap;
        overflow: hidden;
        margin-top: -14px;
        height: 16px;
    }
    .rating img {
        margin: 0 1px;
        vertical-align: top;
        width: 16px;
        height: 14px;
    }
</style>
<script>
({
    props:{
        rating:{
            default:0
        }
    }
})
</script>
