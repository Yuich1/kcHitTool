const SHIP_TYPE = [
    { id: 1, name: "戦艦", type: "bb", canHaveItem: [2, 3, 4, 11, 14, 15, 16, 17, 18, 22, 24, 25, 26, 28] },
    { id: 2, name: "航空母艦", type: "cv", canHaveItem: [4, 7, 8, 9, 14, 15, 18, 22, 24, 25, 26, 27] },
    { id: 3, name: "重巡", type: "ca", canHaveItem: [2, 4, 5, 11, 14, 15, 17, 18, 22, 24, 25, 26, 28] },
    { id: 4, name: "軽巡", type: "cl", canHaveItem: [1, 2, 4, 5, 11, 14, 15, 18, 19, 20, 21, 24, 25, 26, 28] },
    { id: 5, name: "駆逐", type: "dd", canHaveItem: [1, 5, 14, 18, 19, 20, 21, 24, 25, 26, 28] },
    { id: 6, name: "海防", type: "de", canHaveItem: [1, 5, 14, 18, 19, 20, 21, 26, 28] },
    { id: 7, name: "潜水", type: "ss", canHaveItem: [5, 6, 19, 24, 25, 26] },
    { id: 8, name: "補助艦艇", type: "av", canHaveItem: [26] },
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
            { id: 78, state: "未改造", power: 89, torp: 0, luck: 12, slot: 3, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 209, state: "改", power: 94, torp: 0, luck: 12, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 149, state: "改二", power: 98, torp: 0, luck: 15, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 591, state: "改二丙", power: 99, torp: 44, luck: 18, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] }
        ]
    },
    {
        type: 1, name: "比叡", main_id: 592, speed: "high", remodel: [
            { id: 86, state: "未改造", power: 89, torp: 0, luck: 10, slot: 3, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 210, state: "改", power: 94, torp: 0, luck: 12, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 150, state: "改二", power: 99, torp: 0, luck: 13, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 592, state: "改二丙", power: 98, torp: 47, luck: 15, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] }
        ]
    },
    {
        type: 1, name: "榛名", main_id: 151, speed: "high", remodel: [
            { id: 79, state: "未改造", power: 89, torp: 0, luck: 15, slot: 3, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 211, state: "改", power: 94, torp: 0, luck: 20, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 151, state: "改二", power: 96, torp: 0, luck: 41, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] }
        ]
    },
    {
        type: 1, name: "霧島", main_id: 152, speed: "high", remodel: [
            { id: 85, state: "未改造", power: 89, torp: 0, luck: 10, slot: 3, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 212, state: "改", power: 94, torp: 0, luck: 12, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 152, state: "改二", power: 104, torp: 0, luck: 14, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] }
        ]
    },
    {
        type: 1, name: "扶桑", main_id: 411, speed: "low", remodel: [
            { id: 26, state: "未改造", power: 94, torp: 0, luck: 5, slot: 4, cantHaveItemId: [128, 281] },
            { id: 286, state: "改", power: 79, torp: 0, luck: 10, slot: 4, cantHaveItemId: [128, 281] },
            { id: 411, state: "改二", power: 99, torp: 0, luck: 13, slot: 4, cantHaveItemId: [128, 281] }
        ]
    },
    {
        type: 1, name: "山城", main_id: 412, speed: "low", remodel: [
            { id: 27, state: "未改造", power: 94, torp: 0, luck: 5, slot: 4, cantHaveItemId: [128, 281] },
            { id: 287, state: "改", power: 79, torp: 0, luck: 10, slot: 4, cantHaveItemId: [128, 281] },
            { id: 412, state: "改二", power: 98, torp: 0, luck: 14, slot: 4, cantHaveItemId: [128, 281] }
        ]
    },
    {
        type: 1, name: "伊勢", main_id: 553, speed: "low", remodel: [
            { id: 77, state: "未改造", power: 89, torp: 0, luck: 15, slot: 4, cantHaveItemId: [128, 281] },
            { id: 82, state: "改", power: 86, torp: 0, luck: 30, slot: 4, cantHaveItemId: [128, 281] },
            { id: 553, state: "改二", power: 88, torp: 0, luck: 40, slot: 5, specialCanHaveItemType: [9], cantHaveItemId: [128, 281] }
        ]
    },
    {
        type: 1, name: "日向", main_id: 554, speed: "low", remodel: [
            { id: 87, state: "未改造", power: 94, torp: 0, luck: 15, slot: 4, cantHaveItemId: [128, 281] },
            { id: 88, state: "改", power: 86, torp: 0, luck: 30, slot: 4, cantHaveItemId: [128, 281] },
            { id: 554, state: "改二", power: 86, torp: 0, luck: 40, slot: 5, specialCanHaveItemType: [9], cantHaveItemId: [128, 281] }
        ]
    },
    {
        type: 1, name: "長門", main_id: 541, speed: "low", remodel: [
            { id: 80, state: "未改造", power: 99, torp: 0, luck: 20, slot: 4, cantHaveItemId: [128, 281] },
            { id: 275, state: "改", power: 99, torp: 0, luck: 32, slot: 4 },
            { id: 541, state: "改二", power: 118, torp: 0, luck: 40, slot: 4, specialCanHaveItemType: [1] }
        ]
    },
    {
        type: 1, name: "陸奥", main_id: 573, speed: "low", remodel: [
            { id: 81, state: "未改造", power: 99, torp: 0, luck: 3, slot: 4, cantHaveItemId: [128, 281] },
            { id: 276, state: "改", power: 99, torp: 0, luck: 6, slot: 4 },
            { id: 573, state: "改二", power: 118, torp: 0, luck: 16, slot: 4 }
        ]
    },
    {
        type: 1, name: "大和", main_id: 136, speed: "low", remodel: [
            { id: 131, state: "未改造", power: 129, torp: 0, luck: 12, slot: 4 },
            { id: 136, state: "改", power: 139, torp: 0, luck: 13, slot: 4, expansionCanHaveItemId: [71, 275] }
        ]
    },
    {
        type: 1, name: "武蔵", main_id: 546, speed: "low", remodel: [
            { id: 143, state: "未改造", power: 129, torp: 0, luck: 10, slot: 4 },
            { id: 148, state: "改", power: 139, torp: 0, luck: 9, slot: 4, expansionCanHaveItemId: [71, 275] },
            { id: 546, state: "改二", power: 145, torp: 0, luck: 10, slot: 5, expansionCanHaveItemId: [71, 275] }
        ]
    },
    {
        type: 1, name: "Bismarck", main_id: 178, speed: "high", remodel: [
            { id: 171, state: "未改造", power: 88, torp: 0, luck: 8, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 172, state: "改", power: 93, torp: 0, luck: 10, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 173, state: "zwei", power: 97, torp: 0, luck: 20, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 178, state: "drie", power: 99, torp: 36, luck: 22, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] }
        ]
    },
    {
        type: 1, name: "Italia", main_id: 446, speed: "high", remodel: [
            { id: 441, state: "Littorio", power: 97, torp: 0, luck: 20, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 446, state: "Italia", power: 102, torp: 0, luck: 30, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
        ]
    },
    {
        type: 1, name: "Roma", main_id: 447, speed: "high", remodel: [
            { id: 442, state: "未改造", power: 98, torp: 0, luck: 6, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 447, state: "改", power: 105, torp: 0, luck: 8, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
        ]
    },
    {
        type: 1, name: "Iowa", main_id: 360, speed: "high", remodel: [
            { id: 440, state: "未改造", power: 150, torp: 0, luck: 35, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 360, state: "改", power: 115, torp: 0, luck: 40, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
        ]
    },
    {
        type: 1, name: "Colorado", main_id: 1496, speed: "low", remodel: [
            { id: 601, state: "未改造", power: 96, torp: 0, luck: 30, slot: 4, cantHaveItemId: [128, 281] },
            { id: 1496, state: "改", power: 105, torp: 0, luck: 40, slot: 4, cantHaveItemId: [128, 281] },
        ]
    },
    {
        type: 1, name: "Warspite", main_id: 364, speed: "low", remodel: [
            { id: 439, state: "未改造", power: 92, torp: 0, luck: 55, slot: 4, cantHaveItemId: [128, 281] },
            { id: 364, state: "改", power: 106, torp: 0, luck: 70, slot: 4, cantHaveItemId: [128, 281] },
        ]
    },
    {
        type: 1, name: "Nelson", main_id: 576, speed: "low", remodel: [
            { id: 571, state: "未改造", power: 102, torp: 0, luck: 24, slot: 4, cantHaveItemId: [128, 281] },
            { id: 576, state: "改", power: 114, torp: 0, luck: 28, slot: 4, cantHaveItemId: [128, 281] },
        ]
    },
    {
        type: 1, name: "Richelieu", main_id: 392, speed: "high", remodel: [
            { id: 492, state: "未改造", power: 94, torp: 0, luck: 22, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 392, state: "改", power: 96, torp: 0, luck: 24, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
        ]
    },
    {
        type: 1, name: "Гангут", main_id: 513, speed: "low", remodel: [
            { id: 511, state: "未改造", power: 78, torp: 28, luck: 20, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 512, state: "Октябрьская революция", power: 89, torp: 0, luck: 30, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
            { id: 513, state: "Гангут два", power: 90, torp: 32, luck: 35, slot: 4, cantHaveItemType: [2], cantHaveItemId: [128, 281] },
        ]
    },
    {
        type: 2, name: "赤城", main_id: 599, remodel: [
            { id: 83, state: "未改造", power: 39, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
            { id: 277, state: "改", power: 55, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
            { id: 594, state: "改二", power: 60, torp: 0, luck: 20, slot: 5, cantHaveItemId: [151] },
            { id: 599, state: "改二戊", power: 67, torp: 0, luck: 20, slot: 5, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "加賀", main_id: 278, remodel: [
            { id: 84, state: "未改造", power: 39, torp: 0, luck: 10, slot: 4, cantHaveItemId: [151] },
            { id: 278, state: "改", power: 50, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "蒼龍", main_id: 197, remodel: [
            { id: 90, state: "未改造", power: 29, torp: 0, luck: 10, slot: 4, cantHaveItemId: [151] },
            { id: 279, state: "改", power: 39, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
            { id: 197, state: "改二", power: 62, torp: 0, luck: 15, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "飛龍", main_id: 196, remodel: [
            { id: 91, state: "未改造", power: 29, torp: 0, luck: 35, slot: 4, cantHaveItemId: [151] },
            { id: 280, state: "改", power: 39, torp: 0, luck: 40, slot: 4, cantHaveItemId: [151] },
            { id: 196, state: "改二", power: 65, torp: 0, luck: 50, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "翔鶴", main_id: 466, remodel: [
            { id: 110, state: "未改造", power: 39, torp: 0, luck: 10, slot: 4, cantHaveItemId: [151] },
            { id: 288, state: "改", power: 39, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
            { id: 461, state: "改二", power: 63, torp: 0, luck: 20, slot: 4, cantHaveItemId: [151] },
            { id: 466, state: "改二甲", power: 70, torp: 0, luck: 20, slot: 4, specialCanHaveItemType: [10] },
        ]
    },
    {
        type: 2, name: "瑞鶴", main_id: 467, remodel: [
            { id: 111, state: "未改造", power: 39, torp: 0, luck: 40, slot: 4, cantHaveItemId: [151] },
            { id: 112, state: "改", power: 39, torp: 0, luck: 42, slot: 4, cantHaveItemId: [151] },
            { id: 462, state: "改二", power: 56, torp: 0, luck: 50, slot: 4, cantHaveItemId: [151] },
            { id: 467, state: "改二甲", power: 65, torp: 0, luck: 50, slot: 4, specialCanHaveItemType: [10] },
        ]
    },
    {
        type: 2, name: "雲龍", main_id: 406, remodel: [
            { id: 404, state: "未改造", power: 27, torp: 0, luck: 10, slot: 4, cantHaveItemId: [151] },
            { id: 406, state: "改", power: 48, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "天城", main_id: 429, remodel: [
            { id: 331, state: "未改造", power: 25, torp: 0, luck: 13, slot: 4, cantHaveItemId: [151] },
            { id: 429, state: "改", power: 45, torp: 0, luck: 17, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "葛城", main_id: 430, remodel: [
            { id: 332, state: "未改造", power: 25, torp: 0, luck: 20, slot: 4, cantHaveItemId: [151] },
            { id: 430, state: "改", power: 45, torp: 0, luck: 30, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "大鳳", main_id: 156, remodel: [
            { id: 153, state: "未改造", power: 49, torp: 0, luck: 2, slot: 4, expansionCanHaveItemId: [71, 275] },
            { id: 156, state: "改", power: 59, torp: 0, luck: 4, slot: 4, expansionCanHaveItemId: [71, 275] },
        ]
    },
    {
        type: 2, name: "鳳翔", main_id: 285, remodel: [
            { id: 89, state: "未改造", power: 19, torp: 0, luck: 20, slot: 2, cantHaveItemId: [151] },
            { id: 285, state: "改", power: 29, torp: 0, luck: 30, slot: 3, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "龍驤", main_id: 157, remodel: [
            { id: 76, state: "未改造", power: 19, torp: 0, luck: 10, slot: 3, cantHaveItemId: [151] },
            { id: 281, state: "改", power: 29, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
            { id: 157, state: "改", power: 40, torp: 0, luck: 15, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "龍鳳", main_id: 318, remodel: [
            { id: 185, state: "未改造", power: 20, torp: 0, luck: 20, slot: 3, cantHaveItemId: [151] },
            { id: 318, state: "改", power: 32, torp: 0, luck: 24, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "祥鳳", main_id: 282, remodel: [
            { id: 74, state: "未改造", power: 19, torp: 0, luck: 10, slot: 3, cantHaveItemId: [151] },
            { id: 282, state: "改", power: 29, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "瑞鳳", main_id: 560, remodel: [
            { id: 116, state: "未改造", power: 19, torp: 0, luck: 30, slot: 3, cantHaveItemId: [151] },
            { id: 117, state: "改", power: 29, torp: 0, luck: 40, slot: 4, cantHaveItemId: [151] },
            { id: 555, state: "改二", power: 46, torp: 0, luck: 42, slot: 4, cantHaveItemId: [151] },
            { id: 560, state: "改二乙", power: 48, torp: 0, luck: 42, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "飛鷹", main_id: 283, remodel: [
            { id: 75, state: "未改造", power: 19, torp: 0, luck: 10, slot: 4, cantHaveItemId: [151] },
            { id: 283, state: "改", power: 29, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "隼鷹", main_id: 408, remodel: [
            { id: 92, state: "未改造", power: 19, torp: 0, luck: 20, slot: 4, cantHaveItemId: [151] },
            { id: 284, state: "改", power: 29, torp: 0, luck: 30, slot: 4, cantHaveItemId: [151] },
            { id: 408, state: "改二", power: 40, torp: 0, luck: 41, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "千歳", main_id: 296, remodel: [
            { id: 108, state: "航", power: 19, torp: 0, luck: 10, slot: 3, cantHaveItemId: [151] },
            { id: 291, state: "航改", power: 34, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
            { id: 296, state: "航改二", power: 34, torp: 0, luck: 13, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "千代田", main_id: 297, remodel: [
            { id: 109, state: "航", power: 19, torp: 0, luck: 10, slot: 3, cantHaveItemId: [151] },
            { id: 292, state: "航改", power: 34, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151] },
            { id: 297, state: "航改二", power: 34, torp: 0, luck: 13, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "大鷹", main_id: 529, remodel: [
            { id: 521, state: "春日丸", power: 9, torp: 0, luck: 5, slot: 2, cantHaveItemId: [151] },
            { id: 526, state: "無改造", power: 12, torp: 0, luck: 6, slot: 3, cantHaveItemId: [151] },
            { id: 380, state: "改", power: 23, torp: 0, luck: 9, slot: 4, cantHaveItemId: [151] },
            { id: 529, state: "改二", power: 39, torp: 0, luck: 14, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "神鷹", main_id: 536, remodel: [
            { id: 534, state: "無改造", power: 14, torp: 0, luck: 9, slot: 3, cantHaveItemId: [151] },
            { id: 381, state: "改", power: 24, torp: 0, luck: 11, slot: 4, cantHaveItemId: [151] },
            { id: 536, state: "改二", power: 37, torp: 0, luck: 15, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "鈴谷", main_id: 508, remodel: [
            { id: 508, state: "航改二", power: 56, torp: 0, luck: 13, slot: 4, cantHaveItemId: [151], expansionCanHaveItemId: [66, 220] },
        ]
    },
    {
        type: 2, name: "熊野", main_id: 509, remodel: [
            { id: 509, state: "航改二", power: 55, torp: 0, luck: 12, slot: 4, cantHaveItemId: [151], expansionCanHaveItemId: [66, 220] },
        ]
    },
    {
        type: 2, name: "Graf Zeppelin", main_id: 353, remodel: [
            { id: 432, state: "未改造", power: 40, torp: 0, luck: 4, slot: 3, cantHaveItemId: [151] },
            { id: 353, state: "改", power: 50, torp: 0, luck: 7, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "Aquila", main_id: 365, remodel: [
            { id: 444, state: "未改造", power: 14, torp: 0, luck: 5, slot: 3, cantHaveItemId: [151] },
            { id: 365, state: "改", power: 28, torp: 0, luck: 7, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "Saratoga", main_id: 550, remodel: [
            { id: 433, state: "無改造", power: 45, torp: 0, luck: 25, slot: 4, cantHaveItemId: [151] },
            { id: 438, state: "改", power: 53, torp: 0, luck: 35, slot: 4, cantHaveItemId: [151] },
            { id: 545, state: "Mk.II", power: 68, torp: 0, luck: 40, slot: 4, cantHaveItemId: [151] },
            { id: 550, state: "Mod.2", power: 58, torp: 0, luck: 40, slot: 4 },
        ]
    },
    {
        type: 2, name: "Intrepid", main_id: 397, remodel: [
            { id: 549, state: "未改造", power: 55, torp: 0, luck: 45, slot: 4, cantHaveItemId: [151] },
            { id: 397, state: "改", power: 58, torp: 0, luck: 50, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "Gambier Bay", main_id: 396, remodel: [
            { id: 544, state: "未改造", power: 15, torp: 0, luck: 12, slot: 2, cantHaveItemId: [151] },
            { id: 396, state: "改", power: 32, torp: 0, luck: 15, slot: 3, cantHaveItemId: [151] },
        ]
    },
    {
        type: 2, name: "Ark Royal", main_id: 393, remodel: [
            { id: 515, state: "未改造", power: 27, torp: 0, luck: 8, slot: 4, cantHaveItemId: [151] },
            { id: 393, state: "改", power: 50, torp: 0, luck: 13, slot: 4, cantHaveItemId: [151] },
        ]
    },
    {
        type: 3, name: "古鷹", main_id: 416, remodel: [
            { id: 59, state: "未改造", power: 54, torp: 59, luck: 10, slot: 3 },
            { id: 262, state: "改", power: 70, torp: 59, luck: 10, slot: 4 },
            { id: 416, state: "改二", power: 77, torp: 75, luck: 14, slot: 4 },
        ]
    },
    {
        type: 3, name: "加古", main_id: 417, remodel: [
            { id: 60, state: "未改造", power: 49, torp: 49, luck: 10, slot: 3 },
            { id: 263, state: "改", power: 70, torp: 59, luck: 10, slot: 4 },
            { id: 417, state: "改二", power: 78, torp: 77, luck: 12, slot: 4 },
        ]
    },
    {
        type: 3, name: "青葉", main_id: 264, remodel: [
            { id: 61, state: "未改造", power: 54, torp: 59, luck: 20, slot: 3 },
            { id: 264, state: "改", power: 72, torp: 59, luck: 30, slot: 4 },
        ]
    },
    {
        type: 3, name: "衣笠", main_id: 142, remodel: [
            { id: 123, state: "未改造", power: 54, torp: 59, luck: 20, slot: 3 },
            { id: 295, state: "改", power: 66, torp: 59, luck: 10, slot: 4 },
            { id: 142, state: "改二", power: 78, torp: 74, luck: 13, slot: 4 },
        ]
    },
    {
        type: 3, name: "妙高", main_id: 319, remodel: [
            { id: 62, state: "未改造", power: 59, torp: 59, luck: 10, slot: 3 },
            { id: 265, state: "改", power: 76, torp: 79, luck: 10, slot: 4 },
            { id: 319, state: "改二", power: 80, torp: 88, luck: 32, slot: 4 },
        ]
    },
    {
        type: 3, name: "那智", main_id: 192, remodel: [
            { id: 63, state: "未改造", power: 54, torp: 49, luck: 10, slot: 3 },
            { id: 266, state: "改", power: 76, torp: 69, luck: 10, slot: 4 },
            { id: 192, state: "改二", power: 80, torp: 84, luck: 18, slot: 4 },
        ]
    },
    {
        type: 3, name: "足柄", main_id: 193, remodel: [
            { id: 64, state: "未改造", power: 54, torp: 49, luck: 10, slot: 3 },
            { id: 267, state: "改", power: 77, torp: 69, luck: 10, slot: 4 },
            { id: 193, state: "改二", power: 82, torp: 84, luck: 20, slot: 4 },
        ]
    },
    {
        type: 3, name: "羽黒", main_id: 194, remodel: [
            { id: 65, state: "未改造", power: 54, torp: 49, luck: 10, slot: 3 },
            { id: 268, state: "改", power: 77, torp: 69, luck: 10, slot: 4 },
            { id: 194, state: "改二", power: 84, torp: 84, luck: 19, slot: 4 },
        ]
    },
    {
        type: 3, name: "高雄", main_id: 269, remodel: [
            { id: 66, state: "未改造", power: 59, torp: 59, luck: 10, slot: 3 },
            { id: 269, state: "改", power: 77, torp: 79, luck: 10, slot: 4 },
        ]
    },
    {
        type: 3, name: "愛宕", main_id: 270, remodel: [
            { id: 67, state: "未改造", power: 54, torp: 59, luck: 10, slot: 3 },
            { id: 270, state: "改", power: 77, torp: 79, luck: 10, slot: 4 },
        ]
    },
    {
        type: 3, name: "摩耶", main_id: 428, remodel: [
            { id: 68, state: "未改造", power: 54, torp: 49, luck: 10, slot: 3 },
            { id: 271, state: "改", power: 78, torp: 69, luck: 10, slot: 4 },
            { id: 428, state: "改二", power: 77, torp: 84, luck: 14, slot: 4 },
        ]
    },
    {
        type: 3, name: "鳥海", main_id: 427, remodel: [
            { id: 69, state: "未改造", power: 54, torp: 49, luck: 10, slot: 3 },
            { id: 272, state: "改", power: 78, torp: 69, luck: 10, slot: 4 },
            { id: 427, state: "改二", power: 86, torp: 86, luck: 19, slot: 4 },
        ]
    },
    {
        type: 3, name: "最上", main_id: 73, remodel: [
            { id: 70, state: "未改造", power: 59, torp: 69, luck: 10, slot: 3 },
            { id: 73, state: "改", power: 75, torp: 69, luck: 10, slot: 4 },
        ]
    },
    {
        type: 3, name: "三隈", main_id: 121, remodel: [
            { id: 120, state: "未改造", power: 59, torp: 69, luck: 5, slot: 3 },
            { id: 121, state: "改", power: 76, torp: 69, luck: 10, slot: 4 },
        ]
    },
    {
        type: 3, name: "鈴谷", main_id: 503, remodel: [
            { id: 124, state: "未改造", power: 59, torp: 69, luck: 5, slot: 3 },
            { id: 129, state: "改", power: 75, torp: 69, luck: 10, slot: 4 },
            { id: 503, state: "改二", power: 76, torp: 88, luck: 14, slot: 4, expansionCanHaveItemId: [66, 220] },
        ]
    },
    {
        type: 3, name: "熊野", main_id: 504, remodel: [
            { id: 125, state: "未改造", power: 59, torp: 69, luck: 5, slot: 3 },
            { id: 130, state: "改", power: 75, torp: 69, luck: 10, slot: 4 },
            { id: 504, state: "改二", power: 76, torp: 87, luck: 13, slot: 4, expansionCanHaveItemId: [66, 220] },
        ]
    },
    {
        type: 3, name: "利根", main_id: 188, remodel: [
            { id: 71, state: "未改造", power: 59, torp: 59, luck: 10, slot: 3 },
            { id: 273, state: "改", power: 76, torp: 79, luck: 10, slot: 4 },
            { id: 188, state: "改二", power: 77, torp: 82, luck: 15, slot: 4 },
        ]
    },
    {
        type: 3, name: "筑摩", main_id: 189, remodel: [
            { id: 72, state: "未改造", power: 59, torp: 59, luck: 10, slot: 3 },
            { id: 274, state: "改", power: 76, torp: 79, luck: 10, slot: 4 },
            { id: 189, state: "改二", power: 77, torp: 83, luck: 14, slot: 4 },
        ]
    },
    {
        type: 3, name: "Prinz Eugen", main_id: 177, remodel: [
            { id: 176, state: "未改造", power: 56, torp: 64, luck: 30, slot: 3 },
            { id: 177, state: "改", power: 75, torp: 84, luck: 40, slot: 4 },
        ]
    },
    {
        type: 3, name: "Zara", main_id: 496, remodel: [
            { id: 448, state: "未改造", power: 58, torp: 28, luck: 10, slot: 3 },
            { id: 358, state: "改", power: 75, torp: 40, luck: 12, slot: 4 },
            { id: 496, state: "due", power: 87, torp: 48, luck: 17, slot: 4 },
        ]
    },
    {
        type: 3, name: "Pola", main_id: 361, remodel: [
            { id: 449, state: "未改造", power: 59, torp: 32, luck: 9, slot: 3 },
            { id: 361, state: "改", power: 77, torp: 44, luck: 11, slot: 4 },
        ]
    },
    {
        type: 3, name: "Houston", main_id: 600, remodel: [
            { id: 595, state: "未改造", power: 52, torp: 40, luck: 12, slot: 3 },
            { id: 600, state: "改", power: 76, torp: 60, luck: 20, slot: 4 },
        ]
    },
    {
        type: 4, name: "天龍", main_id: 477, remodel: [
            { id: 51, state: "未改造", power: 39, torp: 59, luck: 17, slot: 2 },
            { id: 213, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 477, state: "改二", power: 64, torp: 78, luck: 17, slot: 3 },
        ]
    },
    {
        type: 4, name: "龍田", main_id: 478, remodel: [
            { id: 52, state: "未改造", power: 39, torp: 59, luck: 17, slot: 2 },
            { id: 214, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 478, state: "改二", power: 50, torp: 80, luck: 18, slot: 3 },
        ]
    },
    {
        type: 4, name: "球磨", main_id: 215, remodel: [
            { id: 99, state: "未改造", power: 49, torp: 89, luck: 12, slot: 2 },
            { id: 215, state: "改", power: 69, torp: 89, luck: 12, slot: 3 },
        ]
    },
    {
        type: 4, name: "多摩", main_id: 547, remodel: [
            { id: 100, state: "未改造", power: 39, torp: 79, luck: 10, slot: 2 },
            { id: 216, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 547, state: "改二", power: 60, torp: 91, luck: 13, slot: 3 },
        ]
    },
    {
        type: 4, name: "北上", main_id: 119, remodel: [
            { id: 25, state: "未改造", power: 39, torp: 79, luck: 15, slot: 2 },
            { id: 58, state: "改", power: 39, torp: 99, luck: 15, slot: 2 },
            { id: 119, state: "改二", power: 63, torp: 139, luck: 30, slot: 3 },
        ]
    },
    {
        type: 4, name: "大井", main_id: 118, remodel: [
            { id: 24, state: "未改造", power: 49, torp: 89, luck: 17, slot: 2 },
            { id: 57, state: "改", power: 39, torp: 99, luck: 10, slot: 2 },
            { id: 118, state: "改二", power: 63, torp: 139, luck: 13, slot: 3 },
        ]
    },
    {
        type: 4, name: "木曾", main_id: 146, remodel: [
            { id: 101, state: "未改造", power: 39, torp: 79, luck: 10, slot: 2 },
            { id: 217, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 146, state: "改二", power: 65, torp: 111, luck: 13, slot: 3 },
        ]
    },
    {
        type: 4, name: "長良", main_id: 218, remodel: [
            { id: 21, state: "未改造", power: 49, torp: 89, luck: 12, slot: 2 },
            { id: 218, state: "改", power: 69, torp: 89, luck: 12, slot: 3 },
        ]
    },
    {
        type: 4, name: "五十鈴", main_id: 141, remodel: [
            { id: 22, state: "未改造", power: 39, torp: 79, luck: 10, slot: 2 },
            { id: 219, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 141, state: "改二", power: 61, torp: 79, luck: 13, slot: 3 },
        ]
    },
    {
        type: 4, name: "名取", main_id: 221, remodel: [
            { id: 53, state: "未改造", power: 39, torp: 79, luck: 10, slot: 2 },
            { id: 221, state: "改", power: 69, torp: 89, luck: 12, slot: 3 },
        ]
    },
    {
        type: 4, name: "由良", main_id: 488, remodel: [
            { id: 23, state: "未改造", power: 39, torp: 79, luck: 10, slot: 2 },
            { id: 220, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 488, state: "改二", power: 56, torp: 80, luck: 16, slot: 3 },
        ]
    },
    {
        type: 4, name: "鬼怒", main_id: 487, remodel: [
            { id: 113, state: "未改造", power: 39, torp: 79, luck: 12, slot: 2 },
            { id: 289, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 487, state: "改二", power: 57, torp: 84, luck: 17, slot: 3 },
        ]
    },
    {
        type: 4, name: "阿武隈", main_id: 200, remodel: [
            { id: 114, state: "未改造", power: 39, torp: 79, luck: 12, slot: 2 },
            { id: 290, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 200, state: "改二", power: 56, torp: 94, luck: 20, slot: 3 },
        ]
    },
    {
        type: 4, name: "夕張", main_id: 622, remodel: [
            { id: 115, state: "未改造", power: 42, torp: 69, luck: 12, slot: 3 },
            { id: 293, state: "改", power: 63, torp: 79, luck: 17, slot: 4 },
            { id: 622, state: "改二", power: 56, torp: 80, luck: 30, slot: 5 },
            { id: 623, state: "改二特", power: 56, torp: 88, luck: 30, slot: 5 },
            { id: 624, state: "改二丁", power: 56, torp: 80, luck: 30, slot: 5 },
        ]
    },
    {
        type: 4, name: "川内", main_id: 158, remodel: [
            { id: 54, state: "未改造", power: 49, torp: 89, luck: 12, slot: 2 },
            { id: 222, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 158, state: "改二", power: 68, torp: 89, luck: 14, slot: 3 },
        ]
    },
    {
        type: 4, name: "神通", main_id: 159, remodel: [
            { id: 55, state: "未改造", power: 39, torp: 79, luck: 10, slot: 2 },
            { id: 223, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 159, state: "改二", power: 73, torp: 98, luck: 13, slot: 3 },
        ]
    },
    {
        type: 4, name: "那珂", main_id: 160, remodel: [
            { id: 56, state: "未改造", power: 39, torp: 79, luck: 10, slot: 2 },
            { id: 224, state: "改", power: 59, torp: 79, luck: 12, slot: 3 },
            { id: 160, state: "改二", power: 69, torp: 84, luck: 13, slot: 3 },
        ]
    },
    {
        type: 4, name: "阿賀野", main_id: 305, remodel: [
            { id: 137, state: "未改造", power: 42, torp: 72, luck: 10, slot: 3 },
            { id: 305, state: "改", power: 67, torp: 79, luck: 10, slot: 3 },
        ]
    },
    {
        type: 4, name: "能代", main_id: 306, remodel: [
            { id: 138, state: "未改造", power: 42, torp: 72, luck: 10, slot: 3 },
            { id: 306, state: "改", power: 68, torp: 79, luck: 10, slot: 3 },
        ]
    },
    {
        type: 4, name: "矢矧", main_id: 307, remodel: [
            { id: 139, state: "未改造", power: 42, torp: 72, luck: 13, slot: 3 },
            { id: 307, state: "改", power: 70, torp: 79, luck: 14, slot: 3 },
        ]
    },
    {
        type: 4, name: "酒匂", main_id: 314, remodel: [
            { id: 140, state: "未改造", power: 41, torp: 71, luck: 20, slot: 3 },
            { id: 314, state: "改", power: 65, torp: 78, luck: 30, slot: 3 },
        ]
    },
    {
        type: 4, name: "大淀", main_id: 321, remodel: [
            { id: 183, state: "未改造", power: 48, torp: 39, luck: 24, slot: 3 },
            { id: 321, state: "改", power: 70, torp: 49, luck: 30, slot: 4 },
        ]
    },
    {
        type: 4, name: "香取", main_id: 343, remodel: [
            { id: 154, state: "未改造", power: 28, torp: 28, luck: 10, slot: 3 },
            { id: 343, state: "改", power: 36, torp: 40, luck: 12, slot: 4 },
        ]
    },
    {
        type: 4, name: "鹿島", main_id: 356, remodel: [
            { id: 465, state: "未改造", power: 27, torp: 24, luck: 20, slot: 3 },
            { id: 356, state: "改", power: 34, torp: 39, luck: 20, slot: 4 },
        ]
    },
    {
        type: 4, name: "L.d.S.D.d.Abruzzi", main_id: 693, remodel: [
            { id: 589, state: "未改造", power: 51, torp: 66, luck: 20, slot: 3 },
            { id: 693, state: "改", power: 73, torp: 70, luck: 30, slot: 4 },
        ]
    },
    {
        type: 4, name: "G.Garibaldi", main_id: 691, remodel: [
            { id: 590, state: "未改造", power: 50, torp: 66, luck: 20, slot: 3 },
            { id: 691, state: "改", power: 72, torp: 70, luck: 30, slot: 4 },
        ]
    },
    {
        type: 4, name: "Atlanta", main_id: 696, remodel: [
            { id: 597, state: "未改造", power: 38, torp: 66, luck: 17, slot: 3 },
            { id: 696, state: "改", power: 64, torp: 70, luck: 18, slot: 3 },
        ]
    },
    {
        type: 4, name: "Gotland", main_id: 630, remodel: [
            { id: 574, state: "未改造", power: 48, torp: 68, luck: 20, slot: 3 },
            { id: 579, state: "改", power: 62, torp: 70, luck: 24, slot: 4 },
            { id: 630, state: "andra", power: 60, torp: 73, luck: 26, slot: 4 },
        ]
    },
    {
        type: 4, name: "De Ruyter", main_id: 609, remodel: [
            { id: 604, state: "未改造", power: 50, torp: 50, luck: 9, slot: 3 },
            { id: 609, state: "改", power: 70, torp: 60, luck: 10, slot: 3 },
        ]
    }, 
    {
        type: 4, name: "Perth", main_id: 618, remodel: [
            { id: 613, state: "未改造", power: 58, torp: 54, luck: 12, slot: 3 },
            { id: 618, state: "改", power: 72, torp: 72, luck: 22, slot: 3 },
        ]
    },   

    {
        type: 5, name: "神風", main_id: 476, remodel: [
            { id: 471, state: "未改造", power: 28, torp: 36, luck: 30, slot: 2 },
            { id: 476, state: "改", power: 41, torp: 68, luck: 40, slot: 3 },
        ]
    },
    {
        type: 5, name: "朝風", main_id: 370, remodel: [
            { id: 472, state: "未改造", power: 29, torp: 37, luck: 13, slot: 2 },
            { id: 370, state: "改", power: 42, torp: 69, luck: 14, slot: 3 },
        ]
    },
    {
        type: 5, name: "春風", main_id: 363, remodel: [
            { id: 473, state: "未改造", power: 27, torp: 36, luck: 25, slot: 2 },
            { id: 363, state: "改", power: 38, torp: 68, luck: 30, slot: 3 },
        ]
    },
    {
        type: 5, name: "松風", main_id: 371, remodel: [
            { id: 474, state: "未改造", power: 28, torp: 38, luck: 12, slot: 2 },
            { id: 371, state: "改", power: 39, torp: 68, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "旗風", main_id: 387, remodel: [
            { id: 475, state: "未改造", power: 29, torp: 36, luck: 17, slot: 2 },
            { id: 387, state: "改", power: 40, torp: 68, luck: 18, slot: 3 },
        ]
    },
    {
        type: 5, name: "睦月", main_id: 434, remodel: [
            { id: 1, state: "未改造", power: 29, torp: 59, luck: 12, slot: 2 },
            { id: 254, state: "改", power: 39, torp: 69, luck: 12, slot: 3 },
            { id: 434, state: "改二", power: 45, torp: 79, luck: 14, slot: 3 },
        ]
    },
    {
        type: 5, name: "如月", main_id: 435, remodel: [
            { id: 2, state: "未改造", power: 29, torp: 49, luck: 10, slot: 2 },
            { id: 255, state: "改", power: 39, torp: 69, luck: 12, slot: 3 },
            { id: 435, state: "改二", power: 46, torp: 80, luck: 13, slot: 3 },
        ]
    },
    {
        type: 5, name: "弥生", main_id: 308, remodel: [
            { id: 164, state: "未改造", power: 29, torp: 49, luck: 10, slot: 2 },
            { id: 308, state: "改", power: 39, torp: 69, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "卯月", main_id: 309, remodel: [
            { id: 165, state: "未改造", power: 29, torp: 49, luck: 10, slot: 2 },
            { id: 309, state: "改", power: 34, torp: 69, luck: 14, slot: 3 },
        ]
    },
    {
        type: 5, name: "皐月", main_id: 418, remodel: [
            { id: 28, state: "未改造", power: 29, torp: 49, luck: 10, slot: 2 },
            { id: 256, state: "改", power: 39, torp: 69, luck: 12, slot: 3 },
            { id: 418, state: "改二", power: 42, torp: 78, luck: 20, slot: 3 },
        ]
    },
    {
        type: 5, name: "水無月", main_id: 366, remodel: [
            { id: 481, state: "未改造", power: 29, torp: 49, luck: 13, slot: 2 },
            { id: 366, state: "改", power: 39, torp: 69, luck: 16, slot: 3 },
        ]
    },
    {
        type: 5, name: "文月", main_id: 548, remodel: [
            { id: 29, state: "未改造", power: 29, torp: 49, luck: 10, slot: 2 },
            { id: 257, state: "改", power: 39, torp: 69, luck: 12, slot: 3 },
            { id: 548, state: "改二", power: 45, torp: 77, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "長月", main_id: 258, remodel: [
            { id: 6, state: "未改造", power: 29, torp: 49, luck: 15, slot: 2 },
            { id: 258, state: "改", power: 39, torp: 69, luck: 20, slot: 3 },
        ]
    },
    {
        type: 5, name: "菊月", main_id: 259, remodel: [
            { id: 30, state: "未改造", power: 29, torp: 49, luck: 10, slot: 2 },
            { id: 259, state: "改", power: 39, torp: 69, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "三日月", main_id: 260, remodel: [
            { id: 7, state: "未改造", power: 29, torp: 49, luck: 10, slot: 2 },
            { id: 260, state: "改", power: 39, torp: 69, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "望月", main_id: 261, remodel: [
            { id: 31, state: "未改造", power: 29, torp: 49, luck: 10, slot: 2 },
            { id: 261, state: "改", power: 39, torp: 69, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "吹雪", main_id: 426, remodel: [
            { id: 9, state: "未改造", power: 29, torp: 79, luck: 17, slot: 2 },
            { id: 201, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 426, state: "改二", power: 59, torp: 88, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "白雪", main_id: 202, remodel: [
            { id: 10, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 202, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "初雪", main_id: 203, remodel: [
            { id: 32, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 203, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "深雪", main_id: 204, remodel: [
            { id: 11, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 204, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "叢雲", main_id: 420, remodel: [
            { id: 33, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 205, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 420, state: "改二", power: 57, torp: 89, luck: 15, slot: 3 },
        ]
    },
    {
        type: 5, name: "磯波", main_id: 206, remodel: [
            { id: 12, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 206, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "浦波", main_id: 368, remodel: [
            { id: 486, state: "未改造", power: 29, torp: 69, luck: 14, slot: 2 },
            { id: 368, state: "改", power: 49, torp: 79, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "綾波", main_id: 195, remodel: [
            { id: 13, state: "未改造", power: 29, torp: 79, luck: 12, slot: 2 },
            { id: 207, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 195, state: "改二", power: 74, torp: 88, luck: 40, slot: 3 },
        ]
    },
    {
        type: 5, name: "敷波", main_id: 627, remodel: [
            { id: 14, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 208, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 627, state: "改二", power: 61, torp: 88, luck: 30, slot: 3 },
        ]
    },
    {
        type: 5, name: "天霧", main_id: 390, remodel: [
            { id: 479, state: "未改造", power: 30, torp: 70, luck: 11, slot: 2 },
            { id: 390, state: "改", power: 52, torp: 80, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "狭霧", main_id: 391, remodel: [
            { id: 480, state: "未改造", power: 29, torp: 69, luck: 6, slot: 2 },
            { id: 391, state: "改", power: 50, torp: 82, luck: 7, slot: 3 },
        ]
    },
    {
        type: 5, name: "朧", main_id: 230, remodel: [
            { id: 93, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 230, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "曙", main_id: 231, remodel: [
            { id: 15, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 231, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "漣", main_id: 232, remodel: [
            { id: 94, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 232, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "潮", main_id: 407, remodel: [
            { id: 16, state: "未改造", power: 29, torp: 69, luck: 20, slot: 2 },
            { id: 233, state: "改", power: 49, torp: 79, luck: 20, slot: 3 },
            { id: 407, state: "改二", power: 58, torp: 80, luck: 32, slot: 3 },
        ]
    },
    {
        type: 5, name: "暁", main_id: 437, remodel: [
            { id: 34, state: "未改造", power: 29, torp: 79, luck: 12, slot: 2 },
            { id: 234, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 437, state: "改二", power: 62, torp: 90, luck: 15, slot: 3 },
        ]
    },
    {
        type: 5, name: "響", main_id: 147, remodel: [
            { id: 35, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 235, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 147, state: "Верный", power: 58, torp: 89, luck: 20, slot: 3 },
        ]
    },
    {
        type: 5, name: "雷", main_id: 236, remodel: [
            { id: 36, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 236, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "電", main_id: 237, remodel: [
            { id: 37, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 237, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "初春", main_id: 326, remodel: [
            { id: 38, state: "未改造", power: 29, torp: 79, luck: 12, slot: 2 },
            { id: 238, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 326, state: "改二", power: 55, torp: 90, luck: 16, slot: 3 },
        ]
    },
    {
        type: 5, name: "子日", main_id: 239, remodel: [
            { id: 39, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 239, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "若葉", main_id: 240, remodel: [
            { id: 40, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 240, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "初霜", main_id: 419, remodel: [
            { id: 41, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 241, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 419, state: "改二", power: 59, torp: 85, luck: 53, slot: 3 },
        ]
    },
    {
        type: 5, name: "白露", main_id: 497, remodel: [
            { id: 42, state: "未改造", power: 29, torp: 79, luck: 12, slot: 2 },
            { id: 242, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 497, state: "改二", power: 69, torp: 87, luck: 16, slot: 3 },
        ]
    },
    {
        type: 5, name: "時雨", main_id: 145, remodel: [
            { id: 43, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 243, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 145, state: "改二", power: 60, torp: 86, luck: 50, slot: 3 },
        ]
    },
    {
        type: 5, name: "村雨", main_id: 498, remodel: [
            { id: 44, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 244, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 498, state: "改二", power: 68, torp: 88, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "夕立", main_id: 144, remodel: [
            { id: 45, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 245, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 144, state: "改二", power: 73, torp: 93, luck: 20, slot: 3 },
        ]
    },
    {
        type: 5, name: "春雨", main_id: 323, remodel: [
            { id: 405, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 323, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "五月雨", main_id: 246, remodel: [
            { id: 46, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 246, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "海風", main_id: 587, remodel: [
            { id: 458, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 350, state: "改", power: 49, torp: 79, luck: 13, slot: 3 },
            { id: 587, state: "改二", power: 61, torp: 93, luck: 20, slot: 3 },
        ]
    },
    {
        type: 5, name: "山風", main_id: 369, remodel: [
            { id: 457, state: "未改造", power: 31, torp: 69, luck: 6, slot: 2 },
            { id: 369, state: "改", power: 51, torp: 82, luck: 8, slot: 3 },
        ]
    },
    {
        type: 5, name: "江風", main_id: 469, remodel: [
            { id: 459, state: "未改造", power: 29, torp: 70, luck: 10, slot: 2 },
            { id: 351, state: "改", power: 49, torp: 80, luck: 12, slot: 3 },
            { id: 469, state: "改二", power: 62, torp: 96, luck: 19, slot: 3 },
        ]
    },
    {
        type: 5, name: "涼風", main_id: 247, remodel: [
            { id: 47, state: "未改造", power: 29, torp: 79, luck: 12, slot: 2 },
            { id: 247, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "朝潮", main_id: 468, remodel: [
            { id: 95, state: "未改造", power: 29, torp: 79, luck: 12, slot: 2 },
            { id: 248, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 463, state: "改二", power: 68, torp: 92, luck: 17, slot: 3 },
            { id: 468, state: "改二丁", power: 55, torp: 86, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "大潮", main_id: 199, remodel: [
            { id: 96, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 249, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 199, state: "改二", power: 67, torp: 90, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "満潮", main_id: 489, remodel: [
            { id: 97, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 250, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 489, state: "改二", power: 68, torp: 89, luck: 18, slot: 3 },
        ]
    },
    {
        type: 5, name: "荒潮", main_id: 490, remodel: [
            { id: 98, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 251, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 490, state: "改二", power: 69, torp: 88, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "朝雲", main_id: 327, remodel: [
            { id: 413, state: "未改造", power: 29, torp: 69, luck: 8, slot: 2 },
            { id: 327, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "山雲", main_id: 328, remodel: [
            { id: 414, state: "未改造", power: 29, torp: 69, luck: 7, slot: 2 },
            { id: 328, state: "改", power: 49, torp: 79, luck: 11, slot: 3 },
        ]
    },
    {
        type: 5, name: "峯雲", main_id: 687, remodel: [
            { id: 583, state: "未改造", power: 30, torp: 69, luck: 6, slot: 2 },
            { id: 687, state: "改", power: 51, torp: 79, luck: 9, slot: 3 },
        ]
    },
    {
        type: 5, name: "霰", main_id: 198, remodel: [
            { id: 48, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 252, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 198, state: "改二", power: 66, torp: 87, luck: 15, slot: 3 },
        ]
    },
    {
        type: 5, name: "霞", main_id: 470, remodel: [
            { id: 49, state: "未改造", power: 29, torp: 69, luck: 15, slot: 2 },
            { id: 253, state: "改", power: 49, torp: 79, luck: 20, slot: 3 },
            { id: 464, state: "改二", power: 65, torp: 92, luck: 37, slot: 3 },
            { id: 470, state: "改二乙", power: 60, torp: 83, luck: 37, slot: 3 },
        ]
    },
    {
        type: 5, name: "陽炎", main_id: 566, remodel: [
            { id: 17, state: "未改造", power: 29, torp: 79, luck: 12, slot: 2 },
            { id: 225, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 566, state: "改二", power: 68, torp: 90, luck: 20, slot: 3 },
        ]
    },
    {
        type: 5, name: "不知火", main_id: 567, remodel: [
            { id: 18, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 226, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 567, state: "改二", power: 67, torp: 91, luck: 24, slot: 3 },
        ]
    },
    {
        type: 5, name: "黒潮", main_id: 568, remodel: [
            { id: 19, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 227, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
            { id: 568, state: "改二", power: 69, torp: 88, luck: 22, slot: 3 },
        ]
    },
    {
        type: 5, name: "親潮", main_id: 362, remodel: [
            { id: 456, state: "未改造", power: 30, torp: 68, luck: 13, slot: 2 },
            { id: 362, state: "改", power: 50, torp: 78, luck: 14, slot: 3 },
        ]
    },
    {
        type: 5, name: "初風", main_id: 300, remodel: [
            { id: 190, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 300, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "雪風", main_id: 228, remodel: [
            { id: 20, state: "未改造", power: 29, torp: 79, luck: 50, slot: 2 },
            { id: 228, state: "改", power: 59, torp: 89, luck: 60, slot: 3 },
        ]
    },
    {
        type: 5, name: "天津風", main_id: 316, remodel: [
            { id: 181, state: "未改造", power: 29, torp: 79, luck: 18, slot: 2 },
            { id: 316, state: "改", power: 49, torp: 84, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "時津風", main_id: 322, remodel: [
            { id: 186, state: "未改造", power: 29, torp: 69, luck: 13, slot: 2 },
            { id: 322, state: "改", power: 48, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "浦風", main_id: 556, remodel: [
            { id: 168, state: "未改造", power: 29, torp: 69, luck: 13, slot: 2 },
            { id: 317, state: "改", power: 48, torp: 79, luck: 13, slot: 3 },
            { id: 556, state: "丁改", power: 62, torp: 80, luck: 18, slot: 3 },
        ]
    },
    {
        type: 5, name: "磯風", main_id: 557, remodel: [
            { id: 167, state: "未改造", power: 29, torp: 69, luck: 16, slot: 2 },
            { id: 320, state: "改", power: 48, torp: 79, luck: 18, slot: 3 },
            { id: 557, state: "乙改", power: 61, torp: 82, luck: 24, slot: 3 },
        ]
    },
    {
        type: 5, name: "浜風", main_id: 558, remodel: [
            { id: 170, state: "未改造", power: 29, torp: 69, luck: 15, slot: 2 },
            { id: 312, state: "改", power: 48, torp: 79, luck: 17, slot: 3 },
            { id: 558, state: "乙改", power: 58, torp: 83, luck: 20, slot: 3 },
        ]
    },
    {
        type: 5, name: "谷風", main_id: 559, remodel: [
            { id: 169, state: "未改造", power: 29, torp: 69, luck: 14, slot: 2 },
            { id: 313, state: "改", power: 48, torp: 79, luck: 16, slot: 3 },
            { id: 559, state: "改二", power: 59, torp: 84, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "野分", main_id: 329, remodel: [
            { id: 415, state: "未改造", power: 29, torp: 69, luck: 14, slot: 2 },
            { id: 329, state: "改", power: 48, torp: 79, luck: 13, slot: 3 },
        ]
    },
    {
        type: 5, name: "嵐", main_id: 354, remodel: [
            { id: 454, state: "未改造", power: 29, torp: 69, luck: 11, slot: 2 },
            { id: 354, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "萩風", main_id: 355, remodel: [
            { id: 455, state: "未改造", power: 30, torp: 69, luck: 11, slot: 2 },
            { id: 355, state: "改", power: 50, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "舞風", main_id: 294, remodel: [
            { id: 122, state: "未改造", power: 29, torp: 69, luck: 10, slot: 2 },
            { id: 294, state: "改", power: 49, torp: 79, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "秋雲", main_id: 301, remodel: [
            { id: 132, state: "未改造", power: 29, torp: 69, luck: 14, slot: 2 },
            { id: 301, state: "改", power: 44, torp: 79, luck: 15, slot: 3 },
        ]
    },
    {
        type: 5, name: "夕雲", main_id: 542, remodel: [
            { id: 133, state: "未改造", power: 30, torp: 69, luck: 12, slot: 2 },
            { id: 302, state: "改", power: 50, torp: 80, luck: 12, slot: 3 },
            { id: 542, state: "改二", power: 67, torp: 87, luck: 18, slot: 3 },
        ]
    },
    {
        type: 5, name: "巻雲", main_id: 563, remodel: [
            { id: 134, state: "未改造", power: 30, torp: 69, luck: 11, slot: 2 },
            { id: 303, state: "改", power: 50, torp: 80, luck: 12, slot: 3 },
            { id: 563, state: "改二", power: 64, torp: 90, luck: 16, slot: 3 },
        ]
    },
    {
        type: 5, name: "風雲", main_id: 564, remodel: [
            { id: 453, state: "未改造", power: 30, torp: 70, luck: 13, slot: 2 },
            { id: 349, state: "改", power: 50, torp: 81, luck: 14, slot: 3 },
            { id: 564, state: "改二", power: 66, torp: 89, luck: 20, slot: 3 },
        ]
    },
    {
        type: 5, name: "長波", main_id: 543, remodel: [
            { id: 135, state: "未改造", power: 30, torp: 69, luck: 13, slot: 2 },
            { id: 304, state: "改", power: 50, torp: 80, luck: 14, slot: 3 },
            { id: 543, state: "改二", power: 69, torp: 89, luck: 30, slot: 3 },
        ]
    },
    {
        type: 5, name: "高波", main_id: 345, remodel: [
            { id: 424, state: "未改造", power: 30, torp: 69, luck: 8, slot: 2 },
            { id: 345, state: "改", power: 51, torp: 80, luck: 10, slot: 3 },
        ]
    },
    {
        type: 5, name: "藤波", main_id: 373, remodel: [
            { id: 485, state: "未改造", power: 31, torp: 69, luck: 9, slot: 2 },
            { id: 373, state: "改", power: 52, torp: 79, luck: 11, slot: 3 },
        ]
    },
    {
        type: 5, name: "早波", main_id: 688, remodel: [
            { id: 528, state: "未改造", power: 30, torp: 68, luck: 9, slot: 2 },
            { id: 688, state: "改", power: 51, torp: 80, luck: 10, slot: 3 },
        ]
    },
    {
        type: 5, name: "浜波", main_id: 680, remodel: [
            { id: 484, state: "未改造", power: 31, torp: 68, luck: 10, slot: 2 },
            { id: 680, state: "改", power: 52, torp: 78, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "沖波", main_id: 569, remodel: [
            { id: 452, state: "未改造", power: 30, torp: 69, luck: 10, slot: 2 },
            { id: 359, state: "改", power: 50, torp: 81, luck: 12, slot: 3 },
            { id: 569, state: "改二", power: 65, torp: 87, luck: 22, slot: 3 },
        ]
    },
    {
        type: 5, name: "岸波", main_id: 686, remodel: [
            { id: 527, state: "未改造", power: 31, torp: 68, luck: 10, slot: 2 },
            { id: 686, state: "改", power: 50, torp: 80, luck: 13, slot: 3 },
        ]
    },
    {
        type: 5, name: "朝霜", main_id: 578, remodel: [
            { id: 425, state: "未改造", power: 29, torp: 68, luck: 16, slot: 2 },
            { id: 344, state: "改", power: 50, torp: 78, luck: 18, slot: 3 },
            { id: 578, state: "改二", power: 68, torp: 88, luck: 28, slot: 3 },
        ]
    },
    {
        type: 5, name: "早霜", main_id: 324, remodel: [
            { id: 409, state: "未改造", power: 30, torp: 69, luck: 11, slot: 2 },
            { id: 324, state: "改", power: 50, torp: 80, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "秋霜", main_id: 695, remodel: [
            { id: 625, state: "未改造", power: 30, torp: 69, luck: 11, slot: 2 },
            { id: 695, state: "改", power: 50, torp: 80, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "清霜", main_id: 325, remodel: [
            { id: 410, state: "未改造", power: 30, torp: 69, luck: 12, slot: 2 },
            { id: 325, state: "改", power: 50, torp: 80, luck: 13, slot: 3 },
        ]
    },
    {
        type: 5, name: "秋月", main_id: 330, remodel: [
            { id: 421, state: "未改造", power: 48, torp: 48, luck: 10, slot: 2 },
            { id: 330, state: "改", power: 57, torp: 54, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "照月", main_id: 346, remodel: [
            { id: 422, state: "未改造", power: 49, torp: 49, luck: 9, slot: 2 },
            { id: 346, state: "改", power: 58, torp: 56, luck: 11, slot: 3 },
        ]
    },
    {
        type: 5, name: "涼月", main_id: 537, remodel: [
            { id: 532, state: "未改造", power: 47, torp: 46, luck: 27, slot: 2 },
            { id: 537, state: "改", power: 56, torp: 52, luck: 37, slot: 3 },
        ]
    },
    {
        type: 5, name: "初月", main_id: 357, remodel: [
            { id: 423, state: "未改造", power: 50, torp: 47, luck: 7, slot: 2 },
            { id: 357, state: "改", power: 60, torp: 54, luck: 8, slot: 3 },
        ]
    },
    {
        type: 5, name: "島風", main_id: 229, remodel: [
            { id: 50, state: "未改造", power: 29, torp: 89, luck: 10, slot: 2 },
            { id: 229, state: "改", power: 59, torp: 99, luck: 12, slot: 3 },
        ]
    },
    {
        type: 5, name: "Z1", main_id: 179, remodel: [
            { id: 174, state: "未改造", power: 26, torp: 60, luck: 6, slot: 2 },
            { id: 310, state: "改", power: 45, torp: 70, luck: 12, slot: 3 },
            { id: 179, state: "zwei", power: 49, torp: 71, luck: 15, slot: 3 },
        ]
    },
    {
        type: 5, name: "Z3", main_id: 180, remodel: [
            { id: 175, state: "未改造", power: 26, torp: 60, luck: 6, slot: 2 },
            { id: 311, state: "改", power: 45, torp: 70, luck: 12, slot: 3 },
            { id: 180, state: "zwei", power: 47, torp: 71, luck: 15, slot: 3 },
        ]
    },
    {
        type: 5, name: "Maestrale", main_id: 580, remodel: [
            { id: 575, state: "未改造", power: 27, torp: 58, luck: 14, slot: 2 },
            { id: 580, state: "改", power: 54, torp: 72, luck: 17, slot: 3 },
        ]
    },
    {
        type: 5, name: "Grecale", main_id: 619, remodel: [
            { id: 614, state: "未改造", power: 26, torp: 57, luck: 14, slot: 2 },
            { id: 619, state: "改", power: 55, torp: 68, luck: 40, slot: 3 },
        ]
    },
    {
        type: 5, name: "Libeccio", main_id: 347, remodel: [
            { id: 443, state: "未改造", power: 27, torp: 58, luck: 12, slot: 2 },
            { id: 347, state: "改", power: 48, torp: 72, luck: 16, slot: 3 },
        ]
    },
    {
        type: 5, name: "Samuel B.Roberts", main_id: 681, remodel: [
            { id: 561, state: "未改造", power: 24, torp: 38, luck: 30, slot: 2 },
            { id: 681, state: "改", power: 50, torp: 70, luck: 40, slot: 3 },
        ]
    },
    {
        type: 5, name: "Fletcher", main_id: 692, remodel: [
            { id: 596, state: "未改造", power: 31, torp: 60, luck: 30, slot: 2 },
            { id: 692, state: "改", power: 54, torp: 72, luck: 40, slot: 3 },
        ]
    },
    {
        type: 5, name: "Johnston", main_id: 689, remodel: [
            { id: 562, state: "未改造", power: 32, torp: 60, luck: 17, slot: 2 },
            { id: 689, state: "改", power: 55, torp: 72, luck: 40, slot: 3 },
        ]
    },
    {
        type: 5, name: "Jervis", main_id: 394, remodel: [
            { id: 519, state: "未改造", power: 32, torp: 82, luck: 50, slot: 2 },
            { id: 394, state: "改", power: 52, torp: 90, luck: 55, slot: 3 },
        ]
    },
    {
        type: 5, name: "Janus", main_id: 893, remodel: [
            { id: 520, state: "未改造", power: 33, torp: 82, luck: 17, slot: 2 },
            { id: 893, state: "改", power: 53, torp: 90, luck: 22, slot: 3 },
        ]
    },
    {
        type: 5, name: "Ташкент", main_id: 395, remodel: [
            { id: 516, state: "未改造", power: 50, torp: 48, luck: 40, slot: 3 },
            { id: 395, state: "改", power: 66, torp: 68, luck: 43, slot: 4 },
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
    { id: 9, type: 3, name: "46cm三連装砲", power: 26 },
    { id: 10, type: 1, name: "12.7cm連装高角砲", power: 2, accuracy: 1 },
    { id: 11, type: 2, name: "15.2cm単装砲", power: 2, accuracy: 1 },
    { id: 12, type: 4, name: "15.5cm三連装副砲", power: 7, accuracy: 2 },
    //{ id: 13, type: 5, name: "61cm三連装魚雷", torp: 5 },
    //{ id: 14, type: 5, name: "61cm四連装魚雷", torp: 7 },
    //{ id: 15, type: 5, name: "61cm四連装(酸素)魚雷", torp: 10 },
    { id: 16, type: 8, name: "九七式艦攻", torp: 5 },
    { id: 17, type: 8, name: "天山", torp: 7 },
    {
        id: 18, type: 8, name: "流星", torp: 10,
        singleAddableBonus: [
            { power: 2, targetId: [277, 278, 156, 594] },
            { power: 1, targetId: [599] },
        ]
    },
    //{ id: 19, type: 7, name: "九六式艦戦", power: 0, torp: 0, accuracy: 0 },
    //{ id: 20, type: 7, name: "零式艦戦21型", power: 0, torp: 0, accuracy: 0 },
    //{ id: 21, type: 7, name: "零式艦戦52型", power: 0, torp: 0, accuracy: 0 },
    //{ id: 22, type: 7, name: "試製烈風 後期型", power: 0, torp: 0, accuracy: 0 },
    { id: 23, type: 9, name: "九九式艦爆", bomb: 5 },
    { id: 24, type: 9, name: "彗星", bomb: 8 },
    //{ id: 25, type: 11, name: "零式水上偵察機", power: 0, torp: 0, accuracy: 1 },
    //{ id: 26, type: 12, name: "瑞雲", power: 0, torp: 0, accuracy: 1 },
    { id: 27, type: 14, name: "13号対空電探", accuracy: 1, isSurface: false, isAir: true },
    { id: 28, type: 14, name: "22号対水上電探", accuracy: 3, isSurface: true, isAir: false },
    { id: 29, type: 14, name: "33号対水上電探", accuracy: 5, isSurface: true, isAir: false },
    { id: 30, type: 15, name: "21号対空電探", accuracy: 2, isSurface: false, isAir: true },
    { id: 31, type: 15, name: "32号対水上電探", accuracy: 8, isSurface: true, isAir: false },
    { id: 32, type: 15, name: "42号対空電探", accuracy: 4, isSurface: true, isAir: true },
    //{ id: 33, type: 25, name: "改良式艦本式タービン" },
    //{ id: 34, type: 24, name: "強化型艦本式缶" },
    {
        id: 35, type: 17, name: "三式弾",
        singleBonus: [
            { power: 1, targetId: [149, 591, 592, 152] }
        ]
    },
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
    {
        id: 50, type: 2, name: "20.3cm(3号)連装砲", power: 10, accuracy: 1,
        singleAddableBonus: [
            { power: 2, targetId: [62, 265, 319, 63, 266, 192, 64, 267, 193, 65, 268, 194, 66, 269, 67, 270] },
            { power: 1, targetId: [59, 262, 416, 60, 263, 417, 61, 264, 123, 295, 142] }
        ],
        singleBonus: [
            { power: 2, targetId: [70, 73, 120, 121, 124, 129, 503, 125, 130, 504, 71, 273, 188, 72, 274, 189] },
        ],
        multiBonus: [
            { //3号2積み
                power: 4, targetId: [70, 73, 120, 121, 124, 129, 503, 125, 130, 504, 71, 273, 188, 72, 274, 189], isBonus: function (slotNumber) {
                    let c = 0;
                    if (slotNumber == 0) {
                        return false;
                    }
                    for (let index = 0; index < slotNumber; index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 50) c++;
                    }
                    return c == 1;
                }
            },
            { //3号3積み,3号4積み
                power: 3, targetId: [70, 73, 120, 121, 124, 129, 503, 125, 130, 504, 71, 273, 188, 72, 274, 189], isBonus: function (slotNumber) {
                    let c = 0;
                    if (slotNumber == 0) {
                        return false;
                    }
                    for (let index = 0; index < slotNumber; index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 50) c++;
                    }
                    return c == 2 || c == 3;
                }
            },
            { //3号水上電探(古鷹型,青葉型)
                power: 1, targetId: [59, 262, 416, 60, 263, 417, 61, 264, 123, 295, 142], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    const furutakaType = [59, 262, 416, 60, 263, 417];
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.id == 90 && furutakaType.some(c => c == selectedMyFleet.id)) {
                            return false; //2号があれば2号電探を優先
                        }
                        if (item.isSurface) {
                            isSurface = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 50) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            },
            { //3号水上電探(妙高型,高雄型,最上型,利根型)
                power: 3, targetId: [62, 265, 319, 63, 266, 192, 64, 267, 193, 65, 268, 194, 66, 269, 67, 270, 70, 73, 120, 121, 124, 129, 503, 125, 130, 504, 71, 273, 188, 72, 274, 189], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    selectedItemList.forEach((t) => {
                        if (t.isSurface) {
                            isSurface = true;
                        }
                    })
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 50) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            },
        ]
    },
    { id: 51, type: 18, name: "12cm30連装噴進砲" },
    {
        id: 52, type: 8, name: "流星改", torp: 13,
        singleAddableBonus: [
            { power: 2, targetId: [277, 278, 156, 594] },
            { power: 1, targetId: [599] },
        ]
    },
    //{ id: 53, type: 7, name: "烈風 一一型", power: 0, torp: 0, accuracy: 2 },
    { id: 54, type: 27, name: "彩雲", accuracy: 2 },
    //{ id: 55, type: 7, name: "紫電改二", power: 0, torp: 0, accuracy: 0 },
    //{ id: 56, type: 7, name: "震電改", power: 0, torp: 0, accuracy: 0 },
    {
        id: 57, type: 9, name: "彗星一二型甲", bomb: 10,
        singleAddableBonus: [
            { power: 2, targetId: [553, 554] }
        ]
    },
    { id: 58, type: 5, name: "61cm五連装(酸素)魚雷", torp: 12, accuracy: 1 },
    //{ id: 59, type: 11, name: "零式水上観測機", power: 0, torp: 0, accuracy: 2 },
    { id: 60, type: 9, name: "零式艦戦62型(爆戦)", bomb: 4 },
    { id: 61, type: 27, name: "二式艦上偵察機", accuracy: 3 },

    {
        id: 63, type: 1, name: "12.7cm連装砲B型改二", power: 3,
        singleAddableBonus: [
            { power: 1, targetId: [627, 145, 144, 245] },
        ]
    },
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

    { id: 88, type: 14, name: "22号対水上電探改四", accuracy: 8, isSurface: true, isAir: false },
    { id: 89, type: 15, name: "21号対空電探改", accuracy: 3, isSurface: true, isAir: true },
    {
        id: 90, type: 2, name: "20.3cm(2号)連装砲", power: 9, accuracy: 1,
        singleAddableBonus: [
            { power: 2, targetId: [416, 417, 295, 264] },
            { power: 3, targetId: [142] },
            { power: 1, targetId: [59, 262, 60, 263, 61, 123, 62, 265, 319, 63, 266, 192, 64, 267, 193, 65, 268, 194, 66, 269, 67, 270, 68, 271, 428, 69, 272, 427, 70, 73, 120, 121, 124, 129, 503, 125, 130, 504, 71, 273, 188, 72, 274, 189] }
        ],
        multiBonus: [
            { // 2号水上電探
                power: 3, targetId: [59, 262, 416, 60, 263, 417, 61, 264, 123, 295, 142], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.isSurface) {
                            isSurface = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 90) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            }
        ]
    },
    { id: 91, type: 1, name: "12.7cm連装高角砲(後期型)", power: 2, accuracy: 1 },
    { id: 92, type: 18, name: "毘式40mm連装機銃" },
    {
        id: 93, type: 8, name: "九七式艦攻(友永隊)", torp: 11, accuracy: 3,
        singleBonus: [
            { power: 3, targetId: [91, 280, 196] },
            { power: 1, targetId: [90, 279, 197] },
        ]
    },
    {
        id: 94, type: 8, name: "天山一二型(友永隊)", torp: 14, accuracy: 3,
        singleBonus: [
            { power: 7, targetId: [196] },
            { power: 3, targetId: [197] },
        ]
    },

    { id: 97, type: 9, name: "九九式艦爆(熟練)", bomb: 7, accuracy: 2 },
    { id: 98, type: 8, name: "九七式艦攻(熟練)", torp: 8, accuracy: 2 },
    {
        id: 99, type: 9, name: "九九式艦爆(江草隊)", bomb: 10, accuracy: 4,
        singleBonus: [
            { power: 4, targetId: [90, 279, 197] },
            { power: 1, targetId: [91, 280, 196] },
        ]
    },
    {
        id: 100, type: 9, name: "彗星(江草隊)", bomb: 13, accuracy: 4,
        singleBonus: [
            { power: 6, targetId: [197] },
            { power: 4, targetId: [553, 554] },
            { power: 3, targetId: [196] },
        ]
    },

    { id: 103, type: 3, name: "試製35.6cm連装砲", power: 18, accuracy: 2 },
    {
        id: 104, type: 3, name: "35.6cm連装砲(ダズル迷彩)", power: 15, accuracy: 1,
        singleAddableBonus: [
            { power: 2, targetId: [149, 151] },
            { power: 1, targetId: [150, 152] },
        ],
    },
    { id: 105, type: 3, name: "試製41cm三連装砲", power: 22, accuracy: 2 },
    { id: 106, type: 14, name: "13号対空電探改", accuracy: 2, isSurface: false, isAir: true },

    {
        id: 111, type: 9, name: "彗星(六〇一空)", bomb: 11, accuracy: 1,
        singleAddableBonus: [
            { power: 2, targetId: [553, 554] },
        ]
    },
    { id: 112, type: 8, name: "天山(六〇一空)", torp: 10, accuracy: 1 },
    { id: 113, type: 8, name: "流星(六〇一空)", torp: 13, accuracy: 1 },
    { id: 114, type: 3, name: "38cm連装砲改", power: 17, accuracy: 3 },

    { id: 116, type: 16, name: "一式徹甲弾", power: 9, accuracy: 2 },
    { id: 117, type: 3, name: "試製46cm連装砲", power: 23, accuracy: 1 },

    { id: 119, type: 2, name: "14cm連装砲", power: 4, accuracy: 2 },

    { id: 122, type: 1, name: "10cm高角砲+高射装置", power: 3, accuracy: 1 },
    { id: 123, type: 2, name: "SKC34 20.3cm連装砲", power: 10, accuracy: 3 },
    { id: 124, type: 15, name: "FuMo25 レーダー", power: 3, accuracy: 10, isSurface: true, isAir: true },

    { id: 128, type: 3, name: "試製51cm連装砲", power: 30, accuracy: 1 },
    {
        id: 129, type: 28, name: "熟練見張員", accuracy: 2,
        singleAddableBonus: [
            {
                power: 1, targetId: [
                    471, 476, 472, 370, 473, 363, 474, 371, 475, 387, 1, 254, 434, 2, 255, 435, 164, 308, 165, 309, 28, 256, 418, 481, 366, 29, 257, 548, 6, 258, 30, 259, 7, 260, 31, 261, 9, 201, 426, 10, 202, 32, 203, 11, 204, 33, 205, 420, 12, 206, 486, 368, 13, 207, 195, 14, 208, 627, 479, 390, 480, 391, 93, 230, 15, 231, 94, 232, 16, 233, 407, 34, 234, 437, 35, 235, 147, 36, 236, 37, 237, 38, 238, 326, 39, 239, 40, 240, 41, 241, 419, 42, 242, 497, 43, 243, 145, 44, 244, 498, 45, 245, 144, 405, 323, 46, 246, 458, 350, 587, 457, 369, 459, 351, 469, 47, 247, 95, 248, 463, 468, 96, 249, 199, 97, 250, 489, 98, 251, 490, 413, 327, 414, 328, 583, 687, 48, 252, 198, 49, 253, 464, 470, 17, 225, 566, 18, 226, 567, 19, 227, 568, 456, 362, 190, 300, 20, 228, 181, 316, 186, 322, 168, 317, 556, 167, 320, 557, 170, 312, 558, 169, 313, 559, 415, 329, 454, 354, 455, 355, 122, 294, 132, 301, 133, 302, 542, 134, 303, 563, 453, 349, 564, 135, 304, 543, 424, 345, 485, 373, 528, 688, 484, 680, 452, 359, 569, 527, 686, 425, 344, 578, 409, 324, 625, 695, 410, 325, 421, 330, 422, 346, 532, 537, 423, 357, 50, 229,
                    51, 213, 477, 52, 214, 478, 99, 215, 100, 216, 547, 25, 58, 119, 24, 57, 118, 101, 217, 146, 21, 218, 22, 219, 141, 53, 221, 23, 220, 488, 113, 289, 487, 114, 290, 200, 115, 293, 622, 623, 624, 54, 222, 158, 55, 223, 159, 56, 224, 160, 137, 305, 138, 306, 139, 307, 140, 314, 183, 321, 154, 343, 465, 356,
                    59, 262, 416, 60, 263, 417, 61, 264, 123, 295, 142, 62, 265, 319, 63, 266, 192, 64, 267, 193, 65, 268, 194, 66, 269, 67, 270, 68, 271, 428, 69, 272, 427, 70, 73, 120, 121, 124, 129, 503, 125, 130, 504, 71, 273, 188, 72, 274, 189
                ]
            },
        ],
    },
    { id: 130, type: 4, name: "12.7cm高角砲 + 高射装置", power: 1, accuracy: 1 },
    { id: 131, type: 18, name: "25mm三連装機銃 集中配備" },

    { id: 133, type: 3, name: "381mm/50 三連装砲", power: 20, accuracy: -3 },
    { id: 134, type: 4, name: "OTO 152mm三連装速射砲", power: 8, accuracy: 1 },
    { id: 135, type: 4, name: "90mm単装高角砲", power: 1, accuracy: 1 },

    { id: 137, type: 3, name: "381mm/50 三連装砲改", power: 21, accuracy: -1 },

    { id: 139, type: 2, name: "15.2cm連装砲改", power: 6, accuracy: 4 },

    { id: 141, type: 15, name: "32号対水上電探改", accuracy: 9, isSurface: true, isAir: false },
    { id: 142, type: 15, name: "15m二重測距儀 + 21号電探改二", power: 1, accuracy: 9, isSurface: true, isAir: true },
    {
        id: 143, type: 8, name: "九七式艦攻(村田隊)", torp: 12, accuracy: 2,
        singleBonus: [
            { power: 3, targetId: [277, 594] },
            { power: 2, targetId: [278, 110] },
            { power: 1, targetId: [111, 157] },
        ]
    },
    {
        id: 144, type: 8, name: "天山一二型(村田隊)", torp: 15, accuracy: 2,
        singleBonus: [
            { power: 4, targetId: [461, 466] },
            { power: 3, targetId: [277, 594, 599] },
            { power: 2, targetId: [278, 110, 288, 462, 467] },
            { power: 1, targetId: [111, 112, 157] },
        ]
    },

    { id: 147, type: 1, name: "120mm連装砲", power: 3, accuracy: 1 },
    { id: 148, type: 9, name: "試製南山", bomb: 11 },

    { id: 151, type: 27, name: "試製景雲(艦偵型)", power: 2, accuracy: 2 },

    { id: 154, type: 9, name: "零戦62型(爆戦/岩井隊)", bomb: 4, accuracy: 1 },

    { id: 160, type: 4, name: "10.5cm連装砲", power: 3, accuracy: 2 },
    { id: 161, type: 3, name: "16inch三連装砲 Mk.7", power: 24, accuracy: 4 },
    { id: 162, type: 2, name: "203mm/53連装砲", power: 9, accuracy: -2 },

    { id: 172, type: 4, name: "5inch連装砲 Mk.28 mod.2", power: 4, accuracy: 2 },
    { id: 173, type: 18, name: "Bofors 40mm四連装機関砲", power: 1, accuracy: 1 },

    { id: 183, type: 3, name: "16inch三連装砲 Mk.7 + GFCS", power: 24, accuracy: 7 },

    {
        id: 188, type: 8, name: "Re2001 G改", power: 3, torp: 4,
        singleAddableBonus: [
            { power: 3, targetId: [444, 365] },
        ]
    },

    { id: 190, type: 3, name: "38.1cm Mk.I連装砲", power: 18, accuracy: 1 },
    { id: 191, type: 18, name: "QF 2ポンド8連装ポンポン砲", power: 1 },
    { id: 192, type: 3, name: "38.1cm Mk.I/N連装砲改", power: 19, accuracy: 2 },

    { id: 195, type: 9, name: "SBD", power: 1, bomb: 6, accuracy: 1 },
    { id: 196, type: 8, name: "TBD", power: 1, torp: 5 },

    { id: 199, type: 10, name: "噴式景雲改", bomb: 15, accuracy: 1 },
    { id: 200, type: 10, name: "橘花改", bomb: 11 },

    { id: 212, type: 27, name: "彩雲(東カロリン空)", power: 1, accuracy: 2 },

    { id: 219, type: 9, name: "零式艦戦63型(爆戦)", bomb: 5 },
    { id: 220, type: 4, name: "8cm高角砲改 + 増設機銃", power: 1, accuracy: 2 },

    { id: 229, type: 1, name: "12.7cm単装高角砲(後期型)", power: 1, accuracy: 1 },

    { id: 231, type: 3, name: "30.5cm三連装砲", power: 16, accuracy: 1 },
    { id: 232, type: 3, name: "30.5cm三連装砲改", power: 17, accuracy: 3 },
    { id: 233, type: 9, name: "F4U-1F", power: 1, bomb: 7 },
    { id: 234, type: 4, name: "15.5cm三連装副砲改", power: 7, accuracy: 4 },
    { id: 235, type: 2, name: "15.5cm三連装砲改", power: 7, accuracy: 3 },
    { id: 236, type: 3, name: "41cm三連装砲改", power: 22, accuracy: 4 },

    { id: 240, type: 14, name: "22号対水上電探改四(後期調整型)", power: 1, accuracy: 9, isSurface: true, isAir: false },

    { id: 242, type: 8, name: "Swordfish", power: 2, torp: 3, accuracy: 1 },
    { id: 243, type: 8, name: "Swordfish Mk.II(熟練)", power: 3, torp: 5, accuracy: 3 },
    { id: 244, type: 8, name: "Swordfish Mk.III(熟練)", power: 4, torp: 8, accuracy: 4 },
    { id: 245, type: 3, name: "38cm四連装砲", power: 21, accuracy: 1 },
    { id: 246, type: 3, name: "38cm四連装砲改", power: 22, accuracy: 3 },
    { id: 247, type: 4, name: "15.2cm三連装砲", power: 6, accuracy: 3 },
    { id: 248, type: 9, name: "Skua", bomb: 4 },

    { id: 256, type: 8, name: "TBF", power: 2, torp: 9 },
    { id: 257, type: 8, name: "TBM-3D", power: 2, torp: 9, accuracy: 2 },

    {
        id: 266, type: 1, name: "12.7cm連装砲C型改二", power: 3, accuracy: 1,
        singleAddableBonus: [
            { power: 1, targetId: [42, 242, 497, 43, 243, 145, 44, 244, 498, 45, 245, 144, 405, 323, 46, 246, 458, 350, 587, 457, 369, 459, 351, 469, 47, 247, 95, 248, 463, 468, 96, 249, 199, 97, 250, 489, 98, 251, 490, 413, 327, 414, 328, 583, 687, 48, 252, 198, 49, 253, 464, 470, 17, 225, 18, 226, 19, 227, 456, 362, 190, 300, 20, 228, 181, 316, 186, 322, 168, 317, 556, 167, 320, 557, 170, 312, 558, 169, 313, 559, 415, 329, 454, 354, 455, 355, 122, 294, 132, 301] },
        ],
        singleBonus: [
            { power: 2, targetId: [566, 567, 568] },
        ],
        multiBonus: [
            { // C砲改二2積み
                power: 3, targetId: [566, 567, 568], isBonus: function (slotNumber) {
                    let c = 0;
                    if (slotNumber == 0) {
                        return false;
                    }
                    for (let index = 0; index < slotNumber; index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 266) c++;
                    }
                    return c == 1;
                }
            },
            { // C砲改二3積み
                power: 1, targetId: [566, 567, 568], isBonus: function (slotNumber) {
                    let c = 0;
                    if (slotNumber == 0) {
                        return false;
                    }
                    for (let index = 0; index < slotNumber; index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 266) c++;
                    }
                    return c == 2;
                }
            },
            { //C砲改二水上電探(白露型,朝潮型)
                power: 1, targetId: [42, 242, 497, 43, 243, 145, 44, 244, 498, 45, 245, 144, 405, 323, 46, 246, 458, 350, 587, 457, 369, 459, 351, 469, 47, 247, 95, 248, 463, 468, 96, 249, 199, 97, 250, 489, 98, 251, 490, 413, 327, 414, 328, 583, 687, 48, 252, 198, 49, 253, 464, 470], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    selectedItemList.forEach((t) => {
                        if (t.isSurface) {
                            isSurface = true;
                        }
                    })
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 266) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            },
            { //C砲改二水上電探(陽炎型)
                power: 2, targetId: [17, 225, 566, 18, 226, 567, 19, 227, 568, 456, 362, 190, 300, 20, 228, 181, 316, 186, 322, 168, 317, 556, 167, 320, 557, 170, 312, 558, 169, 313, 559, 415, 329, 454, 354, 455, 355, 122, 294, 132, 301], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    selectedItemList.forEach((t) => {
                        if (t.isSurface) {
                            isSurface = true;
                        }
                    })
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 266) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            },
        ]
    },
    {
        id: 267, type: 1, name: "12.7cm連装砲D型改二", power: 3, accuracy: 2,
        singleAddableBonus: [
            { power: 3, targetId: [542, 563, 564, 543, 578, 569] },
            { power: 2, targetId: [133, 302, 134, 303, 453, 349, 135, 304, 424, 345, 485, 373, 528, 688, 484, 680, 452, 359, 527, 686, 425, 344, 409, 324, 625, 695, 410, 325, 50, 229] },
            { power: 1, targetId: [17, 225, 18, 226, 19, 227, 456, 362, 190, 300, 20, 228, 181, 316, 186, 322, 168, 317, 556, 167, 320, 557, 170, 312, 558, 169, 313, 559, 415, 329, 454, 354, 455, 355, 122, 294, 132, 301] }
        ],
        singleBonus: [
            { power: 2, targetId: [566, 567, 568] },
        ],
        multiBonus: [
            { // D砲改二2積み,3積み
                power: 1, targetId: [566, 567, 568], isBonus: function (slotNumber) {
                    let c = 0;
                    if (slotNumber == 0) {
                        return false;
                    }
                    for (let index = 0; index < slotNumber; index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 267) c++;
                    }
                    return c == 1 || c == 2;
                }
            },
            { //D砲改二水上電探(夕雲型改二)
                power: 3, targetId: [542, 563, 564, 543, 578, 569], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    selectedItemList.forEach((t) => {
                        if (t.isSurface) {
                            isSurface = true;
                        }
                    })
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 267) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            },
            { //D砲改二水上電探(夕雲型)
                power: 2, targetId: [133, 302, 134, 303, 453, 349, 135, 304, 424, 345, 485, 373, 528, 688, 484, 680, 452, 359, 527, 686, 425, 344, 409, 324, 625, 695, 410, 325], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    selectedItemList.forEach((t) => {
                        if (t.isSurface) {
                            isSurface = true;
                        }
                    })
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 267) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            },
            { //D砲改二水上電探(島風改)
                power: 1, targetId: [229], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    selectedItemList.forEach((t) => {
                        if (t.isSurface) {
                            isSurface = true;
                        }
                    })
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 267) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            },
        ]
    },

    { id: 273, type: 27, name: "彩雲(偵四)", accuracy: 2 },
    { id: 274, type: 18, name: "12cm30連装噴進砲改二", accuracy: 1 },
    { id: 275, type: 4, name: "10cm連装高角砲改 + 増設機銃", power: 2, accuracy: 2 },
    { id: 276, type: 3, name: "46cm三連装砲改", power: 27, accuracy: 2 },
    { id: 277, type: 9, name: "FM-2", power: 2, bomb: 2, accuracy: 2 },
    { id: 278, type: 15, name: "SKレーダー", accuracy: 1, isSurface: true, isAir: true },
    { id: 279, type: 15, name: "SK + SGレーダー", power: 1, accuracy: 4, isSurface: true, isAir: true },
    { id: 280, type: 1, name: "QF 4.7inch砲 Mk.XII改", power: 3, accuracy: 1 },
    { id: 281, type: 3, name: "51cm連装砲", power: 32, accuracy: 1 },
    {
        id: 282, type: 1, name: "130m B-13連装砲", power: 4,
        singleAddableBonus: [
            { power: 2, targetId: [516, 395, 147, 115, 293, 622, 623, 624] },
        ]
    },

    { id: 284, type: 1, name: "5inch単装砲 Mk.30", power: 2, accuracy: 1 },

    {
        id: 289, type: 3, name: "35.6cn三連装砲改(ダズル迷彩仕様)", power: 19, accuracy: 3,
        singleAddableBonus: [
            { power: 2, targetId: [149, 151] },
            { power: 1, targetId: [150, 152] },
        ],
        multiBonus: [
            { //水上電探
                power: 2, targetId: [149, 151], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.isSurface) {
                            isSurface = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 289) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            }
        ]
    },
    {
        id: 290, type: 3, name: "41cm三連装砲改二", power: 23, accuracy: 5,
        singleAddableBonus: [
            { power: 3, targetId: [553, 554] },
            { power: 2, targetId: [82, 88] },
            { power: 1, targetId: [411, 412] },
        ],
        multiBonus: [
            { //41cm連装砲改二(長門型改二)
                power: 2, targetId: [541, 573], isBonus: function (slotNumber) {
                    let c = 0;
                    let is41TwinGun = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.id == 318) {
                            is41TwinGun = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 290) {
                            c++;
                        }
                    }
                    return is41TwinGun && c == 1;
                }
            },
            { //41cm連装砲改二(日向改二)
                power: 1, targetId: [554], isBonus: function (slotNumber) {
                    let c = 0;
                    let is41TwinGun = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.id == 318) {
                            is41TwinGun = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 290) {
                            c++;
                        }
                    }
                    return is41TwinGun && c == 1;
                }
            },
            { //対空電探+41cm連装砲改二(日向改二)
                power: 1, targetId: [541, 573], isBonus: function (slotNumber) {
                    let c = 0;
                    let isAir = false;
                    let is41TwinGun = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.id == 318) {
                            is41TwinGun = true;
                        }
                    }
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.isAir) {
                            isAir = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 290) {
                            c++;
                        }
                    }
                    return isAir && is41TwinGun && c == 1;
                }
            },
        ]
    },
    {
        id: 291, type: 9, name: "彗星二二型(六三四空)", bomb: 11, accuracy: 2,
        singleAddableBonus: [
            { power: 6, targetId: [553, 554] },
        ]
    },
    {
        id: 292, type: 9, name: "彗星二二型(六三四空/熟練)", bomb: 12, accuracy: 3,
        singleAddableBonus: [
            { power: 8, targetId: [553, 554] },
        ]
    },
    {
        id: 293, type: 1, name: "12cm単装砲改二", power: 1, accuracy: 1,
        singleAddableBonus: [
            { power: 2, targetId: [471, 476, 472, 370, 473, 363, 474, 371, 475, 387, 1, 254, 434, 2, 255, 435, 164, 308, 165, 309, 28, 256, 418, 481, 366, 29, 257, 548, 6, 258, 30, 259, 7, 260, 31, 261] },
        ],
        multiBonus: [
            {
                power: 2, targetId: [471, 476, 472, 370, 473, 363, 474, 371, 475, 387, 1, 254, 434, 2, 255, 435, 164, 308, 165, 309, 28, 256, 418, 481, 366, 29, 257, 548, 6, 258, 30, 259, 7, 260, 31, 261], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.isSurface) {
                            isSurface = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 293) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            }
        ]
    },
    {
        id: 294, type: 1, name: "12.7cm連装砲A型改二", power: 2, accuracy: 1,
        singleAddableBonus: [
            { power: 1, targetId: [9, 201, 436, 10, 202, 32, 203, 11, 204, 33, 205, 420, 12, 206, 486, 368, 13, 207, 195, 14, 208, 627, 479, 390, 480, 391, 93, 230, 15, 231, 94, 232, 16, 233, 407, 34, 234, 437, 35, 235, 147, 36, 236, 37, 237] },
        ],
        multiBonus: [
            { // 水上電探(吹雪型,綾波型,暁型)
                power: 3, targetId: [9, 201, 436, 10, 202, 32, 203, 11, 204, 33, 205, 420, 12, 206, 486, 368, 13, 207, 195, 14, 208, 627, 479, 390, 480, 391, 93, 230, 15, 231, 94, 232, 16, 233, 407, 34, 234, 437, 35, 235, 147, 36, 236, 37, 237], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.isSurface) {
                            isSurface = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 294) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            }
        ]
    },
    {
        id: 295, type: 1, name: "12.7cm連装砲A型改三(戦時改修) + 高射装置", power: 2, accuracy: 1,
        singleAddableBonus: [
            { power: 2, targetId: [9, 201, 436, 10, 202, 32, 203, 11, 204, 33, 205, 420, 12, 206, 486, 368, 13, 207, 195, 14, 208, 627, 479, 390, 480, 391, 93, 230, 15, 231, 94, 232, 16, 233, 407, 34, 234, 437, 35, 235, 147, 36, 236, 37, 237] }
        ],
        multiBonus: [
            { // 水上電探(吹雪型,綾波型,暁型)
                power: 3, targetId: [9, 201, 436, 10, 202, 32, 203, 11, 204, 33, 205, 420, 12, 206, 486, 368, 13, 207, 195, 14, 208, 627, 479, 390, 480, 391, 93, 230, 15, 231, 94, 232, 16, 233, 407, 34, 234, 437, 35, 235, 147, 36, 236, 37, 237], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.isSurface) {
                            isSurface = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 295) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            },
        ]
    },
    {
        id: 296, type: 1, name: "12.7cm連装砲B型改四(戦時改修) + 高射装置", power: 3, accuracy: 1,
        singleAddableBonus: [
            { power: 3, targetId: [627] },
            { power: 2, targetId: [497, 145, 144] },
            { power: 1, targetId: [13, 207, 195, 14, 208, 479, 390, 480, 391, 93, 230, 15, 231, 94, 232, 16, 233, 407, 34, 234, 437, 35, 235, 147, 36, 236, 37, 237, 38, 238, 326, 39, 239, 40, 240, 41, 241, 419, 42, 242, 43, 243, 44, 244, 498, 45, 245, 405, 323, 46, 246, 458, 350, 587, 457, 369, 459, 351, 469, 47, 247] },
        ],
        multiBonus: [
            { // 水上電探(綾波型,暁型,初春型,白露型)
                power: 1, targetId: [13, 207, 195, 14, 208, 627, 479, 390, 480, 391, 93, 230, 15, 231, 94, 232, 16, 233, 407, 34, 234, 437, 35, 235, 147, 36, 236, 37, 237, 38, 238, 326, 39, 239, 40, 240, 41, 241, 419, 42, 242, 497, 43, 243, 145, 44, 244, 498, 45, 245, 144, 405, 323, 46, 246, 458, 350, 587, 457, 369, 459, 351, 469, 47, 247], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.isSurface) {
                            isSurface = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 296) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            }
        ]
    },
    { id: 297, type: 1, name: "12.7cm連装砲A型", power: 2 },
    {
        id: 298, type: 3, name: "16inch Mk.I三連装砲", power: 21, accuracy: 2,
        singleAddableBonus: [
            { power: 2, targetId: [571, 576, 439, 364] },
            { power: 1, targetId: [149, 150, 151, 152] },
        ]
    },
    {
        id: 299, type: 3, name: "16inch Mk.I三連装砲 + AFCT改", power: 22, accuracy: 4,
        singleAddableBonus: [
            { power: 2, targetId: [571, 576, 439, 364] },
            { power: 1, targetId: [149, 150, 151, 152] },
        ]
    },
    {
        id: 300, type: 3, name: "16inch Mk.I三連装砲改 + FCR type284", power: 23, accuracy: 6,
        singleAddableBonus: [
            { power: 2, targetId: [571, 576, 439, 364] },
            { power: 1, targetId: [149, 150, 151, 152] },
        ]
    },
    { id: 301, type: 18, name: "20連装7inch UP Rocket Launchers" },
    { id: 302, type: 8, name: "九七式艦攻(九三一空/熟練)", torp: 8, accuracy: 2 },
    { id: 303, type: 2, name: "Bofors15.2cm連装砲 Model1930", power: 5, accuracy: 3 },

    {
        id: 305, type: 9, name: "Ju87C改二(KMX搭載機)", bomb: 9, accuracy: 2,
        singleAddableBonus: [
            { power: 1, targetId: [432, 353, 444, 365] }
        ]
    },
    {
        id: 306, type: 9, name: "Ju87C改二(KMX搭載機/熟練)", bomb: 10, accuracy: 3,
        singleBonus: [
            { power: 1, targetId: [432, 353, 444, 365] }
        ]
    },
    { id: 307, type: 14, name: "GFCS Mk.37", power: 2, accuracy: 9, isSurface: true, isAir: true },
    {
        id: 308, type: 1, name: "5inch単装砲 Mk.30改 + GFCS Mk.37", power: 3, accuracy: 6,
        singleAddableBonus: [
            { power: 2, targetId: [596, 692, 562, 689, 561, 681] },
            { power: 1, targetId: [597, 696, 471, 476, 472, 370, 473, 363, 474, 371, 475, 387, 1, 254, 434, 2, 255, 435, 164, 308, 165, 309, 28, 256, 418, 481, 366, 29, 257, 548, 6, 258, 30, 259, 7, 260, 31, 261, 9, 201, 426, 10, 202, 32, 203, 11, 204, 33, 205, 420, 12, 206, 486, 368, 13, 207, 195, 14, 208, 627, 479, 390, 480, 391, 93, 230, 15, 231, 94, 232, 16, 233, 407, 34, 234, 437, 35, 235, 147, 36, 236, 37, 237, 38, 238, 326, 39, 239, 40, 240, 41, 241, 419, 42, 242, 497, 43, 243, 145, 44, 244, 498, 45, 245, 144, 405, 323, 46, 246, 458, 350, 587, 457, 369, 459, 351, 469, 47, 247, 95, 248, 463, 468, 96, 249, 199, 97, 250, 489, 98, 251, 490, 413, 327, 414, 328, 583, 687, 48, 252, 198, 49, 253, 464, 470, 17, 225, 566, 18, 226, 567, 19, 227, 568, 456, 362, 190, 300, 20, 228, 181, 316, 186, 322, 168, 317, 556, 167, 320, 557, 170, 312, 558, 169, 313, 559, 415, 329, 454, 354, 455, 355, 122, 294, 132, 301, 133, 302, 542, 134, 303, 563, 453, 349, 564, 135, 304, 543, 424, 345, 485, 373, 528, 688, 484, 680, 452, 359, 569, 527, 686, 425, 344, 578, 409, 324, 625, 695, 410, 325, 421, 330, 422, 346, 532, 537, 423, 357, 50, 229] },
        ],
    },

    { id: 310, type: 2, name: "14cm連装砲改", power: 5, accuracy: 3 },

    {
        id: 313, type: 1, name: "5inch単装速射砲 Mk.30改", power: 3, accuracy: 2,
        singleAddableBonus: [
            { power: 2, targetId: [596, 692, 562, 689, 561, 681] },
        ]
    },

    { id: 315, type: 14, name: "SGレーダー(初期型)", power: 1, accuracy: 8, isSurface: true, isAir: true },
    {
        id: 316, type: 9, name: "Re.2001 CB改", power: 3, bomb: 6, accuracy: 1,
        singleAddableBonus: [
            { power: 4, targetId: [444, 365] }
        ]
    },
    {
        id: 317, type: 17, name: "三式弾改", power: 3, accuracy: 1,
        singleBonus: [
            { power: 3, targetId: [149, 591, 592, 152] },
            { power: 2, targetId: [150, 151, 573] },
            { power: 1, targetId: [78, 209, 86, 210, 79, 211, 85, 212, 541] }
        ]
    },
    {
        id: 318, type: 3, name: "41cm連装砲改二", power: 21, accuracy: 5,
        singleAddableBonus: [
            { power: 3, targetId: [541, 573, 554] },
            { power: 2, targetId: [553, 82, 88] },
            { power: 1, targetId: [441, 412] },
        ]
    },
    {
        id: 319, type: 9, name: "彗星一二型(六三四空/三号爆弾搭載機)", bomb: 12, accuracy: 1,
        singleBonus: [
            { power: 7, targetId: [553, 554] },
        ]
    },
    {
        id: 320, type: 9, name: "彗星一二型(三一号光電管爆弾搭載機)", bomb: 11, accuracy: 5,
        singleBonus: [
            { power: 4, targetId: [508, 509, 554] },
            { power: 3, targetId: [196, 197] },
            { power: 2, targetId: [553] },
        ]
    },

    {
        id: 328, type: 3, name: "35.6cm連装砲改", power: 16, accuracy: 3,
        singleAddableBonus: [
            { power: 3, targetId: [591, 592] },
            { power: 2, targetId: [149, 150, 151, 152, 209, 210, 211, 212] },
            { power: 1, targetId: [78, 86, 79, 85, 26, 286, 411, 27, 287, 412, 77, 82, 553, 87, 88, 554] }
        ]
    },
    {
        id: 329, type: 3, name: "35.6cm連装砲改二", power: 17, accuracy: 5,
        singleAddableBonus: [
            { power: 4, targetId: [591, 592] },
            { power: 3, targetId: [149, 150, 151, 152] },
            { power: 2, targetId: [209, 210, 211, 212] },
            { power: 1, targetId: [78, 86, 79, 85, 26, 286, 411, 27, 287, 412, 77, 82, 553, 87, 88, 554] },
        ]
    },
    {
        id: 330, type: 3, name: "16inch Mk.I連装砲", power: 20, accuracy: 1,
        singleAddableBonus: [
            { power: 2, targetId: [576, 541, 573] },
            { power: 1, targetId: [1496, 601, 275, 80, 81, 276] }
        ]
    },
    {
        id: 331, type: 3, name: "16inch Mk.V連装砲", power: 21, accuracy: 2,
        singleAddableBonus: [
            { power: 2, targetId: [1496, 576, 541, 573] },
            { power: 1, targetId: [275, 276] },
        ]
    },
    {
        id: 332, type: 3, name: "16inch Mk.VIII連装砲改", power: 21, accuracy: 4,
        singleAddableBonus: [
            { power: 2, targetId: [1496, 576, 541, 573] },
            { power: 1, targetId: [275, 276, 601] },
        ]
    },

    { id: 340, type: 2, name: "152mm/55 三連装速射砲", power: 8, accuracy: 1 },
    { id: 341, type: 2, name: "152mm/55 三連装速射砲改", power: 9, accuracy: 2 },
    {
        id: 342, type: 8, name: "流星改(一航戦)", torp: 14, accuracy: 1,
        singleAddableBonus: [
            { power: 3, targetId: [599] },
            { power: 2, targetId: [594] },
            { power: 1, targetId: [277, 278, 461, 466, 462, 467] },
        ]
    },
    {
        id: 343, type: 8, name: "流星改(一航戦/熟練)", torp: 15, accuracy: 2,
        singleAddableBonus: [
            { power: 5, targetId: [599] },
            { power: 3, targetId: [594] },
            { power: 2, targetId: [277, 278] },
            { power: 1, targetId: [461, 466, 462, 467] },
        ]
    },
    {
        id: 344, type: 8, name: "九七式艦攻改 試製三号戊型(空六号電探改装備機)", torp: 7, accuracy: 1,
        singleAddableBonus: [
            { power: 4, targetId: [318] },
            { power: 3, targetId: [599] },
            { power: 2, targetId: [555, 560, 282] },
        ]
    },
    {
        id: 345, type: 8, name: "九七式艦攻改(熟練)試製三号戊型(空六号電探改装備機)", torp: 9, accuracy: 2,
        singleAddableBonus: [
            { power: 5, targetId: [318] },
            { power: 3, targetId: [555, 560, 599, 282] },
        ]
    },

    {
        id: 356, type: 2, name: "8inch三連装砲 Mk.9", power: 11,
        singleAddableBonus: [
            { power: 2, targetId: [595, 600] },
            { power: 1, targetId: [70, 73, 120, 121, 124, 129, 503, 125, 130, 504] },
        ]
    },
    {
        id: 357, type: 2, name: "8inch三連装砲 Mk.9 mod.2", power: 12, accuracy: 1,
        singleAddableBonus: [
            { power: 2, targetId: [595, 600] },
            { power: 1, targetId: [70, 73, 120, 121, 124, 129, 503, 125, 130, 504] },
        ]
    },
    { id: 358, type: 4, name: "5inch 単装高角砲群", power: 2, accuracy: 1 },
    { id: 359, type: 2, name: "6inch連装速射砲 Mk.XXI", power: 5, accuracy: 2 },
    { id: 360, type: 2, name: "Bofors 15cm連装速射砲 Mk.9 Model 1938", power: 6, accuracy: 3 },
    { id: 361, type: 2, name: "Bofors 15cm連装速射砲 Mk.9改 + 単装速射砲 Mk.10改 Model 1938", power: 7, accuracy: 3 },
    { id: 362, type: 2, name: "5inch連装両用砲(集中配備)", power: 5, accuracy: 2 },
    { id: 363, type: 2, name: "GFCS Mk.37 + 5inch連装両用砲(集中配備)", power: 6, accuracy: 6 },

    {
        id: 365, type: 16, name: "一式徹甲弾改", power: 11, accuracy: 2,
        singleBonus: [
            { power: 3, targetId: [591, 592] },
            { power: 2, targetId: [136, 148, 546, 541, 573] },
            { power: 1, targetId: [78, 209, 86, 210, 79, 211, 85, 212, 26, 286, 411, 27, 287, 412, 77, 82, 553, 87, 88, 554, 80, 81, 131, 143] }
        ]
    },
    {
        id: 366, type: 1, name: "12.7cm連装砲D型改三", power: 3, accuracy: 2,
        singleAddableBonus: [
            { power: 4, targetId: [569] },
            { power: 3, targetId: [542, 563, 564, 543, 578] },
            { power: 2, targetId: [133, 302, 134, 303, 453, 349, 135, 304, 424, 345, 485, 373, 528, 688, 484, 680, 452, 359, 527, 686, 425, 344, 409, 324, 625, 695, 410, 325, 50, 229, 566, 567, 568] },
            { power: 1, targetId: [17, 225, 18, 226, 19, 227, 456, 362, 190, 300, 20, 228, 181, 316, 186, 322, 168, 317, 556, 167, 320, 557, 170, 312, 558, 169, 313, 559, 415, 329, 454, 354, 455, 355, 122, 294, 132, 301] },
        ],
        multiBonus: [
            { // 水上電探(夕雲型改二,島風改)
                power: 2, targetId: [542, 563, 564, 543, 578, 569, 229], isBonus: function (slotNumber) {
                    let c = 0;
                    let isSurface = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.isSurface) {
                            isSurface = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 366) {
                            c++;
                        }
                    }
                    return isSurface && c == 1;
                }
            },
            { // 対空電探(夕雲型改二,島風改)
                power: 1, targetId: [542, 563, 564, 543, 578, 569, 229], isBonus: function (slotNumber) {
                    let c = 0;
                    let isAir = false;
                    for (let index = 0; index < selectedItemList.length; index++) {
                        const item = selectedItemList[index];
                        if (item.isAir) {
                            isAir = true;
                        }
                    }
                    for (let index = 0; index < (parseInt(slotNumber) + 1); index++) {
                        const item = selectedItemList[index] ? selectedItemList[index] : 0;
                        if (item.id == 366) {
                            c++;
                        }
                    }
                    return isAir && c == 1;
                }
            },
        ]
    },

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
    {
        type: 8, name: "PT小鬼群", main_id: 1637, remodel: [
            { id: 1637, state: "A", luck: 0, avoidance: 0, avoidance_item: 0, armor: 19, hp: 9 },
            { id: 1638, state: "B", luck: 0, avoidance: 0, avoidance_item: 0, armor: 29, hp: 9 },
            { id: 1639, state: "C", luck: 0, avoidance: 0, avoidance_item: 0, armor: 29, hp: 15 },
            { id: 1640, state: "D", luck: 0, avoidance: 0, avoidance_item: 0, armor: 39, hp: 18 },
        ]
    },
]