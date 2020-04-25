let hasBbList = false;
let hasCvList = false;
let hasCaList = false;
let hasClList = false;
let hasDdList = false;
let hasMyFleetTypeList = [hasBbList, hasCvList, hasCaList, hasClList, hasDdList];
let hasEnemyBbList = false;
let hasEnemyCvList = false;
let hasEnemyCaList = false;
let hasEnemyClList = false;
let hasEnemyDdList = false;
let hasEnemyAvList = false;
let hasEnemyFleetTypeList = [hasEnemyBbList, hasEnemyCvList, hasEnemyCaList, hasEnemyClList, hasEnemyDdList, , , hasEnemyAvList];
let selectedMyFleet;
let selectedEnemyFleet;
let selectedItemList = [0, 0, 0, 0, 0];
let itemAccuracy = 0;
let isKira = false;
let isItemOpen = false;

$(function () {
    $("#create-myfleet, #myfleet-img, #myfleet-name").on("click", function () {
        setFleetList(1, false);
    });
    $("#cv-tab").on("click", function () {
        setFleetList(2, false);
    });
    $("#ca-tab").on("click", function () {
        setFleetList(3, false);
    });
    $("#dd-tab").on("click", function () {
        setFleetList(5, false);
    })

    $("#create-enemy, #enemy-img, #enemy-name").on("click", function () {
        setFleetList(1, true);
    });
    $("#cv-tab-enemy").on("click", function () {
        setFleetList(2, true);
    });
    $("#ca-tab-enemy").on("click", function () {
        setFleetList(3, true);
    });
    $("#cl-tab-enemy").on("click", function () {
        setFleetList(4, true);
    });
    $("#dd-tab-enemy").on("click", function () {
        setFleetList(5, true);
    });
    $("#av-tab-enemy").on("click", function () {
        setFleetList(8, true);
    });

    $("#kira").on("click", function () {
        const button = $("#kira");
        isKira = !isKira;
        if (isKira) {
            button.attr("class", "btn btn-default btn-sm kira");
            button.html("キラを消す");
        } else {
            button.attr("class", "btn btn-default btn-sm no-kira");
            button.html("キラを付ける");
        }
        getResultData();
    })
    $(".myfleet .lv, .myfleet .luck, .my-formation, .enemy-formation, .engagement, .critical").on("change", function () {
        getResultData();
    })

    //艦娘の選択モーダルを構成する
    const setFleetList = (shipType, isEnemy) => {
        if (hasMyFleetTypeList[shipType - 1] && !isEnemy) {
            return;
        };
        if (hasEnemyFleetTypeList[shipType - 1] && isEnemy) {
            return;
        }
        let shipList;
        let targetId;
        if (isEnemy) {
            shipList = ENEMY_DATA;
            targetId = `#${SHIP_TYPE.find(item => item.id === shipType).type}-enemy`;
            hasEnemyFleetTypeList[shipType - 1] = true;
        } else {
            shipList = SHIP_DATA;
            targetId = `#${SHIP_TYPE.find(item => item.id === shipType).type}`;
            hasMyFleetTypeList[shipType - 1] = true;
        }
        for (let index = 0; index < shipList.length; index++) {
            const ship = shipList[index];
            if (ship.type == shipType) {
                const main_id = ship.main_id;
                const name = ship.name;
                const tr = $("<tr>");
                const td = $("<td>");
                const img = $("<img>", { class: "banner", src: `./images/ships/${main_id}.png`, alt: `${name}`, "data-dismiss": "modal", "data-id": `${main_id}`, "data-main_id": `${main_id}` });
                const span = $("<span>", { class: "fleet-name", text: `${name}` });
                let selectedFleet;
                td.append(img).append(span);
                tr.append(td);
                for (let index = 0; index < ship.remodel.length; index++) {
                    selectedFleet = Object.assign({}, ship.remodel[index]);
                    const state = selectedFleet.state;
                    const title = `${selectedFleet.power ? `火力 ${selectedFleet.power}, ` : ""}${selectedFleet.hp ? `装甲 ${selectedFleet.hp}, ` : ""}${selectedFleet.armor ? `装甲 ${selectedFleet.armor}, ` : ""}${selectedFleet.luck ? `運 ${selectedFleet.luck}` : ""}`;
                    const button = $("<button>", { type: "button", class: "btn btn-default set-fleet", "data-dismiss": "modal", "data-id": `${selectedFleet.id}`, "data-main_id": `${main_id}` })
                        .append($("<div>", { "class": "item-tooltip", "data-toggle": "tooltip", title: title, text: state }));
                    td.append(button);
                }
                $(`${targetId} .table tbody`).append(tr);
            }
        }
        $('[data-toggle="tooltip"]').tooltip();
        $(`${targetId} .set-fleet, ${targetId} .banner`).on("click", function () {
            changeFleet(this);
            if (!isEnemy) {
                resetItemAccuracy();
                setItemForm();
                setItemList();
            }
            getResultData();
        });
    }

    //艦娘を選択する
    const changeFleet = (obj) => {
        const id = $(obj).data("id");
        const main_id = $(obj).data("main_id");
        let shipData;
        let selectedFleet;
        if (id > 1500) {
            shipData = ENEMY_DATA;
        } else {
            shipData = SHIP_DATA;
        }
        let name = "";
        for (let index = 0; index < shipData.length; index++) {
            const ship = shipData[index];
            if (ship.main_id == main_id) {
                name = ship.name;
                for (let index = 0; index < ship.remodel.length; index++) {
                    if (ship.remodel[index].id == id && id <= 1500) {
                        selectedMyFleet = ship.remodel[index];
                        selectedMyFleet.type = ship.type;
                        selectedFleet = selectedMyFleet;
                        break;
                    } else if (ship.remodel[index].id == id) {
                        selectedEnemyFleet = ship.remodel[index];
                        selectedEnemyFleet.type = ship.type;
                        selectedFleet = selectedEnemyFleet;
                        break;
                    }
                }
            }
        }
        const state = selectedFleet.state;
        const luck = selectedFleet.luck;
        const src = `./images/ships/${id}.png`;
        let setState = state;
        if (setState == "未改造" || setState == "normal") {
            setState = "";
        }
        const setName = name + " " + setState;
        const defaultLevel = 99;

        if (id > 1500) {
            $(".enemy .fleet-name").html(setName);
            $(".enemy .fleet-img").attr("src", src);
            $(".enemy .hp").html(selectedFleet.hp);
            $(".enemy .armor").html(selectedFleet.armor);
            $(".enemy .avoidance").html(selectedFleet.avoidance + selectedFleet.avoidance_item);
            $(".enemy .luck").html(luck);
        } else {
            const power = selectedMyFleet.type == 2 ? Math.floor((selectedMyFleet.power - 1) * 1.5) + 55 : selectedMyFleet.power + 4;
            $(`.myfleet .fleet-name`).html(setName);
            $(".myfleet .fleet-img").attr("src", src);
            $(".myfleet .luck").val(luck);
            $(".myfleet .power").html(power);
            $(".myfleet .lv").val(defaultLevel);
            //結果背景画像変更
            const img = $('<img>', { 'src': `./images/full/${id}.png` });
            img.on("load", function () {
                $(".result.box .background-img").css("background-image", `url(./images/full/${id}.png)`);
            });
        }
        getResultData();
    }

    //装備スロットを構成する
    const setItemForm = () => {
        $(".myfleet .items tr").remove();
        for (let index = 0; index < selectedMyFleet.slot; index++) {
            const button = $("<button>", { type: "button", class: "btn btn-default item", id: `itemSlot${index}`, "data-toggle": "modal", "data-target": "#select-myitem", text: "装備" + (index + 1), value: index });
            const remove = $("<button>", { type: "button", class: "btn btn-default", html: "&times;" });
            remove.on("click", function () { setItem(index, 0) });
            const tr = $("<tr>").append($("<td>")
                .append(button))
                .append(remove)
                .append($("<td>")
                )
            $(".myfleet .items tbody").append(tr);
        }
        const remove = $("<button>", { type: "button", class: "btn btn-default", html: "&times;" });
        remove.on("click", function () { setItem(selectedMyFleet.slot, 0) });
        const tr = $("<tr>").append($("<td>")
            .append($("<button>", { type: "button", class: "btn btn-default item add-item", id: `itemSlot${selectedMyFleet.slot}`, "data-toggle": "modal", "data-target": "#select-myitem", text: "補強増設" })))
            .append(remove)
            .append($("<td>")
            )
        $(".myfleet .items tbody").append(tr);
    }

    //装備の選択モーダルを構成する
    const setItemList = () => {
        const itemType = [
            { type: "l-gun", id: [3] },
            { type: "m-gun", id: [2] },
            { type: "s-gun", id: [1] },
            { type: "secondaly-gun", id: [4] },
            { type: "fighter", id: [7] },
            { type: "attacker", id: [8] },
            { type: "bomber", id: [9, 10] },
            { type: "torpedo", id: [5, 6] },
            { type: "radar", id: [14, 15] },
            { type: "other", id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29] },
        ];
        const expansionItemType = [18, 25, 26, 28];
        $(".myfleet .item").on("click", function () {
            $(".item-list .table tr").remove();
            let targetTabId;
            const slotButtonId = this.id;
            const slotNumber = slotButtonId.charAt(slotButtonId.length - 1)
            let isExpansionSlot = selectedMyFleet.slot == slotButtonId.charAt(slotButtonId.length - 1);
            isItemOpen = true;
            selectedItemList[slotNumber] = 0;
            const t = getMultiBonus(selectedItemList);
            for (let index = 0; index < ITEM_DATA.length; index++) {
                const item = $.extend(true, {}, ITEM_DATA[index]);
                let isException = false;
                let isSpecial = false;
                let isExpansion = false;
                let canHave = false;
                if (isExpansionSlot) {
                    isExpansion = expansionItemType.some(c => c == item.type);
                    canHave = SHIP_TYPE[selectedMyFleet.type - 1].canHaveItem.some(c => c == item.type) && isExpansion;
                } else {
                    canHave = SHIP_TYPE[selectedMyFleet.type - 1].canHaveItem.some(c => c == item.type);
                }
                if (canHave) {
                    const isExceptionId = selectedMyFleet.cantHaveItemId ? selectedMyFleet.cantHaveItemId.some(
                        c => c == item.id
                    ) : false;
                    const isExceptionType = selectedMyFleet.cantHaveItemType ? selectedMyFleet.cantHaveItemType.some(
                        c => c == item.type
                    ) : false;
                    isException = isExceptionId || isExceptionType;
                } else if (isExpansion) {
                    const isSpecialId = selectedMyFleet.specialCanHaveItemId ? selectedMyFleet.specialCanHaveItemId.some(
                        c => c == item.id
                    ) : false;
                    const isSpecialType = selectedMyFleet.specialCanHaveItemType ? selectedMyFleet.specialCanHaveItemType.some(
                        c => c == item.type
                    ) : false;
                    isSpecial = isSpecialId || isSpecialType;
                } else {
                    isSpecial = selectedMyFleet.expansionCanHaveItemId ? selectedMyFleet.expansionCanHaveItemId.some(
                        c => c == item.id
                    ) : false;
                }
                if ((canHave && !isException) || isSpecial) {
                    for (let index = 0; index < itemType.length; index++) {
                        if (itemType[index].id.indexOf(item.type) != -1) {
                            targetTabId = itemType[index].type;
                            break;
                        }
                    }

                    let title = `${item.power ? `火力 ${item.power}, ` : ""}${item.bomb ? `爆装 ${item.bomb}, ` : ""}${item.torp ? `雷装 ${item.torp}, ` : ""}${item.accuracy ? `命中 ${item.accuracy}` : ""}`;
                    let tip = $("<div>", { "class": "item-tooltip", "data-toggle": "tooltip", title: title, text: item.name })
                    const button = $("<button>", { type: "button", class: "btn btn-default item", "data-toggle": "modal", "data-target": "#select-myitem" }).append(tip);
                    //装備マウスオーバー時の処理
                    button.on("mouseover", function () {
                        if (isItemOpen) {

                            const r = item.singleAddableBonus ? getSingleAddableBonus(item) : 0;
                            const s = item.singleBonus ? getSingleBonus(item, slotNumber) : 0;
                            selectedItemList[slotNumber] = item;
                            const ta = getMultiBonus(selectedItemList);
                            const bonusPower = (r.power ? r.power : 0) + (s.power ? s.power : 0) + (ta.power ? ta.power : 0) - (t.power ? t.power : 0);
                            const title = `${item.power ? `火力 ${item.power}` : `${bonusPower > 0 ? "火力 " : ""}`}${bonusPower > 0 ? `(+${bonusPower}), ` : `${item.power ? ", " : ""}`}${item.bomb ? `爆装 ${item.bomb}, ` : ""}${item.torp ? `雷装 ${item.torp}, ` : ""}${item.accuracy ? `命中 ${item.accuracy}` : ""}`;
                            $(this).children(".item-tooltip").attr("title", title).tooltip("fixTitle").tooltip("show");
                            $('[data-toggle="tooltip"]').tooltip();
                        }
                    })
                    //装備選択時の処理
                    button.on("click", function () {
                        isItemOpen = false;
                        setItem(slotNumber, item);
                    });
                    const tr = $("<tr>").append($("<td>").append(button))
                    $(`#${targetTabId} tbody`).append(tr);
                    $('[data-toggle="tooltip"]').tooltip();
                }
            }
        });
    }

    const resetItemAccuracy = () => {
        itemAccuracy = 0;
        selectedItemList.length = 0;
        $(".myfleet .accuracy").html(itemAccuracy);
    }
})

