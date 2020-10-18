// alert('laoded');
init();
date = new Date();
D1 = date.getDate();
var interval3=setInterval(function(){
     refresh();
     date = new Date();
     D2 = date.getDate();
     if (D1!=D2){
         location.reload();
     }
},1000);
function refresh(){
    timelist = document.getElementsByClassName("timelist");
    date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
    first_time_text = timelist[0].textContent;
    time_end_str = first_time_text.slice(6,11);
    time_now_str = supply_0(String(hour),2) + ':' + supply_0(String(minute),2);
    if(time_end_str<=time_now_str){
        timelist[0].parentElement.remove();
        timelist[0].classList.add("this_time");
        p = document.createElement('p');
        // p.appendChild(document.createTextNode(''));
        p.id = 'this_stage';
        timelist[0].appendChild(p);
    }
    refresh_this_stage(date);
    refresh_date(date);
    refresh_time(date);
    refresh_remain_time(date);
    refresh_remain(date, 'sleep');
    refresh_remain(date, 'eat');
    refresh_remain(date, 'rest');
    refresh_remain(date, 'motion');
    refresh_remain(date, 'work');
}
function init(){
    timelist = document.getElementsByClassName("timelist");
    date = new Date();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    time_by_minute = hour*60 + minute;
    time_number = Math.floor(time_by_minute/15);
    for (var i=0;1;i++){
        if (i==time_number){
            timelist[0].classList.add("this_time");
            p = document.createElement('p');
            // p.appendChild(document.createTextNode(''));
            p.id = 'this_stage';
            timelist[0].appendChild(p);
            break;
        }else{
            // timelist[i].classList.add("passed_time");
            timelist[0].parentElement.remove();
        }
    }
    refresh_date(date);
    refresh_time(date);
    refresh_remain_time(date);
    refresh_remain(date, 'sleep');
    refresh_remain(date, 'eat');
    refresh_remain(date, 'rest');
    refresh_remain(date, 'motion');
    refresh_remain(date, 'work');
}

function refresh_date(date){
    year = date.getFullYear();
    month = date.getMonth()+1;
    dat = date.getDate();
    day = date.getDay();
    document.getElementById("static_date").textContent = 
        String(year) + '年' + String(month) + '月' + String(dat) + '日 星期' 
        + num2chinese(day);
}

function refresh_time(date){
    hour = String(date.getHours());
    minute = String(date.getMinutes());
    second = String(date.getSeconds());
    hour = supply_0(hour,2);
    minute = supply_0(minute,2);
    second = supply_0(second,2);
    document.getElementById("static_time").textContent = 
        hour + ':' + minute + ':' + second;
}

function refresh_remain_time(date){
    
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    remain_hour = String(24-hour-1);
    remain_minute = String(60-minute-1);
    remain_second = String(60-second);
    remain_hour = supply_0(remain_hour,2);
    remain_minute = supply_0(remain_minute,2);
    remain_second = supply_0(remain_second,2);
    document.getElementById("static_remain_time").textContent = 
        remain_hour + ':' + remain_minute + ':' + remain_second;
}

function refresh_remain(date, event_str){
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    time_list = document.getElementsByClassName("T" + event_str + " timelist");
    if(time_list.length==0){
        remain_hour = supply_0('0',2);
        remain_minute = supply_0('0',2);
        remain_second = supply_0('0',2);
    }else{
        first_time_text = time_list[0].textContent;
        time_start_str = first_time_text.slice(0,5);
        time_end_str = first_time_text.slice(6,11);
        time_now_str = supply_0(String(hour),2) + ':' + supply_0(String(minute),2);
        if (time_start_str<=time_now_str && time_now_str<time_end_str){
            remain_minute = 15*time_list.length - minute%15 - 1;
            remain_hour = String(Math.floor(remain_minute/60));
            remain_minute = String(remain_minute%60);
            remain_second = String(60 - second);
        }else{
            remain_minute = 15*time_list.length;
            remain_hour = String(Math.floor(remain_minute/60));
            remain_minute = String(remain_minute%60);
            remain_second = String(0);
        }
        remain_hour = supply_0(remain_hour,2);
        remain_minute = supply_0(remain_minute,2);
        remain_second = supply_0(remain_second,2);
    }
    document.getElementById("static_remain_" + event_str).textContent = 
        remain_hour + ':' + remain_minute + ':' + remain_second;
}

function refresh_this_stage(date){
    minute = date.getMinutes();
    second = date.getSeconds();
    remain_minute = 15 - minute%15 - 1;
    remain_second = 60 - second;
    if (remain_second == 60){
        remain_minute += 1;
        remain_second = 0;
    }
    remain_minute = String(remain_minute);
    remain_second = String(remain_second);
    remain_minute = supply_0(remain_minute,2);
    remain_second = supply_0(remain_second,2);
    E = document.getElementById("this_stage");
    E.textContent = 
        remain_minute + ':' + remain_second;
}

function num2chinese(num){
    switch(num)
    {
        case 1:
            return '一';
        case 2:
            return '二';
        case 3:
            return '三';
        case 4:
            return '四';
        case 5:
            return '五';
        case 6:
            return '六';
        case 0:
            return '日';
    }
}

function supply_0(str, num){
    for (var i=num;str.length<i;){
        str = '0' + str;
    }
    return str;
}