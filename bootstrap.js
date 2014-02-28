// inject content scripts into DOM
var iframe = document.getElementById('contentPane');
iframe.onload = function() {
  var win = this.contentWindow;
  var doc = this.contentDocument;
  var callback = function() {
    var script = doc.createElement('script');
    script.src = chrome.extension.getURL('fix-kronos.js');
    doc.head.appendChild(script);
  };

  if (doc.readyState != "complete") {
    win.onload = callback;
  }
  else {
    callback();
  }
};
