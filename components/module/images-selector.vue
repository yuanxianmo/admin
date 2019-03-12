<template>
    <div class="images-selector popup">
        <div class="s-content fixed-box">
            <div class="s-head">
                <div class="s-bts">
                    <button :class="{'theme-bt':mode=='upload'}" @click="mode='upload'">上传{{fileMode?"文件":"图片"}}</button>
                    <button :class="{'theme-bt':mode=='history'}" @click="mode='history'" v-if="!fileMode">浏览以往图片</button>
                </div>
                <button class="s-close" @click="$emit('close')"></button>
            </div>
            <div :class="['s-body','upload']" v-show="mode=='upload'">
                <form name=theform id="name-type">
                    <input type="radio" name="myradio" value="local_name"> 上传文件名字保持本地文件名字
                    <input type="radio" name="myradio" value="random_name" checked=true> 上传文件名字是随机文件名, 后缀保留
                </form>
                <div class="s-images-pick" id="ossfile">
                    <div :class="['image-picked',{selected:i.selected}]" @click="i.uploadedUrl&&select(i)" v-for="(i,index) in files" :style="{backgroundImage:'url('+i.url+')'}" :key="'oss'+index">
                        <div class="progress" :style="{left:i.progress+'%'}"></div>
                    </div>
                    <div v-if="!fileMode" :class="['image-picked',{selected:i.selected,error:i.error}]" @click="i.uploadedUrl&&select(i)" v-for="(i,index) in selectedImages" :style="{backgroundImage:'url('+i.blob+')'}" :key="'image'+index">
                        <div class="progress" :style="{left:i.progress+'%'}"></div>
                    </div>
                    <div v-if="fileMode" :class="['image-picked',{selected:i.selected,error:i.error}]" @click="i.uploadedUrl&&select(i)" v-for="(i,index) in selectedImages" :style="{backgroundImage:'url('+i.blob+')'}" :key="'file'+index">
                        <div class="file-type">{{i.file.name.split(".").pop()}}</div>
                        <div class="progress" :style="{left:i.progress+'%'}"></div>
                    </div>
                </div>
                <div id="console">{{console}}</div>
                <div :class="['s-wrap',{da:da}]" id="container" @dragover.prevent="da=true" @dragenter.prevent="da=true" @dragleave.prevent="da=false" @dragend.prevent="da=false" @drop.prevent="da=false;dropFiles($event)">
                    <div class="choose">
                        <button class="theme-bt add" id="selectfiles" v-if="oss">点击选择{{fileMode?"文件":"图片"}}</button>
                        <label class="theme-bt add" v-else="oss">点击上传{{fileMode?"文件":"图片"}}
                            <input type="file" :accept="fileMode?'*':'image/*'" @change="selectImage($event)">
                        </label>
                        <button v-if="oss" class="theme-bt add" id="postfiles" :disabled="(oss&&(!config||$root.objLength(files)==uploaded))">开始上传</button>
                        <!-- <button v-else class="theme-bt add" :disabled="selectedImages.length==uploadedLength" @click="startUpload">开始上传</button> -->
                    </div>
                    <p v-if="draggable">或拖动{{fileMode?"文件":"图片"}}到此处</p>
                </div>
                <p class="count">共{{$root.objLength(files)+selectedImages.length}}张({{totalSize}})，已上传{{uploaded+uploadedLength}}张</p>
            </div>
            <div class="s-body history" v-show="mode=='history'">
                <!-- <ul class="date">
                    <li class="current">不限</li>
                    <li>2016</li>
                    <li>2017</li>
                    <li>2018</li>
                </ul>
                <ul class="date">
                    <li class="current">不限</li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                    <li>11</li>
                    <li>12</li>
                </ul> -->
                <ul class="s-wrap s-images-pick">
                    <li :class="['img',{selected:i.selected}]" v-for="i in historyImages" :style="{backgroundImage:'url('+i.url+')'}" @click="select(i)"></li>
                </ul>
            </div>
            <div class="actions">
                <button class="black images-confirm" :disabled="images.length==0" @click="$emit('confirm',images);$emit('close');">{{images.length==0?("请选择"+(fileMode?"文件":"图片")):"确定使用"}}</button>
                <button class="black-simple" @click="$emit('close')">取消</button>
            </div>
        </div>
    </div>
