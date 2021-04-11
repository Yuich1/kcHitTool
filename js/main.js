/**
 * @author Yuichi<https://twitter.com/2qrbgxpsaWEziml?s=20>
 * @version 1.3.3
 */

let isKira = false;
// 単縦, 複縦, 輪形, 梯形, 単横, 警戒
const FORMATION_ACC_COEF = [1.0, 1.2, 1.0, 1.2, 1.2, 1.2];
const FORMATION_AVO_COEF = [1.0, 1.0, 1.1, 1.2, 1.3, 1.0];
const FORMATION_DAMAGE_COEF = [1.0, 0.8, 0.7, 0.75, 0.6, 0.5];
// T有利, 同航, 反航, T不利
const ENGAGEMENT_DAMAGE_COEF = [1.2, 1.0, 0.8, 0.6];
let cap = 170;


$(function () {
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
  $(".cap").on("input", function () {
    cap = parseInt($(".cap").val());
    console.log(cap);
    getResultData();
  });
  $(".myfleet .power").on("input", function () {
    getResultData();
  });
  $(".myfleet .bomb").on("input", function () {
    getResultData();
  });
  $(".myfleet .torp").on("input", function () {
    getResultData();
  });
  $(".myfleet .item_accuracy").on("input", function () {
    getResultData();
  });
  $(".myfleet .lv").on("input", function () {
    const f = $(".myfleet .lv");
    f.val(Math.max(f.val(), 1));
    f.val(Math.min(f.val(), 175));
    getResultData();
  });
  $(".myfleet .luck").on("input", function () {
    const f = $(".myfleet .luck");
    f.val(Math.max(f.val(), 0));
    getResultData();
  });
  $(".enemy .armor").on("input", function () {
    const f = $(".enemy .armor");
    f.val(Math.max(f.val(), 0));
    getResultData();
  });
  $(".enemy .hp").on("input", function () {
    const f = $(".enemy .hp");
    f.val(Math.max(f.val(), 1));
    getResultData();
  });
  $(".enemy .luck").on("input", function () {
    const f = $(".enemy .luck");
    f.val(Math.max(f.val(), 0));
    getResultData();
  });
  $(".enemy .avoidance").on("input", function () {
    const f = $(".enemy .avoidance");
    f.val(Math.max(f.val(), 0));
    getResultData();
  });
  $(".my-formation, .enemy-formation, .critical").on("input", function () {
    getResultData();
  });
  $(".engagement").on("input", function () {
    setSauin($(".engagement").val().split(",").length != 1);
    getResultData();
  });
});

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
  return Math.min(finalAccuracy, 97);
};

const getAttack = (attack, formationDamageCoef, engagementDamageCoef) => {
  attack = attack * formationDamageCoef * engagementDamageCoef;
  if (attack > cap) {
    attack = cap + Math.sqrt(attack - cap);
  }
  return Math.floor(attack);
};

