$( document ).ready(function() {
    event.preventDefault();
    // To autopopulate the date field with the current date
    let loadedTime = moment.parseZone().utc().format("YYYY-MM-DD");
    $("#date_applied").val(loadedTime);

    let userLoggedInId = "";
    let userLoggedInName = "";
    
    $.get("/api/user_data").then(function(data) {
        userLoggedInId = data.id;
        userLoggedInName = data.name;

        // This is the name that will be displayed in the navbar
        let userSettings = JSON.parse(data.settings);
        if (userSettings === null) {
            displayName = data.name;
        } else {
            displayName = userSettings.name;
        }

        $(".showNameJobs").text(displayName + "\'s");

        // This section will change the navbar area for longer names to be shown correctly
        if (displayName.length > 20 && displayName.length <= 25) {
            $(".midSection").css({"margin-left":"-5%", "width":"40%"});
        } else if (displayName.length > 25 && displayName.length <= 30) {
            $(".midSection").css({"margin-left":"-8%", "width":"43%"});
        } else if (displayName.length > 30) {
            $(".midSection").css({"margin-left":"-7%", "width":"42%", "font-size":"75%"});
        }

    });

    /////**********FUNCTIONS**********/////

    // Submits new Job to the database
    function submitJob(newJob) {
        $.post("/api/jobs", newJob, function() { 
        });
        location.href = "/jobs.html";
    }
        
    /////**********EVENT LISTENERS**********/////
    
    $("#submitNewJob").on("click", function(event) {
        let newDateApplied = $("#date_applied").val() || moment().format("L");
        let newJobName = $("#job_name").val().trim();
        let newCompany = $("#company").val().trim();
        let newLocation = $("#location").val().trim();
        let newIdNumber = $("#id_number").val().trim();
        let newLink = $("#link").val().trim() || "";
        let newPostedFrom = $("#posted_from").val().trim();
        let newInterestLevel = $("input:radio[name=inlineRadioOptions]:checked").val() || "0";
        let newNotes = $("#notes").val();

        // Changes the format so it will be put into SQL in the correct format
        //let newerDateApplied = editedDateApplied[5] + editedDateApplied[6] + "-" + editedDateApplied[8] + editedDateApplied[9] + "-" + editedDateApplied[0] + editedDateApplied[1] + editedDateApplied[2] + editedDateApplied[3];

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
        let newJob = {
            date_applied: newDateApplied,
            position: newJobName,
            company: newCompany,
            location: newLocation,
            id_number: newIdNumber,
            link: newLink,
            posted_from: newPostedFrom,
            interest_level: newInterestLevel,
            notes: newNotes,
            status: "Active",
            status_response: "",
            UserId: userLoggedInId
        };

        sessionStorage.setItem("goodOrBad", "new");
       
        //Capitalize the first letter after a space, and lowercase all others
        newJob.position = (newJob.position).toLowerCase().replace(/(^|\s)[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });
        submitJob(newJob);
    });
}) 
