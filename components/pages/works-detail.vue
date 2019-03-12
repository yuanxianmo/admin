<template>
    <main>
        <tabs :tabs="['基本信息', '作品详情', '工艺描述', commentDetail?'评价详情':'评价列表']" v-if="originalData">
            <table class="edit" slot="0" key="0">
                <tbody>
                    <tr>
                        <td>
                            <strong class="required">*</strong>
                            作品名称：
                        </td>
                        <td>
                            <input class="focus h32 w100" required placeholder="请输入作品名称" v-model="originalData.goods.name" @select="selectProfession">
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top">
                            <strong class="required">*</strong>
                            作品行业分类：
                        </td>
                        <td>
                            <div id="professions" class="mb10">
                                <drop-down :min-width="'142px'" :data="i" :value="'id'" @select="selectProfession" :key-name="index" v-for="(i,index) in professions" :key="index" @contextmenu.native.prevent="professions.splice(index,1)" :title="'点击右键删除'"></drop-down>
                            </div>
                            <button id="add-profession" class="theme-bt-simple add-more" @click="professions.push(copyArray(originalProfession))">添加更多行业分类</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top">
                            <strong class="required">*</strong>
                            作品结构分类：
                        </td>
                        <td>
                            <div v-for="(i,index) in structures" id="structures">
                                <drop-down v-for="(j,index2) in i" :key="index+','+index2" :min-width="'142px'" :data="j" @select="selectStructure" :key-name="index+','+index2" :value="'id'" v-if="j&&j.length" @contextmenu.native.prevent="structures.splice(index,1)" :title="'点击右键删除'"></drop-down>
                            </div>
                            <button class="theme-bt-simple add-more" @click="structures.push([getNextStructures(0)])">添加更多结构分类</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top">
                            <strong class="required">*</strong>作品大图：</td>
                        <td>
                            <div class="flex-input mb10">
                                <input readonly class="desc h32" :value="mainThumb[mainThumb.length-1]" placeholder="请选择作品展示大图，展示在首页、分类、搜索、详情">
                                <button class="black" @click="imgPos='main';imgSingle=true;selectImage=true">选择图片</button>
                            </div>
                            <images-selected :data="mainThumb" @del="mainThumb.splice($event,1)"></images-selected>
                            <p class="tip">
                                <strong class="required">*</strong>建议尺寸:450*450, 图片大小1M以内；请将所有作品图片尺寸保持一致
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top">作品小图：</td>
                        <td>
                            <div class="flex-input mb10">
                                <input readonly class="desc h32" placeholder="请选择作品展示小图，展示在详情" :value="minorThumbs[minorThumbs.length-1]">
                                <button class="black" @click="imgPos='minor';imgSingle=false;selectImage=true">选择图片</button>
                            </div>
                            <images-selected :draggable="true" :data="minorThumbs" @del="minorThumbs.splice($event,1)" @output="minorThumbs=$event">
                            </images-selected>
                        </td>
                    </tr>
                    <tr v-if="originalData.goods.type==='1'">
                        <td class="v-top">
                            <strong class="required">*</strong>对应刀模图</td>
                        <td>
                            <div class="flex-input mb10">
                                <input readonly class="desc h32" placeholder="请选择该盒型的刀模图" :value="originalData.goods.filePath">
                                <button class="black" @click="fileMode=true;imgPos='template';imgSingle=true;selectImage=true">选择文件</button>
                            </div>
                            <images-selected :file-mode="true" :data="[originalData.goods.filePath]" @del="originalData.goods.filePath=undefined">
                            </images-selected>
                        </td>
                    </tr>
                    <tr class="size">
                        <td><strong class="required">*</strong>作品尺寸：</td>
                        <td>
                            <div class="flex-center">
                                长
                                <input class="focus h32 flex-fill" type="number" min="0" placeholder="请输入作品的长(mm)" v-model="originalData.goods.length" required> 宽
                                <input class="focus h32 flex-fill" type="number" min="0" placeholder="请输入作品的宽(mm)" v-model="originalData.goods.width" required> 高
                                <input class="focus h32 flex-fill" type="number" min="0" placeholder="请输入作品的高(mm)" v-model="originalData.goods.height" required>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>作品排序：</td>
                        <td>
                            <input class="focus h32 w100" type="number" placeholder="作品的排序，数字越大越靠前" v-model.number="originalData.goods.orderid">
                        </td>
                    </tr>
                    <tr class="price" v-if="originalData.goods.type==='2'">
                        <td class="v-top">
                            <strong class="required">*</strong>印刷价格：</td>
                        <td>
                            <div class="mb10" v-for="(i,index) in originalData.ranges">
                                <input class="focus h32" placeholder="最低承印个数" v-model.number="i.downnum" type="number" min="0" :required="(i.downnum==''||i.downnum==null)&&(i.upnum==''||i.upnum==null)">个 -
                                <input class="focus h32" placeholder="无限多" v-model.number="i.upnum" type="number" min="0" :required="(i.downnum==''||i.downnum==null)&&(i.upnum==''||i.upnum==null)">
                                <span class="mr50">个</span>
                                <input class="focus h32" v-model.number="i.price" min="0.01" type="number" step="0.01" required>元
                                <button class="x simple" @click="originalData.ranges.splice(index,1)" v-if="originalData.ranges.length>1"></button>
                            </div>
                            <button class="theme-bt-simple add-more" @click="originalData.ranges?originalData.ranges.push({downnum:'',upnum:'',price:''}):(originalData.ranges=[],originalData.ranges.push({downnum:'',upnum:'',price:''}))">添加更多价格区间</button>
                        </td>
                    </tr>
                    <tr>
                        <td>是否上架：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="open" :value="0" v-model="originalData.goods.status">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="open" :value="1" v-model="originalData.goods.status">
                                <div></div>
                                <span>否</span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table class="edit" slot="1" key="1">
                <tbody>
                    <tr class="idea">
                        <td class="v-top lh32">
                            <strong class="required">*</strong>作品描述：
                        </td>
                        <td>
                            <textarea class="focus" required placeholder="作品简介，最多255个字符" rows="10" v-model="originalData.goods.descript" maxlength="500"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="v-top lh32">作品详情：</td>
                        <td>
                            <quill-editor v-model="originalData.goods.content" ref="quillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
                            </quill-editor>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table :class="['tag',{disabled:originalData.goods.type=='1'}]" slot="2" key="2">
                <tbody>
                    <tr v-for="i in technology" v-if="i.status===0">
                        <td>{{i.name}}</td>
                        <td>
                            <div class="label-wrap">
                                <label :class="['tag',{disabled:originalData.goods.type=='1'}]" v-for="j in i.attrs" v-if="j.status===0">
                                    <input type="checkbox" v-model="j.selected" :disabled="originalData.goods.type=='1'">
                                    <div>{{j.name}}</div>
                                </label>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <table class="edit" slot="3" key="3">
                <tbody>
                    <tr>
                        <td>是否参与分销：</td>
                        <td>
                            <label class="radio">
                                <input type="radio" name="dlv" :value="0" v-model="fx">
                                <div></div>
                                <span>是</span>
                            </label>
                            <label class="radio">
                                <input type="radio" name="dlv" :value="1" v-model="fx">
                                <div></div>
                                <span>否</span>
                            </label>
                        </td>
                    </tr>
                    <template v-if="fx===0">
                        <tr>
                            <td>独立规则：</td>
                            <td>
                                <label class="checkbox">
                                    <input type="checkbox" checked="checked">
                                    <div></div>
                                    <span>启用独立佣金比例</span>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>一级分销：</td>
                            <td>
                                <div class="flex-center">
                                    <input class="focus flex-fill" placeholder="佣金占印刷品总额的百分比">&nbsp;%&nbsp;&nbsp;&nbsp;或者&nbsp;&nbsp;&nbsp;
                                    <input class="focus flex-fill" placeholder="佣金占单个印刷品的固定金额">&nbsp;元
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>二级分销：</td>
                            <td>
                                <div class="flex-center">
                                    <input class="focus flex-fill" placeholder="佣金占印刷品总额的百分比">&nbsp;%&nbsp;&nbsp;&nbsp;或者&nbsp;&nbsp;&nbsp;
                                    <input class="focus flex-fill" placeholder="佣金占单个印刷品的固定金额">&nbsp;元
                                </div>
                                <p class="tip">如果比例为空则使用固定规则，固定规则都为空则无分销佣金。</p>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table> -->
            <div class="comment" slot="3" key="3" v-if="commentDetail==false">
                <router-view></router-view>
                <div class="top-fns mb20">
                    <search :placeholder="'请输入作品名称、ID'"></search>
                    <v-filter :height="'34px'">
                        <div>
                            <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :inner-height="'18px'" :data="[{name:'真实评价',value:1},{name:'模拟评价',value:2}]" :value="'name'" :placeholder="'评价类型'" :all="'全部'"></drop-down>
                            <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :inner-height="'18px'" :data="[{name:'好评',value:1},{name:'中评',value:2},{name:'差评',value:3}]" :value="'name'" :placeholder="'评价高低'" :all="'全部'"></drop-down>
                            <drop-down :theme="'simple'" :min-width="'120px'" :height="'32px'" :inner-height="'18px'" :data="[{name:'所有时间段',value:undefined,selected:true},{name:'三个月内',value:'threemonth',selected:false},{name:'今年',value:'thisyear',selected:false},{name:'去年',value:'lastyear',selected:false},{name:'前年',value:'lastyearbefore',selected:false}]"></drop-down>
                        </div>
                    </v-filter>
                </div>
                <ul class="statis-count mb10">
                    <li>总评价数：33</li>
                    <li>真实评价：12</li>
                    <li>模拟评价：22</li>
                    <li>好评：12</li>
                    <li>中评：23</li>
                    <li>差评：33</li>
                </ul>
                <table class="common row-border">
                    <thead>
                        <tr>
                            <td>订单号</td>
                            <td>评价者</td>
                            <td>评分等级</td>
                            <td>评价时间</td>
                            <td>状态</td>
                            <td>操作</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1223123445</td>
                            <td>某某某</td>
                            <td>
                                <rating :rating="4.5"></rating>
                            </td>
                            <td>208-06-06 17:51</td>
                            <td>
                                <div class="theme order-status">未回复</div>
                            </td>
                            <td>
                                <div class="simple-bts">
                                    <button class="simple theme" @click="commentDetail=true;commentReply=true;">回复评价</button>
                                    <button class="simple theme" @click="commentDetail=true;commentReply=false">详情</button>
                                    <button class="simple gray">删除</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1223123445</td>
                            <td>某某某</td>
                            <td>
                                <rating :rating="3.7"></rating>
                            </td>
                            <td>208-06-06 17:51</td>
                            <td>
                                <div class="theme order-status">未回复</div>
                            </td>
                            <td>
                                <div class="simple-bts">
                                    <button class="simple theme" @click="commentDetail=true;commentReply=true;">回复评价</button>
                                    <button class="simple theme" @click="commentDetail=true;commentReply=false">详情</button>
                                    <button class="simple gray">删除</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1223123445</td>
                            <td>某某某</td>
                            <td>
                                <rating :rating="5"></rating>
                            </td>
                            <td>208-06-06 17:51</td>
                            <td>
                                <div class="gray order-status">已回复</div>
                            </td>
                            <td>
                                <div class="simple-bts">
                                    <button class="simple theme" @click="commentDetail=true;commentReply=true;">回复评价</button>
                                    <button class="simple theme" @click="commentDetail=true;commentReply=false">详情</button>
                                    <button class="simple gray">删除</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1223123445</td>
                            <td>某某某</td>
                            <td>
                                <rating :rating="4.2"></rating>
                            </td>
                            <td>208-06-06 17:51</td>
                            <td>
                                <div class="theme order-status">未回复</div>
                            </td>
                            <td>
                                <div class="simple-bts">
                                    <button class="simple theme" @click="commentDetail=true;commentReply=true;">回复评价</button>
                                    <button class="simple theme" @click="commentDetail=true;commentReply=false">详情</button>
                                    <button class="simple gray">删除</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1223123445</td>
                            <td>某某某</td>
                            <td>
                                <rating :rating="2.5"></rating>
                            </td>
                            <td>208-06-06 17:51</td>
                            <td>
                                <div class="theme order-status">未回复</div>
                            </td>
                            <td>
                                <div class="simple-bts">
                                    <button class="simple theme" @click="commentDetail=true;commentReply=true;">回复评价</button>
                                    <button class="simple theme" @click="commentDetail=true;commentReply=false">详情</button>
                                    <button class="simple gray">删除</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>1223123445</td>
                            <td>某某某</td>
                            <td>
                                <rating :rating="4.5"></rating>
                            </td>
                            <td>208-06-06 17:51</td>
                            <td>
                                <div class="theme order-status">未回复</div>
                            </td>
                            <td>
                                <div class="simple-bts">
                                    <button class="simple theme" @click="commentDetail=true;commentReply=true;">回复评价</button>
                                    <button class="simple theme" @click="commentDetail=true;commentReply=false">详情</button>
                                    <button class="simple gray">删除</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pager :xcurrent-page="1" :xpages="3"></pager>
            </div>
            <div class="comment-detail" slot="3" key="3" v-else>
                <div class="page-body">
                    <table class="edit">
                        <tbody>
                            <tr>
                                <td>用户账号：</td>
                                <td>13692289195</td>
                            </tr>
                            <tr>
                                <td>评分等级：</td>
                                <td>
                                    <rating :rating="3"></rating>
                                </td>
                            </tr>
                            <tr>
                                <td class="v-top">评价内容：</td>
                                <td>
                                    <textarea class="focus comment-content w560" readonly></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td class="v-top">评价图片：</td>
                                <td>
                                    <div class="comment-images">
                                        <img v-for="i in commentImages" :src="i.url" :style="{width:80*i.zoom+'px',height:80*i.zoom+'px'}" @click="i.zoom*=2" @contextmenu.prevent="i.zoom=1">
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="commentReply">
                                <td class="v-top"><strong class="required">*</strong>回复内容：</td>
                                <td>
                                    <textarea class="focus comment-content w560" required placeholder="请输入回复内容" rows="5"></textarea>
                                </td>
                            </tr>
                            <tr v-if="commentReply">
                                <td class="v-top">回复图片：</td>
                                <td>
                                    <div class="flex-input mb10 w560">
                                        <input readonly="readonly" placeholder="请选择作品展示小图，展示在详情" class="desc h32">
                                        <button class="black" @click="imgPos='comment';imgSingle=false;selectImage=true">选择图片</button>
                                    </div>
                                    <images-selected :data="['images/demo.jpg','images/demo.jpg','images/demo.jpg']" :draggable="true"></images-selected>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td class="actions">
                                    <action :text="'提交回复'" v-if="commentReply"></action>
                                    <button class="black-simple" @click="commentDetail=false">返回列表</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </tabs>
        <div class="actions">
            <action @click.native="save" v-permission="id?'goods_edit':'goods_add'" :text="'保存作品'"></action>
            <button class="black-simple" @click="$router.push('/works')">返回列表</button>
        </div>
        <transition name="fade">
            <keep-alive>
                <images-selector v-if="selectImage" :file-mode="fileMode" :single="imgSingle" :upload-url="uploadUrl"  @close="selectImage=false" @confirm="selectImg">
                </images-selector>
            </keep-alive>
        </transition>
    </main>
