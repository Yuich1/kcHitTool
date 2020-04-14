const SHIP_TYPE = [
    { id: 1, name: "戦艦", type: "bb" },
    { id: 2, name: "航空母艦", type: "cv" },
    { id: 3, name: "重巡", type: "ca" },
    { id: 4, name: "軽巡", type: "cl" },
    { id: 5, name: "駆逐", type: "dd" },
    { id: 6, name: "海防", type: "de" },
    { id: 7, name: "潜水", type: "ss" },
    { id: 8, name: "補助艦艇", type: "av" },
];

const ITEM_TYPE = [
    { id: 1, name: "小口径主砲" },
    { id: 2, name: "中口径主砲" },
    { id: 3, name: "大口径主砲" },
    { id: 4, name: "副砲" },
    { id: 5, name: "魚雷" },
    { id: 6, name: "潜水艦装備" },
    { id: 7, name: "艦戦" },
    { id: 8, name: "艦攻" },
    { id: 9, name: "艦爆" },
    { id: 10, name: "噴式機" },
    { id: 11, name: "水偵" },
    { id: 12, name: "水爆" },
    { id: 13, name: "水戦" },
    { id: 14, name: "小型電探" },
    { id: 15, name: "大型電探" },
    { id: 16, name: "徹甲弾" },
    { id: 17, name: "三式弾" },
    { id: 18, name: "機銃" },
    { id: 19, name: "ソナー" },
    { id: 20, name: "爆雷投射機" },
    { id: 21, name: "爆雷" },
    { id: 22, name: "大型ソナー" },
    { id: 23, name: "潜航艇" },
    { id: 24, name: "缶" },
    { id: 25, name: "タービン" },
    { id: 26, name: "ダメコン" },
    { id: 27, name: "艦偵" },
    { id: 28, name: "見張り員" }
];

// 単縦, 複縦, 輪形, 梯形, 単横, 警戒
const FORMATION_ACC_COEF = [1.0, 1.2, 1.0, 1.2, 1.2, 1.0];
const FORMATION_AVO_COEF = [1.0, 1.0, 1.1, 1.2, 1.3, 1.0];
const FORMATION_DAMAGE_COEF = [1.0, 0.8, 0.7, 0.75, 0.6, 0.5];
// T有利, 同航, 反航, T不利
const ENGAGEMENT_DAMAGE_COEF = [1.2, 1.0, 0.8, 0.6];

