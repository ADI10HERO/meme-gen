function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; }

function drawBackgroundImage(canvas, ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const img = document.getElementById('salt-bae');  
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function getRandomImageSize(min, max, width, height) {
  const ratio = width / height;
  width = getRandomInt(min, max);
  height = width / ratio;  
  return { width, height };
}

function drawSalt(src, canvas, ctx) {
  const image = new Image();
  image.src = src;
  
   image.onload = function() {
    for (let i = 0; i < 8; i++) {
      const randomX = getRandomInt(10, canvas.width/2);
      const randomY = getRandomInt(canvas.height-300, canvas.height);
      const dimensions = getRandomImageSize(20, 100, image.width, image.height);
      ctx.drawImage(image, randomX, randomY, dimensions.width, dimensions.height);
    }
  }
 image.setAttribute('crossOrigin', 'anonymous'); 
  return image;
}

function updateImage(file, img){
  img.src = URL.createObjectURL(file);
}

function updateImageSrc(url, img){
  img.src = url;
}

function addLink() {
  var link = document.createElement('a');
  link.innerHTML = 'Download!';
  link.addEventListener('click', function(e) {
    link.href = canvas.toDataURL();
    link.download = "salt-bae.png";
  }, false); 
  link.className = "instruction";
  document.querySelectorAll('section')[1].appendChild(link);
}

onload = function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  drawBackgroundImage(canvas, ctx);
  const saltImage = drawSalt('http://res.cloudinary.com/dlwnmz6lr/image/upload/v1526005050/chadwick-boseman-inspired-workout-program-wide_phczey.webp', canvas, ctx);
const input = document.querySelector("input[type='file']");
  input.addEventListener('change', function() {
    drawBackgroundImage(canvas, ctx);
    updateImage(this.files[0], saltImage);
  });
  
  addLink();
  
  const imgs = document.querySelector('.image-options');
  imgs.addEventListener('click', function(e) {
    drawBackgroundImage(canvas, ctx);
    let target = e.target;
    updateImageSrc(target.src, saltImage);
  });
};