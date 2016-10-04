$(document).ready(function(){
  submitForm();
});

function submitForm(){
  $('#createIssue').on("click", function(event){
    var repoName = $('#repoName').val()
    var repoOwner = $('#repoOwner').val()
    var title = $('#title').val()
    var body = $('#body').val()
    createIssue(repoName, repoOwner, title, body);
    event.preventDefault();
  });
}

function createIssue(repoName, repoOwner, title, body){
  var url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`
  var issue_obj = {
    "title" : title,
    "body" : body
  }
  $.ajax({
    "url" : url,
    "type" : "POST",
    "dataType" : "json",
    // beforeSend: function(xhr){
    //   xhr.setRequestHeader("Authorization", "token " + interactor.token)
    // },
    "data" : JSON.stringify(issue_obj),
    success : handleResponse
  }).fail(function(){
    handleError();
  })
}

class GithubInteractor {
  constructor(token){
    this.token = token
    this.baseURL = "https://api.github.com/repos/"
  }
}

var interactor = new GithubInteractor(ENV['GITHUB_API_KEY'])

function handleResponse(data){
  var url = data.url;
  var title = data.title;
  $('#issue').append(`<a href='${url}'>${title}</a>`)
}

function handleError(){
  console.log("Post error: Unauthorized")
  $('#issue').append(`Post error: Unauthorized`)
}