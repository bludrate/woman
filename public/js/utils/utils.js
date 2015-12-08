(function(app) {
    app.utils = {
        one: function(element, event, _callback, useCapture) {
            element.addEventListener(event, callback, useCapture);

            function callback(event) {
                element.removeEventListener(event, callback, useCapture);
                _callback(event);
            }
        },

        send: function(url, method, data) {
            method = method || 'GET';

            return new Promise(function(resolve, reject) {
                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState === 4) {
                        if (xmlhttp.status === 200) {
                            resolve(JSON.parse(xmlhttp.responseText));
                        } else {
                            reject(xmlhttp);
                            console.error('error while getting file from ' + url, xmlhttp);
                        }
                    }
                };

                xmlhttp.open(method, url, true);

                xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

                xmlhttp.send(JSON.stringify(data));
            });
        }
    };
})(window);