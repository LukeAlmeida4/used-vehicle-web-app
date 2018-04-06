/*
Created by Luke Almeida
April 6th 2018

scriptJS that runs the functions for the used vehicle web application
Includes form validations

*/

//function to validate the add vehicle form
//rules are the internal notation for the form to follow server side, while message is intended for the user client side
function doValidate_frmUsedVehicle() {
    var form = $("#frmUsedVehicle");
    //validation goes here
    form.validate({
        rules: {
            txtSellerName: {
                required: true
            },
            txtAddress: {
                required: true
            },
            txtCity: {
                required: true
            },
            txtNumber: {
                required: true,
                phonenumber: true
            },
            txtEmail: {
                required: true,
                email: true,
            },
            txtMake: {
                required: true
            },
            txtModel: {
                required: true
            },
            txtYear: {
                required: true,
            }
        },
        messages: {
            txtSellerName: {
                required: "Seller Name is Required"
            },
            txtAddress: {
                required: "Address is required"
            },
            txtCity: {
                required: "City is required"
            },
            txtNumber: {
                required: "Number is required",
                phonenumber: "Number must be xxx-xxx-xxxx"
            },
            txtEmail: {
                required: "Email is required",
                email: "Enter a valid email address"
            },
            txtMake: {
                required: "City is required"
            },
            txtModel: {
                required: "Model is required"
            },
            txtYear: {
                required: "Year is required"
            }
        }
    });

    //--------------------
    return form.valid();
}

//custom validate method
jQuery.validator.addMethod("phonenumber",
    function (value, element) {
        return this.optional(element) || /^\d{3}-\d{3}-\d{4}$/.test(value);
    }, "Please enter a valid phone number");


//function to add a used vehicle to the table vehicle
function addUsedVehicle() {
    if (doValidate_frmUsedVehicle()) {
        console.info("Information entered is valid, ready to insert");
        //do stuff for inserting to table
        var sellerName = $("#txtSellerName").val();
        var address = $("#txtAddress").val();
        var city = $("#txtCity").val();
        var phoneNumber = $("#txtNumber").val();
        var emailAddress = $("#txtEmail").val();
        var make = $("#txtMake").val();
        var model = $("#txtModel").val();
        var year = $("#txtYear").val();

        var options = [sellerName, address, city, phoneNumber, emailAddress, make, model, year];

        Vehicle.insert(options);
        
        window.open(
          'jdpower.com/cars/' + make + '/' + model + '/' + year,
          '_blank' // <- This is what makes it open in a new window.
        );
    }

}

//function to show all used vehicles to the output div
function showAllVehicles() {
    
    function successSelectAll(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i]; // results.rows.item(i) also works

            console.info("sellerName: " + row['sellerName'] + " address: " + row['address'] + " city: " + row['city'] +
                "phoneNumber: " + row['phoneNumber'] + " emailAddress: " + row['emailAddress'] + " make: " + row['make'] +
                "model: " + row['model'] + " year: " + row['year']);

            htmlCode += "<li data-row-id=" + row['id'] +
                ">" +
                "<h1>Seller Name: " + row['sellerName'] + "</h1>" +
                "<h2>Address: " + row['address'] + "</h2>" +
                "<h2>City: " + row['city'] + "</h2>" +
                "<h2>Phone Number: " + + row['phoneNumber'] + "</h2>" +
                "<h2>Email Address: " + row['emailAddress'] + "</h2>" +
                "<h2>Make: " + row['make'] + "</h2>" +
                "<h2>Model: " + row['model'] + "</h2>" +
                "<h2>Year: " + row['year'] + "</h2>" +                
                "</li><hr>";
        }

        document.getElementById('output').innerHTML += htmlCode;

    }

    Vehicle.selectAll(successSelectAll);

}

function updateVehicle() {
        var sellerName = $("#txtSellerName").val();
        var address = $("#txtAddress").val();
        var city = $("#txtCity").val();
        var phoneNumber = $("#txtNumber").val();
        var emailAddress = $("#txtEmail").val();
        var make = $("#txtMake").val();
        var model = $("#txtModel").val();
        var year = $("#txtYear").val();

    var options = [sellerName, address, city, phoneNumber, emailAddress, make, model, year];

    Vehicle.update(options);
}