const setItem = (slotNumber, item) => {
    if (slotNumber == selectedMyFleet.slot && !item.name) {
        const text = "補強増設";
        $(`#itemSlot${slotNumber}`).text(text);
    } else {
        $(`#itemSlot${slotNumber}`).text(item.name ? item.name : `装備${slotNumber + 1}`);
    }
    selectedItemList[slotNumber] = item;
    let itemPower = 0;
    let itemTorp = 0;
    let itemBomb = 0;
    let power = 0;
    itemAccuracy = 0;
    const singleAddableBonus = item.singleAddableBonus ? getSingleAddableBonus(item) : 0;
    const singleBonus = item.singleBonus ? getSingleBonus(item, slotNumber) : 0;
    const multiBonus = getMultiBonus(selectedItemList);
    selectedItemList[slotNumber].power = (selectedItemList[slotNumber].power ? selectedItemList[slotNumber].power : 0) + (singleAddableBonus.power ? singleAddableBonus.power : 0) + (singleBonus.power ? singleBonus.power : 0);

    selectedItemList.forEach((t) => {
        if (t != 0) {
            itemPower += t.power ? t.power : 0;
            itemTorp += t.torp ? t.torp : 0;
            itemBomb += t.bomb ? t.bomb : 0;
            itemAccuracy += t.accuracy ? t.accuracy : 0;
        }
        power = selectedMyFleet.power + itemPower;
        //空母用計算式
        if (selectedMyFleet.type == 2) {
            power = Math.floor((power + itemTorp + Math.floor(itemBomb * 1.3) - 1) * 1.5) + 55;
        } else {
            power += 4;
        }
    })
    power += multiBonus.power ? multiBonus.power : 0;

    $(".myfleet .power").html(power);
    $(".myfleet .accuracy").html(itemAccuracy);
    getResultData();
}

