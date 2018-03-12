var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

/*
 * Display message in the chat box
 */
function displayMessage(element) {
  var chatWindow = document.querySelector('#messages');
  chatWindow.append(element);
  chatWindow.scrollIntoView(false);
}

function inputKeyUp(e) {
  e.which = e.which || e.keyCode;
  if(e.which == 13) {
    submitMessage();
  }
}

/*
 * Format message into markup
 */
function formatMessage(data) {
  var user = '<span class="user">' + data.user + '</span>: ';
  var timestamp = '<span class="timestamp">' + moment().fromNow() + ' </span>';
  return user + data.message;
}

/*
 * Send message to server
 */
function submitMessage() {
  const input = document.getElementById('message');
  var message = input.value;
  var user = 'You';

  if (!isBlank(message)) {
    socket.emit('submit message', {'user': user, 'message': message});
  }

  input.value = '';
  document.getElementById('message').focus();
}

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

var getResponse = function(data) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve({'user': 'kludge',
        'message': 'I\'m a bot'});
    }, 2000);
  });
};


socket.on('connect', () => {
  const indicator = document.getElementById('connection-indicator');
  const submitBtn = document.getElementById('submit');

  indicator.classList.add('connected');
  submitBtn.addEventListener('click', submitMessage, false);

  socket.on('response', data => {
    console.log('data:', data);
    const userElem = document.createElement('li');
    const responseElem = document.createElement('li');

    userElem.classList.add('kludge');
    userElem.innerHTML = formatMessage(data);
    displayMessage(userElem);

    getResponse(data).then(response => {
      responseElem.innerHTML = formatMessage(response);
      displayMessage(responseElem);
    }).catch(err => {
      var error = 'Woops! Something went wrong.';
      responseElem.innerHTML = error;
      displayMessage(responseElem);
    });
  });

  socket.on('disconnect', () => {
    console.error('disconnected');
    indicator.classList.remove('connected');
  });
});

