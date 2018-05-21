// This section determines which information the user is to see
// Either Active Applications, or Inactive Applications
function viewActive() {
    sessionStorage.setItem("whichView", "Active");
    location.reload();
}

function viewInactive() {
    sessionStorage.setItem("whichView", "Inactive");
    location.reload();
}

let view = sessionStorage.getItem("whichView");

$(function() {
    if (view === "Active") {
        $("#whichView").text("Active");
    } else {
        $("#whichView").text("Inactive");
    }

    let showActiveorInactive = "";
    let objArray = {};
    let allStuff;
    let idResponse;
    let jobInfo = {};
    /////**********GLOBAL VARIABLES***********/////
    //Store current user data
    var userLoggedInId;
    // var userLoggedInName;
   
    //Store objects from DB
    var arrayofJobs = [];
    let arrayofInactiveJobs = [];   
    
    /////**********FUNCTIONS**********/////

    //Formatting function for row details //
    function format (data) {
        var jobDetails = "<div class='row'>";
        jobDetails += "<div class='col-md-12'><h5>Notes:   <span class='subsection'>" + data.notes + "</span>";
        jobDetails += "<h5>Link:   <span class='subsection'><a id='linkSection' href='https://" + data.link + "' target='_blank'>" + data.link + "</a></span>";
        jobDetails += "<p><h5>Status:   <strong><span id='statusSection' class='subsection'>" + data.status + "</span></strong></p>";
        jobDetails += "<p><h5>Responses:   <span class='subsection'>" + data.status_response + "</span></p></div>";
        //jobDetails += "<div class='col-md-6'>" + data.image + "</div></div>";
        return jobDetails;
    }
    
   //Create the array of objects
    function createDataArray(data) {
        //Display the rows of data from the database into the table
        for (var i = 0; i < data.length; i++) {
            //Show the inventory of the user who is logged in
            if (userLoggedInId != data[i].UserId) {   
            } else {
                //Empty the object each time the loop is run
                objArray = {};
                
                //Set the properties of the object
                objArray.date_applied = moment(data[i].date_applied).format("L");
                objArray.position = data[i].position;
                objArray.company = data[i].company;
                objArray.location = data[i].location;
                objArray.description = data[i].description;
                objArray.id_number = data[i].id_number;
                objArray.link = data[i].link;
                objArray.posted_from = data[i].posted_from;
                objArray.interest_level = data[i].interest_level;
                objArray.notes = data[i].notes;
                objArray.status = data[i].status;
                objArray.status_response = data[i].status_response || "";
                objArray.response = "<a href='#'><i class='fas fa-comment-dots center-td' value='" + data[i].id + "' data-toggle='modal' data-target='#responseModal'></i></a>";
                //objArray.rejection = "<a href='#'><i id='rejection' value='" + data[i].id + "' class='fa fa-user-slash fa-lg jobRejection center-td' aria-hidden='true'></i></a>";
                objArray.edit = "<a href='#'><i id='updateMe' value='" + data[i].id + "' class='fa fa-edit fa-lg updateJob center-td' aria-hidden='true'></i></a>";
                objArray.delete = "<a href='#'><i id='deleteMe' value='" + data[i].id + "' class='fa fa-trash-alt fa-lg deleteJob center-td' aria-hidden='true'></i></a>";

                if (view === "Active" && data[i].status === "Active") {
                    arrayofJobs.push(objArray);
                } else if (view === "Inactive" && data[i].status === "Inactive") {
                    arrayofInactiveJobs.push(objArray);
                }
                allStuff = data;
            }
        }
        // Create the table on inventory.html page
        makeTable();
    }

    //Create the table and display on inventory page
    function makeTable() {
        let jobs = [];
        if (view === "Active") {
            jobs = arrayofJobs;
        } else {
            jobs = arrayofInactiveJobs;
        }

        var table = $('#inventory').DataTable({
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
                { "data": "description" },
                { "data": "id_number" },
                { "data": "posted_from" },
                { "data": "interest_level" },
                { "data": "response" },
                { "data": "edit" },
                { "data": "delete" }
            ],
            "order": [[8, 'des']]
        });
        
        //Event listener for opening and closing job details
        $('#inventory tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            console.log(tr);
            var row = table.row( tr );
    
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
    $("#inventory").on("click", ".updateJob", function() {
        var id = $(this).attr('value');
        //console.log("id = " + id);

        $.get("/api/inventory", editJob);

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

    $("#inventory").on("click", ".fa-comment-dots", function() {
        idResponse = $(this).attr('value');
        
        //$("#responseDate").datepicker();
        
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
        let status_day = moment().format("L");
        let response = "";
        let goOn = "yes";
        $("#userError").text("");   
        let responseNotes = $("#responseNotes").val().trim() || "";

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
        
        // All jobs
        console.log(allStuff);
        // Specific id they clicked on
        console.log(idResponse);
        if (goOn === "yes") {
            if (responseNotes != "") {
                responseNotes = " - " + responseNotes;
            }

            for (var x=0; x<allStuff.length; x++) {
                if (allStuff[x].status_response === "") {
                    //status_response = "(" + status_day + ") - " + response + responseNotes + responseNotes + " || ";
                    status_response = "(" + status_day + ") - " + response + responseNotes + " &#9883; ";
                    companyResponse = "";
                } else {
                    //status_response = "(" + status_day + ") - " + response + responseNotes + " || ";
                    status_response = "(" + status_day + ") - " + response + responseNotes + " &#9883; ";
                    companyResponse = allStuff[x].status_response;
                }
                
                if (idResponse == allStuff[x].id) {
                    jobInfo = {
                        id: idResponse,
                        date_applied: allStuff[x].date_applied,
                        position: allStuff[x].position,
                        company: allStuff[x].company,
                        location: allStuff[x].location,
                        description: allStuff[x].description,
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
                url: "/api/inventory",
                data: jobInfo
            });
            location.reload();
        }
    });

     //Delete row when the trashcan icon on a line is clicked
    $("#inventory").on("click", ".deleteJob", function() {
        console.log($(this).attr('value'));
        var id = $(this).attr('value');
        $.ajax({
            method: "DELETE",
            url: "/api/inventory/" + id
        });
        location.reload();
    });

    /////**********ON PAGE LOAD**********/////
  //Get user data      
    $.get("/api/user_data").then(function(data) {
        userLoggedInId = data.id;
        userLoggedInName = data.name;
        //Display user name on page
        $(".showNameInventory").text(data.name + "\'s");
    });

    //Get and display inventory data
    $.get("/api/inventory", createDataArray);
});