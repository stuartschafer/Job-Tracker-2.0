$( document ).ready(function() {
    let userName;
    let userEmail;
    let userID;

    $.get("/api/user_data").then(function(data) {
        userName = data.name;
        userEmail = data.email;
        userInfo = {
            id: data.id
        }

        userID = data.id;

        readFromDB(data, userName);

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

    
    function readFromDB(data, userName) {
        let readSettings = JSON.parse(data.settings);

        // This loads the presets into the form
        if (readSettings.sound === "on") {
            $("#soundOn").prop('checked', true);
        } else {
            $("#soundOff").prop('checked', true);
        }

        $("#overdueAlert").val(readSettings.alert);

        if (readSettings.order_by === "date") {
            $("#orderbyDate").prop('checked', true);
        } else {
            $("#orderbyInterestLevel").prop('checked', true);
        }

        if (readSettings.sort_by === "asc") {
            $("#ascending").prop('checked', true);
        } else {
            $("#descending").prop('checked', true);
        }

        $("#defaultDisplay").val(readSettings.display_length);

        if (readSettings.id_column === "display") {
            $("#displayIDColumn").prop('checked', true);
        } else {
            $("#hideIDColumn").prop('checked', true);
        }
        
        if (readSettings.posted_from_column === "display") {
            $("#displayPostedFromColumn").prop('checked', true);
        } else {
            $("#hidePostedFromColumn").prop('checked', true);
        }

        if (readSettings.location_column === "display") {
            $("#displayLocationColumn").prop('checked', true);
        } else {
            $("#hideLocationColumn").prop('checked', true);
        }
        $("#displayedName").val(readSettings.name);
    }

    // This will get all the settings the user saves when they click the Save Changes button
    $("#saveSettings").on("click", function(event) {
        let savedSound = $("input:radio[name=soundSetting]:checked").val();
        let savedAlert = $("#overdueAlert").val() || 28;
        let savedOrderBy = $("input:radio[name=orderBySection]:checked").val();
        let savedSortBy = $("input:radio[name=sortBySection]:checked").val();
        let savedDisplayLength =  $("#defaultDisplay").val() || 10;
        let savedIDCol = $("input:radio[name=IDColumnVisibility]:checked").val();
        let savedPostedFromCol = $("input:radio[name=postedFromColumnVisibility]:checked").val();
        let savedLoactionCol = $("input:radio[name=locationColumnVisibility]:checked").val();
        let savedName = $("#displayedName").val() || userName;

        if (savedAlert < 1) {
            savedAlert = 1;
        }

        let newSettings = {};
            newSettings.sound = savedSound;
            newSettings.alert = savedAlert;
            newSettings.order_by = savedOrderBy;
            newSettings.sort_by = savedSortBy;
            newSettings.display_length = savedDisplayLength;
            newSettings.id_column = savedIDCol;
            newSettings.posted_from_column = savedPostedFromCol;
            newSettings.location_column = savedLoactionCol;
            newSettings.name = savedName;

        let convertedNewSettings = JSON.stringify(newSettings);

        let savedSettings = {
            id: userID,
            settings: convertedNewSettings
        } 

        // This saves the settings to the database
        $.ajax({
            method: "PUT",
            url: "/api/user",
            data: savedSettings
        });
        
        location.href = "/jobs.html";
    });

    // This auto-populates the user's email when they click on the "Send Me an Email" button at the bottom of the page
    $("#sendEmail").on("click", function(event) {
        $("#userEmail").val(userEmail);
    });
    
});