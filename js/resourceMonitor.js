$(function () {
    var cpuChart = echarts.init(document.getElementById("cpu"));
    var MemoryChart = echarts.init(document.getElementById("Memory"));
    var storageChart = echarts.init(document.getElementById("storage"));
    var infoChart = echarts.init(document.getElementById("info"));
    var cpudata = new Array();
    var mdata = new Array();
    var sdata = new Array();
    var infodata = new Array();
    var infodata1 = new Array();
    var infodata2 = new Array();
    var maxY;
    for (var i = 0; i < 60; i++) {
        cpudata.push('');
        mdata.push('');
        sdata.push('');
        infodata.push('');
        infodata1.push('');
        infodata2.push('');
    }
    var cput1, cpuu, memt, memu, diskt, disku, run, qw, err;
    var xData = new Array();
    for (var i = 0; i <= 60; i++) {
        xData.push(i);
    }
    xData.reverse();

    setInterval(function () {
        $.ajax({
            url: 'json/example_data.json',
            type: 'get',
            dataType: "json",
            async: false,
            success: function (data) {
                cput1 = data.cput;
                cpuu = data.cpuu;
                memt = data.memt;
                memu = data.memu;
                diskt = data.diskt;
                disku = data.disku;
                run = data.run;
                qw = data.qw;
                err = data.err;
            }
        });
    }, 1000);


    option = {
        animation: false,
        title: {
            text: 'CPU',
            left: 'center',
            subtext: '单位:核心',
            textStyle: {
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '20%'
        },
        xAxis: {
            name: 'Min',
            nameLocation: 'end',
            type: 'category',
            boundaryGap: false,
            data: xData
        },
        yAxis: {
            type: 'value',
            max: maxY,
        },
        series: [
            {
                type: 'line',
                smooth: true,
                //symbol: 'none',
                stack: 'a',
                areaStyle: {
                    normal: {}
                },
                data: cpudata
            }
        ]
    };

    option1 = {
        animation: false,
        title: {
            text: '内存',
            left: 'center',
            subtext: '单位:GB',
            textStyle: {
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '20%'
        },
        xAxis: {
            name: 'Min',
            nameLocation: 'end',
            type: 'category',
            boundaryGap: false,
            data: xData
        },
        yAxis: {
            type: 'value',
            max: memt
        },
        series: [
            {
                type: 'line',
                smooth: true,
                //symbol: 'none',
                stack: 'a',
                areaStyle: {
                    normal: {}
                },
                data: mdata
            }
        ]
    };

    option2 = {
        animation: false,
        title: {
            text: '存储',
            left: 'center',
            subtext: '单位:GB',
            textStyle: {
                fontWeight: 'normal'
            }
        },
        grid: {
            left: '20%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            name: 'Min',
            nameLocation: 'end',
            type: 'category',
            boundaryGap: false,
            data: xData
        },
        yAxis: {
            type: 'value',
            max: diskt
        },
        series: [
            {
                type: 'line',
                smooth: true,
                //symbol: 'none',
                stack: 'a',
                areaStyle: {
                    normal: {}
                },
                data: sdata
            }
        ]
    };


    option3 = {
        animation: false,
        title: {
            text: '作业情况',
            left: 'center',
            textStyle: {
                fontWeight: 'normal'
            }
        },
        legend: {
            top: '10%',
            data: ['正在运行作业', '排队作业', '出错作业']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            textStyle: {
                align: 'left'
            }
        },
        grid: {
            left: '20%'
        },
        xAxis: {
            name: 'Min',
            nameLocation: 'end',
            type: 'category',
            boundaryGap: false,
            data: xData
        },
        yAxis: {
            type:'value'
        },
        series: [
            {
                name: '正在运行作业',
                type: 'line',
                //smooth: true,
                //symbol: 'none',


                areaStyle: {
                    normal: {}
                },
                data: infodata
            },
            {
                name: '排队作业',
                type: 'line',
                //smooth: true,
                //symbol: 'none',

                areaStyle: {
                    normal: {}
                },
                data: infodata1
            },
            {
                name: '出错作业',
                type: 'line',
                //smooth: true,
                //symbol: 'none',

                areaStyle: {
                    normal: {}
                },
                data: infodata2
            }
        ]
    };

    cpuChart.setOption(option);
    MemoryChart.setOption(option1);
    storageChart.setOption(option2);
    infoChart.setOption(option3);
    function sortNumber(a,b)
    {
        return a - b
    }
    setInterval(function () {
        var rcpuu = parseInt(Math.random()*40);
        cpudata.push(rcpuu);
        var  maxdata=cpudata.sort(sortNumber);
          maxY=maxdata[maxdata.length-1]+2
        if (cpudata.length >= 60) {
            cpudata.shift();
        }
        cpuChart.setOption({
            series: [{
                data: cpudata
            }]
        });
       // console.log(cpudata)
    }, 1000);

    setInterval(function () {
        mdata.push(memu);
        if (mdata.length >= 60) {
            mdata.shift();
        }
        MemoryChart.setOption({
            series: [{
                data: mdata
            }]
        });
    }, 1000);

    setInterval(function () {
        sdata.push(disku);
        if (sdata.length >= 60) {
            sdata.shift();
        }
        storageChart.setOption({
            series: [{
                data: sdata
            }]
        });
    }, 1000);

    setInterval(function () {
        infodata.push(run);
        infodata1.push(qw);
        infodata2.push(err);
        if (infodata.length >= 60) {
            infodata.shift();
        }
        if (infodata1.length >= 60) {
            infodata1.shift();
        }
        if (infodata2.length >= 60) {
            infodata2.shift();
        }
        infoChart.setOption({
            series: [
                {
                    data: infodata
                },
                {
                    data: infodata1
                },
                {
                    data: infodata2
                }
            ]

        });
    }, 1000);

})
