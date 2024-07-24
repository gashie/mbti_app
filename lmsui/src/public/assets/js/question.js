$("#submitquestions").click(function () {
    console.log('qwst');
    var question = $("#question").val();
    var surveyId = $("#surveyId").val();
    var a1 = $("#a1").val();
    var a2 = $("#a2").val();
    var ptype = $("#ptype").val();
    var status = $("#status").val();

    console.log(surveyId);
    console.log(question,surveyId,a1,a2,ptype,status);
    if (question == "" || surveyId == "" || status == "" || a1 == "" || a2 == "" || ptype == "") {
        swal({
            icon: "error",
            title: "Oops...",
            text: "Field cannot be empty!",
            footer: "<a href>Why do I have this issue?</a>",

        });

    } else {

        let url = "/createquestions";

        // $('#loader').hide();
        $.ajax({
            url: url,
            method: "POST",
            dataType: "json",
            cache: false,
            contentType: "application/json",
            data: JSON.stringify({
                question: question,
                surveyId: surveyId,
                a1: a1,
                a2: a2,
                ptype: ptype,
                status: status,
            }),
            beforeSend: function () {
                $("#loader").show();
            },

            success: function (res) {

                $("#loader").hide();

                if (res.Status == 1) {
                    $("form").trigger("reset");
                    swal({
                        icon: "success",
                        title: "Cool...",
                        text: res.Message,
                        footer: "<a href>Why do I have this issue?</a>",
                    }).then((value) => {
                        window.location.replace(`/dashboard/questions/create/${surveyId}`);
                    });
                } else {
                    swal({
                        icon: "error",
                        title: "Cool...",
                        text: res.Message,
                        footer: "<a href>Why do I have this issue?</a>",
                    }).then((value) => {
                        console.log(value);
                    });
                }
            },
            error: function (xhr, status, error) {
                $("#loader").hide();

                if (xhr.readyState == 4) {
                    // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                    var err = JSON.parse(xhr.responseText);

                    $("form").trigger("reset");
                    swal({
                        icon: "error",
                        title: "Ooops...",
                        text: err.message,
                        footer: "<a href>Why do I have this issue?</a>",
                    });
                } else if (xhr.readyState == 0) {
                    // Network error (i.e. connection refused, access denied due to CORS, etc.)

                    $("form").trigger("reset");
                    swal({
                        icon: "error",
                        title: "Ooops...",
                        text: "Network error (i.e. connection refused, access denied due to CORS, etc.)",
                        footer: "<a href>Why do I have this issue?</a>",
                    });
                } else {
                    // something weird is happening
                    $("form").trigger("reset");
                    swal({
                        icon: "error",
                        title: "Ooops...",
                        text: "something weird is happening",
                        footer: "<a href>Why do I have this issue?</a>",
                    });
                }
            },
        });
    }
});

function reply_click(clicked_id) {
    let id = clicked_id;
    // $('#loader').hide();

    if (id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this asset!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "/delasset",
                    method: "POST",
                    dataType: "json",
                    cache: false,
                    contentType: "application/json",
                    data: JSON.stringify({
                        id: id,
                    }),
                    beforeSend: function () {
                        $("#loader").show();
                    },

                    success: function (res) {
                        console.log(res);
                        $("#loader").hide();

                        if (res.Status == 1) {
                            $("form").trigger("reset");
                            swal({
                                icon: "success",
                                title: "Cool...",
                                text: res.Message,
                                footer: "<a href>Why do I have this issue?</a>",
                            }).then((value) => { });
                            window.location.replace("/asset");
                        } else {
                            swal({
                                icon: "error",
                                title: "Cool...",
                                text: res.Message,
                                footer: "<a href>Why do I have this issue?</a>",
                            }).then((value) => {
                                console.log(value);
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#loader").hide();

                        if (xhr.readyState == 4) {
                            // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                            var err = JSON.parse(xhr.responseText);

                            $("form").trigger("reset");
                            swal({
                                icon: "error",
                                title: "Ooops...",
                                text: err.message,
                                footer: "<a href>Why do I have this issue?</a>",
                            });
                        } else if (xhr.readyState == 0) {
                            // Network error (i.e. connection refused, access denied due to CORS, etc.)

                            $("form").trigger("reset");
                            swal({
                                icon: "error",
                                title: "Ooops...",
                                text: "Network error (i.e. connection refused, access denied due to CORS, etc.)",
                                footer: "<a href>Why do I have this issue?</a>",
                            });
                        } else {
                            // something weird is happening
                            $("form").trigger("reset");
                            swal({
                                icon: "error",
                                title: "Ooops...",
                                text: "something weird is happening",
                                footer: "<a href>Why do I have this issue?</a>",
                            });
                        }
                    },
                });
            } else {
                swal("This asset is safe!", {
                    icon: "error",
                });
            }
        });
    }

}

$("#update").click(function () {

    var assetName = $("#asset").val();
    var ipAddress = $("#ip").val();
    var location = $("#location").val();
    var omg = $("#omg").val();
    var status = $("#status").val();
    var ipReg = /(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2}))\.){3}(((25[0-5])|(2[0-4]\d)|(1\d{2})|(\d{1,2})))/;

    if (assetName == "" || ipAddress == "" || location == "" || status == "") {
        swal({
            icon: "error",
            title: "Oops...",
            text: "Field cannot be empty!",
            footer: "<a href>Why do I have this issue?</a>",
        });
    } else if (ipReg.test(ipAddress) == false) {
        swal({
            icon: "error",
            title: "Oops...",
            text: "Invalid IP!",
            footer: "<a href>Why do I have this issue?</a>",
        });
    } else {
        //fire ajax
        // let otp = phone+email;
        let url = `/updateasset/${omg}`;

        // $('#loader').hide();
        $.ajax({
            url: url,
            method: "POST",
            dataType: "json",
            cache: false,
            contentType: "application/json",
            data: JSON.stringify({
                assetName: assetName,
                ipAddress: ipAddress,
                location: location,
                status: status,
            }),
            beforeSend: function () {
                $("#loader").show();
            },

            success: function (res) {

                $("#loader").hide();

                if (res.Status == 1) {
                    $("form").trigger("reset");
                    swal({
                        icon: "success",
                        title: "Cool...",
                        text: res.Message,
                        footer: "<a href>Why do I have this issue?</a>",
                    }).then((value) => {
                        window.location.replace("/asset");
                    });
                } else {
                    swal({
                        icon: "error",
                        title: "Cool...",
                        text: res.Message,
                        footer: "<a href>Why do I have this issue?</a>",
                    }).then((value) => {
                        console.log(value);
                    });
                }
            },
            error: function (xhr, status, error) {
                $("#loader").hide();

                if (xhr.readyState == 4) {
                    // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText)
                    var err = JSON.parse(xhr.responseText);

                    $("form").trigger("reset");
                    swal({
                        icon: "error",
                        title: "Ooops...",
                        text: err.message,
                        footer: "<a href>Why do I have this issue?</a>",
                    });
                } else if (xhr.readyState == 0) {
                    // Network error (i.e. connection refused, access denied due to CORS, etc.)

                    $("form").trigger("reset");
                    swal({
                        icon: "error",
                        title: "Ooops...",
                        text: "Network error (i.e. connection refused, access denied due to CORS, etc.)",
                        footer: "<a href>Why do I have this issue?</a>",
                    });
                } else {
                    // something weird is happening
                    $("form").trigger("reset");
                    swal({
                        icon: "error",
                        title: "Ooops...",
                        text: "something weird is happening",
                        footer: "<a href>Why do I have this issue?</a>",
                    });
                }
            },
        });
    }
})