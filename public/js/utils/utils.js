(function(app) {
    app.utils = {
        one: function(element, event, _callback, useCapture) {
            element.addEventListener(event, callback, useCapture);

            function callback(event) {
                element.removeEventListener(event, callback, useCapture);
                _callback(event);
            }
        }
    };
})(window);