</template>
<style>
    .mr50 {
        margin-right: 50px;
    }

    .tabs .wrap {
        padding: 30px;
    }

    table.edit .tip {
        font-size: 12px;
        color: #8f8f8f;
        margin: 0;
    }

    table.edit .theme-bt-simple {
        height: 30px;
    }

    .add-more {
        width: 142px;
    }

    .mb10 {
        margin-bottom: 10px;
    }

    table.edit tr.price .mb10 {
        display: flex;
        align-items: center;
    }

    table.edit tr.price input {
        width: 142px;
        margin-right: 5px;
    }

    table.edit tr.price input:not(:first-child) {
        margin-left: 3px;
    }

    table.edit .x {
        width: 15px;
        height: 15px;
        background-image: url(images/x.png);
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 25px;
    }

    table.edit .blank {
        width: 15px;
        height: 15px;
        margin-left: 58px;
    }

    table.edit .size .flex-fill {
        margin-left: 5px;
    }

    table.edit .size .flex-fill:not(:last-child) {
        margin-right: 15px;
        margin-left: 5px;
    }

    table.edit .idea textarea {
        resize: none;
        width: 100%;
    }

    table.edit td.v-top {
        line-height: 32px;
    }

    table.tag td:first-child {
        color: #353535;
        font-size: 12px;
        line-height: 50px;
        padding-right: 10px;
        vertical-align: top;
    }

    table.edit td:last-child {
        width: 100%;
    }

    .label-wrap {
        width: 296px;
        display: flex;
        flex-wrap: wrap;
        min-height: 50px;
    }

    .label-wrap:empty {
        margin-bottom: 20px;
    }

    label.tag {
        cursor: pointer;
        margin-bottom: 20px;
    }

    label.tag.disabled {
        cursor: not-allowed;
    }

    label.tag:not(.disabled):hover div {
        border-color: #c4a66a;
    }

    label.tag:nth-child(odd) {
        margin-right: 20px;
    }

    label.tag input {
        display: none;
    }

    label.tag div {
        width: 138px;
        min-height: 50px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #d2d2d2;
        color: #353535;
        padding: 5px;
        background-position: calc(100% + 1px) calc(100% + 1px);
        transition: all .2s;
    }

    label.tag input:checked+div {
        border-color: #c4a66a;
        background-image: url(images/works/check.png);
        background-color: #f7f6f3;
        background-repeat: no-repeat;
    }

    #professions .drop-down:not(:last-of-type) {
        margin-right: 10px;
    }

    #structures .drop-down:not(:last-of-type) {
        margin-right: 10px;
    }

    #professions .drop-down,
    #structures .drop-down {
        margin-bottom: 10px;
    }

    .w560 {
        width: 560px;
    }

    .comment-detail .page-head {
        padding-top: 0;
    }

    .comment-content {
        resize: vertical;
    }

    .comment-images {
        font-size: 0;
    }

    .comment-images img {
        width: 80px;
        height: 80px;
        object-fit: contain;
        margin-right: 10px;
        transition: all .2s;
        cursor: zoom-in;
        vertical-align: middle;
    }
