var request = require('request')
  , User = module.parent.require('./user')
  , Posts = module.parent.require('./posts')
  , meta = module.parent.require('./meta')
  , winston = module.parent.require('winston')
  , Downvote = {}

module.exports = Downvote

Downvote.init = function(app, mw, controllers, cb) {
  require('./lib/routes')(app, mw, controllers)
  cb()
}

Downvote.downvote = function(data) {
  var url = meta.config['downvote:apiUrl']
  var headerField = meta.config['downvote:headerField']
  var token = meta.config['downvote:apiToken']

  if (!url) {
    winston.error('Missing downvote api url')
    return
  }

  if (!headerField) {
    winston.error('Missing token header field')
    return
  }

  if (!token) {
    winston.error('Missing API token')
    return
  }

  var opts = {
    uri: url
  , json: true
  , headers: {}
  }

  opts.headers[headerField] = token

  if (!data.pid) return
  Posts.getPostField(data.pid, 'uid', function(err, uid) {
    if (err || !uid) return
    User.getUserField(uid, 'email', function(err, email) {
      if (email) {
        var d = {
          pid: data.pid
        , uid: data.uid
        , email: email
        }
        opts.qs = d
        request.post(opts, function(err, res, body) {
          if (err) {
            winston.error('error sending post request', err)
          } else if (res.statusCode >= 400) {
            winston.error('received status code >= 400'
                        , body
                        , data.pid
                        , data.uid
                        , res.statusCode)
          }
        })
      }
    })
  })
}

Downvote.addNavigation = function(header, cb) {
  header.plugins.push({
    route: '/downvote'
  , icon: 'fa-chevron-down'
  , name: 'Downvotes'
  })
  cb(null, header)
}
