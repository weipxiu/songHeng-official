(function() {
  function App() {}
  App.prototype = {
    name: 'Contact',
    init: function() {
    },
  };

  $(function() {
    var app = new App();
    app.init();
  });
})();
