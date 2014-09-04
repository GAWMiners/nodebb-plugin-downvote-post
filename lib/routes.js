function renderAdmin(req, res, next) {
  res.render('admin/downvote', {})
}

module.exports = function(app, mw, controllers) {
  app.get('/admin/downvote', mw.admin.buildHeader, renderAdmin)
  app.get('/api/admin/downvote', renderAdmin)
}
