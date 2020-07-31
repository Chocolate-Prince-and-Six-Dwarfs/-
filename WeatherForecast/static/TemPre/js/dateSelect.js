function initSelect(sel_year, sel_month){
    var y = new Date().getFullYear();
    var year_list = "";
    for(var i=2012; i<=y; i++){
        if(i == y){
            year_list += "<option value=" + i + " selected = \"selected\">" + i + "</option>";
        }else{
            year_list += "<option value=" + i + ">" + i + "</option>";
        }
    }
    $("#"+sel_year).append(year_list);

    var m = new Date().getMonth() + 1;
    console.log(m)
    var month_list = "";
    for(var i=1; i<=12; i++){
        if(i == m){
            month_list += "<option value=" + i + " selected = \"selected\">" + i + "</option>";
        }else{
            month_list += "<option value=" + i + ">" + i + "</option>";
        }
    }
    $("#"+sel_month).append(month_list);
}

function onchangeSelect(sel_year,sel_month){
    $("#" + sel_year + ", #" + sel_month).change(function(){
        var yearSel = $("#" + sel_year).val();
        var monthSel = $("#" + sel_month).val();
        var nowYear = new Date().getFullYear();
        var nowMonth = new Date().getMonth() + 1
        if(monthSel > nowMonth && yearSel >= nowYear){
            $("#" + sel_month).val(nowMonth);
            drawHistoryPic(yearSel,nowMonth);
            alert('请选择当前月份之前的时间！')
        }else{
            drawHistoryPic(yearSel,monthSel);
        }
    });
}