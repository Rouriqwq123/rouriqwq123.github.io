(() => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "2"; // 比背景高，比 UI 低
  document.body.appendChild(canvas);

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const snowflakes = Array.from({ length: 120 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2 + 1,
    s: Math.random() * 0.5 + 0.2,
    dx: Math.random() * 0.5 - 0.25
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();

    snowflakes.forEach(f => {
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    });

    ctx.fill();
    update();
    requestAnimationFrame(draw);
  }

  function update() {
    snowflakes.forEach(f => {
      f.y += f.s;
      f.x += f.dx;

      if (f.y > height) {
        f.y = -5;
        f.x = Math.random() * width;
      }
      if (f.x > width) f.x = 0;
      if (f.x < 0) f.x = width;
    });
  }

  draw();
})();
