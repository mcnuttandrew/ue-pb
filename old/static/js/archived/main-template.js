// js template for the main functionality of non-survey pages

// declare variables with global scope
// this might include variables that store elicitation data
var response,
    startTime;

// callbacks to record and manage responses
// also, any part of the DOM that is data-driven
// need to wait until page has loaded all html elements
$(document).ready(function () {
    // get start time for trial
    startTime = new Date().getTime() / 1000;

    // fill in the copy based on data if needed

    // mount chart components
    chartFxn = chartName();
    d3.select('#chart-container')
        .datum(data)
        .call(chartFxn);

    // also handle any form inputs or response logging here
});

// disable enter key submit, which messes up url parameters
// need this for each input elemt
$('#input-id').on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});

// force hard refresh when user navigates to page using forward and back buttons
// this prevents the page from getting stuck in an unexpected state
window.addEventListener("pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
        ( typeof window.performance != "undefined" && 
        window.performance.getEntriesByType("navigation")[0].type === "back_forward" );
    if ( historyTraversal ) {
        // Handle page restore.
        window.location.reload();
    }
});


// helper functions for data processing


// submit callback: posts to DB and moves to next page
// may need one of these for multiple buttons on the elicitation page
// if we are showing any feedback on their responses, we'll need to trigger it here
function handleSubmit() {
    // validate responses
    if (!response || response === '') {
        $("#catch").html("You need to respond...");
        $("#catch").addClass("show");
        // wait to reset display
        setTimeout(function () {
            $("#catch").removeClass("show");
        }, 4250);
    } else if (response === 'bad' || isNaN(response)) {
        // prompt for numeric response
        $("#catch").html("You need to provide a non-bad response.");
        $("#catch").addClass("show");
        // wait to reset display
        setTimeout(function () {
            $("#catch").removeClass("show");
        }, 4250);
    } else { // responses are valid
        // Use promises to get the response info before posting to DB
        // may not need to use promises here, but this pattern can help to avoid async issues
        const getRespTime = new Promise(function (resolve, reject) {
            resolve(new Date().getTime() / 1000);
        });
        const getRespObj = new Promise(function (resolve, reject) {
            resolve(response);
        });

        // When both of these Promises have resolved, post to db.
        Promise.all([getRespTime, getRespObj])
            .then(function (values) {
                const [respTime, respObj] = values; 
                // Build and return response JSON object here
                return {
                    'response': respObj,
                    'startTime': startTime,
                    'respTime': respTime
                };
            }).then(function (object) {
                // call Flask API in routes.py to save data to DB
                fetch('/api/submit_response', {
                    method: "post",
                    body: JSON.stringify(object)
                }).then(function (resp) {
                    console.log("resp", resp);
                    return resp.json();
                }).then(function (result) {
                    console.log("result", result);

                    // if we need to render any feedback we can do it here instead of automatically
                    // proceeding to the next page, in which case we need to link the next url to another 
                    // button in the display that becomes active when the feedback is shown

                    // automatically proceed to next page
                    window.location.href = routeVars.nextUrl;
                }).catch(function (err) {
                    console.log("error", err);
                }); // note how we've nested the Promise.then() pattern here
            }).catch(function (err) {
                console.log("error", err);
            }); // we only need this outer Promise if the inner call to fetch throws an error because the response data doesn't exist yet
    }
}