const getSingleAddableBonus = (item) => {
    let power = 0;
    let accuracy = 0;
    let torp = 0;
    let bomb = 0;
    item.singleAddableBonus.forEach((t) => {
        if (t.targetId.some(c => c == selectedMyFleet.id)) {
            power += t.power ? t.power : 0;
            torp += t.torp ? t.torp : 0;
            bomb += t.bomb ? t.bomb : 0;
            accuracy += t.accuracy ? t.accuracy : 0;
        }
    })
    return { power: power, torp: torp, bomb: bomb, accuracy: accuracy };

}

const getSingleBonus = (item, slotNum) => {
    let power = 0;
    let accuracy = 0;
    let torp = 0;
    let bomb = 0;
    item.singleBonus.forEach((t) => {
        const checkItemData = selectedItemList.slice(0, slotNum);
        if (checkItemData.some(c => c.id == item.id)) {
            return {};
        }
        if (t.targetId.some(c => c == selectedMyFleet.id)) {
            power += t.power ? t.power : 0;
            torp += t.torp ? t.torp : 0;
            bomb += t.bomb ? t.bomb : 0;
            accuracy += t.accuracy ? t.accuracy : 0;
        }
    })
    return { power: power, torp: torp, bomb: bomb, accuracy: accuracy };
}

