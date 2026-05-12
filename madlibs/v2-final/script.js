function showResult() {
    var number      = document.querySelector("#number").value.trim();
    var family      = document.querySelector("#family").value.trim();
    var verb1       = document.querySelector("#verb1").value.trim();
    var adjective1  = document.querySelector("#adjective1").value.trim();
    var noun        = document.querySelector("#noun").value.trim();
    var adjective2  = document.querySelector("#adjective2").value.trim();
    var monster     = document.querySelector("#monster").value.trim();
    var verb2       = document.querySelector("#verb2").value.trim();
    var place       = document.querySelector("#place").value.trim();
    var silly       = document.querySelector("#silly").value.trim();
    var exclamation = document.querySelector("#exclamation").value.trim();
    var verbing     = document.querySelector("#verbing").value.trim();

    var allInputs = document.querySelectorAll("#screen-input input[type='text']");
    var hasEmpty = false;

    for (var i = 0; i < allInputs.length; i++) {
    if (allInputs[i].value.trim() === "") {
        allInputs[i].className = "empty-field";
        hasEmpty = true;
    } else {
        allInputs[i].className = "";
    }
    }

    if (hasEmpty) {
    document.querySelector("#error-msg").innerHTML = "Please fill out all fields before spawning in!";
    return;
    }

    var p1 = "Hey guys, sorry I have to go AFK for like <span class='highlight'>" + number + "</span> minutes. My <span class='highlight'>" + family + "</span> is yelling at me to <span class='highlight'>" + verb1 + "</span> and she sounds <span class='highlight'>" + adjective1 + "</span>.";

    var p2 = "I tried to hide my character behind a <span class='highlight'>" + noun + "</span> before leaving, but a <span class='highlight'>" + adjective2 + "</span> <span class='highlight'>" + monster + "</span> found me anyway. Typical. While I'm gone, please do NOT <span class='highlight'>" + verb2 + "</span> my character. Last time someone did that I spawned back in <span class='highlight'>" + place + "</span> with nothing but a <span class='highlight'>" + silly + "</span> and my dignity in shambles.";

    var p3 = "I will be back before the boss respawns. Probably. Tell the squad I said <span class='highlight'>" + exclamation + "</span> and that I died doing what I loved: <span class='highlight'>" + verbing + "</span> nothing.";

    document.querySelector("#result-text").innerHTML = p1 + "<br><br>" + p2 + "<br><br>" + p3;

    document.querySelector("#screen-input").className = "screen";
    document.querySelector("#screen-result").className = "screen active";

    window.scrollTo(0, 0);
    }

    function resetForm() {
    var allInputs = document.querySelectorAll("#screen-input input[type='text']");
    for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].value = "";
    allInputs[i].className = "";
    }

    document.querySelector("#error-msg").innerHTML = "";

    document.querySelector("#screen-result").className = "screen";
    document.querySelector("#screen-input").className = "screen active";

    window.scrollTo(0, 0);
}