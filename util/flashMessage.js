// module.exports = [
//   {
//     type: "alert alert-success",
//     message: "Blog Create Successfully",
//   },
//   {
//     type: "alert alert-danger",
//     message: "Blog Create Incorrect",
//   },
//   {
//     type: "alert alert-danger",
//     message: "You Have To Login",
//   },
//   {
//     type: "alert alert-danger",
//     message: "You Have To SignUp",
//   },
//   {
//     type: "alert alert-danger",
//     message: "Have Already email . You Should Other Email or You should Login",
//   },
//   {
//     type: "alert alert-success",
//     message: "SignUp Success",
//   },
//   {
//     type: "alert alert-success",
//     message: "Category Create Successfully",
//   },
//   {
//     type: "alert alert-danger",
//     message: "Category Create Incorrect",
//   },
// ];

const sendMessage = (type, message) => {
  return {
    type,
    message,
  };
};

module.exports = sendMessage