const getMultiBonus = (itemList) => {
    let power = 0;
    let accuracy = 0;
    let torp = 0;
    let bomb = 0;
    for (let index = 0; index < selectedMyFleet.slot; index++) {
        const item = itemList[index];
        if (item && item.multiBonus) {
            item.multiBonus.forEach((t) => {
                if (t.isBonus(index)) {
                    if (t.targetId.some(c => c == selectedMyFleet.id)) {
                        power += t.power ? t.power : 0;
                        torp += t.torp ? t.torp : 0;
                        bomb += t.bomb ? t.bomb : 0;
                        accuracy += t.accuracy ? t.accuracy : 0;
                    }
                }
            })
        }
    }
    return { power: power, torp: torp, bomb: bomb, accuracy: accuracy };
}

const getHitTerm = (formation_coef, support_const, cond_conef, luck, lv, equip_hit) => {
    return Math.floor(cond_conef * formation_coef * Math.floor(support_const + 1.5 * Math.sqrt(luck) + 2 * Math.sqrt(lv) + equip_hit));
}

const getAvoidanceTerm = (avoidance, luck) => {
    const formation_coef = FORMATION_AVO_COEF[$(".enemy-formation").val()];
    let avoidanceTerm = formation_coef * (avoidance + Math.sqrt(2 * luck));
    avoidanceTerm = Math.floor(avoidanceTerm);
    if (avoidanceTerm >= 65) {
        return Math.floor(55 + 2 * Math.sqrt(avoidanceTerm - 65));
    } else if (avoidanceTerm >= 40) {
        return Math.floor(40 + 3 * Math.sqrt(avoidanceTerm - 40));
    } else {
        return avoidanceTerm;
    }
}

