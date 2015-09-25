/**
 * Created by yxia on 9/8/15.
 */
'use strict';

// Declare app level module which depends on filters, and services
angular.module('mapChat.config', [])

  // version of this seed app is compatible with angularFire 1.0.0
  // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
  .constant('version', '1.0.0')

  // where to redirect users if they need to authenticate (see security.js)
  .constant('loginRedirectPath', '/login')

  // your Firebase data URL goes here, no trailing slash
  .constant('FBURL', 'https://qd.firebaseio.com');

