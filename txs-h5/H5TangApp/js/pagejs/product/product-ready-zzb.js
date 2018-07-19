﻿var coupon_needmoney = 0;
var saletype;
var stypetemp = false;
var couponid = 0;
var interestcouponid = 0;
var couponcount = 0;
var ticketcount = 0;
var paytemp = 0;
var amount = 0;
var couponAmount = 0;
var basictemp = false;
var zzbtemp = false;
var banktemp = false;
var coupontemp = 0;
var depositbtntext = "";
var withdrawbtntext = "";
var sengcaibaotext = "";
$(function() {
    $("#product-buy-amount").val("");
    $("#current-coupon-value").val("")
    getUserInfo();
    $(window).load(function() {
        if ($.isNumeric($("#product-buy-amount").val())) {
            $product_buy.removeClass("pay_btn_op");
        };
    });
    $("#product-buy-amount").keyup(function() {
        if (account && (!account.passinvestor || !account.riskwarning || account.questionnaire <= 0)) {
            return;
        }
        //合格投资人/同意风险提示
        input_amount = $(this).val();
        if (input_amount == "" || isNaN(input_amount) || Number(input_amount) > 9999999) {
            $product_buy.removeClass("pay_btn_op").addClass("pay_btn_op");
            $("#product-buy").text("立即预约");
            return;
        };
        //if (coupon_needmoney > 0) {
        //    if (Number(input_amount) >= Number(coupon_needmoney)) {
        //        $("#current-coupon-text").html(current_coupon_amount + "元");
        //    }
        //    else {
        //        $("#current-coupon-text").html(current_coupon_amount + "元" + "(还需投资" + (coupon_needmoney - input_amount) + "元可用)");
        //    }
        //}
        var ck = document.getElementById("ck-buy-agreement").checked;
        if (ck) {
            realPayMent();
        }
    });

    $("#coupon-no-select").click(function() {
        $(".use-choose").addClass("display-none");
        $(".coupon_item").removeClass("color-org2");
        $("#current-coupon-text").html("未使用优惠券").attr("data-minamount", "0");
        $('.mask').hide();
        $(".wrap.pop").hide();

        if ($("#product-buy-amount").val() == "" || isNaN($("#product-buy-amount").val())) {
            return;
        };
        amount = $("#product-buy-amount").val();
        couponAmount = Number($("#current-coupon-value").val());
        if (couponAmount > amount) {
            return;
        }
        if ((amount - couponAmount) > 0) {
            $("#product-buy").text("实际冻结" + $.fmoney(amount - couponAmount) + "元");
        } else {
            $("#product-buy").text("立即预约");
        }
    });
});

var current_coupon_amount = 0;
var input_amount = "";
var $product_buy = $("#product-buy");
var $product_buy_amount = $("#product-buy-amount");
var account = [];

