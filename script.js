(function() {
    var currentPlayer = "player1";
    var spiced = "";
    var spiced1 = "";
    var spiced2 = "";
    var compmode = false;

    //DIAGONAL VICTORY POSSIBILITIES

    var possibles = [
        [2, 9, 16, 23],
        [1, 8, 15, 22, 29],
        [0, 7, 14, 21, 28, 35],
        [6, 13, 20, 27, 34, 41],
        [12, 19, 26, 33, 40],
        [18, 25, 32, 39],
        [3, 8, 13, 18],
        [4, 9, 14, 19, 24],
        [5, 10, 15, 20, 25, 30],
        [11, 16, 21, 26, 31, 36],
        [17, 22, 27, 32, 37],
        [23, 28, 33, 38]
    ];

    //SETTING LEADERBOARD PROPERTIES

    var leader = {
        adeline: 0,
        bettina: 0,
        jorge: 0,
        josh: 0,
        kike: 0,
        lorena: 0,
        medo: 0,
        noelia: 0,
        ofir: 0
    };
    $("#cursor").hide();
    $("#menu").hide();
    var curOnCol = "";
    var dropIt;
    var fraId;

    // LISTENER WHEN TURN WAS MADE

    $("#cursor").on("click", function() {
        var currCol = $("#col" + curOnCol);
        var slotsInCol = currCol.find(".row");
        var played = false;
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                var dropOffNum = i;
                var dropOffLoc = slotsInCol.eq(i);
                // console.log(dropOffLoc);
                //****
                dropOffLoc.addClass(currentPlayer);
                dropOffLoc.addClass(spiced);
                //****
                played = true;
                break;
            }
        }
        if (!played) {
            return;
        }
        played = false;
        // function drop() {
        //     fraId = requestAnimationFrame(drop);
        //     dropIt += 1;
        //     $("#cursor").css("top", dropIt - 50 + "px");
        //     console.log(
        //         $("#cursor").css("top") >= dropOffNum * 122 - 42 + "px"
        //     );
        // if ($("#cursor").css("top") >= dropOffNum * 122 - 42 + "px") {
        //     cancelAnimationFrame(fraId);

        // }
        // }
        // drop();
        if (checkForVictory(slotsInCol)) {
            setTimeout(chickendinner, 3);
        } else if (checkForVictory($(".row" + i))) {
            setTimeout(chickendinner, 3);
        } else if (diagonalCheck()) {
            setTimeout(chickendinner, 3);
        } else {
            gameOver();
            setTimeout(switchPlayers, 10);
        }
    });

    //SWITCHES TURNS

    function switchPlayers() {
        if (currentPlayer == "player1") {
            if (compmode) {
                setTimeout(computerturn(), 10);
            } else {
                currentPlayer = "player2";
                $("#cursor").removeClass(spiced1);
                $("#cursor").removeClass(spiced2);
                spiced = spiced2;
                $("#cursor").addClass(spiced);
            }
        } else {
            currentPlayer = "player1";
            $("#cursor").removeClass(spiced2);
            $("#cursor").removeClass(spiced1);
            spiced = spiced1;
            $("#cursor").addClass(spiced);
        }
    }

    //CHECKS VERTICAL AND HORIZONTAL VICTORIES

    function checkForVictory(line) {
        var goal = 0;
        for (var j = 0; j < line.length; j++) {
            if (line.eq(j).hasClass(currentPlayer)) {
                goal++;
            } else {
                goal = 0;
            }
            if (goal == 4) {
                return true;
            }
        }
    }

    //CHECKS DIAGONAL VICTORIES

    function diagonalCheck() {
        var slots = $(".row");
        var checker = 0;
        for (var i = 0; i < 12; i++) {
            checker = 0;
            for (var j = 0; j < possibles[i].length; j++) {
                if (slots.eq(possibles[i][j]).hasClass(currentPlayer)) {
                    checker++;
                } else {
                    checker = 0;
                }
                if (checker == 4) {
                    return true;
                }
            }
        }
    }

    //ANNOUNCES A WINNER, RESTARTS THE GAME

    function chickendinner() {
        {
            alert(spiced.toUpperCase() + " WON!");
            $(".row").removeClass("player1");
            $(".row").removeClass("player2");
            $(".row").removeClass(spiced1);
            $(".row").removeClass(spiced2);
            $("#cursor").removeClass(spiced1);
            $("#cursor").removeClass(spiced2);
            leader[spiced]++;
            spiced = "";
            $("#cursor").hide();
            leading();
            $("#mode").show();
            $("#menbg").show();
        }
    }

    //CHECKS IF PANEL GOT FILLED WITHOUT A WINNER

    function gameOver() {
        var over = 0;
        for (var i = 0; i < 42; i++) {
            if (
                $(".row")
                    .eq(i)
                    .hasClass("player2")
            ) {
                over++;
            } else if (
                $(".row")
                    .eq(i)
                    .hasClass("player1")
            ) {
                over++;
            }
            if (over == "42") {
                setTimeout(function() {
                    alert("GAME OVER!!!");
                    $(".row").removeClass("player1");
                    $(".row").removeClass("player2");
                    $(".row").removeClass(spiced1);
                    $(".row").removeClass(spiced2);
                    $("#cursor").removeClass(spiced1);
                    $("#cursor").removeClass(spiced2);
                    spiced = "";
                    $("#cursor").hide();
                    $("#menu").show();
                    $("#menbg").show();
                }, 20);
            }
        }
    }

    // THE WELCOME MENU

    $("#pvp").on("click", function() {
        $("#mode").hide();
        $("#menu").show();
    });
    $("#cvp").on("click", function() {
        $("#mode").hide();
        compmode = true;
        $("#menu").show();
    });

    // THE PLAYER CHOOSER

    $("#chooser div").on("click", function(e) {
        var currPl = $(e.currentTarget);
        if (!compmode) {
            if (spiced == "") {
                console.log("1st");
                spiced = currPl.attr("id");
                spiced1 = currPl.attr("id");
                $("#toggle").html("PLAYER 2");
            } else {
                if (spiced1 == currPl.attr("id")) {
                    return;
                }
                console.log(spiced);
                spiced2 = currPl.attr("id");
                $("#menu").hide();
                $("#menbg").hide();
                $("#cursor").show();
                $("#toggle").html("PLAYER 1");
                $("#cursor").addClass(spiced);
            }
        } else {
            if (spiced == "") {
                console.log("computer opponent");
                spiced = currPl.attr("id");
                spiced1 = currPl.attr("id");
                console.log(spiced);
                spiced2 = "computer";
                $("#menu").hide();
                $("#menbg").hide();
                $("#cursor").show();
                $("#toggle").html("PLAYER 1");
                $("#cursor").addClass(spiced);
            } else {
                console.log("error!!");
            }
        }
    });

    // MAKES THE CURSOR APPEAR AS THE CURRENT PLAYER

    $("#listener").on("mousemove", function(e) {
        $("#cursor").css("top", e.clientY - 50 + "px");
    });
    $(".column").on("mousemove", function(e) {
        curOnCol = parseInt(
            $(e.currentTarget)
                .attr("id")
                .slice(3, 4)
        );
        console.log(curOnCol);
        $("#cursor").css("left", curOnCol * 122 + 12 + "px");
    });

    //UPDATES LEADER BOARD

    function leading() {
        var sortable = [];
        for (var partic in leader) {
            sortable.push([partic, leader[partic]]);
            sortable.sort(function(a, b) {
                return a[1] - b[1];
            });
            if (leader.hasOwnProperty(partic)) {
                if (sortable.length == 9) {
                    var leadId = 9;
                    $(".inline").remove();
                    for (var i = 0; i < sortable.length; i++) {
                        $("#" + leadId).append(
                            '<p class="inline">' +
                                sortable[i][0].toUpperCase() +
                                "------------" +
                                sortable[i][1] +
                                "</p>"
                        );
                        leadId--;
                    }
                }
            }
        }
    }

    function mapper() {
        var mapping = [];
        for (var i = 5; i >= 0; i--) {
            for (var j = 0; j < 7; j++) {
                if (
                    $(".row" + i)
                        .eq(j)
                        .hasClass("player2")
                ) {
                    mapping.push(2);
                } else if (
                    $(".row" + i)
                        .eq(j)
                        .hasClass("player1")
                ) {
                    mapping.push(1);
                } else {
                    mapping.push(null);
                }
            }
        }
        return mapping;
    }
    function verticalRisk(mapped) {
        var goal = 0;
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 6; j++) {
                if (mapped[j * 7 + i] == 1) {
                    goal++;
                } else {
                    goal = 0;
                }
                if (goal == 3) {
                    if (mapped[(j + 1) * 7 + i] == 2) {
                        console.log("risk neutralized");
                    } else {
                        return i;
                    }
                }
            }
            goal = 0;
        }
        return false;
    }
    function horizontalRisk(mapped) {
        var complexrow = false;
        var orderow = false;
        var goal = 0;
        var riskies = [];
        for (var i = 0; i < 42; i++) {
            // console.log("goal:", goal);
            if (i > 0 && i % 7 == 0) {
                goal = 0;
            }
            if (mapped[i] == 1) {
                goal++;
            } else {
                goal = 0;
            }
            if (goal == 2) {
                if (
                    (i + 1) % 7 != 0 &&
                    (i + 2) % 7 != 0 &&
                    mapped[i + 2] == 1
                ) {
                    console.log("orderow in a row again!");
                    goal = 3;
                    orderow = true;
                }
                if (
                    (i - 2) % 7 != 0 &&
                    (i - 1) % 7 != 0 &&
                    mapped[i - 3] == 1
                ) {
                    console.log("complex in a row again!");
                    goal = 3;
                    complexrow = true;
                }
            }
            if (goal == 3) {
                if (complexrow) {
                    riskies.push(i - 2);
                    console.log("taken care of", i - 2);
                } else {
                    console.log("3 in a row");
                    if ((i - 2) % 7 == 0) {
                        if (mapped[i + 1] == 2) {
                            console.log("risk neutralized");
                        } else {
                            console.log("risk1 in", i);
                            riskies.push(i + 1);
                        }
                    } else if ((i - 6) % 7 == 0) {
                        if (mapped[i - 3] == 2) {
                            console.log("risk neutralized");
                        } else {
                            console.log("risk2 in", i);
                            riskies.push(i - 3);
                        }
                    } else if (mapped[i + 1] == 2 && mapped[i - 3] == 2) {
                        console.log("risk neutralized");
                    } else {
                        if (mapped[i + 1] != 2) {
                            console.log("risk3 in", i);
                            riskies.push(i + 1);
                        }
                        if (mapped[i - 3] != 2) {
                            console.log("risk4 in", i);
                            riskies.push(i - 3);
                        }
                    }
                }
                goal = 0;
            }
        }
        console.log("riskies", riskies);
        return riskies;
    }

    function diagonalRisk(subject) {
        if (subject == undefined) {
            subject = "player1";
        }
        console.log("checking diagonal");
        var slots = $(".row");
        var checker = 0;
        var results = [];
        for (var i = 0; i < 12; i++) {
            checker = 0;
            for (var j = 0; j < possibles[i].length; j++) {
                if (slots.eq(possibles[i][j]).hasClass(subject)) {
                    console.log("subject:", subject);
                    console.log("checker", checker, "i", i);
                    checker++;
                } else {
                    checker = 0;
                }
                if (checker == 3) {
                    console.log("diagonal risk detected", possibles[i]);
                    for (var k = 0; k < possibles[i].length; k++) {
                        var x = 6;
                        console.log(
                            "results:",
                            7 * Math.floor((x * (possibles[i][k] - 5)) % 6)
                        );
                        if ((possibles[i][k] - 5) % 6 == 0) {
                            x = 0;
                        }
                        results[k] =
                            Math.floor(possibles[i][k] / 6) +
                            7 * Math.floor(x - ((possibles[i][k] - 5) % 6));
                        if (results[k] > 41) {
                            results[k] -= 42;
                        }
                    }
                }
            }
        }
        return results;
    }

    function nextstrategy(nexts, mapped, horzRisk, diagRisk) {
        var preffered = [];
        console.log("horz:", horzRisk, "diag:", diagRisk);
        var diagOpt = diagonalRisk("player2");
        console.log("diagOpt", diagOpt);
        if (diagOpt.length != 0) {
            for (var k = 0; k < diagOpt.length; k++) {
                if (nexts.includes(diagOpt[k]) && nexts[diagOpt[k] % 7] < 42) {
                    preffered.push(diagOpt[k] % 7);
                }
            }
        } else {
            for (var i = 0; i < 7; i++) {
                if (mapped[nexts[i] - 7] == 2) {
                    preffered.push(i);
                }
            }
        }
        console.log(preffered);
        return preffered;
    }
    function makeMove(col) {
        var currCol = $("#col" + col);
        var slotsInCol = currCol.find(".row");
        var played = false;
        for (var i = 5; i >= 0; i--) {
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                var dropOffLoc = slotsInCol.eq(i);
                // console.log("dropOffLoc", dropOffLoc);
                console.log("move made!");
                // console.log("current", currentPlayer);
                //****
                dropOffLoc.addClass("player2");
                //****
                played = true;
                break;
            }
        }
        if (!played) {
            console.log("WAS FULL LETS TRY AGAIN");
            makeMove(Math.floor(Math.random() * 7));
        }
        played = false;

        if (checkForVictory(slotsInCol)) {
            setTimeout(chickendinner, 3);
        } else if (checkForVictory($(".row" + i))) {
            setTimeout(chickendinner, 3);
        } else if (diagonalCheck()) {
            setTimeout(chickendinner, 3);
        } else {
            gameOver();
            setTimeout(function() {
                currentPlayer = "player1";
                spiced = spiced1;
            }, 10);
        }
    }

    function computerturn() {
        console.log("computer turn made!");
        var mapped = mapper();
        // console.log("this is mapped", mapped);
        var nexts = [0, 1, 2, 3, 4, 5, 6];
        var opts = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };
        var nomove = true;
        for (var i = 0; i < 7; i++) {
            if (mapped[nexts[i]] != null) {
                nexts[i] += 7;
                i = -1;
            }
        }
        for (var j = 0; j < nexts.length; j++) {
            if (nexts[j] > 42) {
                delete opts[j];
            }
        }

        // console.log("opts", opts);
        var vertRisk = verticalRisk(mapped);
        var horzRisk = horizontalRisk(mapped);
        var hRiskAction = null;
        for (var l = 0; l < horzRisk.length; l++) {
            if (nexts.includes(horzRisk[l])) {
                if (nexts[horzRisk[l] % 7] < 42) {
                    hRiskAction = horzRisk[l] % 7;
                    break;
                }
            }
        }
        console.log("hRiskAction", hRiskAction);
        var diagRisk = diagonalRisk();
        var nextstrat = nextstrategy(nexts, mapped, horzRisk, diagRisk);
        console.log("diagRisk", diagRisk);
        // console.log("nexts", nexts);
        if (mapped[3] == null) {
            makeMove(3);
            nomove = false;
        } else if (mapped[2] == null) {
            makeMove(2);
            nomove = false;
        } else if (vertRisk) {
            console.log("vertRisk", vertRisk);
            if (nexts[vertRisk] < 42) {
                makeMove(vertRisk);
                nomove = false;
            }
        } else if (horzRisk.length != 0 && hRiskAction) {
            console.log("horzRisk", horzRisk, "here", hRiskAction);
            makeMove(hRiskAction);
            nomove = false;
        } else if (diagRisk.length != 0) {
            console.log("diagrisk detected");
            for (var k = 0; k < diagRisk.length; k++) {
                if (nexts.includes(diagRisk[k])) {
                    console.log("mooove", diagRisk[k] % 7);
                    if (nexts[diagRisk[k] % 7] < 42) {
                        makeMove(diagRisk[k] % 7);
                        nomove = false;
                        break;
                    }
                }
            }
        } else if (nextstrat.length != 0) {
            // console.log("nextstrat", nextstrat);
            console.log("strategy move");
            //problematic
            var stratopt = Math.floor(Math.random() * nextstrat.length);
            makeMove(nextstrat[stratopt]);
            nomove = false;
        }
        if (nomove) {
            console.log("logic bedrock");
            makeMove(Math.floor(Math.random() * 7));
        }
        console.log("nextstrat:", nextstrat);
    }
})();

// After a player wins, visually indicate which four pieces on the board satisfied the victory condition
// Allow players to drag their pieces across the screen and drop them into their desired column using their mouse (or finger on touch screens)
// Allow players to play using only their keyboard
// Allow a single player to play against the computer
