var knowDebugApp = angular.module('knowDebugApp', [
    'btorfs.multiselect',
    'checklist-model'
]);


knowDebugApp
    .run(function($rootScope, $location, $window, $timeout) {

        var serverUrl = app_config.host.api;
        var connected = false;
        const RETRY_INTERVAL = 10000;
        var timeout;
        var socket = window.io.connect(serverUrl);
        broadcastEvents(socket);

        var retryConnectOnFailure = function(retryInMilliseconds) {
            setTimeout(function() {
                if (!connected) {
                    $.get('/ping', function(data) {
                        connected = true;
                    });
                    retryConnectOnFailure(retryInMilliseconds);
                }
             }, retryInMilliseconds);
        };

        function broadcastEvents(socket) {

            // CONNECT
            socket.on('connect', function() {
                //connected = true;
                socket.emit('telkonlog');
                clearTimeout(timeout);
                console.log("Connected to server");
            });

            // DISCONNECT
            socket.on('disconnect', function() {
                connected = false;
                console.log('Disconnected! Trying to automatically reconnect in ' +
                    RETRY_INTERVAL/1000 + ' seconds.');
                retryConnectOnFailure(RETRY_INTERVAL);
            });

            // DATA
            socket.on('logData', function (dataChunk) {
                $rootScope.$broadcast('dataChunk', dataChunk);
            });

        }
    });