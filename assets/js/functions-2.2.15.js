var AppointmentInfo = {
    selectedVehicleType: -1,
    selectedServiceType: -1,
    selectedChannelType: -1,
    selectedStationId: null,
    selectedStationCode: null,
    selectedStationName: null,
    cost: -1,
    expireDate: "",
    appointmentDate: "",
    appointmentTime: "",
    plateNo: "",
    latefee: "",
    stationType: "",
    selectedServiceTypeText: "",
    selectedVehicleTypeText: "",
    CityID: 0,
    isEdit: false,
    appointmentID: 0,
    urlparams: "",
    headerDebt: "",
    summaryDebtData: "",
    SerialMatch: false,
    CITY_NAME: "",
    rangeVehicle: false,
    hasInsurance: "",
    hasDebt: "",
    isInsuranceImportant: false,
    Second: false,
    temporaryAppointment: false,
    SMS_BITLYLINK: "",
    IsOver65Ages: false,
    VehicleAya: 0,
    VehicleEgmAya: 0,
    VehicleBrakeType: 0,
};

//Aşağıdaki idler hardcoded olduğu için canlıya alım öncesi eşleşiyor mu diye kontrol edilmeli.

//S: Services
var S = {
    GM: '1', //Genel Muayene
    EM: '2', //Egzoz Muayenesi
    YE: '3', //Yola Elverişlilik Muayenesi
    MT: '4', //Muayene Tekrarı
    TA: '5', //Tadilat Muayenesi
    TE: '6' //Tespit Muayenesi
};

//V: Vehicles
var V = {
    MOT2: '2', //Motorsiklet
    MOT1: '3', //Traktör
    HTA61: '21', //Römork-1  Ağır  
    HTA62: '22', // Römork-2  Hafif  
    HTA71: '23', //Yarı Römork-1  Ağır  
    HTA72: '24' //Yarı Römork-2  Hafif
};

var Answers = {
    lpg: 0,
    licenceAlteration: 0,
    ruhsattamuayene: 0,
    egzoz: 0,
    whoseLicence: 0,
    whoWillBringVehicle: 0,
    vehicleInspectionThisMonth: 0,
    representStatus: 0
}

var Pages = {
    CheckPlate: 0,
    CheckDebt: 1,
    SelectVehicle: 2,
    SelectService: 3,
    SelectAppointmentDate: 4,
    SelectLastExamDate: 5,
    SelectStation: 6,
    SelectHours: 8

};


var currentPage = 1;
var cityHasCapacityForMt = false;
var currenctTimeWithMS = "";

var selectedStationsCapacity = null;
var selectedMobileStationsCapacity;
var isLoadedFancyBox = false;
var stationsPeriodMinute;
var SMS_BITLYLINK;
var AppMaximumDay;
var InspectionControlDayCount;
var activeAppointment = false;
var mtRight = false;
var plateCode = "";
var appointmentDetailCalled = false;
var callMinistry = true;
var timeDiff = 0;
var PB_ERG_DAT = "";
var MT_RIGHT_DATE = "";
var muayeneTekrari = false;
var selectedStationId = 0;
var appointmentDateChangeByCalendar = null;
var isRefresh = false;
var fromTuvturkPage = 0;
var isSelectedSecondVehicleAppointment = false;

var availableDates = ["2015-01-21", "2015-01-22"];

Date.now = Date.now || function() {
    return +new Date;
};

if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */ ) {
        "use strict";

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, t))
                    res.push(val);
            }
        }

        return res;
    };
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

$(document).ready(function() {

    $("#ddlVehicleBrakeType").selectBox();

    $('input[name=imageControl]').attr("autocomplete", "off");

    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
        jqXHR.setRequestHeader('X-CSRF-Token', getCookie("CSRF-Token"));
        jqXHR.setRequestHeader('CaptchaValue', $('input[name=imageControl]').val());
        jqXHR.setRequestHeader('CaptchaImg', $('.captchaCss span img').attr('src'));
    });

    //$("#insuranceDiv").attr('style', 'display: none !important');
    getConfigValues();
    $(".hasInsurance").hide();

    //ruhsatOnFocus();
    var winWidth = $(window).width();
    //setCheckboxCheckedState(checkboxCheckedState);
    if (winWidth > 939) {
        $("input[type=text]#txtSerial").focus(function() {
            $(".ruhsatpopupaya1").css("display", "block").fadeIn(1000);
        }).blur(function() {
            $(".ruhsatpopupaya1").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopupaya1").css("display", "none").fadeOut(1000);
        });

        $("input[type=text]#txtVehicleAya").focus(function() {
            $(".ruhsatpopupaya1").css("display", "block").fadeIn(1000);
        }).blur(function() {
            $(".ruhsatpopupaya1").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopupaya1").css("display", "none").fadeOut(1000);
        });


    }
    if (winWidth < 940 & 767 < winWidth) {
        $("input[type=text]#txtSerial").focus(function() {
            $(".ruhsatpopup2").css("display", "block").fadeIn(1000);
        }).blur(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        });

        $("input[type=text]#txtVehicleAya").focus(function() {
            $(".ruhsatpopup2").css("display", "block").fadeIn(1000);
        }).blur(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        });
    }
    if (768 > winWidth) {
        $("input[type=text]#txtSerial").focus(function() {
            $(".ruhsatpopup3").css("display", "block").fadeIn(1000);

        }).blur(function() {
            $(".ruhsatpopup3").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        });

        $("input[type=text]#txtVehicleAya").focus(function() {
            $(".ruhsatpopup3").css("display", "block").fadeIn(1000);

        }).blur(function() {
            $(".ruhsatpopup3").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        });
    }
    marqueeFunction();

    if ($("#hiddenPlate").val() != "" && $("#hiddenCityID").val() != "") {
        $("#txtPlate").val($("#hiddenPlate").val());
        $("#txtSerial").val($("#hiddenSerialNo").val());

        for (var i = 0; i < JSON.parse($("#hiddenCities").val()).length; i++) {
            var city = JSON.parse($("#hiddenCities").val())[i].Id.split(':');
            if (city[0] == $("#hiddenCityID").val()) {
                $("#ddlCity").val($("#hiddenCityID").val() + ":" + city[1] + ":" + city[2] + ":" + city[3]);
                plateCode = city[2];
                fromTuvturkPage = 1;
                break;
            }
        }

        //$("#submit").click();
    }

    currenctTimeWithMS = moment(new Date());

    $(document).on("click", ".disabled-submit", function(e) {
        e.stopPropagation();
        e.preventDefault();

    });

    $("#istAnd").on("click", function(e) { // İstanbul anadolu tabı aktif yapılır. İstanbul anadolu kapasitesi listelenir        
        AppointmentInfo.CityID = "2:1:34";
        listGetOccupancyItem(false);
        $("#istAv").closest('li').removeClass('active');
        $("#istAnd").closest('li').addClass('active');
        AppointmentInfo.CITY_NAME = "İstanbul Anadolu";
        setInstabulTabOrder();
    });

    $("#istAv").on("click", function(e) { // İstanbul avrupa tabı aktif yapılır. İstanbul anadolu kapasitesi listelenir
        $("#istAnd").closest('li').removeClass('active');
        $("#istAv").closest('li').addClass('active');
        AppointmentInfo.CityID = "1:1:34";
        listGetOccupancyItem(false);
        AppointmentInfo.CITY_NAME = "İstanbul Avrupa";
        setInstabulTabOrder();
    });

    if (!Modernizr.input.placeholder) {

        $('[placeholder]').each(function() {
            var label = $(this).parents("label");
            var placeholderText = $(this).attr("placeholder");

            label.css({
                "position": "relative"
            }).append('<div class="placeholder-wrap">' + placeholderText + '</div>');
        });
        $(document).on("click", ".placeholder-wrap", function(e) {
            e.preventDefault();
            $(this).hide();
            var label = $(this).parents("label");
            label.find("[placeholder]").focus();
        });

        $(document).on("focus", "[placeholder]", function(e) {
            var label = $(this).parents("label");
            label.find(".placeholder-wrap").hide();
        });
        $(document).on("blur", "[placeholder]", function(e) {
            var val = $(this).val();
            if (val == "") {
                var label = $(this).parents("label");
                label.find(".placeholder-wrap").show();
            }
        });
    }

    getLocation();

    timeDiff = new Date($("#hdnDateAndTime").val().replace(/-/g, '/')) - new Date();
    $(".news-date").html(moment($("#hdnDateAndTime").val().replace(/-/g, '/')).format("L"));
    //a = document.getElementById("moreNews");
    //a.setAttribute("href", App.AnnouncementLink);

    getCurrentDay();
    getCurrentTime();
    $('#communicationButton').tooltip({
        content: function() {
            return '<span id="msg">Message</span>';
        },
        position: { of: '#myInput',
            my: 'left center',
            at: 'left center'
        }
    });

    $('#communicationButton').click(function() {
        $('#myTooltip').tooltip('open');
    });


    $('body').on('click', '#secondary-area #exhaustInfoMessage .info', function() {
        var win = window.open($("#HiddenExhaustLink").val(), '_blank');
        win.focus();
    });

    $("marquee").hover(function() {
        this.stop();
    }, function() {
        this.start();
    });

    $("#txtPlate").focus(function() {
        $("#submit").removeClass("nextPage");
    });

    $("#form").submit(function(e) {
        e.preventDefault();
        return false;
    });

    $("#saveAppointment").submit(function(e) {
        e.preventDefault();
        return false;
    });

    $("#txtPlate").keypress(function() {
        $('#alertError').hide();
        $('#alertPlate').hide();
    });

    $("#txtPlate").unbind('keyup').on('keyup', function(event) {
        event.preventDefault();
        toUpperCaseFunction(this);
        return false;
    });

    $("#txtName").unbind('keyup').on('keyup', function(event) {
        event.preventDefault();
        toUpperCaseFunction(this);
        return false;
    });

    $("#txtSurname").unbind('keyup').on('keyup', function(event) {
        event.preventDefault();
        toUpperCaseFunction(this);
        return false;
    });

    $("#surnameText").unbind('keyup').on('keyup', function(event) {
        event.preventDefault();
        toUpperCaseFunction(this);
        return false;
    });

    $("#ddlCity").change(function() {
        $('#alertError').hide();
        $('#alertPlate').hide();
    });

    GetTopAnnouncements();
    //AddLpgSelections();
    //AddLicenceAlterationQuestions();
    //WhoseLicence();


    App.AvailableCities = JSON.parse($(App.Hidden.Cities).val());

    App.AvailableVehicles = JSON.parse($(App.Hidden.Vehicles).val());
    $("#vehicleUl1").find("li").each(function() {

        var remove = true;

        for (var i = 0; i < App.AvailableVehicles.length; i++) {
            if (App.AvailableVehicles[i].Id.split(':')[0] == $(this).data("vehicle")) {
                remove = false;
                break;
            }
        }

        if (remove)
            $(this).addClass("notAvailableVehicle");
    });

    $(".notAvailableVehicle").remove();

    var vehiclesLis = $("#vehicleUl1").find("li");
    var vehiclesLisLength = vehiclesLis.length;
    var middle = Math.floor(vehiclesLisLength / 2);

    var i = 0;

    vehiclesLis.each(function() {

        if (i == middle - 1) {
            $(this).addClass("topLast");
        } else if (i == middle) {
            $(this).addClass("bottomFirst");
            $(this).addClass("borderBottom");
        } else if (i > middle) {
            $(this).addClass("borderBottom");
        }

        i++;
    });

    $("#vehicleUl1").show();


    $("#form").bind("submit", formControl);

    $(document).on("click", ".nav-trigger", function(event) {
        event.preventDefault();
        var activeSection = $(document).find(".fp-section.active");
        var content = activeSection.find(".slimScrollDiv");
        content.animate({
            scrollTop: "0px"
        }, 10);

        $("body").toggleClass("nav_open");
    });

    $('.read-more').readmore({
        maxHeight: 37,
        speed: 100,
        moreLink: '<a href="javascript:void(0);" class="expand">devamını Oku</a>',
        lessLink: '<a href="javascript:void(0);" class="collapse">kapat</a>',
        embedCSS: true,
        sectionCSS: '',
        startOpen: false,
        expandedClass: 'readmore expanded',
        collapsedClass: 'readmore collapsed',
        beforeToggle: function() {},
        afterToggle: function() {}
    });

    // mobile
    if (jQuery.browser.mobile) {
        $("html").addClass("mobile");
    } else {
        $("html").removeClass("mobile");
    }

    $('select').selectBox({
        mobile: true,
        menuTransition: "slide",
        menuSpeed: "fast"
    }).change(function() {
        var val = $(this).val();
    });


    /*
    Masking
    **********/
    $("input.alphabetical").inputmask('Regex', {
        regex: "[ üğşöçıÜŞİÖĞÇa-zA-Z]{50}"
    });
    $("input.arac-plaka").inputmask('Regex', {
        regex: "[a-zA-Z0-9]{8}"
    });
    $("input.name").inputmask('Regex', {
        regex: "[ üğşöçıÜŞİÖĞÇa-zA-Z]{50}"
    });
    $("input.tc-no").inputmask("99999999999");
    $("input.date").inputmask("date");
    $("input.numeric").inputmask("decimal");
    $("input.gsm").inputmask("599 999 99 99");
    $("input.card-number").inputmask("9999 9999 9999 9999");
    $("input.exp-date").inputmask("99 / 99");
    $("input.cvv2").inputmask("999");
    $("input.pin").inputmask("999999");
    $("input.code").inputmask("999999");
    //$("input.phone").inputmask("999 999 99 99");
    //$("input.email").inputmask('Regex', { regex: "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}" });
    $("input.price").inputmask("9.999 TL");
    $("input.phone").mask("999 999 99 99");
    $("input.tckno").mask("99999999999");

    // page nav
    $('#wrapper').fullpage({
        easing: "easeInOutQuart",
        menu: false,
        autoScrolling: true,
        scrollBar: false,
        normalScrollElements: '',
        scrollOverflow: true,
        scrollingSpeed: 350,
        keyboardScrolling: false,
        verticalCentered: false,
        controlArrows: false,
        paddingTop: '0',
        paddingBottom: '0',
        fixedElements: '',
        loopBottom: false,
        loopTop: false,
        resize: false,
        afterRender: function() {
            $.fn.fullpage.setAllowScrolling(false, "up, down, left, right");
            animateWidth();
            stylizeToday();
        },
        onLeave: function(index, nextIndex, direction) {
            $(document).find("ul li").removeClass("disabled-submit"); //25.07.2015 fix
            $(document).find("table td").removeClass("disabled-submit"); //25.07.2015 fix
            showBreadcrumps();
            animateWidth();
            stylizeToday();
            scrollTop();
            if (nextIndex <= 4) {
                changeBreadcrumbs("muayene-ucreti", "", false);
            }
            if (nextIndex <= 5) { // değiştir
                changeBreadcrumbs("randevu-tarih", "", false);
            }
            if (nextIndex <= 7) {
                changeBreadcrumbs("randevu-istasyon", "", false);
            }
            if (nextIndex <= 8) {
                changeBreadcrumbs("randevu-saat", "", false);
            }

            //$.fn.fullpage.setAllowScrolling(false, "up, down, left, right");
        },
        afterLoad: function(anchorLink, index) {
            showBreadcrumps();
            animateWidth();
            stylizeToday();
            //$.fn.fullpage.setAllowScrolling(false, "up, down, left, right");
        }
    });

    // lightbox
    $(".fancybox").fancybox({
        padding: 0,
        margin: 0,
        width: '70%',
        height: '70%',
        maxWidth: 485,
        maxHeight: 273,
        fitToView: false,
        autoSize: false,
        openEffect: 'none',
        closeEffect: 'none'
    });

    $("#son-muayene").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        onSelect: function(date, dp) {
            stylizeToday();
            selectLastExamDate(date);
        },
        onChangeMonthYear: function(month, year, dp) {
            stylizeToday();
        }
    });


    $("#randevu-tarihi").datepicker({
        minDate: 0,
        //maxDate: App.MaxDate,
        dateFormat: "yy-mm-dd",
        onSelect: function(date, dp) {
            stylizeToday();
            setAppointmentDate(date);
        },
        onChangeMonthYear: function(month, year, dp) {
            stylizeToday();
        },
        beforeShowDay: function(date) {
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            if ($.inArray(string, availableDates) > -1) {
                return [true, ""];
            } else {
                return [false, "disabled-date", ""];
            }
        }
    });




    $(document).on("click", "ul.vehicleTypes li,ul.serviceTypes li,.stations ul li", function(e) {
        var element = $(this);
        element.parent().parent().parent().find("li").removeClass("selected");
        element.addClass("selected").addClass("disabled-submit");
        if (element.hasClass("emisyonOlcumu")) {
            e.preventDefault();
            $('.fp-scrollable').animate({
                scrollTop: 0
            }, 1000);
            setTimeout(function() {
                $("#info-egzoz").fadeIn().css("display", "block");
            }, 500);

        } else {
            $("#info-egzoz").hide();
        }
    });


    $(document).on("click", "table.select-hours td a", function() {
        var table = $(this).parents("table");
        var cell = $(this).parents("td");
        var tableCell = table.find("td");
        var len = table.find("td.selected").length;
        /*if(len >= 4)
        {
            return false;
        }*/
        if (tableCell.hasClass("primary")) // önceden asıl saat seçilmişse
        {
            /*if(cell.hasClass("primary"))
            {
                tableCell.removeClass("selected")
                    .removeClass("primary")
                    .removeClass("secondary");
            }
            else
            {
                cell.toggleClass("selected secondary");
            }*/

            tableCell.removeClass("selected")
                .removeClass("primary")
                .removeClass("secondary");

            cell.toggleClass("selected primary");
            selectHours($(this).text());
        } else {
            tableCell.removeClass("selected")
                .removeClass("primary")
                .removeClass("secondary");

            cell.toggleClass("selected primary");
            selectHours($(this).text());
        }
        tableCell.addClass("disabled-submit");
        preAppoint();
        setAppointmentApproveFormHtml();
    });

    $(document).on("click", "#breadcrumbs li.disabled", function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    resize()

    $('input[name=imageControl]').val('')

}); //ready


function txtSerialPopupWidth() {
    var winWidth = $(window).width();

    if (winWidth > 939) {
        $("input[type=text]#txtSerial").focus(function() {
            $(".ruhsatpopup1").css("display", "block").fadeIn(1000);
        }).blur(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        });
    }
    if (winWidth < 940 & 767 < winWidth) {
        $("input[type=text]#txtSerial").focus(function() {
            $(".ruhsatpopup2").css("display", "block").fadeIn(1000);
        }).blur(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        });
    }
    if (768 > winWidth) {
        $("input[type=text]#txtSerial").focus(function() {
            $(".ruhsatpopup3").css("display", "block").fadeIn(1000);

        }).blur(function() {
            $(".ruhsatpopup3").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        });
    }
}

function txtVehicleAyaPopupWidth() {
    var winWidth = $(window).width();

    if (winWidth > 939) {
        $("input[type=text]#txtVehicleAya").focus(function() {
            $(".ruhsatpopupaya1").css("display", "block").fadeIn(1000);
        }).blur(function() {
            $(".ruhsatpopupaya1").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopupaya1").css("display", "none").fadeOut(1000);
        });
    }
    if (winWidth < 940 & 767 < winWidth) {
        $("input[type=text]#txtVehicleAya").focus(function() {
            $(".ruhsatpopupaya2").css("display", "block").fadeIn(1000);
        }).blur(function() {
            $(".ruhsatpopupaya1").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopupaya1").css("display", "none").fadeOut(1000);
        });
    }
    if (768 > winWidth) {
        $("input[type=text]#txtVehicleAya").focus(function() {
            $(".ruhsatpopup3").css("display", "block").fadeIn(1000);

        }).blur(function() {
            $(".ruhsatpopup3").css("display", "none").fadeOut(1000);
        }).focusout(function() {
            $(".ruhsatpopup1").css("display", "none").fadeOut(1000);
        });
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCityPlateCode);
    }
}

