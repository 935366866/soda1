 $(function(){

    var i=0;
    $.ajax({
        url: 'json/tableInfo.json',
        type:'get',
        async: false,
        dataType: "json",
        success:function(data) {
            for(var i=0;i<10;i++){
                var info=
                    '<tr>' +
                    '<td>'+data[i].name+'</td>' +
                    '<td>'+data[i].a1+'</td>' +
                    '<td>'+data[i].a2+'</td>' +
                    '<td>'+data[i].a3+'</td>' +
                    '<td>'+data[i].a4+'</td>' +
                    '<td>'+data[i].a5+'</td>' +
                    '<td>'+data[i].a6+'</td>' +
                    '</tr>'
                $('tbody').append(info);
                data1=data;
            }
        }

    });
    var a=[{"name":"123"},{"name":"nihao"}];
    console.log(a[0].name);
    $('#sou').click(function(){
          var text=$('#found').val();
           $('tbody').html('');
            $('tbody').append();
    })


    //滚动底部添加新的数据
    $('#mytable').on('scroll',function(){
        var scrollTop = $('#mytable').scrollTop();
        var scrollHeight = $('#mytable').get(0).clientHeight;
        var scrh=$('#mytable').get(0).scrollHeight;
        if(scrh==scrollTop+scrollHeight){
            i+=20;
            var  j=i+10;
            for( i;i<j;i++){
                var info=
                    '<tr>' +
                    '<td>'+data1[i].name+'</td>' +
                    '<td>'+data1[i].a1+'</td>' +
                    '<td>'+data1[i].a2+'</td>' +
                    '<td>'+data1[i].a3+'</td>' +
                    '<td>'+data1[i].a4+'</td>' +
                    '<td>'+data1[i].a5+'</td>' +
                    '<td>'+data1[i].a6+'</td>' +
                    '</tr>'
                $('tbody').append(info);
                $('tr:odd').addClass("odd");
            }
        }
    })
    $('tr:odd').addClass("odd");





})