var product = [];
//产品信息
var getCurrentProduct = function() {
    var data = {
        productid: $.getQueryStringByName("id")
    };
    var url = "/StoreServices.svc/product/item";
    $.AkmiiAjaxPost(url, data, true).then(function(data) {
        if (data.result) {
            product = data.productinfo;
            loadCouponList(0);
            $("#product-title").text(product.title);
            $("#saletime").text($.jsonDateFormat(product.saletime));
            $("#product-remainingamount").text($.fmoney(product.remainingamount));
            if (product.remainingamount <= 50000) {
                $("#product-remaining-div").show();
                $("#product-remaining-buyall").click(function() {
                    $("#product-buy-amount").val(product.remainingamount);
                    //$product_buy.removeClass("pay_btn_op");
                    realPayMent();
                });
            }
            $("#product-rate").text($.fmoney(product.rate));
            $("#product-rateactivite").text(formatActityRate(product.rateactivite));
            $("#product-duration").text(product.duration + "天");
            $("#product-buy-amount").attr("placeholder", product.amountmin + "元起预约");
            $("#paytypeamount").html($.fmoney(account.demandbalance));
            $("#product-profitstartday").text(product.displayprofittime);
            product_risklevel = product.risklevel;
            product_riskleveldesc = product.riskleveldesc.split('|')[0];

            if (user_risklevel > 0 && product_risklevel > user_risklevel) {
                $("#user-highrisk").show();
                $("#user-risk-desc").html(user_riskleveldesc);
                $("#product-risk-desc").html(product_riskleveldesc);
            }
            //定期新手标不能使用理财红包
            if (product.type == 99) {
                $(".hongbao").hide();
                $("#current-coupon-text").text("不符合使用条件");
                $(".hongbao").unbind("click");
            }
        } else if (data.errorcode == "missing_parameter_accountid") {
            $.Loginlink();
        } else {
            $.alertF("参数不正确", null, back);
        }
    });
};
var buyDemandToFixedSuccessKey = "buyDemandToFixedSuccessKey";
var currentDate = "";
//用户信息
var getUserInfo = function() {
    var url = "/StoreServices.svc/user/info?v=" + (new Date()).getTime();
    $.AkmiiAjaxPost(url, {}, true).then(function(data) {
        if (data.result) {
            account = data.accountinfo;
            currentDate = data.date;
            if (account.customstatus < 2) {
                $.alertF("您的资料还未完善，现在去完善吧", null, function () {
                    $.CheckAccountCustomStatusRedirect(encodeURIComponent(window.location.href), account);
                });
                return;
            }
            if (account && account.customstatus < 3) {
                $.alertF("您尚未绑卡，请绑定银行卡后进行投资。", null, function () {
                    window.location.href = "/html/my/regist-step3.html?returnurl=" + encodeURIComponent(window.location.href);
                });
                return;
            }
            if (data.ismaintenance) {
                $(".maintenanct").attr("href", "/html/system/data-processing.html")
            }
            if (data.isglobalmaintenance) {
                $(".global-maintenanct").attr("href", "/html/system/system-maintenance.html");
            }
            if (account.iswithholdauthoity == 1) {
                $(".setsinapaypassword").hide();
            } else if (account.iswithholdauthoity == 3) {
                $(".withholdauthority").hide();
            }
            $("#user-balance").text($.fmoney(account.demandbalance));
            //是否同意协议
            if (data.accountinfo.issignmoneyboxandhtffund) {
                depositbtntext = "转入";
                withdrawbtntext = "转出";
                sengcaibaotext = "僧财宝";
                $("#basic").html("僧财宝");
            } else {
                depositbtntext = "充值";
                withdrawbtntext = "提现";
                sengcaibaotext = "账户余额";
            }
            //合格投资人/同意风险提示
            if (!account.passinvestor || !account.riskwarning || account.questionnaire <= 0) {
                $(".xieyi").hide();
                $("#user-investmentcertification").show();
                var _rturl = window.location.pathname + window.location.search;
                $product_buy.text("立即评测").removeClass("pay_btn_op").attr("href", "/Html/My/risk-assesslist.html?rturl=" + encodeURI(_rturl));
            }

            if (account.questionnaire <= 0) {
                $("#user-norisklevel").show().click(function() {
                    window.location.href = "/html/my/risk-assess.html"; //风险等级测试页面
                });
            }
            user_risklevel = account.questionnaire;
            user_riskleveldesc = account.riskleveldesc;
            accountBalance = account.demandbalance;
            if (account.invitedby == _CHANNELCODE) {
                //MediaV-load
                _loadMVScript();
            }
            //投资成功
            buyDemandToFixedSuccessKey = buyDemandToFixedSuccessKey + account.referralcode;
            //跳转投资成功
            var tid = $.getQueryStringByName("tid");
            if (!$.isNull(tid)) {
                window.location.replace(window.localStorage.getItem(buyDemandToFixedSuccessKey));
            }
        } else if (data.errorcode == 'missing_parameter_accountid') {
            $.Loginlink();
        } else {
            $.alertF(data.errormsg);
        }
        getCurrentProduct();
    });
}

//代金券列表
var loadCouponList = function(pageindex) {
    var url = "/StoreServices.svc/user/couponlist";
    var param = {
        "pageindex": pageindex,
        "status": 1
    };
    $.AkmiiAjaxPost(url, param, true).then(function(d) {
        if (d.result) {
            $.each(d.usercouponlist, function(index, couponItem) {
                if (couponItem.suiproduct != null) {
                    var stype = couponItem.suiproduct.split(',');
                    $.each(stype, function(index, entry) {
                        if (product.saletype == entry) {
                            coupontemp += 1;
                            couponHtml(couponItem);
                            couponcount++;
                        }
                    });
                } else {
                    couponHtml(couponItem);
                    couponcount++;
                }
            });
        }
        loadTicketsList(1);
    });
};


