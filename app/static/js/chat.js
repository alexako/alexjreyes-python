var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port)

socket.on('connect', () => {
  var indicator = document.getElementById('connection-indicator');
  indicator.classList.add('connected');

  document.querySelectorAll('button').forEach(button => {
    button.onclick = () => {
      const selection = button.dataset.vote;
      socket.emit('submit vote', {'selection': selection});
    };
  })


  socket.on('announce vote', data => {
    const li = document.createElement('li');
    var messagesWindow = document.querySelector('#messages');
    li.innerHTML = 'Vote recorded:' + data.selection;
    messagesWindow.append(li);
    messagesWindow.scrollIntoView(false);
  });

  socket.on('disconnect', () => {
    console.error('disconnected');
    indicator.classList.remove('connected');
  });
});


