
function registerBtnClicked() {
    const name = document.getElementById("register-name-input").value;
    const email = document.getElementById("register-email-input").value;
    const password = document.getElementById("register-password-input").value;

    const params = {
        "name": name,
        "email": email,
        "password": password
    };

    const url = "http://127.0.0.1:5000/api/register";

    axios
      .post(url, params)
      .then(function (response) {
        token = response.data.token;
        user = JSON.stringify(response.data.data.name);
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        localStorage.setItem("email", email);
        window.location = "./index.html";
        toast('logged in successfully' , "linear-gradient(to right, #00b09b, #96c93d)")
        setupUI ()
      })
      .catch(function (error) {
        toast(error ,"#ff0000" )
      });
}

function toast(toastMessage , toastBackground) {
  Toastify({
    text: toastMessage,
    style: {
      background: toastBackground,
    }
  }).showToast();
}