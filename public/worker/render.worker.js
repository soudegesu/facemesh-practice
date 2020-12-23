let canvas;

const render = () => {
  if (canvas) {
    const context = canvas.getContext('2d');
    context.drawImage();
    console.log(context);
  }
  requestAnimationFrame(render);
};

onmessage = (event) => {
  const operation = event.data.operation;
  switch (operation) {
    case 'render':
      canvas = event.data.canvas;
      render();
      break;
  }
};
