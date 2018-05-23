// This section determines which information the user is to see
// Either Active Applications, or Inactive Applications
function viewActive() {
    sessionStorage.setItem("whichView", "Active");
    location.href = "/jobs.html";
}

function viewInactive() {
    sessionStorage.setItem("whichView", "Inactive");
    location.href = "/jobs.html";
}
