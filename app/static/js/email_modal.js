var modal = document.getElementById("mail_modal");
var btn = document.getElementById("modalBtn");

btn.onclick = function() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  console.log(event);
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