const SHIP_DATA = [
    {
        type: 1, name: "金剛", main_id: 591, speed: "high", remodel: [
            { id: 78, state: "未改造", power: 89, torp: 0, luck: 12, slot: 3 },
            { id: 209, state: "改", power: 94, torp: 0, luck: 12, slot: 4 },
            { id: 149, state: "改二", power: 98, torp: 0, luck: 15, slot: 4 },
            { id: 591, state: "改二丙", power: 98, torp: 42, luck: 18, slot: 4 }
        ]
    },
    {
        type: 1, name: "比叡", main_id: 150, speed: "high", remodel: [
            { id: 86, state: "未改造", power: 89, torp: 0, luck: 10, slot: 3 },
            { id: 210, state: "改", power: 94, torp: 0, luck: 12, slot: 4 },
            { id: 150, state: "改二", power: 99, torp: 0, luck: 13, slot: 4 }
        ]
    },
    {
        type: 1, name: "榛名", main_id: 151, speed: "high", remodel: [
            { id: 79, state: "未改造", power: 89, torp: 0, luck: 15, slot: 3 },
            { id: 211, state: "改", power: 94, torp: 0, luck: 20, slot: 4 },
            { id: 151, state: "改二", power: 96, torp: 0, luck: 41, slot: 4 }
        ]
    },
    {
        type: 1, name: "霧島", main_id: 152, speed: "high", remodel: [
            { id: 85, state: "未改造", power: 89, torp: 0, luck: 10, slot: 3 },
            { id: 212, state: "改", power: 94, torp: 0, luck: 12, slot: 4 },
            { id: 152, state: "改二", power: 104, torp: 0, luck: 14, slot: 4 }
        ]
    },
    {
        type: 1, name: "扶桑", main_id: 411, speed: "low", remodel: [
            { id: 26, state: "未改造", power: 94, torp: 0, luck: 5, slot: 4 },
            { id: 286, state: "改", power: 79, torp: 0, luck: 10, slot: 4 },
            { id: 411, state: "改二", power: 99, torp: 0, luck: 13, slot: 4 }
        ]
    },
    {
        type: 1, name: "山城", main_id: 412, speed: "low", remodel: [
            { id: 27, state: "未改造", power: 94, torp: 0, luck: 5, slot: 4 },
            { id: 287, state: "改", power: 79, torp: 0, luck: 10, slot: 4 },
            { id: 412, state: "改二", power: 98, torp: 0, luck: 14, slot: 4 }
        ]
    },
    {
        type: 1, name: "伊勢", main_id: 553, speed: "low", remodel: [
            { id: 77, state: "未改造", power: 89, torp: 0, luck: 15, slot: 4 },
            { id: 82, state: "改", power: 86, torp: 0, luck: 30, slot: 4 },
            { id: 553, state: "改二", power: 88, torp: 0, luck: 40, slot: 5 }
        ]
    },
    {
        type: 1, name: "日向", main_id: 554, speed: "low", remodel: [
            { id: 87, state: "未改造", power: 94, torp: 0, luck: 15, slot: 4 },
            { id: 88, state: "改", power: 86, torp: 0, luck: 30, slot: 4 },
            { id: 554, state: "改二", power: 86, torp: 0, luck: 40, slot: 5 }
        ]
    },
    {
        type: 1, name: "長門", main_id: 541, speed: "low", remodel: [
            { id: 80, state: "未改造", power: 99, torp: 0, luck: 20, slot: 4 },
            { id: 275, state: "改", power: 99, torp: 0, luck: 32, slot: 4 },
            { id: 541, state: "改二", power: 118, torp: 0, luck: 40, slot: 4 }
        ]
    },
    {
        type: 1, name: "陸奥", main_id: 573, speed: "low", remodel: [
            { id: 81, state: "未改造", power: 99, torp: 0, luck: 3, slot: 4 },
            { id: 276, state: "改", power: 99, torp: 0, luck: 6, slot: 4 },
            { id: 573, state: "改二", power: 118, torp: 0, luck: 16, slot: 4 }
        ]
    },
    {
        type: 1, name: "大和", main_id: 136, speed: "low", remodel: [
            { id: 131, state: "未改造", power: 129, torp: 0, luck: 12, slot: 4 },
            { id: 136, state: "改", power: 139, torp: 0, luck: 13, slot: 4 }
        ]
    },
    {
        type: 1, name: "武蔵", main_id: 546, speed: "low", remodel: [
            { id: 143, state: "未改造", power: 129, torp: 0, luck: 10, slot: 4 },
            { id: 148, state: "改", power: 139, torp: 0, luck: 9, slot: 4 },
            { id: 546, state: "改二", power: 145, torp: 0, luck: 10, slot: 5 }
        ]
    },
    {
        type: 1, name: "Bismarck", main_id: 178, speed: "high", remodel: [
            { id: 171, state: "未改造", power: 88, torp: 0, luck: 8, slot: 4 },
            { id: 172, state: "改", power: 93, torp: 0, luck: 10, slot: 4 },
            { id: 173, state: "zwei", power: 97, torp: 0, luck: 20, slot: 4 },
            { id: 178, state: "drie", power: 99, torp: 36, luck: 22, slot: 4 }
        ]
    },
    {
        type: 1, name: "Italia", main_id: 446, speed: "high", remodel: [
            { id: 441, state: "Littorio", power: 97, torp: 0, luck: 20, slot: 4 },
            { id: 446, state: "Italia", power: 102, torp: 0, luck: 30, slot: 4 },
        ]
    },
    {
        type: 1, name: "Roma", main_id: 447, speed: "high", remodel: [
            { id: 442, state: "未改造", power: 98, torp: 0, luck: 6, slot: 4 },
            { id: 447, state: "改", power: 105, torp: 0, luck: 8, slot: 4 },
        ]
    },
    {
        type: 1, name: "Iowa", main_id: 360, speed: "high", remodel: [
            { id: 440, state: "未改造", power: 150, torp: 0, luck: 35, slot: 4 },
            { id: 360, state: "改", power: 115, torp: 0, luck: 40, slot: 4 },
        ]
    },
    {
        type: 1, name: "Colorado", main_id: 1496, speed: "low", remodel: [
            { id: 601, state: "未改造", power: 96, torp: 0, luck: 30, slot: 4 },
            { id: 1496, state: "改", power: 105, torp: 0, luck: 40, slot: 4 },
        ]
    },
    {
        type: 1, name: "Warspite", main_id: 364, speed: "low", remodel: [
            { id: 439, state: "未改造", power: 92, torp: 0, luck: 55, slot: 4 },
            { id: 364, state: "改", power: 106, torp: 0, luck: 70, slot: 4 },
        ]
    },
    {
        type: 1, name: "Nelson", main_id: 576, speed: "low", remodel: [
            { id: 571, state: "未改造", power: 102, torp: 0, luck: 24, slot: 4 },
            { id: 576, state: "改", power: 114, torp: 0, luck: 28, slot: 4 },
        ]
    },
    {
        type: 1, name: "Richelieu", main_id: 392, speed: "high", remodel: [
            { id: 492, state: "未改造", power: 94, torp: 0, luck: 22, slot: 4 },
            { id: 392, state: "改", power: 96, torp: 0, luck: 24, slot: 4 },
        ]
    },
    {
        type: 1, name: "Гангут", main_id: 513, speed: "low", remodel: [
            { id: 511, state: "未改造", power: 78, torp: 28, luck: 20, slot: 4 },
            { id: 512, state: "Октябрьская революция", power: 89, torp: 0, luck: 30, slot: 4 },
            { id: 513, state: "Гангут два", power: 90, torp: 32, luck: 35, slot: 4 },
        ]
    },
    {
        type: 2, name: "赤城", main_id: 599, remodel: [
            { id: 83, state: "未改造", power: 39, torp: 0, luck: 12, slot: 4 },
            { id: 277, state: "改", power: 55, torp: 0, luck: 12, slot: 4 },
            { id: 594, state: "改二", power: 60, torp: 0, luck: 20, slot: 5, },
            { id: 599, state: "改二戊", power: 67, torp: 0, luck: 20, slot: 5 },
        ]
    },
    {
        type: 2, name: "加賀", main_id: 278, remodel: [
            { id: 84, state: "未改造", power: 39, torp: 0, luck: 10, slot: 4 },
            { id: 278, state: "改", power: 50, torp: 0, luck: 12, slot: 4 },
        ]
    },
    {
        type: 2, name: "蒼龍", main_id: 197, remodel: [
            { id: 90, state: "未改造", power: 29, torp: 0, luck: 10, slot: 4 },
            { id: 279, state: "改", power: 39, torp: 0, luck: 12, slot: 4 },
            { id: 197, state: "改二", power: 62, torp: 0, luck: 15, slot: 4 },
        ]
    },
    {
        type: 2, name: "飛龍", main_id: 196, remodel: [
            { id: 91, state: "未改造", power: 29, torp: 0, luck: 35, slot: 4 },
            { id: 280, state: "改", power: 39, torp: 0, luck: 40, slot: 4 },
            { id: 196, state: "改二", power: 64, torp: 0, luck: 50, slot: 4 },
        ]
    },
    {
        type: 2, name: "翔鶴", main_id: 466, remodel: [
            { id: 110, state: "未改造", power: 39, torp: 0, luck: 10, slot: 4 },
            { id: 288, state: "改", power: 39, torp: 0, luck: 12, slot: 4 },
            { id: 461, state: "改二", power: 63, torp: 0, luck: 20, slot: 4 },
            { id: 466, state: "改二甲", power: 70, torp: 0, luck: 20, slot: 4 },
        ]
    },
    {
        type: 2, name: "瑞鶴", main_id: 467, remodel: [
            { id: 111, state: "未改造", power: 39, torp: 0, luck: 40, slot: 4 },
            { id: 112, state: "改", power: 39, torp: 0, luck: 42, slot: 4 },
            { id: 462, state: "改二", power: 56, torp: 0, luck: 50, slot: 4 },
            { id: 467, state: "改二甲", power: 65, torp: 0, luck: 50, slot: 4 },
        ]
    },
    {
        type: 2, name: "雲龍", main_id: 406, remodel: [
            { id: 404, state: "未改造", power: 27, torp: 0, luck: 10, slot: 4 },
            { id: 406, state: "改", power: 48, torp: 0, luck: 12, slot: 4 },
        ]
    },
    {
        type: 2, name: "天城", main_id: 429, remodel: [
            { id: 331, state: "未改造", power: 25, torp: 0, luck: 13, slot: 4 },
            { id: 429, state: "改", power: 45, torp: 0, luck: 17, slot: 4 },
        ]
    },
    {
        type: 2, name: "葛城", main_id: 430, remodel: [
            { id: 332, state: "未改造", power: 25, torp: 0, luck: 20, slot: 4 },
            { id: 430, state: "改", power: 45, torp: 0, luck: 30, slot: 4 },
        ]
    },
    {
        type: 2, name: "大鳳", main_id: 156, remodel: [
            { id: 153, state: "未改造", power: 49, torp: 0, luck: 2, slot: 4 },
            { id: 156, state: "改", power: 59, torp: 0, luck: 4, slot: 4 },
        ]
    },
    {
        type: 2, name: "鳳翔", main_id: 285, remodel: [
            { id: 89, state: "未改造", power: 19, torp: 0, luck: 20, slot: 2 },
            { id: 285, state: "改", power: 29, torp: 0, luck: 30, slot: 3 },
        ]
    },
    {
        type: 2, name: "龍驤", main_id: 157, remodel: [
            { id: 76, state: "未改造", power: 19, torp: 0, luck: 10, slot: 3 },
            { id: 281, state: "改", power: 29, torp: 0, luck: 12, slot: 4 },
            { id: 157, state: "改", power: 40, torp: 0, luck: 15, slot: 4 },
        ]
    },
    {
        type: 2, name: "龍鳳", main_id: 318, remodel: [
            { id: 185, state: "未改造", power: 20, torp: 0, luck: 20, slot: 3 },
            { id: 318, state: "改", power: 32, torp: 0, luck: 24, slot: 4 },
        ]
    },
    {
        type: 2, name: "祥鳳", main_id: 282, remodel: [
            { id: 74, state: "未改造", power: 19, torp: 0, luck: 10, slot: 3 },
            { id: 282, state: "改", power: 29, torp: 0, luck: 12, slot: 4 },
        ]
    },
    {
        type: 2, name: "瑞鳳", main_id: 560, remodel: [
            { id: 116, state: "未改造", power: 19, torp: 0, luck: 30, slot: 3 },
            { id: 117, state: "改", power: 29, torp: 0, luck: 40, slot: 4 },
            { id: 555, state: "改二", power: 46, torp: 0, luck: 42, slot: 4 },
            { id: 560, state: "改二乙", power: 48, torp: 0, luck: 42, slot: 4 },
        ]
    },
    {
        type: 2, name: "飛鷹", main_id: 283, remodel: [
            { id: 75, state: "未改造", power: 19, torp: 0, luck: 10, slot: 4 },
            { id: 283, state: "改", power: 29, torp: 0, luck: 12, slot: 4 },
        ]
    },
    {
        type: 2, name: "隼鷹", main_id: 408, remodel: [
            { id: 92, state: "未改造", power: 19, torp: 0, luck: 20, slot: 4 },
            { id: 284, state: "改", power: 29, torp: 0, luck: 30, slot: 4 },
            { id: 408, state: "改二", power: 40, torp: 0, luck: 41, slot: 4 },
        ]
    },
    {
        type: 2, name: "千歳", main_id: 296, remodel: [
            { id: 108, state: "航", power: 19, torp: 0, luck: 10, slot: 3 },
            { id: 291, state: "航改", power: 34, torp: 0, luck: 12, slot: 4 },
            { id: 296, state: "航改二", power: 34, torp: 0, luck: 13, slot: 4 },
        ]
    },
    {
        type: 2, name: "千代田", main_id: 297, remodel: [
            { id: 109, state: "航", power: 19, torp: 0, luck: 10, slot: 3 },
            { id: 292, state: "航改", power: 34, torp: 0, luck: 12, slot: 4 },
            { id: 297, state: "航改二", power: 34, torp: 0, luck: 13, slot: 4 },
        ]
    },
    {
        type: 2, name: "大鷹", main_id: 529, remodel: [
            { id: 521, state: "春日丸", power: 9, torp: 0, luck: 5, slot: 2 },
            { id: 526, state: "無改造", power: 12, torp: 0, luck: 6, slot: 3 },
            { id: 380, state: "改", power: 23, torp: 0, luck: 9, slot: 4 },
            { id: 529, state: "改二", power: 39, torp: 0, luck: 14, slot: 4 },
        ]
    },
    {
        type: 2, name: "神鷹", main_id: 536, remodel: [
            { id: 534, state: "無改造", power: 14, torp: 0, luck: 9, slot: 3 },
            { id: 381, state: "改", power: 24, torp: 0, luck: 11, slot: 4 },
            { id: 536, state: "改二", power: 37, torp: 0, luck: 15, slot: 4 },
        ]
    },
    {
        type: 2, name: "鈴谷", main_id: 508, remodel: [
            { id: 508, state: "航改二", power: 56, torp: 0, luck: 13, slot: 4 },
        ]
    },
    {
        type: 2, name: "熊野", main_id: 509, remodel: [
            { id: 509, state: "航改二", power: 55, torp: 0, luck: 12, slot: 4 },
        ]
    },
    {
        type: 2, name: "Graf Zeppelin", main_id: 353, remodel: [
            { id: 432, state: "未改造", power: 40, torp: 0, luck: 4, slot: 3 },
            { id: 353, state: "改", power: 50, torp: 0, luck: 7, slot: 4 },
        ]
    },
    {
        type: 2, name: "Aquila", main_id: 365, remodel: [
            { id: 444, state: "未改造", power: 14, torp: 0, luck: 5, slot: 3 },
            { id: 365, state: "改", power: 28, torp: 0, luck: 7, slot: 4 },
        ]
    },
    {
        type: 2, name: "Saratoga", main_id: 550, remodel: [
            { id: 433, state: "無改造", power: 45, torp: 0, luck: 25, slot: 4 },
            { id: 438, state: "改", power: 53, torp: 0, luck: 35, slot: 4 },
            { id: 545, state: "Mk.II", power: 68, torp: 0, luck: 40, slot: 4 },
            { id: 550, state: "Mod.2", power: 58, torp: 0, luck: 40, slot: 4 },
        ]
    },
    {
        type: 2, name: "Intrepid", main_id: 397, remodel: [
            { id: 549, state: "未改造", power: 55, torp: 0, luck: 45, slot: 4 },
            { id: 397, state: "改", power: 58, torp: 0, luck: 50, slot: 4 },
        ]
    },
    {
        type: 2, name: "Gambier Bay", main_id: 396, remodel: [
            { id: 544, state: "未改造", power: 15, torp: 0, luck: 12, slot: 2 },
            { id: 396, state: "改", power: 32, torp: 0, luck: 15, slot: 3 },
        ]
    },
    {
        type: 2, name: "Ark Royal", main_id: 393, remodel: [
            { id: 515, state: "未改造", power: 27, torp: 0, luck: 8, slot: 4 },
            { id: 393, state: "改", power: 50, torp: 0, luck: 13, slot: 4 },
        ]
    },
];

