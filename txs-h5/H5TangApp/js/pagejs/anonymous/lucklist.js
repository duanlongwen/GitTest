﻿/***
  * 投资大咖欢乐季活动
  * create by eddiew, 2016-01-06
 **/
$(function () {
    var bigGiftList = [
        { rank: 1, xmobile: "**0005", dayinvest: "4,026,733", gift: "iPhone6s plus" }, { rank: 2, xmobile: "**8591", dayinvest: "3,951,777", gift: "iPad mini 4" },
        { rank: 3, xmobile: "**6208", dayinvest: "3,174,375", gift: "艾罗伯特扫地机器人" }, { rank: 4, xmobile: "**9111", dayinvest: "2,958,508", gift: "华为b2智能手环" },
        { rank: 5, xmobile: "**2208", dayinvest: "2,645,405", gift: "华为b2智能手环" }, { rank: 6, xmobile: "**8786", dayinvest: "2,630,959", gift: "华为b2智能手环" },
        { rank: 7, xmobile: "**8676", dayinvest: "1,995,076", gift: "华为b2智能手环" }, { rank: 8, xmobile: "**1153", dayinvest: "1,899,521", gift: "华为b2智能手环" },
        { rank: 9, xmobile: "**7171", dayinvest: "1,860,234", gift: "华为b2智能手环" }, { rank: 10, xmobile: "**0777", dayinvest: "1,630,695", gift: "华为b2智能手环" },
        { rank: 11, xmobile: "**7132", dayinvest: "1,565,952", gift: "500元京东购物卡" }, { rank: 12, xmobile: "**6208", dayinvest: "1,524,635", gift: "500元京东购物卡" },
        { rank: 13, xmobile: "**0989", dayinvest: "1,500,004", gift: "500元京东购物卡" }, { rank: 14, xmobile: "**6224", dayinvest: "1,484,095", gift: "500元京东购物卡" },
        { rank: 15, xmobile: "**5584", dayinvest: "1,480,790", gift: "500元京东购物卡" }, { rank: 16, xmobile: "**2623", dayinvest: "1,419,884", gift: "500元京东购物卡" },
        { rank: 17, xmobile: "**5875", dayinvest: "1,359,090", gift: "500元京东购物卡" }, { rank: 18, xmobile: "**8103", dayinvest: "1,251,311", gift: "500元京东购物卡" },
        { rank: 19, xmobile: "**5259", dayinvest: "1,222,207", gift: "500元京东购物卡" }, { rank: 20, xmobile: "**9111", dayinvest: "1,201,530", gift: "500元京东购物卡" },
        { rank: 21, xmobile: "**0319", dayinvest: "1,191,859", gift: "小米手环" }, { rank: 22, xmobile: "**2345", dayinvest: "1,186,872", gift: "小米手环" },
        { rank: 23, xmobile: "**7927", dayinvest: "1,149,928", gift: "小米手环" }, { rank: 24, xmobile: "**9761", dayinvest: "1,128,013", gift: "小米手环" },
        { rank: 25, xmobile: "**3566", dayinvest: "1,078,360", gift: "小米手环" }, { rank: 26, xmobile: "**1264", dayinvest: "1,063,388", gift: "小米手环" },
        { rank: 27, xmobile: "**0029", dayinvest: "1,060,931", gift: "小米手环" }, { rank: 28, xmobile: "**3786", dayinvest: "1,030,007", gift: "小米手环" },
        { rank: 29, xmobile: "**6125", dayinvest: "1,007,860", gift: "小米手环" }, { rank: 30, xmobile: "**1666", dayinvest: "1,000,004", gift: "小米手环" },
    ];
    var gift100List = ["**7525",
"**6585",
"**0159",
"**8439",
"**0052",
"**8162",
"**3218",
"**2848",
"**3207",
"**0520",
"**2872",
"**5269",
"**0194",
"**3157",
"**7218",
"**1894",
"**6935",
"**9886",
"**0880",
"**1263",
"**5312",
"**0045",
"**4689",
"**2828",
"**2765",
"**7264",
"**8991",
"**5235",
"**5053",
"**9664",
"**3423",
"**9401",
"**4626",
"**4262",
"**1280",
"**9434",
"**5692",
"**3277",
"**1275",
"**8742",
"**6674",
"**4350",
"**2791",
"**7179",
"**2185",
"**0881",
"**2705",
"**2252",
"**7641",
"**8388",
"**2837",
"**1433",
"**0535",
"**8358",
"**6121",
"**2122",
"**1659",
"**4002",
"**1762",
"**7171",
"**7842",
"**8211",
"**5664",
"**1749",
"**1234",
"**0781",
"**7052",
"**4564",
"**3910",
"**7240",
"**3231",
"**4062",
"**4880",
"**5966",
"**4378",
"**2671",
"**0526",
"**8002",
"**9073",
"**3152",
"**7016",
"**3323",
"**5646",
"**3861",
"**1460",
"**6254",
"**4588",
"**0626",
"**3487",
"**4570",
"**3012",
"**2235",
"**5878",
"**9018",
"**5130",
"**5747",
"**6576",
"**4704",
"**8370",
"**7040"
    ];
    var gift50List = ["**3135",
"**9808",
"**8472",
"**2169",
"**7516",
"**6835",
"**1016",
"**3350",
"**1815",
"**5813",
"**4456",
"**6236",
"**0071",
"**1356",
"**2357",
"**0460",
"**1243",
"**2554",
"**3334",
"**6250",
"**7237",
"**4595",
"**4570",
"**0589",
"**5657",
"**7068",
"**8950",
"**1353",
"**1620",
"**6277",
"**1207",
"**2891",
"**0334",
"**1392",
"**8899",
"**4528",
"**1187",
"**6431",
"**5525",
"**6015",
"**0239",
"**6767",
"**8216",
"**1965",
"**8780",
"**4324",
"**0766",
"**0731",
"**7237",
"**6024",
"**7145",
"**1758",
"**0820",
"**5527",
"**3040",
"**8589",
"**8291",
"**6850",
"**2159",
"**2212",
"**4907",
"**8099",
"**5243",
"**3889",
"**7963",
"**8413",
"**3730",
"**1109",
"**6830",
"**7689",
"**3747",
"**1144",
"**8517",
"**0508",
"**8049",
"**1871",
"**7542",
"**9370",
"**7644",
"**1246",
"**1010",
"**7180",
"**3634",
"**0374",
"**9269",
"**9571",
"**1544",
"**1315",
"**2200",
"**2515",
"**0996",
"**5643",
"**3057",
"**4864",
"**3827",
"**1660",
"**9257",
"**5023",
"**8895",
"**9101",
"**8093",
"**2062",
"**8024",
"**8905",
"**7641",
"**5692",
"**5130",
"**5631",
"**3586",
"**4539",
"**1275",
"**1749",
"**7362",
"**3070",
"**5264",
"**8773",
"**7842",
"**6790",
"**1324",
"**5664",
"**5027",
"**8261",
"**8164",
"**8497",
"**6674",
"**9091",
"**9594",
"**7877",
"**6420",
"**3276",
"**6281",
"**8921",
"**3167",
"**2826",
"**5470",
"**5793",
"**2765",
"**3596",
"**3157",
"**0572",
"**3487",
"**0194",
"**8211",
"**5315",
"**3271",
"**9375",
"**7217",
"**8484",
"**0243",
"**7240",
"**8589",
"**9453",
"**5966",
"**2329",
"**5453",
"**4062",
"**0626",
"**4179",
"**9434",
"**1494",
"**6254",
"**5718",
"**1854",
"**7685",
"**7052",
"**7260",
"**4704",
"**8939",
"**8687",
"**4864",
"**0263",
"**6058",
"**6784",
"**1234",
"**6982",
"**8266",
"**4270",
"**4588",
"**4155",
"**3516",
"**7961",
"**6179",
"**5460",
"**5238",
"**0045",
"**6586",
"**7663",
"**6890",
"**5312",
"**6268",
"**7470",
"**7805",
"**3723",
"**4951",
"**1764",
"**6935",
"**7481",
"**8241",
"**6487",
"**2320",
"**9812",
"**5269",
"**5388",
"**6259",
"**9242",
"**1920",
"**5969",
"**5271",
"**7187",
"**3231",
"**9573",
"**9018",
"**9879",
"**4378",
"**4689",
"**1894",
"**1556",
"**4880",
"**7040",
"**2354",
"**7891",
"**8371",
"**0356",
"**3910",
"**4564",
"**5689",
"**6284",
"**3914",
"**0471",
"**6430",
"**1850",
"**6289",
"**6576",
"**7179",
"**5747",
"**2314",
"**2235",
"**2872",
"**6723",
"**1208",
"**9071",
"**3244",
"**6239",
"**7029",
"**3463",
"**5741",
"**0292",
"**0881",
"**1863",
"**0962",
"**8388",
"**5168",
"**0880",
"**4246",
"**1263",
"**2252",
"**8370",
"**7985",
"**2828",
"**5878",
"**9042",
"**4907",
"**3277",
"**3012",
"**9262",
"**2253",
"**0345",
"**1286",
"**4723",
"**1508",
"**6876",
"**5750",
"**7822",
"**4570",
"**4849",
"**2990",
"**8742",
"**3923",
"**2791",
"**7567",
"**4780",
"**4350",
"**3962",
"**7592",
"**2185",
"**8650",
"**6527",
"**7093",
"**8992",
"**6275",
"**6728",
"**9886",
"**8476",
"**7862",
"**2485",
"**7218",
"**0794",
"**8878",
"**0781",
"**2705"
    ];
    var biggifttmpl = $("#biggifttmpl").html();
    var gift100tmpl = "<div class=\"row cl20\"></div>";
    var gift50tmpl = "<div class=\"row cl20\"></div>";
    $.each(bigGiftList, function (index, item) {
        var t = biggifttmpl;
        t = t.replace(/\{\{rank\}\}/g, item.rank);
        t = t.replace(/\{\{xmobile\}\}/g, item.xmobile);
        t = t.replace(/\{\{dayinvest\}\}/g, item.dayinvest);
        t = t.replace(/\{\{gift\}\}/g, item.gift);
        $("#atbiggift").append(t);
    });
    var $t = $(gift100tmpl);
    for (var i = 0; i < gift100List.length; i++) {
        var tz = "<li class=\"left\">" + gift100List[i] + "</li>";
        $t.append(tz);
        if (gift100List.length == (i + 1) || (i + 1) % 5 == 0) {
            $("#atgift100").append($t);
            $t = $(gift100tmpl);
        }
    }
    for (var i = 0; i < gift50List.length; i++) {
        var $t = $(gift50tmpl);
        var j = i;
        for (; j < i + 5; j++) {
            if (j > gift50List.length) {
                break;
            }
            var tz = "<li class=\"left\">" + gift50List[j] + "</li>";
            $t.append(tz);
        }
        i = j - 1;
        $("#atgift50").append($t);
    }
});