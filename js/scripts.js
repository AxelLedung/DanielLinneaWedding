$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function () {
        $('.wp7').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function () {
        $('.wp8').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp9').waypoint(function () {
        $('.wp9').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800
    });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    /* When user clicks the Icon */
    $('.nav-toggle').click(function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');

    });

    /***************** Header BG Scroll ******************/

    $(function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 20) {
                $('section.navigation').addClass('fixed');
                $('header').css({
                    "border-bottom": "none",
                    "padding": "35px 0"
                });
                $('header .member-actions').css({
                    "top": "26px",
                });
                $('header .navicon').css({
                    "top": "34px",
                });
            } else {
                $('section.navigation').removeClass('fixed');
                $('header').css({
                    "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
                    "padding": "50px 0"
                });
                $('header .member-actions').css({
                    "top": "41px",
                });
                $('header .navicon').css({
                    "top": "48px",
                });
            }
        });
    });
    /***************** Smooth Scrolling ******************/

    $(function () {

        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 90
                    }, 2000);
                    return false;
                }
            }
        });

    });


    /********************** Embed youtube video *********************/
    $('.player').YTPlayer();


    /********************** Add to Calendar **********************/
    var myCalendar = createCalendar({
        options: {
            class: '',
            // You can pass an ID. If you don't, one will be generated for you
            id: ''
        },
        data: {
            // Event title
            title: "Ida & Andreas Bröllop",

            // Event start date
            start: new Date('Juli 20, 2024 17:00'),

            // Event duration (IN MINUTES)
            // duration: 120,

            // You can also choose to set an end time
            // If an end time is set, this will take precedence over duration
            end: new Date('Juli 20, 2024 00:00'),

            // Event Address
            address: 'Sjögattu 43, 793 70 Tällberg',

            // Event Description
            description: "Vi ser fram emot att se dig på vår stora dag. För eventuella frågor eller problem kontakta Rasmus Lindy eller Silja Proper"
        }
    });

    $('#add-to-cal').html(myCalendar);


    /********************** RSVP **********************/




    // alert_markup
    function alert_markup(alert_type, msg) {
        return '<div class="alert alert-' + alert_type + '" role="alert">' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span>&times;</span></button></div>';
    }
    (async function () {
    const elements = document.querySelectorAll("[data-include]");
    for (const el of elements) {
        const file = el.getAttribute("data-include");
        const response = await fetch(file);
        el.innerHTML = await response.text();
    }
    })();

    (function () {
        // get all data in form and return object
        function getFormData(form) {
            var elements = form.elements;
            var honeypot;

            var fields = Object.keys(elements).filter(function (k) {
                if (elements[k].name === "honeypot") {
                    honeypot = elements[k].value;
                    return false;
                }
                return true;
            }).map(function (k) {
                if (elements[k].name !== undefined) {
                    return elements[k].name;
                    // special case for Edge's html collection
                } else if (elements[k].length > 0) {
                    return elements[k].item(0).name;
                }
            }).filter(function (item, pos, self) {
                return self.indexOf(item) == pos && item;
            });

            var formData = {};
            fields.forEach(function (name) {
                var element = elements[name];

                // singular form elements just have one value
                formData[name] = element.value;

                // when our element has multiple items, get their values
                if (element.length) {
                    var data = [];
                    for (var i = 0; i < element.length; i++) {
                        var item = element.item(i);
                        if (item.checked || item.selected) {
                            data.push(item.value);
                        }
                    }
                    formData[name] = data.join(', ');
                }
            });

            // add form-specific values into the data
            formData.formDataNameOrder = JSON.stringify(fields);
            formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
            formData.formGoogleSendEmail
                = form.dataset.email || ""; // no email by default

            return { data: formData, honeypot: honeypot };
        }

        function handleFormSubmit(event) {  // handles form submit without any jquery
            event.preventDefault();           // we are submitting via xhr below
            var form = event.target;
            var formData = getFormData(form);
            var data = formData.data;

            // If a honeypot field is filled, assume it was done so by a spam bot.
            if (formData.honeypot) {
                return false;
            }

            disableAllButtons(form);
            var url = form.action;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    form.reset();
                    var formElements = form.querySelector(".form-elements")
                    if (formElements) {
                        formElements.style.display = "none"; // hide form
                    }
                    var thankYouMessage = form.querySelector(".thankyou_message");
                    if (thankYouMessage) {
                        thankYouMessage.style.display = "block";
                    }
                }
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function (k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);
        }

        function loaded() {
            // bind to the submit event of our form
            var forms = document.querySelectorAll("form.gform");
            for (var i = 0; i < forms.length; i++) {
                forms[i].addEventListener("submit", handleFormSubmit, false);
            }
        };
        document.addEventListener("DOMContentLoaded", loaded, false);

        function disableAllButtons(form) {
            var buttons = form.querySelectorAll("button");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
        }
    })();
    document.addEventListener("DOMContentLoaded", function () {
        // Initially hide the map
        document.getElementById('location-map').style.display = 'none';

        // Add event listener for 'Show Map' button
        document.getElementById('btn-show-map').addEventListener('click', function () {
            document.getElementById('location-info').style.display = 'none';
            document.getElementById('location-map').style.display = 'block';
        });

        // Add event listener for 'Show Info' button
        document.getElementById('btn-show-info').addEventListener('click', function () {
            document.getElementById('location-map').style.display = 'none';
            document.getElementById('location-info').style.display = 'block';
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        function updateCountdown() {
            const weddingDate = new Date("June 13, 2026 00:00:00").getTime();
            const now = new Date().getTime();

            let timeDifference = weddingDate - now;

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Update the countdown text with time til the wedding
            document.getElementById("countdown").textContent = days + " Dagar " + hours + " Timmar " + minutes + " Minuter " + seconds + " Sekunder till bröllopet!";
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    });
});
