document.querySelectorAll('pre.highlight').forEach(function (block) {
  var button = document.createElement('button');
  button.className = 'copy-btn';
  button.type = 'button';
  button.innerText = 'Copy';
  button.onclick = function () {
    navigator.clipboard.writeText(block.innerText);
    button.innerText = 'Copied!';
    setTimeout(function () { button.innerText = 'Copy'; }, 2000);
  };
  block.style.position = 'relative';
  block.appendChild(button);
});
