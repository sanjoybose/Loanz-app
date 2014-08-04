
(function (highcharts) {

    ko.bindingHandlers.Highchart = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value.data().length > 0) {
                var config = {
                    series: []
                }

                var start = $.grep(value.data(), function (e) { return e.id == "start" });
                var drillData = $.grep(value.data(), function (e) { return e.id != "start" });
                config.series = start;
                config.drilldown = { series: drillData };
                $.extend(true, config, value.config);
                config.chart.renderTo = element.id;

                if (element.tagName != "DIV") {
                    var div = $("<div></div>");
                    div.attributes = element.attributes;
                    $(element).replaceWith(div);
                }

                new highcharts.Chart(config);
            }
        }
    }

    ko.bindingHandlers.HighchartPie = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value.data().length > 0) {
                var config = {
                    chart: {
                        type: 'pie'
                    },
                    series: []
                }

                var start = $.grep(value.data(), function (e) { return e.id == "start" })[0];
                var drillData = $.grep(value.data(), function (e) { return e.id != "start" });
                config.series = [start];
                config.drilldown = { series: drillData };
                $.extend(true, config, value.config);
                config.chart.renderTo = element.id;

                if (element.tagName != "DIV") {
                    var div = $("<div></div>");
                    div.attributes = element.attributes;
                    $(element).replaceWith(div);
                }

                new highcharts.Chart(config);
            }
        }
    }

    ko.bindingHandlers.HighchartDonut = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value.data().length > 0) {
                var config = {
                    chart: {
                        type: 'pie'
                    },
                    series: []
                }

                //add 'innerSize' to all series in data
                var innerSize = value.innerSize ? value.innerSize : "40%";
                var dataParsed = value.data();
                $(dataParsed).each(function (i, elm) {
                    elm.innerSize = innerSize;
                });

                var start = $.grep(dataParsed, function (e) { return e.id == "start" })[0];
                var drillData = $.grep(dataParsed, function (e) { return e.id != "start" });
                config.series = [start];
                config.drilldown = { series: drillData };
                $.extend(true, config, value.config);
                config.chart.renderTo = element.id;

                if (element.tagName != "DIV") {
                    var div = $("<div></div>");
                    div.attributes = element.attributes;
                    $(element).replaceWith(div);
                }

                new highcharts.Chart(config);
            }
        }
    }

    ko.bindingHandlers.HighchartScatter = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value.data().length > 0) {
                var config = {
                    chart: {
                        type: 'scatter',
                        zoomType: 'xy'
                    },
                    series: []
                }

                var start = $.grep(value.data(), function (e) { return e.id == "start" })[0];
                var drillData = $.grep(value.data(), function (e) { return e.id != "start" });
                config.series = [start];
                config.drilldown = { series: drillData };
                $.extend(true, config, value.config);
                config.chart.renderTo = element.id;

                if (element.tagName != "DIV") {
                    var div = $("<div></div>");
                    div.attributes = element.attributes;
                    $(element).replaceWith(div);
                }

                new highcharts.Chart(config);
            }
        }
    }

    ko.bindingHandlers.HighchartColumn = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value.data().length > 0) {
                var config = {
                    chart: {
                        type: 'column'
                    },
                    series: []
                }

                var start = $.grep(value.data(), function (e) { return e.id == "start" })[0];
                var drillData = $.grep(value.data(), function (e) { return e.id != "start" });
                config.series = [start];
                config.drilldown = { series: drillData };
                $.extend(true, config, value.config);
                config.chart.renderTo = element.id;

                if (element.tagName != "DIV") {
                    var div = $("<div></div>");
                    div.attributes = element.attributes;
                    $(element).replaceWith(div);
                }

                new highcharts.Chart(config);
            }
        }
    }

}(Highcharts));
