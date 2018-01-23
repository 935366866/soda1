var paramUrl = 'public/draw/json/jobUrl.json'; //module+'/Data/remoteDirView';  //选择路径的模态框，向后台请求的地址

$(function () {
    var color1 = ["#b09b84", "#da9034", "#4ab1c9", "#0f9a82", "#3a5183", "#eb977b", "#828db0", "#b3d4ab", "#cf151b", "#7c5f47"];
    var color2 = ["#37458b", "#de1615", "#0b8543", "#5b2379", "#057e7c", "#b11e23", "#308cc6", "#991c54", "#808080", "#191717"];
    var color3 = ["#4357a5", "#c43c32", "#719657", "#eae185", "#44657f", "#ea8f10", "#5ca8d1", "#7c2163", "#72be68", "#cf91a2"];
    var myChart = echarts.init(document.getElementById('main'));
    var title_value='normal';
    var title_size=18;
    var titleX='center';
    var legendLayout='vertical';
    var title_weight='normal';
    //获取字体
    document.getElementById("title_font").onchange=function(){
        var index=this.selectedIndex;
        title_value=this.options[index].value;
        if(title_value=='bold'){
            title_value='normal';
            title_weight='bold';
        }
        return title_value;
    }
    //获取字体大小
    document.getElementById("title_size").onchange=function(){
        var index=this.selectedIndex;
        title_size=this.options[index].value;
        return title_size;
    }
    //获取标题水平参数
    document.getElementById("titleX").onchange=function(){
        var index=this.selectedIndex;
        titleX=this.options[index].value;
        return titleX;
    }
    //获取标题垂直参数
    document.getElementById("titleY").onchange=function(){
        var index=this.selectedIndex;
        titleY=this.options[index].value;
        return titleY;
    }
    //获取颜色方案
    var colorArry=['#88CEFA','#FFFF02','#FF4602'];

    $("#startColor").spectrum({
        color: "#FF4602",
        change:function(color){
            colorArry[2]=color.toHexString();
        }
    });
    $("#betweenColor").spectrum({
        color: "#FFFF02",
        change:function(color){
            colorArry[1]=color.toHexString();
        }
    });
    $("#endColor").spectrum({
        color: "#88CEFA",
        change:function(color){
            colorArry[0]=color.toHexString();
        }
    });
    document.getElementById("colorProject").onchange=function(){
        var index=this.selectedIndex;
        var colorProject=this.options[index].value;
        if(colorProject=="NPG"){
            colorArry=['#88CEFA','#FFFF02','#FF4602'];
            $("#startColor").spectrum({
                color: "#FF4602",
                change:function(color){
                    colorArry[0]=color.toHexString();
                }
            });
            $("#betweenColor").spectrum({
                color: "#FFFF02",
                change:function(color){
                    colorArry[1]=color.toHexString();
                }
            });
            $("#endColor").spectrum({
                color: "#88CEFA",
                change:function(color){
                    colorArry[2]=color.toHexString();
                }

            });
        }if(colorProject=="AAAS"){
            colorArry=['#3a5183','#4ab1c9','#cf151b'];
            $("#startColor").spectrum({
                color: "#cf151b",
                change:function(color){
                    colorArry[2]=color.toHexString();
                }
            });
            $("#betweenColor").spectrum({
                color: "#4ab1c9",
                change:function(color){
                    colorArry[1]=color.toHexString();
                }
            });
            $("#endColor").spectrum({
                color: "#3a5183",
                change:function(color){
                    colorArry[0]=color.toHexString();
                }
            });
        }if(colorProject=="IGV"){
            colorArry=['#0b8543','#de1615','#37458b'];
            $("#startColor").spectrum({
                color: "#37458b",
                change:function(color){
                    colorArry[2]=color.toHexString();
                }
            });
            $("#betweenColor").spectrum({
                color: "#de1615",
                change:function(color){
                    colorArry[1]=color.toHexString();
                }
            });
            $("#endColor").spectrum({
                color: "#0b8543",
                change:function(color){
                    colorArry[0]=color.toHexString();
                }
            });
        }

        return colorProject;
    }
    //图列水平位置
    document.getElementById("legendX").onchange=function(){
        var index=this.selectedIndex;
        legendX=this.options[index].value;
        return legendX;
    }
    //图列垂直位置
    document.getElementById("legendY").onchange=function(){
        var index=this.selectedIndex;
        legendY=this.options[index].value;
        return legendY;
    }
    //图列布局
    document.getElementById("legendLayout").onchange=function(){
        var index=this.selectedIndex;
        legendLayout=this.options[index].value;
        return legendLayout;
    }
    //点击示例文件，加载已有参数
    $("#use_default").click(function () {
      document.getElementById("input1").value="hotMap.json";
      document.getElementById("title1").value="热度图";
        document.getElementById("max").value=10;
        document.getElementById("min").value=1;
        document.getElementById("legendDiameter").value=100;
    });

    //提交参数
    $("#submit_paras").click(function () {
        var input1=document.getElementById("input1").value;//输入文件的值
        var title=document.getElementById("title1").value;//标题的值
        var max=parseInt(document.getElementById("max").value);//最大值
        var min=parseInt(document.getElementById("min").value); //最小值
        var legendDiameter=document.getElementById("legendDiameter").value;//图列直径
        if(input1!=null&&input1!=""&&title!=null&&title!=""&&legendDiameter!=null&&legendDiameter!=""){
        // 指定图表的配置项和数据
        option = {
            title: {
                text: title,
                left:titleX ,
                top: titleY,
               textStyle:{
                   fontStyle:title_value,
                   fontSize:title_size,
                   fontWeight: title_weight ,
               }
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            visualMap: {
                max: max,
                min: min,
                text: ['High', 'Low'],
                left:legendX,
                top:legendY,
                orient:legendLayout,
                itemHeight:legendDiameter,
                realtime: false,
                calculable: true,
                inRange: {
                    color: colorArry
                }
            },
            series: [
                {

                    type: 'map',
                    mapType: 'world',
                    roam: true,
                    showLegendSymbol: false,
                    itemStyle: {
                        emphasis: {label: {show: true}}
                    },
                    data: [
                        {name: 'Afghanistan', value: 2},
                        {name: 'Bosnia and Herzegovina', value: 3},
                        {name: 'Belarus', value: 9},
                        {name: 'Belize', value: 3},
                        {name: 'Bermuda', value: 6},
                        {name: 'Bolivia', value: 7},
                        {name: 'Brazil', value: 1},
                        {name: 'Brunei', value: 2},
                        {name: 'Spain', value: 4},
                        {name: 'Estonia', value: 1},
                        {name: 'Ethiopia', value: 8},
                        {name: 'Finland', value: 5},
                        {name: 'Fiji', value: 8},
                        {name: 'Falkland Islands', value: 4},
                        {name: 'France', value: 6},
                        {name: 'Gabon', value: 1},
                        {name: 'United Kingdom', value: 6},
                        {name: 'Georgia', value: 4},
                        {name: 'Ghana', value: 2},
                        {name: 'Guinea', value: 10},
                        {name: 'Gambia', value: 1},
                        {name: 'Guinea Bissau', value: 10},
                        {name: 'Equatorial Guinea', value: 6},
                        {name: 'Greece', value: 1},
                        {name: 'Greenland', value: 5},
                        {name: 'Guatemala', value: 1},
                        {name: 'French Guiana', value: 2},
                        {name: 'Guyana', value: 7},
                        {name: 'Honduras', value: 7},
                        {name: 'Croatia', value: 4},
                        {name: 'Haiti', value: 9},
                        {name: 'Hungary', value: 10},
                        {name: 'Indonesia', value: 2},
                        {name: 'India', value: 1},
                        {name: 'Ireland', value: 4},
                        {name: 'Iran', value: 2},
                        {name: 'Iraq', value: 3},
                        {name: 'Iceland', value: 3},
                        {name: 'Israel', value: 7},
                        {name: 'Italy', value: 6},
                        {name: 'Jamaica', value: 2},
                        {name: 'Jordan', value: 6},
                        {name: 'Japan', value: 1},
                        {name: 'Kazakhstan', value: 1},
                        {name: 'Kenya', value: 4},
                        {name: 'Kyrgyzstan', value: 5},
                        {name: 'Cambodia', value: 1},
                        {name: 'South Korea', value: 5},
                        {name: 'Kosovo', value: 9},
                        {name: 'Kuwait', value: 2},
                        {name: 'Laos', value: 6},
                        {name: 'Lebanon', value: 4},
                        {name: 'Liberia', value: 3},
                        {name: 'Libya', value: 6},
                        {name: 'Sri Lanka', value: 2},
                        {name: 'Lesotho', value: 2},
                        {name: 'Lithuania', value: 3},
                        {name: 'Luxembourg', value: 5},
                        {name: 'Latvia', value: 2},
                        {name: 'Morocco', value: 3},
                        {name: 'Moldova', value: 10},
                        {name: 'Madagascar', value: 2},
                        {name: 'Mexico', value: 1},
                        {name: 'Macedonia', value: 5},
                        {name: 'Mali', value: 1},
                        {name: 'Myanmar', value: 5},
                        {name: 'Pakistan', value: 1},
                        {name: 'Panama', value: 3},
                        {name: 'Peru', value: 2},
                        {name: 'Philippines', value: 9},
                        {name: 'Papua New Guinea', value: 6},
                        {name: 'Poland', value: 3},
                        {name: 'Puerto Rico', value: 3},
                        {name: 'North Korea', value: 1},
                        {name: 'Portugal', value: 10},
                        {name: 'Paraguay', value: 6},
                        {name: 'Qatar', value: 1},
                        {name: 'Romania', value: 2},
                        {name: 'Russia', value: 2},
                        {name: 'Vanuatu', value: 2},
                        {name: 'West Bank', value: 1},
                        {name: 'Yemen', value: 2},
                        {name: 'South Africa', value: 5},
                        {name: 'Zambia', value: 1},
                        {name: 'Zimbabwe', value: 1}
                    ]
                }
            ]
        };
        myChart.setOption(option, true);
        }else{
            alert("信息不能为空");
        }
    });



    $.ajax({
        url: 'public/draw/json/hotMap.json',
        type:'get',
        dataType: "json",
        success:function(data) {
            var dataList = data.content ;
            var trHtml = '';
               for(var i= 1;i< dataList.length;i++){
                   trHtml +='<tr> <td>'+dataList[i][0]+'</td><td>'+dataList[i][1]+'</td></tr>' ;
               }
            $("#table_content").html(trHtml);
        }
    });








//	支持下载png格式
    $("#btnPng").click(function () {
        downloadPic(myChart);
    });
    function downloadPic(myChart) {
        var $a = document.createElement('a');
        var type = 'png';
        var title = myChart.getModel().get('title.0.text') || 'echarts';
        $a.download = title + '.' + type;
        $a.target = '_blank';
        var url = myChart.getConnectedDataURL({
            type: type,
            backgroundColor: myChart.getModel().get('backgroundColor') || '#fff',
            pixelRatio: 10,
            excludeComponents: ['toolbox']
        });
        $a.href = url;
        // Chrome and Firefox
        if (typeof MouseEvent === 'function' && !$.support.msie && !$.support.edge) {
            var evt = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: false
            });
            $a.dispatchEvent(evt);
        }
        // IE
        else {
            var html = ''
                + '<body style="margin:0;">'
                + '<img src="' + url + '" style="max-width:100%;" />'
                + '</body>';
            var tab = window.open();
            tab.document.write(html);
        }
    }

    //与后台交互时冻结窗口
    $(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

});


