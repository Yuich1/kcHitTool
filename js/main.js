/**
 * @author Yuichi<https://twitter.com/2qrbgxpsaWEziml?s=20>
 * @version 1.24
 */

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
let hasEnemyFleetTypeList = [
  hasEnemyBbList,
  hasEnemyCvList,
  hasEnemyCaList,
  hasEnemyClList,
  hasEnemyDdList,
  ,
  ,
  hasEnemyAvList,
];
let selectedMyFleetList = [];
let selectedFleetNum = 1;
let selectedEnemyFleet;
let selectedItem = [];
let itemAccuracy = 0;
let isKira = false;
let isItemOpen = false;

const MyFleet = function (fleet, item) {
  this.fleet = fleet;
  this.item = item;
  this.impr = [];
};

$(function () {
  $("#select-myfleet").on("shown.bs.modal", function () {
    var ua = navigator.userAgent;
    if (
      ua.indexOf("iPhone") > 0 ||
      (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0) ||
      ua.indexOf("iPad") > 0 ||
      ua.indexOf("Android") > 0
    ) {
    } else {
      $(".search-fleet").focus();
    }
  });
  $("#select-myitem").on("shown.bs.modal", function () {
    var ua = navigator.userAgent;
    if (
      ua.indexOf("iPhone") > 0 ||
      (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0) ||
      ua.indexOf("iPad") > 0 ||
      ua.indexOf("Android") > 0
    ) {
    } else {
      $(".search-item").focus();
    }
  });
  $(".focus-fleet").on("click", function () {
    var ua = navigator.userAgent;
    if (
      ua.indexOf("iPhone") > 0 ||
      (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0) ||
      ua.indexOf("iPad") > 0 ||
      ua.indexOf("Android") > 0
    ) {
    } else {
      $(".search-fleet").focus();
    }
  });
  $(".focus-item").on("click", function () {
    var ua = navigator.userAgent;
    if (
      ua.indexOf("iPhone") > 0 ||
      (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0) ||
      ua.indexOf("iPad") > 0 ||
      ua.indexOf("Android") > 0
    ) {
    } else {
      $(".search-item").focus();
    }
  });
  $("#create-myfleet, #myfleet-img, #myfleet-name").on("click", function () {
    $(".search-fleet").val("");
    $("#select-myfleet .fleet-name").parent().css("display", "block");
    setFleetList(1, false);
  });
  $("#cv-tab").on("click", function () {
    setFleetList(2, false);
  });
  $("#ca-tab").on("click", function () {
    setFleetList(3, false);
  });
  $("#cl-tab").on("click", function () {
    setFleetList(4, false);
  });
  $("#dd-tab").on("click", function () {
    setFleetList(5, false);
  });
  $("#av-tab").on("click", function () {
    setFleetList(8, false);
  });

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
    this.blur();
  });
  $(".myfleet .lv, .myfleet .luck, .my-formation, .enemy-formation, .engagement, .critical").on("input", function () {
    getResultData();
  });
  $(".search-fleet").on("input", function () {
    search("#select-myfleet .fleet-name", $(this).val());
  });
  $(".search-item").on("input", function () {
    $(".search-item").focus();
    search(".item-list .item", $(this).val());
  });
  // 艦娘を読み込む
  $(".fleet-select").on("click", function () {
    $(".fleet-select.active").removeClass("active");
    $(this).addClass("active");
    selectedFleetNum = $(this).text();
    let selectedMyFleet;
    if (selectedMyFleetList[selectedFleetNum]) {
      selectedMyFleet = selectedMyFleetList[selectedFleetNum].fleet;
      selectedItem = selectedMyFleetList[selectedFleetNum].item;
    }

    if (selectedMyFleet) {
      const selectedFleet = selectedMyFleet;
      const state = selectedFleet.state;
      const luck = selectedFleet.luck;
      const id = selectedFleet.id;
      const src = `./images/ships/${id}.png`;
      let setState = state;
      if (setState == "未改造" || setState == "normal") {
        setState = "";
      }
      const setName = selectedFleet.name + " " + setState;
      const power =
        selectedMyFleet.type == 2 ? Math.floor((selectedMyFleet.power - 1) * 1.5) + 55 : selectedMyFleet.power + 4;
      $(`.myfleet .fleet-name`).html(setName);
      $(".myfleet .fleet-img").attr("src", src);
      $(".myfleet .luck").val(luck);
      $(".myfleet .power").html(power);
      $(".myfleet .lv").val(selectedMyFleet.lv);
      //結果背景画像変更
      /*
      const img = $("<img>", { src: `./images/full/${id}.png` });
      img.on("load", function () {
        $(".result.box .background-img").css(
          "background-image",
          `url(./images/full/${id}.png)`
        );
      });*/

      //resetItemAccuracy();
      setItemForm();
      setItemList();
    } else {
      const src = `./images/ships/0.png`;
      $(".myfleet .fleet-img").attr("src", src);
      //$(".result.box .background-img").css("background-image", ``);
      $(`.myfleet .fleet-name`).html("未選択");
      $(".myfleet .luck").val("");
      $(".myfleet .power").html("");
      $(".myfleet .lv").val("");
      $(".items tbody").html("");
    }

    if (selectedMyFleet) {
      for (let i = 0; i < selectedMyFleet.slot + 1; i++) {
        if (selectedItem[i] && selectedItem[i] != 0) {
          if (selectedItem[i].isImpr) {
            setImpr(i);
          }
          setItem(i, selectedItem[i]);
        }
      }
    } else {
      $(".items tbody").html();
    }

    getResultData();
  });
  $(".share").on("click", function () {
    const deck = getDeckBuilder();
    $(".deck").val(deck);
  });
  $(".deckBuilder").on("click", function () {
    $(".deck").select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  });
  $(".deck").on("click", function () {
    $(this).select();
  });
  $(".deck").on("input", function () {
    const isOpen = setDeckBuilder($(this).val());
    if (isOpen) {
      $("#share").modal("hide");
    }
  });
  $(".deckImageOpen").on("click", function () {
    const t = "https://nishikuma.net/ImgKCbuilder/?predeck=" + getDeckBuilder();
    window.open(t, "newtab");
  });
  $(".deckBuilderOpen").on("click", function () {
    const t = "http://kancolle-calc.net/deckbuilder.html?predeck=" + getDeckBuilder();
    window.open(t, "newtab");
  });
});

