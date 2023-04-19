const baseUrl = "http://127.0.0.1:5000/api/jobs";

//pagination code
let currentPage = 1;
let lastPage = 1;

//===infinite scroll===//
window.addEventListener("scroll", function () {
  const endOfPage =
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage && currentPage < lastPage) {
    getJobs(false, currentPage + 1);
    currentPage = currentPage + 1;
  }
});

//===//infinite scroll//===//
//end pagination code

//ui login,register function
setupUI();

//call variables
const jobNumber = document.getElementById("job-number");
const jobVeiw = document.getElementById("job-view");
const postJopBtn = document.getElementById("PostAJop");

const userName = document.getElementById("userName");

postJopBtn.addEventListener("click", (event) => {
  //check if he login or no
  var token = localStorage.getItem("token");
  if (token === null) {
    //if not login the go to login page
    toast("You are not logged in.", "#ff0000");

    window.location.assign("../login.html");
  } else {
    //if yes then go to post jop page
    window.location.assign("../postJob.html");
  }
});

let user_name = localStorage.getItem("user");
user_name1 = JSON.parse(user_name);
//fetch data
function getJobs(reload = true, page = 1) {
  fetch(`${baseUrl}?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      jobNumber.innerHTML = `<p class="header-p" >${data.meta.total} Jobs listed</p>`;

      userName.innerHTML = `${user_name1}`;
      lastPage = data.meta.total;

      if (reload) {
        jobVeiw.innerHTML = " ";
      }
      data.data.forEach((job) => {
        const date = new Date(job.created_at);
        // console.log(data);
        jobVeiw.innerHTML += `
      <li id="list" >
      <div class="job-data">
        <div class="job-container-left">
          <div class="job-img-container">
            <img class="job-img" src=${job.company_logo} alt="" />
          </div>
          <div class="job-details">
            <h4 class="job-name">${job.title}</h4>
          <div class="job-details-sub">
            <p class="job-company">${job.company_name}</p>
          <p class="job-address">${job.location}</p>
          <p class="job-time">full-time</p>
          </div>
          </div>
        </div>

        <div class="job-container-right">
          <div class="job-action">
            <div class="job-like-container">
              <img src="./images/Vector.png" alt="like" class="job-like" />

            </div>
            <button type="button" class="btn jobBtn btn-primary"  id="model-button" onclick="jobClicked(${job.id})">Show Details</button>

          </div>
          <p class="job-date">${new Intl.DateTimeFormat().format(date)}</p>
        </div>
        </div>
      </li>
     `;
      });
    });
}

getJobs();

function setupUI() {
  const token = localStorage.getItem("token");

  const loginBtn = document.getElementById("login");
  const registerBtn = document.getElementById("signUp");
  // const logoutBtn = document.getElementById("logout");
  const logoutDiv = document.getElementById("logout-div");
  const userName = document.getElementById("userName");

  if (token === null) {
    //user is guest (not logged in)
    loginBtn.style.visibility = "visible";
    registerBtn.style.visibility = "visible";
    logoutDiv.style.display = "none";
    userName.style.display = "none";
  } else {
    loginBtn.style.visibility = "hidden";
    registerBtn.style.visibility = "hidden";
    logoutDiv.style.display = "flex";
    toast(
      "logged in successfully",
      "linear-gradient(to right, #00b09b, #96c93d)"
    );
  }
}

//logout function
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  toast(
    "logged out successfully",
    "linear-gradient(to right, #00b09b, #96c93d)"
  );
  setupUI();
}

//Toastify code
function toast(toastMessage, toastBackground) {
  Toastify({
    text: toastMessage,
    style: {
      background: toastBackground,
    },
  }).showToast();
}

//===' job details fetch '===//

//when clicked in job show details
function jobClicked(jobId) {
  console.log(jobId);
  window.location = `jobDetails.html?jobId=${jobId}`;
}





