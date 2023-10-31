// export function detectBrowser() {
//   var sBrowser,
//     sUsrAg = navigator.userAgent;

//   // The order matters here, and this may report false positives for unlisted browsers.

//   if (sUsrAg.indexOf('Firefox') > -1) {
//     sBrowser = 'Firefox';
//     // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
//   } else if (sUsrAg.indexOf('SamsungBrowser') > -1) {
//     sBrowser = 'Samsung';
//     // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
//   } else if (sUsrAg.indexOf('Opera') > -1 || sUsrAg.indexOf('OPR') > -1) {
//     sBrowser = 'Opera';
//     // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
//   } else if (sUsrAg.indexOf('Trident') > -1) {
//     sBrowser = 'IE';
//     // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
//   } else if (sUsrAg.indexOf('Edge') > -1) {
//     sBrowser = 'Edge';
//     // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
//   } else if (sUsrAg.indexOf('Chrome') > -1) {
//     sBrowser = 'Chrome';
//     // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
//   } else if (sUsrAg.indexOf('Safari') > -1) {
//     sBrowser = 'Safari';
//     // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
//   } else {
//     sBrowser = 'unknown';
//   }

//   console.log('check browser: ', sBrowser);
//   return sBrowser;
// }

export function detectBrowser() {
  const agent = window.navigator.userAgent.toLowerCase();

  switch (true) {
    case agent.indexOf('edge') > -1:
      return 'MS Edge';
    case agent.indexOf('edg/') > -1:
      return 'Edge ( chromium based)';
    case agent.indexOf('opr') > -1 && !!window.opr:
      return 'Opera';
    case agent.indexOf('chrome') > -1 && !!window.chrome:
      return 'Chrome';
    case agent.indexOf('trident') > -1:
      return 'MS IE';
    case agent.indexOf('firefox') > -1:
      return 'Mozilla Firefox';
    case agent.indexOf('safari') > -1:
      return 'Safari';
    default:
      return 'other';
  }
}