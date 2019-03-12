<template>
    <main>
        <div class="page-head">
            <div class="left">
                <img src="images/home/order.png">订单预览
            </div>
        </div>
        <div class="page-body">
            <div class="preview">
                <img src="images/home/wallet.png">
                <span>待付款</span>
                <strong>***</strong>
            </div>
            <div class="preview">
                <img src="images/home/printer.png">
                <span>印刷中</span>
                <strong>***</strong>
            </div>
            <div class="preview">
                <img src="images/home/express.png">
                <span>待发货</span>
                <strong>***</strong>
            </div>
            <div class="preview">
                <img src="images/home/goods.png">
                <span>待收货</span>
                <strong>***</strong>
            </div>
        </div>
        <div class="page-head">
            <div class="left">
                <img src="images/home/sold.png">销售总览
            </div>
        </div>
        <div class="page-body">
            <dl class="preview-text">
                <dt>订单总金额</dt>
                <dd>***</dd>
            </dl>
            <dl class="preview-text">
                <dt>总订单数</dt>
                <dd>***</dd>
            </dl>
            <dl class="preview-text">
                <dt>总访问次数</dt>
                <dd>***</dd>
            </dl>
            <dl class="preview-text">
                <dt>会员总数</dt>
                <dd>***</dd>
            </dl>
            <dl class="preview-text">
                <dt>消费会员数</dt>
                <dd>***</dd>
            </dl>
        </div>
        <div class="page-head">
            <div class="left">
                <img src="images/home/statis.png">销售指标
            </div>
        </div>
        <div class="page-body">
            <dl class="preview-text">
                <dt>人均消费率</dt>
                <dd>***</dd>
            </dl>
            <dl class="preview-text">
                <dt>访问转化率</dt>
                <dd>***</dd>
            </dl>
            <dl class="preview-text">
                <dt>订单转化率</dt>
                <dd>***</dd>
            </dl>
            <dl class="preview-text">
                <dt>注册用户消费率</dt>
                <dd>***</dd>
            </dl>
            <dl class="preview-text">
                <dt>订单复购率</dt>
                <dd>***</dd>
            </dl>
        </div>
    </main>
</template>
<style>
    .page-body {
        display: flex;
        padding: 20px 0;
    }

    .preview {
        display: flex;
        background-color: #f5f5f5;
        align-items: center;
        padding: 15px;
    }

    .preview:not(:first-of-type) {
        margin-left: 20px;
    }
    .preview img {
        margin-right: 13px;
    }
    .preview span {
        color: #8f8f8f;
        margin-right: 20px;
    }

    .preview strong {
        font-size: 26px;
        color: #575757;
        font-weight: normal;
    }
    .preview-text {
        flex: 1;
        background-color: #f5f5f5;
        text-align: center;
        padding: 20px 0;
    }
    .preview-text dt {
        color: #8f8f8f;
        margin-bottom: 20px;
    }
    .preview-text dd {
        color: #222;
        font-size: 20px;
    }
</style>
<script>
    ({})
</script>