var knowDebugApp = angular.module('knowDebugApp');


knowDebugApp
    .controller('DashboardCtrl', ['$scope', 'appData', 'validateData',
        function ($scope, appData, validateData) {

            var vm = $scope;
            vm.logData = [];
            vm.filter = {};
            vm.filterLabels = appData.FILTER_TYPE_LABELS;
            vm.columnLabels = appData.COLUMN_LABELS;
            vm.filter.device = appData.FILTERS_DEVICE_TYPE;
            vm.filter.deviceChunked = chunk(appData.FILTERS_DEVICE_TYPE, 1);
            vm.filter.attrs = appData.FILTERS_ATTRS;
            vm.filter.attrsChunkedSix = chunk(appData.FILTERS_ATTRS, 6);
            vm.filter.eventType = appData.FILTERS_EVENT_TYPE;
            vm.filter.eventTypeChunkedSix = chunk(appData.FILTERS_EVENT_TYPE, 6);
            vm.filter.golbalAttrs = appData.FILTERS_GLOBAL_ATTRS;
            vm.filter.golbalAttrsChunkedFour = chunk(appData.FILTERS_GLOBAL_ATTRS, 4);
            vm.filter.golbalAttrsChunkedSix = chunk(appData.FILTERS_GLOBAL_ATTRS, 6);
            vm.filter.metrics = appData.FILTERS_METRICS;
            vm.filter.metricsChunked = chunk(appData.FILTERS_METRICS, 6);

            var filterSelectedDefault = {};
            filterSelectedDefault.device = [
                appData.FILTERS_DEVICE_TYPE[0],
                appData.FILTERS_DEVICE_TYPE[2]
            ];
            filterSelectedDefault.attrs = [
                appData.FILTERS_ATTRS[2],
                appData.FILTERS_ATTRS[5],
                appData.FILTERS_ATTRS[1],
                appData.FILTERS_ATTRS[7],
                appData.FILTERS_ATTRS[9],
                appData.FILTERS_ATTRS[10]
            ];
            filterSelectedDefault.eventType = [
                appData.FILTERS_EVENT_TYPE[0],
                appData.FILTERS_EVENT_TYPE[4],
                appData.FILTERS_EVENT_TYPE[2],
                appData.FILTERS_EVENT_TYPE[15],
                appData.FILTERS_EVENT_TYPE[16],
                appData.FILTERS_EVENT_TYPE[12],
                appData.FILTERS_EVENT_TYPE[17]
            ];
            filterSelectedDefault.globalAttrs = [
                appData.FILTERS_GLOBAL_ATTRS[0],
                appData.FILTERS_GLOBAL_ATTRS[2],
                appData.FILTERS_GLOBAL_ATTRS[5],
                appData.FILTERS_GLOBAL_ATTRS[7],
                appData.FILTERS_GLOBAL_ATTRS[8],
                appData.FILTERS_GLOBAL_ATTRS[16],
                appData.FILTERS_GLOBAL_ATTRS[12]
            ];
            filterSelectedDefault.metrics = [
                appData.FILTERS_METRICS[0],
                appData.FILTERS_METRICS[2],
                appData.FILTERS_METRICS[3],
                appData.FILTERS_METRICS[5]
            ];

            vm.filterSelectedMultiple = {};
            vm.filterSelectedMultiple.device = filterSelectedDefault.device;
            vm.filterSelectedMultiple.attrs = [];
            vm.filterSelectedMultiple.eventType = filterSelectedDefault.eventType;
            vm.filterSelectedMultiple.globalAttrs = [];
            vm.filterSelectedMultiple.metrics = filterSelectedDefault.metrics;


            vm.filterSelectedText = {};
            vm.filterSelectedText.clientId = '';
            vm.filterSelectedText.userId = '';

            vm.filterSelectedProp = {};

            vm.filterDisplayFields = [
                vm.columnLabels.COLUMN_LABEL_MODE,
                vm.columnLabels.COLUMN_LABEL_STATUS,
                vm.columnLabels.COLUMN_LABEL_DATE,
                vm.columnLabels.COLUMN_LABEL_IPADDR,
                vm.columnLabels.COLUMN_LABEL_REQUEST,
                vm.columnLabels.COLUMN_LABEL_RESPMSG,
                vm.columnLabels.COLUMN_LABEL_RESPTIME,
                vm.columnLabels.COLUMN_LABEL_AUTH
//                vm.columnLabels.COLUMN_LABEL_USER
            ];

            // Column value filter - All, Valid, Invalid, Missing
            vm.filterColumnValueFilter = appData.COLUMN_VALUE_FILTER;
            vm.filterColumnValue = {};
            angular.forEach(appData.COLUMN_LABELS, function(colFilter) {
                vm.filterColumnValue[colFilter] = [
                    appData.COLUMN_VALUE_FILTER[0],
                    appData.COLUMN_VALUE_FILTER[1],
                    appData.COLUMN_VALUE_FILTER[2],
                    appData.COLUMN_VALUE_FILTER[3]
                ];
            });

            vm.filterApply = {};
            vm.filterApply.device = [];
            vm.filterApply.eventType = [];

            vm.filterApply.display = {};
            vm.filterApply.display.attrs = {};
            vm.filterApply.display.eventType = {};
            vm.filterApply.display.golbalAttrs = {};
            vm.filterApply.display.metrics = {};

            vm.defaultAttrsByEventType = appData.DEFAULT_ATTRS_BY_EVENT_TYPES;
            vm.defaultGlobalAttrsByDeviceType = appData.DEFAULT_GLOBAL_ATTRS_BY_DEVICE_TYPES;

            vm.sideNavActive = "device";

            vm.$on('dataChunk', function (event, dataChunk) {

                var dataObj = dataChunk;
                $scope.$apply(function () {
                    vm.logData.push(dataObj);
                });
            });

            vm.applyFilter = function () {
                vm.filterApply.device = vm.filterSelectedMultiple.device;
                vm.filterApply.attrs = vm.filterSelectedMultiple.attrs;
                vm.filterApply.eventType = vm.filterSelectedMultiple.eventType;
                vm.filterApply.golbalAttrs = vm.filterSelectedMultiple.globalAttrs;
                vm.filterApply.metrics = vm.filterSelectedMultiple.metrics;

                var item;
                for(var i=0; i<appData.FILTERS_ATTRS.length; i++) {
                    item = appData.FILTERS_ATTRS[i].toLowerCase();
                    if(vm.filterApply.attrs.indexOf(item) !== -1) {
                        vm.filterApply.display.attrs[item] = true;
                    } else {
                        vm.filterApply.display.attrs[item] = false;
                    }
                }

                for(var i=0; i<appData.FILTERS_EVENT_TYPE.length; i++) {
                    item = appData.FILTERS_EVENT_TYPE[i].toLowerCase();
                    if(vm.filterApply.eventType.indexOf(item) !== -1) {
                        vm.filterApply.display.eventType[item] = true;
                    } else {
                        vm.filterApply.display.eventType[item] = false;
                    }
                }

                for(var i=0; i<appData.FILTERS_GLOBAL_ATTRS.length; i++) {
                    item = appData.FILTERS_GLOBAL_ATTRS[i].toLowerCase();
                    if(vm.filterApply.golbalAttrs.indexOf(item) !== -1) {
                        vm.filterApply.display.golbalAttrs[item] = true;
                    } else {
                        vm.filterApply.display.golbalAttrs[item] = false;
                    }
                }

                for(var i=0; i<appData.FILTERS_METRICS.length; i++) {
                    item = appData.FILTERS_METRICS[i].toLowerCase();
                    if(vm.filterApply.metrics.indexOf(item) !== -1) {
                        vm.filterApply.display.metrics[item] = true;
                    } else {
                        vm.filterApply.display.metrics[item] = false;
                    }
                }
            };

            vm.sideNavClick = function(id) {
                var sidenav = [
                    "device",
                    "event",
                    "attrs",
                    "globalattr",
                    "metrics",
                    "text"
                ];


                angular.forEach(sidenav, function (label) {
                    if(id.indexOf(label) === -1) {
                        angular.element(document.querySelector('#sidenav_data_' + label)).css({display: 'none'});
                        angular.element(document.querySelector('#sidenav_' + label)).removeClass('active');
                    } else {
                        if(vm.sideNavActive !== id) {
                            vm.sideNavActive = id;
                            angular.element(document.querySelector('#sidenav_data_' + label)).css({display: 'block'});
                            angular.element(document.querySelector('#sidenav_' + label)).addClass('active');
                        }
                    }
                });
            };

            vm.eventTypeChanged = function(etype) {

                if(appData.DEFAULT_ATTRS_BY_EVENT_TYPES.hasOwnProperty(etype)) {
                    if(vm.filterSelectedMultiple.eventType.indexOf(etype) === -1) {
                        // etype is un-checked
                        vm.filterSelectedMultiple.attrs = vm.filterSelectedMultiple.attrs.diff(appData.DEFAULT_ATTRS_BY_EVENT_TYPES[etype]).unique();
                    } else {
                        // etype is checked
                    }

                    updateAttrsByEventType();
                }
            };

            vm.deviceTypeChanged = function(dtype) {

                if(appData.DEFAULT_GLOBAL_ATTRS_BY_DEVICE_TYPES.hasOwnProperty(dtype)) {
                    if(vm.filterSelectedMultiple.device.indexOf(dtype) === -1) {
                        // dtype is un-checked
                        vm.filterSelectedMultiple.globalAttrs = vm.filterSelectedMultiple.globalAttrs.diff(appData.DEFAULT_GLOBAL_ATTRS_BY_DEVICE_TYPES[dtype]).unique();
                    } else {
                        // dtype is checked
                    }

                    updateGlobalAttrsByDeviceType();
                }
            };

            Array.prototype.diff = function(a) {
                return this.filter(function(i) {return a.indexOf(i) < 0;});
            };

            Array.prototype.unique = function() {
                var a = this.concat();
                for(var i=0; i<a.length; ++i) {
                    for(var j=i+1; j<a.length; ++j) {
                        if(a[i] === a[j])
                            a.splice(j--, 1);
                    }
                }
                return a;
            };

            var updateAttrsByEventType = function() {
                angular.forEach(vm.filterSelectedMultiple.eventType, function (eventType) {
                    if(appData.DEFAULT_ATTRS_BY_EVENT_TYPES.hasOwnProperty(eventType)) {
                        vm.filterSelectedMultiple.attrs = vm.filterSelectedMultiple.attrs.concat(appData.DEFAULT_ATTRS_BY_EVENT_TYPES[eventType]).unique();
                    }
                });
            };

            var updateGlobalAttrsByDeviceType = function() {
                angular.forEach(vm.filterSelectedMultiple.device, function (deviceType) {
                    if(appData.DEFAULT_GLOBAL_ATTRS_BY_DEVICE_TYPES.hasOwnProperty(deviceType)) {
                        vm.filterSelectedMultiple.globalAttrs = vm.filterSelectedMultiple.globalAttrs.concat(appData.DEFAULT_GLOBAL_ATTRS_BY_DEVICE_TYPES[deviceType]).unique();
                    }
                });
            };

            // init Attrs & globalAttrs filters
            updateAttrsByEventType();
            updateGlobalAttrsByDeviceType();

            vm.applyColumnValueDisplayFilter = function(column, filterType) {

                if(filterType === "All") {
                    switch (column) {
                        case vm.columnLabels.COLUMN_LABEL_RESPTIME:
                            if(vm.filterColumnValue[vm.columnLabels.COLUMN_LABEL_RESPTIME].includes("All")) {
                                // checked
                                vm.filterColumnValue[vm.columnLabels.COLUMN_LABEL_RESPTIME] = angular.copy(appData.COLUMN_VALUE_FILTER);
                            } else {
                                // un-checked
                            }
                            break;
                        case vm.columnLabels.COLUMN_LABEL_URL:
                            if(vm.filterColumnValue[vm.columnLabels.COLUMN_LABEL_URL].includes("All")) {
                                // checked
                                vm.filterColumnValue[vm.columnLabels.COLUMN_LABEL_URL] = angular.copy(appData.COLUMN_VALUE_FILTER);
                            } else {
                                // un-checked
                            }
                            break;
                        default :
                            console.log('fatal');
                    }
                }
            };

            vm.filterSelectedProp.all = function(filterType) {
                switch (filterType) {
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_DEVICE:
                        vm.filterSelectedMultiple.device = angular.copy(appData.FILTERS_DEVICE_TYPE);
                        vm.filterSelectedMultiple.globalAttrs = angular.copy(appData.FILTERS_GLOBAL_ATTRS);
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_ATTRS:
                        vm.filterSelectedMultiple.attrs = angular.copy(appData.FILTERS_ATTRS);
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_EVENTTYPES:
                        vm.filterSelectedMultiple.eventType = angular.copy(appData.FILTERS_EVENT_TYPE);
                        vm.filterSelectedMultiple.attrs = angular.copy(appData.FILTERS_ATTRS);
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_GLOBALATTRS:
                        vm.filterSelectedMultiple.globalAttrs = angular.copy(appData.FILTERS_GLOBAL_ATTRS);
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_METRICS:
                        vm.filterSelectedMultiple.metrics = angular.copy(appData.FILTERS_METRICS);
                        break;
                    default:
                        console.log('fatal');
                        break;
                }

            };

            vm.filterSelectedProp.none = function(filterType) {
                switch (filterType) {
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_DEVICE:
                        vm.filterSelectedMultiple.device = [];
                        vm.filterSelectedMultiple.globalAttrs = [];
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_ATTRS:
                        vm.filterSelectedMultiple.attrs = [];
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_EVENTTYPES:
                        vm.filterSelectedMultiple.eventType = [];
                        vm.filterSelectedMultiple.attrs = [];
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_GLOBALATTRS:
                        vm.filterSelectedMultiple.globalAttrs = [];
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_METRICS:
                        vm.filterSelectedMultiple.metrics = [];
                        break;
                    default:
                        console.log('fatal');
                        break;
                }

            };

            vm.filterSelectedProp.default = function(filterType) {
                switch (filterType) {

                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_DEVICE:
                        vm.filterSelectedMultiple.device = [
                            appData.FILTERS_DEVICE_TYPE[0],
                            appData.FILTERS_DEVICE_TYPE[2]
                        ];
                        vm.filterSelectedMultiple.globalAttrs = [];
                        updateGlobalAttrsByDeviceType();
//                        vm.filterSelectedMultiple.device = filterSelectedDefault.device;
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_ATTRS:
                        updateAttrsByEventType();
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_EVENTTYPES:
                        vm.filterSelectedMultiple.eventType = [
                            appData.FILTERS_EVENT_TYPE[0],
                            appData.FILTERS_EVENT_TYPE[4],
                            appData.FILTERS_EVENT_TYPE[2],
                            appData.FILTERS_EVENT_TYPE[15],
                            appData.FILTERS_EVENT_TYPE[16],
                            appData.FILTERS_EVENT_TYPE[12],
                            appData.FILTERS_EVENT_TYPE[17]
                        ];
                        vm.filterSelectedMultiple.attrs = [];
                        updateAttrsByEventType();
//                        vm.filterSelectedMultiple.eventType = filterSelectedDefault.eventType;
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_GLOBALATTRS:
                        updateGlobalAttrsByDeviceType();
                        break;
                    case appData.FILTER_TYPE_LABELS.FILTER_TYPE_LABEL_METRICS:
                        vm.filterSelectedMultiple.metrics = [
                            appData.FILTERS_METRICS[0],
                            appData.FILTERS_METRICS[2],
                            appData.FILTERS_METRICS[3],
                            appData.FILTERS_METRICS[5]
                        ];
//                        vm.filterSelectedMultiple.metrics = filterSelectedDefault.metrics;
                        break;
                    default:
                        console.log('fatal');
                        break;
                }

            };

            function chunk(arr, size) {
                var newArr = [];
                for (var i = 0; i < arr.length; i += size) {
                    newArr.push(arr.slice(i, i + size));
                }
                return newArr;
            }

            vm.sideNavClick('sidenav_device');
            vm.applyFilter();

        }]);

