$(function() {
    
    /////**********GLOBAL VARIABLES***********/////
    //Store current user data
    var userLoggedInId;
    // var userLoggedInName;
   
    //Store objects from DB
    var arrayofJobs = [];   
    
    /////**********FUNCTIONS**********/////

    //Formatting function for row details //
    function format (data) {
        var jobDetails = "<div class='row'>";
        jobDetails += "<div class='col-md-12'><h5>Notes:   <span class='subsection'>" + data.notes + "</span></div>";
        jobDetails += "<div class='col-md-12'><h5>Link:   <span class='subsection'>" + data.link + "</span></div>";
        jobDetails += "<div class='col-md-12'><h5>Posted From:   <span class='subsection'>" + data.posted_from + "</span></div>";
        //jobDetails += "<div class='col-md-6'>" + data.image + "</div></div>";
        return jobDetails;
    }
    
   //Create the array of objects
    function createDataArray(data) {
        console.log("DATA...");
        console.log(data);
        //Display the rows of data from the database into the table
        for (var i = 0; i < data.length; i++) {
            //Show the inventory of the user who is logged in
            if (userLoggedInId != data[i].UserId) {   
            } else {
                //Empty the object each time the loop is run
                var objArray = {};
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
                objArray.response = "<i id='rejection' value='" + i + "' class='fa fa-comment-alt fa-lg jobResponse center-td' aria-hidden='true'></i>";
                objArray.rejection = "<a href='#'><i id='jobRejection' value='" + data[i].id + "' class='fa fa-user-slash fa-lg deleteJob center-td' aria-hidden='true'></i></a>";
                objArray.edit = "<i id='updateMe' value='" + i + "' class='fa fa-edit fa-lg updateJob center-td' aria-hidden='true'></i>";
                objArray.delete = "<a href='#'><i id='deleteMe' value='" + data[i].id + "' class='fa fa-trash-alt fa-lg deleteJob center-td' aria-hidden='true'></i></a>";
                
                arrayofJobs.push(objArray);
            }
        }
        // Create the table on inventory.html page
        makeTable();
    }

    //Create the table and display on inventory page
    function makeTable() {
        console.log("ARRAYOFJOBSS...");
        console.log(arrayofJobs);
        var table = $('#inventory').DataTable({
            "data": arrayofJobs,
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
                //{ "data": "link" },
                { "data": "posted_from" },
                { "data": "interest_level" },
                //{ "data": "notes" },
                { "data": "response" },
                { "data": "rejection" },
                { "data": "edit" },
                { "data": "delete" }
            ],
            "order": [[2, 'asc']]
        });
        
        //Event listener for opening and closing job details
        $('#inventory tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
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

        $.get("/api/inventory", editJob);

        function editJob(data) {
            sessionStorage.setJob("jobtoEdit", JSON.stringify(data[id]));
            gotoEditPage();
         }
        
        function gotoEditPage() {
            location.href = "/edit";
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