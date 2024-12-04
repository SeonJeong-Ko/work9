let currentIndex = 0;

function changeSlide(direction) {
  const galleryItems = document.querySelector('.gallery-items');
  const totalItems = galleryItems.children.length;
  const itemWidth = galleryItems.children[0].clientWidth;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalItems - 1;
  } else if (currentIndex >= totalItems) {
    currentIndex = 0;
  }

  galleryItems.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  adjustGalleryHeight();
}

function adjustGalleryHeight() {
  const gallery = document.querySelector('.gallery');
  const currentItem = document.querySelector('.gallery-items').children[currentIndex];
  
  if (currentItem) {
    const itemHeight = currentItem.clientHeight;
    gallery.style.height = `${itemHeight}px`;
  }
}

function openInNewWindow(src) {
  if (src) {
    const newWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');

    if (newWindow) {
      const isVideo = src.endsWith('.mp4');

      const content = isVideo
        ? `<video src="${src}" autoplay muted controls style="max-width: 100%; max-height: 100%;" preload="auto"></video>`
        : `<img src="${src}" alt="미디어" style="max-width: 100%; max-height: 100%;">`;

      newWindow.document.write(`
        <html>
          <head>
            <title>미디어 보기</title>
            <style>
              body {
                margin: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: black;
                color: white;
                height: 100vh;
              }
              img, video {
                max-width: 100%;
                max-height: 100%;
              }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);

      newWindow.document.close();
    }
  }
}

window.addEventListener('load', adjustGalleryHeight);
window.addEventListener('resize', adjustGalleryHeight);