// if confirm will give user a pop up alert and ask them a question
// line 9 reloads page with the new changes

window.addEventListener('load', function(e) {
  if (window.applicationCache) {
    window.applicationCache.addEventListener('updateready', function(e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
          // Browser downloaded a new app cache.
          // Swap it in and reload the page to get the new hotness.
          if (confirm('Updates are available for this mobile web app. Load them?')) {
            window.applicationCache.swapCache();
            window.location.reload();
          }
        } else {
          // Manifest didn't changed. Nothing new to server.
        }
    }, false);
  }
}, false);

