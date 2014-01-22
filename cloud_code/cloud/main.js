Parse.Cloud.job("wake", function(request, status) {
  // Set up to modify user data
  Parse.Cloud.httpRequest({
      url: 'http://www.codegarden.it/wake.html',
      success: function(httpResponse) {
        status.success("ok");
      },
      error: function(httpResponse) {
        status.error("error")
      }
    });
});