var couponHtml = function(couponItem) {
    var html = [];
    html.push("<div class=\"row bb\"   data-minamount=\"" + couponItem.minamount + "\" data-option=\"" + couponItem.couponid + "\" data-amount=\"" + couponItem.amount + "\" data-suiproduct=\"" + couponItem.suiproduct + "\">");
    html.push("<div class=\"bt_tips col-97 small-9 fl\">");
    html.push("<span>" + couponItem.amount + "元（定期理财" + couponItem.minamount + "元起）</span><br /><span>有效期至：" + couponItem.enddate + "</span><br />");
    html.push("</div>");
    html.push("<div class=\"small-3 fl\"> ");
    html.push("<img src=\"https://txsres.txslicai.com/css/img2.0/use-choose.png\" class=\"use-choose az-right display-none\" alt=\"\"> </div> </div>");
    html.push("</div>");
    var result = $(html.join(''))
    $("#couponlist").append(result);
    result.click(function() {
        current_coupon_amount = Number($(this).attr("data-amount"));
        coupon_needmoney = Number($(this).attr("data-minamount")); //最少使用金额
        couponid = $(this).attr("data-option");
        interestcouponid = 0;
        $(".use-choose").addClass("display-none");
        $(this).find(".use-choose").removeClass("display-none");
        if (couponItem.suiproduct != null) {
            var sui = $(this).data("suiproduct") + "";
            saletype = sui.split(','); //产品适用类型
        }

        $("#current-coupon-text").html(current_coupon_amount + "元" + "(满" + coupon_needmoney + "元可用)");
        $("#current-coupon-value").val($(this).attr("data-amount"));
        $("#current-coupon-id").val($(this).attr("data-option")); //代金券id

        $(".bonus_ticket").hide();
        $(".mask").hide();

        realPayMent();

    });
    return result;
}

var realPayMent = function() {
    if (account.passinvestor && account.riskwarning) {
        var ck = document.getElementById("ck-buy-agreement").checked;
        if (ck) {
            var amount = Number($("#product-buy-amount").val());
            if (Number(amount) <= current_coupon_amount) {
                $product_buy.removeClass("pay_btn_op").addClass("pay_btn_op");
            } else {
                $product_buy.removeClass("pay_btn_op");
            }

            $("#product-profit").text($.fmoney(amount * product.rate / 100 / 365 * product.duration, 4));
            var couponAmount = Number($("#current-coupon-value").val());
            if (couponid != 0) {
                if ((amount - couponAmount) > 0) {
                    $("#product-buy").text("实际冻结" + $.fmoney(amount - couponAmount) + "元");
                } else {
                    $("#product-buy").text("立即预约");
                }
            } else if (interestcouponid != 0) {
                if (amount > 0) {
                    $("#product-buy").text("实际冻结" + $.fmoney(amount) + "元");
                }
            } else {
                $("#product-buy").text("实际冻结" + $.fmoney(amount) + "元");
            }
        }
    }
}

//勾选同意协议
$("#buy-agreement,#ck-buy-agreement").click(function() {
    var ck = document.getElementById("ck-buy-agreement").checked;
    if (ck) {
        $(".checkbox").removeClass("checkbox1");
        document.getElementById("ck-buy-agreement").checked = false;
        $product_buy.addClass("pay_btn_op");
        $("#product-buy").text("立即预约");
    } else {
        $(".checkbox").addClass("checkbox1");
        document.getElementById("ck-buy-agreement").checked = true;
        if ($product_buy_amount.val().length > 0) {
            realPayMent();
        }
    }
});



//检查新浪设置。
var checkiswithholdauthoity = function() {
    //直连模式
    if (account.iswithholdauthoity >= 2) {
        productBuy();
    } else if (account.iswithholdauthoity == 0) //未设置新浪支付密码
    {
        var returnurl = window.location.origin + "/eback.html?r=" + window.location.origin + "/Html/my/index.html";
        $.SetSinaPayPassword(returnurl, currentDate, account.referralcode, account.iscashdesknewuser);
    } else if (account.iswithholdauthoity == 1) //未设置委托代扣
    {
        var returnurl = window.location.origin + "/eback.html?r=" + window.location.href;
        $.ZzbWithholdAuthority(returnurl, null, account.referralcode, true);
    } else {
        //收银台模式
        password = "";
        productBuy();
    }
}

