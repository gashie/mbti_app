/*  Wizard */
jQuery(function($) {
    "use strict";
    // Chose here which method to send the email, available:
    // Simple phpmail text/plain > send_email_with_branch.php (default)
    // PHPMailer text/html > phpmailer/with_branch_phpmailer.php
    // PHPMailer text/html SMTP > phpmailer/with_branch_phpmailer_smtp.php
    // PHPMailer with html template > phpmailer/with_branch_phpmailer_template.php
    // PHPMailer with html template SMTP> phpmailer/with_branch_phpmailer_template_smtp.php
    $('form#wrapped').attr('action', '/result');
    $("#wizard_container").wizard({
        stepsWrapper: "#wrapped",
        submit: ".submit",
        unidirectional: false,
        beforeSelect: function(event, state) {
            if ($('input#website').val().length != 0) {
                return false;
            }
            if (!state.isMovingForward)
                return true;
            var inputs = $(this).wizard('state').step.find(':input');
            return !inputs.length || !!inputs.valid();
        }
    }).validate({
        errorPlacement: function(error, element) {
            if (element.is(':radio') || element.is(':checkbox')){
                error.insertBefore(element.next());
            } else {
                error.insertAfter(element);
            }
        }
    });
    //  progress bar
    $("#progressbar").progressbar();
    $("#wizard_container").wizard({
        afterSelect: function(event, state) {
            $("#progressbar").progressbar("value", state.percentComplete);
            $("#location").text("" + state.stepsComplete + " of " + state.stepsPossible + " completed");
        }
    });
});

$("#wizard_container").wizard({
    transitions: {
        branchtype: function($step, action) {
            var branch = $step.find(":checked").val();
            if (!branch) {
                $("form").valid();
            }
            return branch;
        }
    }
});


// Input name and email value
function getVals(formControl, controlType) {
    switch (controlType) {

        case 'name_field':
            // Get the value for input
            var value = $(formControl).val();
            $("#name_field").text(value);
            break;

        case 'email_field':
            // Get the value for input
            var value = $(formControl).val();
            $("#email_field").text(value);
            break;
    }
}