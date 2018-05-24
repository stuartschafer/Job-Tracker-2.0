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

$(function() {
    var userLoggedInId = "";
    // This gets the id and name of the user
    $.get("/api/user_data").then(function(data) {
      userLoggedInId = data.id;
      userLoggedInName = data.name;
    });;

    /////**********FUNCTIONS**********/////

    //Update the post to the database
    function submitEditedJob(jobChanged) { 
        //console.log(jobChanged.UserId);
        $.ajax({
            method: "PUT",
            url: "/api/jobs",
            data: jobChanged
        });
        //return user to the jobs page
        location.href = "/jobs.html";
    }   

    /////**********EVENT LISTENERS**********/////

    $("#editedJob").on("click", function(event) {
        event.preventDefault();

        let editedDateApplied = $("#date_applied").val();
        let editedJobName = $("#job_name").val().trim();
        let editedCompany = $("#company").val().trim();
        let editedLocation = $("#location").val().trim();
        let editedDescription = $("#description").val().trim();
        let editedIdNumber = $("#id_number").val().trim();
        let editedLink = $("#link").val().trim();
        let editedPostedFrom = $("#posted_from").val().trim();
        let editedInterestLevel = $("input:radio[name=inlineRadioOptions2]:checked").val();
        let editedNotes = $("#notes").val();
        let editedStatus = $("input:radio[name=statusRadios]:checked").val();
        let editedStatusResponse = $("#status_response").val().trim() || "";

        // This converts the boring characters to the special ASCII characters
        let editedStatusResponseView = editedStatusResponse.replace(/---/g, "&#9883;");
        //editedStatusResponseView = editedStatusResponse.replace(/&#58;&#41;/g, "&#9786;");
        //editedStatusResponseView2 = editedStatusResponse.replace(/&#58;&#40;/g, "&#9785;");
       
        // Changes the format so it will be put into SQL in the correct format
        let editedAgainDateApplied = editedDateApplied[5] + editedDateApplied[6] + "-" + editedDateApplied[8] + editedDateApplied[9] + "-" + editedDateApplied[0] + editedDateApplied[1] + editedDateApplied[2] + editedDateApplied[3];

        
        let userEntered = userLoggedInId;

        //Check to make sure these fields are not empty
        if (!editedDateApplied) {
            $(".alertUser").text("Please select a date.");
            return;
        } 
        if (!editedJobName) {
            $(".alertUser").text("Please enter a job position.");
            return;
        } 
        if (!editedCompany) {
            $(".alertUser").text("Please choose a company.");
            return;
        }
        if (!editedLocation) {
            $(".alertUser").text("Please enter a location.");
            return;
        }


        //Create a new object to go into the database
        var jobChanged = {
            id: jobBeingEdited.id,
            date_applied: editedAgainDateApplied,
            position: editedJobName,
            company: editedCompany,
            location: editedLocation,
            description: editedDescription,
            id_number: editedIdNumber,
            link: editedLink,
            posted_from: editedPostedFrom,
            interest_level: editedInterestLevel,
            notes: editedNotes,
            status: editedStatus,
            status_response: editedStatusResponseView,
            UserId: userLoggedInId
        };
        //Capitalize the first letter after a space
        jobChanged.position = (jobChanged.position).toLowerCase().replace(/(^|\s)[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        submitEditedJob(jobChanged)
    });

    /////**********ON PAGE LOAD**********/////

    //Pull the info from sessionstorage to display existing values in edit form
    var jobBeingEdited = JSON.parse(sessionStorage.getItem("jobtoEdit"));
    
    // This is to replce the special ASCII characters that displays weird
    let status_response_view = jobBeingEdited.status_response.replace(/&#9883;/g, " --- ");
    //status_response_view = status_response_view.replace(/&#9786;/g, " :) ");
    //status_response_view = status_response_view.replace(/&#9785;/g, " :( ");

    $("#date_applied").val(moment(jobBeingEdited.date_applied).format("L"));
    $("#job_name").val(jobBeingEdited.position);
    $("#company").val(jobBeingEdited.company);
    $("#location").val(jobBeingEdited.location);
    $("#description").val(jobBeingEdited.description);
    $("#id_number").val(jobBeingEdited.id_number);
    $("#link").val(jobBeingEdited.link);
    $("#posted_from").val(jobBeingEdited.posted_from);

    if (jobBeingEdited.interest_level === null) {
        $("#interest_level_0").prop('checked', true);
    } else {
        $("#interest_level_" + jobBeingEdited.interest_level).prop('checked', true);
    }
    
    $("#notes").val(jobBeingEdited.notes);
    $("#status_" + jobBeingEdited.status).prop('checked', true);
    $("#status_response").val(status_response_view);
});