var productBuy = function() {
    if ($("#product-buy").hasClass("pay_btn_op")) {
        return;
    }
    if ($product_buy_amount.val() == "" || isNaN($product_buy_amount.val()) || Number($product_buy_amount.val()) > 9999999) {
        $product_buy.removeClass("pay_btn_op").addClass("pay_btn_op");
        return;
    };
    if (!$("#ck-buy-agreement").prop("checked")) {
        return;
    }
    couponAmount = Number($("#current-coupon-value").val());
    amount = Number($("#product-buy-amount").val());
    if (amount == "" || isNaN(amount)) {
        $.alertF("购买金额不正确")
        return;
    };

    if (amount < product.amountmin) {
        $.alertF("此产品的起投金额为" + product.amountmin + "元");
        return;
    }
    if (amount > product.amountmax) {
        $.alertF("超出最高金额");
        return;
    }
    if (amount > product.remainingamount) {
        $.alertF("产品剩余金额不足");
        return;
    }
    if (amount % product.step != 0) {
        $.alertF("产品投资金额只能为" + product.step + "的倍数");
        return;
    }
    if (amount < coupon_needmoney) {
        $.alertF("不符合代金券使用条件");
        return;
    }
    if (saletype != null || saletype != undefined) {
        $.each(saletype, function(index, entry) {
            if (product.saletype == entry) {
                stypetemp = true;
            }
        });
        if (!stypetemp) {
            $.alertF("此代金券不适用此产品");
            return;
        }
    }

    //直连模式
    if (account.iswithholdauthoity == 3) {
        checkdisplaypay();
    } else {
        if ((product.paytype & 1) == 1) {
            paytemp = 1;
            //收银台模式
            password = "";
            productbuy_post();
        } else if ((product.paytype & 2) == 2) {
            $.alertF("至尊宝购买必须要先签订代扣协议");
            return;
        } else if ((product.paytype & 4) == 4) {
            $.alertF("定期银行卡购买必须先签订委托代扣协议");
            return;
        }

    }


};

var productbuy_post = function(pass) {
    var returnurl = window.location.href;
    var amount = $("#product-buy-amount").val();
    var data = {
        productid: $.getQueryStringByName("id"),
        amount: amount,
        paypassword: pass,
        couponid: couponid,
        interestcouponid: interestcouponid,
        isdemandpreorderfixed: true,
        returnurl: returnurl,
        paytype: paytemp
    };
    var url = "/StoreServices.svc/product/buy";
    $.AkmiiAjaxPost(url, data).then(function(data) {
        if (data.result) {
            var param = "/html/paycenter/operation-success.html?type=appoint&product=" + encodeURIComponent(product.title) + "&title=" + encodeURIComponent('申请提交成功') + "&amount=" + amount + "&profittime=" +
                encodeURIComponent(product.profitstartday) + "&starttime=" + encodeURIComponent(product.starttime) + "&today=" + data.date + "&iswithholdauthoity=" + account.iswithholdauthoity;
            if (!$.isNull(data.redirecturl)) {
                window.localStorage.setItem(buyDemandToFixedSuccessKey, param);
                document.write(data.redirecturl);
                return;
            }
            //投资转化代码
            _pyInvestmentSuccess(account.referralcode, account.username, account.mobile, data.tranid, $("#product-buy-amount").val(), $.getQueryStringByName("id"), product.duration);
            if (account.invitedby == _CHANNELCODE) {
                //MediaV-order
                _MVorder(account.username, account.referralcode, data.tranid, product.productid, $("#product-buy-amount").val(), product.title);
            }
            if (!data.hascoupon) {
                //支持至尊宝预约成功
                window.location.replace(param);
            } else {
                $.alertF("购买成功<br/>恭喜您获得" + (data.interestrate * 100) + "%加息劵一张 <br/> 请在" + data.expiredate + "前使用<br/><br/>请在&nbsp;<b>我的-平台奖励-加息劵</b>&nbsp;查看", null, function() {
                    window.location.href = "/html/my/"
                });
            }
        } else if (data.errorcode == "20018") {
            $.alertNew(data.errormsg, null, function() {
                $.PaymentHtmlNew($("#product-buy-amount").val(), "", function(password) {
                    $.closePWD();
                    productbuy_post(password);
                }, cancel, "至尊宝", account.demandbalance);
            });
        } else if (data.errorcode == "20019") {
            $.confirmF(data.errormsg, null, "去重置", function() {
                $(".reset").click();
            }, function() {
                window.location.href = "/html/my/resetpassword.html";
            });
        } else if (data.errorcode == "isnewuser") {
            $.alertF(data.errormsg);
        } else if (data.errorcode == "missing_parameter_accountid") {
            $.confirmF("请先登录", null, null, null, $.Loginlink);
        } else {
            $.alertF(data.errormsg);
        }
    });
};

