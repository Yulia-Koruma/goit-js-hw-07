// Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.

// Реалізація делегування на ul.gallery і отримання url великого зображення.

// Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.

// Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.

// Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

// Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const galleryImg = document.querySelectorAll("gallery__image");
const galleryList = createGalleryItems(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryList);

galleryContainer.addEventListener('click', onImageClick);

function createGalleryItems(images){
    return images
        .map(({ preview, original, description }) => {
        return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
        <img
         class="gallery__image"
         src="${preview}"
         data-source="${original}"
          alt="${description}"
         />
     </a>
    </li>`;
    }).join('');
};


function onImageClick(e) {
    e.preventDefault();
    
  if (!e.target.classList.contains('gallery__image')) {
    return
    };

    galleryImg.src = e.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${galleryImg.src}" alt="${galleryImg.alt}" />`
  )

  instance.show()

  if (instance.visible()) {
      galleryContainer.addEventListener('keydown', onEscBtnPress)
  }

  function onEscBtnPress(e) {
    if (e.code === 'Escape') {
      instance.close()
    }
  }
}
