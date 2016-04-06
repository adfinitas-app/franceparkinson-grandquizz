/* form-to-db */
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function makeCorsRequest(data) {
  var url = 'https://form-to-db.herokuapp.com/';
  var body = JSON.stringify(data);
  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }
  xhr.setRequestHeader('Content-Type', 'application/json');
  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    alert("Vos réponses ont bien été prises en compte !");
  };
  // Error Handler
  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };
  xhr.send(body);
}
/* end form-to-db */

function pureStr(value) {
  return (value
      .replace(/'/g, "%27")
      .replace(/"/g, "&quot;"));
}

function formToDb() {
  var data = {
    "schema": "parkinson",
    "db": {
      "jeune-58-ans": pureStr($("input[name='jeune']:checked + label").html()),
      "sexe": pureStr($("select[name='type']").val()),
      "age": pureStr($("select[name='age']").val()),
      "q1": pureStr($("input[name='question-01']:checked + label").html()),
      "q2": pureStr($("input[name='question-02']:checked + label").html()),
      "q3": pureStr($("input[name='question-03']:checked + label").html()),
      "q4": pureStr($("input[name='question-04']:checked + label").html()),
      "q5": pureStr($("input[name='question-05']:checked + label").html()),
      "origin": "quiz",
      "civility": pureStr($("select[name='civility']").val()),
      "firstname": pureStr($("input[name='firstname']").val()),
      "lastname": pureStr($("input[name='lastname']").val()),
      "email": pureStr($("input[name='email']").val())
    },
    "customer" : {
      "site_id": "5831c57a4b7ce69a45ee",
      "identify": {
	"email": pureStr($("input[name='email']").val()),
	"civility": pureStr($("select[name='civility']").val()),
	"firstname": pureStr($("input[name='firstname']").val()),
	"lastname": pureStr($("input[name='lastname']").val())
      },
      "event": {
	"name": "Quiz",
	"data": {
	  "jeune-58-ans": pureStr($("input[name='jeune']:checked + label").html()),
	  "sexe": pureStr($("select[name='type']").val()),
	  "age": pureStr($("select[name='age']").val()),
	  "q1": pureStr($("input[name='question-01']:checked + label").html()),
	  "q2": pureStr($("input[name='question-02']:checked + label").html()),
	  "q3": pureStr($("input[name='question-03']:checked + label").html()),
	  "q4": pureStr($("input[name='question-04']:checked + label").html()),
	  "q5": pureStr($("input[name='question-05']:checked + label").html()),
	  "origin": "quiz",
	}
      }
    }
  }
  makeCorsRequest(data);
}

function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function removeClass()
{
  if ($(this).attr("type") == "radio") {
    $("input[name=" + $(this).attr("name") + "]").parent().removeClass("error");
  } else {
    $(this).parent().removeClass("error");
  }
  $(this).off("change");
}

function showError(elem) {
  if (elem.attr("type") == "radio") {
    $("input[name=" + elem.attr("name") + "]").parent().addClass("error");
    $("input[name=" + elem.attr("name") + "]").on("change", removeClass);
  } else {
    elem.parent().addClass("error");
    elem.on("change", removeClass);
  }
}

function scrollToElem(elem) {
  $(window).scrollTop(elem.offset().top);
}

function isValid() {
  var status = true;
  $(".error").removeClass("error");;
  $("#mainForm input, #mainForm select").each(function() {
    if ($(this).attr("required") && $(this).attr != "submit") {
      if ($(this).attr("type") == "radio") {
	if ($("input[name=" + $(this).attr("name") + "]:checked").length != 1) {
	  showError($(this));
	  if (status == true)
	    scrollToElem($(this));
	  status = false;
	}
      } else {
	if ($(this).val() == "" || $(this).val() == null ||
	    ($(this).attr("type") == "email" && isValidEmail($(this).val()) == false)) {
	  showError($(this));
	  if (status == true)
	    scrollToElem($(this));
	  status = false;
	}
      }
    }
  });
  return (status);
}

function launch() {
  $("#mainForm").on("submit", function(e) {
    e.preventDefault();
    if (isValid()) {
      formToDb();
    }
  });
}

$(document).ready(launch);