//立即预约
//$("#product-buy").click(function () {
//    productBuy();
//});

//点击问号提示
$(".question-icon").click(function() {
    $.alertNew("等待期间资金将被锁定，依然享受至尊宝收益，但不能转出或用于购买其他产品。开售自动成交后，将自动从至尊宝扣除相应金额。", null, null, "提示", "limit-icon-bar");
});

//格式化活动标利率
var formatActityRate = function(actityrate) {
    if (actityrate > 0) {
        return "+" + $.fmoney(actityrate) + "%";
    } else {
        return "";
    }

}

$(".hongbao").click(function() {
    $(".bonus_ticket").show();
    $(".mask").show();
})

//代金券
$(".bt_bonus_title").click(function() {
        $(this).addClass('bon_t_on').siblings().removeClass('bon_t_on');
        $('.bt_bonus').show();
        $('.bt_tickets').hide();
    })
    //加息券
$(".bt-tickets_title").click(function() {
    $(this).addClass('bon_t_on').siblings().removeClass('bon_t_on');
    $('.bt_bonus').hide();
    $('.bt_tickets').show();

})

//加息券列表
var loadTicketsList = function(pageindex) {
    var url = "/StoreServices.svc/activity/fixedinterestcouponlist";
    var param = {
        "type": 2,
        "saletypes": product.saletype,
        "pageindex": pageindex
    };
    $.AkmiiAjaxPost(url, param, true).then(function(d) {
        if (d.result) {
            var ticketlist = d.fixedinterestcouponlist.length;
            if (ticketlist != 0) {
                $.each(d.fixedinterestcouponlist, function(i, item) {
                    InterestHtml(item);
                    ticketcount++;
                });
            }
        }
        //没有代金券和加息券 红包栏隐藏
        if (couponcount == 0 && ticketcount == 0) {
            $(".hongbao").hide();
        }
    });
}

var InterestHtml = function(Item) {
    var html = [];
    html.push("<div class=\"row bb\" data-option=\"" + Item.id + "\" data-suiproduct=\"" + Item.suiproduct + "\" data-rate=\"" + Item.rate + "\" data-expireday=\"" + Item.expireday + "\">");
    html.push("<div class=\"bt_tips col-97 small-9 fl\" >");
    html.push("<span>" + Item.rate + "%（" + Item.expireday + "）</span><br /><span>有效期至：" + Item.expiredate + "</span>");
    html.push("</div>");
    html.push("<div class=\"small-3 fl\"> ");
    html.push("<img src=\"https://txsres.txslicai.com/css/img2.0/use-choose.png\" class=\"use-choose az-right display-none\" alt=\"\"> </div> </div>");
    html.push("</div>");
    var result = $(html.join(''))
    $("#ticketlist").append(result);
    result.click(function() {
        interestcouponid = $(this).attr("data-option"); //加息券id
        couponid = 0;
        $(".use-choose").addClass("display-none");
        $(this).find(".use-choose").removeClass("display-none")
        if (Item.suiproduct != null) {
            var sui = $(this).data("suiproduct") + "";
            saletype = sui.split(','); //产品适用类型
        }

        $("#current-coupon-text").html($(this).attr("data-rate") + "%" + $(this).attr("data-expireday"));

        $(".bonus_ticket").hide();
        $(".mask").hide();
        realPayMent();

    });
    return result;
}

//未使用代金券
$(".nousecoupon").click(function() {
    $(".bonus_ticket").hide();
    $(".mask").hide();
    couponid = 0;
    coupon_needmoney = 0;
    if (interestcouponid == 0) {
        $(".use-choose").addClass("display-none");
        $(".current-coupon").find("#current-coupon-text").html("未使用优惠券");
        interestcouponid = 0;
        $("#current-coupon-value").val(0)
        realPayMent();
    }
});

