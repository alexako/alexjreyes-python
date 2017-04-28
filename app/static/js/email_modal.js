var modal = document.getElementById("mail_modal");
var btn = document.getElementById("modalBtn");
var clipboard = new Clipboard(".copyEmail");

clipboard.on("success", function(e) {
  notify_success();
});

function notify_success() {
  var modal_content = document.getElementsByClassName("modal_content")[0];
  modal_content.style.background = "dodgerblue";
  modal_content.style.background = "#1e1e20";
}

btn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
