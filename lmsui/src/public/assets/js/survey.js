$("#submit").click(function () {
    var title = $("#title").val();
    var description = $("#description").val();
    var status = $("#status").val();

    if (title == "" || description == "" || status == "") {
        swal({
            icon: "error",
            title: "Oops...",
            text: "Field cannot be empty!",
            footer: "<a href>Why do I have this issue?</a>",

        });

    } else {

        let url = "/createsurvey";

        // $('#loader').hide();
        $.ajax({
            url: url,
            method: "POST",
            dataType: "json",
            cache: false,
            contentType: "application/json",
            data: JSON.stringify({
                title: title,
                description: description,
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
                        window.location.replace("/dashboard/survey/list");
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

function deletesurvey(clicked_id) {

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
                    url: "/delsurvey",
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
                            window.location.replace("/dashboard/survey/list");
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
                swal("This survey is safe!", {
                    icon: "error",
                });
            }
        });
    }

}

$("#updatesurvey").click(function () {

    var title = $("#title").val();
    var description = $("#description").val();
    var status = $("#status").val();
    var omg = $("#omg").val();
    if (title == "" || description == "" || status == "") {
        swal({
            icon: "error",
            title: "Oops...",
            text: "Field cannot be empty!",
            footer: "<a href>Why do I have this issue?</a>",

        });
    } else {
        //fire ajax
        // let otp = phone+email;
        let url = `/updatesurvey/${omg}`;

        // $('#loader').hide();
        $.ajax({
            url: url,
            method: "POST",
            dataType: "json",
            cache: false,
            contentType: "application/json",
            data: JSON.stringify({
                title: title,
                description: description,
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
                        window.location.replace("/dashboard/survey/list");
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