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
          {id: 'FirstName', title: 'FirstName'},
          {id: 'International', title: 'International'},
          {id: 'Gender', title: 'Gender'},
          {id: 'EmailAddress', title: 'EmailAddress'},
          {id: 'ExpectedHours', title: 'ExpectedHours'},
          {id: 'Semester', title: 'Semester'},
          {id: 'YearWorking', title: 'YearWorking'},
          {id: 'Phone', title: 'Phone'},
          {id: 'BYUID', title: 'BYUID'},
          {id: 'PositionType', title: 'PositionType'},
          {id: 'ClassCode', title: 'ClassCode'},
          {id: 'EmployeeRecord', title: 'EmployeeRecord'},
          {id: 'Supervisor', title: 'Supervisor'},
          {id: 'HireDate', title: 'HireDate'},
          {id: 'PayRate', title: 'PayRate'},
          {id: 'LastPayIncrease', title: 'LastPayIncrease'},
          {id: 'PayIncreaseAmount', title: 'PayIncreaseAmount'},
          {id: 'IncreaseInputDate', title: 'IncreaseInputDate'},
          {id: 'YearInProgram', title: 'YearInProgram'},
          {id: 'PayGradTuition', title: 'PayGradTuition'},
          {id: 'NameChangeCompleted', title: 'NameChangeCompleted'},
          {id: 'Notes', title: 'Notes'},
          {id: 'Termination', title: 'Termination'},
          {id: 'TerminationDate', title: 'TerminationDate'},
          {id: 'QualtricsSurvey', title: 'QualtricsSurvey'},
          {id: 'EForm', title: 'EForm'},
          {id: 'EFormSubmissionDate', title: 'EFormSubmissionDate'},
          {id: 'AuthorizationRecieved', title: 'AuthorizationRecieved'},
          {id: 'AuthorizationEmailSentDate', title: 'AuthorizationEmailSentDate'},
          {id: 'BYUName', title: 'BYUName'}
        ]
    });

    knex.select().from('Students')
        .then((results) => {
            var data = []
            results.forEach(row => {
                data.push({
                    LastName : row.LastName,
                    FirstName : row.FirstName,
                    International : row.International,
                    Gender : row.Gender,
                    EmailAddress : row.EmailAddress,
                    ExpectedHours : row.ExpectedHours,
                    Semester : row.Semester,
                    YearWorking : row.YearWorking,
                    Phone : row.Phone,
                    BYUID : row.BYUID,
                    PositionType : row.PositionType,
                    ClassCode : row.ClassCode,
                    EmployeeRecord : row.EmployeeRecord,
                    Supervisor : row.Supervisor,
                    HireDate : row.HireDate,
                    PayRate : row.PayRate,
                    LastPayIncrease : row.LastPayIncrease,
                    PayIncreaseAmount : row.PayIncreaseAmount,
                    IncreaseInputDate : row.IncreaseInputDate,
                    YearInProgram : row.YearInProgram,
                    PayGradTuition : row.PayGradTuition,
                    NameChangeCompleted : row.NameChangeCompleted,
                    Notes : row.Notes,
                    Termination : row.Termination,
                    TerminationDate : row.TerminationDate,
                    QualtricsSurvey : row.QualtricsSurvey,
                    EForm : row.EForm,
                    EFormSubmissionDate : row.EFormSubmissionDate,
                    AuthorizationRecieved : row.AuthorizationRecieved,
                    AuthorizationEmailSentDate : row.AuthorizationEmailSentDate,
                    BYUName : row.BYUName,
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

app.listen(80);
console.log("Server listening on port 80.");