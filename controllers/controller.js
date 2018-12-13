var db = require('../model')

module.exports.submitForm = (req, res) => {
    console.log("Reached submitform controller")
    keys = [];
    values = [];
    subLocationValues = [];
    queryCount = 1;
    // console.log("sub location"+req.body['sub_location']['1'])
    for (const key in req.body) {
        console.log(key + " : " + req.body[key])
        if (key.startsWith('sub_location')) {
        }
        else {
            keys.push(key)
            values.push(req.body[key])
        }
    }
    for (const key in req.body['sub_location']) {
        console.log(key + " : " + req.body['sub_location'][key])
        queryCount++;
        subLocationValues.push(req.body['sub_location'][key])
    }
    var sql = "insert into civil_structure(";
    for (i = 0; i < keys.length - 1; i++) {
        sql += keys[i] + ",";
    }
    sql += keys[keys.length - 1] + ") ";
    sql += "values('";
    for (i = 0; i < values.length - 1; i++) {
        sql += values[i] + "','";
    }
    sql += values[values.length - 1] + "');"
    console.log(sql);

    var successCount = 0;

    db.query(sql, function (err, result) {
        if (err) {
            console.log("error on civil structure");
            finishRequest();
        }
        else {
            successCount++;
            console.log("civil structure inserted");
            sql = "select id from civil_structure order by id desc limit 1;";

            db.query(sql, function (err, result) {

                console.log(result[0].id);
                if (!err) {
                    id = result[0].id;
                    sql = "";

                    if (subLocationValues.length == 0) {
                        finishRequest();
                    }
                    for (i = 0; i < subLocationValues.length; i++) {
                        sql = "insert into sub_location(civil_structure_id,name) values ('" + id + "','" + subLocationValues[i] + "');";
                        db.query(sql, function (err, result) {
                            if (!err) {
                                successCount++;
                                console.log("sub location inserted successfully")
                            }
                            else {
                                console.log("error on sub location")
                            }
                            if (successCount == subLocationValues.length + 1) {
                                finishRequest();
                            }
                        });
                    }
                }
            });
        }
    });


    var finishRequest = function () {
        console.log("successcount:" + successCount + "queryCount" + queryCount)
        if (successCount == queryCount) {
            console.log("success")
            res.send("success")
        }
        else {
            console.log("error")
            res.send("error")
        }
    }
}

module.exports.getLocation = (req, res) => {
    var sql = " select id,location from civil_structure;";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("error on fetching civil structure");
            res.send("error");
        }
        else {
            console.log(result.length)
            console.log("fetched civil structures successfully");
            res.send(result);
        }
    });
}

module.exports.getsubLocation = (req, res) => {
    console.log("reached getSUbLocation" + req.body['id']);
    var sql = "select sub_location_id,name from sub_location where civil_structure_id ='" + req.body['id'] + "';";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("error on fetching sub locations");
            res.send("error");
        }
        else {
            console.log("fetched sub locations successfully")
            console.log(result);
            res.send(result);
        }
    });
}

module.exports.submitElectrical = (req, res) => {
    var keys = [];
    var values = [];

    for (const key in req.body) {
        keys.push(key)
        values.push(req.body[key])
    }
    console.log(keys)
    console.log(values)


    var sql = "insert into electrical(";

    for (i = 0; i < keys.length - 1; i++) {
        sql += keys[i] + ",";
    }

    sql += keys[keys.length - 1] + ") ";

    sql += "values('";

    for (i = 0; i < values.length - 1; i++) {
        sql += values[i] + "','";
    }
    sql += values[values.length - 1] + "');"

    console.log(sql);

    var successCount = 0;

    db.query(sql, function (err, result) {
        if (err) {
            console.log("error on inserting electrical");
            finishRequest();
        }
        else {
            successCount++;
            console.log("Electrical record inserted");
            finishRequest();

        }
    });

    var finishRequest = function () {
        console.log("successcount:" + successCount)
        if (successCount == 1) {
            console.log("electrical record inserted successfully")
            res.send("success")
        }
        else {
            console.log("Error on inserting")
            res.send("error")
        }
    }
}

module.exports.getRecord = (req, res) => {
    console.log("reached get record" + req.body['id']);
    var sql = "select * from " + req.body['id'] + " ;";
    db.query(sql, function (err, result) {
        if (err) {
            console.log("error on fetching records");
            res.send("error");
        }
        else {
            console.log("fetched records successfully")
            console.log(result);
            res.send(result);
        }
    });
}