</template>
<style>
    .images-selector .s-content {
        padding-bottom: 20px;
    }

    .images-confirm:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }

    .images-selector .actions {
        padding-top: 20px;
    }

    .s-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        border-bottom: 1px solid #d2d2d2;
    }

    .s-close {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 1px solid #aaa;
        background-color: transparent;
        background-image: url(images/x.png);
        transition: all .2s;
        background-repeat: no-repeat;
        background-position: center;
    }

    .s-close:hover {
        background-color: rgba(0, 0, 0, .1);
    }

    .s-bts button {
        border: none;
        padding: 5px 12px;
    }

    .s-bts button:not(.theme-bt) {
        background-color: transparent;
        color: #8f8f8f;
    }

    .s-bts button:not(.theme-bt):hover {
        color: #c4a66a;
    }

    .s-body {
        padding: 20px 20px 0 20px;
        animation: fadein .3s;
    }

    .s-body.upload .s-wrap {
        height: 320px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #f4f4f4;
        margin-bottom: 10px;
        width: 820px;
    }

    .s-body.upload .s-wrap.da {
        background-color: #ddd;
    }

    .s-body.upload input {
        display: none;
    }

    .s-body.upload .choose {
        margin-bottom: 10px;
    }

    .s-body.upload .choose div {
        padding: 7px 10px;
        cursor: pointer;
    }

    .s-body.upload .s-wrap p {
        margin: 0;
        color: #8f8f8f;
    }

    .s-body.upload .count {
        color: #8F8F8F;
        margin: 0;
    }

    .s-body.upload .s-images-pick {
        padding-top: 0;
    }

    .s-body.history {
        max-height: 300px;
        overflow-y: auto;

    }

    .s-body.history .s-wrap {
        background-color: #f4f4f4;
        width: 820px;
    }

    .s-body.history .s-wrap:empty:after {
        content: "没有以往图片";
        flex: 1;
        text-align: center;
        display: block;
        padding-bottom: 20px;
        color: #999;
    }

    .s-body.history .s-wrap li {
        width: 80px;
        height: 80px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin-bottom: 20px;
        cursor: pointer;
        transition: all .2s;
        background-origin: border-box;
        position: relative;
        background-color: white;
    }

    .s-body.history .s-wrap li:not(:nth-child(8n)) {
        margin-right: 20px;
    }

    .s-body.history .s-wrap li.selected:before {
        width: 100%;
        height: 100%;
        content: "";
        display: block;
        position: absolute;
        left: -5px;
        top: -5px;
        border: 5px solid #c4a66a;
        border-radius: 5px;
        animation: fadein .3s;
    }

    .s-body.history .s-wrap li:hover {
        opacity: .8;
    }

    .s-body.history .date {
        display: flex;
        margin-bottom: 20px;
    }

    .s-body.history .date li {
        width: 60px;
        height: 32px;
        color: #575757;
        border-top: 1px solid #c4a66a;
        border-bottom: 1px solid #c4a66a;
        border-right: 1px solid #c4a66a;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
        transition: all .1s;
    }

    .s-body.history .date li:first-child {
        border-left: 1px solid #c4a66a;
    }

    .s-body.history .date li.current,
    .s-body.history .date li:hover {
        color: white;
        background-color: #c4a66a;
    }

    .s-images-pick {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 0 20px;
    }

    .s-images-pick .image-picked {
        width: 80px;
        height: 80px;
        position: relative;
        margin-bottom: 20px;
        cursor: pointer;
        border: 0px solid #c4a66a;
        transition: all .1s;
        overflow: hidden;
        white-space: nowrap;
        overflow: hidden;
        background-size: cover;
        background-position: center;
    }

    .s-images-pick .image-picked.error:after {
        content: "";
        width: 26px;
        height: 26px;
        display: block;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADpElEQVRYR8VXS4gcVRQ9p7qrJiZxZYJxMlXERaarQTfBD45K4sKViBtBs4kYMkGMiwiTkbgxbvyNQV0oxhiCECRZCeJSMGISv7ug05NBDFXtRDOShToYq6rrSFX1ND2fnn41E/CtCuqec89799377iX+50VT/wI45VVHBO6hsEPkZkJbJLRAzlKaBfA9qY+Hg+Q8AZlw9xUQDuGmOcseBfg8gG0mpAAuA3p7wIqP3X4Z11fCrChgyrUPCHgJ5GZDxwvNpFkCR2ph/F4v/LICpoGBluecAvD4qhwvBklnKmH81Hbg38W/lgjInbv2OZB33RDnbRJJ31bDeOdiEUsENFz7NMgnbqTzDpd0xg/jJ7u5FwiYcu1nRb5r4lxQBOEbAusA3A2y74XOeCkd6L4THdAv27DuestukrzFUMAz9SA+ltlOD9o7WhV8B7LSFyv9sUGx5zbxTy5oHtAYqo7Dsl7vS9A2INIHa0FyroN37avG2ZKmL/jN5I2OgKzINDz7CsFbTQVYSB8eDpLPuwSkpmEQ9LsfxLdlxSo/gcmt1ftYsS6YOs/t1HrMD1ufZp8zg1j/Z9WZK4NXKx2p/5p8nQtouM4EiLEyBBR218LodIaZGsJWWU6zDB7Cm34YHWoLsL8Auascgfb6YXwyw/zkOndYxMWS+LN+GD9UhMB1LpHYXoaA0nO1MM5TdsqrPiBYX5XBS5iuh9FwW4A9R3J9GQKk6bjfTCbyDXiVR4lKfh9Ml6S5ehhvnBfwF8mNpuB2+hypBdHLxQnYewR+VAYv6e96GN+86hBIOloP4/ziNjz7IMC3yglYGIKzJHeWIYDw8wZF97hNXJv0nM8IPFIGL+nLehjvKrLAc7KqdKgMQVELlJXTH1f5ck74QTRehGCwOsKqdb60gDUAlKT312eSC7mAohQ7MwS2GHNKF0U8nV9I4STIO02xAn7zg2iwU4qLWlAdI608rUwWU+2vNePjeRYM2aOy+IEJrohcOlYPk6PtbCpgefNJOwC5yYRIwifVMNqddTilSnmv57i9k32ymO/KZEm6BuASgXtNX0KmGq014w/n+Zdpyco/TCZii6wpHqBu+2XbqIZnHwe4z5jYxFA64YfxEs6efdyk67xC4rAJdz8bCa/Ww+jF5exWbCQbrr0XwGvGrdZiD9m4Jhz2m/GJXiL7drLt0Ww/wIMlR7N3Bqz4/TWNZt2qew2nEFKRV9vD6Q+gTvlBYlxV+55Av/iu9f9/sct5MCnZ1MsAAAAASUVORK5CYII=");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 110%;
        right: 2px;
        bottom: 2px;
        position: absolute;
        background-color: white;
        border-radius: 50%;
    }

    .s-images-pick .image-picked.error {
        cursor: not-allowed;
    }

    .s-images-pick .image-picked.selected {
        border: 4px solid #c4a66a;
        border-radius: 5px;
    }

    .s-images-pick .file-type {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: #555;
        font-size: 16px;
        text-transform: uppercase;
    }

    .s-images-pick .image-picked .progress {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .5);
        transition: all .3s;
    }

    .s-images-pick .image-picked b {
        display: none;
    }

    .s-images-pick .image-picked:not(.error):hover {
        opacity: .8;
    }

    .s-images-pick .image-picked:not(:nth-child(8n)) {
        margin-right: 20px;
    }

    .s-body.history+.actions button {
        margin-top: 0;
    }

    #name-type {
        display: none;
    }

    .btn {
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
        display: inline-block;
        padding: 6px 12px;
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        text-decoration: none;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-image: none;
        border: 1px solid transparent;
        border-radius: 4px;
    }

    a.btn:hover {
        background-color: #3366b7;
    }

    #console {
        padding: 0 10px 10px;
        color: #999;
    }