function getCityPlateCode(position) {
    if ($("#hiddenPlate").val() == "" && $("#hiddenCityID").val() == "") {
        $.ajax({
                url: "Service/Appointment.asmx/GetCityPlateCode",
                async: false,
                contentType: 'application/json',
                dataType: 'json',
                type: "POST",
                data: JSON.stringify({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            })
            .done(function(response) {
                response = JSON.parse(response.d);
                if (response != null) {
                    if (response.cityCode.indexOf('34') != -1) {
                        if (response.cityCode == '3402')
                            $("#ddlCity").val("1:1:34");
                        else $("#ddlCity").val('2:1:34');
                        plateCode = 34;
                    } else {
                        for (var i = 0; i < JSON.parse($("#hiddenCities").val()).length; i++) {
                            var city = JSON.parse($("#hiddenCities").val())[i].Id.split(':');
                            if (city[2] == response.cityCode) {
                                $("#ddlCity").val(JSON.parse($("#hiddenCities").val())[i].Id);
                                plateCode = response.cityCode;
                                break;
                            }
                        }
                    }
                    $("a:not(.ui-datepicker-month) .selectBox-label").text($("#ddlCity option:selected").text());
                }
            });
    }
}

function resize() {
    $(window).resize(function() {
        $(".fp-section").each(function() {

            if ($(document).width() > 767) {
                var headerHeight = $(this).find("#header").outerHeight();
                var primaryArea = $(this).find("#primary-area");
                var windowHeight = $(window).height();

                var primaryAreaHeight;
                var footer;
                var footerHeight;
                var footerResize;

                if (primaryArea.length > 0) {
                    primaryAreaHeight = primaryArea.outerHeight();
                    footer = $(this).find("#footer").not(".not-resizable");

                    footerHeight = footer.attr("data-height");
                    if (!footerHeight) {
                        footerHeight = footer.height();
                        footer.attr("data-height", footerHeight);
                    }

                    footerResize = (windowHeight - (headerHeight + primaryAreaHeight)) - 80;
                    if (footerResize > footerHeight) {
                        footer.height(footerResize);
                    } else {
                        footer.height(footerHeight);
                    }
                } else {
                    footer = $(this).find(".secondary-area");
                    footerHeight = footer.attr("data-height");
                    if (!footerHeight) {
                        footerHeight = footer.height();
                        footer.attr("data-height", footerHeight);
                    }
                    if (footerResize > footerHeight) {
                        footer.height(footerResize);
                    } else {
                        footer.height(footerHeight);
                    }
                }
            } else {
                $(this).find("#footer").not(".not-resizable").css({
                    "height": "auto"
                });
                $(this).find(".secondary-area").not(".not-resizable").css({
                    "height": "auto"
                });
            }


        });
    }).trigger("resize");
    $(window).on('load', function() {
        scrollTop();
    });
}

function scrollTop() {
    var activeSection = $(document).find(".fp-section.active");
    var content = activeSection.find(".slimScrollDiv,.fp-scrollable");
    content.animate({
        scrollTop: "0px"
    }, 10);
}

function showBreadcrumps() {
    if ($(document).find(".section.active").hasClass("online_actions")) {
        $(document).find("body").addClass("show_breadcrumbs");
    } else {
        $(document).find("body").removeClass("show_breadcrumbs");
    }
}

function printPage() {
    var win = window.open('pages/print.aspx?p=' + AppointmentInfo.urlparams, '_blank');
    win.focus();
}

function stylizeToday() {
    var selectToday = setTimeout(function() {
        var activeSection = $(document).find(".fp-section.active");
        var today = $(".ui-datepicker-today", activeSection);
        if ($(".today", activeSection).length == 0) {
            today.html(today.html() + '<span class="today">BUGÜN</span>');
        }
        clearTimeout(selectToday);
        $('select').selectBox({
            mobile: true,
            menuTransition: "slide",
            menuSpeed: "fast"
        }).change(function() {
            var val = $(this).val();
        });
    }, 1);

}

function animateWidth() {
    var activeSection = $(document).find(".fp-section.active");
    $(".animate-width", activeSection).each(function() {
        var element = $(this);
        var width = element.attr("data-limit");
        element.animate({
            "width": width + "%"
        }, 600, "easeInOutQuart", function() {
            if (width == 100) {
                element.text("DOLU");
            }
        });
    });
}

function animateWidth2() {
    var activeSection = $(document).find(".fancybox-overlay");
    $(".animate-width", activeSection).each(function() {
        var element = $(this);
        var width = element.attr("data-limit");
        element.animate({
            "width": width + "%"
        }, 600, "easeInOutQuart", function() {
            if (width == 100) {
                element.text("DOLU");
            }
        });
    });
}


function changeDay(direction) {
    if (!checkClick())
        return;
    var activeSection = $(document).find(".section.active");
    var daypicker = $(".daypicker", activeSection);
    var daypickerText = daypicker.find(".day-detail");

    var selectedDateService = daypickerText.attr("data-date-service");
    var selectedDate = daypickerText.attr("data-date");

    var today = daypicker.attr("data-today");
    var maxAppointmentDay = moment(today).add(16, 'day');
    var newDate;

    //var stringSelectedDate = jQuery.datepicker.formatDate('yy-mm-dd', selectedDate);
    var selectedIndex = $.inArray(selectedDate, availableDates)

    if (direction == "next") {
        if ((selectedIndex + 1) < availableDates.length && selectedIndex > -1) {
            //newDate = moment(selectedDate).add(1, 'day');
            //selectedDate = moment(selectedDate).add(1, 'day');

            newDate = moment(availableDates[selectedIndex + 1], 'YYYY-MM-DD');
            selectedDate = moment(availableDates[selectedIndex + 1], 'YYYY-MM-DD');

            daypickerText.text(moment(newDate).format('D MMMM YYYY'))
                .attr("data-date", moment(newDate).format('YYYY-MM-DD'));
        }
        //return false;
    }
    if (direction == "prev") {

        //newDate = moment(selectedDate).subtract(1, 'day');
        //selectedDate = moment(selectedDate).subtract(1, 'day');

        if (selectedIndex < 1) {
            return false;
        }

        newDate = moment(availableDates[selectedIndex - 1], 'YYYY-MM-DD');
        selectedDate = moment(availableDates[selectedIndex - 1], 'YYYY-MM-DD');

        //if (moment(newDate).isSame(moment(today).subtract(1, 'day')))
        //{
        //    return false;
        //}


        daypickerText.text(moment(newDate).format('D MMMM YYYY'))
            .attr("data-date", moment(newDate).format('YYYY-MM-DD'));
        //return false;
    }

    AppointmentInfo.appointmentDate = moment(selectedDate).format('DD.MM.YYYY');

    $("#summaryAppointmentDate").html(moment(selectedDate).format('DD.MM.YYYY') + "<br/>" + moment(selectedDate).format("dddd"));
    listGetOccupancyItem(false);
    //return false;
}

function changeWeek(direction) {
    var activeSection = $(document).find(".fancybox-overlay");
    var daypicker = $(".weekpicker", activeSection);
    var daypickerText = daypicker.find(".day-detail");
    var daypickerStartText = daypickerText.find(".start");
    var daypickerFinishText = daypickerText.find(".finish");

    var startDate = daypickerText.attr("data-start");
    var finishDate = daypickerText.attr("data-finish");
    var today = daypicker.attr("data-today");
    var newStartDate;
    var newFinishDate;
    if (direction == "next") {
        newStartDate = moment(startDate).add(1, 'week');
        newFinishDate = moment(finishDate).add(1, 'week');

        daypickerStartText.text(moment(newStartDate).format('D MMMM YYYY'));
        daypickerText.attr("data-start", moment(newStartDate).format('YYYY-MM-DD'));

        daypickerFinishText.text(moment(newFinishDate).format('D MMMM YYYY'));
        daypickerText.attr("data-finish", moment(newFinishDate).format('YYYY-MM-DD'));
    }
    if (direction == "prev") {
        if (moment(startDate).isBefore(today) || moment(startDate).isSame(today)) {
            return false;
        }

        newStartDate = moment(startDate).subtract(1, 'week');
        newFinishDate = moment(finishDate).subtract(1, 'week');

        daypickerStartText.text(moment(newStartDate).format('D MMMM YYYY'));
        daypickerText.attr("data-start", moment(newStartDate).format('YYYY-MM-DD'));

        daypickerFinishText.text(moment(newFinishDate).format('D MMMM YYYY'));
        daypickerText.attr("data-finish", moment(newFinishDate).format('YYYY-MM-DD'));
    }

    AppointmentInfo.appointmentDate = moment(newStartDate).format('DD.MM.YYYY');
    $("#summaryAppointmentDate").html(moment(newStartDate).format('DD.MM.YYYY') + "<br/>" + moment(newStartDate).format("dddd"));
    getOccupancy(false, true);
    listGetOccupancyItem(false, true);
    return false;
}

function showMap() {
    //fooMapFunction();
    $.fancybox({
        href: "pages/map.aspx",
        type: "ajax",
        padding: 0,
        margin: 0,
        openEffect: "fade",
        closeEffect: "fade",
        closeBtn: true,
        helpers: {
            overlay: {
                closeClick: true
            }
        },
        width: "100%",
        height: "100%",
        //scrollOutside : false,
        //scrolling : "auto",
        fitToView: false,
        beforeLoad: function() {
            $("html").addClass("fancybox-body");
        },
        afterLoad: function() {},
        beforeClose: function() {
            $("html").removeClass("fancybox-body");
        }
    });

}

var selectedStationsHoursFancyBox = null;
var mobileStationsLocationsData = [];

function selectMobilStation(stationID, stationCode, stationname) {
    AppointmentInfo.selectedStationId = stationID;
    AppointmentInfo.selectedStationName = stationname;

    if (stationCode != undefined)
        AppointmentInfo.selectedStationCode = stationCode;

    $.fancybox({
        href: "pages/mobil.aspx",
        type: "ajax",
        padding: 0,
        margin: 0,
        //openEffect: "fade",
        closeEffect: "fade",
        closeBtn: false,
        helpers: {
            overlay: {
                closeClick: false
            }
        },
        width: "100%",
        height: "100%",
        //scrollOutside : false,
        //scrolling : "auto",
        fitToView: false,
        beforeLoad: function() {
            $("html").addClass("fancybox-body");
        },
        afterShow: function() {
            if (selectedMobileStationsCapacity.length > 0) {
                var checkIfMobileStationExists = selectedMobileStationsCapacity.filter(function(el) {
                    return el.IsMobileStation == true;
                });

                if (checkIfMobileStationExists.length > 0) {

                    $.ajax({
                            url: "Service/Appointment.asmx/GetMobileStationsLocations",
                            data: JSON.stringify({
                                cityID: $("#ddlCity").val().split(":")[2],
                                date: AppointmentInfo.appointmentDate
                            }),
                            async: false,
                            contentType: 'application/json',
                            dataType: 'json',
                            type: "POST",
                            onresponse: {
                                200: function(r) {
                                    //console.log("late fee response");
                                    if (r.Data)
                                        elementWarn("#txtExpire", r.Data);
                                }
                            }
                        })
                        .fail(function() {})
                        .done(function(response) {
                            mobileStationsLocationsData = JSON.parse(response.d);
                        });


                    $("#stationTitle").html(stationname + " İstasyon Programı")

                    //console.log(selectedMobileStationsCapacity);
                    selectedStationsHoursFancyBox = selectedMobileStationsCapacity.filter(function(el) {
                        return el.StationID == stationID;
                    });
                    //console.log(selectedStationsHours);
                }
            }

            for (var i = 0; i < selectedStationsHoursFancyBox.length; i++) {
                selectedStationsHoursFancyBox[i].appointmentDate = selectedStationsHoursFancyBox[i].AppointmentDateMobil.replace(/\./g, '/');
            }

            selectedStationsHoursFancyBox = selectedStationsHoursFancyBox.sort(function(obj1, obj2) {
                return new Date(obj1.appointmentDate) - new Date(obj2.appointmentDate);
            });

            //console.log(selectedStationsHours);

            var activeSection = $(document).find(".fancybox-overlay");
            var daypicker = $(".weekpicker", activeSection);
            var daypickerText = daypicker.find(".day-detail");

            var daypickerStartText = daypickerText.find(".start");
            var daypickerFinishText = daypickerText.find(".finish");


            if (selectedStationsHoursFancyBox.length > 0) {
                daypickerStartText.text(moment(selectedStationsHoursFancyBox[0].appointmentDate).format('D MMMM YYYY'));
                daypickerFinishText.text(moment(selectedStationsHoursFancyBox[0].appointmentDate).add(6, 'days').format('D MMMM YYYY'));

                daypickerText.attr("data-start", moment(selectedStationsHoursFancyBox[0].appointmentDate).format('YYYY-MM-DD'));
                daypickerText.attr("data-finish", moment(selectedStationsHoursFancyBox[0].appointmentDate).add(6, 'days').format('YYYY-MM-DD'));
                var finishDate = daypickerText.attr("data-finish");
                var today = daypicker.attr("data-today");
                $("#mobileStationFancyBox").children().remove();
                for (var i = 0; i < selectedStationsHoursFancyBox.length; i++) {

                    var filteredDate = mobileStationsLocationsData.Data.filter(function(el) {
                        return moment(el.DATE.substring(0, 10)).format('DD.MM.YYYY') == selectedStationsHoursFancyBox[i].AppointmentDate && el.STATION_CODE == AppointmentInfo.selectedStationCode
                    });

                    if (filteredDate.length != 0) {

                        var date = moment(filteredDate[0].DATE.substring(0, 10)).format('DD.MM.YYYY');

                        if (date == selectedStationsHoursFancyBox[i].AppointmentDate)

                            var stations = selectedStationsCapacity.filter(function(el) {
                                return el.AppointmentDate == AppointmentInfo.appointmentDate
                            });

                        var location = filteredDate[0] != undefined ? filteredDate[0].STATION_POINT : cityname;

                        if (selectedStationsHoursFancyBox[i].StationCapacityPercentAge == 100 || selectedStationsHoursFancyBox[i].TotalCapacity == 0)
                            $("#mobileStationFancyBox").append("<li class='disabled disabled-submit'> " +
                                "<a href='javascript:void(0)' style='cursor:default;'>" +
                                "<div class='four columns station-title-wrapper semi-col'>" +
                                "<div class='station-title'>" + selectedStationsHoursFancyBox[i].AppointmentDate + "</div>" +
                                "</div>" +
                                "<div class='four columns station-date-wrapper semi-col'>" +
                                "<div class='station-title'>" + location + "</div>" +
                                "</div>" +
                                "<div class='seven columns desktop'>" +
                                " <div class='station-population-wrapper'>" +
                                "<div class='station-population animate-width' data-limit=" + selectedStationsHoursFancyBox[i].StationCapacityPercentAge + "'></div>" +
                                "</div>" +
                                "</div>" +
                                " </a>" +
                                " </li>");
                        else
                            $("#mobileStationFancyBox").append("<li> " +
                                "<a href='javascript:void(0)' onclick='selectStation(" + selectedStationsHoursFancyBox[i].StationID + ",\"" + selectedStationsHoursFancyBox[i].StationName + "\",\"" + selectedStationsHoursFancyBox[i].AppointmentDate + "\"); return false;'>" +
                                "<div class='four columns station-title-wrapper semi-col'>" +
                                "<div class='station-title'>" + selectedStationsHoursFancyBox[i].AppointmentDate + "</div>" +
                                "</div>" +
                                "<div class='four columns station-date-wrapper semi-col'>" +
                                "<div class='station-title'>" + location + "</div>" +
                                "</div>" +
                                "<div class='seven columns desktop'>" +
                                " <div class='station-population-wrapper'>" +
                                "<div class='station-population animate-width' data-limit=" + selectedStationsHoursFancyBox[i].StationCapacityPercentAge + "'></div>" +
                                "</div>" +
                                "</div>" +
                                " </a>" +
                                " </li>");
                    }
                }
            }
            animateWidth2();
        },
        beforeClose: function() {
            $("html").removeClass("fancybox-body");
        }
    });
}

var map = null;
var markers = [];
var infoWindows = [];
var coords = [];
var markerClusterer = null;

function map_init(lat, lng, element, data) {
    //console.log("map showed");
    var myLatlng = new google.maps.LatLng(lat, lng);
    var documentWidth = $(document).width();
    var isDraggable;
    if (documentWidth > 480) {
        isDraggable = true;
    } else {
        isDraggable = false;
    }
    var options = {
        zoom: 10,
        center: new google.maps.LatLng(lat, lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: true,
        disableDefaultUI: false,
        draggable: isDraggable,
        maxZoom: 21,
        minZoom: 3,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        panControl: true,
        panControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        }
    };
    var map = new google.maps.Map(document.getElementById(element), options);

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(myLatlng);
        var isDraggable;
        if (documentWidth > 480) {
            isDraggable = true;
        } else {
            isDraggable = false;
        }
        map.setOptions({
            draggable: isDraggable
        })
    });

    $.each(data, function(index, dataSet) {

        var latLng = new google.maps.LatLng(dataSet.longitude, dataSet.latitude),
            title = "TÜVTÜRK Araç Muayene İstasyonu - " + dataSet.CityAndStation;
        //address = dataSet.address,
        //hours = "hours",
        //phone = dataSet.phone,
        //partner = "TÜVTURK İSTANBUL TAŞIT MUAYENE İSTASYONLARI İŞLETİM A.Ş.",
        //services = dataSet.services;

        //var servicesHtml = "";
        //$.each(services, function (index, service) {
        //    servicesHtml += '<li>' + service.SERVICETYPE_NAME + '</li>';
        //});

        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: title,
            optimized: false
        });

        var icon = 'assets/images/pin.png';
        var size = new google.maps.Size(36, 36);
        var point = new google.maps.Point(36, 36);
        marker.setIcon(
            new google.maps.MarkerImage(
                icon,
                null,
                new google.maps.Point(0, 0),
                point,
                size
            )
        );

        var infobox = '';
        infobox = '<div class="infobox-wrapper">' +
            '<div class="infobox-detail">' +
            '<h1>' + title + '</h1>' +
            '</div>' +
            '</div>';


        var pixelOffset;
        if (documentWidth >= 960) {
            pixelOffset = new google.maps.Size(-480, -350);
        }
        if (documentWidth < 960 && documentWidth >= 767) {
            pixelOffset = new google.maps.Size(-384, -505);
        }
        if (documentWidth < 768 && documentWidth >= 479) {
            pixelOffset = new google.maps.Size(-215, -175);
        }
        if (documentWidth < 480 && documentWidth >= 300) {
            pixelOffset = new google.maps.Size(-155, -175);
        }

        var infoboxOptions = {
            content: infobox,
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-198, -146),
            zIndex: null,
            enableEventPropagation: false,
            infoBoxClearance: 0,
            closeBoxMargin: "20px 15px 0 0",
            closeBoxURL: "assets/images/close.png"
        };
        var ib = new InfoBox(infoboxOptions);

        infoWindows.push(ib);
        coords.push(latLng);
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
            infoWindows.forEach(function(el, ind) {
                el.close();
            });
            ib.close();

            ib.open(map, marker);

            map.setCenter(marker.getPosition());
            map.panTo(marker.getPosition());
            //map.panBy(480,0);
            //map.panBy(0,0);
        });

        google.maps.event.addListener(map, 'click', function() {
            ib.close();
        });

        google.maps.event.addDomListener(window, 'resize', function() {
            var pixelOffset;
            if (documentWidth >= 960) {
                pixelOffset = new google.maps.Size(-480, -350);
            }
            if (documentWidth < 960 && documentWidth >= 767) {
                pixelOffset = new google.maps.Size(-384, -505);
            }
            if (documentWidth < 768 && documentWidth >= 479) {
                pixelOffset = new google.maps.Size(-215, -175);
            }
            if (documentWidth < 480 && documentWidth >= 300) {
                pixelOffset = new google.maps.Size(-155, -175);
            }
            ib.setOptions({
                pixelOffset: pixelOffset
            });
        });
    });
}

function isAlpha(str) {
    return /^[a-zA-Z]+$/.test(str);
}