//未使用加息券
$(".nouseticket").click(function() {
    $(".bonus_ticket").hide();
    $(".mask").hide();
    interestcouponid = 0;
    coupon_needmoney = 0;
    if (couponid == 0) {
        $(".use-choose").addClass("display-none");
        $(".current-coupon").find("#current-coupon-text").html("未使用优惠券");
        couponid = 0;
        realPayMent();
    }
});

$(".mask").click(function() {
    $(".bonus_ticket").hide()
    $(".mask").hide()
})

//点击立即投资（pay_btn_op存在则不能点击按钮）
$("#product-buy").click(function() {
    if (!$(this).hasClass('pay_btn_op')) {
        checkiswithholdauthoity();
    }
})

//多种支付方式

function paymethod() {
    $.UpdateTitle("支付方式");
    $.closePWD();
    $("#choicepay").show();
    $("#producthtml").hide();
    switch (paytemp) {
        case 1:
            $(".basicimg").show();
            break;
        case 2:
            $(".demandimg").show();
            break;
        case 4:
            $(".bankimg").show();
            break;
    }
    issupportpaytype();
    checxpaytype();
}
//判断产品支持哪几种支付方式
function issupportpaytype() {
    if ((product.paytype & 1) == 1) //余额购买
    {
        basictemp = true;
    }
    if ((product.paytype & 2) == 2) { //至尊宝
        zzbtemp = true;
    }
    if ((product.paytype & 4) == 4) {
        banktemp = true; //银行卡
    }
}

//支付方式显示判断
function checxpaytype() {
    if (basictemp) {
        $("#basicbalance").html($.fmoney(account.basicbalance)); //账户余额
        if (account.basicbalance < (amount - couponAmount)) {
            $("#basic").addClass("second-span");
            $("#basic").next().removeClass("select-span").addClass("second-span");
        }
    } else {
        $("#basicdiv").hide();
    }
    if (zzbtemp) {
        $("#demandbalance").html($.fmoney(account.demandbalance)); //至尊宝余额
        if (account.demandbalance < (amount - couponAmount)) {
            $("#demand").addClass("second-span");
            $("#demand").next().removeClass("select-span").addClass("second-span");
        }
    } else {
        $("#zzbdiv").hide();
    }
    if (banktemp) {
        $("#bankname").html(account.bankname); //银行
        $("#cardcode").html(account.cardcode); //尾号
        $("#depositsinglemax").html($.fmoneytext(account.depositsinglemax)); //银行限额
        if (account.depositsinglemax < (amount - couponAmount)) {
            $("#bank").addClass("second-span");
            $("#bank").next().removeClass("select-span").addClass("second-span");
        }
    } else {
        $("#bankdiv").hide();
    }
}

