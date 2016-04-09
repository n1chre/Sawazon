$(function () {

    var $formLogin = $('#login-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    $("form").submit(function () {

        var $error = "";

        if (this.id == 'login-form') {

            var $l_username = $("#l_username").val();
            var $l_password = $('#l_password').val();
            if (!$l_username) $error = "Username is empty";
            else if (!$l_password) $error = "Password is empty";

            if ($error) {
                msgShow($error, false, true);
                return false;
            }

            var $login_link = $('#login_link').val();
            var $login_response = 0;

            $.ajax({
                type: "POST",
                url: $login_link,
                async: false,
                data: {
                    username: $l_username,
                    password: $l_password
                },
                success: function ($data) {
                    $login_response = $data;
                }
            });

            if ($login_response == 0) {
                msgShow("Wrong username or password", false, true);
                return false;
            }
            else return true;

        } else if (this.id == 'register-form') {

            var $r_username = $("#r_username").val();
            var $r_password = $("#r_password").val();
            var $r_password2 = $("#r_password2").val();

            var $r_firstname = $('#r_firstname').val();
            var $r_lastname = $('#r_lastname').val();
            var $r_dateOfBirth = $('#r_date_of_birth').val();

            var $r_email = $("#r_email").val();
            var $r_telephone = $("#r_telephone").val();

            var $r_street = $("#r_street").val();
            var $r_city = $("#r_city").val();
            var $r_country = $("#r_country").val();

            if (!$r_username) $error = "Username is empty";
            else if (!$r_password) $error = "Password is empty";
            else if (!$r_password2) $error = "Password is empty";
            else if (!$r_firstname) $error = "First name is empty";
            else if (!$r_lastname) $error = "Last name is empty";
            else if (!$r_dateOfBirth) $error = "Date of birth is empty";
            else if (!$r_email) $error = "Email is empty";
            else if (!$r_telephone) $error = "Telephone is empty";
            else if (!$r_street) $error = "Street is empty";
            else if (!$r_city) $error = "City is empty";
            else if (!$r_country) $error = "Country is empty";

            else if ($r_username.length < 4) $error = "Username must contain 4 or more characters";
            else if ($r_password.length < 6) $error = "Password must contain 6 or more characters";
            else if ($r_password != $r_password2) $error = "Passwords don't match";

            if ($error) {
                msgShow($error, false, true);
                return false;
            }


            // var $register_link = $('#login_link').val();
            // var $login_response = 0;
            //
            // $.ajax({
            //     type: "POST",
            //     url: $login_link,
            //     async: false,
            //     data: {
            //         username: $l_username,
            //         password: $l_password
            //     },
            //     success: function ($data) {
            //         $login_response = $data;
            //     }
            // });
            //
            // if ($login_response == 0) {
            //     msgShow("User doesn't exist", false, true);
            //     return false;
            // }
            // else return true;
        }
    });

    $("#r_username").blur(function () {

        var $username = this.value;
        var $username_check_link = $("#username_check_link").val();

        $.ajax({
            type: "POST",
            url: $username_check_link,
            data: {
                username: $username
            },
            success: function ($data) {
                if ($data == 1) msgShow("Username " + $username + " is availible", true, false);
                else msgShow("Username " + $username + " is already taken", false, false);
            }
        });
    });

    $("#r_password2").blur(function () {
        if ($("#r_password").val() != this.value) msgShow("Passwords don't match", false, false);
    });

    $("#r_email").blur(function () {

        var $email = this.value;
        var $email_check_link = $("#email_check_link").val();

        $.ajax({
            type: "POST",
            url: $email_check_link,
            data: {
                email: $email
            },
            success: function ($data) {
                if ($data == 0) msgShow("Email " + $email + " is already taken", false, false)
                ;
            }
        });
    });

    $("#r_date_of_birth").blur(function () {
        var $dob = new Date(this.value);
        $dob.setFullYear($dob.getFullYear() + 18);

        if ($dob.getTime() > new Date().getTime())
            msgShow("Must be 18 or older to register", false, false);
    });

    $('#login_register_btn').click(function () {
        modalAnimate($formLogin, $formRegister)
    });
    $('#register_login_btn').click(function () {
        modalAnimate($formRegister, $formLogin);
    });

    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divForms.animate({height: $newH}, $modalAnimateTime, function () {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgShow($msgText, $ok, $login) {
        var $divTag, $iconTag, $textTag, $divClass, $iconClass;

        if ($ok) {
            $divClass = 'success';
            $iconClass = 'glyphicon-ok';
        } else {
            $divClass = 'error';
            $iconClass = 'glyphicon-remove';
        }

        if ($login) {
            $divTag = $('#div-login-msg');
            $iconTag = $('#icon-login-msg');
            $textTag = $('#text-login-msg');
        } else {
            $divTag = $('#div-register-msg');
            $iconTag = $('#icon-register-msg');
            $textTag = $('#text-register-msg');
        }

        msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText);
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function () {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }
});