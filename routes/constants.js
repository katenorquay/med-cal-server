function makeEmojiObjs(userId, callback) {
  callback([{
      userId: userId,
      x: 0,
      y: 0,
      icon: '♗'
    },
    {
      userId: userId,
      x: 0,
      y: 1,
      icon: '♔'
    },
    {
      userId: userId,
      x: 0,
      y: 2,
      icon: '♛'
    },
    {
      userId: userId,
      x: 0,
      y: 3,
      icon: '♞'
    },
    {
      userId: userId,
      x: 0,
      y: 4,
      icon: '♜'
    },
    {
      userId: userId,
      x: 0,
      y: 5,
      icon: '♘'
    }])
}

  module.exports = makeEmojiObjs