//验证
function checkdisplaypay() {
    issupportpaytype();
    if (basictemp) {
        if (account.basicbalance >= amount) {
            $.PaymentHtmlNew(amount - couponAmount, "", function(password) {
                $.closePWD();
                productbuy_post(password);
            }, cancel, sengcaibaotext, account.basicbalance, paymethod);
            paytemp = 1;
        } else {
            if (account.demandbalance >= amount && zzbtemp) {
                zzbpay();
                paytemp = 2;
            } else if ((account.demandbalance < amount || !zzbtemp) && account.basicbalance < amount && banktemp && account.depositsinglemax >= amount) {
                bankpay();
                paytemp = 4;
            } else if (!banktemp && account.basicbalance < amount && (!zzbtemp || (account.demandbalance < amount && zzbtemp))) {
                if ((account.basicbalance + couponAmount) < amount) {
                    $.confirmNew("" + sengcaibaotext + "不足", "null", "（还需为账户" + depositbtntext + "" + $.fmoney(amount - (accountBalance + couponAmount)) + "）", "我知道了", "前往" + depositbtntext + "", null, function() {
                        window.location.href = "/html/paycenter/user-deposit.html";
                    });
                    return;
                }
            } else if (account.depositsinglemax < amount && banktemp && account.basicbalance < amount && (!zzbtemp || (account.demandbalance < amount && zzbtemp))) {
                $.confirmNew("" + sengcaibaotext + "不足且超出银行卡单笔支付限额", "null", "（还需为账户" + depositbtntext + "" + $.fmoney(amount - (accountBalance + couponAmount)) + "）", "我知道了", "前往" + depositbtntext + "", null, function() {
                    window.location.href = "/html/paycenter/user-deposit.html";
                });
                return;
            }

        }
    } else if (zzbtemp) {
        if (account.demandbalance >= amount) {
            zzbpay();
            paytemp = 2;
        } else if (account.demandbalance < amount && banktemp && account.depositsinglemax >= amount) {
            bankpay();
            paytemp = 4;
        } else if (!banktemp && !basictemp && account.demandbalance < amount) {
            if ((account.demandbalance + couponAmount) < amount) {
                $.confirmNew("至尊宝账户余额不足", "null", "（至尊宝账户还需转入" + $.fmoney(amount - (account.demandbalance + couponAmount)) + "）", "我知道了", "前往至尊宝", null, function() {
                    window.location.href = "/html/product/productbuy.html";
                });
                return;
            }
        } else if (account.depositsinglemax < amount && banktemp && !basictemp && account.demandbalance < amount) {
            $.confirmNew("至尊宝余额不足且超出银行卡单笔支付限额", "null", " ", "我知道了", "前往" + depositbtntext + "", null, function() {
                window.location.href = "/html/product/productbuy.html";
            });
            return;
        }

    } else if (banktemp) {
        if (account.depositsinglemax < amount) {
            $.alertF("购买金额超过银行限额");
            return;
        } else {
            bankpay();
            paytemp = 4;
        }
    }
}

//银行卡弹窗
function bankpay() {
    $.PaymentHtmlNew(amount - couponAmount, "", function(password) {
        $.closePWD();
        productbuy_post(password);
    }, cancel, "" + account.bankname + "(" + account.cardcode + ")", account.depositsinglemax, paymethod, true);
}

//至尊宝弹窗
function zzbpay() {
    $.PaymentHtmlNew(amount - couponAmount, "", function(password) {
        $.closePWD();
        productbuy_post(password);
    }, cancel, "至尊宝", account.demandbalance, paymethod);
}

function cancel() {
    $(".basicimg").hide();
    $(".demandimg").hide();
    $(".bankimg").hide();
    $("#basic").removeClass("second-span");
    $("#basic").next().removeClass("second-span").addClass("select-span");
    $("#demand").removeClass("second-span");
    $("#demand").next().removeClass("second-span").addClass("select-span");
    $("#bank").removeClass("second-span");
    $("#bank").next().removeClass("second-span").addClass("select-span");
}

//点击支付方式
$("#basicdiv").click(function() {
    if (!$("#basic").hasClass("second-span")) {
        $.UpdateTitle("立即投资");
        //当前img显示,其他隐藏
        $(".basicimg").show();
        $(".demandimg").hide();
        $(".bankimg").hide();
        $("#choicepay").hide();
        $("#producthtml").show();
        paytemp = 1;
        $.PaymentHtmlNew(amount - couponAmount, "", function(password) {
            $.closePWD();
            productbuy_post(password);
        }, cancel, "", account.basicbalance, paymethod);
    }
});
$("#zzbdiv").click(function() {
    if (!$("#demand").hasClass("second-span")) {
        $.UpdateTitle("立即投资");
        //当前img显示,其他隐藏
        $(".demandimg").show();
        $(".basicimg").hide();
        $(".bankimg").hide();
        $("#choicepay").hide();
        $("#producthtml").show();
        paytemp = 2;
        $.PaymentHtmlNew(amount - couponAmount, "", function(password) {
            $.closePWD();
            productbuy_post(password);
        }, cancel, "至尊宝", account.demandbalance, paymethod);
    }
});
$("#bankdiv").click(function() {
    if (!$("#bank").hasClass("second-span")) {
        $.UpdateTitle("立即投资");
        //当前img显示,其他隐藏
        $(".bankimg").show();
        $(".basicimg").hide();
        $(".demandimg").hide();
        $("#choicepay").hide();
        $("#producthtml").show();
        paytemp = 4;
        $.PaymentHtmlNew(amount - couponAmount, "", function(password) {
            $.closePWD();
            productbuy_post(password);
        }, cancel, "" + account.bankname + "(" + account.cardcode + ")", account.depositsinglemax, paymethod, true);
    }
});