//艦娘の選択モーダルを構成する
const setFleetList = (shipType, isEnemy) => {
  if (hasMyFleetTypeList[shipType - 1] && !isEnemy) {
    return;
  }
  if (hasEnemyFleetTypeList[shipType - 1] && isEnemy) {
    return;
  }
  let shipList;
  let targetId;
  if (isEnemy) {
    shipList = ENEMY_DATA;
    targetId = `#${SHIP_TYPE.find((item) => item.id === shipType).type}-enemy`;
    hasEnemyFleetTypeList[shipType - 1] = true;
  } else {
    shipList = SHIP_DATA;
    targetId = `#${SHIP_TYPE.find((item) => item.id === shipType).type}`;
    hasMyFleetTypeList[shipType - 1] = true;
  }
  for (let index = 0; index < shipList.length; index++) {
    const ship = shipList[index];
    if (ship.type == shipType) {
      const main_id = ship.main_id;
      const name = ship.name;
      const tr = $("<tr>");
      const td = $("<td>");
      const img = $("<img>", {
        class: "banner",
        src: `./images/ships/${main_id}.png`,
        alt: `${name}`,
        "data-dismiss": "modal",
        "data-id": `${main_id}`,
        "data-main_id": `${main_id}`,
      });
      const span = $("<span>", { class: "fleet-name", text: `${name}` });
      const yomi = $("<span>", {
        class: "my-hidden fleet-yomi",
        text: `${ship.yomi}`,
      });
      let selectedFleet;
      td.append(img).append(span.append(yomi));
      tr.append(td);
      for (let index = 0; index < ship.remodel.length; index++) {
        selectedFleet = Object.assign({}, ship.remodel[index]);
        const state = selectedFleet.state;
        const title = `${selectedFleet.power ? `火力 ${selectedFleet.power}, ` : ""}${
          selectedFleet.hp ? `装甲 ${selectedFleet.hp}, ` : ""
        }${selectedFleet.armor ? `装甲 ${selectedFleet.armor}, ` : ""}${
          selectedFleet.luck ? `運 ${selectedFleet.luck}` : ""
        }`;
        const button = $("<button>", {
          type: "button",
          class: "btn btn-default set-fleet",
          "data-dismiss": "modal",
          "data-id": `${selectedFleet.id}`,
          "data-main_id": `${main_id}`,
        }).append(
          $("<div>", {
            class: "item-tooltip",
            "data-toggle": "tooltip",
            title: title,
            text: state,
          })
        );
        td.append(button);
      }
      $(`${targetId} .table tbody`).append(tr);
    }
  }
  $('[data-toggle="tooltip"]').tooltip();
  $(`${targetId} .set-fleet, ${targetId} .banner`).on("click", function () {
    changeFleet($(this).data("id"));
    if (!isEnemy) {
      resetItemAccuracy();
      setItemForm();
      setItemList();
    }
    getResultData();
  });
};