const getResultData = () => {
  let sink = 0;
  let taiha = 0;
  let tyuha = 0;
  let shoha = 0;
  let fine = 0;
  const hp = $(".enemy .hp").val();
  const formationDamageCoef = FORMATION_DAMAGE_COEF[parseInt($(".my-formation").val())];
  const engagementDamageCoefs = $(".engagement").val().split(",");
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
  const item_accuracy = parseInt($(".myfleet .item_accuracy").val());
  let hitTerm = getHitTerm(formation_coef, support_const, cond_coef, luck, lv, item_accuracy);

  let avoidanceTerm = getAvoidanceTerm(parseInt($(".enemy .avoidance").val()), parseInt($(".enemy .luck").val()));

  let finalAccuracy = getFinalAccuracy(hitTerm, avoidanceTerm);

  let power = parseInt($(".myfleet .power").val());
  const bomb = parseInt($(".myfleet .bomb").val());
  const torp = parseInt($(".myfleet .torp").val());
  const armor = parseInt($(".enemy .armor").val());
  const criticalCoef = [1.0, 1.5];

  //空母用計算式
  if (bomb > 0 || torp > 0) {
    power = Math.floor((power + torp + Math.floor(bomb * 1.3) - 1) * 1.5) + 55;
  } else {
    power += 4;
  }
  $(".myfleet .support_power").text(power);

  let cappedAttack = 0;
  let criticalTerm = 0;
  let fineProb = 0;
  let shohaProb = 0;
  let tyuhaProb = 0;
  let taihaProb = 0;
  let sinkProb = 0;
  const engagementRates = { noSaiun: [0.15, 0.45, 0.3, 0.1], saiun: [0.15, 0.45, 0.4, 0] };
  for (let j = 0; (len = engagementDamageCoefs.length), j < len; j++) {
    const engagementDamageCoef = parseFloat(engagementDamageCoefs[j]);
    cappedAttack = Math.floor(getAttack(power, formationDamageCoef, engagementDamageCoef));
    const trialNumber = 100;
    criticalTerm = criticalFlag == 2 ? 100 : 0;
    if (criticalFlag == 3) {
      criticalTerm = Math.floor(Math.sqrt(finalAccuracy)) + 1;
    }
    const criticalTerms = [100 - criticalTerm, criticalTerm];
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
      let engagementRate = 1.0;
      if (engagementDamageCoefs.length > 1 && document.getElementById("saiunCheck")) {
        const isSauin = document.getElementById("saiunCheck").checked;

        if (isSauin) {
          engagementRate = engagementRates.saiun[j];
        } else {
          engagementRate = engagementRates.noSaiun[j];
        }
      }
      fineProb += ((fine * criticalTerms[i]) / (trialNumber + 1)) * engagementRate;
      shohaProb += ((shoha * criticalTerms[i]) / (trialNumber + 1)) * engagementRate;
      tyuhaProb += ((tyuha * criticalTerms[i]) / (trialNumber + 1)) * engagementRate;
      taihaProb += ((taiha * criticalTerms[i]) / (trialNumber + 1)) * engagementRate;
      sinkProb += ((sink * criticalTerms[i]) / (trialNumber + 1)) * engagementRate;
    }
  }

  $(".result-left").html(`命中項 ${hitTerm}<br>
        基本回避項 ${avoidanceTerm == 0 ? avoidanceTerm + "<span style='color: #dc143c'>(不明)</span>" : avoidanceTerm
    }<br>
        最終命中率 ${finalAccuracy}%<br>
        ${engagementDamageCoefs.length == 1
      ? `最終攻撃力 ${criticalFlag == 3
        ? `(CL1) ${Math.floor(cappedAttack * 1.0)}, (CL2) ${Math.floor(cappedAttack * 1.5)}`
        : Math.floor(cappedAttack * criticalCoef[criticalFlag - 1])
      }${cappedAttack >= 151 ? "(キャップ到達)" : ""}<br>
        クリティカル率 (CL1) ${100 - criticalTerm}%, (CL2) ${criticalTerm}%<br></br>`
      : `クリティカル率 (CL1) ${100 - criticalTerm}%, (CL2) ${criticalTerm}%<br></br>`
    }
        <br>
        <div class="sub-title">命中時撃破率</div>
        撃沈 ${round(sinkProb, 1)}%<br>
        大破 ${round(taihaProb, 1)}%<br>
        中破 ${round(tyuhaProb, 1)}%<br>
        小破 ${round(shohaProb, 1)}%<br>
        小破未満 ${Math.round(fineProb, 1)}%`);
  $(".result-right").html(`<div class="sub-title">命中込み撃沈率</div>
  撃沈 ${round((sinkProb * finalAccuracy) / 100, 1)}%<br>
  大破 ${round((taihaProb * finalAccuracy) / 100, 1)}%<br>
  中破 ${round((tyuhaProb * finalAccuracy) / 100, 1)}%<br>
  小破 ${round((shohaProb * finalAccuracy) / 100, 1)}%<br>
  小破未満 ${round((fineProb * finalAccuracy) / 100, 1)}%<br>
  miss ${100 - finalAccuracy}%<br>`);

  $(".result .progress-bar-miss").attr("style", `width:${100 - finalAccuracy}%`);
  $(".result .progress-bar-miss").html(`miss ${Math.floor((100 - finalAccuracy) * 10) / 10}%`);
  $(".result .progress-bar-fine").attr("style", `width:${(fineProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-fine").html(`小破未満 ${round((fineProb * finalAccuracy) / 100, 1)}%`);
  $(".result .progress-bar-shoha").attr("style", `width:${(shohaProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-shoha").html(`小破 ${round((shohaProb * finalAccuracy) / 100, 1)}%`);
  $(".result .progress-bar-tyuha").attr("style", `width:${(tyuhaProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-tyuha").html(`中破 ${round((tyuhaProb * finalAccuracy) / 100, 1)}%`);
  $(".result .progress-bar-taiha").attr("style", `width:${(taihaProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-taiha").html(`大破 ${round((taihaProb * finalAccuracy) / 100, 1)}%`);
  $(".result .progress-bar-sink").attr("style", `width:${(sinkProb * finalAccuracy) / 100}%`);
  $(".result .progress-bar-sink").html(`撃沈 ${round((sinkProb * finalAccuracy) / 100, 1)}%`);
};

function round(number, precision) {
  let shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    let numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? +numArray[1] + precision : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

//彩雲設定フォームの追加
const setSauin = (isActive) => {
  if (isActive) {
    const form = $("<input>", {
      type: "checkbox",
      class: "form-check-input",
      id: "saiunCheck",
      onclick: "getResultData()",
    });
    const label = $("<label>", {
      class: "form-check-label",
      text: "彩雲",
      for: "saiunCheck",
    });
    const div = $("<div>", {
      class: "form-check",
    });
    div.append(form).append(label);
    $(".saiunSet").append(div);
  } else {
    $(".saiunSet").children().remove();
  }
};
