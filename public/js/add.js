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

$(function(){ 
    var userLoggedInId = "";
    var userLoggedInName = "";
    
    $.get("/api/user_data").then(function(data) {
      userLoggedInId = data.id;
      userLoggedInName = data.name;
    });

    /////**********FUNCTIONS**********/////

    // Submits new Job to the database
    function submitJob(newJob) {
        $.post("/api/jobs", newJob, function() { 
        });
        location.href = "/jobs.html";
    }
        
    /////**********EVENT LISTENERS**********/////
    
    $("#newJob").on("click", function(event) {
        event.preventDefault();
        var newDateApplied = $("#date_applied").val() || moment().format("L");
        var newJobName = $("#job_name").val().trim();
        var newCompany = $("#company").val().trim();
        var newLocation = $("#location").val().trim();
        var newDescription = $("#description").val().trim();
        var newIdNumber = $("#id_number").val().trim();
        var newLink = $("#link").val().trim();
        var newPostedFrom = $("#posted_from").val().trim();
        var newInterestLevel = $("input:radio[name=inlineRadioOptions]:checked").val();
        var newNotes = $("#notes").val();
        var userEntered = userLoggedInId;

        console.log("newDateApplied = " + newDateApplied);
        console.log($("#date_applied").val());



        //Check to make sure these fields are not empty
        if (!newDateApplied) {
            $(".alertUser").text("Please select a date.");
            return;
        } 
        if (!newJobName) {
            $(".alertUser").text("Please enter a job position.");
            return;
        } 
        if (!newCompany) {
            $(".alertUser").text("Please choose a company.");
            return;
        }
        if (!newLocation) {
            $(".alertUser").text("Please enter a location.");
            return;
        }
        

        //Create a new object to go into the database
        var newJob = {
            date_applied: newDateApplied,
            position: newJobName,
            company: newCompany,
            location: newLocation,
            description: newDescription,
            id_number: newIdNumber,
            link: newLink,
            posted_from: newPostedFrom,
            interest_level: newInterestLevel,
            notes: newNotes,
            status: "Active",
            status_response: "",
            UserId: userLoggedInId
        };
       
        //Capitalize the first letter after a space, and lowercase all others
        newJob.location = (newJob.location).toLowerCase().replace(/(^|\s)[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        //submitJob(newJob);
    });
}) 
