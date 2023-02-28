const socket = io();

socket.emit("message", "Hola, me estoy comunicando con eun websocket")

Swal.fire({
    icon: 'success',
    title: 'Hola Coders!!',
    text: 'Alerta Basica de Sweetalert2',
    footer: '<a href="">Pro que veo esta elerta?</a>'
  })
