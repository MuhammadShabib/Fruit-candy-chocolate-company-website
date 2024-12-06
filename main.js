// اسلایدشو
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'next', 'prev');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index + 1) % totalSlides) {
            slide.classList.add('next'); // Next slide
        } else if (i === (index - 1 + totalSlides) % totalSlides) {
            slide.classList.add('prev'); // Previous slide
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}
setInterval(nextSlide, 10000);
//////////////////// بخش محصولات
let currentPage = 1;
const totalPages = 3; // Total number of product pages
function showPage(page) {
    document.querySelectorAll('.product-container').forEach(container => {
        container.classList.remove('active');
    });
    const currentContainer = document.getElementById(`page${page}`);
    currentContainer.classList.add('active');

    // Reset animation
    const productImages = currentContainer.querySelectorAll('.product_img col-xl-4 col-md-3 col-sm-4 col-6');
    productImages.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.1}s`; // Stagger effect
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        void img.offsetWidth; // Trigger reflow to restart animation
        img.style.opacity = '1';
        img.style.transform = 'translateY(0)';
    });

    document.getElementById('prevPage').style.display = page === 1 ? 'none' : 'inline-block';
}

document.getElementById('loadMore').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    } else {
        // Reset to the first page if reached the last page
        currentPage = 1;
        showPage(currentPage);
    }
});
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});
document.querySelectorAll('.open-lightbox').forEach(button => {
    button.addEventListener('click', (event) => {
        const productImage = event.target.parentElement.querySelector('img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxDetails = document.getElementById('lightboxDetails');
        // Set image source and details
        lightboxImage.src = productImage.src;
        lightboxDetails.textContent = productImage.getAttribute('alt'); // Display the "alt" text as details
        lightbox.style.display = 'flex'; // Show lightbox
        lightbox.style.flexDirection = 'column'; // Show lightbox
    });
});
// Close lightbox on clicking the close button
document.getElementById('lightboxClose').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});
// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        document.getElementById('lightbox').style.display = 'none';
    }
});
// Show first page initially
showPage(currentPage);
