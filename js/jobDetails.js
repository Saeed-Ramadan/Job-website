//===' job details fetch '===//


  const jobDetailsContainer = document.getElementById("body-details");
  const modelHeader = document.getElementById("modal-header");

  const applyDiv = document.getElementById("applyDiv")
  //to det an save the params that is in the postDetails url
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get("jobId")
//   console.log(id);
//   console.log(window.location.search);

function getJob() {
    axios.get(`${baseUrl}/${id}`)
    .then((response) => {
        const job = response.data.data;
        modelHeader.innerHTML = `<h1 class="modal-title fs-5" id="title">Job name : ${job.title}</h1>`;
      applyDiv.innerHTML = `<a href = "mailto: ${job.company_email}" class="btn btn-success" >ApplyNow</a>`
        jobDetailsContainer.innerHTML = `
<div class="body-details-left">

  <div class="details-description">
    <h5>job description</h5>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the majority have
      suffered alteration in some form, by injected humour, or randomised words which don't look
      even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
      sure there isn't anything embarrassing.<br /><br />
      Variations of passages of lorem Ipsum available, but the majority have suffered alteration
      in some form, by injected humour, or randomised words which don't look even slightly
      believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there
      isn't anything embarrassing.
    </p>
    <h5>Responsibility</h4>
      <p>
      ${job.description}
      </p>
  </div>

  <div class="details-apply-jop">
    <h3>Apply for the job</h3>
    <p>Send your CV to our email at: <b>${job.company_email}</b></p>
  </div>

</div>
<div class="body-details-right">
  <div class="details-summary-header">
    <h4>Job summary</h4>
  </div>
  <div class="details-summary-body">
    <ul>
      <li>Published on: ${job.created_at}</li>
      <li>salary: ${job.salary}</li>
      <li>location: ${job.location}</li>
      <li>job nature: Full time</li>
    </ul>
  </div>
</div>
</div>`

    })
}
getJob()