function IsEmail(email) {
    if (email == "")
        return true;
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function prevPage() {
    currentPage--;
    $.fn.fullpage.moveSectionUp();
    hideTransparentLoader();
}

function enableSubmit() {
    var submit = $(document).find("form input.submit");
    submit.attr("disabled", false);
    submit.prop("disabled", false);
    submit.removeProp("disabled");
    submit.removeAttr("disabled");
    submit.removeClass("disabled-submit");
}

function nextPage(loading) {
    if (checkAppointmentInfoData()) {
        if (loading) {
            $("#loader").fadeIn(250, function() {
                $.fn.fullpage.moveSectionDown();
                $("#loader").fadeOut(250);
                enableSubmit();
            });
        } else {
            $.fn.fullpage.moveSectionDown();
            enableSubmit();
        }
        hideTransparentLoader();
    }
}

function showNotification(text, page) {
    //var activeSection = $(document).find(".fp-section.active");
    //var content = activeSection.find(".slimScrollDiv,.fp-scrollable");

    $(".body").prepend("<div class=\"overlay\"></div>");

    $(".overlay").css({
        "position": "absolute",
        "width": $(document).width(),
        "height": $(document).height(),
        "z-index": 99999,
    }).fadeTo(0, 0.8);

    var notification = $(document).find(".notification");
    var notificationText = notification.find(".notification-text");
    //content.animate({scrollTop : "0px"},150);
    notificationText.text(text);

    if (page == "GeneralNotification")
        notification.stop(true, true).fadeIn(950, function() {
            clearNotifications(page);
        });
    else
        notification.stop(true, true).fadeIn(950, function() {
            clearNotifications(page);
        });


}

function clearNotifications(page) {
    //var activeSection = $(document).find(".fp-section.active");


    var notification = $(document).find(".notification");
    var notificationText = notification.find(".notification-text");
    if (page == "GeneralNotification")
        notification.fadeOut(3000, function() {
            notificationText.text("");
            nextPage();
            $(".overlay").remove();
        });
    //else if (page == "AppointmentDate" && muayeneTekrari == true)
    //    notification.fadeOut(2500, function () {
    //        notificationText.text("");
    //        setTimeout(function () {
    //            ListStationsHour(selectedStationId);
    //            if (cityHasCapacityForMt)
    //                changePage(9);
    //            $(".overlay").remove();
    //        }, 500);

    //    });
    else if (page == "VehicleNotification")
        notification.fadeOut(750, function() {
            notificationText.text("");
            showNotification("Buraya tıklayarak istediğiniz alanı değiştirebilirsiniz", "GeneralNotification");
        });
    else
        notification.fadeOut(750, function() {
            notificationText.text("");
            if (activeAppointment && page == "ServiceType")
                changePage(5);
            else
                nextPage();
            $(".overlay").remove();
        });
}

function changePageViaHeader(page) {
    currentPage = page;
    if (page == 1 && AppointmentInfo != null)
        AppointmentInfo.isEdit = false;
    if (page == 1 && document.getElementById("plaka-no").className == "disabled")
        return;
    if (page == 3 && document.getElementById("muayene-ucreti").className == "disabled")
        return;
    if (page == 5 && document.getElementById("randevu-tarih").className == "disabled") // değiştir
        return;
    if (page == 7 && document.getElementById("randevu-istasyon").className == "disabled")
        return;
    if (page == 8 && document.getElementById("randevu-saat").className == "disabled")
        return;
    else {
        if ($("body").hasClass("nav_open")) {
            $("body").removeClass("nav_open");
        }
        $.fn.fullpage.moveTo(page);
        hideTransparentLoader();
    }
}

function changePage(page) {
    if ($("body").hasClass("nav_open")) {
        $("body").removeClass("nav_open");
    }
    currentPage = page;
    $.fn.fullpage.moveTo(page);
}

function checkClick() {
    var end = moment(new Date());
    var duration = moment.duration(end.diff(currenctTimeWithMS));
    var seconds = duration.asSeconds();

    //var d = new Date();
    if ((seconds) < 1) {
        return false;
    } else {
        currenctTimeWithMS = moment(new Date());
        return true;
    }
}

// Shows a transparent version of the #loader div to block
// user interaction whilst screen transition to prevent passing
// multiple screens by clicking the same button multiple times.
function showTransparentLoader(pageIndex) {

    var h = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    var $transparentLoader = $("#transparent-loader");
    var pushTop = h * pageIndex;
    $transparentLoader.css('top', pushTop);
    $transparentLoader.fadeIn();
}

function hideTransparentLoader() {
    $("#transparent-loader").fadeOut();
};


function selectVehicle(type, typeText, vehicleType, channelType) {
    $.ajax({
            url: "Service/Appointment.asmx/GetVehicleTypeInfo",
            data: JSON.stringify({
                vehicleTypeId: vehicleType
            }),
            async: false,
            contentType: 'application/json',
            dataType: 'json',
            type: "POST"
        })
        .fail(function(data) {
            selectVehicleCallBack(type, typeText, vehicleType, channelType);
        })
        .done(function(response) {
            response = JSON.parse(response.d);
            //console.log(response);
            vhInfo = response.Data;
            aya_active = vhInfo.AYA_ACTIVE;

            selectVehicleCallBack(type, typeText, vehicleType, channelType, aya_active);


        });
}


function selectVehicleCallBack(type, typeText, vehicleType, channelType, aya_active) {

    showTransparentLoader(Pages.SelectVehicle);
    //console.log("Vehicle Selected");

    //text class name ile aynı
    //AppointmentInfo.selectedVehicleType = parseInt(getSelectedVehicleType(typeText));

    if (checkClick()) {

        AppointmentInfo.selectedVehicleType = parseInt(vehicleType);
        AppointmentInfo.selectedVehicleTypeText = typeText;
        //AppointmentInfo.selectedChannelType = parseInt(getSelectedChannelType(typeText));
        AppointmentInfo.selectedChannelType = channelType;
        AppointmentInfo.aya_active = aya_active;

        $("#summaryVehicleType").html(typeText);
        text = typeText;

        if (aya_active) {
            if (AppointmentInfo.VehicleEgmAya > 0) {
                $("#txtVehicleAya").val(AppointmentInfo.VehicleEgmAya);
            }
            changePage(25);
        } else {
            setAvailableServices(typeText);
        }
    }
}

var price = 0;

function selectService(type, typeText) {
    showTransparentLoader(Pages.SelectService);
    if (checkClick()) {
        //console.log("service type selected");
        var text = typeText;
        $("#summaryServiceType").html(typeText);

        // type ile servis tipleri aynı
        if (type == 1 && AppointmentInfo.selectedServiceType == 4)
            type = 4;
        AppointmentInfo.selectedServiceType = type;
        AppointmentInfo.selectedServiceTypeText = typeText;
        if (type == 5) // Tadilat Muayenesi
        {
            $("#NotificationForServiceType_TM").show();
        } else {
            $("#NotificationForServiceType_TM").hide();
        }

        if (type == 6) // Tesbit Muayenesi
        {
            $(".hasDebt").hide();
        } else {
            if (AppointmentInfo.hasDebt)
                $(".hasDebt").show();
            else $(".hasDebt").hide();
        }

        getPrice();

        if (AppointmentInfo.cost == -1) {
            text = "Ücret hesaplanamadı";
            $("#summaryServiceCost").html("0 TL");
        } else {
            $("#summaryServiceCost").html(AppointmentInfo.cost + " TL");
            text = text + " " + AppointmentInfo.cost + " TL";
        }
        getAvailableAppointmentDates(getCurrentDay());
        showNotification(text, "ServiceType");

        setTimeout(function() {
            changeBreadcrumbs("muayene-ucreti", ("<img src='assets/images/tl-icon.png' class='tl-icon' />" + AppointmentInfo.cost), true, !mtRight);
        }, 2000);

    }
}

function selectLastExamDate(date) {
    //console.log("last exam date selected");
    showTransparentLoader(Pages.SelectLastExamDate);

    if (checkClick()) {
        var dateText = moment(date).format('D MMMM YYYY');
        AppointmentInfo.expireDate = moment(date).format('DD.MM.YYYY');
        $("#sonMuayeneGecerlilik").text(moment(date).format('DD.MM.YYYY'));
        getLateFee();
        var text = dateText;
        showNotification(text);
    }
}

function setAppointmentDate(date) {
    //console.log("appointment date selected");

    showTransparentLoader(Pages.SelectAppointmentDate);
    if (checkClick()) {
        var dateText = moment(date).format('D MMMM YYYY');
        var dateNumber = moment(date).format('DD.MM.YYYY');
        AppointmentInfo.appointmentDate = dateNumber;
        AppointmentInfo.selectedStationId = null;
        $("#summaryAppointmentDate").html(dateNumber + "<br/>" + moment(date.replace(/\-/g, '/')).format("dddd"));
        var text = dateText;

        changeDayStations();
        listGetOccupancyItem(true);

        if (mtRight && moment(MT_RIGHT_DATE, "YYYY/MM/DD").diff(moment(date), 'days') < 0) {
            muayeneTekrari = false;
            mtRight = false;
            getPrice();
        } else if (!mtRight && moment(MT_RIGHT_DATE, "YYYY/MM/DD").diff(moment(date), 'days') >= 0) {
            muayeneTekrari = true;
            mtRight = true;
            getPrice();
        }

        if (AppointmentInfo.cost == -1) {
            $("#summaryServiceCost").html("0 TL");
        } else {
            $("#summaryServiceCost").html(AppointmentInfo.cost + " TL");
        }
        changeBreadcrumbs("muayene-ucreti", ("<img src='assets/images/tl-icon.png' class='tl-icon' />" + AppointmentInfo.cost), true, !mtRight);

        showNotification(text, "AppointmentDate");
        if (muayeneTekrari)
            changeBreadcrumbs("randevu-istasyon", AppointmentInfo.selectedStationName, true, false);
    }
    changeBreadcrumbs("randevu-tarih", dateNumber, true, true);

}

function setIstanbulTab() {

    //    $("#ddlCity").val("1:1:34");
    //else $("#ddlCity").val('2:1:34');

    listGetOccupancyItem(true);
}

function appendAddedAppointmentInfo(addedAppointmentInfo) {

    if (addedAppointmentInfo === undefined)
        return;

    var appointmentTime = addedAppointmentInfo.APP_TIME.toString();
    appointmentTime = appointmentTime.toString().length == 1 ? "0" + appointmentTime.toString() : appointmentTime.toString();

    var appointmentMin = addedAppointmentInfo.APP_MIN.toString();
    appointmentMin = appointmentMin.toString().length == 1 ? "0" + appointmentMin.toString() : appointmentMin.toString();

    $("#summaryPlateNo").html(addedAppointmentInfo.LICENSE_PLATE);
    $("#summaryVehicleType").html(addedAppointmentInfo.VEHICLETYPE_NAME);
    $("#summaryServiceType").html(addedAppointmentInfo.SERVICETYPE_NAME);
    $("#summaryAppointmentDate").html(moment(addedAppointmentInfo.APP_DATE.substring(0, 10)).format("DD.MM.YYYY") + "<br/>" + moment(addedAppointmentInfo.APP_DATE.substring(0, 10).replace(/-/g, '/')).format("dddd"));
    $("#summaryStation").html(addedAppointmentInfo.CITY_NAME + " - " + addedAppointmentInfo.STATION_NAME);
    if (addedAppointmentInfo.SMS_BITLYLINK != null && addedAppointmentInfo.SMS_BITLYLINK != "")
        $("#station_bitlylink").html("<a href='" + addedAppointmentInfo.SMS_BITLYLINK + "' target='_blank' class='button-text white-green'>YOL TARİFİ</a>");
    else
        $("#station_bitlylink").html("<a href='http://tuvturkistasyonlari.com/' target='_blank' class='button-text white-green'>YOL TARİFİ</a>");


    if (addedAppointmentInfo.APP_TIME.toString().length == 1)
        addedAppointmentInfo.APP_TIME = "0" + addedAppointmentInfo.APP_TIME.toString();

    if (addedAppointmentInfo.APP_MIN.toString().length == 1)
        addedAppointmentInfo.APP_MIN = addedAppointmentInfo.APP_MIN.toString() + "0";

    $("#summaryAppointmentHour").html(addedAppointmentInfo.APP_TIME + ":" + addedAppointmentInfo.APP_MIN);
    AppointmentInfo.appointmentTime = addedAppointmentInfo.APP_TIME + ":" + addedAppointmentInfo.APP_MIN;
    setAppointmentApproveFormHtml();

    $("#vehicleUl1 li[data-vehicle='" + addedAppointmentInfo.VEHICLETYPE_ID + "']").addClass("selected");
    $("#ulServices li[data-service='" + addedAppointmentInfo.SERVICETYPE_ID + "']").addClass("selected");
    $("#txtGsm").val(addedAppointmentInfo.MOBILE_NUMBER);
    $("#txtEmail").val(addedAppointmentInfo.EMAIL);
    $("#txtTckNo").val(addedAppointmentInfo.IDENTITY_NUMBER);
    var nameSurname = addedAppointmentInfo.NAME_SURNAME.split(' ');
    $("#txtSurname").val(nameSurname.pop());
    var name = nameSurname.join(' ');
    $("#txtName").val(name);
    $("#cancel-name").html(name + ' ' + nameSurname.pop());
    AppointmentInfo.CityID = addedAppointmentInfo.CITY_ID;
    AppointmentInfo.selectedStationId = addedAppointmentInfo.STATION_ID;
    selectedStationId = addedAppointmentInfo.STATION_ID;
    AppointmentInfo.selectedVehicleType = addedAppointmentInfo.VEHICLETYPE_ID;
    AppointmentInfo.selectedVehicleTypeText = $("#vehicleUl1 li[data-vehicle='" + addedAppointmentInfo.VEHICLETYPE_ID + "']").data('name');
    AppointmentInfo.selectedChannelType = 1;
    AppointmentInfo.selectedServiceType = addedAppointmentInfo.SERVICETYPE_ID;
    AppointmentInfo.plateNo = addedAppointmentInfo.LICENSE_PLATE;
    AppointmentInfo.appointmentDate = moment(addedAppointmentInfo.APP_DATE.substring(0, 10)).format("DD.MM.YYYY");
    AppointmentInfo.selectedStationName = addedAppointmentInfo.STATION_NAME;
    AppointmentInfo.CITY_NAME = addedAppointmentInfo.CITY_NAME;
    AppointmentInfo.IsOver65Ages = $("#is_over_65_agesTrue").is(':checked');

    AppointmentInfo.VehicleAya = addedAppointmentInfo.VEHICLE_AYA;
    AppointmentInfo.VehicleEgmAya = addedAppointmentInfo.VEHICLE_EGM_AYA;
    AppointmentInfo.VehicleBrakeType = addedAppointmentInfo.VEHICLE_BRAKE_TYPE;

    if (addedAppointmentInfo.EXPIRE_DATE_Of_LAST_VEHICLE_INSPECTION != null) {
        AppointmentInfo.expireDate = moment(addedAppointmentInfo.EXPIRE_DATE_Of_LAST_VEHICLE_INSPECTION.substring(0, 10)).format("DD.MM.YYYY");
        $("#sonMuayeneGecerlilik").text(AppointmentInfo.expireDate);
    }
    getPrice();
    getLateFee();

    $("#summaryServiceCost").html(AppointmentInfo.cost + " TL");

    $('[placeholder]').each(function() {
        var val = $(this).val();
        var label = $(this).parents("label");
        if (val == "") {
            label.find(".placeholder-wrap").show();
        } else {
            label.find(".placeholder-wrap").hide();
        }
    });

}

function setServiceType(serviceType, serviceTypeText) {
    if (serviceType == 1) {
        AppointmentInfo.CityID = $("#ddlCity").val();
    } else {
        checkIstanbulTabActive();
    }

    AppointmentInfo.selectedServiceType = serviceType;
    AppointmentInfo.selectedServiceTypeText = serviceTypeText;
    $("#summaryServiceType").html(serviceTypeText);

    if (serviceType == 5) // Tadilat Muayenesi
    {
        $("#NotificationForServiceType_TM").show();
    } else {
        $("#NotificationForServiceType_TM").hide();
    }

    if (serviceType == 6) // Tesbit Muayenesi
    {
        $(".hasDebt").hide();
    } else {
        if (AppointmentInfo.hasDebt)
            $(".hasDebt").show();
        else $(".hasDebt").hide();
    }
    getPrice();

    if (AppointmentInfo.cost == -1) {
        serviceTypeText = "Ücret hesaplanamadı";
        $("#summaryServiceCost").html("0 TL");
    } else {
        changeBreadcrumbs("muayene-ucreti", ("<img src='assets/images/tl-icon.png' class='tl-icon' />" + AppointmentInfo.cost), true, !mtRight);
        $("#summaryServiceCost").html(AppointmentInfo.cost + " TL");
        serviceTypeText = serviceTypeText + " " + AppointmentInfo.cost + " TL";
    }

    getAvailableAppointmentDates(getCurrentDay());

    if (serviceType == 4) {
        $("#showSimpleViewButton").hide();
        muayeneTekrari = true;
        var maxAppDateByERG = moment(MT_RIGHT_DATE, "yyyy/MM/dd").add('days', 0);
        var maxAppDate = moment($("#hdnDateAndTime").val().replace(/-/g, '/'), "yyyy/MM/dd").add('days', App.MaxDate);
        if (maxAppDateByERG < maxAppDate) {
            var duration = moment.duration(moment($("#hdnDateAndTime").val().replace(/-/g, '/'), "yyyy/MM/dd").diff(maxAppDateByERG));
            var days = duration.asDays();
            //$("#randevu-tarihi").datepicker('option', 'maxDate', days);
        }
        setVehiclesVisibilities();
    } else {
        //$("#randevu-tarihi").datepicker('option', 'maxDate', App.MaxDate);
        $("#showSimpleViewButton").hide();
        muayeneTekrari = false;
    }
    $("#appointmentDatePrevButton").html("<a href='javascript:void(0)' onclick='changePage(22); return false;' class='back-button large'>Geri</a>")
    changePage(5); // değiştir
}

function getLateFee() {
    if (AppointmentInfo.selectedServiceType == -1 || AppointmentInfo.expireDate == "" ||
        AppointmentInfo.appointmentDate == "") {
        jAlert("Randevu alımı sırasında hata oluştu lütfen tekrar deneyiniz");
        window.location.href = "index.aspx";
    }
    $.ajax({
            url: "Service/Appointment.asmx/GetLateFee",
            data: JSON.stringify({
                plate: AppointmentInfo.plateNo,
                service: AppointmentInfo.selectedServiceType,
                date: AppointmentInfo.appointmentDate,
                expire: AppointmentInfo.expireDate,
                isOver65Ages: AppointmentInfo.IsOver65Ages
            }),
            async: true,
            contentType: 'application/json',
            dataType: 'json',
            type: "POST",
            onresponse: {
                200: function(r) {
                    //console.log("late fee response");
                    if (r.Data)
                        elementWarn("#txtExpire", r.Data);
                }
            }
        })
        .fail(function() {
            AppointmentInfo.latefee = undefined;
        })
        .done(function(response) {
            response = JSON.parse(response.d);
            //console.log(response);
            if (response.Status == 200) {
                AppointmentInfo.latefee = response.Data
                $("#lateFeeCost").html(response.Data.replace(",", ".") + " TL");

                var num = (parseFloat(response.Data.replace(",", ".")) + parseFloat(AppointmentInfo.cost.replace(",", ".")));
                $("#totalCost").html(num.toFixed(2) + " TL");
            } else {
                AppointmentInfo.latefee = undefined;
            }

        });
}

function changeDayStations() {

    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
    var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + fullDate.getDate();

    //console.log(currentDate);

    var appointmentDate = AppointmentInfo.appointmentDate.split('.');
    appointmentDateInfo = appointmentDate[2] + "-" + appointmentDate[1] + "-" + appointmentDate[0];

    $("#changeDayStations").children().remove();

    $("#changeDayStations").append("<div class='daypicker' id='daypickerDataToday' data-today=" + currentDate + ">");
    $("#daypickerDataToday").append("<a class='change-date prev' onclick=changeDay('prev');></a>");
    $("#daypickerDataToday").append("<a class='change-date next' onclick=changeDay('next');></a>");
    $("#daypickerDataToday").append("<div class='day-detail' data-date=" + appointmentDateInfo + " data-date-service=" + AppointmentInfo.appointmentDate + ">" +
        moment(appointmentDateInfo).format('D MMMM YYYY') + "</div>");
    $("#changeDayStations").append("</div>");
}

function selectStation(stationtID, stationName, appointmentDate, stationID) {

    showTransparentLoader(Pages.SelectStation);
    if (checkClick()) {
        //console.log("station selected");
        if (stationtID == 0) {
            return false;
        }
        var note = stationName;
        showNotification(note);
        selectedStationId = stationtID;
        AppointmentInfo.selectedStationId = stationtID;
        AppointmentInfo.selectedStationName = stationName;

        //if (AppointmentInfo.CITY_NAME == "")
        $("#summaryStation").html((muayeneTekrari == true ? AppointmentInfo.CITY_NAME : $("#ddlCity option:selected").text()) + " <br/> " + stationName);
        getStationsSMS_BITLYLINK(selectedStationId);

        //else
        //    $("#summaryStation").html(AppointmentInfo.CITY_NAME + " <br/> " + stationName);

        getStationsPeriodMinute();

        if (appointmentDate != undefined) {
            AppointmentInfo.appointmentDate = appointmentDate;

            //$("#summaryAppointmentDate").html(appointmentDate + "<br/>" + moment(appointmentDate).format("dddd"));
            setSummaryAppointmentDate(appointmentDate);
            ListStationsHour(stationtID);
            changeBreadcrumbs("randevu-istasyon", (stationName), true, true);
            changeBreadcrumbs("randevu-tarih", appointmentDate, true, true);
        }
        $.fancybox.close();
    }
}

function getStationsPeriodMinute() {
    $.ajax({
            data: JSON.stringify({
                stationID: AppointmentInfo.selectedStationId
            }),
            type: "POST",
            url: "Service/Appointment.asmx/GetStationsPeriodMinute",
            contentType: 'application/json',
            dataType: 'json',

            onresponse: {
                200: function(r) {}
            }
        })
        .fail(function() {})
        .done(function(response) {
            response = JSON.parse(response.d);
            stationsPeriodMinute = response.Data[0].APPOINTMENT_PERIOD;
        });

}

function getStationsSMS_BITLYLINK(stationId) {
    $.ajax({
            data: JSON.stringify({
                stationID: stationId
            }),
            type: "POST",
            url: "Service/Appointment.asmx/GetStationsSMS_BITLYLINK",
            contentType: 'application/json',
            dataType: 'json',

            onresponse: {
                200: function(r) {}
            }
        })
        .fail(function() {})
        .done(function(response) {
            response = JSON.parse(response.d);
            SMS_BITLYLINK = response.Data;
        });

}

function getConfigValues() {
    $.ajax({
            //data: JSON.stringify({}),
            type: "POST",
            url: "Service/Appointment.asmx/GetConfigValues",
            contentType: 'application/json',
            dataType: 'json',

            onresponse: {
                200: function(r) {}
            }
        })
        .fail(function() {})
        .done(function(response) {
            response = JSON.parse(response.d);
            AppMaximumDay = response.Data.AppMaximumDay;
            InspectionControlDayCount = response.Data.InspectionControlDayCount;
        });

}

function setAppointmentApproveFormHtml() {
    var appointmentHour = AppointmentInfo.appointmentTime.split(':');
    var hour = parseFloat(appointmentHour[0] + '' + appointmentHour[1]);
    hour = Math.floor(hour / 100) * 60 + hour % 100;
    $("#sonSaat").text(getHourString(hour + 15));

    if (selectedStationId > 0) {
        getStationsSMS_BITLYLINK(selectedStationId);
        if (SMS_BITLYLINK != null && SMS_BITLYLINK != "")
            $("#station_bitlylink").html("<a href='" + SMS_BITLYLINK + "' target='_blank' class='button-text white-green'>YOL TARİFİ</a>");
        else
            $("#station_bitlylink").html("<a href='http://tuvturkistasyonlari.com/' target='_blank' class='button-text white-green'>YOL TARİFİ</a>");
    }

    //$("#reminderContent1").find(".zaman").text(getHourString(hour - 10));
    //$("#reminderContent1").find(".zamanNot").text(getHourString(hour + 15));
    //$("#reminderContent2").find(".zamanNot").text(getHourString(hour) + " - " + getHourString(hour + stationsPeriodMinute));
    //$("#reminderContent3").find(".zamanNot").text(getHourString(hour + 90));
}

function getHourString(totalminute) {

    if (totalminute < 0)
        totalminute += 1440;
    else if (totalminute > 1440)
        totalminute -= 1440;

    var hour = Math.floor(totalminute / 60);
    var min = totalminute % 60;

    return pad(hour, 2) + ':' + pad(min, 2);
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function selectHours(hour, changeSelectedStation, stationName, appointmentDate, stationID) {

    showTransparentLoader(Pages.SelectHours);
    if (checkClick()) {

        if (AppointmentInfo.appointmentDate != appointmentDate && appointmentDate != undefined) {
            AppointmentInfo.appointmentDate = appointmentDate;
            //$("#summaryAppointmentDate").html(appointmentDate + "<br/>" + moment(appointmentDate).format("dddd"));
            setSummaryAppointmentDate(appointmentDate);
            changeBreadcrumbs("randevu-tarih", appointmentDate, true, true);
        }

        //console.log("Suggessted hour selected");
        var text = hour;
        getLateFee();

        AppointmentInfo.appointmentTime = hour;
        $("#summaryAppointmentHour").html(hour);
        setAppointmentApproveFormHtml();
        changeBreadcrumbs("randevu-saat", hour, true, true);

        if (changeSelectedStation == true) {
            if (stationID != undefined) {
                AppointmentInfo.selectedStationName = stationName;
                AppointmentInfo.selectedStationId = stationID;
                selectedStationId = stationID;
            }
            changeBreadcrumbs("randevu-istasyon", (stationName), true, true);


            if (!muayeneTekrari)
                $("#summaryStation").html($("#ddlCity option:selected").text() + " <br/> " + stationName);

            else
                $("#summaryStation").html(AppointmentInfo.CITY_NAME + " <br/> " + stationName);
        }
        //if (mtRight == true) {

        //    changePage(19);
        //}
        //else
        changePage(19);

        return false;
    }
}

function goToPage(text) {
    if (setLpgQuestionVisibility() == true && text != undefined)
        showNotification(text, 11);
    else if (setLpgQuestionVisibility() == true && text == undefined)
        changePage(11);


    else if (setLpgQuestionVisibility() == false && text != undefined)
        showNotification(text, 12);
    else if (setLpgQuestionVisibility() == false && text == undefined)
        changePage(12);
}

function changeBreadcrumbs(id, value, status, enabled) {
    var delay = 0;
    if (status == true) {
        delay = 1400;
    }
    setTimeout(function() {
        var breadcrumbs = $(document).find("#breadcrumbs");
        var item = breadcrumbs.find("li#" + id);

        if (status == true) {
            item.find(".breadcrump-detail").html(value);
            if (enabled != false)
                item.removeClass("disabled");
        } else {
            item.find(".breadcrump-detail").text("Seçilmedi");
            item.addClass("disabled");
        }
    }, delay);
}

function inputControl(input) {
    //var acceptNotificationSMS = $("#acceptNotificationSMS").is(':checked');
    var val = input.val();
    var fieldset = input.parents("fieldset");
    var alert = fieldset.find(".alert");
    var className;
    if (input.hasClass("required")) {
        className = "error";
    } else {
        className = "wrong";
    }

    fieldset.removeClass(className);
    if (input.hasClass("required") && val.length == 0) {
        alert.text("Lütfen Doldurunuz");
        fieldset.addClass(className);
    }
    if (input.hasClass("email") && !IsEmail(val)) {
        alert.text("E-Posta giriniz");
        fieldset.addClass(className);
    }

    if (input.hasClass("arac-plaka")) {
        var char0_2 = val.slice(0, 2);
        var char2_3 = val.slice(2, 3);
        var lastChar = val.substr(val.length - 2);

        if (
            $.isNumeric(val) // tamamen rakamsa durdur
            ||
            isAlpha(val) // tamamen yazıysa durdur
            ||
            !$.isNumeric(char0_2) // ilk iki karakter rakam değilse durdur
            ||
            !$.isNumeric(lastChar) // son iki karakter rakam değilse durdur
            ||
            $.isNumeric(char2_3) // il kodundan sonraki harf rakamsa durdur
            ||
            val.indexOf(" ") > -1 // aralarında boşluk varsa durdur
            ||
            val.indexOf("-") > -1 // aralarında tire işareti varsa durdur
        ) {
            fieldset.addClass(className);
        }
    }

    if (input.hasClass("arac-ruhsat")) {
        var val = $("#txtSerial").val();
        if (!/^[a-zA-Z0-9]{6,8}$/.test(val)) {

            fieldset.addClass(className);
            alert.text("Ruhsat Seri ve No Girmelisiniz.").show();
            valid = false;
        }
    }
}

function checkAppointmentIDSessionStatus() {
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        url: "Service/Appointment.asmx/IsZmtValid",
    }).done(function(response) {
        response = JSON.parse(response.d);
        AppointmentInfo.temporaryAppointment = response.Data;
    });
}

