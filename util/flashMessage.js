const sendMessage = async (type, message) => {
  return {
    type,
    message,
  };
};

module.exports = sendMessage