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

/**
 * Analytics
 */
var sc_project=11546194
var sc_invisible=1
var sc_security="b588ced0"
var sc_https=1
var scJsHost = (("https:" == document.location.protocol) ?
"https://secure." : "http://www.");
document.write("<sc"+"ript type='text/javascript' async src='" + scJsHost + "statcounter.com/counter/counter_xhtml.js'></"+"script>")