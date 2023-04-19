//login code

function loginBtnClicked() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const params = {
    email: email,
    password: password,
  };

  const url = "http://127.0.0.1:5000/api/login";

  axios
    .post(url, params)
    .then(function (response) {
      token = response.data.token;
      user = JSON.stringify(response.data.data.name);
      // console.log(email);
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      localStorage.setItem("email", email);

      window.location = "./index.html";
      toast(
        "logged in successfully",
        "linear-gradient(to right, #00b09b, #96c93d)"
      );
    })
    .catch(function (error) {
      toast("login failed", "#ff0000");
    });
}

function toast(toastMessage, toastBackground) {
  Toastify({
    text: toastMessage,
    style: {
      background: toastBackground,
    },
  }).showToast();
}

//redirect to register page
let signUp = document.getElementById("sign-btn");
signUp.addEventListener("click", (event) => {
  window.location.assign("./register.html");
});
