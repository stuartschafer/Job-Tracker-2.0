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

        var newDateApplied = $("#date_applied").val();
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
        if (!newDescription) {
            $(".alertUser").text("Please enter a job description.");
            return;
        }

        //Create a new object to go into the database
        var jobChanged = {
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
    $("#position").val(jobBeingEdited.position);
    $("#company").val(jobBeingEdited.company);
    $("#location").val(jobBeingEdited.location);
    $("#description").val(jobBeingEdited.description);
    $("#id_number").val(jobBeingEdited.id_number);
    $("#link").val(jobBeingEdited.link);
    $("#posted_from").val(jobBeingEdited.posted_from);
    //$("input:radio[name=inlineRadioOptions]:checked").val(jobBeingEdited.);
    $("#notes").val(jobBeingEdited.notes);
});