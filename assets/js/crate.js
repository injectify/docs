var crateTag = document.createElement('script')
crateTag.src = 'https://crate.widgetbot.io/v2'
crateTag.innerHTML = 'new Crate(' + JSON.stringify({
  server: '335836376031428618',
  channel: '377173106940182529',
  options: '0002',
  colors: {
    toggle: '#3F51B5'
  },
  style: 'material',
  beta: false
}) + ')'

document.head.appendChild(crateTag)