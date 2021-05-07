const mysql = require("mysql");
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

//connecting the database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, //ip address of the server
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

//display vaccine table

exports.get_vaccine = (req, res) => {
    var arraydata = []
    db.query('SELECT * FROM vaccine', (error,results) => {
        if (error){
            console.log(results["error"]);
        } 
        results.forEach(function(item) {
            arraydata.push(item);
        });
        console.log("ARRAY DATA")
        console.log(arraydata)
    });
    res.render('admin_vaccine',  {
        array_data: arraydata
      });
}

//display nurse table

exports.get_nurse = (req, res) => {
    var arraydata = []
    db.query('SELECT * FROM nurse', (error,results) => {
        if (error){
            console.log(results["error"]);
        } 
        results.forEach(function(item) {
            arraydata.push(item);
        });
        console.log("ARRAY DATA")
        console.log(arraydata)
    });
    res.render('admin_nurse',  {
        array_data: arraydata
      });
}

//display patient table

exports.get_patient = (req, res) => {
    var arraydata = []
    db.query('SELECT * FROM patient', (error,results) => {
        if (error){
            console.log(results["error"]);
        } 
        results.forEach(function(item) {
            arraydata.push(item);
        });
        console.log("ARRAY DATA")
        console.log(arraydata)
    });
    res.render('admin_patient',  {
        array_data: arraydata
      });
}

exports.get_nurse_info = (req, res) => {
    res.render('nurse_info');
}

exports.add_nurse = (req, res) => {
    console.log(req.body);
    console.log('HIiiiiiiiiiiiiiii');
    const { fname, lname, email, phone, dob, address, password, username, gender} = req.body;
    db.query('INSERT INTO nurse SET ?', {fname: fname, lname:lname, email: email, phone:phone, dob:dob, address:address, gender:gender, username:username, password:password}, (error, results) => {
        if (error){
            console.log(error);
        }else{
            db.query('INSERT INTO user SET ?', {fname: fname, lname:lname, email: email, username:username, password:password, role:1}, (error, results) => {
                if (error){
                    console.log(error);
                }else{
                    return res.render('admin_nurse'); 
                }
            }) 
        }
    })

}

exports.get_nurse_info_update = (req, res) => {
    res.render('nurse_info_update');
}

exports.login2 = (req, res) => {
    
    console.log(req.body);
    const { email, password, role} = req.body;
    db.query('SELECT password, role FROM user WHERE email = ?', [email], (error,results) => {
        console.log(results);
        if (error){
            console.log(results["error"]);
        }
        if(results[0].role === 0){
            console.log("patient login!");
            return res.render('patient_home');
        }
        else if(results[0].role === 1){
            console.log("Nurse Login!");
            return res.send('Welcome Nurse');
        }
        else if(results[0].role === 2){
            console.log("Admin Login");
            return res.render('admin_nurse');
        }
    });
};

exports.get_vaccine_update = (req, res) => {
    res.render('vaccine_update');
}

//add a vaccine 

exports.add_vaccine = (req, res) => {
    const { name, company, doses, waittime, quantity} = req.body;
    db.query('INSERT INTO vaccine SET ?', {name: name, company:company, requires_doses: doses, available_doses:quantity, wait_time:waittime}, (error, results) => {
        if (error){
            console.log(error);
        }else{
            console.log(results);
            console.log("this is it!!");
            return res.render('admin_vaccine'); 
        }
    })
    
}

//delete a vaccine


// register user and save details in db

exports.register = (req, res) => {
    console.log(req.body);
    const { username, email, password, confirmPassword, fname, mname, lname} = req.body;
    db.query('SELECT email FROM user WHERE email = ?', [email], (error,results) => {
        if (error){
            console.log(error);
        }
        console.log(results);

        if ( results.length > 0){
            return res.send("The email is already in use!");

        } 
        else if( password !== confirmPassword ){
            return res.send("Passwords do not match! Try Again...");
        }        
        else if( password !== confirmPassword ){
            return res.send("Passwords do not match! Try Again...");
        }
        
        db.query('INSERT INTO user SET ?', {username: username, email:email, password: password, fname:fname, mname:mname, lname:lname, role:0}, (error, results) => {
            if (error){
                console.log(error);
            }else{
                console.log(results);
                db.query('INSERT INTO patient SET ?', {username: username, email:email, password: password, fname:fname, mname:mname, lname:lname}, (error, results) => {
                    if (error){
                        console.log(error);
                    }else{
                        console.log(results);
                        return res.send('User Successfully Registered!'); 
                    }
                }) 
            }
        })
    });
};

