getUserJob();
//===profile code===//

const userData = document.getElementById("userData");
const userName = document.getElementById("userData-name");
const userEmail = document.getElementById("userData-email");
const jobsList = document.getElementById("jobs-list");
console.log(jobsList);
function getUserJob() {
  let user_name = localStorage.getItem("user");
  user_name1 = JSON.parse(user_name);
  let user_email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  console.log(token);
  const headers = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };

  axios
    .get(`http://127.0.0.1:5000/api/profile/jobs`, {
      headers: headers,
    })
    .then(function (response) {
      userName.innerHTML = `${user_name1}`;
      userEmail.innerHTML = `${user_email}`;
      const responseData = response;
      console.log(responseData.data);
      responseData.data.data.forEach((job) => {
        console.log(job);
        jobsList.innerHTML += `
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
                            <img src="./images/1.png" alt="" class="job-like" onclick="deleteJob(${job.id})" />
                        </div>
                        <a href = "mailto: ${job.company_email}" class="btn btn-success" >ApplyNow</a>
                    </div>
                    <p class="job-date">Published: ${job.created_at}</p>
                </div>

            </div>
            `;
      });
    })
    .catch(function (error) {
      alert(error);
    });
}

//=== ' delete job code ' ===//
function deleteJob(jobId) {
  // console.log(jobId);
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "multipart/form-data",
    authorization: `Bearer ${token}`,
  };

  axios
    .delete(`http://127.0.0.1:5000/api/jobs/${jobId}`, {
      headers: headers,
    })
    .then(function (response) {
      toast(
        "deleted job successfully",
        "linear-gradient(to right, #00b09b, #96c93d)"
      );

      window.location = "../profile.html";
    })
    .catch(function (error) {
      toast("deleted failed", "#ff0000");
      console.log(error);
    });
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
