/* Typing demo for the example chat. Needs the markup with ids: example, chat-log, chat-input, typed, replay. */
(function () {
  var fig = document.getElementById("example");
  var log = document.getElementById("chat-log");
  var typed = document.getElementById("typed");
  var replay = document.getElementById("replay");
  if (!fig || !log || !typed) return;

  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (calm || !("IntersectionObserver" in window)) return;

  var script = [];
  Array.prototype.forEach.call(log.querySelectorAll("p"), function (p) {
    var label = p.querySelector("span");
    var name = label ? label.textContent : "";
    script.push({ bot: p.classList.contains("bot"), name: name, text: p.textContent.replace(name, "").trim() });
  });
  if (!script.length) return;

  var fullHeight = log.offsetHeight;
  log.style.minHeight = fullHeight + "px";
  log.innerHTML = "";
  fig.classList.add("live");

  var token = 0;
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function bubble(item) {
    var p = document.createElement("p");
    if (item.bot) p.className = "bot";
    var s = document.createElement("span");
    s.textContent = item.name;
    p.appendChild(s);
    return p;
  }

  async function play() {
    var my = ++token;
    log.innerHTML = "";
    typed.textContent = "";
    if (replay) replay.hidden = true;

    for (var i = 0; i < script.length; i++) {
      var item = script[i];
      var c;
      if (!item.bot) {
        await wait(500); if (my !== token) return;
        for (c = 1; c <= item.text.length; c++) {
          typed.textContent = item.text.slice(0, c);
          await wait(32); if (my !== token) return;
        }
        await wait(350); if (my !== token) return;
        typed.textContent = "";
        var cp = bubble(item);
        cp.appendChild(document.createTextNode(item.text));
        log.appendChild(cp);
      } else {
        var bp = bubble(item);
        var dots = document.createElement("span");
        dots.className = "dots";
        dots.innerHTML = "<i></i><i></i><i></i>";
        bp.appendChild(dots);
        log.appendChild(bp);
        await wait(900); if (my !== token) return;
        bp.removeChild(dots);
        var tn = document.createTextNode("");
        bp.appendChild(tn);
        for (c = 1; c <= item.text.length; c++) {
          tn.nodeValue = item.text.slice(0, c);
          await wait(14); if (my !== token) return;
        }
      }
    }
    if (replay) replay.hidden = false;
  }

  if (replay) replay.addEventListener("click", play);

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { io.disconnect(); play(); }
    });
  }, { threshold: 0.4 });
  io.observe(fig);
})();
