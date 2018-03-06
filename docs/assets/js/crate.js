var params = new URLSearchParams(location.search)
if (!params.has('embedded')) {
  /**
   * Discord button
   */
  var crateTag = document.createElement('script')
  crateTag.src = 'https://crate.widgetbot.io/v2'
  crateTag.innerHTML = 'new Crate(' + JSON.stringify({
    server: '335836376031428618',
    channel: '377173106940182529',
    options: '0002',
    colors: {
      toggle: '#3F51B5'
    },
    notifications: {
      toasts: {
        visibilityTime: 0
      }
    },
    style: 'material',
    beta: true
  }) + ')'

  document.head.appendChild(crateTag)
}

/**
 * Analytics
 */
var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(["setCookieDomain", "*.injectify.samdd.me"]);
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="//analytics.samdd.me/";
  _paq.push(['setTrackerUrl', u+'piwik.php']);
  _paq.push(['setSiteId', '2']);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();
