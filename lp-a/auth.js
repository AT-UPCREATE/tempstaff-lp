(function () {
  var KEY = 'stg_auth';
  if (sessionStorage.getItem(KEY) !== '1') {
    var dest = location.pathname.replace(/\/[^/]*$/, '/') + 'login.html';
    location.replace(dest + '?from=' + encodeURIComponent(location.href));
  }
})();
