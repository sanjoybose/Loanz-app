


function vmLoan(_PV, _cRating, _reason, _t) {
    this.default_r = 6.25;
    this.rateNotif = ko.observable("none");
    this.PV = ko.observable(_PV ? _PV : 50000);
    this.t = ko.observable(_t ? _t : 3);
    this.reason = ko.observable(_reason ? _reason : 'Vacation');
    //this.t_display = ko.observable("3 years");
    this.income = ko.observableArray([
            new Income(35000, 'Up to $35,000'),
            new Income(50000, '$35,000 to $50,000'),
            new Income(75000, '$50,000 to $75,000'),
            new Income(100000, '$75,000 to $100,000'),
            new Income(150000, '$100,000 to $150,000'),
            new Income(150001, 'Over $150,000'),
    ]);
    this.selectedIncome = ko.observable();
    this.selectedIncome.subscribe(function (newVal) {
        this.rateNotif("none");
    }, this);
    this.employmentStatus = ko.observableArray([
            new Income('Salaried', 'Salaried'),
            new Income('Self Employed', 'Self Employed'),
            new Income('Retired', 'Retired')
    ]);
    this.selectedEmploymentStatus = ko.observable();
    this.t_display = ko.computed({
        read: function () {            
            return this.t() + " years";
        },
        write: function (value) {
            switch (value) {
                case "3 yrs":
                    this.t(3);
                    break;
                case "5 yrs":
                    this.t(5);
                    break;
                default:
                    this.t(3);
            }
        },
        owner: this
    });
    this.n = ko.observable(12);
    this.cRating = ko.observable(_cRating ? _cRating : 4);
    this.cRating_display = ko.observable("");
    this.r = ko.computed(function () {
        var _r = this.default_r;
        switch (this.cRating()) {
            case 1:
                this.cRating_display("Poor");
                _r += 3;
                break;
            case 2:
                this.cRating_display("Fair");
                _r += 2;
                break;
            case 3:
                this.cRating_display("Good");
                _r += 1;
                break;
            case 4:
                this.cRating_display("Excellent");
                _r += 0;
                break;
            default:
                _r += 0;
        }
        switch (this.reason()) {
            case "Vacation":
                _r += 1;
                break;
            case "Small Business":
                _r += 2;
                break;
            case "Cash":
                _r += 3;
                break;
            case "Debt":
                _r += 1;
                break;
            case "Real Estate":
                _r += 0;
                break;
            default:
                _r += 0;
        }
        return _r;
    }, this);
    this.FV = ko.computed(function () {
        this.rateNotif("none");
        var value = this.PV() * (Math.pow((1 + ((this.r() / 100) / this.n())), (this.n() * this.t())));
        return Math.round(value);
    }, this);
    this.emi = ko.computed(function () {
        return Math.round((this.FV() / (this.n() * this.t())));
    }, this);
    this.getRate = function () {

        /*** Hack for selected income ***/
        //var rating = this.cRating();
        //if (rating == 4) {  //Excellent rating
        //    this.selectedIncome(75000);
        //} else if (rating == 3 || rating == 2) {  //Good and Bad rating
        //    this.selectedIncome(50000);
        //} else if (rating == 1) { //Poor rating
        //    this.selectedIncome(35000);
        //}
        /**** end hack ****/

        if (validator.checkAll(document)) {

            var vm = this;

            $("#openModal").dialog({
                dialogClass: "modalDialog", modal: true, width: "auto",
                open: function (e, ui) {
                    var h = $(e.target).height() / 2;
                    $(".ui-dialog").css({
                        position: 'fixed',
                        top: "50%",
                        "margin-top": "-" + h + "px"
                    });
                }
            });

            var pb = $("#loadingProgressBar").data('kendoProgressBar');
            if (pb) {
                $("#loadingProgressBar").show();
                pb.value(0);
                load();
            } else {


                $("#loadingProgressBar").kendoProgressBar({
                    showStatus: false,
                    animation: false,
                    complete: function () {

                        //return false;

                        $("#loadingProgressBar").hide();

                        $("#openModal").dialog("close");
                        /***  *****/

                        /***  *****/
                        if (vm.cRating() == 4) {//excellent credit rating
                            //vm.rateNotif("congratulations");
                            window.location = "lending_statement?pv=" + vm.PV() + "&cRating=" + vm.cRating() + "&reason=" + vm.reason();
                            //window.location = "congratulation?pv=" + vm.PV() + "&cRating=" + vm.cRating() + "&reason=" + vm.reason();
                        }
                        else if (vm.selectedIncome()) {

                            if (vm.selectedIncome() <= 35000) {
                                vm.rateNotif("denied");
                            }
                            else if (vm.selectedIncome() > 35000 && vm.selectedIncome() <= 50000) {
                                vm.rateNotif("more_info");
                            }
                            else if (vm.selectedIncome() > 50000) {
                                //vm.rateNotif("congratulations");
                                window.location = "lending_statement?pv=" + vm.PV() + "&cRating=" + vm.cRating() + "&reason=" + vm.reason();
                                //window.location = "congratulation?pv=" + vm.PV() + "&cRating=" + vm.cRating() + "&reason=" + vm.reason();
                            }
                        }
                        else {
                            vm.rateNotif("denied");
                        }

                        $('html, body').animate({
                            scrollTop: $('#notif_result').offset().top - 100
                        }, 1000, "easeOutQuart");
                    }

                });

                load();

            }
        }
    }
    this.Savings = ko.observable('').toUSD(0);
    this.Retirement = ko.observable('').toUSD(0);
    this.Other = ko.observable('').toUSD(0);

    this.initValidation = function (a, b) {
        
        $('input[required], input.optional, select.required').on('blur', validator.checkField);
        $('input[required], input.optional, select.required').on('focus', true, validator.checkField);
        $('select.required').on('change', validator.checkField);

        $('.multi.required').on('keyup blur', 'input', function () {
            validator.checkField.apply($(this).siblings().last()[0]);
        });
        refreshMultiField();
        if (window.location.pathname.toLowerCase().indexOf('application') >= 0) {
            $('.txtzip').mask('99999', { placeholder: '', autoclear: false });
            $('.txtPhone1').mask('999', { placeholder: '', autoclear: false });
            $('.txtPhone2').mask('999', { placeholder: '', autoclear: false });
            $('.txtPhone3').mask('9999', { placeholder: '', autoclear: false });
            $('.txtSSN1').mask('999', { placeholder: '', autoclear: false });
            $('.txtSSN2').mask('99', { placeholder: '', autoclear: false });
            $('.txtSSN3').mask('9999', { placeholder: '', autoclear: false });
        }
        else if (window.location.pathname.toLowerCase().indexOf('congratulation') >= 0) {
            $('#routingNo').mask('999999999', { placeholder: '', autoclear: false });
            $('#accNo').mask('999?99999999999999', { placeholder: '', autoclear: false });
            $('#btnSubmit').on('click', function (e) {
                e.preventDefault();
                if (validator.checkAll(document)) {
                    window.location = "lending_statement";
                }
            });
        }
    }
}

