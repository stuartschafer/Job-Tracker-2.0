$(document).ready(function() {
    let objArray = {};
    let allStuff;
    let idResponse;
    let jobInfo = {};
    let activeApp = 0;
    let inactiveApp = 0;
    let movingForward = 0;
    let position = 0;
    let chaching = new Audio("assets/sounds/chaching.mp3");
    let sadtrombone = new Audio("assets/sounds/sadtrombone.mp3");
    let youCanDoIt = new Audio("assets/sounds/youcandoit.mp3");
    
    //Store current user data
    let userLoggedInId;
   
    // Store objects from DB
    let arrayofJobs = [];
    
    // To autopopulate the date field with the current date
    // For the Employer Response modal
    let loadedTime = moment.parseZone().utc().format("YYYY-MM-DD");
    $("#dateResponded").val(loadedTime);

    // Formatting function for row details
    function format (data) {
        if (data.link.includes("http") === false && data.link != "") {
            data.link = "https://" + data.link;
        }
        let jobDetails = "<div class='row'><div class='col-md-12'>";
        if (location_column === "hide") {
            jobDetails += "<h5>Location:   <span class='subsection'>" + data.location + "</span>";
        }
        if (posted_from_column === "hide") {
            // This only shows the posted_from is there is one
            if (data.posted_from != "") {
                jobDetails += "<h5>Posted From:   <span class='subsection'>" + data.posted_from + "</span>";
            }
        }
        if (id_column === "hide") {
            // This only shows the id number is there is one
            if (data.id_number != "") {
                jobDetails += "<h5>ID:   <span class='subsection'>" + data.id_number + "</span>";
            }
        }

        // This only shows a link if there is one
        if (data.link != "") {
            jobDetails += "<h5>Link:   <span class='subsection'><a id='linkSection' href='" + data.link + "' target='_blank'>" + data.link + "</a></span>";
        }

        if (data.status === "<- MOVING FORWARD ->") {
            data.status = "Moving Forward";
        }
        jobDetails += "<p><h5>Status:   <strong><span class='subsection'>" + data.status + "</span></strong></p>";

        // This only shows the notes if there are any
        if (data.notes != "") {
            jobDetails += "<h5>NOTES:   <span class='subsection'>" + data.notes + "</span>";
        }
        
        // This only shows the employer's responses if there are any
        if (data.status_response != "") {
            jobDetails += "<p><h5>RESPONSES FROM EMPLOYER:   <span class='subsection'>" + data.status_response + "</span></p></div>";
        }
        
        return jobDetails;
    }
    
   // Create the array of objects
    function createDataArray(data) {
        // Display the rows of data from the database into the table
        for (let i = 0; i < data.length; i++) {
            // Show the jobs of the user who is logged in
            if (userLoggedInId != data[i].UserId) {   
            } else {
                if (data[i].status === "Active") {
                    activeApp++;
                } else if (data[i].status === "Moving Forward") {
                    movingForward++;
                } else {
                    inactiveApp++;
                }
                // Empty the object each time the loop is run
                objArray = {};

                //objArray.date_applied = moment.parseZone(data[i].date_applied).utc().format("L");
                objArray.date_applied = moment.parseZone(data[i].date_applied).utc().format("MM/DD/YY");
                objArray.position = data[i].position;
                objArray.company = data[i].company;
                objArray.location = data[i].location;
                objArray.id_number = data[i].id_number;
                objArray.status = data[i].status;
                objArray.link = data[i].link;
                objArray.posted_from = data[i].posted_from;
                objArray.interest_level = "<span class='intLev'>" + data[i].interest_level + "<span>" || 0;
                objArray.notes = data[i].notes;
                objArray.status = data[i].status || "";
                objArray.status_response = data[i].status_response || "";
                if (data[i].status === "Active" || data[i].status === "Moving Forward") {
                    objArray.response = "<a href='#'><i id='responseMe' class='fas fa-lg fa-comment-dots center-td icons' value='" + data[i].id + "' data-toggle='modal' data-target='#responseModal'></i></a>";
                    objArray.edit = "<a href='#'><i id='updateMe' value='" + data[i].id + "' class='fa fa-edit fa-lg updateJob center-td icons' aria-hidden='true'></i></a>";
                } else {
                    objArray.response = "<a href='#'><i id='responseMe' class='fas fa-lg fa-comment-dots highlightGrey center-td icons' value='" + data[i].id + "' data-toggle='modal' data-target='#responseModal'></i></a>";
                    objArray.edit = "<a href='#'><i id='updateMe' value='" + data[i].id + "' class='fa fa-edit fa-lg updateJob highlightGrey center-td icons' aria-hidden='true'></i></a>";
                }
                
                if (objArray.status === "Moving Forward") {
                    objArray.status = "<- MOVING FORWARD ->";
                }
                
                arrayofJobs.push(objArray);
                allStuff = data;
            }
        }

        // Create the table on jobs.html page
        makeTable();
    }

    // Create the table and display on jobs page
    function makeTable() {
        let jobs = [];
        jobs = arrayofJobs;

        let tableOptions = {
            "data": jobs,
            "columns": [
                {
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ""
                },
                { "data": "date_applied" },
                { "data": "position" },
                { "data": "company" },
                { "data": "location" },
                { "data": "id_number" },
                { "data": "posted_from" },
                { "data": "interest_level" },
                { "data": "status" },
                { "data": "response" },
                { "data": "edit" },
            ],
            "order": [[ 8, 'asc' ], [ 7, 'desc' ]],
            "lengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            "createdRow": function ( row, data, index ) {
                
                for (var x=1; x<8; x++) {
                    // Changes the text to RED if the date is older than the set date AND if the job is Active
                    if ( new Date(data.date_applied) < new Date(oldDate) && (data.status === "Active" || data.status === "Moving Forward") ) {
                        $('td', row).eq(x).addClass('highlightRed');
                    } else if (data.status === "Inactive") {
                        $('td', row).eq(x).addClass('highlightGrey');
                    } else {
                        $('td', row).eq(x).addClass('highlightGreen');
                    }
                }
            },
            dom: 'f<"toolbar">lrtpBi',
            name: 'primary',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print', 'colvis', 'colvisRestore'
            ],
            colReorder: true,
            keys: true,
            // This here on down is for the row grouping (Active/Inactive)
            "columnDefs": [
                { "visible": false, "targets": 8 }
            ],
            "displayLength": 10,
            "drawCallback": function (settings) {
                var api = this.api();
                var rows = api.rows( {page:'current'} ).nodes();
                var last=null;
     
                api.column(8, {page:'current'} ).data().each( function ( group, i ) {
                    if ( last !== group ) {
                        $(rows).eq(i).before(
                            '<tr class="group"><td colspan="10">'+group+'</td></tr>'
                        );
                        last = group;
                    }
                });
            }
        };

        // This will show/hide columns based on the user's saved settings
        let columnsHidden = 0;
        if (posted_from_column === "hide") {
            $("#row_posted_from").remove();
            (tableOptions.columns).splice(6, 1);
            columnsHidden++;
        }
        if (id_column === "hide") {
            $("#row_id").remove();
            (tableOptions.columns).splice(5, 1);
            columnsHidden++;
        }
        if (location_column === "hide") {
            $("#row_location").remove();
            (tableOptions.columns).splice(4, 1);
            columnsHidden++;
        }

        tableOptions.order[0][0] = 8 - columnsHidden;
        tableOptions.order[1][0] = 7 - columnsHidden;
        tableOptions.columnDefs[0].targets = 8 - columnsHidden;

        tableOptions.drawCallback = function (settings) {
            var api = this.api();
            var rows = api.rows( {page:'current'} ).nodes();
            var last=null;
 
            api.column(8 - columnsHidden, {page:'current'} ).data().each( function ( group, i ) {
                if ( last !== group ) {
                    $(rows).eq(i).before(
                        '<tr class="group"><td colspan="10">'+group+'</td></tr>'
                    );
                    last = group;
                }
            });
        }

        // This chages the second sorting method (first is Active/Inactive) per the user's saved settings
        if (orderBy === "interest_level") {
            tableOptions.order[1][0] = 7 - columnsHidden;
        } else if (orderBy === "date") {
            tableOptions.order[1][0] = 1;
        }
        
        tableOptions.order[1][1] = sortBy;

        // This sets the default length to show per page per the user's saved setting
        tableOptions.displayLength = Number(displayLength);
       
        let table = $('#jobs').DataTable(tableOptions);

        // For the custom toolbar.  This displays the totals
        if (movingForward == 0) {
            $("div.toolbar").html('<span id="customToolbar">(' + activeApp + ' Active, ' + inactiveApp + ' Inactive)</span>');
            $("#customToolbar").css("padding-right", "24%");
        } else {
            $("div.toolbar").html('<span id="customToolbar">(' + movingForward + ' Moving Forward, ' + activeApp + ' Active, ' + inactiveApp + ' Inactive)</span>');
        }
        
        // This gropus rows together in sections depending if they are ACTIVE or INACTIVE
        $('#jobs tbody').on( 'click', 'tr.group', function () {
            var currentOrder = table.order()[0];
            if ( currentOrder[0] === (8 - columnsHidden) && currentOrder[1] === 'asc' ) {
                table.order( [ (8 - columnsHidden), 'desc' ] ).draw();
            }
            else {
                table.order( [ (8 - columnsHidden), 'asc' ] ).draw();
            }
        });

        // This runs each time the arrow is clicked.  It shows/hides more information
        $('#jobs tbody').on('click', 'td.details-control', function () {
            let tr = $(this).closest('tr');
            let row = table.row( tr );
    
            if (row.child.isShown()) {
                // This will close the open row
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // This will show more details about the row
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });
    }


    // Get the info of the job that was clicked and save to session storage for update
    $("#jobs").on("click", ".updateJob", function() {
        let id = $(this).attr('value');

        $.get("/api/get_one_job", {id: id}, editJob);

        function editJob(data) {
            sessionStorage.setItem("jobtoEdit", JSON.stringify(data));
            location.href = "/edit";
         }
    });

    // This is when the user clicks on the emplyer's response in the table
    $("#jobs").on("click", ".fa-comment-dots", function() {
        idResponse = $(this).attr('value');

        
        for (var x=0; x<allStuff.length; x++) {
            if (idResponse == allStuff[x].id) {
                $("#companyName").text(allStuff[x].company);
                $("#positionName").text(allStuff[x].position);
                position = x;
            }
        }
    });

    // When the user cliks the submit button after entering info for the employer's response
    $("#responseButton").on("click", function() {
        let status = $("input:radio[name=statusRadio]:checked").val();
        //let status_day = moment($("#dateResponded").val()).format("L") || moment().format("L");
        let status_day = moment($("#dateResponded").val()).format("MM/DD/YY") || moment().format("MM/DD/YY");
        let response = "";
        let goOn = "yes";
        $("#userError").text("");   
        let responseNotes = $("#responseNotes").val().trim() || "";

        // This checks to make sure the user makes 1 selection and not 0 or 2
        if (!$("#responseGoodOptions").val() && !$("#responseBadOptions").val()) {
            $("#userError").text("Please make a selection from the Good or Bad to proceed.");
            goOn = "no";
        }
        if ($("#responseGoodOptions").val() != "" && $("#responseBadOptions").val() != "") {
            $("#userError").text("Please choose only 1 option from either the Good or Bad.");
            goOn = "no";
        } else {
            response = $("#responseGoodOptions").val() || $("#responseBadOptions").val();
        }

        // If the user does not make a selection of Moving Forward, Active or Inactive
        if (status === undefined) {
            if ($("#responseGoodOptions").val() != "") {
                status = "Moving Forward";
            } else if ($("#responseBadOptions").val() != "") {
                status = "Inactive";
            } else {
                status = "Active";
            }
        }
        

        let status_response = "";
        let goodOrBad = "";
        // If there are notes, then this adds a dash between the notes and date
        if (goOn === "yes") {
            if ($("#responseGoodOptions").val() != "") {
                goodOrBad = "good";
            } else {
                goodOrBad = "bad";
            }

            sessionStorage.setItem("goodOrBad", goodOrBad);
       
            if (responseNotes != "") {
                responseNotes = " - " + responseNotes;
            }

            status_response = "<br>" + status_day + " - " + response + responseNotes;
            
            companyResponse = allStuff[position].status_response === undefined ? "" : allStuff[position].status_response;

            jobInfo = {
                id: idResponse,
                date_applied: allStuff[position].date_applied,
                position: allStuff[position].position,
                company: allStuff[position].company,
                location: allStuff[position].location,
                id_number: allStuff[position].id_number,
                link: allStuff[position].link,
                posted_from: allStuff[position].posted_from,
                interest_level: allStuff[position].interest_level,
                notes: allStuff[position].notes,
                status: status,
                status_response: status_response + companyResponse,
                UserId: userLoggedInId
            };
            
            $.ajax({
                method: "PUT",
                url: "/api/jobs",
                data: jobInfo
            });
            location.reload();
        }
    });

    // Delete row when the trashcan icon on a line is clicked
    //$("#jobs").on("click", ".deleteJob", function() {
        //console.log($(this).attr('value'));
        //let id = $(this).attr('value');
        //$.ajax({
            //method: "DELETE",
            //url: "/api/jobs/" + id
        //});
        //location.reload();
    //});

    /////**********ON PAGE LOAD**********/////
    // Get user data
    $.get("/api/user_data").then(function(data) {        
        let userSettings = JSON.parse(data.settings);
 
        // This plays the good or bad sound after the page is reloaded.
        let soundOption = sessionStorage.getItem("goodOrBad");
        if (soundOption === "good" && userSettings.sound === "on") {
            chaching.play();
        } else if (soundOption === "bad" && userSettings.sound === "on") {
            sadtrombone.play();
        } else if (soundOption === "new" && userSettings.sound === "on") {
            youCanDoIt.play();
        }
        sessionStorage.clear();

        // Number of days equal to or above this will display results in red
        let userDateDiff = userSettings.alert;
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - userDateDiff);
        let dd = currentDate.getDate();
        let mm = currentDate.getMonth() + 1;
        let y = currentDate.getFullYear();
        oldDate = mm + '/' + dd + '/' + y;

        userLoggedInId = data.id;
        userLoggedInName = data.name;
        userEmail = data.email;

        orderBy = userSettings.order_by;
        sortBy = userSettings.sort_by;
        displayLength = userSettings.display_length;

        // This is the name that will be displayed in the navbar
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
        
        id_column = userSettings.id_column;
        posted_from_column = userSettings.posted_from_column;
        location_column = userSettings.location_column;
        
    });

    // Get and display the jobs data
    $.get("/api/jobs", createDataArray);

    // This auto-populates the user's email when they click on the "Send Me an Email" button at the bottom of the page
    $("#sendEmail").on("click", function(event) {
        $("#userEmail").val(userEmail);
    });

});