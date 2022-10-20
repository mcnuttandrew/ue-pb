// js code for survey pages

// declare variables with global scope
// in this template we store response data as nested JSON
// we may need to change the format of data storage to match our DB schema
let respObj;


// callbacks to record and manage responses
// need to wait until page has loaded all html elements
$(document).ready(function () {
    // get start time for page
    let startTime = new Date().getTime() / 1000;

    // store information needed to associate records with user

    // process inputs from web forms
    // different web forms may require different anonymous callback functions
    if ($("#text-form-id").length !== 0) {
        $("#text-form-response").change("input", function () {
            // get time for response
            let respTime = new Date().getTime() / 1000;
            // update global variables storing response to pass to DB
            respObj["answer"] = this.value;
            respObj["startTime"] = startTime;
            respObj["respTime"] = respTime;
        });
    } else if ($("#radio-button-id").length !== 0) {
        // refer to radio button array by name rather than id
        $("input[type=radio][name=radio-button]").click(function () {
            // get time for response
            let respTime = new Date().getTime() / 1000;
            // update response object for db
            respObj["answer"] = this.value;
            respObj["startTime"] = startTime;
            respObj["respTime"] = respTime;
        });
    } else if ($("#demographics").length !== 0) {
        // some forms have multiple inputs on one page
        // gender as text entry
        $("#gender").change("input", function () {
            // get time for response
            let respTime = new Date().getTime() / 1000;
            // update response object for DB
            respObj["gender"] = {
                "answer": this.value,
                "startTime": startTime,
                "respTime": respTime
            };
        });
        // age as radio buttons
        $("input[type=radio][name=age]").click(function () {
            // get time for response
            let respTime = new Date().getTime() / 1000;
            // update response object for DB
            respObj["age"] = {
                "answer": this.value,
                "startTime": startTime,
                "respTime": respTime
            };
        });
        // education as radio buttons
        $("input[type=radio][name=education]").click(function () {
            // get time for response
            let respTime = new Date().getTime() / 1000;
            // update response object for DB
            respObj["education"] = {
                "answer": this.value,
                "startTime": startTime,
                "respTime": respTime
            };
        });
        // frequency of chart use as a radio button
        $("input[type=radio][name=chart-use]").click(function () {
            // get time for response
            let respTime = new Date().getTime() / 1000;
            // update response object for DB
            respObj["chartUse"] = {
                "answer": this.value,
                "startTime": startTime,
                "respTime": respTime
            };
        });
    }
});


// disable enter key submit, which messes up url parameters
// we'll need this for any form with a submit button
$('#text-form-id').on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});
$('#radio-button-id').on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});
$('#demographics').on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});


// disable click from bringing user to top of the page
$('a.submit').click(function (e) {
    // Cancel the default action
    e.preventDefault();
});


// prevent invalid responses
// this callback function should be bound to the form submit button
function handleSubmit() {
    // may need to check more cases than this
    // e.g., if we have multiple questions
    if (!respObj.answer || respObj.answer == "") {
        // no response for gender: give feedback
        $("#catch").html("Please respond to the question.");
        $("#catch").addClass("show");
        // wait to reset display
        setTimeout(function () {
            $("#catch").removeClass("show");
        }, 4250);
    } else {
        // call Flask API in routes.py to save data to DB
        fetch('/api/submit_form', { 
            method: "post",
            body: JSON.stringify(respObj)
        }).then(function (resp) {
            console.log("resp", resp);
            return resp.json();
        }).then(function (result) {
            console.log("result", result);
            // response is logged: pass onto next page
            window.location.href = nextUrl;
        }).catch(function (err) {
            console.log("error", err);
        });
    }
}