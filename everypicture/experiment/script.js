function main() {
  "use strict";

  function toggleEnvelope(clicked, envelopes) {
    if (clicked.className === "envelope open") {
      clicked.className = "envelope";
    } else {
      
      for (var i = 0; i < envelopes.length; i++) {
        envelopes[i].className = "envelope";
      }
      
      clicked.className = "envelope open";
    }
  }

  var envelopes = document.querySelectorAll(".envelope");

  for (var i = 0; i < envelopes.length; i++) {
    envelopes[i].addEventListener("click", function() {
      toggleEnvelope(this, envelopes);
    });
  }
}

main();