function buildTextStyle(font, fontSize) {
    var fontStyle, fontWeight;
    if (font == "bold") {
        fontWeight = 'bolder';
        fontStyle = 'normal';
    } else if (font == "italic") {
        fontWeight = 'normal';
        fontStyle = 'italic';
    } else {
        fontWeight = 'normal';
        fontStyle = 'normal';
    }
    return {
        fontStyle: fontStyle,
        fontWeight: fontWeight,
        fontSize: fontSize
    }
}


function allJsonParams() {

    var app = $("#parameter").serializeArray();
    var json1 = {};
    for (var i = 0; i < app.length; i++) {
        var name = app[i].name;
        var value = app[i].value;
        json1[name] = value;
    }
    var Params = JSON.stringify(json1);
    return Params
};


//-----------------------------------模态框-----------------------------------
//回车查目录是否存在
$(function () {
    //判断选择目录还是文件

    dblCilck('urlTable', 'inputUrl', paramUrl);  //双击行，判断是否是目录，若是，则进入目录。（三个参数：模态框中table的ID， input的ID， url为后台地址。）

    $('#inputUrl').bind('keypress', function (event) {
        if (event.keyCode == "13") {
            newUrl = $("#inputUrl").val();
            checkUrl(newUrl, paramUrl, "inputUrl", "urlTable"); //参数依次为需要检查的URL， 后台的地址， 需要更新的输入框id， 需要刷新的bootstrap table
        }
    });
//点击右边箭头，检查	
    $("#search").click(function () {
        newUrl = $("#inputUrl").val();
        checkUrl(newUrl, paramUrl, "inputUrl", "urlTable");
    });
//后退按钮
    $("#back").click(function () {
        Url = $("#inputUrl").val();

        lastLen = Url.split('/').pop().length
        newUrl = Url.substring(0, Url.length - lastLen - 1);
        checkUrl(newUrl, paramUrl, "inputUrl", "urlTable");
    });
//模态框绑定事件
    $('#selectUrl').on('show.bs.modal', function () {    //加载当前目录的表格
        var url = $("#inputUrl").val() ? $("#inputUrl").val() : '/';
        checkUrl(url, paramUrl, "inputUrl", "urlTable");
    });

});
//打开任务目录
function openUrl(id, type) {
    var inputValue = $(id).val();  //当前input的值

    $("#inputUrl").val(inputValue);
    $('#selectUrl').modal('show');

    $("#selected").attr("onClick", "geturl('" + id + "','" + type + "')")   //给选择按钮添加事件

};