$(document).ready(function () {

    ko.computed.fn.toDigit = function () {
        //return this().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        var val = parseFloat(this().toString().replace(/[^0-9\.]+/g, "")).toFixed(2);
        val = (val == "NaN") ? 0 : val;
        return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
    ko.observable.fn.toDigit = function () {
        //return this().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        var val = parseFloat(this().toString().replace(/[^0-9\.]+/g, "")).toFixed(2);
        val = (val == "NaN") ? 0 : val;
        return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
    //ko.observable.fn.toUSD = function () {
    //    return "$" + this().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    //}

    ko.observable.fn.toUSD = function (precision) {
        var observable = this;
        observable.formatted = ko.computed({
            read: function (key) {
                if (observable()) {
                    var val = parseFloat(observable().toString().replace(/[^0-9\.]+/g, "")).toFixed(2);
                    val = (val == "NaN") ? 0 : val;
                    return "$ " + (val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                }
                else {
                    return "";
                }
            },
            write: function (value) {
                value = "$ " + value.replace(/[^0-9\.]+/g, "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
                observable(value); // Write to underlying storage 
            }
        });

        return observable;
    };

    String.prototype.toDigit = function () {
        //return this.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
        var val = parseFloat(this.replace(/[^0-9\.]+/g, "")).toFixed(2);
        val = (val == "NaN") ? 0 : val;
        return val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
    
});

// Constructor for an object with two properties
var Income = function (value, caption) {
    this.Value = value;
    this.Caption = caption;
};

var EmploymentStatus = function (value, caption) {
    this.Value = value;
    this.Caption = caption;
};
