const socket = io();
const chatBox = document.getElementById("chatBox")


let user;
Swal.fire({
    icon: 'info',
    title: 'Identificate por favor',
    text: 'Ingresa el usuario para identificarte en el chat',
    input: "text",
    inputValidator: (value) => {
        if (!value) {
            return "Debes ingresar un nombre para comenzar"
        } else {
            socket.emit("userConnected", { user: value })
        }
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    console.log(result.value);
})

socket.on("userConnected", data => {
    console.log(data);
    let message = `Usuario nuevo : ${data}`
    Swal.fire({
        icon: "info",
        title: "Nuevo usauario entra al chat!",
        text: message,
        toast: true,
        color: '#716add'
    });
})


chatBox.addEventListener('keyup', e => {
    if (e.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', { user: user, message: chatBox.value })
            chatBox.value = "";
        } else {
            Swal.fire({
                icon: "warning",
                title: "Alert",
                text: "Por favor escribe una palabra, los espacios no son un mensaje valido."
            });
        }
    }
});

socket.on('messageLogs', data => {
    const messageLog = document.getElementById("messagelog")
    let logs = '';
    data.forEach(log => {
        logs += `${log.user} dice: ${log.message} <br/>`
    })
    messageLog.innerHTML = logs;

});