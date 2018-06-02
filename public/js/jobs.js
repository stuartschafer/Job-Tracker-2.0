$( document ).ready(function() {
    /////**********GLOBAL VARIABLES***********/////

    // And number of days equal to or above this will display results in red
    let userDateDiff = 28;
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - userDateDiff);
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth() + 1;
    let y = currentDate.getFullYear();
    let oldDate = mm + '/' + dd + '/' + y;

    let objArray = {};
    let allStuff;
    let idResponse;
    let jobInfo = {};
    let activeApp = 0;
    let inactiveApp = 0;
    
    //Store current user data
    let userLoggedInId;
   
    //Store objects from DB
    let arrayofJobs = [];
    let sortedArrayofJobs = [];
    
    // To autopopulate the date field with the current date
    //For the Employer Response modal
    let loadedTime = moment.parseZone().utc().format("YYYY-MM-DD");
    $("#dateResponded").val(loadedTime);
    
    /////**********FUNCTIONS**********/////

    //Formatting function for row details //
    function format (data) {
        if (data.link.includes("http") === false && data.link != "") {
            data.link = "https://" + data.link;
        }
        let jobDetails = "<div class='row'>";
        jobDetails += "<div class='col-md-12'><h5>Notes:   <span class='subsection'>" + data.notes + "</span>";
        jobDetails += "<h5>Link:   <span class='subsection'><a id='linkSection' href='" + data.link + "' target='_blank'>" + data.link + "</a></span>";
        jobDetails += "<p><h5>Status:   <strong><span class='subsection'>" + data.status + "</span></strong></p>";
        jobDetails += "<p><h5>Responses from Employer:   <span class='subsection'>" + data.status_response + "</span></p></div>";
        return jobDetails;
    }
    
   //Create the array of objects
    function createDataArray(data) {
        console.log(data);
        //Display the rows of data from the database into the table
        for (let i = 0; i < data.length; i++) {
            //Show the jobs of the user who is logged in
            if (userLoggedInId != data[i].UserId) {   
            } else {
                if (data[i].status === "Active") {
                    activeApp++;
                } else {
                    inactiveApp++;
                }
                //Empty the object each time the loop is run
                objArray = {};

                objArray.date_applied = moment.parseZone(data[i].date_applied).utc().format("L");
                objArray.position = data[i].position;
                objArray.company = data[i].company;
                objArray.location = data[i].location;
                objArray.id_number = data[i].id_number;
                objArray.status = data[i].status;
                objArray.link = data[i].link;
                objArray.posted_from = data[i].posted_from;
                objArray.interest_level = data[i].interest_level || 0;
                objArray.notes = data[i].notes;
                objArray.status = data[i].status || "";
                objArray.status_response = data[i].status_response || "";
                objArray.response = "<a href='#'><i id='responseMe' class='fas fa-lg fa-comment-dots center-td icons' value='" + data[i].id + "' data-toggle='modal' data-target='#responseModal'></i></a>";
                objArray.edit = "<a href='#'><i id='updateMe' value='" + data[i].id + "' class='fa fa-edit fa-lg updateJob center-td icons' aria-hidden='true'></i></a>";
                
                arrayofJobs.push(objArray);
                allStuff = data;
            }
        }

        // This sorts the array based on highest interest level (asecending)
        sortedArrayofJobs = arrayofJobs.sort(function(obj1, obj2) {return obj2.interest_level - obj1.interest_level});

        //Changes characteristics of the array
        for (var x=0; x<sortedArrayofJobs.length; x++) {
            sortedArrayofJobs[x].interest_level = "<span class='intLev'>" + sortedArrayofJobs[x].interest_level + "<span>" || 0;
            sortedArrayofJobs[x].status = (sortedArrayofJobs[x].status).toUpperCase();
        }

        // Create the table on jobs.html page
        makeTable();
    }

    //Create the table and display on jobs page
    function makeTable() {
        let jobs = [];
        jobs = sortedArrayofJobs;

        let table = $('#jobs').DataTable({
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
                //{ "data": "delete" }
            ],
            "order": [[8, 'asc']],
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            "createdRow": function ( row, data, index ) {
                // Changes the text to RED if the date is older than the set date
                if ( new Date(data.date_applied) < new Date(oldDate) ) {
                    $('td', row).eq(1).addClass('highlightRed');
                    $('td', row).eq(2).addClass('highlightRed');
                    $('td', row).eq(3).addClass('highlightRed');
                    $('td', row).eq(4).addClass('highlightRed');
                    $('td', row).eq(5).addClass('highlightRed');
                    $('td', row).eq(6).addClass('highlightRed');
                    $('td', row).eq(7).addClass('highlightRed');
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
            "displayLength": 25,
            "drawCallback": function ( settings ) {
                var api = this.api();
                var rows = api.rows( {page:'current'} ).nodes();
                var last=null;
     
                api.column(8, {page:'current'} ).data().each( function ( group, i ) {
                    if ( last !== group ) {
                        $(rows).eq( i ).before(
                            '<tr class="group"><td colspan="10">'+group+'</td></tr>'
                        );
                        last = group;
                    }
                } );
            }
        });

        // For the custom toolbar.  This displays the totals
        $("div.toolbar").html('<span id="customToolbar">(' + activeApp + ' Active, ' + inactiveApp + ' Inactive)</span>');

        // This gropus rows together in sections depending if they are ACTIVE or INACTIVE
        $('#jobs tbody').on( 'click', 'tr.group', function () {
            var currentOrder = table.order()[0];
            if ( currentOrder[0] === 8 && currentOrder[1] === 'asc' ) {
                table.order( [ 8, 'desc' ] ).draw();
            }
            else {
                table.order( [ 8, 'asc' ] ).draw();
            }
        });

        //Event listener for opening and closing job details
        $('#jobs tbody').on('click', 'td.details-control', function () {
            let tr = $(this).closest('tr');
            //console.log(tr);
            let row = table.row( tr );
    
            if (row.child.isShown()) {
                //Close open row
                row.child.hide();
                tr.removeClass('shown');
            } else {
                //Open closed row
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        });
    }

    /////**********EVENT LISTENERS**********/////

    // Get the info of the job that was clicked and save to session storage for update
    $("#jobs").on("click", ".updateJob", function() {
        let id = $(this).attr('value');
        //console.log("id = " + id);

        $.get("/api/jobs", editJob);

        function editJob(data) {
            for (var x=0; x<data.length; x++) {
                if (data[x].id == id) {
                    sessionStorage.setItem("jobtoEdit", JSON.stringify(data[x]));
                }
            }
            gotoEditPage();
         }
        
        function gotoEditPage() {
        location.href = "/edit";
        }
    });

    $("#jobs").on("click", ".fa-comment-dots", function() {
        idResponse = $(this).attr('value');
        
        for (var x=0; x<allStuff.length; x++) {
            if (idResponse == allStuff[x].id) {
                $("#companyName").text(allStuff[x].company);
                $("#positionName").text(allStuff[x].position);
            }
        }
    });

    $("#responseButton").on("click", function() {
        let id = $(".fa-comment-dots").attr('value');
        let addResponseNews = "";
        let status = $("input:radio[name=statusRadio]:checked").val();
        let status_day = moment($("#dateResponded").val()).format("L") || moment().format("L");
        let response = "";
        let goOn = "yes";
        $("#userError").text("");   
        let responseNotes = $("#responseNotes").val().trim() || "";

        //This checks to make sure the user makes 1 selection and not 0 or 2
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

        let status_response = "";
        
        // If there are notes, then this adds a dash between the notes and date
        if (goOn === "yes") {
            if (responseNotes != "") {
                responseNotes = " - " + responseNotes;
            }

            for (var x=0; x<allStuff.length; x++) {
                if (allStuff[x].status_response === "") {
                    status_response = "(" + status_day + ") - " + response + responseNotes + " &#9883; ";
                    companyResponse = "";
                } else {
                    status_response = "(" + status_day + ") - " + response + responseNotes + " &#9883; ";
                    companyResponse = allStuff[x].status_response;
                }
                
                // This will only show the user's jobs
                if (idResponse == allStuff[x].id) {
                    jobInfo = {
                        id: idResponse,
                        date_applied: allStuff[x].date_applied,
                        position: allStuff[x].position,
                        company: allStuff[x].company,
                        location: allStuff[x].location,
                        id_number: allStuff[x].id_number,
                        link: allStuff[x].link,
                        posted_from: allStuff[x].posted_from,
                        interest_level: allStuff[x].interest_level,
                        notes: allStuff[x].notes,
                        status: status,
                        status_response: status_response + companyResponse,
                        UserId: userLoggedInId
                    };
                }
            }
           
            $.ajax({
                method: "PUT",
                url: "/api/jobs",
                data: jobInfo
            });
            location.reload();
        }
    });

    //Delete row when the trashcan icon on a line is clicked
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
  //Get user data      
    $.get("/api/user_data").then(function(data) {
        userLoggedInId = data.id;
        userLoggedInName = data.name;
        //Display user name on page
        $(".showNameJobs").text(data.name + "\'s");
    });

    //Get and display the jobs data
    $.get("/api/jobs", createDataArray);

});