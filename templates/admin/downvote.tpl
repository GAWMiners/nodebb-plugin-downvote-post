<h1>Downvotes</h1>

<hr>

<form class="downvote-form">
  <p>Configure the POST request options for when a post is downvoted</p>
  <fieldset>
    <div class="row">
      <div class="col-sm-12">
        <div class="form-group">
          <label for="apiUrl">POST URL</label>
          <input type="text" id="downvote:apiUrl" data-field="downvote:apiUrl" title="API URL" class="form-control" placeholder="API URL">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for="headerField">Header Field (Ex. <code>X-Auth-Token</code>)</label>
          <input type="text" id="downvote:headerField" data-field="downvote:headerField" title="Header Field" class="form-control" placeholder="Header Field">
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group">
          <label for="apiToken">API Token (The value to be sent in <code>Header Field</code>)</label>
          <input type="text" id="downvote:apiToken" data-field="downvote:apiToken" title="API Token" class="form-control" placeholder="API Token">
        </div>
      </div>
    </div>
    <button class="btn btn-lg btn-primary" id="save">Save</button>
  </fieldset>
</form>

<script>
  require(['forum/admin/settings'], function(Settings) {
    Settings.prepare()
  })
</script>