//装備スロットを構成する
const setItemForm = () => {
  $(".myfleet .items tr").remove();
  const slot = selectedMyFleetList[selectedFleetNum].fleet.slot;
  for (let index = 0; index < slot; index++) {
    const button = $("<button>", {
      type: "button",
      class: "btn btn-default item",
      id: `itemSlot${index}`,
      "data-toggle": "modal",
      "data-target": "#select-myitem",
      text: "装備" + (index + 1),
      value: index,
    });
    button.on("click", function () {
      $(".search-item").val("");
    });
    const remove = $("<button>", {
      type: "button",
      class: "btn btn-default item-opt",
      html: "&times;",
    });
    remove.on("click", function () {
      if (selectedMyFleetList[selectedFleetNum].item[index].isImpr) {
        $(`#impr${index}`).parent().remove();
      }
      setItem(index, 0);
    });
    const tr = $("<tr>").append($("<td>").append(button)).append($("<td>").append(remove));
    $(".myfleet .items tbody").append(tr);
    if (!selectedMyFleetList[selectedFleetNum].item[index]) setItem(index, 0);
  }
  const button = $("<button>", {
    type: "button",
    class: "btn btn-default item add-item",
    id: `itemSlot${slot}`,
    "data-toggle": "modal",
    "data-target": "#select-myitem",
    text: "補強増設",
  });
  button.on("click", function () {
    $(".search-item").val("");
    $(".search-item").focus();
  });
  const remove = $("<button>", {
    type: "button",
    class: "btn btn-default item-opt",
    html: "&times;",
  });
  remove.on("click", function () {
    setItem(slot, 0);
  });
  const tr = $("<tr>").append($("<td>").append(button)).append($("<td>").append(remove));
  $(".myfleet .items tbody").append(tr);
  if (!selectedMyFleetList[selectedFleetNum].item[slot]) setItem(slot, 0);
};

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
    {
      type: "other",
      id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    },
  ];
  const expansionItemType = [18, 25, 26, 28];
  $(".myfleet .item").on("click", function () {
    $(".item-list .table tr").remove();
    let targetTabId;
    const slotButtonId = this.id;
    const slotNumber = parseInt(slotButtonId.charAt(slotButtonId.length - 1));
    let isExpansionSlot =
      selectedMyFleetList[selectedFleetNum].fleet.slot == slotButtonId.charAt(slotButtonId.length - 1);
    isItemOpen = true;
    const t = getMultiBonus(selectedMyFleetList[selectedFleetNum].item);
    for (let index = 0; index < ITEM_DATA.length; index++) {
      const item = $.extend(true, {}, ITEM_DATA[index]);
      let isException = false;
      let isSpecial = false;
      let isExpansion = false;
      let canHave = false;
      if (isExpansionSlot) {
        isExpansion = expansionItemType.some((c) => c == item.type);
        canHave =
          SHIP_TYPE[selectedMyFleetList[selectedFleetNum].fleet.type - 1].canHaveItem.some((c) => c == item.type) &&
          isExpansion;
      } else {
        canHave = SHIP_TYPE[selectedMyFleetList[selectedFleetNum].fleet.type - 1].canHaveItem.some(
          (c) => c == item.type
        );
      }
      if (canHave) {
        const isExceptionId = selectedMyFleetList[selectedFleetNum].fleet.cantHaveItemId
          ? selectedMyFleetList[selectedFleetNum].fleet.cantHaveItemId.some((c) => c == item.id)
          : false;
        const isExceptionType = selectedMyFleetList[selectedFleetNum].fleet.cantHaveItemType
          ? selectedMyFleetList[selectedFleetNum].fleet.cantHaveItemType.some((c) => c == item.type)
          : false;
        isException = isExceptionId || isExceptionType;
      } else {
        const isSpecialId = selectedMyFleetList[selectedFleetNum].fleet.specialCanHaveItemId
          ? selectedMyFleetList[selectedFleetNum].fleet.specialCanHaveItemId.some((c) => c == item.id)
          : false;
        const isSpecialType = selectedMyFleetList[selectedFleetNum].fleet.specialCanHaveItemType
          ? selectedMyFleetList[selectedFleetNum].fleet.specialCanHaveItemType.some((c) => c == item.type)
          : false;
        if (!isExpansionSlot) {
          isSpecial = isSpecialId || isSpecialType;
        } else {
          const t = selectedMyFleetList[selectedFleetNum].fleet.expansionCanHaveItemId
            ? selectedMyFleetList[selectedFleetNum].fleet.expansionCanHaveItemId.some((c) => c == item.id)
            : false;
          isSpecial = t || ((isSpecialId || isSpecialType) && isExpansion);
        }
      }
      if ((canHave && !isException) || isSpecial) {
        for (let index = 0; index < itemType.length; index++) {
          if (itemType[index].id.indexOf(item.type) != -1) {
            targetTabId = itemType[index].type;
            break;
          }
        }

        let title = `${item.power ? `火力 ${item.power}, ` : ""}${item.bomb ? `爆装 ${item.bomb}, ` : ""}${
          item.torp ? `雷装 ${item.torp}, ` : ""
        }${item.accuracy ? `命中 ${item.accuracy}` : ""}`;
        let tip = $("<div>", {
          class: "item-tooltip",
          "data-toggle": "tooltip",
          title: title,
          text: item.name,
        });
        const button = $("<button>", {
          type: "button",
          class: "btn btn-default item",
          "data-toggle": "modal",
          "data-target": "#select-myitem",
        }).append(tip);
        const yomi = $("<span>", {
          class: "my-hidden item-yomi",
          text: `${item.yomi}`,
        });
        button.append(yomi);
        //装備マウスオーバー時の処理
        button.on("mouseover", function () {
          if (isItemOpen) {
            const itemBefore = selectedMyFleetList[selectedFleetNum].item[slotNumber];
            const r = item.singleAddableBonus ? getSingleAddableBonus(item) : 0;
            const s = item.singleBonus ? getSingleBonus(item, slotNumber) : 0;
            selectedMyFleetList[selectedFleetNum].item[slotNumber] = item;
            const ta = getMultiBonus(selectedMyFleetList[selectedFleetNum].item);
            setItem(slotNumber, itemBefore);
            const bonusPower =
              (r.power ? r.power : 0) + (s.power ? s.power : 0) + (ta.power ? ta.power : 0) - (t.power ? t.power : 0);
            const bonusTorp =
              (r.torp ? r.torp : 0) + (s.torp ? s.torp : 0) + (ta.torp ? ta.torp : 0) - (t.torp ? t.torp : 0);
            const title = `${item.power ? `火力 ${item.power}` : `${bonusPower != 0 ? "火力 " : ""}`}${
              bonusPower != 0 ? `(${bonusPower > 0 ? "+" : ""}${bonusPower}), ` : `${item.power ? ", " : ""}`
            }${item.bomb ? `爆装 ${item.bomb}, ` : ""}${item.torp ? `雷装 ${item.torp}` : ""}${
              bonusTorp != 0 ? `(+${bonusTorp})` : ""
            }${item.torp || bonusTorp != 0 ? ", " : ""}${item.accuracy ? `命中 ${item.accuracy}` : ""}`;
            $(this).children(".item-tooltip").attr("title", title).tooltip("fixTitle").tooltip("show");
            $('[data-toggle="tooltip"]').tooltip();
          }
        });
        //装備選択時の処理
        button.on("click", function () {
          isItemOpen = false;
          if (selectedMyFleetList[selectedFleetNum].item[slotNumber].isImpr) {
            $(`#impr${slotNumber}`).parent().remove();
          }
          if (item.isImpr) {
            setImpr(slotNumber);
          }
          setItem(slotNumber, item);
        });
        const tr = $("<tr>").append($("<td>").append(button));
        $(`#${targetTabId} tbody`).append(tr);
        $('[data-toggle="tooltip"]').tooltip();
      }
    }
  });
};