knowDebugApp
    .filter('filterDevice', ['appData', function (appData) {
        return function (items, scope) {

            var filtered = [];
            var selectedOption = scope.filterApply.device;

            if (!angular.isUndefined(selectedOption) && (selectedOption.length === appData.FILTERS_DEVICE_TYPE.length)) {
                filtered = items;
            } else {

                angular.forEach(items, function (item) {
                    if(!angular.isUndefined(item) && item.hasOwnProperty('event') && item.event.hasOwnProperty('clientContext') &&
                        item.event.clientContext.hasOwnProperty("env") && item.event.clientContext.env.hasOwnProperty("platform")) {
                        if (selectedOption.indexOf(item.event.clientContext.env.platform.toLowerCase()) !== -1) {
                            filtered.push(item);
                        }
                    }
                });
            }

            return filtered;
        };
    }]);

knowDebugApp
    .filter('filterEventType', ['appData', function (appData) {
        return function (items, scope) {

            var filtered = [];
            var selectedOption = scope.filterApply.eventType;

            if (!angular.isUndefined(selectedOption) && (selectedOption.length === appData.FILTERS_EVENT_TYPE.length)) {
                filtered = items;
            } else {

                angular.forEach(items, function (item) {
                    if (selectedOption.indexOf(item.event.eventType.toLowerCase()) !== -1) {
                        filtered.push(item);
                    }
                });
            }

            return filtered;
        };
    }]);

knowDebugApp
    .filter('searchFilterClientId', function () {
        return function (items, scope) {

            var filtered = [];

            if(scope.filterSelectedText.clientId === '') {
                filtered = items;
            } else {

                angular.forEach(items, function(item) {
                    if(!angular.isUndefined(item) && item.hasOwnProperty('clientId') &&
                        (item.clientId.toLowerCase().includes(scope.filterSelectedText.clientId.toLowerCase()))) {
                        filtered.push(item);
                    }
                });
            }

            return filtered;
        };
    });

knowDebugApp
    .filter('searchFilterUserId', function () {
        return function (items, scope) {

            var filtered = [];

            if(scope.filterSelectedText.userId === '') {
                filtered = items;
            } else {

                angular.forEach(items, function(item) {
                    if(!angular.isUndefined(item) && item.hasOwnProperty('userId') &&
                        ((item.userId.toLowerCase().includes(scope.filterSelectedText.userId.toLowerCase())))) {
                        filtered.push(item);
                    }
                });
            }

            return filtered;
        };
    });