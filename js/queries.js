/*
Created by Luke Almeida
April 6th 2018

queriesJS that calls the sql queries (Insert, SelectAll, Update and Delete)

*/

var Vehicle = {
    insert: function (options){
        function txFunction(tx) {
            var sql = "INSERT INTO vehicle(sellerName, address, city, phoneNumber, emailAddress, make, model, year) " +
                "values(?, ?, ?, ?, ?, ?, ?, ?); ";

            function successInsert() {
                console.info("Success: Insert successful.");
                alert("New record added.");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll : function(callback){
        var options=[];

        function txFunction(tx) {
            var sql = "SELECT * FROM vehicle;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    select: function(options, callback){

        function txFunction(tx) {
            var sql = "SELECT * FROM vehicle WHERE id=?;";

            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function(options){

        function txFunction(tx) {
            var sql = "UPDATE vehicle " +
                "SET sellerName=?, address=?, city=?, phoneNumber=?, emailAddress=?, make=?, model=?, year=? " +
                "WHERE id=?;";

            function successUpdate() {
                console.info("Success: Update successful");
                alert("Record updated successfully");
            }
            tx.executeSql(sql, options, successUpdate, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    delete: function(options){

        function txFunction(tx) {
            var sql = "DELETE FROM vehicle " +
                "WHERE id=?;";

            function successDelete() {
                console.info("Success: Delete successful");
                alert("Record deleted successfully");
            }
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};