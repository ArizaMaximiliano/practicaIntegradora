(function () {
  let username;
  const socket = io();

  const formMessage = document.getElementById('form-message');
  const inputMessage = document.getElementById('input-message');
  const logMessages = document.getElementById('log-messages');

  formMessage.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = inputMessage.value;
    socket.emit('new-message', { username, text });
    console.log('Nuevo mensaje enviado', { username, text });
    inputMessage.value = '';
    inputMessage.focus();
  });

  function updateLogMessages(messages) {
    logMessages.innerText = '';
    messages.forEach((msg) => {
      const p = document.createElement('p');
      p.innerText = `${msg.username}: ${msg.text}`;
      logMessages.appendChild(p);
    });
  }

  socket.on('notification', ({ messages }) => {
    updateLogMessages(messages);
  });

  socket.on('new-message-from-api', (message) => {
    console.log('new-message-from-api ->', message);
  });

  (function getUsername() {
    username = prompt('Identificate por favor \nIngresa tu usuario:');

    if (!username || username.trim() === '') {
      console.log('Necesitamos que ingreses un usuario para continuar.');
      return;
    }

    console.log(`Hola ${username.trim()}, bienvenido!`);
  })();
})();