const ITEM_DATA = [
    { id: 1, type: 1, name: "12cm単装砲", power: 1 },
    { id: 2, type: 1, name: "12.7cm連装砲", power: 2 },
    { id: 3, type: 1, name: "10cm連装高角砲", power: 2 },
    { id: 4, type: 2, name: "14cm単装砲", power: 2, accuracy: 1 },
    { id: 5, type: 2, name: "15.5cm三連装砲", power: 7, accuracy: 1 },
    { id: 6, type: 2, name: "20.3cm連装砲", power: 8 },
    { id: 7, type: 3, name: "35.6cm連装砲", power: 15 },
    { id: 8, type: 3, name: "41cm連装砲", power: 20 },
    { id: 9, type: 3, name: "46cm連装砲", power: 26 },
    { id: 10, type: 1, name: "12.7cm連装高角砲", power: 2, accuracy: 1 },
    { id: 11, type: 2, name: "15.2cm単装砲", power: 2, accuracy: 1 },
    { id: 12, type: 4, name: "15.5cm三連装副砲", power: 7, accuracy: 2 },
    //{ id: 13, type: 5, name: "61cm三連装魚雷", torp: 5 },
    //{ id: 14, type: 5, name: "61cm四連装魚雷", torp: 7 },
    //{ id: 15, type: 5, name: "61cm四連装(酸素)魚雷", torp: 10 },
    { id: 16, type: 8, name: "九七式艦攻", torp: 5 },
    { id: 17, type: 8, name: "天山", torp: 7 },
    { id: 18, type: 8, name: "流星", torp: 10 },
    //{ id: 19, type: 7, name: "九六式艦戦", power: 0, torp: 0, accuracy: 0 },
    //{ id: 20, type: 7, name: "零式艦戦21型", power: 0, torp: 0, accuracy: 0 },
    //{ id: 21, type: 7, name: "零式艦戦52型", power: 0, torp: 0, accuracy: 0 },
    //{ id: 22, type: 7, name: "試製烈風 後期型", power: 0, torp: 0, accuracy: 0 },
    { id: 23, type: 9, name: "九九式艦爆", bomb: 5 },
    { id: 24, type: 9, name: "彗星", bomb: 8 },
    //{ id: 25, type: 11, name: "零式水上偵察機", power: 0, torp: 0, accuracy: 1 },
    //{ id: 26, type: 12, name: "瑞雲", power: 0, torp: 0, accuracy: 1 },
    { id: 27, type: 14, name: "13号対空電探", accuracy: 1 },
    { id: 28, type: 14, name: "22号対水上電探", accuracy: 3 },
    { id: 29, type: 14, name: "33号対水上電探", accuracy: 5 },
    { id: 30, type: 15, name: "21号対空電探", accuracy: 2 },
    { id: 31, type: 15, name: "32号対水上電探", accuracy: 8 },
    { id: 32, type: 15, name: "42号対空電探", accuracy: 4 },
    //{ id: 33, type: 25, name: "改良式艦本式タービン" },
    //{ id: 34, type: 24, name: "強化型艦本式缶" },
    { id: 35, type: 17, name: "三式弾" },
    { id: 36, type: 16, name: "九一式徹甲弾", power: 8, accuracy: 1 },
    { id: 37, type: 18, name: "7.7mm機銃" },
    { id: 38, type: 18, name: "12.7mm単装機銃" },
    { id: 39, type: 18, name: "25mm連装機銃" },
    { id: 40, type: 18, name: "25mm三連装機銃" },
    //{ id: 41, type: 23, name: "甲標的 甲型", power: 0, torp: 12, accuracy: 0 },
    //{ id: 42, type: 26, name: "応急修理要員", power: 0, torp: 0, accuracy: 0 },
    //{ id: 43, type: 26, name: "応急修理女神", power: 0, torp: 0, accuracy: 0 },
    //{ id: 44, type: 20, name: "九四式爆雷投射機", power: 0, torp: 0, accuracy: 0 },
    //{ id: 45, type: 20, name: "三式爆雷投射機", power: 0, torp: 0, accuracy: 0 },
    //{ id: 46, type: 19, name: "九三式水中聴音機", power: 0, torp: 0, accuracy: 1 },
    //{ id: 47, type: 19, name: "三式水中聴音機", power: 0, torp: 0, accuracy: 2 },
    { id: 48, type: 1, name: "12cm単装高角砲", power: 1 },
    { id: 49, type: 18, name: "25mm単装機銃" },
    { id: 50, type: 2, name: "20.3cm(3号)連装砲", power: 10, accuracy: 1 },
    { id: 51, type: 18, name: "12cm30連装噴進砲" },
    { id: 52, type: 8, name: "流星改", torp: 13 },
    //{ id: 53, type: 7, name: "烈風 一一型", power: 0, torp: 0, accuracy: 2 },
    { id: 54, type: 27, name: "彩雲", accuracy: 2 },
    //{ id: 55, type: 7, name: "紫電改二", power: 0, torp: 0, accuracy: 0 },
    //{ id: 56, type: 7, name: "震電改", power: 0, torp: 0, accuracy: 0 },
    { id: 57, type: 9, name: "彗星一二型甲", bomb: 10 },
    { id: 58, type: 5, name: "61cm五連装(酸素)魚雷", torp: 12, accuracy: 1 },
    //{ id: 59, type: 11, name: "零式水上観測機", power: 0, torp: 0, accuracy: 2 },
    { id: 60, type: 9, name: "零式艦戦62型(爆戦)", bomb: 4 },

    { id: 63, type: 1, name: "12.7cm連装砲B型改二", power: 3 },
    { id: 64, type: 9, name: "Ju87C改", bomb: 9, accuracy: 1 },
    { id: 65, type: 2, name: "15.2cm連装砲", power: 5, accuracy: 3 },
    { id: 66, type: 4, name: "8cm高角砲", power: 1, accuracy: 1 },

    { id: 71, type: 4, name: "10cm連装高角砲(砲架)", power: 1, accuracy: 1 },

    { id: 76, type: 3, name: "38cm連装砲", power: 16, accuracy: 1 },
    { id: 77, type: 4, name: "15cm連装副砲", power: 4, accuracy: 2 },
    { id: 78, type: 1, name: "12.7cm単装砲", power: 2, accuracy: 1 },

    { id: 82, type: 8, name: "九七式艦攻(931空)", torp: 6 },
    { id: 83, type: 8, name: "天山(931空)", torp: 9 },
    { id: 84, type: 18, name: "2cm 四連装FlaK 38", accuracy: 1 },
    { id: 85, type: 18, name: "3.7cm FlaK M42", power: 1, accuracy: 1 },

    { id: 88, type: 14, name: "22号対水上電探改", accuracy: 8 },
    { id: 89, type: 15, name: "21号対空電探改", accuracy: 3 },
    { id: 90, type: 2, name: "20.3cm(2号)連装砲", power: 9, accuracy: 1 },
    { id: 91, type: 1, name: "12.7cm連装高角砲(後期型)", power: 2, accuracy: 1 },
    { id: 92, type: 18, name: "毘式40mm連装機銃" },
    { id: 93, type: 8, name: "九七式艦攻(友永隊)", torp: 11, accuracy: 3 },
    { id: 94, type: 8, name: "天山一二型(友永隊)", torp: 14, accuracy: 3 },

    { id: 97, type: 9, name: "九九式艦爆(熟練)", bomb: 7, accuracy: 2 },
    { id: 98, type: 8, name: "九七式艦攻(熟練)", torp: 8, accuracy: 2 },
    { id: 99, type: 9, name: "九九式艦爆(江草隊)", bomb: 10, accuracy: 4 },
    { id: 100, type: 9, name: "彗星(江草隊)", bomb: 13, accuracy: 4 },

    { id: 103, type: 3, name: "試製35.6cm連装砲", power: 18, accuracy: 2 },
    { id: 104, type: 3, name: "35.6cm連装砲(ダズル迷彩)", power: 15, accuracy: 1 },
    { id: 105, type: 3, name: "試製41cm三連装砲", power: 22, accuracy: 2 },
    { id: 106, type: 14, name: "13号対空電探改", accuracy: 2 },

    { id: 111, type: 9, name: "彗星(六〇一空)", bomb: 11, accuracy: 1 },
    { id: 112, type: 8, name: "天山(六〇一空)", torp: 10, accuracy: 1 },
    { id: 113, type: 8, name: "流星(六〇一空)", torp: 13, accuracy: 1 },
    { id: 114, type: 3, name: "38cm連装砲改", power: 17, accuracy: 3 },

    { id: 116, type: 16, name: "一式徹甲弾", power: 9, accuracy: 2 },
    { id: 117, type: 3, name: "試製46cm連装砲", power: 23, accuracy: 1 },

    { id: 119, type: 2, name: "14cm連装砲", power: 4, accuracy: 2 },

    { id: 122, type: 1, name: "10cm高角砲+高射装置", power: 3, accuracy: 1 },
    { id: 123, type: 2, name: "SKC34 20.3cm連装砲", power: 10, accuracy: 3 },
    { id: 124, type: 15, name: "FuMo25 レーダー", power: 3, accuracy: 10 },

    { id: 128, type: 3, name: "試製51cm連装砲", power: 30, accuracy: 1 },
    { id: 129, type: 28, name: "熟練見張員", accuracy: 2 },
    { id: 130, type: 4, name: "12.7cm高角砲 + 高射装置", power: 1, accuracy: 1 },
    { id: 131, type: 18, name: "25mm三連装機銃 集中配備" },

    { id: 133, type: 3, name: "381mm/50 三連装砲", power: 20, accuracy: -3 },
    { id: 134, type: 4, name: "OTO 152mm三連装速射砲", power: 8, accuracy: 1 },
    { id: 135, type: 4, name: "90mm単装高角砲", power: 1, accuracy: 1 },

    { id: 137, type: 3, name: "381mm/50 三連装砲改", power: 21, accuracy: -1 },

    { id: 139, type: 2, name: "15.2cm連装砲改", power: 6, accuracy: 4 },

    { id: 141, type: 15, name: "32号対水上電探改", accuracy: 9 },
    { id: 142, type: 15, name: "15m二重測距儀 + 21号電探改二", power: 1, accuracy: 9 },
    { id: 143, type: 8, name: "九七式艦攻(村田隊)", torp: 12, accuracy: 2 },
    { id: 144, type: 8, name: "天山一二型(村田隊)", torp: 15, accuracy: 2 },

    { id: 147, type: 1, name: "120mm連装砲", power: 3, accuracy: 1 },
    { id: 148, type: 9, name: "試製南山", bomb: 11 },

    { id: 154, type: 9, name: "零戦62型(爆戦/岩井隊)", bomb: 4, accuracy: 1 },

    { id: 160, type: 4, name: "10.5cm連装砲", power: 3, accuracy: 2 },
    { id: 161, type: 3, name: "16inch三連装砲 Mk.7", power: 24, accuracy: 4 },
    { id: 162, type: 2, name: "203mm/53連装砲", power: 9, accuracy: -2 },

    { id: 172, type: 4, name: "5inch連装砲 Mk.28 mod.2", power: 4, accuracy: 2 },
    { id: 173, type: 18, name: "Bofors 40mm四連装機関砲", power: 1, accuracy: 1 },

    { id: 183, type: 3, name: "16inch三連装砲 Mk.7 + GFCS", power: 24, accuracy: 7 },

    { id: 188, type: 8, name: "Re2001 G改", power: 3, torp: 4 },

    { id: 190, type: 3, name: "38.1cm Mk.I連装砲", power: 18, accuracy: 1 },
    { id: 191, type: 18, name: "QF 2ポンド8連装ポンポン砲", power: 1 },
    { id: 192, type: 3, name: "38.1cm Mk.I/N連装砲改", power: 19, accuracy: 2 },

    { id: 195, type: 9, name: "SBD", power: 1, bomb: 6, accuracy: 1 },
    { id: 196, type: 8, name: "TBD", power: 1, torp: 5 },

    { id: 199, type: 10, name: "噴式景雲改", bomb: 15, accuracy: 1 },
    { id: 200, type: 10, name: "橘花改", bomb: 11 },

    { id: 219, type: 9, name: "零式艦戦63型(爆戦)", bomb: 5 },
    { id: 220, type: 4, name: "8cm高角砲改 + 増設機銃", power: 1, accuracy: 2 },

    { id: 229, type: 1, name: "12.7cm単装高角砲(後期型)", power: 1, accuracy: 1 },

    { id: 231, type: 3, name: "30.5cm三連装砲", power: 16, accuracy: 1 },
    { id: 232, type: 3, name: "30.5cm三連装砲改", power: 17, accuracy: 3 },
    { id: 233, type: 9, name: "F4U-1F", power: 1, bomb: 7 },
    { id: 234, type: 4, name: "15.5cm三連装副砲改", power: 7, accuracy: 4 },
    { id: 235, type: 2, name: "15.5cm三連装砲改", power: 7, accuracy: 3 },
    { id: 236, type: 3, name: "41cm三連装砲改", power: 22, accuracy: 4 },

    { id: 240, type: 14, name: "22号対水上電探改四(後期調整型)", power: 1, accuracy: 9 },

    { id: 242, type: 8, name: "Swordfish", power: 2, torp: 3, accuracy: 1 },
    { id: 243, type: 8, name: "Swordfish Mk.II(熟練)", power: 3, torp: 5, accuracy: 3 },
    { id: 244, type: 8, name: "Swordfish Mk.III(熟練)", power: 4, torp: 8, accuracy: 4 },
    { id: 245, type: 3, name: "38cm四連装砲", power: 21, accuracy: 1 },
    { id: 246, type: 3, name: "38cm四連装砲改", power: 22, accuracy: 3 },
    { id: 247, type: 4, name: "15.2cm三連装砲", power: 6, accuracy: 3 },
    { id: 248, type: 9, name: "Skua", bomb: 4 },

    { id: 256, type: 8, name: "TBF", power: 2, torp: 9 },
    { id: 257, type: 8, name: "TBM-3D", power: 2, torp: 9, accuracy: 2 },

    { id: 266, type: 1, name: "12.7cm連装砲C型改二", power: 3, accuracy: 1 },
    { id: 267, type: 1, name: "12.7cm連装砲D型改二", power: 3, accuracy: 2 },

    { id: 274, type: 18, name: "12cm30連装噴進砲改二", accuracy: 1 },
    { id: 275, type: 4, name: "10cm連装高角砲改 + 増設機銃", power: 2, accuracy: 2 },
    { id: 276, type: 3, name: "46cm三連装砲改", power: 27, accuracy: 2 },
    { id: 277, type: 9, name: "FM-2", power: 2, bomb: 2, accuracy: 2 },
    { id: 278, type: 15, name: "SKレーダー", accuracy: 1 },
    { id: 279, type: 15, name: "SK + SGレーダー", power: 1, accuracy: 4 },
    { id: 280, type: 1, name: "QF 4.7inch砲 Mk.XII改", power: 3, accuracy: 1 },
    { id: 281, type: 3, name: "51cm連装砲", power: 32, accuracy: 1 },
    { id: 282, type: 1, name: "130m B-13連装砲", power: 4 },

    { id: 284, type: 1, name: "5inch単装砲 Mk.30", power: 2, accuracy: 1 },

    { id: 289, type: 3, name: "35.6cn三連装砲改(ダズル迷彩仕様)", power: 19, accuracy: 3 },
    { id: 290, type: 3, name: "41cm三連装砲改二", power: 23, accuracy: 5 },
    { id: 291, type: 9, name: "彗星二二型(六三四空)", bomb: 11, accuracy: 2 },
    { id: 292, type: 9, name: "彗星二二型(六三四空/熟練)", bomb: 12, accuracy: 3 },
    { id: 293, type: 1, name: "12cm単装砲改二", power: 1, accuracy: 1 },
    { id: 294, type: 1, name: "12.7cm連装砲A型改二", power: 2, accuracy: 1 },
    { id: 295, type: 1, name: "12.7cm連装砲A型改三(戦時改修) + 高射装置", power: 2, accuracy: 1 },
    { id: 296, type: 1, name: "12.7cm連装砲B型改四(戦時改修) + 高射装置", power: 3, accuracy: 1 },
    { id: 297, type: 1, name: "12.7cm連装砲A型", power: 2 },
    { id: 298, type: 3, name: "16inch Mk.I三連装砲", power: 21, accuracy: 2 },
    { id: 299, type: 3, name: "16inch Mk.I三連装砲 + AFCT改", power: 22, accuracy: 4 },
    { id: 300, type: 3, name: "16inch Mk.I三連装砲改 + FCR type284", power: 23, accuracy: 6 },
    { id: 301, type: 18, name: "20連装7inch UP Rocket Launchers" },
    { id: 302, type: 8, name: "九七式艦攻(九三一空/熟練)", torp: 8, accuracy: 2 },
    { id: 303, type: 2, name: "Bofors15.2cm連装砲 Model1930", power: 5, accuracy: 3 },

    { id: 305, type: 9, name: "Ju87C改二(KMX搭載機)", bomb: 9, accuracy: 2 },
    { id: 306, type: 9, name: "Ju87C改二(KMX搭載機/熟練)", bomb: 10, accuracy: 3 },
    { id: 307, type: 14, name: "GFCS Mk.37", power: 2, accuracy: 9 },
    { id: 308, type: 1, name: "5inch単装砲 Mk.30改 + GFCS Mk.37", power: 3, accuracy: 6 },

    { id: 310, type: 2, name: "14cm連装砲改", power: 5, accuracy: 3 },

    { id: 313, type: 1, name: "5inch単装速射砲 Mk.30改", power: 3, accuracy: 2 },

    { id: 315, type: 14, name: "SGレーダー(初期型)", power: 1, accuracy: 8 },
    { id: 316, type: 9, name: "Re.2001 CB改", power: 3, bomb: 6, accuracy: 1 },
    { id: 317, type: 17, name: "三式弾改", power: 3, accuracy: 1 },
    { id: 318, type: 3, name: "41cm連装砲改二", power: 21, accuracy: 5 },
    { id: 319, type: 9, name: "彗星一二型(六三四空/三号爆弾搭載機)", bomb: 12, accuracy: 1 },
    { id: 320, type: 9, name: "彗星一二型(三一号光電管爆弾搭載機)", bomb: 11, accuracy: 5 },

    { id: 328, type: 3, name: "35.6cm連装砲改", power: 16, accuracy: 3 },
    { id: 329, type: 3, name: "35.6cm連装砲改二", power: 17, accuracy: 5 },
    { id: 330, type: 3, name: "16inch Mk.I連装砲", power: 20, accuracy: 1 },
    { id: 331, type: 3, name: "16inch Mk.V連装砲", power: 21, accuracy: 2 },
    { id: 332, type: 3, name: "16inch Mk.VIII連装砲改", power: 21, accuracy: 4 },

    { id: 340, type: 2, name: "152mm/55 三連装速射砲", power: 8, accuracy: 1 },
    { id: 341, type: 2, name: "152mm/55 三連装速射砲改", power: 9, accuracy: 2 },
    { id: 342, type: 8, name: "流星改(一航戦)", torp: 14, accuracy: 1 },
    { id: 343, type: 8, name: "流星改(一航戦/熟練)", torp: 15, accuracy: 2 },
    { id: 344, type: 8, name: "九七式艦攻改 試製三号戊型(空六号電探改装備機)", torp: 7, accuracy: 1 },
    { id: 345, type: 8, name: "九七式艦攻改(熟練)試製三号戊型(空六号電探改装備機)", torp: 9, accuracy: 2 },

    { id: 356, type: 2, name: "8inch三連装砲 Mk.9", power: 11 },
    { id: 357, type: 2, name: "8inch三連装砲 Mk.9 mod.2", power: 12, accuracy: 1 },
    { id: 358, type: 4, name: "5inch 単装高角砲群", power: 2, accuracy: 1 },
    { id: 359, type: 2, name: "6inch連装速射砲 Mk.XXI", power: 5, accuracy: 2 },
    { id: 360, type: 2, name: "Bofors 15cm連装速射砲 Mk.9 Model 1938", power: 6, accuracy: 3 },
    { id: 361, type: 2, name: "Bofors 15cm連装速射砲 Mk.9改 + 単装速射砲 Mk.10改 Model 1938", power: 7, accuracy: 3 },
    { id: 362, type: 2, name: "5inch連装両用砲(集中配備)", power: 5, accuracy: 2 },
    { id: 363, type: 2, name: "GFCS Mk.37 + 5inch連装両用砲(集中配備)", power: 6, accuracy: 6 },

    { id: 365, type: 16, name: "一式徹甲弾改", power: 11, accuracy: 2 },
    { id: 366, type: 1, name: "12.7cm連装砲D型改三", power: 3, accuracy: 2 },

    //{id: , type: , name: "", power: , torp: , accuracy: },

];