</style>
<script>
    ({
        data: function () {
            return {
                id: this.$route.params.id,
                commentDetail: false,
                commentReply: false,
                commentImages: [{
                        url: 'images/demo.jpg',
                        zoom: 1
                    },
                    {
                        url: 'images/demo.jpg',
                        zoom: 1
                    },
                    {
                        url: 'images/demo.jpg',
                        zoom: 1
                    },
                    {
                        url: 'images/demo.jpg',
                        zoom: 1
                    }
                ],
                imgPos: "main",
                imgSingle: true,
                uploadUrl: "/api/oss/uploadGoodsImage",
                originalData: {
                    goods: {
                        content: "",
                        descript: "",
                        filePath: "",
                        height: "",
                        length: "",
                        name: "",
                        orderid: "",
                        price: "",
                        status: 0,
                        type: this.$route.meta.type == "custom" ? "1" : "2",
                        width: ""
                    },
                    photos: [],
                    professions: [],
                    ranges: [],
                    structures: [],
                    technologys: [],
                    ranges: []
                },
                setOn: false,
                setOff: false,
                structureAll: [],
                selectImage: false,
                professions: [],
                structures: [],
                mainThumb: [],
                minorThumbs: [],
                originalProfession: {},
                technology: [],
                fileMode: false,
                editorOption: {
                    bounds: "main",
                    theme: 'snow',
                    placeholder: "请输入内容",
                    modules: {
                        toolbar: {
                            container: [
                                ["bold", "italic", "underline", "strike"],
                                ["blockquote", "code-block"],
                                [{
                                    "header": 1
                                }, {
                                    "header": 2
                                }],
                                [{
                                    "list": "ordered"
                                }, {
                                    "list": "bullet"
                                }],
                                [{
                                    "script": "sub"
                                }, {
                                    "script": "super"
                                }],
                                [{
                                    "indent": "-1"
                                }, {
                                    "indent": "+1"
                                }],
                                [{
                                    "direction": "rtl"
                                }],
                                [{
                                    "size": ["small", false, "large", "huge"]
                                }],
                                [{
                                    "header": [1, 2, 3, 4, 5, 6, false]
                                }],
                                [{
                                    "color": []
                                }, {
                                    "background": []
                                }],
                                [{
                                    "font": ['Arial', '宋体', '黑体', '微软雅黑', '楷体']
                                }],
                                [{
                                    "align": []
                                }],
                                ["clean"],
                                ["link", "image", "video"]
                            ],
                            handlers: {
                                image: function (v) {
                                    this.imgSingle = true;
                                    this.imgPos = "editor";
                                    this.selectImage = true;
                                }.bind(this)
                            }
                        }
                    }
                },
                fx: 1
            }
        },
        components: {
            LocalQuillEditor: VueQuillEditor.quillEditor
        },
        computed: {
            editor: function () {
                return this.$refs.quillEditor.quill
            },
            submitData: function () {
                var that = this;
                return {
                    goods: that.originalData.goods,
                    photos: (function () {
                        var ret = [];
                        ret.push({
                            orderid: 1,
                            imgSrc: that.mainThumb[0]
                        });
                        $.each(that.minorThumbs, function (index, item) {
                            ret.push({
                                orderid: index + 2,
                                imgSrc: item
                            });
                        });
                        return ret;
                    })(),
                    professions: (function () {
                        var ret = [];
                        $.each(that.professions, function (index, item) {
                            $.each(item, function (index2, item2) {
                                if (item2.selected) {
                                    ret.push({
                                        professionId: item2.id,
                                    });
                                }
                            });
                        });
                        return ret;
                    })(),
                    structures: (function () {
                        var ret = [];
                        $.each(that.structures, function (index, item) {
                            ret.push({
                                firstId: (function () {
                                    var ret = "";
                                    $.each(item[0], function (index2, item2) {
                                        if (item2.selected) {
                                            ret = item2.id;
                                        }
                                    });
                                    return ret;
                                })(),
                                secondId: (function () {
                                    var ret = "";
                                    $.each(item[1], function (index2, item2) {
                                        if (item2.selected) {
                                            ret = item2.id;
                                        }
                                    });
                                    return ret;
                                })(),
                                thirdId: (function () {
                                    var ret = "";
                                    $.each(item[2], function (index2, item2) {
                                        if (item2.selected) {
                                            ret = item2.id;
                                        }
                                    });
                                    return ret;
                                })()
                            });
                        });
                        return ret;
                    })(),
                    technologys: (function () {
                        var ret = [];
                        $.each(that.technology, function (index, item) {
                            $.each(item.attrs, function (index2, item2) {
                                if (item2.selected) {
                                    ret.push({
                                        technologyId: item.id,
                                        technologyAttrId: item2.id
                                    });
                                }
                            });
                        });
                        return ret;
                    })(),
                    ranges: that.originalData.ranges
                }
            }
        },
        methods: {
            $: $,
            onEditorBlur: function (quill) {},
            onEditorFocus: function (quill) {},
            onEditorReady: function (quill) {},
            copyArray: function (arr) {
                return JSON.parse(JSON.stringify(arr));
            },
            getData: function () {
                var that = this;
                if (this.id) {
                    ajax({
                        url: "/admin/goods/selectGoodsDetail",
                        data: {
                            id: Number(that.id)
                        },
                        success: function (res) {
                            if (res.code === 0) {
                                $.each(res.data.photos, function (index, item) {
                                    if (item.orderid == 1) {
                                        that.mainThumb = [item.imgSrc];
                                    } else {
                                        that.minorThumbs.push(item.imgSrc);
                                    }
                                });
                                $.each(res.data.ranges, function (index, item) {
                                    item.price = Number(item.price);
                                });
                                that.originalData = res.data;
                                that.getProfessions();
                                that.getStructureAll();
                                that.getTechnology();
                                if (res.data.goods.status == 1) {
                                    that.setOn = true;
                                } else {
                                    that.setOff = true;
                                }
                            }
                        }
                    })
                } else {
                    that.getProfessions();
                    that.getStructureAll();
                    that.getTechnology();
                }
            },
            getProfessions: function () {
                var that = this;
                ajax({
                    url: "/admin/goodsprofession/selectNormal",
                    success: function (res) {
                        if (res.code === 0) {
                            $.each(res.data, function (index, item) {
                                item.selected = false;
                            });
                            that.originalProfession = res.data;
                            $.each(that.originalData.professions, function (index, item) {
                                var pitem = JSON.parse(JSON.stringify(res.data));
                                $.each(pitem, function (index2, item2) {
                                    item2.selected = (item2.id == item.professionId);
                                });
                                that.professions.push(pitem);
                            });
                        }
                    }
                });
            },
            getStructureAll: function () {
                var that = this;
                ajax({
                    url: "/admin/goodsstructure/selectAll",
                    success: function (res) {
                        if (res.code === 0) {
                            that.structureAll = res.data;
                            $.each(that.originalData.structures, function (index, item) {
                                var row = [];
                                row.push(JSON.parse(JSON.stringify(that.structureAll)));
                                row.push(that.getNextStructures(item.firstId));
                                row.push(that.getNextStructures(item.secondId));
                                $.each(row[0], function (index2, item2) {
                                    item2.selected = item.firstId == item2.id;
                                });
                                $.each(row[1], function (index2, item2) {
                                    item2.selected = item.secondId == item2.id;
                                });
                                $.each(row[2], function (index2, item2) {
                                    item2.selected = item.thirdId == item2.id;
                                });
                                that.structures.push(row);
                            });
                        }
                    }
                });
            },
            getStructureById: function (id) {
                var ret = null;
                $.each(this.structureAll, function (index, item) {
                    if (item.id == id) {
                        ret = item;
                        return;
                    }
                    $.each(item.nextStructure, function (index2, item2) {
                        if (item2.id == id) {
                            ret = item2;
                            return
                        }
                        $.each(item2.nextStructure, function (index3, item3) {
                            if (item3.id == id) {
                                ret = item3;
                                return
                            }
                        });
                    });
                });
                return ret;
            },
            getNextStructures: function (id) {
                var ret = [];
                var cloned = JSON.parse(JSON.stringify(this.structureAll));
                if (id === 0) {
                    return cloned
                } else {
                    $.each(cloned, function (index, item) {
                        if (item.id == id) {
                            ret = item.nextStructure || [];
                        }
                        $.each(item.nextStructure || [], function (index2, item2) {
                            if (item2.id == id) {
                                ret = item2.nextStructure || [];
                            }
                            $.each(item2.nextStructure || [], function (index3, item3) {
                                if (item3.id == id) {
                                    ret = item3.nextStructure || [];
                                }
                            });
                        });
                    });
                    return ret;
                }
            },
            getTechnology: function () {
                var that = this;
                ajax({
                    url: "/admin/technology/selectTechAndAttr",
                    success: function (res) {
                        if (res.code === 0) {
                            res.data.forEach(function (item, index) {
                                item.attrs.forEach(function (item2, index2) {
                                    item2.selected = false;
                                    that.originalData.technologys.forEach(function (
                                        item3, index3) {
                                        if (item3.technologyAttrId == item2
                                            .id) {
                                            item2.selected = true;
                                        }
                                    });
                                });
                            });
                            that.technology = res.data;
                        }
                    }
                });
            },
            selectProfession: function (v) {
                this.$root.setSelected(this.professions[v[0]], v[1], "id");
            },
            selectStructure: function (v) {
                if (Number(v[0].split(",")[1]) == 0) {
                    this.$set(this.structures[v[0].split(",")[0]], 1, this.getNextStructures(
                        v[1]));
                    this.$set(this.structures[v[0].split(",")[0]], 2, []);
                } else if (Number(v[0].split(",")[1]) == 1) {
                    this.$set(this.structures[v[0].split(",")[0]], 2, this.getNextStructures(
                        v[1]));
                }
                this.$root.setSelected(this.structures[v[0].split(",")[0]][v[0].split(",")[1]], v[1], "id");
            },
            delProfession: function (index) {
                this.professions.splice(index, 1);
            },
            selectImg: function (imgs) {
                if (this.imgPos == "main") {
                    this.mainThumb = imgs;
                } else if (this.imgPos == "minor") {
                    this.minorThumbs = this.minorThumbs.concat(imgs);
                } else if (this.imgPos == "template") {
                    this.originalData.goods.filePath = imgs[0];
                } else if (this.imgPos == "editor") {
                    this.editor.insertEmbed(this.editor.getSelection(true).index, 'image', imgs[0]);
                }
            },
            setStatusOn: function () {
                var that = this;
                ajax({
                    url: "/admin/goods/updateGoodsStatus?gid=" + that.id,
                    type: "put",
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/works");
                        }
                    }
                });
            },
            setStatusOff: function () {
                var that = this;
                ajax({
                    url: "/admin/goods/delGoods?gid=" + that.id,
                    type: "delete",
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/works");
                        }
                    }
                });
            },
            save: function () {
                if (this.originalData.goods.type == "2" && (this.submitData.ranges.length == 0 || (this.submitData
                        .ranges.length > 0 && this.submitData.ranges[0].price == ""))) {
                    this.$root.alerts.push({
                        text: "请输入印刷价格"
                    });
                    return;
                }
                if (this.mainThumb.length == 0) {
                    this.$root.alerts.push({
                        text: "请选择作品大图"
                    });
                    return;
                }
                if (this.submitData.goods.name == "") {
                    this.$root.alerts.push({
                        text: "请输入作品名称"
                    });
                    return;
                }
                if (this.submitData.professions.length == 0) {
                    this.$root.alerts.push({
                        text: "请选择行业分类"
                    });
                    return;
                }
                if (this.submitData.structures.length == 0 || this.submitData.structures.length > 0 && this.submitData
                    .structures[0].firstId == "") {
                    this.$root.alerts.push({
                        text: "请选择结构分类"
                    });
                    return;
                }
                if (this.originalData.goods.type == "1" && this.submitData.goods.filePath == undefined) {
                    this.$root.alerts.push({
                        text: "请选择对应刀模图"
                    });
                    return;
                }
                if (this.submitData.goods.descript == "") {
                    this.$root.alerts.push({
                        text: "请输入作品描述"
                    });
                    return;
                }
                if (this.id) {
                    this.edit();
                } else {
                    this.add();
                }
            },
            edit: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/goods/updateGoods",
                    type: "put",
                    data: that.submitData,
                    success: function (res) {
                        if (res.code === 0) {
                            if (that.setOn && that.originalData.goods.status === 0) {
                                that.setStatusOn();
                            } else if (that.setOff && that.originalData.goods.status === 1) {
                                that.setStatusOff();
                            } else {
                                that.$router.push("/works");
                            }
                        }
                    }
                });
            },
            add: function () {
                var that = this;
                ajax.call(this, {
                    url: "/admin/goods/addGoods",
                    type: "post",
                    data: that.submitData,
                    success: function (res) {
                        if (res.code === 0) {
                            that.$router.push("/works");
                        }
                    }
                });
            }
        },
        mounted: function () {
            this.getData();
        }
    })
</script>