//选择目录时添加文件或者目录的图标
function addIcon(State, row) {
    var typeChr = row.type.charAt(0);

    if (typeChr == 'd') {
        return '<span class="glyphicon glyphicon-folder-open"></span>';
    }
    else {
        return '<span class="glyphicon glyphicon-file"></span> ';
    }
};

//点击选择关闭模态框，将当前模态框input中的路径取出放入表单中,type 的类型 暂时有两种，dir和 file
function geturl(formInputId, type) {
    var selected_num = checkedNum("urlTable");
    if (type == "dir") {
        //只能选择文件夹，单选
        var newUrl = ""

        if (selected_num == 1) {
            //此时选中了一项，判断是否是目录
            var singleName = ""   //选择一个文件夹或者文件的名字，单选
            $.map($('#urlTable').bootstrapTable('getSelections'), function (row) {
                var d_f_type = "";
                d_f_type = row.type.charAt(0);
                if (d_f_type == "d") {
                    singleName = row.name;
                    newUrl = $("#inputUrl").val() + "/" + singleName;    //点击选择时取input中当前的路径，在加上此时选择的
                    newUrl = newUrl.replace('//', '/');
                    $("#selected").removeAttr("onClick");
                    $("#selectUrl").modal('hide');

                    $(formInputId).val(newUrl);
                } else {
                    alert("对不起，您选择的必须是目录文件！");

                }
                ;

            });


        } else if (selected_num == 0) {
            //没有选中任何项，将此时的url传到前面

            newUrl = $("#inputUrl").val();    //点击选择时取input中当前的路径，在加上此时选择的
            newUrl = newUrl.replace('//', '/');
            $("#selected").removeAttr("onClick");
            $("#selectUrl").modal('hide');
            $(formInputId).val(newUrl);

        }
        else {
            //选择了多项，直接报错
            alert("对不起，只能选择一个目录文件！");
        }
        ;

    }
    else if (type == "file") {
        //只能选择文件，多选
        var newUrl = ""
        var files = [];
        var have_dir = 0
        $.map($('#urlTable').bootstrapTable('getSelections'), function (row) {
            var d_f_type = "";
            d_f_type = row.type.charAt(0);
            if (d_f_type == "d") {
                have_dir = 1;
            } else {
                files.push(row.name);
            }

        });
        if (have_dir == 1) {
            alert("对不起，不能选择文件夹，只能选择文件！");
        } else {
            if (files.length == 0) {
                alert("请选择文件！")
            } else {
                //获得当前的目录，取消绑定，关闭模态框，在外面填写

                var filename_now = '/' + $('#urlTable').bootstrapTable('getSelections')[0].name;
                newUrl = $("#inputUrl").val() + filename_now;
                newUrl = newUrl.replace('//', '/');


                $("#selected").removeAttr("onClick");
                $("#selectUrl").modal('hide');
                $(formInputId).val(newUrl);


            }
            ;
        }
        ;

    }
    else {
        return false;
    }

};

