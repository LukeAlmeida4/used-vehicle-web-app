/*
Created by Luke Almeida
April 6th 2018

globalJS that connects the front end components to the backend functions. Add vehicle, show vehicle, and update vehicle.
Includes initiation of DB

*/

function btnSubmit_click() {
    addUsedVehicle();
}

function showAll() {
    document.getElementById('output').innerHTML = " ";

    showAllVehicles();
}

function btnUpdate_click() {
    updateVehicle();
}

function init() {
    $("#btnSubmit").on("click", btnSubmit_click);
    $("#searchPage").on("pageshow", showAll)
}

function initDB() {
    console.info("Creating Database.");
    try {
        DB.createDatabase();
        if (db) {
            console.info("Creating tables ...");
            DB.createTables();
        }

    } catch (e) {
        console.error("Error: (Fatal) Error in initDB. Can not proceed");
    }


}

$(document).ready(function () {
    initDB();
    init();
});