const getFinalAccuracy = (hitTerm, avoidanceTerm) => {
    let finalAccuracy = hitTerm - avoidanceTerm + 1;
    if (finalAccuracy > 97) {
        finalAccuracy = 97;
    }
    return finalAccuracy;
}

const getAttack = (attack, formationDamageCoef, engagementDamageCoef) => {
    attack = attack * formationDamageCoef * engagementDamageCoef;
    if (attack > 150) {
        attack = 150 + Math.sqrt(attack - 150);
    }
    return Math.floor(attack);
}

const getResultData = () => {
    let sink = 0;
    let taiha = 0;
    let tyuha = 0;
    let shoha = 0;
    let fine = 0;
    const hp = $(".enemy .hp").text();
    const formationDamageCoef = FORMATION_DAMAGE_COEF[parseInt($(".my-formation").val())];
    const engagementDamageCoef = parseFloat($(".engagement").val());
    const criticalFlag = parseFloat($(".critical").val());
    const support_const = 64;
    let cond_coef = 1.0;
    let formation_coef = FORMATION_ACC_COEF[parseInt($(".my-formation").val())];
    let luck = 0;
    let lv = 1;
    lv = $(".myfleet .lv").val();
    luck = $(".myfleet .luck").val();
    if (isKira) {
        cond_coef = 1.2;
    }
    let hitTerm = getHitTerm(formation_coef, support_const, cond_coef, luck, lv, itemAccuracy);
    $("#hitTerm").html(`命中項 ${hitTerm}`);

    let avoidanceTerm = getAvoidanceTerm(parseInt($(".enemy .avoidance").text()), parseInt($(".enemy .luck").text()));
    $("#avoidanceTerm").html(`基本回避項 ${avoidanceTerm == 0 ? avoidanceTerm + "(不明)" : avoidanceTerm}`);

    let finalAccuracy = getFinalAccuracy(hitTerm, avoidanceTerm);
    $("#finalAccuracy").html(`最終命中率 ${finalAccuracy}%`);

    let power = parseInt($(".myfleet .power").text());
    const armor = parseInt($(".enemy .armor").text());

    const cappedAttack = Math.floor(getAttack(power, formationDamageCoef, engagementDamageCoef));
    let trialNumber = 100;
    let criticalCoef = criticalFlag == 2 ? 1.5 : 1.0;
    let criticalTerm = criticalFlag == 2 ? 100 : 0;
    if(criticalFlag == 3){
        criticalTerm = Math.floor(Math.sqrt(finalAccuracy)) + 1;
        trialNumber = 5000;
    }
    $("#critical").html(`(CL1) ${100 - criticalTerm}%, (CL2) ${criticalTerm}%`);
    for (let index = 0; index < trialNumber; index++) {
        const randArmor = index / trialNumber * (armor - 1);
        if(criticalFlag == 3){
            criticalCoef = Math.random() * 100 < criticalTerm ? 1.5 : 1.0;
        }
        const finalAttack = Math.floor(cappedAttack * criticalCoef);
        const damage = Math.floor(finalAttack - (armor * 0.7 + randArmor * 0.6));
        if (damage >= hp) {
            sink++;
        } else if (damage > hp * 0.75) {
            taiha++;
        } else if (damage > hp * 0.5) {
            tyuha++;
        } else if (damage > hp * 0.25) {
            shoha++;
        } else {
            fine++;
        }
    }
    const fineProb = Math.floor(fine / trialNumber * 1000) / 10;
    const shohaProb = Math.floor(shoha / trialNumber * 1000) / 10;
    const tyuhaProb = Math.floor(tyuha / trialNumber * 1000) / 10;
    const taihaProb = Math.floor(taiha / trialNumber * 1000) / 10;
    const sinkProb = Math.floor(sink / trialNumber * 1000) / 10;
    const isDamageCap = cappedAttack >= 151;
    $("#damage").html(`<br>
        最終攻撃力 ${criticalFlag == 3 ? `(CL1) ${Math.floor(cappedAttack * 1.0)}, (CL2) ${Math.floor(cappedAttack * 1.5)}` : Math.floor(cappedAttack * criticalCoef)}${isDamageCap ? "(キャップ到達)" : ""}<br>
        命中時撃破率<br>
        撃沈 ${sinkProb}%<br>
        大破 ${taihaProb}%<br>
        中破 ${tyuhaProb}%<br>
        小破 ${shohaProb}%<br>
        小破未満 ${fineProb}%`
    );

    $(".result .progress-bar-miss").attr("style", `width:${100 - finalAccuracy}%`);
    $(".result .progress-bar-miss").html(`miss ${Math.floor((100 - finalAccuracy) * 10) / 10}%`);
    $(".result .progress-bar-fine").attr("style", `width:${fineProb * finalAccuracy / 100}%`);
    $(".result .progress-bar-fine").html(`小破未満 ${Math.floor(fineProb * finalAccuracy / 10) / 10}%`);
    $(".result .progress-bar-shoha").attr("style", `width:${shohaProb * finalAccuracy / 100}%`);
    $(".result .progress-bar-shoha").html(`小破 ${Math.floor(shohaProb * finalAccuracy / 10) / 10}%`);
    $(".result .progress-bar-tyuha").attr("style", `width:${tyuhaProb * finalAccuracy / 100}%`);
    $(".result .progress-bar-tyuha").html(`中破 ${Math.floor(tyuhaProb * finalAccuracy / 10) / 10}%`);
    $(".result .progress-bar-taiha").attr("style", `width:${taihaProb * finalAccuracy / 100}%`);
    $(".result .progress-bar-taiha").html(`大破 ${Math.floor(taihaProb * finalAccuracy / 10) / 10}%`);
    $(".result .progress-bar-sink").attr("style", `width:${sinkProb * finalAccuracy / 100}%`);
    $(".result .progress-bar-sink").html(`撃沈 ${Math.floor(sinkProb * finalAccuracy / 10) / 10}%`);
}