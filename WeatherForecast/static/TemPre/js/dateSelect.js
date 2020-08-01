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

    var m = new Date().getMonth();
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
        var lastMonth = new Date().getMonth()
        if(monthSel > lastMonth && yearSel >= nowYear){
            $("#" + sel_month).val(lastMonth);
            drawHistoryPic(yearSel, lastMonth);
            alert('请选择上个月份（包含）之前的时间！')
        }else{
            drawHistoryPic(yearSel,monthSel);
        }
    });
}