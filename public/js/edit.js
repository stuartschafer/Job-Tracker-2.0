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
       
        var editedJobName = $("#job_name").val().trim();
        var editedLocation = $("#location").val().trim();
        var editedCategory = $("#category").val();

        //A value has to be entered or server will crash
        var editedValue = $("#value").val() || 0;  
        //A value has to be entered or server will crash
        var editedDatePurchased = $("#date_purchased").val() || "2049-12-31";
        //A value has to be entered or server will crash
        var editedPurchasePrice = $("#purchase_price").val().trim() || 0;
        var editedSerialNumber = $("#serial_number").val().trim();
        var editedImage = $("#image").val().trim();
        var editedNotes = $("#loadNotes").val().trim();

        //Check to make sure these fields are not empty
        if (!editdJobName) {
            $(".alertUser").text("Please enter a job posting.");
            return;
        } 
         if (!editedLocation) {
            $(".alertUser").text("Please enter a location.");
            return;
        }
         if (editedCategory === "Category") {
            $(".alertUser").text("Please choose a category.");
            return;
        }

        //Create a new object to go into the database
        var jobChanged = {
            id: jobBeingEdited.id,
            job_name: editedJobName,
            location: editedLocation,
            category: editedCategory,
            value: editedValue,
            date_purchased: editedDatePurchased,
            purchase_price: editedPurchasePrice,
            serial_number: editedSerialNumber,
            image: editedImage,
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
    var jobBeingEdited = JSON.parse(sessionStorage.getJob("jobtoEdit"));
    console.log(jobBeingEdited);

    $("#job_name").val(jobBeingEdited.job_name);
    $("#location").val(jobBeingEdited.location);
    $("#category").val(jobBeingEdited.category);
    $("#value").val(jobBeingEdited.value);
    $("#date_purchased").val(moment(jobBeingEdited.date_purchased).format("YYYY-MM-DD"));
    $("#purchase_price").val(jobBeingEdited.purchase_price);
    $("#serial_number").val(jobBeingEdited.serial_number);
    $("#image").val(jobBeingEdited.image);
    $("#loadNotes").val(jobBeingEdited.notes);
});