function formControl() {

    hoverToTextbox();
    var inputs = $('#form').find("input.required");
    var selects = $('#form').find("select.required");
    var valid = true;
    event.preventDefault();

    inputs.each(function(index, input) {
        input = $(input);
        var val = input.val();

        var fieldset = input.parents("fieldset");
        var alert = fieldset.find(".alert");
        var className;
        if (input.hasClass("required")) {
            className = "error";
        } else {
            className = "wrong";
        }

        fieldset.removeClass(className);

        if (input.hasClass("required") && val.length == 0) {
            fieldset.addClass(className);
            if (input.hasClass("captcha_css")) {
                alert.text("Lütfen resimdeki kodu giriniz");
            } else {
                alert.text("Lütfen doldurunuz");
            }
            valid = false;
        }
        if (input.hasClass("email") && !IsEmail(val)) {
            fieldset.addClass(className);
            alert.text("E-Posta giriniz");
            valid = false;
        }
        if (input.hasClass("arac-plaka")) {
            var char0_2 = val.slice(0, 2);
            var char2_3 = val.slice(2, 3);
            var lastChar = val.substr(val.length - 2);
            var char2_6 = val.slice(2, 6);

            if (val == "") {
                fieldset.addClass(className);
                $('#alertPlate').show();
                alert.text("Lütfen plaka giriniz.");
                valid = false;
            } else if (
                ($.isNumeric(val) && $.isNumeric(char2_3)) // tamamen rakamsa durdur
                ||
                isAlpha(val) // tamamen yazıysa durdur
                ||
                !$.isNumeric(char0_2) // ilk iki karakter rakam değilse durdur
                ||
                !$.isNumeric(lastChar) // son iki karakter rakam değilse durdur
                ||
                $.isNumeric(char2_3) // il kodundan sonraki harf rakamsa durdur
                ||
                val.indexOf(" ") > -1 // aralarında boşluk varsa durdur
                ||
                val.indexOf("-") > -1 // aralarında tire işareti varsa durdur
                ||
                val.length < 7 // eğer en az 7 karakter girilmemişse durdur
                ||
                val.length > 8 // eğer en fazla 9 karakter girilmemişse durdur
                ||
                isAlpha(char2_6)
            ) {
                fieldset.addClass(className);
                $('#alertPlate').show();
                alert.text("Yanlış plaka girdiniz.");
                valid = false;
            }
        }

        if (input.hasClass("arac-ruhsat")) {
            var val = $("#txtSerial").val();
            if (!/^[a-zA-Z0-9]{6,8}$/.test(val)) {

                fieldset.addClass(className);
                alert.text("Ruhsat Seri ve No Girmelisiniz.").show();
                valid = false;
            }
        }
    });
    selects.each(function(index, select) {
        select = $(select);
        var val = select.val();
        var fieldset = select.parents("fieldset");
        var alert = fieldset.find(".alert");

        fieldset.removeClass("error");
        if (val.length == 0) {
            fieldset.addClass("error");

            $('#alertError').show();
            alert.text("Lütfen şehir seçiniz.");
            valid = false;
        }
    });

    if (valid) {
        $('#submit').attr("disabled", true);

        $("#txtPlate").val($("#txtPlate").val().split(" ").join(""));
        AppointmentInfo.plateNo = $("#txtPlate").val();
        $(".one-third columns center").fadeIn("slow");
        $("#controlPlaka").show();

        $("#loader").fadeIn();

        var promise = checkSerial();

        promise.then(function(r) {

            if (AppointmentInfo.SerialMatch) {
                // check if incomplete appointment exists
                var promise = checkIfIncompleteAppExist();
                promise.then(function(r) {
                    checkMtRight();
                    if (r == 0) { // NotActiveAppointment
                        mtRight = false;

                        $('#alertError').hide();
                        checkPlateDebt();
                        changeBreadcrumbs("plaka-no", $("#txtPlate").val(), true, true);
                        checkAppointmentIDSessionStatus();
                    } else if (r == 1) { // Ticket Printed
                        jAlert(App.Message.TicketPrintedWarningMessage);
                        $("#loader").fadeOut();
                        $("#submit").attr("disabled", false);

                    } else if (r == 2) { // Active Appointment
                        activeAppointment = true;
                        checkPlateDebt();
                        changeBreadcrumbs("plaka-no", $("#txtPlate").val(), true, true);
                    }
                });
            } else {
                $("#loader").fadeOut();
                $("#submit").attr("disabled", false);
            }

        });

        checkIstanbulTabActive();

    }
}

function checkIstanbulTabActive() {

    if ($("#ddlCity").val().split(":")[0] == "1") { // İstanbul Avrupa
        $(".istanbul-tab").show();
        $("#istAnd").closest('li').removeClass('active');
        $("#istAv").closest('li').addClass('active');
        setInstabulTabOrder();
    } else if ($("#ddlCity").val().split(":")[0] == "2") { //İstanbul Anadolu
        $(".istanbul-tab").show();
        $("#istAv").closest('li').removeClass('active');
        $("#istAnd").closest('li').addClass('active');
        setInstabulTabOrder();
    } else $(".istanbul-tab").hide();

}

function setInstabulTabOrder() {
    var elem = $(".istanbul-tab ul li.active");


    if (elem.index() != 0) {

        elem.parent("ul").prepend(elem);

    }
}

// check if serialno match with plate
function checkSerial() {
    var serialNo = "";
    var serial = document.getElementById('txtSerial');
    if (typeof(serial) != 'undefined' && serial != null) {
        serialNo = $("#txtSerial").val();
    }

    return $.Deferred(function(deferred) {
        $.ajax({
                data: JSON.stringify({
                    plate: AppointmentInfo.plateNo,
                    serial: serialNo
                }),
                type: "POST",
                url: "Service/Appointment.asmx/SerialControl",
                contentType: 'application/json',
                dataType: 'json'
            }).fail(function() {
                $("#loader").fadeOut();
            })
            .done(function(response) {
                response = JSON.parse(response.d);
                if (response == null || response.Data == null || response.Data.Matched == false) {

                    if (response.Status == 401) {
                        isRefresh = true;
                        location.reload();
                        return;
                    }

                    jAlert(response.Data.Message);
                    AppointmentInfo.SerialMatch = false;
                    deferred.resolve(AppointmentInfo.SerialMatch);
                } else {
                    if (response.Data.VehicleType != 0 && response.Data.VehicleType != null) {
                        AppointmentInfo.selectedVehicleType = response.Data.VehicleType;
                        $("#headerVehicleType").hide();
                        $("#headerVehicleTypeEGM").show();
                    } else {
                        AppointmentInfo.selectedVehicleType = 0;
                        $("#headerVehicleTypeEGM").hide();
                        $("#headerVehicleType").show();
                    }
                    setVehiclesVisibilities();

                    AppointmentInfo.SerialMatch = true;
                    AppointmentInfo.VehicleEgmAya = response.Data.VehicleAya;

                    deferred.resolve(AppointmentInfo.SerialMatch);


                }
            });
    });
}

// check if incomplete appointment exists
function checkIfIncompleteAppExist() {
    return $.Deferred(function(deferred) {
        $.ajax({
            data: JSON.stringify({
                plate: AppointmentInfo.plateNo
            }),
            type: "POST",
            url: "Service/Appointment.asmx/IsIncompleteAppExists",
            contentType: 'application/json',
            dataType: 'json'
        }).fail(function() {
            $("#loader").fadeOut();
            //alert("Plate control service fail");
            $('#submit').attr("disabled", false);
            return false;
        }).done(function(response) {
            deferred.resolve(JSON.parse(response.d));
        });
    });
}





function checkMtRight() {
    $.ajax({
            data: JSON.stringify({
                plate: AppointmentInfo.plateNo
            }),
            type: "POST",
            url: "Service/Appointment.asmx/IsMtAppExists",
            contentType: 'application/json',
            dataType: 'json'
        }).fail(function() {
            $("#loader").fadeOut();
            //alert("Plate control service fail");
            $('#submit').attr("disabled", false);
            //return false;
        })
        .done(function(response) {
            response = response.d;
            if (!(response == null || response.Data == null)) {
                response.Data = response.Data.replace(/\./g, '/');
                PB_ERG_DAT = response.Data;
                MT_RIGHT_DATE = response.QuestionData;
                mtRight = true;
                $(".hasInsurance").hide();
                //$("#insuranceDiv").attr('style', 'display: none !important');
                $("#mtHeader").html(moment(response.Data).format("D MMMM YYYY") + " tarihinde aracınız muayene tekrarına <br/> kalmıştır.");
            } else {
                $('#alertError').hide();
            }
        });
    return mtRight;
}

function checkPlateDebt() {
    // check plate debp
    $.ajax({
            data: JSON.stringify({
                plate: $("#txtPlate").val(),
                callDebt: callMinistry,
                vehicleType: AppointmentInfo.selectedVehicleType,
                serviceType: AppointmentInfo.selectedServiceType
            }),
            type: "POST",
            url: "Service/Appointment.asmx/PlateDebtControl",
            contentType: 'application/json',
            dataType: 'json'
        })
        .fail(function() {
            $("#loader").fadeOut();
            //alert("Plate control service fail");
            $('#submit').attr("disabled", false);
            //return false;
        })
        .done(function(response) {

            $("#loader").fadeOut();
            $("#summaryPlateNo").html($("#txtPlate").val());
            response = JSON.parse(response.d);
            if (response["Success"] == false) {
                $('#alertError').html("Unexpected error (" + response["Status"] + ")");
                $('#alertError').show();
                $('#submit').attr("disabled", false);
                //return false;
            } else {
                if (!(response["Data"] == null || response["Data"] == "")) {
                    $("#plateDebt").html(response["Data"]);
                    $("#headerDebt").html(response["HeaderDebt"]);
                    AppointmentInfo.headerDebt = response["HeaderDebt"];
                    if (response["HeaderDebt"] == 'Plakaya ait borç yoktur' || AppointmentInfo.selectedServiceType == 5) {
                        $("#headerDebt1").hide();
                    }
                    $("#summaryDebtData").html(response["Data"]);
                    $("#summaryDebtHeader").html(response["HeaderDebt"]);
                    AppointmentInfo.summaryDebtData = response["Data"];

                    $("#insuranceControl").html(response["DataInsuranceControl"]);
                    $("#summaryInsuranceData").html(response["DataInsuranceControl"]);
                    $("#headerInsurance").html(response["HeaderInsuranceControl"]);
                    $("#summaryInsuranceHeader").html(response["HeaderInsuranceControl"]);

                    //has debt control
                    if (response["HasDebt"] != null && response["HasDebt"] == true && mtRight == false)
                        $(".hasDebt").show();
                    else $(".hasDebt").hide();

                    AppointmentInfo.hasDebt = response["HasDebt"];
                    AppointmentInfo.hasInsurance = response["HasInsurance"];

                    if (AppointmentInfo.hasDebt) {
                        $("#continuewithgmbtn").hide();
                        $("#continuewithgmbtn").removeClass("inline-block");
                    } else {
                        $("#continuewithgmbtn").show();
                        $("#continuewithgmbtn").addClass("inline-block");
                    }

                    if ((AppointmentInfo.hasInsurance != null && AppointmentInfo.hasInsurance == true) ||
                        App.Config.InsurancePayButton == "0" || mtRight)
                        $(".hasInsurance").hide();
                    else $(".hasInsurance").show();

                    AppointmentInfo.CityID = $("#ddlCity").val();

                    if (activeAppointment || mtRight)
                        changePage(4);
                    else
                        nextPage(false);
                }
                $("#submit").val("DEVAM");
                $("#submit").addClass("nextPage");
                $('#submit').attr("disabled", false);
                $("#loader").fadeOut();
                return true;
            }
        });
}

