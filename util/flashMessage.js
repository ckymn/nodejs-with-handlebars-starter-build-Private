const sendMessage = (type, message) => {
  return {
    type,
    message,
  };
};

module.exports = sendMessage