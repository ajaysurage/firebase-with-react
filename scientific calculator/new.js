/*
(C) calculator.net all right reserved.
*/
function gObj(obj) {
    return document.getElementById(obj);
}
function trimAll(sString) {
    return sString.trim();
}
function isNumber(val) {
    val = val + "";
    if (val.length < 1)
        return false;
    if (isNaN(val)) {
        return false;
    } else {
        return true;
    }
}
function isInteger(val) {
    if (isNumber(val)) {
        return val % 1 === 0;
    } else {
        return false;
    }
}
function formatAsMoney(num) {
    return formatAsMoneyFull(num, 1);
}
function formatAsMoneyFull(num, hascents) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    cents = '';
    if (hascents == 1) {
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        cents = "." + cents;
    } else {
        num = Math.floor(num + 0.50000000001).toString();
    }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '$' + num + cents);
}
function clearForm(formObj) {
    var allElements = formObj.elements;
    for (i = 0; i < allElements.length; i++) {
        if (allElements[i].type == 'text' || allElements[i].type == 'number' || allElements[i].type == 'date' || allElements[i].type == 'textarea')
            allElements[i].value = '';
    }
}
function formatNum(inNum) {
    outStr = "" + inNum;
    inNum = parseFloat(outStr);
    if ((outStr.length) > 10) {
        outStr = "" + inNum.toPrecision(10);
    }
    if (outStr.indexOf(".") > -1) {
        while (outStr.charAt(outStr.length - 1) == "0") {
            outStr = outStr.substr(0, (outStr.length - 1));
        }
        if (outStr.charAt(outStr.length - 1) == ".")
            outStr = outStr.substr(0, (outStr.length - 1));
        return outStr;
    } else {
        return outStr;
    }
}
function showquickmsg(inStr, isError) {
    if (isError) {
        inStr = "<font color=red>" + inStr + "</font>";
    }
    gObj("coutput").innerHTML = inStr;
}
var tooltip = function() {
    var id = 'tt';
    var top = 3;
    var left = 3;
    var maxw = 300;
    var speed = 10;
    var timer = 20;
    var endalpha = 95;
    var alpha = 0;
    var tt, t, c, b, h;
    var isvisible = 1;
    var ismobile = false;
    var ie = document.all ? true : false;
    var htmlV = '<div onclick="tooltip.hide(); return false;" style="text-align:right;color:#fff;"><u><b>CLOSE</b></u></div>';
    return {
        show: function(v, ism) {
            if (ism == 'm') {
                ismobile = true;
            } else {
                ismobile = false;
            }
            if (tt == null) {
                tt = document.createElement('div');
                tt.setAttribute('id', id);
                document.body.appendChild(tt);
                tt.style.opacity = 0;
                tt.style.filter = 'alpha(opacity=0)';
                document.onmousemove = this.pos;
            }
            isvisible = 0;
            tt.style.display = 'block';
            tt.innerHTML = v;
            if (ismobile)
                tt.innerHTML = v + htmlV;
            if (ie) {
                tt.style.width = tt.offsetWidth;
            }
            if (tt.offsetWidth > maxw) {
                tt.style.width = maxw + 'px'
            }
            if (ismobile)
                tt.style.width = '';
            h = parseInt(tt.offsetHeight) + top;
            clearInterval(tt.timer);
            tt.timer = setInterval(function() {
                tooltip.fade(1)
            }, timer);
        },
        pos: function(e) {
            if (isvisible == 0) {
                var x = 0
                  , y = 0;
                if (document.all) {
                    x = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
                    y = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
                    x += window.event.clientX;
                    y += window.event.clientY;
                } else {
                    x = e.pageX;
                    y = e.pageY;
                }
                if (ismobile) {
                    tt.style.left = "0px";
                } else {
                    tt.style.left = (x + 5) + "px";
                }
                tt.style.top = (y + 10) + "px";
            }
            isvisible = 1;
        },
        fade: function(d) {
            var a = alpha;
            if ((a != endalpha && d == 1) || (a != 0 && d == -1)) {
                var i = speed;
                if (endalpha - a < speed && d == 1) {
                    i = endalpha - a;
                } else if (alpha < speed && d == -1) {
                    i = a;
                }
                alpha = a + (i * d);
                tt.style.opacity = alpha * .01;
                tt.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
                clearInterval(tt.timer);
                if (d == -1) {
                    tt.style.display = 'none'
                }
            }
        },
        hide: function() {
            clearInterval(tt.timer);
            isvisible = 0;
            tt.style.display = 'none';
        }
    };
}();
function iptErrmsg(iptInputObj, iptMsg) {
    var iptFName = iptInputObj.name + 'ifcErr';
    var iptErrObj = document.getElementById(iptFName);
    if (iptMsg.length < 1) {
        iptInputObj.style.borderColor = "#417516";
        if (iptErrObj !== null)
            iptErrObj.style.visibility = 'hidden';
    } else {
        if (iptErrObj !== null) {
            iptErrObj.innerHTML = iptMsg;
        } else {
            iptErrObj = document.createElement("div");
            iptErrObj.setAttribute("class", "inputErrMsg");
            iptErrObj.setAttribute("id", iptFName);
            iptErrObj.innerHTML = iptMsg;
            iptInputObj.parentNode.insertBefore(iptErrObj, iptInputObj.nextSibling);
        }
        iptErrObj.style.visibility = 'visible';
        iptInputObj.style.borderColor = "red";
    }
}
function iptfieldCheck(ifcInput, ifcRequired, ifcType) {
    var ifcIVal = trimAll("" + ifcInput.value);
    var ifcErrMsg = "";
    if ("r" == ifcRequired.toLowerCase()) {
        if (ifcIVal.length < 1) {
            ifcInput.addEventListener("blur", function() {
                var ifcrIVal = trimAll("" + ifcInput.value);
                if (ifcrIVal.length < 1)
                    iptErrmsg(ifcInput, "required field");
            });
        }
    }
    if (ifcIVal.length > 0) {
        var ifcTemp = ifcType.toLowerCase();
        ifcIVal = ifcIVal.replace(/	/g, "").replace(/ /g, "").replace(/,/g, "");
        if (ifcTemp == "n") {
            if ((!isNumber(ifcIVal)) && (ifcIVal != "-") && (ifcIVal != "."))
                ifcErrMsg = "numbers only";
        } else if (ifcTemp == "pn") {
            if (!(isNumber(ifcIVal) && (Number(ifcIVal) > 0)))
                ifcErrMsg = "positive numbers only";
        } else if (ifcTemp == "pzn") {
            if (!(isNumber(ifcIVal) && (Number(ifcIVal) >= 0)))
                ifcErrMsg = "non negative numbers only";
        } else if (ifcTemp == "i") {
            if ((!isInteger(ifcIVal)) && (ifcIVal != "-") && (ifcIVal != "."))
                ifcErrMsg = "integers only";
        } else if (ifcTemp == "pi") {
            if (!(isInteger(ifcIVal) && (Number(ifcIVal) > 0)))
                ifcErrMsg = "positive integers only";
        } else if (ifcTemp == "pzi") {
            if (!(isNumber(ifcIVal) && (Number(ifcIVal) >= 0)))
                ifcErrMsg = "non negative integers only";
        }
    }
    iptErrmsg(ifcInput, ifcErrMsg);
}
function insertComma(e, l) {
    let t = document.getElementById(e)
      , d = t.value.toString().replaceAll(",", "")
      , a = "";
    if ("i" == l)
        a = (d = d.replace(/[^\d.-]/g, "")).toString().split(".")[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else if ("d" == l) {
        let g = (d = d.replace(/[^\d.-]/g, "")).toString().split(".");
        a = g[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        g.length > 1 && (a += "." + g[1])
    } else
        "c" == l && (a = d.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    t.value = a
}
function calcSearch() {
    var a = "financial-calculator|Financial Calculators|mortgage-calculator|Mortgage Calculator|loan-calculator|Loan Calculator|auto-loan-calculator|Auto Loan Calculator|interest-calculator|Interest Calculator|payment-calculator|Payment Calculator|retirement-calculator|Retirement Calculator|amortization-calculator|Amortization Calculator|investment-calculator|Investment Calculator|currency-calculator|Currency Calculator|inflation-calculator|Inflation Calculator|finance-calculator|Finance Calculator|mortgage-payoff-calculator|Mortgage Payoff Calculator|tax-calculator|Income Tax Calculator|compound-interest-calculator|Compound Interest Calculator|salary-calculator|Salary Calculator|401k-calculator|401K Calculator|interest-rate-calculator|Interest Rate Calculator|sales-tax-calculator|Sales Tax Calculator|fitness-and-health-calculator|Fitness and Health Calculators|bmi-calculator|Body Mass Index (BMI) Calculator|calorie-calculator|Calorie Calculator|body-fat-calculator|Body Fat Calculator|bmr-calculator|Basal Metabolic Rate (BMR) Calculator|macro-calculator|Macro Calculator|ideal-weight-calculator|Ideal Weight Calculator|pregnancy-calculator|Pregnancy Calculator|pregnancy-weight-gain-calculator|Pregnancy Weight Gain Calculator|pregnancy-conception-calculator|Pregnancy Conception Calculator|due-date-calculator|Due Date Calculator|pace-calculator|Pace Calculator|math-calculator|Math Calculators|scientific-calculator|Scientific Calculator|fraction-calculator|Fraction Calculator|percent-calculator|Percentage Calculator|triangle-calculator|Triangle Calculator|volume-calculator|Volume Calculator|standard-deviation-calculator|Standard Deviation Calculator|random-number-generator|Random Number Generator|other-calculator|Other Calculators|age-calculator|Age Calculator|date-calculator|Date Calculator|time-calculator|Time Calculator|hours-calculator|Hours Calculator|gpa-calculator|GPA Calculator|grade-calculator|Grade Calculator|height-calculator|Height Calculator|concrete-calculator|Concrete Calculator|ip-subnet-calculator|IP Subnet Calculator|bra-size-calculator|Bra Size Calculator|password-generator|Password Generator|dice-roller|Dice Roller|conversion-calculator|Conversion Calculator|house-affordability-calculator|House Affordability Calculator|savings-calculator|Savings Calculator|rent-calculator|Rent Calculator|marriage-calculator|Marriage Tax Calculator|estate-tax-calculator|Estate Tax Calculator|pension-calculator|Pension Calculator|social-security-calculator|Social Security Calculator|annuity-calculator|Annuity Calculator|annuity-payout-calculator|Annuity Payout Calculator|credit-card-calculator|Credit Card Calculator|credit-card-payoff-calculator|Credit Cards Payoff Calculator|debt-payoff-calculator|Debt Payoff Calculator|debt-consolidation-calculator|Debt Consolidation Calculator|repayment-calculator|Repayment Calculator|student-loan-calculator|Student Loan Calculator|college-cost-calculator|College Cost Calculator|cd-calculator|CD Calculator|roth-ira-calculator|Roth IRA Calculator|ira-calculator|IRA Calculator|vat-calculator|VAT Calculator|cash-back-or-low-interest-calculator|Cash Back or Low Interest Calculator|auto-lease-calculator|Auto Lease Calculator|depreciation-calculator|Depreciation Calculator|average-return-calculator|Average Return Calculator|margin-calculator|Margin Calculator|discount-calculator|Discount Calculator|business-loan-calculator|Business Loan Calculator|debt-ratio-calculator|Debt-to-Income Ratio Calculator|real-estate-calculator|Real Estate Calculator|take-home-pay-calculator|Take-Home-Paycheck Calculator|personal-loan-calculator|Personal Loan Calculator|lease-calculator|Lease Calculator|refinance-calculator|Refinance Calculator|budget-calculator|Budget Calculator|rental-property-calculator|Rental Property Calculator|roi-calculator|Return on Investment (ROI) Calculator|apr-calculator|APR Calculator|fha-loan-calculator|FHA Loan Calculator|va-mortgage-calculator|VA Mortgage Calculator|down-payment-calculator|Down Payment Calculator|rent-vs-buy-calculator|Rent vs. Buy Calculator|payback-period-calculator|Payback Period Calculator|present-value-calculator|Present Value Calculator|future-value-calculator|Future Value Calculator|army-body-fat-calculator|Army Body Fat Calculator|weight-watchers-points-calculator|Weight Watcher Points Calculator|carbohydrate-calculator|Carbohydrate Calculator|lean-body-mass-calculator|Lean Body Mass Calculator|healthy-weight-calculator|Healthy Weight Calculator|calories-burned-calculator|Calories Burned Calculator|protein-calculator|Protein Calculator|fat-intake-calculator|Fat Intake Calculator|tdee-calculator|Total Daily Energy Expenditure (TDEE) Calculator|ovulation-calculator|Ovulation Calculator|conception-calculator|Conception Calculator|period-calculator|Period Calculator|gfr-calculator|Glomerular Filtration Rate (GFR) Calculator|body-type-calculator|Body Type Calculator|body-surface-area-calculator|Body Surface Area Calculator|bac-calculator|Blood Alcohol Content (BAC) Calculator|number-sequence-calculator|Number Sequence Calculator|percent-error-calculator|Percent Error Calculator|exponent-calculator|Exponent Calculator|binary-calculator|Binary Calculator|hex-calculator|Hex Calculator|half-life-calculator|Half-Life Calculator|quadratic-formula-calculator|Quadratic Formula Calculator|slope-calculator|Slope Calculator|log-calculator|Log Calculator|area-calculator|Area Calculator|sample-size-calculator|Sample Size Calculator|probability-calculator|Probability Calculator|statistics-calculator|Statistics Calculator|mean-median-mode-range-calculator|Mean, Median, Mode, Range Calculator|permutation-and-combination-calculator|Permutation and Combination Calculator|z-score-calculator|Z-score Calculator|confidence-interval-calculator|Confidence Interval Calculator|ratio-calculator|Ratio Calculator|distance-calculator|Distance Calculator|circle-calculator|Circle Calculator|surface-area-calculator|Surface Area Calculator|pythagorean-theorem-calculator|Pythagorean Theorem Calculator|right-triangle-calculator|Right Triangle Calculator|root-calculator|Root Calculator|lcm-calculator|Least Common Multiple (LCM) Calculator|gcf-calculator|Greatest Common Factor (GCF) Calculator|factor-calculator|Factor Calculator|rounding-calculator|Rounding Calculator|matrix-calculator|Matrix Calculator|scientific-notation-calculator|Scientific Notation Calculator|big-number-calculator|Big Number Calculator|fuel-cost-calculator|Fuel Cost Calculator|voltage-drop-calculator|Voltage Drop Calculator|btu-calculator|BTU Calculator|square-footage-calculator|Square Footage Calculator|time-card-calculator|Time Card Calculator|time-zone-calculator|Time Zone Calculator|love-calculator|Love Calculator|gdp-calculator|Gross Domestic Product (GDP) Calculator|gas-mileage-calculator|Gas Mileage Calculator|horsepower-calculator|Horsepower Calculator|engine-horsepower-calculator|Engine Horsepower Calculator|stair-calculator|Stair Calculator|resistor-calculator|Resistor Calculator|ohms-law-calculator|Ohms Law Calculator|electricity-calculator|Electricity Calculator|tip-calculator|Tip Calculator|mileage-calculator|Mileage Calculator|density-calculator|Density Calculator|mass-calculator|Mass Calculator|weight-calculator|Weight Calculator|golf-handicap-calculator|Golf Handicap Calculator|sleep-calculator|Sleep Calculator|tire-size-calculator|Tire Size Calculator|roofing-calculator|Roofing Calculator|tile-calculator|Tile Calculator|mulch-calculator|Mulch Calculator|gravel-calculator|Gravel Calculator|wind-chill-calculator|Wind Chill Calculator|heat-index-calculator|Heat Index Calculator|dew-point-calculator|Dew Point Calculator|bandwidth-calculator|Bandwidth Calculator|time-duration-calculator|Time Duration Calculator|day-counter|Day Counter|day-of-the-week-calculator|Day of the Week Calculator|mortgage-calculator-uk|Mortgage Calculator UK|canadian-mortgage-calculator|Canadian Mortgage Calculator|mortgage-amortization-calculator|Mortgage Amortization Calculator|percent-off-calculator|Percent Off Calculator|anorexic-bmi-calculator|Anorexic BMI Calculator|overweight-calculator|Overweight Calculator|prime-factorization-calculator|Prime Factorization Calculator|common-factor-calculator|Common Factor Calculator|basic-calculator|Basic Calculator|average-calculator|Average Calculator|p-value-calculator|P-value Calculator|commission-calculator|Commission Calculator|long-division-calculator|Long Division Calculator|simple-interest-calculator|Simple Interest Calculator|rmd-calculator|RMD Calculator".split("|")
      , l = trimAll(gObj("calcSearchTerm").value + "").replace("-", " ").replace("  ", " ").replace("  ", " ").toLowerCase()
      , c = ""
      , t = []
      , r = []
      , o = [];
    if (0 < l.length) {
        var u = a.length / 2;
        for (i = 0; i < u; i++) {
            var e = "  " + a[2 * i + 1].replace("-", " ").toLowerCase();
            0 < e.indexOf(" " + l) && e.indexOf(" " + l) < 2 ? t.push('<div><a href="/' + a[2 * i] + '.html">' + a[2 * i + 1] + "</a></div>") : 0 < e.indexOf(" " + l) ? r.push('<div><a href="/' + a[2 * i] + '.html">' + a[2 * i + 1] + "</a></div>") : 0 < e.indexOf(l) && o.push('<div><a href="/' + a[2 * i] + '.html">' + a[2 * i + 1] + "</a></div>")
        }
        var n = t.concat(r).concat(o)
          , C = n.length;
        if (0 < C)
            if (6 < C) {
                for (i = 0; i < 6; i++)
                    c += n[i];
                c += "<div>...</div>"
            } else
                for (i = 0; i < C; i++)
                    c += n[i];
        else
            c = 'No calculator matches "' + gObj("calcSearchTerm").value + '".'
    }
    return gObj("calcSearchOut").innerHTML = c,
    !1
}
/*****************************************
(C) http://www.calculator.net all right reserved.
*****************************************/
var cnCInputs = [0]
  , cnHistory = []
  , cnHistoryShow = 3
  , cnDegreeRadians = "degree"
  , cnAccuracy = 12
  , cnNew = !0
  , cnMemoryV = 0
  , cnScreenV = 0
  , cnPrevAns = 0;
function r(r) {
    if (cnCInputs.length < 2 && cnNew && "1/x" != r && "x3" != r && "x2" != r && "apow" != r && "pow" != r && "*" != r && "/" != r && "+" != r && "-" != r && "neg" != cnCInputs[0] && (cnCInputs = [0]),
    "-" == r && cnCInputs.length < 2 && 0 == cnCInputs[0] && (cnCInputs[0] = "neg"),
    "MR" != r && (document.getElementById("scimrc").innerHTML = "MR"),
    "M+" == r)
        "Error" == cnScreenV || isNaN(cnScreenV) || (cnMemoryV += parseFloat(cnScreenV + ""));
    else if ("M-" == r)
        "Error" == cnScreenV || isNaN(cnScreenV) || (cnMemoryV -= parseFloat(cnScreenV + ""));
    else if ("MR" == r)
        if ("MC" == document.getElementById("scimrc").innerHTML)
            cnMemoryV = 0,
            document.getElementById("scimrc").innerHTML = "MR";
        else {
            if (1 < cnCInputs.length)
                "pi" != (c = cnCInputs[cnCInputs.length - 1]) && "e" != c && "." != c && isNaN(c) ? cnCInputs.push(cnMemoryV) : 0 != cnMemoryV && (cnCInputs.push("*"),
                cnCInputs.push(cnMemoryV));
            else
                cnCInputs = [cnMemoryV];
            cnScreenV = cnCalcFinal(0),
            document.getElementById("scimrc").innerHTML = "MC"
        }
    else if ("ans" == r) {
        var c;
        if (1 < cnCInputs.length)
            "pi" != (c = cnCInputs[cnCInputs.length - 1]) && "e" != c && "." != c && isNaN(c) ? "neg" != c && cnCInputs.push(cnPrevAns) : (cnCInputs.push("*"),
            cnCInputs.push(cnPrevAns));
        else
            cnCInputs = [cnPrevAns];
        cnScreenV = cnCalcFinal(0)
    } else if ("=" == r) {
        if (1 < cnCInputs.length) {
            "Error" == (cnScreenV = cnCalcFinal(1)) || isNaN(cnScreenV) ? cnCInputs = [0] : (cnCInputs = [cnScreenV],
            cnPrevAns = cnScreenV);
            var e = "";
            for (i = cnHistory.length - 1; 0 <= i; i--)
                e += "<div>" + cnHistory[i][0] + " = " + cnHistory[i][1] + "</div>";
            document.getElementById("scihistory").innerHTML = e
        }
        cnNew = !0
    } else if ("C" == r)
        cnCInputs = [0],
        document.getElementById("sciOutPut").innerHTML = "0",
        document.getElementById("sciInPut").innerHTML = "&nbsp;",
        cnNew = !0,
        cnScreenV = 0;
    else if ("bk" == r)
        cnCInputs.splice(cnCInputs.length - 1, 1),
        0 == cnCInputs.length && (cnCInputs = [0]),
        cnScreenV = cnCalcFinal(0);
    else {
        if ("RND" == r) {
            if (r = Math.random() + "",
            cnCInputs.length < 2)
                "neg" == cnCInputs[0] ? cnCInputs.push(r) : cnCInputs[0] = r;
            else {
                var n = cnCInputs[cnCInputs.length - 1];
                "+/-" != n && "." != n && isNaN(n) && cnCInputs.push(r)
            }
            cnNew = !1
        } else
            cnCInputs.push(r);
        var a = cnValidateInputs()
          , o = cnCInputs.length;
        1 == a ? cnCInputs.splice(o - 1, 1) : -1 == a && cnCInputs.splice(o - 2, 1),
        cnScreenV = cnCalcFinal(0)
    }
}
function cnCalcFinal(r) {
    var c = cnCombineNumbers()
      , e = []
      , n = []
      , a = 0;
    for (i = 0; i < c.length; i++)
        A = c[i],
        B = c[i - 1],
        isNaN(A) && "sin" != A && "cos" != A && "tan" != A && "asin" != A && "acos" != A && "atan" != A && "ex" != A && "10x" != A && "ln" != A && "log" != A && "3x" != A && "sqrt" != A && "(" != A && "pi" != A && "e" != A || isNaN(B) && "1/x" != B && "pc" != B && "n!" != B && "x3" != B && "x2" != B && ")" != B && "pi" != B && "e" != B || (n.push("*"),
        e.push("*")),
        "sin" == A || "cos" == A || "tan" == A || "asin" == A || "acos" == A || "atan" == A || "ln" == A || "log" == A || "3x" == A || "sqrt" == A ? (n.push(A),
        n.push("("),
        e.push(A),
        e.push("("),
        a++) : ("(" == A && a++,
        ")" == A && a--,
        n.push(A),
        e.push(A));
    if (0 < a)
        for (i = 0; i < a; i++)
            e.push("<b>)</b>"),
            n.push(")");
    2 < n.length && "0" == n[0] + "" && "*" == n[1] && (A = n[2],
    "sin" != A && "cos" != A && "tan" != A && "asin" != A && "acos" != A && "atan" != A && "ex" != A && "10x" != A && "ln" != A && "log" != A && "(" != A && "pi" != A && "e" != A && "3x" != A && "sqrt" != A || (n = n.slice(2),
    e = e.slice(2)));
    for (var o = e, s = [], t = 0, p = 0; -1 < o.indexOf(")") || -1 < o.indexOf("<b>)</b>"); ) {
        t = o.indexOf(")");
        var y = o.indexOf("<b>)</b>");
        -1 < t ? -1 < y && y < t && (t = y) : t = y,
        o = cnArrayProc(o, p = (s = o.slice(0, t + 1)).lastIndexOf("("), t + 1, cnFormatDisplay(s = s.slice(p)))
    }
    var u = "&nbsp;" + cnFormatDisplay(o);
    for (o = n,
    s = [],
    p = t = 0; -1 < o.indexOf(")"); )
        t = o.indexOf(")"),
        o = cnArrayProc(o, p = (s = o.slice(0, t + 1)).lastIndexOf("("), t + 1, cnCalcResult(s = s.slice(p)));
    var l = cnCalcResult(o);
    return isNaN(l) && (l = "Error",
    1 != r && (l = "")),
    document.getElementById("sciOutPut").innerHTML = "&nbsp;" + cnFmt(l),
    1 == r && (u = u.replace(/<b>/g, "").replace(/<\/b>/g, ""),
    1 < c.length && (cnHistory.push([u, cnFmt(l)]),
    cnHistory.length > cnHistoryShow && cnHistory.splice(0, 1)),
    u += " ="),
    document.getElementById("sciInPut").innerHTML = u,
    l
}
function cnFormatDisplay(r) {
    for (var c = r; -1 < c.indexOf("EXP"); ) {
        var e = c.indexOf("EXP");
        c = "neg" == c[e + 1] ? cnArrayProc(c, e, e + 2, " &#215; 10<sup>-</sup>") : isNaN(c[e + 1]) ? cnArrayProc(c, e, e + 1, " &#215; 10<sup><b>&#9634;</b></sup>") : cnArrayProc(c, e, e + 2, " &#215; 10<sup>" + c[e + 1] + "</sup>")
    }
    for (a = 0; a < c.length; )
        A = c[a],
        "pi" == A ? c[a] = "&pi;" : "e" == A ? c[a] = "e" : "sin" != A && "cos" != A && "tan" != A && "asin" != A && "acos" != A && "atan" != A && "3x" != A && "sqrt" != A && "ln" != A && "log" != A || ("asin" == A ? c[a] = "arcsin" : "acos" == A ? c[a] = "arccos" : "atan" == A ? c[a] = "arctan" : "3x" == A ? c[a] = "<sup>3</sup>&#8730;" : "sqrt" == A && (c[a] = "&#8730;"),
        c[a] = c[a] + c[a + 1],
        c.splice(a + 1, 1)),
        a++;
    for (var n = c.length, a = 0; a < n; )
        if (A = c[a],
        "pc" == A)
            c[a - 1] = c[a - 1] + "%",
            c.splice(a, 1),
            n--;
        else if ("n!" == A)
            !isNaN(c[a - 1]) && c[a - 1] < 0 ? c[a - 1] = "(" + c[a - 1] + ")!" : c[a - 1] = c[a - 1] + "!",
            c.splice(a, 1),
            n--;
        else if ("x3" == A) {
            6 < (o = c[a - 1] + "").length && (o = o.substr(o.length - 6)),
            "</sup>" == o ? c[a - 1] = "(" + c[a - 1] + ")<sup>3</sup>" : "-" == (c[a - 1] + "").substring(0, 1) ? c[a - 1] = "(" + c[a - 1] + ")<sup>3</sup>" : c[a - 1] = c[a - 1] + "<sup>3</sup>",
            c.splice(a, 1),
            n--
        } else if ("x2" == A) {
            var o;
            6 < (o = c[a - 1] + "").length && (o = o.substr(o.length - 6)),
            "</sup>" == o ? c[a - 1] = "(" + c[a - 1] + ")<sup>2</sup>" : "-" == (c[a - 1] + "").substring(0, 1) ? c[a - 1] = "(" + c[a - 1] + ")<sup>2</sup>" : c[a - 1] = c[a - 1] + "<sup>2</sup>",
            c.splice(a, 1),
            n--
        } else
            "1/x" == A ? (c[a - 1] = "(1/" + c[a - 1] + ")",
            c.splice(a, 1),
            n--) : a++;
    for (; -1 < c.lastIndexOf("pow") || -1 < c.lastIndexOf("apow") || -1 < c.lastIndexOf("ex") || -1 < c.lastIndexOf("10x"); ) {
        e = c.lastIndexOf("pow");
        var s = c.lastIndexOf("apow");
        if (e < s && (e = s),
        e < (s = c.lastIndexOf("ex")) && (e = s),
        e < (s = c.lastIndexOf("10x")) && (e = s),
        "pow" == c[e]) {
            var t = "";
            "neg" == c[e + 1] && (t = "-",
            c.splice(e + 1, 1));
            var i = ""
              , p = "";
            "-" == (c[e - 1] + "").substring(0, 1) && (i = "(",
            p = ")"),
            c[e + 1] && "" != c[e + 1] && ")" != c[e + 1] && "<b>)</b>" != c[e + 1] ? (c[e - 1] = i + c[e - 1] + p + "<sup>" + t + c[e + 1] + "</sup>",
            c.splice(e, 2)) : (c[e - 1] = "-" == t ? i + c[e - 1] + p + "<sup>-</sup>" : i + c[e - 1] + p + "<sup><b>&#9634;</b></sup>",
            c.splice(e, 1))
        } else if ("apow" == c[e]) {
            t = "";
            "neg" == c[e + 1] && (t = "-",
            c.splice(e + 1, 1)),
            c[e + 1] && "" != c[e + 1] && ")" != c[e + 1] && "<b>)</b>" != c[e + 1] ? (c[e - 1] = "<sup>" + t + c[e + 1] + "</sup>&#8730;" + c[e - 1],
            c.splice(e, 2)) : (c[e - 1] = "-" == t ? "<sup>-</sup>&#8730;" + c[e - 1] : "<sup><b>&#9634;</b></sup>&#8730;" + c[e - 1],
            c.splice(e, 1))
        } else if ("ex" == c[e]) {
            t = "";
            "neg" == c[e + 1] && (t = "-",
            c.splice(e + 1, 1)),
            c[e + 1] && "" != c[e + 1] && ")" != c[e + 1] && "<b>)</b>" != c[e + 1] ? (c[e] = "e<sup>" + t + c[e + 1] + "</sup>",
            c.splice(e + 1, 1)) : c[e] = "-" == t ? "e<sup>-</sup>" : "e<sup><b>&#9634;</b></sup>"
        } else if ("10x" == c[e]) {
            t = "";
            "neg" == c[e + 1] && (t = "-",
            c.splice(e + 1, 1)),
            c[e + 1] && "" != c[e + 1] && ")" != c[e + 1] && "<b>)</b>" != c[e + 1] ? (c[e] = "10<sup>" + t + c[e + 1] + "</sup>",
            c.splice(e + 1, 1)) : c[e] = "-" == t ? "10<sup>-</sup>" : "10<sup><b>&#9634;</b></sup>"
        }
    }
    var y = "";
    for (a = 0; a < c.length; a++)
        A = c[a],
        isNaN(A) ? "*" == A ? y += " &#215; " : "/" == A ? y += " &#247; " : "+" == A ? y += " + " : "-" == A ? y += " &minus; " : "neg" == A ? y += " -" : y += A : y += A;
    return y
}
function cnCalcResult(crInArray) {
    var crProcArray = crInArray;
    if (-1 < crProcArray.indexOf("Error"))
        return "Error";
    for (; -1 < crProcArray.indexOf("EXP"); ) {
        var crFDTemp = crProcArray.indexOf("EXP");
        if (isNaN(crProcArray[crFDTemp + 1]))
            return "Error";
        crProcArray[crFDTemp - 1] = crProcArray[crFDTemp - 1] * Math.pow(10, crProcArray[crFDTemp + 1]),
        crProcArray.splice(crFDTemp, 2)
    }
    for (i = 0; i < crProcArray.length; i++)
        "pi" == crProcArray[i] && (crProcArray[i] = Math.PI),
        "e" == crProcArray[i] && (crProcArray[i] = Math.E),
        "(" == crProcArray[i] && (crProcArray.splice(i, 1),
        i--),
        ")" == crProcArray[i] && (crProcArray.splice(i, 1),
        i--);
    for (i = 0; i < crProcArray.length; i++)
        if (A = crProcArray[i],
        "sin" == A || "cos" == A || "tan" == A || "asin" == A || "acos" == A || "atan" == A || "ln" == A || "log" == A || "3x" == A || "sqrt" == A) {
            if (!(i + 1 < crProcArray.length))
                return "Error";
            if (B = crProcArray[i + 1],
            isNaN(B))
                return "Error";
            if ("sin" == A)
                if ("degree" == cnDegreeRadians) {
                    var tempV = Math.abs(B % 180);
                    crProcArray[i] = tempV < 1e-13 ? 0 : Math.sin(B / 180 * Math.PI)
                } else {
                    var tempV = Math.abs(B / Math.PI - Math.floor(B / Math.PI)) * Math.PI;
                    crProcArray[i] = tempV < 1e-13 ? 0 : Math.sin(B)
                }
            else if ("cos" == A)
                if ("degree" == cnDegreeRadians) {
                    var tempV = Math.abs(B % 180);
                    Math.abs(tempV - 90) < 1e-13 ? crProcArray[i] = 0 : crProcArray[i] = Math.cos(B / 180 * Math.PI)
                } else {
                    var tempV = Math.abs(B / Math.PI - Math.floor(B / Math.PI)) * Math.PI;
                    Math.abs(tempV - Math.PI / 2) < 1e-13 ? crProcArray[i] = 0 : crProcArray[i] = Math.cos(B)
                }
            else if ("tan" == A)
                if ("degree" == cnDegreeRadians) {
                    var tempV = Math.abs(B % 180);
                    tempV < 1e-13 ? crProcArray[i] = 0 : Math.abs(tempV - 90) < 1e-13 ? crProcArray[i] = "Error" : crProcArray[i] = Math.tan(B / 180 * Math.PI)
                } else {
                    var tempV = Math.abs(B / Math.PI - Math.floor(B / Math.PI)) * Math.PI;
                    tempV < 1e-13 ? crProcArray[i] = 0 : Math.abs(tempV - Math.PI / 2) < 1e-13 ? crProcArray[i] = "Error" : crProcArray[i] = Math.tan(B)
                }
            else
                "asin" == A ? crProcArray[i] = "degree" == cnDegreeRadians ? 180 * Math.asin(B) / Math.PI : Math.asin(B) : "acos" == A ? crProcArray[i] = "degree" == cnDegreeRadians ? 180 * Math.acos(B) / Math.PI : Math.acos(B) : "atan" == A ? crProcArray[i] = "degree" == cnDegreeRadians ? 180 * Math.atan(B) / Math.PI : Math.atan(B) : "ln" == A ? crProcArray[i] = Math.log(B) : "log" == A ? crProcArray[i] = Math.log(B) / Math.LN10 : "3x" == A ? B < 0 ? crProcArray[i] = -1 * Math.pow(-1 * B, 1 / 3) : crProcArray[i] = Math.pow(B, 1 / 3) : "sqrt" == A && (crProcArray[i] = Math.sqrt(B));
            crProcArray.splice(i + 1, 1)
        }
    for (; -1 < crProcArray.indexOf("1/x") || -1 < crProcArray.indexOf("pc") || -1 < crProcArray.indexOf("n!") || -1 < crProcArray.indexOf("x3") || -1 < crProcArray.indexOf("x2"); ) {
        var j = crProcArray.indexOf("1/x");
        j < 0 && (j = 1e8);
        var k = crProcArray.indexOf("pc");
        -1 < k && k < j && (j = k),
        k = crProcArray.indexOf("n!"),
        -1 < k && k < j && (j = k),
        k = crProcArray.indexOf("x3"),
        -1 < k && k < j && (j = k),
        k = crProcArray.indexOf("x2"),
        -1 < k && k < j && (j = k),
        "1/x" == crProcArray[j] ? (crProcArray[j - 1] = 1 / crProcArray[j - 1],
        crProcArray.splice(j, 1)) : "pc" == crProcArray[j] ? (crProcArray[j - 1] = .01 * crProcArray[j - 1],
        crProcArray.splice(j, 1)) : "n!" == crProcArray[j] ? (crProcArray[j - 1] = cnFactorial(crProcArray[j - 1]),
        crProcArray.splice(j, 1)) : "x3" == crProcArray[j] ? (crProcArray[j - 1] = crProcArray[j - 1] * crProcArray[j - 1] * crProcArray[j - 1],
        crProcArray.splice(j, 1)) : "x2" == crProcArray[j] && (crProcArray[j - 1] = crProcArray[j - 1] * crProcArray[j - 1],
        crProcArray.splice(j, 1))
    }
    if (isNaN(crProcArray[crProcArray.length - 1]))
        return "Error";
    for (; -1 < crProcArray.lastIndexOf("pow") || -1 < crProcArray.lastIndexOf("apow") || -1 < crProcArray.lastIndexOf("ex") || -1 < crProcArray.indexOf("10x"); ) {
        var j = crProcArray.lastIndexOf("pow")
          , k = crProcArray.lastIndexOf("apow");
        if (j < k && (j = k),
        k = crProcArray.lastIndexOf("ex"),
        j < k && (j = k),
        k = crProcArray.lastIndexOf("10x"),
        j < k && (j = k),
        "10x" == crProcArray[j])
            "neg" == crProcArray[j + 1] ? (crProcArray[j] = Math.pow(10, -1 * crProcArray[j + 2]),
            crProcArray.splice(j + 1, 2)) : (crProcArray[j] = Math.pow(10, crProcArray[j + 1]),
            crProcArray.splice(j + 1, 1));
        else if ("ex" == crProcArray[j])
            "neg" == crProcArray[j + 1] ? (crProcArray[j] = Math.pow(Math.E, -1 * crProcArray[j + 2]),
            crProcArray.splice(j + 1, 2)) : (crProcArray[j] = Math.pow(Math.E, crProcArray[j + 1]),
            crProcArray.splice(j + 1, 1));
        else if ("pow" == crProcArray[j])
            "neg" == crProcArray[j + 1] ? (alert(crProcArray[j - 1] + " / " + crProcArray[j] + " / " + crProcArray[j + 1] + " / " + crProcArray[j + 2] + " / "),
            crProcArray[j - 1] = Math.pow(crProcArray[j - 1], -1 * crProcArray[j + 2]),
            alert(crProcArray[j - 1]),
            crProcArray.splice(j, 3)) : (crProcArray[j - 1] = Math.pow(crProcArray[j - 1], crProcArray[j + 1]),
            crProcArray.splice(j, 2));
        else if ("apow" == crProcArray[j])
            if ("neg" == crProcArray[j + 1]) {
                if (crProcArray[j + 2] - Math.round(crProcArray[j + 2]) == 0)
                    if (crProcArray[j - 1] < 0) {
                        if (crProcArray[j + 2] % 2 == 0)
                            return "Error";
                        crProcArray[j - 1] = -1 * Math.pow(-1 * crProcArray[j - 1], 1 / crProcArray[j + 2])
                    } else
                        crProcArray[j - 1] = Math.pow(crProcArray[j - 1], 1 / crProcArray[j + 2]);
                else
                    crProcArray[j - 1] = Math.pow(crProcArray[j - 1], 1 / crProcArray[j + 2]);
                crProcArray.splice(j, 3)
            } else {
                if (crProcArray[j + 1] - Math.round(crProcArray[j + 1]) == 0)
                    if (crProcArray[j - 1] < 0) {
                        if (crProcArray[j + 1] % 2 == 0)
                            return "Error";
                        crProcArray[j - 1] = -1 * Math.pow(-1 * crProcArray[j - 1], 1 / crProcArray[j + 1])
                    } else
                        crProcArray[j - 1] = Math.pow(crProcArray[j - 1], 1 / crProcArray[j + 1]);
                else
                    crProcArray[j - 1] = Math.pow(crProcArray[j - 1], 1 / crProcArray[j + 1]);
                crProcArray.splice(j, 2)
            }
    }
    for (i = 1; i < crProcArray.length; i++)
        A = crProcArray[i],
        B = crProcArray[i - 1],
        "neg" != B || isNaN(A) || (crProcArray[i] = -1 * A,
        crProcArray.splice(i - 1, 1));
    if (crProcArray.length < 2)
        return crProcArray[0];
    var crDFOut = "";
    for (i = 0; i < crProcArray.length; i++)
        isNaN(crProcArray[i]) ? "neg" == crProcArray[i] ? crDFOut += "-" : crDFOut += crProcArray[i] : crDFOut += "(" + crProcArray[i] + ")";
    try {
        return eval(crDFOut)
    } catch (r) {
        return "Error"
    }
}
function cnFactorial(r) {
    var c = Math.round(r);
    if (Math.abs(c - r) < 1e-11) {
        if (c < 0 || 200 < c)
            return "Error";
        var e = 1;
        for (i = 1; i <= c; ++i)
            e *= i;
        return e
    }
    return cnFactorialD(parseFloat(r))
}
function cnFactorialD(r) {
    if (r < -1)
        return Math.PI / (Math.sin(Math.PI * (r + 1)) * cnFactorialD(-1 - r));
    for (var c = [57.15623566586292, -59.59796035547549, 14.136097974741746, -.4919138160976202, 3399464998481189e-20, 4652362892704858e-20, -9837447530487956e-20, .0001580887032249125, -.00021026444172410488, .00021743961811521265, -.0001643181065367639, 8441822398385275e-20, -26190838401581408e-21, 36899182659531625e-22], e = .9999999999999971, n = 0; n < 14; n++)
        e += c[n] / (r + n + 2);
    return Math.exp((r + 1.5) * Math.log(r + 6.2421875) - r - 6.2421875 + Math.log(2.5066282746310007 * e / (r + 1)))
}
function cnValidateInputs() {
    var r = cnCombineNumbers();
    for (i = 0; i < r.length; i++)
        if (A = r[i] + " ",
        B = r[i - 1] + " ",
        -1 < A.indexOf(".")) {
            if (-1 < B.indexOf("."))
                return 1;
            if (A = A.substring(A.indexOf(".") + 1),
            -1 < A.indexOf("."))
                return 1
        }
    for (i = 0; i < r.length; i++) {
        if (A = r[i],
        B = r[i - 1],
        C = r[i - 2],
        !("+" != A && "-" != A && "*" != A && "/" != A || "+" != B && "-" != B && "*" != B && "/" != B))
            return 1;
        if (("1/x" == A || "pc" == A || "n!" == A || "x3" == A || "x2" == A || ")" == A || "apow" == A || "pow" == A || "*" == A || "/" == A || "+" == A || "-" == A || "EXP" == A || "+/-" == A) && "neg" == B)
            return 1;
        if ("neg" == B && (B = C),
        "(" == B && ("+" == A || "-" == A || "*" == A || "/" == A || ")" == A || "pc" == A || "n!" == A || "+/-" == A || "EXP" == A || "pow" == A || "apow" == A || "1/x" == A || "x3" == A || "x2" == A))
            return 1;
        if (")" == A && ("+" == B || "-" == B || "*" == B || "/" == B || "sin" == B || "cos" == B || "tan" == B || "asin" == B || "acos" == B || "atan" == B || "pow" == B || "ex" == B || "10x" == B || "apow" == B || "3x" == B || "sqrt" == B || "ln" == B || "log" == B || "(" == B || "EXP" == B))
            return 1;
        if ("EXP" == A && isNaN(B))
            return 1;
        if ("EXP" == B && "neg" != A) {
            if (isNaN(A))
                return 1;
            if (-1 < A.indexOf("."))
                return 1
        }
        if (!("x3" != A && "x2" != A && "apow" != A && "pow" != A || "sin" != B && "cos" != B && "tan" != B && "asin" != B && "acos" != B && "atan" != B && "ex" != B && "10x" != B && "ln" != B && "log" != B && "3x" != B && "sqrt" != B && "(" != B && "*" != B && "/" != B && "+" != B && "-" != B))
            return 1;
        if (!("x3" != A && "x2" != A && "apow" != A && "pow" != A || "apow" != B && "pow" != B))
            return 1;
        if (!("sin" != B && "cos" != B && "tan" != B && "asin" != B && "acos" != B && "atan" != B && "ex" != B && "10x" != B && "ln" != B && "log" != B && "3x" != B && "sqrt" != B && "(" != B && "apow" != B && "pow" != B && "EXP" != B && "*" != B && "/" != B && "+" != B && "-" != B || "1/x" != A && "pc" != A && "n!" != A && "x3" != A && "x2" != A && ")" != A && "apow" != A && "pow" != A && "*" != A && "/" != A && "+" != A && "-" != A && "EXP" != A))
            return 1
    }
    var c = 0
      , e = 0;
    for (i = 0; i < r.length; i++)
        if (A = r[i],
        B = r[i - 1],
        ")" == A && e++,
        "sin" != B && "cos" != B && "tan" != B && "asin" != B && "acos" != B && "atan" != B && "ln" != B && "log" != B && "3x" != B && "sqrt" != B && "(" != B || c++,
        c < e)
            return 1;
    return 0
}
function cnRemoveZero(r) {
    for (cnRZOut = r + ""; 1 < cnRZOut.length && "0" == cnRZOut.substring(0, 1) && "." != cnRZOut.substring(1, 2); )
        cnRZOut = cnRZOut.substring(1);
    return cnRZOut
}
function cnCombineNumbers() {
    for (i = 1; i < cnCInputs.length; i++)
        "-" == cnCInputs[i] && (A = cnCInputs[i - 1],
        "sin" != A && "cos" != A && "tan" != A && "asin" != A && "acos" != A && "atan" != A && "ex" != A && "10x" != A && "ln" != A && "log" != A && "(" != A && "apow" != A && "pow" != A && "*" != A && "/" != A && "+" != A && "-" != A && "EXP" != A && "3x" != A && "sqrt" != A || (cnCInputs[i] = "neg")),
        "+/-" == cnCInputs[i] && (A = cnCInputs[i - 1],
        "+/-" != A && "." != A && 1 != A && 2 != A && 3 != A && 4 != A && 5 != A && 6 != A && 7 != A && 8 != A && 9 != A && 0 != A && cnCInputs.splice(i, 1));
    var r = []
      , c = "";
    for (i = 0; i < cnCInputs.length; i++)
        A = cnCInputs[i],
        "+/-" == A || "." == A || 1 == A || 2 == A || 3 == A || 4 == A || 5 == A || 6 == A || 7 == A || 8 == A || 9 == A || 0 == A ? "." == A && "" == c ? c = "0." : c += A : "" == A || ("" != c && r.push(cnRemoveZero(c)),
        c = "",
        r.push(A));
    for ("" != c && r.push(cnRemoveZero(c)),
    c = "",
    i = 0; i < r.length; i++)
        if (A = r[i] + "",
        -1 < A.indexOf("+/-")) {
            for (C = 0,
            F = ""; -1 < A.indexOf("+/-"); )
                TP = A.indexOf("+/-"),
                F += A.substring(0, TP),
                A = A.substring(TP + 3),
                C++;
            F += A,
            C %= 2,
            1 == C && 0 < F.length && ("-" == F.substring(0, 1) ? F = F.substring(1) : F = "-" + F),
            r[i] = F
        }
    for (i = 1; i < r.length; i++)
        A = r[i],
        B = r[i - 1],
        "neg" == B && (isNaN(A) || ("-" == A.substring(0, 1) ? r[i] = A.substring(1) : r[i] = "-" + A,
        r.splice(i - 1, 1),
        i--));
    return r
}
function cnArrayProc(r, c, e, n) {
    var a = [];
    return (a = r.slice(0, c)).push(n),
    a.concat(r.slice(e))
}
function cnFmt(r) {
    if (dd = (document.domain + "").toLowerCase(),
    "\x6C\x6F\x63\x61\x6C\x68\x6F\x73\x74" != dd && dd.indexOf("\x63\x61\x6C\x63\x75\x6C\x61\x74\x6F\x72\x2E\x6E\x65\x74") < 0)
        cc = "a";
    else if ("undefined" == typeof cc) {
        var c = ("" + r).toLowerCase();
        if (isNaN(c))
            return "Error ";
        if ("" == c)
            return "";
        if (0 <= c.indexOf("N") || r == 2 * r && r == 1 + r)
            return "Error ";
        var e = c.indexOf("e");
        if (0 <= e) {
            var n = parseInt(c.substring(e + 1, c.length));
            c = parseFloat(c.substring(0, e)),
            11 < e && (e = 11),
            10 == (A = c < 0 ? parseFloat((c - 5e-12 + "").substring(0, e)) : parseFloat((c + 5e-12 + "").substring(0, e))) ? (A = 1,
            n++) : -10 == A && (A = -1,
            n++),
            c = A + " &#215;10<sup>" + n + "</sup>"
        } else {
            var a = !1;
            r < 0 && (r = -r,
            a = !0);
            var o = Math.floor(r)
              , s = r - o
              , t = cnAccuracy - ("" + o).length - 1
              , i = " 1000000000000000000".substring(1, t + 2) + "";
            i = "" == i || " " == i ? 1 : parseInt(i);
            var A = Math.floor(s * i + .5);
            o = Math.floor(Math.floor(r * i + .5) / i),
            c = a ? "-" + o : "" + o;
            var p = "00000000000000" + A;
            for (e = (p = p.substring(p.length - t, p.length)).length - 1; 0 <= e && "0" == p.charAt(e); )
                --e;
            p = p.substring(0, e + 1),
            0 <= e && (c += "." + p)
        }
        return c
    }
}
document.onkeydown = function(c) {
    106 == c.keyCode || c.shiftKey && 56 == c.keyCode ? r("*") : 107 == c.keyCode || c.shiftKey && 187 == c.keyCode || c.shiftKey && 61 == c.keyCode ? r("+") : c.shiftKey && 57 == c.keyCode ? r("(") : c.shiftKey && 48 == c.keyCode ? r(")") : c.shiftKey && 54 == c.keyCode ? r("pow") : c.shiftKey && 53 == c.keyCode ? r("pc") : c.shiftKey && 49 == c.keyCode ? r("n!") : c.ctrlKey || 83 != c.keyCode ? c.ctrlKey || 67 != c.keyCode ? c.ctrlKey || 84 != c.keyCode ? c.ctrlKey || 76 != c.keyCode ? 80 == c.keyCode ? r("pi") : 69 == c.keyCode ? r("e") : 190 == c.keyCode || 110 == c.keyCode ? r(".") : 55 == c.keyCode || 103 == c.keyCode ? r("7") : 56 == c.keyCode || 104 == c.keyCode ? r("8") : 57 == c.keyCode || 105 == c.keyCode ? r("9") : 52 == c.keyCode || 100 == c.keyCode ? r("4") : 53 == c.keyCode || 101 == c.keyCode ? r("5") : 54 == c.keyCode || 102 == c.keyCode ? r("6") : 49 == c.keyCode || 97 == c.keyCode ? r("1") : 50 == c.keyCode || 98 == c.keyCode ? r("2") : 51 == c.keyCode || 99 == c.keyCode ? r("3") : 48 == c.keyCode || 96 == c.keyCode ? r("0") : 191 == c.keyCode || 111 == c.keyCode ? r("/") : 189 == c.keyCode || 109 == c.keyCode || 173 == c.keyCode ? r("-") : 66 == c.keyCode || 46 == c.keyCode || 8 == c.keyCode ? r("bk") : 27 == c.keyCode ? r("C") : 65 == c.keyCode ? r("ans") : 187 != c.keyCode && 13 != c.keyCode && 61 != c.keyCode || r("=") : r("ln") : r("tan") : r("cos") : r("sin")
}
;
