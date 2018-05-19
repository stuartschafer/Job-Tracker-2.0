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
            url: "/api/inventory",
            data: jobChanged
        });
        //return user to inventory page
        location.href = "/inventory.html";
    }   

    /////**********EVENT LISTENERS**********/////

    $("#editedJob").on("click", function(event) {
        event.preventDefault();

        var editedDateApplied = $("#date_applied").val();
        var editedJobName = $("#job_name").val().trim();
        var editedCompany = $("#company").val().trim();
        var editedLocation = $("#location").val().trim();
        var editedDescription = $("#description").val().trim();
        var editedIdNumber = $("#id_number").val().trim();
        var editedLink = $("#link").val().trim();
        var editedPostedFrom = $("#posted_from").val().trim();

        var editedInterestLevel = $("input:radio[name=inlineRadioOptions2]:checked").val();
        var editedNotes = $("#notes").val();
        var userEntered = userLoggedInId;

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
        if (!editedDescription) {
            $(".alertUser").text("Please enter a job description.");
            return;
        }

        //Create a new object to go into the database
        var jobChanged = {
            id: jobBeingEdited.id,
            date_applied: editedDateApplied,
            position: editedJobName,
            company: editedCompany,
            location: editedLocation,
            description: editedDescription,
            id_number: editedIdNumber,
            link: editedLink,
            posted_from: editedPostedFrom,
            interest_level: editedInterestLevel,
            notes: editedNotes,
            UserId: userLoggedInId
        };
        //Capitalize the first letter after a space
        jobChanged.location = (jobChanged.location).toLowerCase().replace(/(^|\s)[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        submitEditedJob(jobChanged)
    });

    /////**********ON PAGE LOAD**********/////

    //Pull the info from sessionstorage to display existing values in edit form
    var jobBeingEdited = JSON.parse(sessionStorage.getItem("jobtoEdit"));
    console.log(jobBeingEdited);

    $("#date_applied").val(moment(jobBeingEdited.date_applied).format("YYYY-MM-DD"));
    $("#job_name").val(jobBeingEdited.position);
    $("#company").val(jobBeingEdited.company);
    $("#location").val(jobBeingEdited.location);
    $("#description").val(jobBeingEdited.description);
    $("#id_number").val(jobBeingEdited.id_number);
    $("#link").val(jobBeingEdited.link);
    $("#posted_from").val(jobBeingEdited.posted_from);
    $("#interest_level_" + jobBeingEdited.interest_level).prop('checked', true);
    $("#notes").val(jobBeingEdited.notes);
});