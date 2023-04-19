// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

const API_ROOT = "http://127.0.0.1:5000/api";
const form = document.getElementById("job-create");
form.addEventListener("submit", async (e) => {
  // console.log(e);
  e.preventDefault();

  const logo = document.getElementById("formFile").files[0];
//   console.log(logo);

  const formData = new FormData(form);
  // console.log(formData.get("job_title"));
  const data = Object.fromEntries(formData);
  //   console.log(data);

  const logoFormData = new FormData(form);
  logoFormData.set("file", logo);



  const resLogo = await fetch("http://127.0.0.1:5000/api/upload", {
    method: "POST",

    body:  logoFormData ,
  })
  .then(response => response.json())
  .then(data => {
    return data.path;
  })

  const res = await fetch(`${API_ROOT}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      company_email: formData.get("company_email"),
      company_logo: resLogo,
      company_name: formData.get("company_name"),
      created_at: formData.get("created_date"),
      description: formData.get("description"),
      id: 4,
      location: formData.get("location"),
      salary: formData.get("salary"),
      title: formData.get("job_title"),
      type: 1,
      vacancy: 3,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);

        redirect('../index.html');
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

//to redirect to home page

function redirect(url) {
  "use strict";
  if (url !== "") {
    window.location = url;
  }
}
