﻿/// <reference path="//Common.js" />

$(document).foundation();

(function ($) {
    var pageindex = 1;
    var pagesize = 10;
    var activitytype = 3;//西游机
    var pagecount = 0;
    var pagenumber = 0;//页数

    var $datalist = $("#datalist");//奖品列表
    var $loadmore = $("#loadmore");//加载更多按钮
    var $no_consume = $("#no_consume");//未消费
    var $has_consume = $("#has_consume");//已消费
    var $expired = $("#expired");//已过期
    var status1 = false,status2 = false,status3 = false;
    var datalist = [];
    var no_consume = [];
    var has_consume = [];
    var expired = [];
    var nomore = false;
    var Location = {};

    var LocationCookie = $.getCookie("MadisonStoreBaiduLocation");
    if (!$.isNull(LocationCookie)) {
        Location = (new Function('return' + LocationCookie))();
        Success(Location);
    }
    else {
        if ($.is_weixn2()) {
            $.getWechatconfig("getLocation", Success, Failure);
        }
        else {
            $.getLocationFailure();
        }
    }

    function Success(data) {
        Location = data;
        Prizelist(pageindex, pagesize);
         
    }
    function Failure() {
        $.getLocationFailure();
    }

    
    //奖品列表
    function Prizelist(pageindex, pagesize) {
        var data = { "pageindex": pageindex, "pagesize": pagesize, "longitude": Location.lng, "latitude": Location.lat };
         $.AkmiiAjaxPost("/StoreServices.svc/couponactivity/getmywinninginfolist", data, true).then(function (d) {
         if (d) {
        $loadmore.attr("disabled", false);
        pagenumber = Math.ceil(d.pagecount / pagesize);
        //if (pagenumber == pageindex) {
        //    nomore = true;
        //    $loadmore.html("没有更多数据");
        //    $loadmore.attr("disabled", true);
        //}
         var list = d.mywinninginfos;
        var activitysketch = "";
        //if (list.length <= 0) {
        //    nomore = true;
        //    $loadmore.html("暂无数据");
        //    $loadmore.attr("disabled", true);
        //}
        //if ($no_consume.text() == '') { $no_consume.append("<p class='ondata az-text-center'>暂无数据</p>") }
        //if ($has_consume.text() == '') { $has_consume.append("<p class='ondata az-text-center'>暂无数据</p>") }
        //if ($expired.text() == '') { $expired.append("<p class='ondata az-text-center'>暂无数据</p>") }
        $.each(list, function (index, element) {
            //订单状态 0:删除 1:已过期 2：未处理[未消费]；3：待发货；4：待收货；5： 已收货；6：已评价；\n0:删除 1:已过期 2：未消费 5： 已消费；
            var now = new Date();
            var status;
            if (element.status == 5) {
                status = "已消费";
            }
            else if (element.status == 1 || Date.parse(new Date(element.overduetime.replace(/-/g, "/"))) < Date.parse(now)) {
                status = "已过期";
            }
            else if (element.status == 2 || element.status == 3) {
                status = "未消费";
            }
            // if (no_consume.indexOf(element.orderid) < 0 && has_consume.indexOf(element.orderid) < 0 && expired.indexOf(element.orderid) < 0) {
            //     if (element.status == 5) {
            //         has_consume.push(element.orderid);
            //     } else if (element.status == 1 || Date.parse(new Date(element.overduetime.replace(/-/g, "/"))) < Date.parse(now)) {
            //         expired.push(element.orderid);
            //     }
            //     else if (element.status == 2 || element.status == 3) {
            //         no_consume.push(element.orderid);
            //     }
              //  console.log($.jsonDateFormat(element.wintime.substring(0, 10).replace(/-/g, ".")));
                //datalist.push(element.orderid);
                var couponactivityname = $.Cutstring(element.couponactivityname, 10);
                var couponabstract = $.Cutstring(element.couponabstract, 14);
                var ha = [];
                var startTime = $.jsonDateFormat(element.wintime.substring(0, 10).replace(/-/g, "."));
                var endTime = $.jsonDateFormat(element.overduetime.substring(0, 10).replace(/-/g, "."));
                //function listItem(type, element) {
                   
                //    var ha = [];
                //    ha.push('<a href="/Html/My/welfaredetails2.html?couponactivityid=' + element.couponactivityid + '&orderid=' + element.orderid + '&wintime=' + ($.jsonDateFormat(element.wintime)) + '&status=' + element.status + '&couponcode=' + element.couponcode + '&overduetime=' + ($.jsonDateFormat(element.overduetime)) + '&longitude=' + Location.lng + '&latitude=' + Location.lat + '&deliveryname=' + element.deliveryname + '&deliveryphone=' + element.deliveryphone + '&deliveryaddress=' + element.deliveryaddress + '">');
                //    ha.push('<div class="shop-list az-clearfix bb"><div class="row az-paddingBottom">');
                //    ha.push(' <div class="small-3 columns az-center"><img src=' + element.couponimagesmall + ' alt=""></div>');
                //    ha.push(' <div class="small-9 columns az-padding0"><p class="tit"><span class="wxicon ' + $.GetIconByCategory(element.category) + '"></span>' + couponactivityname + '</p><p class="tip">' + couponabstract + '</p>');
                //    ha.push(' <p class="tips2">使用期限：' + startTime + '-' + endTime + '</p><p class="tips4"><span class="border-r {0}">'.replace("{0}", (type == 5 || type == 1 ? 'col-f-bord' : '')) + status + '</span></p></div>');
                //    ha.push('</div></div></a>');
                //    var item = $(ha.join(""));
                //    if (type == 2 || type == 3) {
                //        $no_consume.append(item);
                //    }
                        
                //    if (type == 5)
                //        $has_consume.append(item);
                //    else if(type==1 || Date.parse(new Date(element.overduetime.replace(/-/g, "/"))) < Date.parse(now))
                //    $expired.append(item);
                //}
               // listItem(element.status,element);
                ha.push('<a href="/Html/My/welfaredetails2.html?couponactivityid=' + element.couponactivityid + '&orderid=' + element.orderid + '&wintime=' + ($.jsonDateFormat(element.wintime)) + '&status=' + element.status + '&couponcode=' + element.couponcode + '&overduetime=' + ($.jsonDateFormat(element.overduetime)) + '&longitude=' + Location.lng + '&latitude=' + Location.lat + '&deliveryname=' + element.deliveryname + '&deliveryphone=' + element.deliveryphone + '&deliveryaddress=' + element.deliveryaddress + '">');
                ha.push('<div class="shop-list az-clearfix bb"><div class="row az-paddingBottom">');
                ha.push(' <div class="small-4 columns az-padding0 az-center"><img src=' + element.couponimagesmall + ' alt=""></div>');
                ha.push(' <div class="small-8 columns az-padding0"><p class="tit"><span class="wxicon ' + $.GetIconByCategory(element.category) + '"></span>' + couponactivityname + '</p><p class="tip">' + couponabstract + '</p>');
                if (status == "已过期" || status == "已消费") {
                    ha.push(' <p class="tips2">使用期限：' + startTime + "-" + endTime + '</p><p class="tips4"><span class="border-r col-f-bord">' + status + '</span></p></div>');
                }
                else {
                    ha.push(' <p class="tips2">使用期限：' + startTime + "-" + endTime + '</p><p class="tips4"><span class="border-r">' + status + '</span></p></div>');
                }

                ha.push('</div></div></a>');
                
                var item = $(ha.join('')); console.log(item);
                if (status == "未消费") {
                    $("#datalist >div").eq(0).append(item);
                    status1 = true;
                }
                if (status == "已消费") {
                    $("#datalist >div").eq(1).append(item);
                    status2 = true;

                }
                if (status == "已过期") {
                    $("#datalist >div").eq(2).append(item);
                    status3 = true ;
                }
        });
         } if (status1) { $("#datalist >div").eq(0).append('<p class="ondata az-text-center">没有更多数据</p>') } else { $("#datalist >div").eq(0).append('<p class="ondata az-text-center">暂无数据</p>') }
             if (status2) { $("#datalist >div").eq(1).append('<p class="ondata az-text-center">没有更多数据</p>') } else { $("#datalist >div").eq(1).append('<p class="ondata az-text-center">暂无数据</p>') }
             if (status3) { $("#datalist >div").eq(2).append('<p class="ondata az-text-center">没有更多数据</p>') } else { $("#datalist >div").eq(2).append('<p class="ondata az-text-center">暂无数据</p>') }
         }, function () { $.preloaderFadeOut(); });
    }
    list = []
    $(window).scroll(function () {
        if (!nomore) {
            if ($(document).height() - $(window).height() - $(document).scrollTop() < 10) {
                pageindex = pageindex + 1;
                pageindex = pageindex > pagenumber ? pagenumber : pageindex;
                Prizelist(pageindex, pagesize);
            }
        }
    });

})(jQuery);
 $(document).ready(function(){
       
    })