const ENEMY_DATA = [
    {
        type: 5, name: "イ級", main_id: 1501, remodel: [
            { id: 1501, state: "normal", luck: 1, avoidance: 14, avoidance_item: 0, armor: 5, hp: 20 },
            { id: 1514, state: "elite", luck: 10, avoidance: 30, avoidance_item: 0, armor: 12, hp: 30 },
            { id: 1564, state: "flagship", luck: 30, avoidance: 60, avoidance_item: 3, armor: 24, hp: 39 },
        ]
    },
    {
        type: 5, name: "イ級後期型", main_id: 1575, remodel: [
            { id: 1575, state: "normal", luck: 30, avoidance: 48, avoidance_item: 0, armor: 22, hp: 35 },
            { id: 1621, state: "elite", luck: 50, avoidance: 65, avoidance_item: 0, armor: 30, hp: 39 },
        ]
    },
    {
        type: 5, name: "ロ級", main_id: 1502, remodel: [
            { id: 1502, state: "normal", luck: 1, avoidance: 15, avoidance_item: 0, armor: 6, hp: 22 },
            { id: 1515, state: "elite", luck: 10, avoidance: 30, avoidance_item: 0, armor: 14, hp: 35 },
            { id: 1552, state: "flagship", luck: 20, avoidance: 52, avoidance_item: 0, armor: 24, hp: 43 },
        ]
    },
    {
        type: 5, name: "ロ級後期型", main_id: 1576, remodel: [
            { id: 1576, state: "normal", luck: 36, avoidance: 52, avoidance_item: 0, armor: 26, hp: 37 },
            { id: 1622, state: "elite", luck: 60, avoidance: 70, avoidance_item: 3, armor: 36, hp: 43 },
        ]
    },
    {
        type: 5, name: "ハ級", main_id: 1503, remodel: [
            { id: 1503, state: "normal", luck: 1, avoidance: 16, avoidance_item: 0, armor: 7, hp: 24 },
            { id: 1516, state: "elite", luck: 10, avoidance: 35, avoidance_item: 0, armor: 16, hp: 40 },
            { id: 1553, state: "flagship", luck: 20, avoidance: 54, avoidance_item: 0, armor: 27, hp: 47 },
        ]
    },
    {
        type: 5, name: "ハ級後期型", main_id: 1577, remodel: [
            { id: 1577, state: "normal", luck: 42, avoidance: 56, avoidance_item: 0, armor: 29, hp: 38 },
            { id: 1623, state: "elite", luck: 60, avoidance: 73, avoidance_item: 3, armor: 36, hp: 46 },
        ]
    },
    {
        type: 5, name: "ニ級", main_id: 1504, remodel: [
            { id: 1504, state: "normal", luck: 5, avoidance: 18, avoidance_item: 0, armor: 9, hp: 28 },
            { id: 1517, state: "elite", luck: 10, avoidance: 35, avoidance_item: 0, armor: 18, hp: 45 },
        ]
    },
    {
        type: 5, name: "ニ級後期型", main_id: 1578, remodel: [
            { id: 1578, state: "normal", luck: 48, avoidance: 66, avoidance_item: 0, armor: 33, hp: 40 },
            { id: 1624, state: "elite", luck: 80, avoidance: 80, avoidance_item: 3, armor: 48, hp: 49 },
        ]
    },
    {
        type: 5, name: "ニ級改", main_id: 1858, remodel: [
            { id: 1858, state: "normal", luck: 0, avoidance: 0, avoidance_item: 0, armor: 19, hp: 39 },
        ]
    },
    {
        type: 5, name: "ニ級改後期型", main_id: 1859, remodel: [
            { id: 1859, state: "normal", luck: 0, avoidance: 0, avoidance_item: 0, armor: 39, hp: 49 },
            { id: 1860, state: "elite", luck: 0, avoidance: 0, avoidance_item: 0, armor: 49, hp: 49 },
            { id: 1861, state: "flagship", luck: 0, avoidance: 0, avoidance_item: 0, armor: 59, hp: 49 },
        ]
    },
    {
        type: 5, name: "ナ級", main_id: 1739, remodel: [
            { id: 1739, state: "normal", luck: 0, avoidance: 0, avoidance_item: 0, armor: 51, hp: 60 },
            { id: 1740, state: "elite", luck: 0, avoidance: 0, avoidance_item: 0, armor: 55, hp: 63 },
            { id: 1741, state: "flagship", luck: 0, avoidance: 0, avoidance_item: 0, armor: 59, hp: 66 },
        ]
    },
    {
        type: 5, name: "ナ級後期型", main_id: 1742, remodel: [
            { id: 1742, state: "normal", luck: 0, avoidance: 0, avoidance_item: 0, armor: 59, hp: 63 },
            { id: 1743, state: "elite", luck: 0, avoidance: 0, avoidance_item: 0, armor: 63, hp: 66 },
            { id: 1744, state: "flagship", luck: 0, avoidance: 0, avoidance_item: 0, armor: 69, hp: 69 },
        ]
    },
    {
        type: 4, name: "ホ級", main_id: 1505, remodel: [
            { id: 1505, state: "normal", luck: 1, avoidance: 15, avoidance_item: 0, armor: 15, hp: 33 },
            { id: 1518, state: "elite", luck: 10, avoidance: 24, avoidance_item: 0, armor: 30, hp: 48 },
            { id: 1554, state: "flagship", luck: 20, avoidance: 44, avoidance_item: 0, armor: 36, hp: 53 },
        ]
    },
    {
        type: 4, name: "ヘ級", main_id: 1506, remodel: [
            { id: 1506, state: "normal", luck: 1, avoidance: 15, avoidance_item: 0, armor: 18, hp: 36 },
            { id: 1519, state: "elite", luck: 10, avoidance: 24, avoidance_item: 0, armor: 32, hp: 52 },
            { id: 1555, state: "flagship", luck: 20, avoidance: 46, avoidance_item: 0, armor: 39, hp: 57 },
        ]
    },
    {
        type: 4, name: "ヘ級改", main_id: 1904, remodel: [
            { id: 1904, state: "flagship(A)", luck: 0, avoidance: 0, avoidance_item: 0, armor: 69, hp: 115 },
            { id: 1905, state: "flagship(B)", luck: 0, avoidance: 0, avoidance_item: 0, armor: 89, hp: 150 },

        ]
    },
    {
        type: 4, name: "ト級", main_id: 1507, remodel: [
            { id: 1507, state: "normal", luck: 5, avoidance: 15, avoidance_item: 0, armor: 20, hp: 39 },
            { id: 1520, state: "elite", luck: 10, avoidance: 28, avoidance_item: 0, armor: 36, hp: 55 },
        ]
    },
    {
        type: 4, name: "チ級", main_id: 1508, remodel: [
            { id: 1508, state: "normal", luck: 5, avoidance: 18, avoidance_item: 0, armor: 22, hp: 48 },
            { id: 1521, state: "elite", luck: 10, avoidance: 30, avoidance_item: 0, armor: 34, hp: 50 },
            { id: 1559, state: "flagship", luck: 30, avoidance: 55, avoidance_item: 0, armor: 60, hp: 70 },
        ]
    },
    {
        type: 4, name: "ツ級", main_id: 1591, remodel: [
            { id: 1591, state: "normal", luck: 55, avoidance: 69, avoidance_item: 0, armor: 28, hp: 58 },
            { id: 1592, state: "elite", luck: 66, avoidance: 74, avoidance_item: 0, armor: 68, hp: 66 },
            { id: 1862, state: "flagship", luck: 0, avoidance: 0, avoidance_item: 0, armor: 108, hp: 130 },
        ]
    },
    {
        type: 3, name: "リ級", main_id: 1509, remodel: [
            { id: 1509, state: "normal", luck: 1, avoidance: 12, avoidance_item: 0, armor: 22, hp: 48 },
            { id: 1522, state: "elite", luck: 10, avoidance: 20, avoidance_item: 0, armor: 60, hp: 60 },
            { id: 1527, state: "flagship", luck: 20, avoidance: 50, avoidance_item: 0, armor: 70, hp: 76 },
        ]
    },
    {
        type: 3, name: "リ級改", main_id: 1566, remodel: [
            { id: 1566, state: "flagship", luck: 40, avoidance: 57, avoidance_item: 0, armor: 80, hp: 88 },
        ]
    },
    {
        type: 3, name: "ネ級", main_id: 1594, remodel: [
            { id: 1594, state: "normal", luck: 60, avoidance: 60, avoidance_item: 0, armor: 82, hp: 80 },
            { id: 1595, state: "elite", luck: 70, avoidance: 68, avoidance_item: 0, armor: 89, hp: 88 },
            { id: 1761, state: "flagship", luck: 0, avoidance: 0, avoidance_item: 0, armor: 112, hp: 220 },
        ]
    },
    {
        type: 3, name: "ネ級改", main_id: 1895, remodel: [
            { id: 1895, state: "normal", luck: 0, avoidance: 0, avoidance_item: 0, armor: 144, hp: 330 },
        ]
    },
    {
        type: 1, name: "ル級", main_id: 1511, remodel: [
            { id: 1511, state: "normal", luck: 5, avoidance: 3, avoidance_item: 0, armor: 70, hp: 90 },
            { id: 1524, state: "elite", luck: 10, avoidance: 16, avoidance_item: 0, armor: 85, hp: 90 },
            { id: 1529, state: "flagship", luck: 20, avoidance: 40, avoidance_item: 0, armor: 99, hp: 98 },
        ]
    },
    {
        type: 1, name: "ル級改", main_id: 1567, remodel: [
            { id: 1567, state: "flagship", luck: 50, avoidance: 43, avoidance_item: 0, armor: 110, hp: 130 },
        ]
    },
    {
        type: 1, name: "タ級", main_id: 1541, remodel: [
            { id: 1541, state: "normal", luck: 10, avoidance: 20, avoidance_item: 0, armor: 80, hp: 84 },
            { id: 1542, state: "elite", luck: 20, avoidance: 40, avoidance_item: 0, armor: 88, hp: 88 },
            { id: 1543, state: "flagship", luck: 30, avoidance: 55, avoidance_item: 0, armor: 96, hp: 90 },
        ]
    },
    {
        type: 1, name: "レ級", main_id: 1561, remodel: [
            { id: 1561, state: "normal", luck: 60, avoidance: 45, avoidance_item: 0, armor: 110, hp: 180 },
            { id: 1562, state: "elite", luck: 70, avoidance: 50, avoidance_item: 0, armor: 130, hp: 270 },
        ]
    },
    {
        type: 1, name: "南方棲戦姫", main_id: 1548, remodel: [
            { id: 1548, state: "normal", luck: 50, avoidance: 30, avoidance_item: 3, armor: 188, hp: 380 },
        ]
    },
    {
        type: 2, name: "ヌ級", main_id: 1510, remodel: [
            { id: 1510, state: "normal", luck: 1, avoidance: 3, avoidance_item: 0, armor: 25, hp: 65 },
            { id: 1523, state: "elite", luck: 10, avoidance: 10, avoidance_item: 0, armor: 35, hp: 70 },
            { id: 1560, state: "flagship", luck: 30, avoidance: 40, avoidance_item: 0, armor: 70, hp: 84 },
        ]
    },
    {
        type: 2, name: "ヌ級改", main_id: 1523, remodel: [
            { id: 1523, state: "normal", luck: 0, avoidance: 0, avoidance_item: 0, armor: 25, hp: 65 },
            { id: 1560, state: "elite", luck: 0, avoidance: 0, avoidance_item: 0, armor: 93, hp: 118 },
        ]
    },
    {
        type: 2, name: "ヲ級", main_id: 1512, remodel: [
            { id: 1512, state: "normal", luck: 1, avoidance: 3, avoidance_item: 0, armor: 40, hp: 85 },
            { id: 1525, state: "elite", luck: 10, avoidance: 12, avoidance_item: 0, armor: 55, hp: 88 },
            { id: 1528, state: "flagship", luck: 20, avoidance: 45, avoidance_item: 0, armor: 80, hp: 96 },
        ]
    },
    {
        type: 2, name: "ヲ級改", main_id: 1565, remodel: [
            { id: 1565, state: "flagship", luck: 30, avoidance: 50, avoidance_item: 0, armor: 120, hp: 160 },
        ]
    },
    {
        type: 2, name: "空母棲姫", main_id: 1586, remodel: [
            { id: 1586, state: "A", luck: 70, avoidance: 53, avoidance_item: 2, armor: 150, hp: 350 },
            { id: 1781, state: "B", luck: 0, avoidance: 0, avoidance_item: 0, armor: 180, hp: 350 },
            { id: 1782, state: "C", luck: 0, avoidance: 0, avoidance_item: 0, armor: 220, hp: 350 },
        ]
    },
    {
        type: 8, name: "ワ級", main_id: 1513, remodel: [
            { id: 1513, state: "normal", luck: 1, avoidance: 1, avoidance_item: 0, armor: 10, hp: 70 },
            { id: 1526, state: "elite", luck: 10, avoidance: 6, avoidance_item: 0, armor: 35, hp: 80 },
            { id: 1558, state: "flagship", luck: 20, avoidance: 10, avoidance_item: 0, armor: 65, hp: 130 },
        ]
    },
    {
        type: 8, name: "護衛要塞", main_id: 1549, remodel: [
            { id: 1549, state: "normal", luck: 1, avoidance: 5, avoidance_item: 0, armor: 50, hp: 66 },
        ]
    },
]