var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var createCsvWriter = require('csv-writer').createObjectCsvWriter;

var app = express();

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '54.215.108.207',
        port: 3306,
        user: 'db-user',
        password: 'db-user',
        database: 'ClassProject'
    }
});

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.get(['/', '/index'], function (req, res) {
    res.render('pages/index');
});

app.get('/data', function (req, res) {
    knex.select().from('Students')
        .then((results) => {
            console.log(results);
            res.render('pages/data', {
                results: results
            });
        });
});

app.get('/reports', function (req, res) {
    res.render('pages/reports');
});

app.get('/form', function (req, res) {
    res.render('pages/form');
});

app.post('/new', function (req, res) {
    console.log('Adding to the database:');
    console.log(req.body);
    console.log('Received a post!');

    knex('Students')
        .insert({ 
            LastName : req.body.lastname, 
            FirstName : req.body.firstname,
            International : (req.body.international == "on" ? 1 : 0),
            Gender : req.body.gender,
            EmailAddress : req.body.email,
            ExpectedHours : req.body.exphours,
            Semester : req.body.semester,
            YearWorking : req.body.semesteryear,
            Phone : req.body.phone,
            BYUID : req.body.byuid,
            PositionType : req.body.positiontype,
            ClassCode : req.body.classcode,
            EmployeeRecord : req.body.empl_record,
            Supervisor : req.body.supervisor,
            HireDate : req.body.hiredate,
            PayRate : req.body.payrate,
            LastPayIncrease : req.body.lastpayincrease,
            PayIncreaseAmount : req.body.payincreaseamount,
            IncreaseInputDate : req.body.increaseinputdate,
            YearInProgram : req.body.yearinprogram,
            PayGradTuition : (req.body.gradtution  == "on" ? 1 : 0),
            NameChangeCompleted : (req.body.namechangecomplete  == "on" ? 1 : 0),
            Notes : req.body.notes,
            Termination : (req.body.terminated  == "on" ? 1 : 0),
            TerminationDate : req.body.terminationdate,
            QualtricsSurvey : (req.body.qualtricssurveysent == "on" ? 1 : 0),
            EForm : (req.body.submittedeform  == "on" ? 1 : 0),
            EFormSubmissionDate : req.body.eformsubmissiondate,
            AuthorizationRecieved : (req.body.workauthorization  == "on" ? 1 : 0),
            AuthorizationEmailSentDate : req.body.workauthorizationdate,
            BYUName : req.body.byuname
        })
        .then((results) => {
            res.render('pages/index');
        });
});

app.get('/export', function (req, res) {
    const csvWriter = createCsvWriter({
        path: 'export.csv',
        header: [
          {id: 'LastName', title: 'LastName'},
          {id: 'FirstName', title: 'FirstName'}
        ]
    });

    knex.select('LastName', 'FirstName').from('Students')
        .then((results) => {
            var data = []
            results.forEach(row => {
                data.push({
                    LastName : row.LastName,
                    FirstName : row.FirstName
                })
            });
            csvWriter.writeRecords(data)
            .then(() => {
                console.log("CSV Written!");
                var file = `${__dirname}\\export.csv`;
                res.download(file);
            });
            
        });
});

app.get("/send/:byuid", (req,res) => {
    knex.select().from("studentemployeeis").where("byuid", req.params.byuid).then(person => {
        app.listen(3000, () => console.log("the server is listening on port 3000"));
        var nodemailer = require('nodemailer');

        // Create the transporter with the required configuration for Outlook
        // change the user and pass !
        var transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
            ciphers:'SSLv3'
            },
            auth: {
                user: 'classprojgroup123@outlook.com',
                pass: 'Hiltonprojmanagement'
            }
        });

        // setup e-mail data, even with unicode symbols
        var mailOptions = {
            from: 'classprojgroup123@outlook.com', // sender address (who sends)
            to: person[0].EmailAddress, // list of receivers (who receives)
            subject: 'Authorized for Work ', // Subject line
            text: 'Hello ' + person[0].firstname + ', You have been authorized to work.', // plaintext body
            html: '<b>Hello ' + person[0].firstname + ', </b><br> You have been authorized to work.' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }

            console.log('Message sent: ' + info.response);
        });
    });
});

app.listen(80);
console.log("Server listening on port 80.");