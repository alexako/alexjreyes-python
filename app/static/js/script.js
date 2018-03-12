var chatBox = document.getElementById('chat-box');
var chatButton = document.getElementById('chat-button');

chatButton.onclick = function() {
  chatBox.classList.toggle('hide');
  chatButton.classList.toggle('open');
  document.getElementById('message').focus();
};
