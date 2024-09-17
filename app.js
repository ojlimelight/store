window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0)
});


// logo and cart changer
window.onscroll = function() {myFunction()};

function myFunction() {
  var container = document.getElementById("container");
  var logoImg = document.querySelector(".logo img");
  var toggleBtnIcon = document.querySelector('.toggle_btn img');
  if (window.pageYOffset > 0) {
    container.classList.add("sticky");
    logoImg.src = "./IMAGES/logo/black logo.png";
    toggleBtnIcon.src = "./IMAGES/shortcut icon/bars-solid black.png";
  } else {
    container.classList.remove("sticky");
    logoImg.src = "./IMAGES/logo/white logo.png";
    toggleBtnIcon.src = "./IMAGES/shortcut icon/bars-solid white.png";
  }
}


const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function () {
  dropDownMenu.classList.toggle('open')
  const isOpen = dropDownMenu.classList.contains('open')

  // toggleBtnIcon.classList = isOpen
  // ? "./IMAGES/shortcut icon/bars-solid white.png"
  // : "./IMAGES/shortcut icon/bars-solid white.png"
}

//banner section image changer
const featureImg = document.querySelector('.feature-img');
const images = [
    './IMAGES/products/BAKER Aspen.png',
    './IMAGES/products/removebg-preview.png',
    './IMAGES/products/women flat.png',
    './IMAGES/products/black half.png'
];
let currentImageIndex = 0;

function changeImage() {
    featureImg.src = images[currentImageIndex];
    currentImageIndex = (currentImageIndex + 1) % images.length;
}

setInterval(changeImage, 5000); // Change image every 5 seconds

// About Us overflow

document.getElementById('show-more-btn').addEventListener('click', function() {
  var visionMission = document.getElementById('vision-mission');
  var btn = document.getElementById('show-more-btn');
  
  if (visionMission.classList.contains('active')) {
    visionMission.classList.remove('active');
    btn.textContent = 'Show More';
  } else {
    visionMission.classList.add('active');
    btn.textContent = 'Show Less';
  }
});






// gallery page
$(document).ready(function() {
  $('.button').click(function() {
    $(this).addClass('active').siblings().removeClass('active');

    var filter = $(this).attr('data-filter');

    if (filter == 'all') {
      $('.image').show(400);
    } else {
      $('.image').not('.' + filter).hide(200);
      $('.image').filter('.' + filter).show(400);
    }

  });

  $('.gallery').magnificPopup({

    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true
    }

  });

  // Copy series code to clipboard when clicked
  $('.series-code').click(function() {
    var seriesCode = $(this).text().trim().split(":")[1].trim();
    navigator.clipboard.writeText(seriesCode).then(function() {
      // Code copied to clipboard successfully
    }, function(err) {
      console.error('Failed to copy series code: ', err);
    });
  });
});


// form for gallery

document.getElementById('image').addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('previewImage').src = e.target.result;
      document.getElementById('previewImage').style.display = 'block';
    }
    reader.readAsDataURL(file);
  }
});

document.getElementById('colors').addEventListener('change', function() {
  const selectedColor = this.value;
  const colorPreview = document.getElementById('colorPreview');
  colorPreview.style.backgroundColor = selectedColor;
  colorPreview.style.display = 'block';
});

document.getElementById('galleryForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const image = formData.get('image');
  const seriesCode = formData.get('seriesCode');
  const size = formData.get('size');
  const colors = formData.get('colors');

  let message = `New Order\n`;
  message += `\n`
  message += `Image: Please attach/upload your image file (if any)\n`
  message += `Image Series Code: ${seriesCode}\n`;
  message += `Size: ${size}\n`;
  message += `Colors: ${colors}\n`;

  const whatsappNumber = '+2347089505534';
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, '_blank');
  window.location.reload(); // Refresh the page immediately after submitting
});







// JavaScript to enforce date and month format
document.getElementById('date-month-picker').addEventListener('input', function (e) {
  const value = e.target.value;
  if (!/^(\d{2})-(\d{2})$/.test(value) && value !== '') {
      e.target.setCustomValidity('Invalid date format. Use MM-DD.');
  } else {
      e.target.setCustomValidity('');
  }
});


// pagination for gallery 

$(document).ready(function() {
  const itemsPerPage = 9;
  let currentPage = 1;

  function showPage(page) {
    const images = $('.image');
    const totalItems = images.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    images.hide();

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    images.slice(start, end).show();

    $('#pageNumber').text(`Page ${page}`);
    $('#prevPage').prop('disabled', page === 1);
    $('#nextPage').prop('disabled', page === totalPages);
  }

  $('#prevPage').click(function() {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  $('#nextPage').click(function() {
    const totalItems = $('.image').length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  $('.button').click(function() {
    $(this).addClass('active').siblings().removeClass('active');

    const filter = $(this).attr('data-filter');
    const images = $('.image');

    if (filter === 'all') {
      images.show();
    } else {
      images.hide().filter(`.${filter}`).show();
    }

    showPage(1);  // Reset to first page after filtering
  });

  $('.gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: {
      enabled: true
    }
  });

  $('.series-code').click(function() {
    const seriesCode = $(this).text().trim().split(":")[1].trim();
    navigator.clipboard.writeText(seriesCode).then(function() {
      // Code copied to clipboard successfully
    }, function(err) {
      console.error('Failed to copy series code: ', err);
    });
  });

  showPage(1);
});