function marqueeFunction() {
    $('.newsMarquee').marquee('pointer').mouseover(function() {
        $(this).trigger('stop');
    }).mouseout(function() {
        $(this).trigger('start');
    }).mousemove(function(event) {
        if ($(this).data('drag') == true) {
            this.scrollLeft = $(this).data('scrollX') + ($(this).data('x') - event.clientX);
        }
    }).mousedown(function(event) {
        $(this).data('drag', true).data('x', event.clientX).data('scrollX', this.scrollLeft);
    }).mouseup(function() {
        $(this).data('drag', false);
    });
}

function changeDebtPage() {
    checkAppointmentIDSessionStatus();
    $("#appointmentDateMaxDaysDescription").html("<h3>Hatırlatma : En fazla " + AppMaximumDay + " gün ileri tarihe randevu alabilirsiniz.</h3><h3>Plakanızın son muayene tarihi TÜVTÜRK muayene kayıtlarından kontrol edilecek olup, son muayene tarihinizden en erken " + InspectionControlDayCount + " güne kadar randevu alabilirsiniz.</h3>");
    if (activeAppointment == true && AppointmentInfo.isEdit != true) {
        getAppointmentDetailInsertDate();
        changePage(21);

    } else if (mtRight == true) {
        getAppointmentDetail();
        changePage(22);
        marqueeFunction();

    } else if (AppointmentInfo.temporaryAppointment) {
        AppointmentInfo.plateNo = $("#txtPlate").val();
        AppointmentInfo.appointmentDate = localStorage.getItem("AppDate");
        AppointmentInfo.expireDate = localStorage.getItem("AppexpireDate");
        AppointmentInfo.appointmentTime = localStorage.getItem("AppTime");
        setAppointmentApproveFormHtml();
        selectedStationId = localStorage.getItem("AppStation");
        AppointmentInfo.CityID = localStorage.getItem("AppCity");

        document.getElementById('txtName').value = localStorage.getItem("AppName");
        document.getElementById('txtSurname').value = localStorage.getItem("AppSurnanme"),
            document.getElementById('txtGsm').value = localStorage.getItem("AppGsm"),
            document.getElementById('txtTckNo').value = localStorage.getItem("AppTckNo"),

            AppointmentInfo.selectedStationName = localStorage.getItem("AppStationName");
        AppointmentInfo.stationType = localStorage.getItem("AppStationType");
        AppointmentInfo.selectedStationId = localStorage.getItem("AppStation");
        $("#summaryAppointmentHour").html(AppointmentInfo.appointmentTime);
        setSummaryAppointmentDate(AppointmentInfo.appointmentDate);

        $("#ddlCity").val(AppointmentInfo.CityID);

        $("#summaryStation").html($("#ddlCity option:selected").text() + " <br/> " + AppointmentInfo.selectedStationName);
        AppointmentInfo.isEdit = true;
        AppointmentInfo.appointmentID = localStorage.getItem("AppId");
        AppointmentInfo.Second = false;
        preAppoint();
        var promise = approveAppointment(false);
        getStationsSMS_BITLYLINK(selectedStationId);
        promise.then(function(r) {
            if (r == true) {
                setappointmentSuccessHeader();
                clearAppInfoStorage();
                changePage(20);
            }
        });

    } else changePage(5);
}

function checkAppointmentIDSessionStatus() {
    $.ajax({
        type: "POST",
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        url: "Service/Appointment.asmx/CheckAppointmentIDSessionStatus",
    }).done(function(response) {
        response = JSON.parse(response.d);
        AppointmentInfo.temporaryAppointment = response.Data;
    });
}

function setAppInfoStorage() {
    var mobile = document.getElementById('txtGsm').value;
    var name = document.getElementById('txtName').value;
    var surName = document.getElementById('txtSurname').value;
    var tckNo = document.getElementById('txtTckNo').value;
    localStorage.setItem("AppDate", AppointmentInfo.appointmentDate);
    localStorage.setItem("AppexpireDate", AppointmentInfo.expireDate);
    localStorage.setItem("AppTime", AppointmentInfo.appointmentTime);
    localStorage.setItem("AppStation", AppointmentInfo.selectedStationId);
    localStorage.setItem("AppCity", AppointmentInfo.CityID);
    localStorage.setItem("AppName", name);
    localStorage.setItem("AppSurnanme", surName);
    localStorage.setItem("AppGsm", mobile);
    localStorage.setItem("AppTckNo", tckNo);
    localStorage.setItem("AppStationType", AppointmentInfo.stationType);
    localStorage.setItem("AppStationName", AppointmentInfo.selectedStationName);
    // localStorage.setItem("AppPlate", AppointmentInfo.plateNo)


}

function clearAppInfoStorage() {
    localStorage.removeItem("AppDate");
    localStorage.removeItem("AppId");

}
var addedAppointmentInfo;
var clickednextButtonInGetAppointmentDetail = false;

function getAppointmentDetailInsertDate() {
    $.ajax({
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            async: false,
            url: "Service/Appointment.asmx/GetAppointment",
            data: JSON.stringify({
                plate: AppointmentInfo.plateNo,
                serial: ""
            }),
            onresponse: {
                200: function(r) {
                    elementWarn("#ulServices", r.Data);
                    getLateFee();
                }
            }
        }).fail(function() {
            return null;
        })
        .done(function(response) {
            response = JSON.parse(response.d);
            if (!clickednextButtonInGetAppointmentDetail) {
                var insertDate = response.Data[0].APP_DATE;

                $("#appointmentSuccessHeader").html(moment(insertDate).format("D MMMM YYYY") + "'de randevu alınmıştır.");
                $("#updatePageHeader").html(moment(insertDate).format("D MMMM YYYY") + "'de randevu alınmıştır.");
            }
            clickednextButtonInGetAppointmentDetail = true;
        });
}

function getAppointmentDetail() {
    $.ajax({
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            async: false,
            url: "Service/Appointment.asmx/GetAppointmentByAppointmentID",
            data: JSON.stringify({
                lateFee: AppointmentInfo.latefee,
                cost: AppointmentInfo.cost,
                headerDebt: AppointmentInfo.headerDebt,
                debtData: AppointmentInfo.summaryDebtData
            }),
            onresponse: {
                200: function(r) {
                    elementWarn("#ulServices", r.Data);
                    getLateFee();
                }
            }
        })
        .fail(function() {
            return null;
        })
        .done(function(response) {
            response = JSON.parse(response.d);
            addedAppointmentInfo = response.Data[0];
            var addedAnswersInfo = JSON.parse(response.QuestionData);
            var checkboxCheckedState = JSON.parse(response.NotificationData);
            appendAddedAppointmentInfo(addedAppointmentInfo);
            appendAnswersInformation(addedAnswersInfo);
            setCheckboxCheckedState(checkboxCheckedState);
            appointmentDetailCalled = true;
            AppointmentInfo.urlparams = response.RequestParams;
            //changePage(20);

        });
}

function setCheckboxCheckedState(checkboxCheckedState) {
    //if (checkboxCheckedState.Data.length > 0) {
    $('.notificationChannel input').on('click', function() {
        var $click = $(this),
            second = $click.index() == 0 ? 1 : 0;

        if ($click.prop('checked'))
            $('.notificationChannel input').eq(second).prop('checked', !$click.prop('checked'));
        $('.errorMessage').hide();
    });
    // }
}

function changeCheckboxCheckedState(click) {

    var cb_index = click.parent().children('input').index(click);

    var second = cb_index == 0 ? 1 : 0;

    if (click.prop('checked'))
        click.parent().children('input').eq(second).prop('checked', !click.prop('checked'));

    click.parent().parent().children('.is_over_65_ages_error_message').hide();

}

function checkSurname() {

    var input = $("#surnameText");
    var val = input.val();
    var fieldset = input.parents("fieldset");
    var alert = fieldset.find(".alert");
    var className;

    if (input.hasClass("required")) {
        className = "error";
    } else {
        className = "wrong";
    }

    fieldset.removeClass(className);

    if (val.length == 0) {
        fieldset.addClass(className);
        alert.text("Lütfen soyadınızı giriniz.");
    } else {
        $.ajax({
                type: "POST",
                contentType: 'application/json',
                dataType: 'json',
                async: false,
                url: "Service/Appointment.asmx/IsIncompleteAppExistsBySurname",
                data: JSON.stringify({
                    plate: AppointmentInfo.plateNo,
                    surname: $("#surnameText").val()
                })
            })
            .fail(function() {
                return null;
            })
            .done(function(response) {
                response = JSON.parse(response.d);
                if (response == true) {
                    getAppointmentDetail();
                    changePage(20);
                    marqueeFunction();
                    setVehiclesVisibilities();

                } else {
                    fieldset.addClass(className);
                    alert.text("Soyad Bilgisi Hatalı.");
                }
            });
    }
}

function CheckVehicleAya() {

    var input = $("#txtVehicleAya");
    var val = input.val();
    var fieldset = input.parents("fieldset");
    var alert = fieldset.find(".alert");
    var className = "error";
    var brakeType = $('#ddlVehicleBrakeType').val();

    if (brakeType == "1" && val == "") {
        fieldset.addClass(className);
        $('#alertVehicleAya').show();
        alert.text("Lütfen AYA değerini giriniz.");
        return;
    }
    var vehicleType = AppointmentInfo.selectedVehicleType;
    if (val) {
        AppointmentInfo.VehicleAya = val;
    }
    AppointmentInfo.VehicleBrakeType = brakeType;
    $.ajax({
            url: "Service/Appointment.asmx/CheckVehicleAya",
            data: JSON.stringify({
                vehicleTypeId: vehicleType,
                vehicleAya: AppointmentInfo.VehicleAya,
                vehicleEgmAya: AppointmentInfo.VehicleEgmAya,
                vehicleBrakeType: brakeType
            }),
            contentType: 'application/json',
            dataType: 'json',
            type: "POST"
        })
        .fail(function(data) {
            $("#loader").fadeOut();
            $('#submit').attr("disabled", false);
        })
        .done(function(response) {
            response = JSON.parse(response.d);
            type = response.Data;
            AppointmentInfo.selectedVehicleType = type.VehicleTypeId;
            AppointmentInfo.selectedChannelType = type.ChannelType;

            setAvailableServices(AppointmentInfo.selectedVehicleTypeText);
            changePage(2);
        });
}


function getCurrentTime() {
    var dt = new Date(Date.now() + timeDiff);
    var minutes = "0";
    var hours = "0";
    if (dt.getMinutes().toString().length == 1) minutes = minutes.concat(dt.getMinutes());
    else minutes = dt.getMinutes().toString();
    if (dt.getHours().toString().length == 1) hours = hours.concat(dt.getHours());
    else hours = dt.getHours().toString();
    var time = hours + ":" + minutes;
    return time;
}

function getCurrentDay() {
    var fullDate = new Date(Date.now() + timeDiff);
    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);

    var twoDigitDay = ((fullDate.getDate().length) != 1) ? (fullDate.getDate()) : '0' + (fullDate.getDate());

    var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDay;
    return new Date(currentDate.replace(/\-/g, '/'));
}

function getPrice() {
    if (AppointmentInfo.selectedVehicleType == -1 || AppointmentInfo.selectedServiceType == -1) {
        jAlert("Randevu alımı sırasında hata oluştu lütfen tekrar deneyiniz");
        window.location.href = "index.aspx";
    }


    if (AppointmentInfo.selectedVehicleType == -1)
        AppointmentInfo.selectedVehicleType = $("#vehicleUl1 .selected").attr('data-vehicle');

    if (AppointmentInfo.selectedServiceType == -1)
        AppointmentInfo.selectedServiceType = $("#ulServices .selected").attr('data-service');


    var vehicle = {
        vehicle: AppointmentInfo.selectedVehicleType,
        channel: AppointmentInfo.selectedChannelType
    }; //getSelectedVehicle();
    var service = AppointmentInfo.selectedServiceType; //getSelectedService();

    if (vehicle && service) {
        checkInsuranceImportance(vehicle.vehicle, service)
    }
}

function checkInsuranceImportance(vehicleId, serviceId) {
    $.ajax({
            type: "POST",
            contentType: 'application/json',
            dataType: 'json',
            async: false,
            url: "Service/Appointment.asmx/GetPrice",
            data: JSON.stringify({
                vehicle: vehicleId,
                vehicleChannel: 0,
                service: serviceId
            }),
            onresponse: {
                200: function(r) {
                    elementWarn("#ulServices", r.Data);
                    getLateFee();
                }
            }
        })
        .fail(function() {
            return null;
        })
        .done(function(response) {
            response = JSON.parse(response.d);
            if (response.Success == false)
                return null;
            else {
                AppointmentInfo.cost = response.Data;
                AppointmentInfo.isInsuranceImportant = response.IsInsuranceImportant;
            }
        });

    setInsurancePayButtonVisibilities();
}


function setInsurancePayButtonVisibilities(vehicle, service) {
    //insurance control
    if ((AppointmentInfo.hasInsurance != null && AppointmentInfo.hasInsurance == true) ||
        App.Config.InsurancePayButton == "0" || mtRight)
        $(".hasInsurance").hide();
    else $(".hasInsurance").show();

    if (AppointmentInfo.isInsuranceImportant == false || mtRight)
        $("#insuranceDiv").attr('style', 'display: none !important');
    else $("#insuranceDiv").show();

    //$("#insuranceDiv").attr('style', 'display: none !important');
    //$(".hasInsurance").hide();


    if (($("#HiddenGiveAppointmentWithDebt").val() == "0" && AppointmentInfo.hasDebt == true && AppointmentInfo.selectedServiceType != 6 && mtRight == false) || (($("#ddlCity").val().split(":")[3]) == "0" && AppointmentInfo.hasInsurance == false &&
            AppointmentInfo.isInsuranceImportant != false))
        $('#giveAppointmentWithDept').attr('style', 'display:none !important');
    else $('#giveAppointmentWithDept').attr('style', 'display:block !important');
}

function trackEvent(category, action, label, value) {
    if (!value) {
        value = 0;
    }
    ga('send', 'event', category, action, label, value);
    return true;
}

