module.exports = io => {
  io.set('origins', '*:*');

  io.on('connection', socket => {
    socket.on('room_join', room => {
      socket.join(room, () => {});
    });
    socket.on('room_quit', room => {
      socket.leave(room, () => {});
    });
    socket.on('message_send', (room, message) => {
      socket.to(room).emit('message_receive', room, message);
    });
  });
};
