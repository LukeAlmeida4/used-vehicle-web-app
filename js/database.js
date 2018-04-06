/*
Created by Luke Almeida
April 6th 2018

databaseJS that opens the database and creates the vehicle table to store the data
Includes drop tables

*/


var db;


function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ") -- " + error.message);
}
function successTransaction() {
    console.info("Success: Transaction is successful");
}

var DB = {
    createDatabase: function(){
        var shortName = "VehicleDB";
        var version = "1.0";
        var displayName = "DB for used vehicle app";
        var dbSize = 2 * 1024 * 1024;


        console.info("Creating database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database creation successful.");
        }
    },
    createTables: function (){

        function successCreate() {
            console.info("Success: Table created successfully");
        }

        function txFunction(tx) {
            var options = [];
            console.info("Creating table: vehicle ...");
            var sql = "CREATE TABLE IF NOT EXISTS vehicle(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "sellerName VARCHAR(20) NOT NULL," +
                "address VARCHAR(20) NOT NULL," +
                "city VARCHAR(20) NOT NULL," +
                "phoneNumber VARCHAR(20) NOT NULL," +
                "emailAddress VARCHAR(20) NOT NULL," +
                "make VARCHAR(20) NOT NULL," +
                "model VARCHAR(20) NOT NULL," +
                "year VARCHAR(20) NOT NULL);";
            tx.executeSql(sql,options,successCreate,errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    dropTables: function(){

        function successDrop() {
            console.info("Success: Dropping table successful");
        }
        function txFunction(tx) {
            var options = [];
            console.info("Dropping table: vehicle");
            var sql = "DROP TABLE IF EXISTS vehicle;";
            tx.executeSql(sql,options, successDrop, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};