(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let today = new Date(),
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    nextYear = yyyy + 1,
    dayMonth = "03/30/",
    birthday = dayMonth + yyyy;

  today = mm + "/" + dd + "/" + yyyy;
  if (today > birthday) {
    birthday = dayMonth + nextYear;
  }

  const countDown = new Date(birthday).getTime();
  let celebrated = false;

  const x = setInterval(function () {
    const now = new Date().getTime(),
      distance = countDown - now;
    document.getElementById("days").innerText = Math.floor(distance / day);
    document.getElementById("hours").innerText = Math.floor(
      (distance % day) / hour,
    );
    document.getElementById("minutes").innerText = Math.floor(
      (distance % hour) / minute,
    );
    document.getElementById("seconds").innerText = Math.floor(
      (distance % minute) / second,
    );

    if (distance < 0 && !celebrated) {
      celebrated = true;
      document.getElementById("headline").innerText =
        "It's Mr Steer's birthday!";
      document.getElementById("countdown").style.display = "none";
      document.getElementById("content").style.display = "block";
      fireConfetti();
      clearInterval(x);
    }
  }, 1000);

  function fireConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    if (!canvas) return;
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#e8b64c", "#f4d17e", "#2f6fed", "#5b8ff9", "#f7f4ee"];
    const pieces = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height,
      size: 6 + Math.random() * 6,
      speed: 2 + Math.random() * 3,
      drift: -1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * Math.PI,
    }));

    let frame = 0;
    const maxFrames = 420;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.tilt += 0.05;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tilt);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        canvas.style.display = "none";
      }
    }
    draw();
  }

  window.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("celebrate-btn");
    if (btn) btn.addEventListener("click", fireConfetti);
  });
})();
