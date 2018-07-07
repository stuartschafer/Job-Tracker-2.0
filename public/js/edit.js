$(function() {
    let userLoggedInId = "";

    // This gets the id and name of the user
    $.get("/api/user_data").then(function(data) {
        userLoggedInId = data.id;
        userLoggedInName = data.name;
        userEmail = data.email;
        // This is the name that will be displayed in the navbar
        let userSettings = JSON.parse(data.settings);
        displayName = userSettings.name || data.name;
        $(".showNameJobs").text(displayName + "\'s");

        // This section will change the navbar area for longer names to be shown correctly
        if (displayName.length > 20 && displayName.length <= 25) {
            $(".midSection").css({"margin-left":"-5%", "width":"40%"});
        } else if (displayName.length > 25 && displayName.length <= 30) {
            $(".midSection").css({"margin-left":"-8%", "width":"43%"});
        } else if (displayName.length > 30) {
            $(".midSection").css({"margin-left":"-7%", "width":"42%", "font-size":"75%"});
        }
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

    // This is the 'Save Changes' button at the bottom of the page
    $("#editedJob").on("click", function(event) {
        event.preventDefault();

        let editedDateApplied = $("#date_applied").val() || moment().format("L");
        let editedJobName = $("#job_name").val().trim();
        let editedCompany = $("#company").val().trim();
        let editedLocation = $("#location").val().trim();
        let editedIdNumber = $("#id_number").val().trim();
        let editedLink = $("#link").val().trim() || "";
        let editedPostedFrom = $("#posted_from").val().trim();
        let editedInterestLevel = $("input:radio[name=inlineRadioOptions2]:checked").val();
        let editedNotes = $("#notes").val();
        let editedStatus = $("input:radio[name=statusRadios]:checked").val();
        let editedStatusResponse = $("#status_response").val().trim() || "";

        // This replaces all the line breaks with a <br> so it will display properly on the jobs.html page
        let editedStatusResponseView = editedStatusResponse.replace(/\n/g, "<br>");
        editedNotes = editedNotes.replace(/\n/g, "<br>");

        // To put a line break in the beginning as long as there is a response
        if (editedStatusResponseView != "") {
            editedStatusResponseView = "<br>" + editedStatusResponseView;
        }

        if (editedNotes != "") {
            editedNotes = "<br>" + editedNotes;
        }
        
        //Check to make sure these fields are not empty 
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
            date_applied: editedDateApplied,
            position: editedJobName,
            company: editedCompany,
            location: editedLocation,
            id_number: editedIdNumber,
            link: editedLink,
            posted_from: editedPostedFrom,
            interest_level: editedInterestLevel,
            notes: editedNotes,
            status: editedStatus,
            status_response: editedStatusResponseView,
            UserId: userLoggedInId
        };
       
        submitEditedJob(jobChanged)
    });

    /////**********ON PAGE LOAD**********/////

    //Pull the info from sessionstorage to display existing values in edit form
    let jobBeingEdited = JSON.parse(sessionStorage.getItem("jobtoEdit"));

    // This checks to make sure a job is loaded into sessionStorage.  If not, the user is redirected to the jobs page
    if (jobBeingEdited == null) {
        location.href = "/jobs.html";
    }

    // This empties out the job so the system will check to see if the user accessed this page without selecting a job to edit
    sessionStorage.clear();

    // This will just remove the first <br> tag at the beginning
    jobBeingEdited.status_response = jobBeingEdited.status_response.replace("<br>", "");
    jobBeingEdited.notes = jobBeingEdited.notes.replace("<br>", "");

    // This replaces all remaining <br> tags with a /n (line break) so it will display properly
    let status_response_view = jobBeingEdited.status_response.replace(/<br>/g, "\n");
    let notes_view = jobBeingEdited.notes.replace(/<br>/g, "\n");
    jobBeingEdited.notes = notes_view;

    // To autopopulate the date field
    let loadedTime = moment.parseZone(jobBeingEdited.date_applied).utc().format("YYYY-MM-DD");
   
    $("#date_applied").val(loadedTime);
    $("#job_name").val(jobBeingEdited.position);
    $("#company").val(jobBeingEdited.company);
    $("#location").val(jobBeingEdited.location);
    //$("#description").val(jobBeingEdited.description);
    $("#id_number").val(jobBeingEdited.id_number);
    $("#link").val(jobBeingEdited.link);
    $("#posted_from").val(jobBeingEdited.posted_from);

    if (jobBeingEdited.interest_level === null) {
        $("#interest_level_0").prop('checked', true);
    } else {
        $("#interest_level_" + jobBeingEdited.interest_level).prop('checked', true);
    }

    
    
    $("#notes").val(jobBeingEdited.notes);
    if (jobBeingEdited.status === "Moving Forward") {
        $("#status_MovingForward").prop('checked', true);
    } else {
        $("#status_" + jobBeingEdited.status).prop('checked', true);
    }
    
    $("#status_response").val(status_response_view);

    // This auto-populates the user's email when they click on the "Send Me an Email" button at the bottom of the page
    $("#sendEmail").on("click", function(event) {
        $("#userEmail").val(userEmail);
    });

});