</style>
<script>
    ({
        props: {
            historyUrl: {
                default: ""
            },
            uploadUrl: {
                default: "/api/oss/uploadGoodsImage"
            },
            single: {
                default: false
            },
            oss: {
                default: false
            },
            fileMode: {
                default: false
            }
        },
        data: function () {
            return {
                mode: "upload",
                draggable: (('draggable' in document.body) || ('ondragstart' in document.body && 'ondrop' in
                    document.body)) && 'FormData' in window && 'FileReader' in window,
                files: {},
                config: null,
                console: "",
                historyImages: localStorage.historyImages ? JSON.parse(localStorage.historyImages) : [],
                localHistory: localStorage.historyImages ? JSON.parse(localStorage.historyImages) : [],
                historyLoaded: false,
                da: false,
                selectedImages: []
            }
        },
        methods: {
            dropFiles: function (e) {
                $("#container input[type='file']").prop("files", e.dataTransfer.files);
            },
            getUploadConfig: function (fn) {
                var that = this;
                ajax({
                    url: "/api/oss/getOssConfig",
                    success: function (res) {
                        if (res.code === 0) {
                            that.config = res.data;
                            fn && fn();
                        }
                    }
                });
            },
            upload: function () {
                var accessid = '',
                    accesskey = '',
                    host = '',
                    policyBase64 = '',
                    signature = '',
                    callbackbody = '',
                    filename = '',
                    key = '',
                    expire = 0,
                    g_object_name = '',
                    g_object_name_type = '',
                    now = timestamp = Date.parse(new Date()) / 1000,
                    that = this;

                function check_object_radio() {
                    var tt = document.getElementsByName('myradio');
                    for (var i = 0; i < tt.length; i++) {
                        if (tt[i].checked) {
                            g_object_name_type = tt[i].value;
                            break;
                        }
                    }
                }

                function get_signature() {
                    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
                    now = timestamp = Date.parse(new Date()) / 1000;
                    if (expire < now + 3) {
                        obj = that.config;
                        host = obj.host
                        policyBase64 = obj.policy
                        accessid = obj.accessid
                        signature = obj.signature
                        expire = parseInt(obj.expire)
                        //callbackbody = obj['callback'] 
                        key = obj.dir
                        return true;
                    }
                    return false;
                };

                function random_string(len) {
                    len = len || 32;
                    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
                    var maxPos = chars.length;
                    var pwd = '';
                    for (i = 0; i < len; i++) {
                        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                    }
                    return pwd;
                }

                function get_suffix(filename) {
                    pos = filename.lastIndexOf('.')
                    suffix = ''
                    if (pos != -1) {
                        suffix = filename.substring(pos)
                    }
                    return suffix;
                }

                function calculate_object_name(filename) {
                    if (g_object_name_type == 'local_name') {
                        g_object_name += "${filename}"
                    } else if (g_object_name_type == 'random_name') {
                        suffix = get_suffix(filename)
                        g_object_name = key + random_string(10) + suffix
                    }
                    return ''
                }

                function get_uploaded_object_name(filename) {
                    if (g_object_name_type == 'local_name') {
                        tmp_name = g_object_name
                        tmp_name = tmp_name.replace("${filename}", filename);
                        return tmp_name
                    } else if (g_object_name_type == 'random_name') {
                        return g_object_name
                    }
                }

                function set_upload_param(up, filename, ret) {
                    that.getUploadConfig(function () {
                        if (ret == false) {
                            ret = get_signature()
                        }
                        g_object_name = key;
                        if (filename != '') {
                            suffix = get_suffix(filename)
                            calculate_object_name(filename)
                        }
                        new_multipart_params = {
                            'key': g_object_name,
                            'policy': policyBase64,
                            'OSSAccessKeyId': accessid,
                            'success_action_status': '200', //让服务端返回200,不然，默认会返回204
                            //'callback' : callbackbody,
                            'signature': signature,
                        };

                        up.setOption({
                            'url': host,
                            'multipart_params': new_multipart_params
                        });

                        up.start();

                    });
                }

                var uploader = new plupload.Uploader({
                    runtimes: 'html5',
                    browse_button: 'selectfiles',
                    //multi_selection: false,
                    container: document.getElementById('container'),
                    url: 'http://oss.aliyuncs.com',

                    filters: {
                        mime_types: [ //只允许上传图片和zip文件
                            {
                                title: "Image files",
                                extensions: "jpg,gif,png,bmp"
                            },
                            {
                                title: "Zip files",
                                extensions: "zip,rar"
                            }
                        ],
                        max_file_size: '10mb', //最大只能上传10mb的文件
                        prevent_duplicates: true //不允许选取重复文件
                    },

                    init: {
                        PostInit: function () {
                            document.getElementById('postfiles').onclick = function () {
                                set_upload_param(uploader, '', false);
                                return false;
                            };
                        },

                        FilesAdded: function (up, files) {
                            plupload.each(files, function (file, index) {
                                that.$set(that.files, file.id, {
                                    file: file.getNative(),
                                    url: URL.createObjectURL(file.getNative()),
                                    progress: 0,
                                    uploadedUrl: "",
                                    response: "",
                                    error: false,
                                    info: "",
                                    selected: false
                                });
                            });
                        },

                        BeforeUpload: function (up, file) {
                            check_object_radio();
                            set_upload_param(up, file.name, true);
                        },

                        UploadProgress: function (up, file) {
                            that.files[file.id].progress = file.percent;
                        },

                        FileUploaded: function (up, file, info) {
                            if (info.status == 200) {
                                that.files[file.id].uploaded = true;
                                that.files[file.id].uploadedUrl = that.config.host + "/" +
                                    get_uploaded_object_name(file.name);
                                that.files[file.id].response = info.response;
                            } else if (info.status == 203) {
                                that.files[file.id].error = get_uploaded_object_name(info.response);
                            } else {
                                that.files[file.id].response = info.response;
                            }
                        },

                        Error: function (up, err) {
                            if (err.code == -600) {
                                that.console = "选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小";
                            } else if (err.code == -601) {
                                that.console = "选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型";
                            } else if (err.code == -602) {
                                that.console = "这个文件已经上传过一遍了";
                            } else {
                                that.console = "Error xml:" + err.response;
                            }
                        }
                    }
                });
                uploader.init();
            },
            getHistory: function () {
                var that = this;
                ajax({
                    url: that.historyUrl,
                    success: function (res) {
                        if (res.code === 0) {
                            that.historyImages = [];
                            $.each(res.data, function (index, item) {
                                that.historyImages.push({
                                    url: item,
                                    selected: false
                                });
                            });
                            that.historyLoaded = true;
                        }
                    }
                });
            },
            startUpload: function () {
                var that = this;
                $.each(this.selectedImages, function (index, item) {
                    if (item.uploaded || item.uploading) return;
                    item.uploading = true;
                    var fd = new FormData();
                    fd.append("file", item.file);
                    ajax({
                        url: that.uploadUrl,
                        type: "post",
                        data: fd,
                        processData: false,
                        contentType: false,
                        xhr: function () {
                            var xhr = new XMLHttpRequest();
                            xhr.upload.addEventListener("progress", function (e) {
                                item.progress = (e.loaded / e.total) * 100;
                            });
                            return xhr;
                        },
                        success: function (res) {
                            if (res.code === 0) {
                                item.uploaded = true;
                                item.uploadedUrl = res.data;
                                that.select(item);
                                if (that.fileMode == false) {
                                    that.historyImages.push({
                                        url: res.data,
                                        selected: false
                                    });
                                    that.localHistory.push({
                                        url: res.data,
                                        selected: false
                                    });
                                    localStorage.historyImages = JSON.stringify(that.localHistory);
                                }
                            } else {
                                that.$set(item, "error", true);
                            }
                        },
                        error: function () {
                            that.$set(item, "error", true);
                        }
                    });
                });
            },
            selectImage: function (e) {
                if (e.target.files.length) {
                    this.selectedImages.push({
                        file: e.target.files[0],
                        blob: URL.createObjectURL(e.target.files[0]),
                        progress: 0,
                        uploadedUrl: null,
                        uploading: false,
                        uploaded: false,
                        selected: false
                    });
                    this.startUpload();
                }
            },
            select: function (obj) {
                if (this.single) {
                    $.each(this.files, function (index, item) {
                        if (item != obj) {
                            item.selected = false;
                        }
                    });
                    $.each(this.selectedImages, function (index, item) {
                        if (item != obj) {
                            item.selected = false;
                        }
                    });
                    $.each(this.historyImages, function (index, item) {
                        if (item != obj) {
                            item.selected = false;
                        }
                    });
                }
                obj.selected = !obj.selected;
            }
        },
        deactivated: function () {
            this.files = {};
            this.selectedImages = [];
            this.$parent.fileMode = false;
        },
        activated: function () {
            $.each(this.files, function (inde, item) {
                item.selected = false;
            })
            $.each(this.historyImages, function (index, item) {
                item.selected = false;
            });
        },
        mounted: function () {
            if (this.oss) {
                this.getUploadConfig();
                this.upload();
            }
        },
        computed: {
            uploaded: function () {
                var ret = 0;
                $.each(this.files, function (index, item) {
                    if (item.uploadedUrl) {
                        ret++;
                    }
                });
                return ret;
            },
            uploadedLength: function () {
                var ret = 0;
                $.each(this.selectedImages, function (index, item) {
                    if (item.uploaded) {
                        ret++;
                    }
                });
                return ret;
            },
            totalSize: function () {
                var size = 0;
                $.each(this.files, function (index, item) {
                    size += item.file.size;
                });
                $.each(this.selectedImages, function (index, item) {
                    size += item.file.size;
                });
                if (size < 1024 * 1024) {
                    return (size / 1024).toFixed(1) + "KB";
                } else {
                    return (size / (1024 * 1024)).toFixed(1) + "MB"
                }
            },
            images: function () {
                var ret = [];
                $.each(this.files, function (inde, item) {
                    if (item.uploadedUrl && item.selected) {
                        ret.push(item.uploadedUrl);
                    }
                })
                $.each(this.historyImages, function (index, item) {
                    if (item.selected) {
                        ret.push(item.url);
                    }
                });
                $.each(this.selectedImages, function (index, item) {
                    if (item.selected) {
                        ret.push(item.uploadedUrl);
                    }
                });
                return ret;
            }
        },
        watch: {
            mode: function () {
                if (this.mode == "history" && !this.historyLoaded && this.historyUrl) {
                    this.getHistory();
                }
            }
        }
    })
</script>