function isEditMode() {
    if (getParameterByName("m") == "u")
        return true;
    else
        return false;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getSelectedChannelType(text) {
    var className = "." + text.toLowerCase();
    return $(className).attr("data-channel");
}

function getOccupancy(useAppointmentDate, callFromChangeWeek) {

    return $.Deferred(function(deferred) {
        if (AppointmentInfo.selectedVehicleType == -1 || AppointmentInfo.selectedServiceType == -1 || AppointmentInfo.appointmentDate == "") {
            jAlert("Randevu alımı sırasında hata oluştu lütfen tekrar deneyiniz");
            window.location.href = "index.aspx";
        }
        var cityID = getFilteredCity();
        var rangeVehicle = localStorage.getItem("SecondVehicleAppoinment");
        AppointmentInfo.rangeVehicle = rangeVehicle === null ? false : rangeVehicle;

        App.SelectedHour = null;
        $.ajax({
            type: "POST",
            url: "Service/Appointment.asmx/GetOccupancy",
            data: JSON.stringify({
                vehicle: AppointmentInfo.selectedVehicleType,
                vehicleChannel: AppointmentInfo.selectedChannelType,
                service: AppointmentInfo.selectedServiceType,
                city: cityID,
                date: AppointmentInfo.appointmentDate,
                expire: AppointmentInfo.expireDate,
                station: null, //(mtRight == true ? AppointmentInfo.selectedStationId : null),
                useAppointmentDate: useAppointmentDate,
                rangeVehicle: AppointmentInfo.rangeVehicle,
                mtRight: muayeneTekrari
            }),
            contentType: 'application/json',
            dataType: 'json',
            onresponse: {
                200: function(r) {}
            }
        }).done(function(r) {
            deferred.resolve(JSON.parse(r.d));

            if (JSON.parse(r.d).IsZmtValid == false) {
                refreshPage();
            }

            selectedMobileStationsCapacity = JSON.parse(r.d).Data.Rows;
            if (callFromChangeWeek == true)
                selectMobilStation(AppointmentInfo.selectedStationId, AppointmentInfo.selectedStationCode, AppointmentInfo.selectedStationName);
        });
    });
}

var r = null;
var promise = null;

function listGetOccupancyItem(callOccupancy, mobileOccupancy) {
    var filteredCity = getFilteredCity();

    var cityHasMobileStations = false;
    var stations = null;
    if (selectedStationsCapacity != null && callOccupancy != true) {
        stations = selectedStationsCapacity.filter(function(el) {
            return el.AppointmentDate == AppointmentInfo.appointmentDate && el.CityID == filteredCity
        });
        if (stations.length == 0)
            promise = getOccupancy(false);
    } else
        promise = getOccupancy(false);

    promise.then(function(r) {
        if (!r.Data)
            return;

        r.Data.CityName = $("#ddlCity option:selected").text();

        if (mobileOccupancy != true) {
            $(".stationTimeAppointment").children().remove();
            $(".mobileStationTimeAppointment").children().remove();

            selectedStationsCapacity = r.Data.Rows.sort(predicateSort({
                name: 'SORT_ID',
                reverse: true
            }, {
                name: 'StationCapacityPercentAge',
                reverse: false
            }));
            selectedMobileStationsCapacity = selectedStationsCapacity;

            var appointmentDateSuitableStations = (stations != null && stations.length != 0) ? stations : selectedStationsCapacity.filter(function(el) {
                return el.AppointmentDate == AppointmentInfo.appointmentDate && el.CityID == filteredCity;
            });

            //console.log(appointmentDateSuitableStations);

            if (appointmentDateSuitableStations.length == 0)
                $(".stationTimeAppointment").append("<li><a href='#' class='nosuitableStation'>Seçtiğiniz kriterlere uygun randevu bulunamamaktadır. Lütfen başka kriterlerle tekrar deneyiniz.</a></li>");

            for (var i = 0; i < appointmentDateSuitableStations.length; i++) {

                if (appointmentDateSuitableStations[i].IsMobileStation == false) {

                    if (appointmentDateSuitableStations[i].StationCapacityPercentAge == 100)
                        $(".stationTimeAppointment").append(
                            "<li> <a href='#'> " +
                            "<div class='one-third columns station-title-wrapper semi-col'>  <div class='station-title'>" +
                            appointmentDateSuitableStations[i].StationName + "</div> " +
                            "</div> <div class='ten columns semi-col'> " +
                            "<div class='station-population-wrapper'>" +
                            "<div style='width:" + appointmentDateSuitableStations[i].StationCapacityPercentAge + "%' class='station-population animate-width' data-limit=" + appointmentDateSuitableStations[i].StationCapacityPercentAge + "></div>" +
                            "</div>" +
                            "</div>" +
                            "</a>" +
                            "</li>");
                    else
                        $(".stationTimeAppointment").append(
                            "<li> <a href='javascript:void(0)' onclick='selectStation(" + appointmentDateSuitableStations[i].Cells[i].StationID + ",\"" + appointmentDateSuitableStations[i].StationName + "\",\"" + appointmentDateSuitableStations[i].AppointmentDate + "\"); return false;'> " +
                            "<div class='one-third columns station-title-wrapper semi-col'>  <div class='station-title'>" +
                            appointmentDateSuitableStations[i].StationName + "</div> " +
                            "</div> <div class='ten columns semi-col'> " +
                            "<div class='station-population-wrapper'>" +
                            "<div style='width:" + appointmentDateSuitableStations[i].StationCapacityPercentAge + "%' class='station-population animate-width' data-limit=" + appointmentDateSuitableStations[i].StationCapacityPercentAge + "></div>" +
                            "</div>" +
                            "</div>" +
                            "</a>" +
                            "</li>");

                    $(".stationTimeAppointment li:last .station-population-wrapper:last .station-population:last").css("height:50px;background:#dedede;width:" + appointmentDateSuitableStations[i].StationCapacityPercentAge + "%;");

                } else if (appointmentDateSuitableStations[i].IsMobileStation == true) {
                    cityHasMobileStations = true;
                    $(".mobileStationTimeAppointment").append(
                        "<li> <a href='javascript:void(0)' onclick='selectMobilStation(" + appointmentDateSuitableStations[i].Cells[i].StationID + ",\"" + appointmentDateSuitableStations[i].Cells[i].StationCode + "\",\"" + appointmentDateSuitableStations[i].StationName + "\"); return false;'> " +
                        "<div class='one-third columns station-title-wrapper semi-col'>  <div class='station-title'>" +
                        appointmentDateSuitableStations[i].StationName + "</div> " +
                        "</div> <div class='ten columns semi-col'> " +
                        "<div class='station-population-wrapper'>" +
                        "<div class='station-population animate-width' data-limit= " + appointmentDateSuitableStations[i].StationCapacityPercentAge + "></div>" +
                        "</div>" +
                        "</div>" +
                        "</a>" +
                        "</li>");
                    //} silindi
                }
            }

            if (cityHasMobileStations) {
                $("#mobileStationsHeader").show();
                $("#mobileStationsDiv").show();
            } else {
                $("#mobileStationsHeader").hide();
                $("#mobileStationsDiv").hide();
            }
            resize();
            animateWidth();
        } else {
            selectedMobileStationsCapacity = r.Data.Rows;
        }
    });
}

function ListStationsHour(stationdID) {

    if (checkClick) {
        var hours = "";

        //selectedStationsHours = filter(selectedStationsCapacity, { StationID: stationdID })[0];
        var selectedStationsHours = setSelectedStationHours(stationdID);


        if (selectedStationsHours != undefined) {
            // ie8 doesn't support jQuery.append() , so we're hacking it for backwards compatibility. 
            //$("#select-hours-table").children().remove();
            for (var j = 0; j < selectedStationsHours.Cells.length; j++) {
                if (j % 7 == 0)
                    hours += "<tr>";
                if (selectedStationsHours.Cells[j].Available == true)
                    hours += "<td><a href='#'>" + selectedStationsHours.Cells[j].Hour + "</a></td>";
                else
                    hours += "<td class='disabled'><span>" + selectedStationsHours.Cells[j].Hour + "</span></td>";
                if (j % 7 == 6)
                    hours += "</tr>";
            }
            $("#select-hours-table").html(hours);
            AppointmentInfo.stationType = selectedStationsHours.Cells[0].StationType
            resize();
            cityHasCapacityForMt = true;
        } else {
            cityHasCapacityForMt = false;
            $("#transparent-loader").fadeOut();
            $(".overlay").remove();
            jAlert("Seçtiğiniz güne uygun randevu bulunamadı. Tekrar gün seçimi yapınız.");
            changePage(5);
        }
    }
}

function setSelectedStationHours(stationdID) {
    var selectedStationsHours = null;
    if (selectedStationsCapacity != null) {
        selectedStationsHours = selectedStationsCapacity.filter(function(el) {
            return el.AppointmentDate == AppointmentInfo.appointmentDate && el.StationID == stationdID;
        })[0];
    }

    if (selectedMobileStationsCapacity != null) {
        if (selectedStationsHours == null)
            selectedStationsHours = selectedMobileStationsCapacity.filter(function(el) {
                return el.AppointmentDate == AppointmentInfo.appointmentDate && el.StationID == stationdID;
            })[0];
        //console.log(selectedStationsHours);
    }

    if (selectedStationsHours == undefined) {
        listMobileStationHours(stationdID);
    }

    return selectedStationsHours;
}

function listMobileStationHours(stationdID) {
    var hours = "";
    var selectedStationsHours = null;
    promise = getOccupancy(false);

    promise.then(function(r) {
        if (!r.Data) {
            jAlert("Seçtiğiniz güne uygun randevu bulunamadı. Tekrar gün seçimi yapınız.");
            changePage(5);
        } else {
            selectedMobileStationsCapacity = r.Data.Rows;
            if (selectedMobileStationsCapacity != null) {
                if (selectedStationsHours == null)
                    selectedStationsHours = selectedMobileStationsCapacity.filter(function(el) {
                        return el.AppointmentDate == AppointmentInfo.appointmentDate && el.StationID == stationdID;
                    })[0];
                //console.log(selectedStationsHours);
            }
            if (selectedStationsHours != undefined) {
                // ie8 doesn't support jQuery.append() , so we're hacking it for backwards compatibility. 
                //$("#select-hours-table").children().remove();
                for (var j = 0; j < selectedStationsHours.Cells.length; j++) {
                    if (j % 7 == 0)
                        hours += "<tr>";
                    if (selectedStationsHours.Cells[j].Available == true)
                        hours += "<td><a href='#'>" + selectedStationsHours.Cells[j].Hour + "</a></td>";
                    else
                        hours += "<td class='disabled'><span>" + selectedStationsHours.Cells[j].Hour + "</span></td>";
                    if (j % 7 == 6)
                        hours += "</tr>";
                }
                $("#select-hours-table").html(hours);
                AppointmentInfo.stationType = selectedStationsHours.Cells[0].StationType
                resize();
                cityHasCapacityForMt = true;
            }
        }
    });
}

function listStationHours() {
    changePage(9);
    resize();
}

function filter(arr, criteria) {
    return arr.filter(function(obj) {
        return Object.keys(criteria).every(function(c) {
            return obj[c] == criteria[c];
        });
    });
}

function filterNotEqual(arr, criteria) {
    return arr.filter(function(obj) {
        return Object.keys(criteria).every(function(c) {
            return obj[c] != criteria[c];
        });
    });
}

function getSuitableHour(hour) {
    if (checkClick) {

        var selectedStationsHours = selectedStationsCapacity.filter(function(el) {
            return el.AppointmentDate == AppointmentInfo.appointmentDate && el.StationID == selectedStationId;
        })[0];

        if (selectedStationsHours == undefined) selectedStationsHours = selectedMobileStationsCapacity.filter(function(el) {
            return el.AppointmentDate == AppointmentInfo.appointmentDate && el.StationID == selectedStationId;
        })[0];

        if (selectedStationsHours != undefined) {
            var suitableHour = "";
            for (var i = 0; i < selectedStationsHours.Cells.length; i++) {
                if (selectedStationsHours.Cells[i].CapacityPercentAge < 100 && ((selectedStationsHours.Cells[i].Hour < "12:00" && hour == 'b') || (selectedStationsHours.Cells[i].Hour > "12:00" && hour == 'a')) &&
                    selectedStationsHours.Cells[i].Available == true &&
                    (selectedStationsHours.Cells[i].Hour > getCurrentTime() || new Date(selectedStationsHours.AppointmentDateMobil.substring(0, 10).replace(/\./g, '/')) > getCurrentDay())) {
                    //console.log(selectedStationsHours.Cells[i].Hour);
                    suitableHour = selectedStationsHours.Cells[i].Hour;
                    break;
                }
            }

            if (suitableHour == "") {
                $("#alternative").html("Alternatifler");
                $("#alternativeAppointmentHeader").html("Seçtiğiniz kriterlere göre randevu bulunamadı. Diğer alternatifler aşağıda listelenmiştir.");
                SuggestAppointmentHours(hour);
            } else {
                $("#alternativeAppointmentHeader").html("Seçtiğiniz kriterlere göre aşağıdaki randevu bulunmuştur");
                $("#AlternativeAppointmentHour").children().remove();
                appendSuitableHours(suitableHour, AppointmentInfo.selectedStationName, false, AppointmentInfo.appointmentDate, 'capacity');
                $("#alternative").html("");
                //console.log(selectedStationsHours);
            }
            changePage(10);
        }
    }
}

function getFilteredCity() {
    var filteredCity = "";
    //    if (muayeneTekrari)
    //        filteredCity = (AppointmentInfo.CityID.toString().indexOf(':') > -1 ? AppointmentInfo.CityID.split(":")[0] : AppointmentInfo.CityID);
    //    else if (!muayeneTekrari && AppointmentInfo.CityID.toString().indexOf(':') > -1)
    //        filteredCity = AppointmentInfo.CityID.split(":")[0];
    //    else if (!muayeneTekrari && AppointmentInfo.CityID.toString().indexOf(':') <= -1)
    //        filteredCity = $("#ddlCity").val().split(":")[0];

    if (AppointmentInfo.CityID.toString().indexOf(':') > -1)
        filteredCity = AppointmentInfo.CityID.split(":")[0];
    else
        filteredCity = $("#ddlCity").val().split(":")[0];

    return filteredCity;
}

function SuggestAppointmentHours(hour) {

    var filteredCity = getFilteredCity();

    if (checkClick) {
        var suitableHour = "";
        var suggested = false;
        $("#AlternativeAppointmentHour").children().remove();

        //seçilen kritere göre %100 dolu olmayan ilk saat önerir
        var selectedStationsHours = selectedStationsCapacity.filter(function(el) {
            return el.AppointmentDate == AppointmentInfo.appointmentDate && el.StationID == AppointmentInfo.selectedStationId;
        })[0];

        if (selectedStationsHours == undefined) selectedStationsHours = selectedMobileStationsCapacity.filter(function(el) {
            return el.AppointmentDate == AppointmentInfo.appointmentDate && el.StationID == AppointmentInfo.selectedStationId;
        })[0];

        for (var i = 0; i < selectedStationsHours.Cells.length; i++) {
            if (((selectedStationsHours.Cells[i].Hour < "12:00" && hour == 'b') || (selectedStationsHours.Cells[i].Hour > "12:00" && hour == 'a')) &&
                selectedStationsHours.Cells[i].Available == true &&
                (selectedStationsHours.Cells[i].Hour > getCurrentTime() || new Date(selectedStationsHours.AppointmentDateMobil.substring(0, 10).replace(/\./g, '-')) > getCurrentDay())) {
                //console.log(selectedStationsHours.Cells[i].Hour);
                suitableHour = selectedStationsHours.Cells[i].Hour;
                appendSuitableHours(suitableHour, AppointmentInfo.selectedStationName, false, AppointmentInfo.appointmentDate, 'thisDay', selectedStationsHours.StationID);
                suggested = true;
                break;
            }
        }

        //Seçilen istasyonun 1 haftalık kapasitesi çekilir ve ilk uygun saat gösterilir
        selectedStationsHours = selectedStationsCapacity.filter(function(el) {
            return el.StationID == AppointmentInfo.selectedStationId && el.AppointmentDate > AppointmentInfo.appointmentDate;
        }).sort(predicateSort({
            name: 'AppointmentDate',
            reverse: false
        }));
        var breakMainLoop;
        var IsNeedOccupancy = true;
        var stationSuggested = false;

        for (var i = 0; i < selectedStationsHours.length; i++) {
            breakMainLoop = 0;
            for (var j = 0; j < selectedStationsHours[i].Cells.length; j++) {
                if (((selectedStationsHours[i].Cells[j].Hour < "12:00" && hour == 'b') || (selectedStationsHours[i].Cells[j].Hour > "12:00" && hour == 'a')) &&
                    selectedStationsHours[i].Cells[j].Available == true &&
                    (selectedStationsHours[i].Cells[j].Hour > getCurrentTime() || new Date(selectedStationsHours[i].AppointmentDateMobil.substring(0, 10).replace(/\./g, '-')) > getCurrentDay())) {
                    breakMainLoop = j;
                    break;
                }
            }
            if (breakMainLoop != selectedStationsHours[i].Cells.length - 1 && breakMainLoop != 0) {
                IsNeedOccupancy = false;
                break;
            }
        }
        if (IsNeedOccupancy) {
            getOccupancy(true).then(function(r) {
                //selectedStationsHours = r.Data.Rows

                selectedStationsHours = r.Data.Rows.filter(function(el) {
                    return el.StationID == AppointmentInfo.selectedStationId && el.AppointmentDate > AppointmentInfo.appointmentDate;
                }).sort(predicateSort({
                    name: 'AppointmentDate',
                    reverse: false
                }));

                for (var i = 0; i < selectedStationsHours.length; i++) {
                    breakMainLoop = 0;
                    for (var j = 0; j < selectedStationsHours[i].Cells.length; j++) {
                        if (((selectedStationsHours[i].Cells[j].Hour < "12:00" && hour == 'b') || (selectedStationsHours[i].Cells[j].Hour > "12:00" && hour == 'a')) &&
                            selectedStationsHours[i].Cells[j].Available == true &&
                            (selectedStationsHours[i].Cells[j].Hour > getCurrentTime() || new Date(selectedStationsHours[i].AppointmentDateMobil.substring(0, 10).replace(/\./g, '-')) > getCurrentDay())) {
                            //console.log(selectedStationsHours[i].Cells[j].Hour);
                            suitableHour = selectedStationsHours[i].Cells[j].Hour;
                            //console.log("suitable");
                            //console.log(selectedStationsHours[i]);
                            appendSuitableHours(suitableHour, selectedStationsHours[i].StationName, false, selectedStationsHours[i].AppointmentDate, 'otherDay', selectedStationsHours[i].StationID);
                            breakMainLoop = j;
                            stationSuggested = true;
                            suggested = true;
                            break;
                        }
                    }

                    if (breakMainLoop != selectedStationsHours[i].Cells.length - 1 && stationSuggested == true)
                        break;
                }

                //İstasyon Değiştir
                //var selectedStationsHours = filterNotEqual(selectedStationsCapacity, { StationID: AppointmentInfo.selectedStationId })[0];
                selectedStationsHours = selectedStationsCapacity.filter(function(el) {
                    return el.StationID != AppointmentInfo.selectedStationId && el.AppointmentDate == AppointmentInfo.appointmentDate;
                });
                //console.log(selectedStationsHours);

                for (var i = 0; i < selectedStationsHours.length; i++) {
                    var breakMainLoop = false;
                    for (var j = 0; j < selectedStationsHours[i].Cells.length; j++) {
                        if (((selectedStationsHours[i].Cells[j].Hour < "12:00" && hour == 'b') || (selectedStationsHours[i].Cells[j].Hour > "12:00" && hour == 'a')) &&
                            selectedStationsHours[i].Cells[j].Available == true) {
                            //console.log(selectedStationsHours[i].Cells[j].Hour);
                            suitableHour = selectedStationsHours[i].Cells[j].Hour;
                            appendSuitableHours(suitableHour, selectedStationsHours[i].StationName, true, AppointmentInfo.appointmentDate, 'otherStation', selectedStationsHours[i].StationID);
                            breakMainLoop = true;
                            suggested = true;
                            break;
                        }
                    }

                    if (breakMainLoop == true)
                        break;
                }

                if (!suggested)
                    $("#AlternativeAppointmentHour").append("<div style='text-align:center;font-weight:bold;font-size'>" + App.Message.HiddenNoAlternativeHour + "</div>");
            });

            //console.log("get occupancy");
            //console.log(selectedStationsHours);
        } else {
            for (var i = 0; i < selectedStationsHours.length; i++) {
                breakMainLoop = 0;
                for (var j = 0; j < selectedStationsHours[i].Cells.length; j++) {
                    if (((selectedStationsHours[i].Cells[j].Hour < "12:00" && hour == 'b') || (selectedStationsHours[i].Cells[j].Hour > "12:00" && hour == 'a')) &&
                        selectedStationsHours[i].Cells[j].Available == true &&
                        (selectedStationsHours[i].Cells[j].Hour > getCurrentTime() || new Date(selectedStationsHours[i].AppointmentDateMobil.substring(0, 10).replace(/\./g, '-')) > getCurrentDay())) {
                        //console.log(selectedStationsHours[i].Cells[j].Hour);
                        suitableHour = selectedStationsHours[i].Cells[j].Hour;
                        //console.log("suitable");
                        //console.log(selectedStationsHours[i]);
                        appendSuitableHours(suitableHour, selectedStationsHours[i].StationName, false, selectedStationsHours[i].AppointmentDate, 'otherDay', selectedStationsHours[i].StationID);
                        breakMainLoop = j;
                        stationSuggested = true;
                        suggested = true;
                        break;
                    }
                }

                if (breakMainLoop != selectedStationsHours[i].Cells.length - 1 && stationSuggested == true)
                    break;
            }

            //İstasyon Değiştir
            //var selectedStationsHours = filterNotEqual(selectedStationsCapacity, { StationID: AppointmentInfo.selectedStationId })[0];
            selectedStationsHours = selectedStationsCapacity.filter(function(el) {
                return el.StationID != AppointmentInfo.selectedStationId && el.AppointmentDate == AppointmentInfo.appointmentDate && el.CityID == filteredCity;
            });
            //console.log(selectedStationsHours);

            for (var i = 0; i < selectedStationsHours.length; i++) {
                var breakMainLoop = false;
                for (var j = 0; j < selectedStationsHours[i].Cells.length; j++) {
                    if (((selectedStationsHours[i].Cells[j].Hour < "12:00" && hour == 'b') || (selectedStationsHours[i].Cells[j].Hour > "12:00" && hour == 'a')) &&
                        selectedStationsHours[i].Cells[j].Available == true) {
                        //console.log(selectedStationsHours[i].Cells[j].Hour);
                        suitableHour = selectedStationsHours[i].Cells[j].Hour;
                        appendSuitableHours(suitableHour, selectedStationsHours[i].StationName, true, AppointmentInfo.appointmentDate, 'otherStation', selectedStationsHours[i].StationID);
                        breakMainLoop = true;
                        suggested = true;
                        break;
                    }
                }

                if (breakMainLoop == true)
                    break;
            }

            if (!suggested)
                $("#AlternativeAppointmentHour").append("<div style='text-align:center;font-weight:bold;font-size'>" + App.Message.HiddenNoAlternativeHour + "</div>");
        }
    }
}

function appendSuitableHours(suitableHour, cityName, changeSelectedCity, appointmentDate, id, stationID) {
    // ie8 doesn't support jQuery.append() , so we're hacking it for backwards compatibility. 
    var content = $("#AlternativeAppointmentHour").html();
    content += "<li><a id='suitableHour" + id + "' href='javascript:void(0);' " +
        //onclick=selectHours('" + suitableHour + "'," + changeSelectedCity + ",'" + cityName.replace(/ /g, '') + "','" + appointmentDate + "'); return false;> ";
        "onclick='selectHours(\"" + suitableHour + "\"," + changeSelectedCity + ",\"" + cityName.replace(/ /g, '') + "\",\"" + appointmentDate + "\"," + stationID + "); return false;'> ";

    $("#AlternativeAppointmentHour").html(content);
    $("#suitableHour" + id).append("<div class='five columns semi-col'> <div class='station-title'>" + cityName + "</div></div>");
    $("#suitableHour" + id).append("<div class='five columns quarter-col'> <div class='station-title'>" + appointmentDate + "</div></div>");
    $("#suitableHour" + id).append("<div class='five columns quarter-col'> <div class='station-title'>" + suitableHour + "</div></div>");
    $("#AlternativeAppointmentHour").append("</a></li>");
}

function isEditMode() {
    if (getParameterByName("m") == "u")
        return true;
    else
        return false;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function SetSecondVehicleAppoinment(value) {
    if (value == true)
        isSelectedSecondVehicleAppointment = true;
    localStorage.setItem("SecondVehicleAppoinment", value);
    getServices();
}

function ClearSecondVehicleAppoinment() {
    localStorage.removeItem("SecondVehicleAppoinment");
}

function IsSecondVehicleAppoinment() {
    return localStorage.getItem("SecondVehicleAppoinment") == "true";
}

function setAvailableServices(typeText, callback) {
    isSelectedSecondVehicleAppointment = false;
    var vehicleIDs = [23, 21, 26];
    ClearSecondVehicleAppoinment();
    if (!AppointmentInfo.temporaryAppointment) {
        if (AppointmentInfo.selectedVehicleType == 23 || AppointmentInfo.selectedVehicleType == 21) {
            $.alerts.confirm('Çekici için de randevu almak istiyor musunuz? <br/>Randevu almak istemeniz durumunda önümüzdeki 10 Dakika içinde ilgili sayfaları takip ederek randevunuzu kapasite sorunu yaşamadan oluşturabilirsiniz. <br/>Sayfayı kapatmanız durumunda ise ilgili istasyonda randevu için boş yer kalmadığı durumda farklı bir gün için randevunuzu oluşturabilirsiniz.', 'BİLGİLENDİRME', SetSecondVehicleAppoinment)
        };

        if (AppointmentInfo.selectedVehicleType == 26) {
            $.alerts.confirm('Römork veya Yarı Römork için de randevu almak istiyor musunuz? <br/>Randevu almak istemeniz durumunda önümüzdeki 10 Dakika içinde ilgili sayfaları takip ederek randevunuzu kapasite sorunu yaşamadan oluşturabilirsiniz. <br/>Sayfayı kapatmanız durumunda ise ilgili istasyonda randevu için boş yer kalmadığı durumda farklı bir gün için randevunuzu oluşturabilirsiniz.', 'BİLGİLENDİRME', SetSecondVehicleAppoinment)
        }
    };
    //setbuttonvisible buna göre çalışacak eğer true donerse buton acılcak ve yenı randevu almak ıcın sayfya gttıgınde gun saat tarh secmeden ıslmelerını yapacak.!

    if (AppointmentInfo.selectedVehicleType != -1 && (([23, 21, 26].indexOf(AppointmentInfo.selectedVehicleType) == -1)) || AppointmentInfo.temporaryAppointment) {
        getServices(typeText, callback);
    }
}

function getServices(typeText, callback) {
    $.ajax({
        url: "Service/Appointment.asmx/GetServices",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        data: JSON.stringify({
            vehicle: AppointmentInfo.selectedVehicleType,
            channel: AppointmentInfo.selectedChannelType

        }),
        onresponse: {
            200: function(r) {}
        }
    }).done(function(response) {

        if (typeText != 'updateAppointment')
            showNotification(AppointmentInfo.selectedVehicleTypeText, "VehicleNotification");
        //App.AvailableServices = r.Data;
        response = JSON.parse(response.d);
        //console.log(response.Data)
        //console.log(response.Data.length)

        $(".notAvailableService").show().removeClass("notAvailableService");

        $("#ulServices").find("li").each(function() {

            var remove = true;

            for (var i = 0; i < response.Data.length; i++) {
                if (response.Data[i].Id.split(':')[0] == $(this).data("service")) {
                    remove = false;
                    break;
                }
            }

            if (remove)
                $(this).addClass("notAvailableService");
        });

        $(".notAvailableService").hide();

        var servicesLis = $("#ulServices").find("li:not(.notAvailableService)");

        var i = 0;

        servicesLis.each(function() {

            $(this).removeClass("borderRight");

            if (i == 4 || i == servicesLis.length - 1) {
                $(this).addClass("borderRight");
            }

            i++;
        });

        if (callback)
            callback();
    });
}

function lpgAnswer(id) {
    Answers.lpg = id;
    //console.log(Answers);
    nextPage();
}

function licenceAlterationAnswer(id) {
    Answers.licenceAlteration = id;
    //console.log(Answers);
    if (setWhoseLicenceQuestionVisibility() == true)
        nextPage();
    else {
        hoverToTextbox();
        changePage(19);
    }
}

//it for ie8
function hoverToTextbox() {
    $(".text").each(function(index, val) {
        $(this).mouseover();
    });
}

function whoseLicenceAnswer(id, selection) {
    $(".whowillbringvehicleclass").html(selection);
    Answers.whoseLicence = id;
    //console.log(Answers);
    WhoWillBringVehicle(id);

    if (id == 10 || id == 35)
        changePage(14);
    //else if (id == 35)
    //    changePage(16);
    else {
        appendLastPagesDivButton(13);
        hoverToTextbox();
        changePage(19);
    }
}

function whoWillBringVehicleAnswer(id) {
    Answers.whoWillBringVehicle = id;
    //console.log(Answers);
    if (id == 36) {
        VehicleInspectionThisMonth();
        changePage(15);
    } else if (id == 31) {
        representStatus();
        changePage(17);
    } else {
        appendLastPagesDivButton(14);
        hoverToTextbox();
        changePage(19);
    }
}

function vehicleInspectionThisMonthAnswer(id) {
    Answers.vehicleInspectionThisMonth = id;
    appendLastPagesDivButton(15);
    hoverToTextbox();
    changePage(19);
}

function representStatusAnswer(id) {
    Answers.representStatus = id;
    appendLastPagesDivButton(17);
    hoverToTextbox();
    changePage(19);
}

function GetTopAnnouncements() {
    $.ajax({
        url: "Service/Appointment.asmx/GetTopAnnouncements",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        onresponse: {
            200: function(r) {}
        }
    }).done(function(response) {
        response = JSON.parse(response.d)
        $(".newsContent").html(response.Data);
    });
}

function AddLpgSelections() {
    //console.log(JSON.parse($("#HiddenLpgQuestion").val()));
    var lpg = JSON.parse($("#HiddenLpgQuestion").val());
    $("#lpgAnswersDiv").children().remove();

    for (var i = 0; i < lpg.length; i++) {
        $("#lpgAnswersDiv").append("<div class='one-third columns mb20'><a href='javascript:void(0)' onclick='lpgAnswer(" + lpg[i].AnswerId + "); return false;' class='button-text blue'>" + lpg[i].Selection.replace(/"/g, '').toString() + "</a></div>");
    }
}

function AddLicenceAlterationQuestions() { // ruhsata işli tadilat
    //console.log(JSON.parse($("#HiddenLicenceAlterationQuestion").val()));
    var licenceAlteration = JSON.parse($("#HiddenLicenceAlterationQuestion").val());
    $("#licenceAlterationAnswersDiv").children().remove();

    for (var i = 0; i < licenceAlteration.length; i++) {
        $("#licenceAlterationAnswersDiv").append("<div class='one-third columns mb20'><a href='javascript:void(0)' onclick='licenceAlterationAnswer(" + licenceAlteration[i].AnswerId + "); return false;' " +
            "class='button-text blue'>" + licenceAlteration[i].Selection.replace(/"/g, '').toString() + "</a></div>");
    }
}

function WhoseLicence() { // Ruhsat kimin üstüne
    //console.log(JSON.parse($("#HiddenWhoseLicence").val()));
    var whoseLicence = JSON.parse($("#HiddenWhoseLicence").val());
    $("#whoseLicenceDiv").children().remove();

    for (var i = 0; i < whoseLicence.length; i++) {
        $("#whoseLicenceDiv").append("<div class='one-third columns mb20 inline-block'><a href='javascript:void(0)' onclick='whoseLicenceAnswer(" + whoseLicence[i].AnswerId + ",\"" + whoseLicence[i].Selection.replace(/"/g, '').toString() + "\"); return false;' " +
            "class='button-text blue'>" + whoseLicence[i].Selection.replace(/"/g, '').toString() + "</a></div>");
    }
}

function WhoWillBringVehicle(id) { // Aracı muayeneye kim götürecek
    //console.log(JSON.parse($("#HiddenWhoWillBringVehicle").val()));
    var WhoWillBringVehicle = JSON.parse($("#HiddenWhoWillBringVehicle").val());

    if (id == 10) {
        $(".company").hide();
        $(".person").show();
        WhoWillBringVehicle = WhoWillBringVehicle.filter(function(el) {
            return el.AnswerId == 13 || el.AnswerId == 36
        })
    } else if (id == 35) {
        $(".person").hide();
        $(".company").show();
        WhoWillBringVehicle = WhoWillBringVehicle.filter(function(el) {
            return el.AnswerId == 14 || el.AnswerId == 31 || el.AnswerId == 37
        })
    }

    $("#whoWillBringVehicleDiv").children().remove();

    for (var i = 0; i < WhoWillBringVehicle.length; i++) {
        $("#whoWillBringVehicleDiv").append("<div class='one-third columns mb20 inline-block'><a href='javascript:void(0)' onclick='whoWillBringVehicleAnswer(" + WhoWillBringVehicle[i].AnswerId + "); return false;' " +
            "class='button-text blue'>" + WhoWillBringVehicle[i].Selection + "</a></div>");
    }
}

function VehicleInspectionThisMonth() { // bu ay içerisinde başka bir aracı muayeneye götürdünüz mü 

    //console.log(JSON.parse($("#HiddenVehicleInspectionThisMonth").val()));
    var vehicleInspection = JSON.parse($("#HiddenVehicleInspectionThisMonth").val());

    $("#vehicleInspectionThisMonthDiv").children().remove();

    for (var i = 0; i < vehicleInspection.length; i++) {
        $("#vehicleInspectionThisMonthDiv").append("<div class='one-third columns mb20 inline-block'><a href='javascript:void(0)' onclick='vehicleInspectionThisMonthAnswer(" + vehicleInspection[i].AnswerId + "); return false;' " +
            "class='button-text blue'>" + vehicleInspection[i].Selection + "</a></div>");
    }
}

function representStatus() { // Vekalet durumunuz

    //console.log(JSON.parse($("#HiddenRepresentStatus").val()));
    var representStatus = JSON.parse($("#HiddenRepresentStatus").val());

    $("#representStatusDiv").children().remove();

    for (var i = 0; i < representStatus.length; i++) {
        $("#representStatusDiv").append("<div class='one-third columns mb20 inline-block'><a href='javascript:void(0)' onclick='representStatusAnswer(" + representStatus[i].AnswerId + "); return false;' " +
            "class='button-text blue'>" + representStatus[i].Selection + "</a></div>");
    }
}

function appendLastPagesDivButton(backPage) {
    $("#lastPagesDiv").children().remove();
    $("#lastPagesDiv").append("<a href='javascript:void(0)' onclick='changePage(" + backPage + "); return false;' class='back-button'></a>");
}

function selectedSpecialVehicles() {
    var vehicle = AppointmentInfo.selectedVehicleType;
    if (vehicle) {
        return vehicle == V.MOT2 || vehicle == V.MOT1 || vehicle == V.HTA61 || vehicle == V.HTA62 || vehicle == V.HTA71 || vehicle == V.HTA72;
    } else
        return false;
}

function setLpgQuestionVisibility() {

    var service = AppointmentInfo.selectedServiceType;


    //	1. Araçta LPG, CNG var mı?

    if ((!selectedSpecialVehicles() && (service == S.GM || service == S.TA)) || service == S.YE) {
        //$('.radioBox[data-uniqueid="10"]').parent().show();
        return true;
    } else {
        //$('.radioBox[data-uniqueid="10"]').parent().hide().find("input").prop("checked", false).change();
        //$('.warning[data-for="radio10"]').hide();
        return false;
    }


    //	2. Araçta ruhsata işli olmayan tadilat var mı? mutlaka sor

    //if (service == S.GM || service == S.YE) {
    //    $('.radioBox[data-uniqueid="20"]').parent().find("input").removeAttr('disabled').change();
    //}
    //else if (service == S.TA) {
    //    $('.radioBox[data-uniqueid="20"]').parent().find('input[value="4"]').prop("checked", true);
    //    $('.radioBox[data-uniqueid="20"]').parent().find("input").attr('disabled', 'disabled').change();
    //}
    //else {
    //    $('.radioBox[data-uniqueid="20"]').parent().find("input").removeAttr('disabled').change();
    //}
}

function setWhoseLicenceQuestionVisibility() {
    var service = AppointmentInfo.selectedServiceType;
    //	5. Ruhsat kimin üstüne?

    if (service == S.GM || service == S.YE || service == S.TA) {
        //$('.radioBox[data-uniqueid="50"]').parent().show();
        return true;
    } else {
        //$('.radioBox[data-uniqueid="50"]').parent().hide().find("input").prop("checked", false).change();
        //$('.warning[data-for="radio50"]').hide();
        return false;
    }
}

function setappointmentSuccessHeader() {
    if (AppointmentInfo.selectedVehicleTypeText && AppointmentInfo.selectedVehicleTypeText.indexOf('Çekici') > -1 && isSelectedSecondVehicleAppointment)
        $("#appointmentSuccessHeader").html("Randevunuz alınmıştır. Yarı römork veya römork<br/> randevunuz için aşağıdaki buton ile ilerleyiniz.");
    else if (AppointmentInfo.selectedVehicleTypeText && AppointmentInfo.selectedVehicleTypeText.indexOf('Römork') > -1 && isSelectedSecondVehicleAppointment)
        $("#appointmentSuccessHeader").html("Randevunuz alınmıştır. Çekici randevunuz<br/> için aşağıdaki buton ile ilerleyiniz.");
    else
        $("#appointmentSuccessHeader").html("Randevunuz alınmıştır. Teşekkürler");
}

function sendConfirmationSms(mode, time, resend) {
    var phone = $("#txtGsm").val();
    var plateNo = AppointmentInfo.plateNo;
    var minutes;

    if (timer > 0 && resend == 'true') {
        jAlert("Sms gönderim süresi henüz tamamlanmadı. Süre Tamamlandığında tekrar deneyiniz.");

        return;
    }
    $.ajax({
        url: "Service/Appointment.asmx/sendConfirmationSms",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        data: JSON.stringify({
            mobilePhone: phone,
            plate: plateNo,
            mode: mode,
            isresend: resend
        }),
        onresponse: {
            200: function(r) {}
        }
    }).done(function(response) {
        response = JSON.parse(response.d);
        minutes = response.Data.Minutes;
        sendConfirmSmsErorrMassage = response.Data.ErrorMessage;
        sendConfirmSmsCheck = response.Data.Success;
        isSmsSend = response.Data.IsSmsSend;
        if (sendConfirmSmsCheck == false) {
            refreshPage();
        }
        if (response.Data.IsSmsSend == false) {
            isSmsSend = false;
        }
        $("#txtSms").val('');
        $("#txtCancelSms").val('');

    });

    if (typeof interval == "undefined") {
        display = document.querySelector(time);
        startTimer(minutes, display);
    } else {
        clearInterval(interval);
        display = document.querySelector(time);
        startTimer(minutes, display);
    }
}
var otpcheck;

function CheckOtpValue(sms) {
    var phone = $("#txtGsm").val();
    var plateNo = AppointmentInfo.plateNo;

    $.ajax({
        url: "Service/Appointment.asmx/CheckOtpValue",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        data: JSON.stringify({
            mobilePhone: phone,
            plate: plateNo,
            otpValue: sms
        }),
        onresponse: {
            200: function(r) {}
        }
    }).done(function(response) {
        response = JSON.parse(response.d);

        if (response.Data.Success == true) {
            otpcheck = true;
        } else {
            otpcheck = false;
            otpCheckErorrMassage = response.Data.ErrorMessage;
            otpFail = response.Data.IsFail;
        }
        $("#txtSms").val('');
        $("#txtCancelSms").val('');
    });

}

var otpFail;
var otpCheckErorrMassage;
var lastMonthAppCheck;
var lastMonthAppCheckErorrMassage;
var sendConfirmSmsErorrMassage;
var sendConfirmSmsCheck;
var isSmsSend;
var isWhiteCustomer;
var isBlackCustomer;

function GetLastMonthReservation() {
    var phone = $("#txtGsm").val();
    var plateNo = AppointmentInfo.plateNo;

    $.ajax({
        url: "Service/Appointment.asmx/GetLastMonthReservation",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        data: JSON.stringify({
            mobilePhone: phone,
            plate: plateNo,
            isEdit: AppointmentInfo.isEdit
        }),
        onresponse: {
            200: function(r) {}
        }
    }).done(function(response) {
        response = JSON.parse(response.d);
        console.log("başarılı");
        lastMonthAppCheck = response.Data.Success;
        isWhiteCustomer = response.Data.IsWhiteCustomer

        if (response.Data.IsBlackCustomer != null) {
            isBlackCustomer = response.Data.IsBlackCustomer;
        }

        if (lastMonthAppCheck == false) {
            lastMonthAppCheckErorrMassage = response.Data.ErrorMessage;
        }
    });
}

function openModal() {
    var check = saveAppointmentValidete();
    if (check == true) {
        GetLastMonthReservation();
        if (lastMonthAppCheck == false && AppointmentInfo.isEdit == false) {
            refreshPage();
        } else if (isBlackCustomer == true) {
            refreshPage()
        } else {
            if (isWhiteCustomer == true) {
                saveAppointmentForValid();
            } else {
                sendConfirmationSms('insert', '#time', false);
                if (sendConfirmSmsCheck == true) {
                    if (isSmsSend == true) {
                        $("#otpModal").fadeIn();
                    }

                }
            }
        }
    } else {
        $('#saveAppointmentButton').prop("disabled", false);
        $(".overlay").remove();
    }
}

function openCancelModal() {

    sendConfirmationSms('cancel', '#cancelTime', false);
    $("#cancelModal").fadeIn();

}

function closeModal() {
    $("#otpModal").fadeOut(500);
}

function closeCancelModal() {
    $("#cancelModal").fadeOut(500);
}
var timer;

function startTimer(duration, display) {
    var minutes, seconds;
    timer = duration, minutes, seconds;

    interval = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        if (timer > -1) {
            display.textContent = minutes + ":" + seconds;
        }

        if (timer < -60) {
            clearInterval(interval);
            jAlert("Uzun süre işlem yapmadığınız için randevu alım süreci iptal edildi.Lütfen tekrar deneyiniz.");
            refreshPage();
        }
        --timer;

    }, 1000);
}

function saveAppointmentValidete() {

    if ($('.over_65_ages input:checked').length < 1) {
        $('#is_over_65_ages_error_message').show();
        return;
    } else {
        $('#is_over_65_ages_error_message').hide();
    }

    hoverToTextbox();
    setappointmentSuccessHeader();

    //$(".body").prepend("<div class=\"overlay\"></div>");

    //$(".overlay").css({
    //    "position": "absolute",
    //    "width": $(document).width(),
    //    "height": $(document).height(),
    //    "z-index": 99999,
    //}).fadeTo(0, 0.8);


    $('#saveAppointmentButton').prop("disabled", true);
    var inputs = $('#saveAppointment').find("input");
    var valid = true;

    inputs.each(function(index, input) {
        input = $(input);
        var val = input.val();

        var fieldset = input.parents("fieldset");
        var alert = fieldset.find(".alert");
        var className;

        if (input.hasClass("required")) {
            className = "error";
        } else {
            className = "wrong";
        }

        fieldset.removeClass(className);

        if (input.hasClass("phone") && val.length != 0) {
            if (!isValidMobileNumber()) {
                valid = false;
                fieldset.addClass(className);
                alert.text("(5xxxxxxxxx) şeklinde giriniz.");
            }
        }


        if (input.hasClass("required") && val.length < 2) {
            valid = false;
            fieldset.addClass(className);
            if (val.length == 0)
                alert.text("Lütfen Doldurunuz");

            else {

                if (input.attr('id') == 'txtName')
                    alert.text("Ad bilgisini kontrol ediniz");
                else if (input.attr('id') == 'txtSurname')
                    alert.text("Soyad bilgisini kontrol ediniz");
                else if (input.attr('id') == 'txtSurname')
                    alert.text("Tc kimlik no bilgisini kontrol ediniz");
                else
                    alert.text("Lütfen Doldurunuz");
            }
        }
        if (input.hasClass("email") && (!IsEmail(val) || ($("#acceptNotificationMail").is(":checked") && $("#txtEmail").val() == ""))) {
            valid = false;
            fieldset.addClass(className);
            alert.text("E-Posta giriniz");
        }
    });


    return valid;
}

function saveAppointment() {
    var inputs = $('#otpModal').find("input");
    var valid = true;

    otpcheck = false;
    inputs.each(function(index, input) {
        input = $(input);
        var val = input.val();

        var fieldset = input.parents("fieldset");
        var alert = document.getElementById("divsms");

        var className;

        className = "error";

        fieldset.removeClass(className);

        if (input.hasClass("sms") && val.length == 0) {
            valid = false;
            fieldset.addClass(className);
            document.getElementById("divsms").innerHTML = "Lütfen doldurunuz.";
            //jAlert("Randevu alımı sırasında hata oluştu lütfen tekrar deneyiniz");
        }

    });
    var sms = $("#txtSms").val();
    if (valid == true) {
        CheckOtpValue(sms);
        if (otpcheck == true) {
            ConversionForSaveAppointment();
            AppointmentInfo.IsOver65Ages = $("#is_over_65_agesTrue").is(':checked');
            saveAnswers();
            getLateFee();
            setButtonVisibilities(AppointmentInfo.selectedVehicleType);
            if (IsSecondVehicleAppoinment()) {
                clearAppInfoStorage();
                var plate = generatePlate();
                var mainPlate = AppointmentInfo.plateNo;
                AppointmentInfo.plateNo = plate;
                AppointmentInfo.Second = true;
                preAppoint();
                setAppInfoStorage();
                AppointmentInfo.plateNo = mainPlate;
            }
            closeModal();
        } else {
            document.getElementById("divsms").innerHTML = otpCheckErorrMassage;
            jAlert(otpCheckErorrMassage);
            if (otpFail == true) {
                refreshPage();
            }
        }

    }
    //approveAppointment(false);
}

function saveAppointmentForValid() {
    if (isWhiteCustomer == true) {
        ConversionForSaveAppointment();
        AppointmentInfo.IsOver65Ages = $("#is_over_65_agesTrue").is(':checked');
        saveAnswers();
        getLateFee();
        setButtonVisibilities(AppointmentInfo.selectedVehicleType);
        if (IsSecondVehicleAppoinment()) {
            clearAppInfoStorage();
            var plate = generatePlate();
            var mainPlate = AppointmentInfo.plateNo;
            AppointmentInfo.plateNo = plate;
            AppointmentInfo.Second = true;
            preAppoint();
            setAppInfoStorage();
            AppointmentInfo.plateNo = mainPlate;
        }
    } else {}

}


function cancelAppointment() {

    var inputs = $('#cancelModal').find("input");
    var valid = true;
    otpcheck = false;

    inputs.each(function(index, input) {
        input = $(input);
        var val = input.val();

        var fieldset = input.parents("fieldset");
        var className;

        className = "error";

        fieldset.removeClass(className);

        if (input.hasClass("smscancel") && val.length == 0) {
            valid = false;
            fieldset.addClass(className);
            document.getElementById("warnSms").innerHTML = "Lütfen doldurunuz.";
            //jAlert("Randevu alımı sırasında hata oluştu lütfen tekrar deneyiniz");
        }

    });

    var sms = $("#txtCancelSms").val();

    if (valid == true) {
        CheckOtpValue(sms);
        if (otpcheck == true) {
            activeAppointment = false;
            approveAppointment(true);
            $("#txtName").val('');
            $("#txtSurname").val('');
            $("#txtGsm").val('');
            $("#txtEmail").val('');
            closeCancelModal();
        } else {
            document.getElementById("warnSms").innerHTML = otpCheckErorrMassage;
            if (otpFail == true) {
                refreshPage();
            }
        }
    }
}

function generatePlate() {
    var text = "";
    var plateCode = Math.round(Math.random() * 81);
    var word = generateWordForPlate();
    var plateNumber = Math.round(Math.random() * 900);
    text += plateCode + "X" + word + plateNumber;
    return text;
}

function generateWordForPlate() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 2; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function saveAnswers() {
    var answers = [];
    $.each(Answers, function(key, val) {
        answers.push(val);
    });
    $.ajax({
        url: "Service/Appointment.asmx/SaveAnswers",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        data: JSON.stringify({
            answers: answers
        }),
        onresponse: {
            200: function(r) {}
        }
    }).done(function(response) {});
    var response = preAppoint();


    if (response == null) {
        jAlert("Randevu alım sırasında hata oluştu");
        window.location.href = "Index.aspx";
    }

    if (response.Data == null || response.Data.ErrorMessage == null) {
        saveUsersSmsAndMailRequests();
        approveAppointment(false);

        //callMinistry = false;
    } else {
        if (response.Data.ErrorMessage.indexOf("aktif bir randevu kaydı var") == -1) {
            jAlert(response.Data.ErrorMessage);
            $('#saveAppointmentButton').prop("disabled", false);
            $(".overlay").remove();
        }
    }
}

var responseValue = "";

function showselectedAnswersInformation() {
    var answerData = 0;
    $.each(Answers, function(key, val) {
        if (val != -1 && val != 0)
            answerData += val + ",";
    });

    $.ajax({
        url: "Service/Appointment.asmx/GetSelectedAnswersInformation",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        data: JSON.stringify({
            answersID: answerData
        }),
        onresponse: {
            200: function(r) {}
        }
    }).done(function(response) {
        response = JSON.parse(response.d);
        //console.log(response);
        responseValue = response;
    });
    appendAnswersInformation(responseValue);
}

function appendAnswersInformation(response) {
    //$("#showselectedAnswersInformation").children().remove();
    //for (var i = 0; i < response.Data.length; i++) {
    //    response.Data[i].SelectionMessage = response.Data[i].SelectionMessage == null ? "" : response.Data[i].SelectionMessage;
    //    $("#showselectedAnswersInformation").append("<div class='information'>");
    //    $("#showselectedAnswersInformation .information:last").append("<h2>" + response.Data[i].Header + " </h2>");
    //    $("#showselectedAnswersInformation .information:last").append("<h3>" + response.Data[i].Selection + "</h3>");
    //    $("#showselectedAnswersInformation .information:last").append("<div class='information-detail'>");
    //    $("#showselectedAnswersInformation .information:last .information-detail:last").append("<div class='read-more'>");
    //    $("#showselectedAnswersInformation .information:last .information-detail:last .read-more:last").append("<p>" + response.Data[i].SelectionMessage + "</p>");
    //    $("#showselectedAnswersInformation .information:last .information-detail:last").append("</div>");
    //    $("#showselectedAnswersInformation .information:last").append("</div>");
    //    $("#showselectedAnswersInformation").append("</div>");
    //}
}

String.prototype.turkishToUpper = function() {
    var string = this;
    var letters = {
        "i": "İ",
        "ş": "Ş",
        "ğ": "Ğ",
        "ü": "Ü",
        "ö": "Ö",
        "ç": "Ç",
        "ı": "I"
    };
    string = string.replace(/(([iışğüçö]))/g, function(letter) {
        return letters[letter];
    })
    return string.toUpperCase();
}

function preAppoint() {
    if (AppointmentInfo.selectedVehicleType == -1 || AppointmentInfo.selectedServiceType == -1 || AppointmentInfo.appointmentDate == "" || AppointmentInfo.expireDate == "") {
        jAlert("Randevu alımı sırasında hata oluştu lütfen tekrar deneyiniz");
        window.location.href = "index.aspx";
    }
    var returnValue;
    $.ajax({
        url: "Service/Appointment.asmx/PreAppoint",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        data: JSON.stringify({
            appDate: AppointmentInfo.appointmentDate,
            hour: AppointmentInfo.appointmentTime.split(':')[0],
            min: AppointmentInfo.appointmentTime.split(':')[1],
            stationid: selectedStationId,
            stationtype: AppointmentInfo.stationType,
            stationname: AppointmentInfo.selectedStationName.turkishToUpper(),
            name: $("#txtName").val() + " " + $("#txtSurname").val(),
            email: $("#txtEmail").val(),
            gsm: $("#txtGsm").val(),
            isedit: AppointmentInfo.isEdit,
            isreserveapp: false,
            ServiceTypeText: AppointmentInfo.selectedServiceTypeText,
            VehicleTypeText: AppointmentInfo.selectedVehicleTypeText,
            webSource: fromTuvturkPage,
            expire: AppointmentInfo.expireDate,
            isSecond: AppointmentInfo.Second,
            licensePlate: AppointmentInfo.plateNo,
            isTempAppointment: AppointmentInfo.temporaryAppointment,
            is_over_65_ages: $("#is_over_65_agesTrue").is(':checked'),
            vehicle_aya: AppointmentInfo.VehicleAya,
            vehicle_egm_aya: AppointmentInfo.VehicleEgmAya,
            vehicle_brake_type: AppointmentInfo.VehicleBrakeType
            //,
            //appId: AppointmentInfo.appointmentID
        }),
    }).done(function(response) {
        returnValue = JSON.parse(response.d);
        //console.log(returnValue);
        if (AppointmentInfo.Second) {
            localStorage.setItem("AppId", returnValue.Data.AppointmentID);
        }

    });

    return returnValue;
}

function saveUsersSmsAndMailRequests() {
    var acceptNotificationSMS = $("#acceptNotificationSMS").is(':checked');
    // var acceptNotificationMail = $("#acceptNotificationMail").is(':checked');
    var acceptNotificationSMSFalse = $("#acceptNotificationSMSFalse").is(':checked');

    if (acceptNotificationSMS) {
        result = acceptNotificationSMS
    } else
        result = false;
    $.ajax({
        url: "Service/Appointment.asmx/SaveNotificationMailRequest",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        data: JSON.stringify({
            notificationEmailRequest: result,
            notificationSmsRequest: result
        }),
        onresponse: {
            200: function(r) {

                //window.location = "Approve.aspx";
            }
        }
    });
}


function approveAppointment(cancelAppointment) {
    return $.Deferred(function(deferred) {
        $.ajax({
            url: "Service/Appointment.asmx/ApproveAppointment",
            async: false,
            contentType: 'application/json',
            dataType: 'json',
            type: "POST",
            data: JSON.stringify({
                cancelAppointment: cancelAppointment,
                lateFee: AppointmentInfo.latefee,
                cost: AppointmentInfo.cost,
                headerDebt: AppointmentInfo.headerDebt,
                debtData: AppointmentInfo.summaryDebtData
            }),
            onresponse: {
                200: function(r) {

                    //window.location = "Approve.aspx";
                }
            }
        }).done(function(response) {
            response = JSON.parse(response.d);

            AppointmentInfo.urlparams = response.Data.RequestParams;

            if (AppointmentInfo.temporaryAppointment && response.Data.Success && !cancelAppointment) {
                changePage(20);
                deferred.resolve(true);
            } else if (AppointmentInfo.temporaryAppointment && !response.Data.Success && !cancelAppointment) {
                jAlert("Randevu Alımı Sırasında Hata Oluştu");
                $('#saveAppointmentButton').prop("disabled", false);
                $(".overlay").remove();
                deferred.resolve(false);
            } else if (cancelAppointment && response.Data.Success) {
                changePage(24);
            } else if (!cancelAppointment && !response.Data.Success) {
                jAlert("Randevu Alımı Sırasında Hata Oluştu");
                $('#saveAppointmentButton').prop("disabled", false);
                $(".overlay").remove();
                return false;
            } else if (!cancelAppointment && response.Data.Success) {
                showselectedAnswersInformation();
                activeAppointment = false;
                nextPage(true);
                $('#saveAppointmentButton').prop("disabled", false);
                $(".overlay").remove();
                appointmentDetailCalled = false;
                $('#AppointmentCheckListModal').fadeIn(500);
            }

        });
    });
}

function approveSecondAppointment(cancelAppointment) {
    $.ajax({
        url: "Service/Appointment.asmx/ApproveSecondAppointment",
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        data: JSON.stringify({
            cancelAppointment: cancelAppointment,
            lateFee: AppointmentInfo.latefee,
            cost: AppointmentInfo.cost,
            headerDebt: AppointmentInfo.headerDebt,
            debtData: AppointmentInfo.summaryDebtData
        }),
        onresponse: {
            200: function(r) {

                //window.location = "Approve.aspx";
            }
        }
    }).done(function(response) {});;
}

function predicateSort() {
    var fields = [],
        n_fields = arguments.length,
        field, name, reverse, cmp;

    var default_cmp = function(a, b) {
            if (a === b) return 0;
            return a < b ? -1 : 1;
        },
        getCmpFunc = function(primer, reverse) {
            var dfc = default_cmp,
                // closer in scope
                cmp = default_cmp;
            if (primer) {
                cmp = function(a, b) {
                    return dfc(primer(a), primer(b));
                };
            }
            if (reverse) {
                return function(a, b) {
                    return -1 * cmp(a, b);
                };
            }
            return cmp;
        };

    // preprocess sorting options
    for (var i = 0; i < n_fields; i++) {
        field = arguments[i];
        if (typeof field === 'string') {
            name = field;
            cmp = default_cmp;
        } else {
            name = field.name;
            cmp = getCmpFunc(field.primer, field.reverse);
        }
        fields.push({
            name: name,
            cmp: cmp
        });
    }

    // final comparison function
    return function(A, B) {
        var a, b, name, result;
        for (var i = 0; i < n_fields; i++) {
            result = 0;
            field = fields[i];
            name = field.name;

            result = field.cmp(A[name], B[name]);
            if (result !== 0) break;
        }
        return result;
    };
}

function toUpperCaseFunction(input) {

    var uniCodei = '\u0130';
    var uncideg = '\u011E';

    $(input).val(function(_, val) {
        if (val == 'i')
            return uniCodei;
        else if (val == 'ğ')
            return uncideg;
        else
            return val.toUpperCase();
    });

}

function toUpperCaseInput(input) {
    return input;
    var uniCodei = '\u0130';
    var uncideg = '\u011E';

    input.split('').forEach(function(val) {
        if (val == 'i')
            return uniCodei;
        else if (val == 'ğ')
            return uncideg;
        else
            return val.toUpperCase();
    });

    return input;
}

function isValidMobileNumber() {
    var mobile = document.getElementById('txtGsm').value.replace(/ /g, '');
    //console.log(mobile);
    if (mobile == null)
        return false;
    return (/^5+\d{9}$/).test(mobile.replace(/-/g, ''));
}

function updateAppointment() {

    var promise = checkIfIncompleteAppExist();

    promise.then(function(r) {
        if (r == 2) { // // Active Appointment and ticket not printed
            AppointmentInfo.isEdit = true;
            activeAppointment = true;
            setVehiclesVisibilities();
            getServices('updateAppointment');
            //mtRight = false;
            if (!appointmentDetailCalled) {
                checkPlateDebt();
                getAppointmentDetail();
            }
            //var appointmentTime = addedAppointmentInfo.APP_TIME.toString();
            //appointmentTime = appointmentTime.toString().length == 1 ? "0" + appointmentTime.toString() : appointmentTime.toString();

            //var appointmentMin = addedAppointmentInfo.APP_MIN.toString();
            //appointmentMin = appointmentMin.toString().length == 1 ? "0" + appointmentMin.toString() : appointmentMin.toString();

            //var appointmentHour = appointmentTime + ":" + appointmentMin;
            //var date = new Date();
            //if (new Date(addedAppointmentInfo.APP_DATE.replace('T',' ')) <= date) {
            //    jAlert("Randevu saatinin geçmesi nedeniyle güncelleme yapılamamaktadır.");
            //    location.reload();
            //}
            //else
            changePage(3);
        } else if (r == 1)
            jAlert(App.Message.TicketPrintedWarningMessage);
    });
}

function askCancelAppointment(page) {
    var promise = checkIfIncompleteAppExist();

    promise.then(function(r) {
        if (r == 2) {
            $("#cancel-name").html($("#txtName").val() + ' ' + $("#txtSurname").val());
            changePage(23);
        } else if (r == 1)
            jAlert(App.Message.TicketPrintedWarningMessage);
    });
}


function changePlateCode() {
    plateCode = $("#ddlCity").val().split(":")[2];
    plateCode = plateCode.toString().length == 1 ? ("0" + plateCode) : plateCode;
}

function showCommunicationAlert() {
    jAlert(App.Message.CommunicationInf);
}

function openAnnouncementPage() {
    window.open(App.AnnouncementLink, '_blank');
}

if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function(callback) {
        for (var i = 0; i < this.length; i++) {
            callback.apply(this, [this[i], i, this]);
        }
    };
}


function setSummaryAppointmentDate(appDate) {
    var appDateArray = appDate.split('.');
    var formattedAppDate = appDateArray[2] + "/" + appDateArray[1] + "/" + appDateArray[0];
    $("#summaryAppointmentDate").html(moment(formattedAppDate.substring(0, 10)).format("DD.MM.YYYY") + "<br/>" + moment(formattedAppDate).format("dddd"));
}

function getAvailableAppointmentDates(date) {

    var stringDate = moment(date).format('DD.MM.YYYY');
    var tDate = moment(new Date()).format('DD.MM.YYYY, h:mm:ss a');
    var cityID = "";
    if (activeAppointment || mtRight)
        cityID = $("#ddlCity").val().split(':')[0];
    else cityID = (AppointmentInfo.CityID.toString().indexOf(':') > -1 ? AppointmentInfo.CityID.split(":")[0] : AppointmentInfo.CityID)

    $.ajax({
        url: "Service/Appointment.asmx/GetAvailableAppointmentDates",
        data: JSON.stringify({
            cityID: cityID,
            date: stringDate,
            serviceTypeID: AppointmentInfo.selectedServiceType,
            vehicleTypeID: AppointmentInfo.selectedVehicleType,
            t: tDate
        }),
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        onresponse: {
            200: function(r) {
                if (r.Data)
                    availableDates = r.Data;
            }
        }
    }).fail(function() {}).done(function(response) {
        availableDates = JSON.parse(response.d).Data;

        if (mtRight == true && AppointmentInfo.selectedServiceType == 4) { // Muayene Tekrarı
            $.each(availableDates, function(index, value) {
                value = value.replace(/-/g, '/');
                availableDates[index] = value;
            });


            availableDates = availableDates.filter(function(el) {
                return el.replace('-', '/') <= moment(MT_RIGHT_DATE).format('YYYY/MM/DD');
            });

            $.each(availableDates, function(index, value) {
                value = value.replace(/\//g, '-');
                availableDates[index] = value;
            });
        }
    });

    $("#randevu-tarihi").datepicker("refresh");
}

function checkAppointmentInfoData() {
    currentPage++;
    if (currentPage < 4)
        return true;

    if (currentPage <= 4) {
        if (AppointmentInfo.selectedVehicleType != -1)
            return true;
        else {
            currentPage = 3;
            return false;
        }
    }

    if (currentPage <= 5) {
        if (AppointmentInfo.selectedServiceType != -1)
            return true;
        else {
            currentPage = 4;
            return false;
        }
    }

    if (currentPage <= 6) {
        if (AppointmentInfo.appointmentDate != "")
            return true;
        else {
            currentPage = 5;
            return false;
        }
    }

    if (currentPage <= 7) {
        if (AppointmentInfo.expireDate != "")
            return true;
        else {
            currentPage = 6;
            return false;
        }
    }

    if (currentPage <= 8) {
        if (AppointmentInfo.selectedStationId != null)
            return true;
        else {
            currentPage = 7;
            return false;
        }
    }

    if (currentPage >= 8) {
        return true;
    }
}

function openTuvturkPage() {
    window.location.href = 'http://www.tuvturk.com.tr';
}

function refreshPage() {
    isRefresh = true;
    window.location.href = 'https://reservation.tuvturk.com.tr/web.ui/Index.aspx';
    //window.location.href = 'http://localhost/Tuvturk.Web.UI4/Index.aspx';
    //window.location.href = 'http://rezervasyontest.test.int/Web.UI/Index.aspx';

}

function setVehiclesVisibilities() {
    $("#vehicleUl1").find("li").each(function() {

        var remove = true;

        if ($(this).data("vehicle") == AppointmentInfo.selectedVehicleType || AppointmentInfo.selectedVehicleType == 0)
            remove = false;

        if (remove) {
            $(this).hide();
        } else $(this).show();
    });
}

//romork cekıcı ıcın buton 
function setButtonVisibilities(vehicle) {
    var vehicle = AppointmentInfo.selectedVehicleType;
    if (vehicle == 26 && IsSecondVehicleAppoinment()) {
        $("#rom").css("display", "block");
        $("#half_rom").css("display", "block");
        $("#cekici").css("display", "none!important;");

        //document.getElementById("rom").style.visibility = "visible";
        //document.getElementById("half_rom").style.visibility = "visible";
    }

    if ((vehicle == 21 || vehicle == 23) && IsSecondVehicleAppoinment()) {
        //document.getElementById("cekici").style.visibility = "visible";
        $("#rom").css("display", "none!important;");
        $("#half_rom").css("display", "none!important;");
        $("#cekici").css("display", "block");
    }

}

function openInsurancePayPage() {

    var cityID = "";
    if (activeAppointment)
        cityID = $("#ddlCity").val().split(':')[0];
    else cityID = (AppointmentInfo.CityID.toString().indexOf(':') > -1 ? AppointmentInfo.CityID.split(":")[0] : AppointmentInfo.CityID)

    $.ajax({
        url: "Service/Appointment.asmx/SaveInsuranceState",
        data: JSON.stringify({
            plate: $("#txtPlate").val(),
            cityID: cityID
        }),
        async: false,
        contentType: 'application/json',
        dataType: 'json',
        type: "POST",
        onresponse: {
            200: function(r) {
                if (r.Data)
                    availableDates = r.Data;
            }
        }
    }).fail(function() {}).done(function(response) {
        //window.open(App.Message.InsurancePayPage, "_blank");
        window.open("RedirectPage.aspx", "_blank");
    });
}

function ConversionForSaveAppointment() {
    gtag('event', 'conversion', {
        'send_to': 'AW-760399268/sglYCKatgpYBEKSLy-oC'
    });
}

function VehicleBrakeTypeChanged() {
    if ($("#ddlVehicleBrakeType").val() == "1") {
        $("#txtVehicleAyaFieldSet").show();
    } else {
        $("#txtVehicleAyaFieldSet").hide();
    }
}