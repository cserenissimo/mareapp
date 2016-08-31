(function() {
  'use strict';

  var admobData = {};

  // Determine platform
  if (/(android)/i.test(navigator.userAgent)) {
    admobData = {
        banner: ' ca-app-pub-2440129720714268/2329457133'
    };
  } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobData = {
        banner: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    };
  } else {
    admobData = {
        banner: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    };
  }

  function setBanner() {
    if (AdMob) {
        AdMob.createBanner({
            adId : admobData.banner,
            position : AdMob.AD_POSITION.BOTTOM_CENTER,
            autoShow : true
        });
    }
  }

  document.addEventListener('deviceready', setBanner, false);
}());