const resetItemAccuracy = () => {
  itemAccuracy = 0;
  selectedMyFleetList[selectedFleetNum].item.length = 0;
  $(".myfleet .accuracy").html(itemAccuracy);
};

//艦娘を選択する
const changeFleet = (id) => {
  //const id = $(obj).data("id");
  //const main_id = $(obj).data("main_id");
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
    if (ship.id_list.indexOf(id) != -1) {
      name = ship.name;
      for (let index = 0; index < ship.remodel.length; index++) {
        if (ship.remodel[index].id == id && id <= 1500) {
          const i = Array(ship.remodel[index].slot).fill(0);
          const myFleet = new MyFleet(ship.remodel[index], i);
          myFleet.fleet.type = ship.type;
          myFleet.fleet.name = name;
          selectedMyFleetList[selectedFleetNum] = myFleet;
          selectedFleet = myFleet.fleet;
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
  if (!selectedFleet) return;
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
    const power = selectedFleet.type == 2 ? Math.floor((selectedFleet.power - 1) * 1.5) + 55 : selectedFleet.power + 4;
    $(`.myfleet .fleet-name`).html(setName);
    $(".myfleet .fleet-img").attr("src", src);
    $(".myfleet .luck").val(luck);
    $(".myfleet .power").html(power);
    $(".myfleet .lv").val(defaultLevel);
    //結果背景画像変更
    /*const img = $("<img>", { src: `./images/full/${id}.png` });
      img.on("load", function () {
        $(".result.box .background-img").css(
          "background-image",
          `url(./images/full/${id}.png)`
        );
      });*/
  }
  getResultData();
};

const setItem = (slotNumber, item) => {
  if (slotNumber == selectedMyFleetList[selectedFleetNum].fleet.slot && !item.name) {
    const text = "補強増設";
    $(`#itemSlot${slotNumber}`).text(text);
  } else {
    $(`#itemSlot${slotNumber}`).text(item.name ? item.name : `装備${slotNumber + 1}`);
  }
  selectedMyFleetList[selectedFleetNum].item[slotNumber] = item;
  let itemPower = 0;
  let itemTorp = 0;
  let itemBomb = 0;
  let power = 0;
  power += selectedMyFleetList[selectedFleetNum].fleet.power;
  itemAccuracy = 0;
  const singleAddableBonus = item.singleAddableBonus ? getSingleAddableBonus(item) : 0;
  const singleBonus = item.singleBonus ? getSingleBonus(item, slotNumber) : 0;
  const multiBonus = getMultiBonus(selectedMyFleetList[selectedFleetNum].item);
  selectedMyFleetList[selectedFleetNum].item[slotNumber].power = selectedMyFleetList[selectedFleetNum].item[slotNumber]
    .power
    ? selectedMyFleetList[selectedFleetNum].item[slotNumber].power
    : 0;
  selectedMyFleetList[selectedFleetNum].item[slotNumber].torp =
    (selectedMyFleetList[selectedFleetNum].item[slotNumber].torp
      ? selectedMyFleetList[selectedFleetNum].item[slotNumber].torp
      : 0) +
    (singleAddableBonus.torp ? singleAddableBonus.torp : 0) +
    (singleBonus.torp ? singleBonus.torp : 0);
  selectedMyFleetList[selectedFleetNum].item[slotNumber].bonusPower =
    (singleAddableBonus.power ? singleAddableBonus.power : 0) + (singleBonus.power ? singleBonus.power : 0);
  power += multiBonus.power ? multiBonus.power : 0;
  selectedMyFleetList[selectedFleetNum].item.forEach((t) => {
    if (t != 0) {
      itemPower += (t.power ? t.power : 0) + (t.bonusPower ? t.bonusPower : 0);
      itemTorp += t.torp ? t.torp : 0;
      itemBomb += t.bomb ? t.bomb : 0;
      itemAccuracy += t.accuracy ? t.accuracy : 0;
    }
  });
  power += itemPower;
  //空母用計算式
  if (selectedMyFleetList[selectedFleetNum].fleet.type == 2) {
    power = Math.floor((power + itemTorp + Math.floor(itemBomb * 1.3) - 1) * 1.5) + 55;
  } else {
    power += 4;
  }

  selectedMyFleetList[selectedFleetNum].item[slotNumber] = item;
  $(".myfleet .power").html(power);
  $(".myfleet .accuracy").html(itemAccuracy);
  getResultData();
};

const getSingleAddableBonus = (item) => {
  let power = 0;
  let accuracy = 0;
  let torp = 0;
  let bomb = 0;
  item.singleAddableBonus.forEach((t) => {
    if (t.targetId.some((c) => c == selectedMyFleetList[selectedFleetNum].fleet.id)) {
      power += t.power ? t.power : 0;
      torp += t.torp ? t.torp : 0;
      bomb += t.bomb ? t.bomb : 0;
      accuracy += t.accuracy ? t.accuracy : 0;
    }
  });
  return { power: power, torp: torp, bomb: bomb, accuracy: accuracy };
};

const getSingleBonus = (item, slotNum) => {
  let power = 0;
  let accuracy = 0;
  let torp = 0;
  let bomb = 0;
  item.singleBonus.forEach((t) => {
    const checkItemData = selectedMyFleetList[selectedFleetNum].item.slice(0, slotNum);
    if (checkItemData.some((c) => c.id == item.id)) {
      return {};
    }
    if (t.targetId.some((c) => c == selectedMyFleetList[selectedFleetNum].fleet.id)) {
      power += t.power ? t.power : 0;
      torp += t.torp ? t.torp : 0;
      bomb += t.bomb ? t.bomb : 0;
      accuracy += t.accuracy ? t.accuracy : 0;
    }
  });
  return { power: power, torp: torp, bomb: bomb, accuracy: accuracy };
};

const getMultiBonus = (itemList) => {
  let power = 0;
  let accuracy = 0;
  let torp = 0;
  let bomb = 0;
  for (let index = 0; index < selectedMyFleetList[selectedFleetNum].fleet.slot; index++) {
    const item = itemList[index];
    if (item && item.multiBonus) {
      item.multiBonus.forEach((t) => {
        if (t.isBonus && t.isBonus(index)) {
          if (t.targetId.some((c) => c == selectedMyFleetList[selectedFleetNum].fleet.id)) {
            power += t.power ? t.power : 0;
            torp += t.torp ? t.torp : 0;
            bomb += t.bomb ? t.bomb : 0;
            accuracy += t.accuracy ? t.accuracy : 0;
          }
        }
      });
    }
  }
  return { power: power, torp: torp, bomb: bomb, accuracy: accuracy };
};

const getHitTerm = (formation_coef, support_const, cond_conef, luck, lv, equip_hit) => {
  return Math.floor(
    cond_conef * formation_coef * Math.floor(support_const + 1.5 * Math.sqrt(luck) + 2 * Math.sqrt(lv) + equip_hit)
  );
};

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
};

const getFinalAccuracy = (hitTerm, avoidanceTerm) => {
  let finalAccuracy = hitTerm - avoidanceTerm + 1;
  if (finalAccuracy > 97) {
    finalAccuracy = 97;
  }
  return finalAccuracy;
};

const getAttack = (attack, formationDamageCoef, engagementDamageCoef) => {
  attack = attack * formationDamageCoef * engagementDamageCoef;
  if (attack > 150) {
    attack = 150 + Math.sqrt(attack - 150);
  }
  return Math.floor(attack);
};

const getResultData = () => {
  if (!selectedMyFleetList[selectedFleetNum]) return;
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
  selectedMyFleetList[selectedFleetNum].fleet.lv = lv;
  luck = $(".myfleet .luck").val();
  selectedMyFleetList[selectedFleetNum].fleet.luck = luck;
  if (isKira) {
    cond_coef = 1.2;
  }
  let hitTerm = getHitTerm(formation_coef, support_const, cond_coef, luck, lv, itemAccuracy);

  let avoidanceTerm = getAvoidanceTerm(parseInt($(".enemy .avoidance").text()), parseInt($(".enemy .luck").text()));

  let finalAccuracy = getFinalAccuracy(hitTerm, avoidanceTerm);

  let power = parseInt($(".myfleet .power").text());
  const armor = parseInt($(".enemy .armor").text());

  const cappedAttack = Math.floor(getAttack(power, formationDamageCoef, engagementDamageCoef));
  const trialNumber = 100;
  let criticalTerm = criticalFlag == 2 ? 100 : 0;
  if (criticalFlag == 3) {
    criticalTerm = Math.floor(Math.sqrt(finalAccuracy)) + 1;
  }
  const criticalCoef = [1.0, 1.5];
  const criticalTerms = [100 - criticalTerm, criticalTerm];
  let fineProb = 0;
  let shohaProb = 0;
  let tyuhaProb = 0;
  let taihaProb = 0;
  let sinkProb = 0;
  for (let i = 0; i < 2; i++) {
    sink = 0;
    taiha = 0;
    tyuha = 0;
    shoha = 0;
    fine = 0;
    for (let index = 0; index <= trialNumber; index++) {
      const randArmor = (index / trialNumber) * (armor - 1);
      const finalAttack = Math.floor(cappedAttack * criticalCoef[i]);
      const damage = Math.floor(finalAttack - (armor * 0.7 + randArmor * 0.6));
      if (damage >= hp) {
        sink++;
      } else if (damage >= hp * 0.75) {
        taiha++;
      } else if (damage >= hp * 0.5) {
        tyuha++;
      } else if (damage >= hp * 0.25) {
        shoha++;
      } else {
        fine++;
      }
    }
    fineProb += Math.floor(((fine * criticalTerms[i]) / (trialNumber + 1)) * 10) / 10;
    shohaProb += Math.floor(((shoha * criticalTerms[i]) / (trialNumber + 1)) * 10) / 10;
    tyuhaProb += Math.floor(((tyuha * criticalTerms[i]) / (trialNumber + 1)) * 10) / 10;
    taihaProb += Math.floor(((taiha * criticalTerms[i]) / (trialNumber + 1)) * 10) / 10;
    sinkProb += Math.floor(((sink * criticalTerms[i]) / (trialNumber + 1)) * 10) / 10;
  }

  let fuel = [];
  let bullet = [];
  for (let i in selectedMyFleetList) {
    const ship = selectedMyFleetList[i].fleet;
    if (ship.lv > 99) {
      fuel[i] = Math.floor(Math.floor(ship.fuel * 0.5 + 0.99) * 0.85);
      bullet[i] = Math.floor(Math.floor(ship.bullet * 0.8 + 0.99) * 0.85);
    } else {
      fuel[i] = Math.floor(ship.fuel * 0.5 + 0.99);
      bullet[i] = Math.floor(ship.bullet * 0.8 + 0.99);
    }
  }

  let isDamageCap = cappedAttack >= 151;
  $(".result-left").html(`命中項 ${hitTerm}<br>
        基本回避項 ${
          avoidanceTerm == 0 ? avoidanceTerm + "<span style='color: #dc143c'>(不明)</span>" : avoidanceTerm
        }<br>
        最終命中率 ${finalAccuracy}%<br>
        最終攻撃力 ${
          criticalFlag == 3
            ? `(CL1) ${Math.floor(cappedAttack * 1.0)}, (CL2) ${Math.floor(cappedAttack * 1.5)}`
            : Math.floor(cappedAttack * criticalCoef[criticalFlag - 1])
        }${isDamageCap ? "(キャップ到達)" : ""}<br>
        クリティカル率 (CL1) ${100 - criticalTerm}%, (CL2) ${criticalTerm}%<br>
        <br>
        <div class="sub-title">命中時撃破率</div>
        撃沈 ${sinkProb}%<br>
        大破 ${taihaProb}%<br>
        中破 ${tyuhaProb}%<br>
        小破 ${shohaProb}%<br>
        小破未満 ${fineProb}%`);
  $(".result-right").html(`<div class="sub-title">命中込み撃沈率</div>
  撃沈 ${Math.floor((sinkProb * finalAccuracy) / 10) / 10}%<br>
  大破 ${Math.floor((taihaProb * finalAccuracy) / 10) / 10}%<br>
  中破 ${Math.floor((tyuhaProb * finalAccuracy) / 10) / 10}%<br>
  小破 ${Math.floor((shohaProb * finalAccuracy) / 10) / 10}%<br>
  小破未満 ${Math.floor((fineProb * finalAccuracy) / 10) / 10}%<br>
  miss ${100 - finalAccuracy}%<br>
  <br>
  <div class="sub-title">資材消費</div>
  燃料 ${fuel[selectedFleetNum]}, 合計${sum(fuel)}<br>
  弾薬 ${bullet[selectedFleetNum]},合計${sum(bullet)}`);

  $(".result .progress-bar-miss").attr("style", `width:${100 - finalAccuracy}%`);
  $(".result .progress-bar-miss").html(`miss ${Math.floor((100 - finalAccuracy) * 10) / 10}%`);
  $(".result .progress-bar-fine").attr("style", `width:${(fineProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-fine").html(`小破未満 ${Math.floor((fineProb * finalAccuracy) / 10) / 10}%`);
  $(".result .progress-bar-shoha").attr("style", `width:${(shohaProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-shoha").html(`小破 ${Math.floor((shohaProb * finalAccuracy) / 10) / 10}%`);
  $(".result .progress-bar-tyuha").attr("style", `width:${(tyuhaProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-tyuha").html(`中破 ${Math.floor((tyuhaProb * finalAccuracy) / 10) / 10}%`);
  $(".result .progress-bar-taiha").attr("style", `width:${(taihaProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-taiha").html(`大破 ${Math.floor((taihaProb * finalAccuracy) / 10) / 10}%`);
  $(".result .progress-bar-sink").attr("style", `width:${(sinkProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-sink").html(`撃沈 ${Math.floor((sinkProb * finalAccuracy) / 10) / 10}%`);
};

const search = (targetSelector, searchText) => {
  let t = searchText.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
  t = t.toLowerCase();
  $(targetSelector).parent().css("display", "block");
  $(targetSelector).each(function () {
    if ($(this).text().indexOf(t) == -1) {
      $(this).parent().css("display", "none");
    }
  });
};

const getDeckBuilder = () => {
  let deck = '{"version":4,"f1":{';
  let fleetNum = 1;
  for (let i = 0; i < selectedMyFleetList.length + 1; i++) {
    if (selectedMyFleetList[i]) {
      deck += `${fleetNum != 1 ? "," : ""}`;
      const myFleet = selectedMyFleetList[i];
      deck += `"s${fleetNum}":{"id":"${myFleet.fleet.id}","lv":${myFleet.fleet.lv},"luck":${myFleet.fleet.luck},"items":{`;
      fleetNum++;
      let itemNum = 1;
      for (let j = 0; j < myFleet.item.length + 1; j++) {
        if (myFleet.item[j]) {
          deck += `${itemNum++ != 1 ? "," : ""}`;
          if (j == myFleet.fleet.slot) {
            deck += `"ix":{"id":${myFleet.item[j].id},"rf":${myFleet.impr[j] ? myFleet.impr[j] : 0}}`;
          } else {
            deck += `"i${j + 1}":{"id":${myFleet.item[j].id},"rf":${myFleet.impr[j] ? myFleet.impr[j] : 0}}`;
          }
        }
      }
      deck += "}}";
    }
  }
  deck += `}}`;
  return deck;
};

const setDeckBuilder = (dataString) => {
  const fleetNum = selectedFleetNum;
  selectedFleetNum = 1;
  const raw = JSON.parse(dataString);
  if (toString(raw.version).includes("4")) return false;
  for (const i in raw) {
    if (!raw[i]) continue;
    const fleet = raw[i];
    for (const j in fleet) {
      if (!fleet[j].id) continue;
      //set ship
      const ship = fleet[j];
      changeFleet(parseInt(ship.id));
      $(".myfleet .lv").val(ship.lv);
      $(".myfleet .luck").val(ship.luck);
      selectedMyFleetList[selectedFleetNum].fleet.lv = ship.lv;
      selectedMyFleetList[selectedFleetNum].fleet.luck = ship.luck;
      resetItemAccuracy();
      setItemForm();
      //set items
      const items = ship.items;
      for (const k in items) {
        const itemId = items[k].id;
        let item;
        for (const t in ITEM_DATA) {
          if (ITEM_DATA[t].id == itemId) {
            item = ITEM_DATA[t];
            break;
          }
        }
        if (item) {
          setItem(k[1] == "x" ? selectedMyFleetList[selectedFleetNum].fleet.slot : k[1] - 1, item);
          if (items[k].rf != 0) {
            selectedMyFleetList[selectedFleetNum].impr[(k[1] - 1)] = items[k].rf;
            setImpr(k[1] - 1);
          }
        }
      }
      selectedFleetNum++;
    }
  }
  selectedFleetNum = fleetNum;
  $(".fleet-select")[0].click();
  return true;
};

const sum = function (arr) {
  return arr.reduce(function (prev, current, i, arr) {
    return prev + current;
  });
};

const setImpr = (slotNum) => {
  const impr = selectedMyFleetList[selectedFleetNum].impr[slotNum];
  const form = $("<input>", {
    type: "number",
    id: `impr${slotNum}`,
    class: "form-control impr inline-b item-opt",
    placeholder: "改修",
    value: `${impr ? impr : undefined}`,
  });
  form.on("input", function () {
    //setItem(slotNum, selectedMyFleetList[selectedFleetNum].item[slotNum]);
    //getMultiBonus(selectedMyFleetList[selectedFleetNum].item);
    const item = selectedMyFleetList[selectedFleetNum].item[slotNum];
    let itemPower = 0;
    let itemTorp = 0;
    let itemBomb = 0;
    let power = 0;
    power += selectedMyFleetList[selectedFleetNum].fleet.power;
    itemAccuracy = 0;
    const singleAddableBonus = item.singleAddableBonus ? getSingleAddableBonus(item) : 0;
    const singleBonus = item.singleBonus ? getSingleBonus(item, slotNum) : 0;
    const multiBonus = getMultiBonus(selectedMyFleetList[selectedFleetNum].item);
    selectedMyFleetList[selectedFleetNum].item[slotNum].power = selectedMyFleetList[selectedFleetNum].item[slotNum]
      .power
      ? selectedMyFleetList[selectedFleetNum].item[slotNum].power
      : 0;
    selectedMyFleetList[selectedFleetNum].item[slotNum].torp =
      (selectedMyFleetList[selectedFleetNum].item[slotNum].torp
        ? selectedMyFleetList[selectedFleetNum].item[slotNum].torp
        : 0) +
      (singleAddableBonus.torp ? singleAddableBonus.torp : 0) +
      (singleBonus.torp ? singleBonus.torp : 0);
    selectedMyFleetList[selectedFleetNum].item[slotNum].bonusPower =
      (singleAddableBonus.power ? singleAddableBonus.power : 0) + (singleBonus.power ? singleBonus.power : 0);
    power += multiBonus.power ? multiBonus.power : 0;
    selectedMyFleetList[selectedFleetNum].item.forEach((t) => {
      if (t != 0) {
        itemPower += (t.power ? t.power : 0) + (t.bonusPower ? t.bonusPower : 0);
        itemTorp += t.torp ? t.torp : 0;
        itemBomb += t.bomb ? t.bomb : 0;
        itemAccuracy += t.accuracy ? t.accuracy : 0;
      }
    });
    power += itemPower;
    //空母用計算式
    if (selectedMyFleetList[selectedFleetNum].fleet.type == 2) {
      power = Math.floor((power + itemTorp + Math.floor(itemBomb * 1.3) - 1) * 1.5) + 55;
    } else {
      power += 4;
    }

    selectedMyFleetList[selectedFleetNum].item[slotNum] = item;
    selectedMyFleetList[selectedFleetNum].impr[slotNum] = form.val();
    $(".myfleet .power").html(power);
    $(".myfleet .accuracy").html(itemAccuracy);
    getResultData();
  });
  $(`#itemSlot${slotNum}`).parent().parent().append($("<td>").append(form));
};
