firebase.initializeApp({
  apiKey: "AIzaSyDVV56UFhRqmMya7jOWk2oWhFvOwgQtjIA",
  authDomain: "july-the-vote.firebaseapp.com",
  databaseURL: "https://july-the-vote.firebaseio.com",
  projectId: "july-the-vote",
  storageBucket: "july-the-vote.appspot.com",
  messagingSenderId: "936802549887",
  appId: "1:936802549887:web:2206d88f1226db15bfbf4a"
});

var database = firebase.database();

document.querySelector("#js-submit").addEventListener("click", function() {
  var name = document.querySelector("#js-name").value;
  var response = document.querySelector("#js-response").value;
  var confirmed = document.querySelector("#js-confirm").checked;
  if (!name || !response || !confirmed) {
    alert("Please complete required fields");
    return;
  }
  database.ref("responses").push({
    "name": name,
    "response": response
  }, function(error) {
    if (error) {
      alert("There was an error, please try again");
    } else {
      document.querySelector("#js-write").textContent = "Thank you for the response!";
    }
  });
});

document.querySelector("#js-response").addEventListener("keypress", function(e) {
  if (e.keyCode == 13 || e.which == 13) {
    e.preventDefault();
    return false;
  }
});

database.ref("responses").on("value", function(snapshot) {
  
  if (!snapshot.val())
    return;
  
  var ids = Object.keys(snapshot.val());
  responses = Object.values(snapshot.val());
  for (let i = 0; i < responses.length; i++)
    responses[i].id = ids[i];
  
  var container = document.querySelector("#js-read");
  for (let i = 0; i < responses.length; i++) {
    if (!document.querySelector("#" + responses[i].id)) {
      let el = document.createElement("li");
      el.setAttribute("id", responses[i].id);
      el.textContent = responses[i].response + " - " + responses[i].name;
      container.insertBefore(el, container.firstChild);
    }
  }

});

(function() {
  var el = document.querySelector("#js-response");
  function resize() {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }
  function delayedResize() {
    window.setTimeout(resize, 0);
  }
  el.addEventListener("change", resize);
  el.addEventListener("cut", delayedResize);
  el.addEventListener("paste", delayedResize);
  el.addEventListener("drop", delayedResize);
  el.addEventListener("keydown", delayedResize);
  resize();
})();
