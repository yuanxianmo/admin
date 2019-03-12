accessid = ''
accesskey = ''
host = ''
policyBase64 = ''
signature = ''
callbackbody = ''
filename = ''
key = ''
expire = 0
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000;
vueObj = app.coms["images-selector"];

function send_request() {
    var xmlhttp = null;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (xmlhttp != null) {
        serverUrl = 'http://192.168.1.35:8082/api/oss/getOssConfig'
        xmlhttp.open("GET", serverUrl, false);
        xmlhttp.send(null);
        return xmlhttp.responseText
    } else {
        alert("Your browser does not support XMLHTTP.");
    }
};

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
        body = send_request()
        console.log(body)
        var obj = eval("(" + body + ")");
        obj = obj.data;
        console.log(obj)
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
}

var uploader = new plupload.Uploader({
    runtimes: 'html5',
    browse_button: 'selectfiles',
    //multi_selection: false,
    container: document.getElementById('container'),
    flash_swf_url: 'lib/plupload-2.1.2/js/Moxie.swf',
    silverlight_xap_url: 'lib/plupload-2.1.2/js/Moxie.xap',
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
            document.getElementById('ossfile').innerHTML = '';
            document.getElementById('postfiles').onclick = function () {
                set_upload_param(uploader, '', false);
                return false;
            };
        },

        FilesAdded: function (up, files) {
            plupload.each(files, function (file, index) {
                vueObj.$set(vueObj.files, file.id, {
                    file: file.getNative(),
                    url: URL.createObjectURL(file.getNative()),
                    progress: 0,
                    uploadedUrl: "",
                    response: "",
                    error: false,
                    info: "",
                    selected:false
                });
            });
        },

        BeforeUpload: function (up, file) {
            check_object_radio();
            set_upload_param(up, file.name, true);
        },

        UploadProgress: function (up, file) {
            vueObj.files[file.id].progress = file.percent;
        },

        FileUploaded: function (up, file, info) {
            if (info.status == 200) {
                vueObj.files[file.id].uploaded = true;
                vueObj.files[file.id].uploadedUrl = get_uploaded_object_name(file.name);
                vueObj.files[file.id].response = info.response;
            } else if (info.status == 203) {
                vueObj.files[file.id].error = get_uploaded_object_name(info.response);
            } else {
                vueObj.files[file.id].response = info.response;
            }
        },

        Error: function (up, err) {
            if (err.code == -600) {
                document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"));
            } else if (err.code == -601) {
                document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"));
            } else if (err.code == -602) {
                document.getElementById('console').innerHTML = "";
                document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"));
            } else {
                document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
            }
        }
    }
});

uploader.init();