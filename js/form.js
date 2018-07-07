'use strict';
// модуль, который работает с формой редактирования изображения //
(function () {

  var ESC_KEYCODE = 27;
  // var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Загрузка изображения и показ формы редактирования
  var imgUpload = document.querySelector('.img-upload');
  var uploadFile = imgUpload.querySelector('.img-upload__input');
  var imgUploadForm = imgUpload.querySelector('.img-upload__form');
  var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
  var imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgUploadCancel = imgUpload.querySelector('.img-upload__cancel');

  // функция, которая отправляем данные на сервер
  var onImgUploadFormSubmit = function (evt) {
    window.backend.upload(new FormData(imgUploadForm), onUploadFormCloseClick, window.errorMessage.uploadMessageError);
    evt.preventDefault();
  };
  // функция, для обработки события открытия + добавление обработки по клавиши esc
  var onUploadFormOpenChange = function () {
    imgUploadOverlay.classList.remove('hidden');
    imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
    imgUploadCancel.addEventListener('click', onUploadFormCloseClick);

    window.imageScale.imageScaleAdd();
    window.imageScale.scaleListenersAdd();
    window.imageEffect.imageEffectAdd();
    window.validation.validationListenersAdd();

    document.addEventListener('keydown', onUploadFormEscKeydown);
  };
  // функция, для обработки события закрытия + удаление обработки по клавиши esc
  var onUploadFormCloseClick = function () {
    imgUploadOverlay.classList.add('hidden');
    imgUploadForm.removeEventListener('submit', onImgUploadFormSubmit);
    imgUploadCancel.removeEventListener('click', onUploadFormCloseClick);

    uploadFile.value = '';
    imgUploadPreview.style = '';

    window.imageScale.scaleListenersRemove();
    window.imageEffect.effectListenersRemove();
    window.validation.validationListenersRemove();

    document.removeEventListener('keydown', onUploadFormEscKeydown);
  };
  // функция, для обработки события закрытия по esc
  var onUploadFormEscKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onUploadFormCloseClick();
    }
  };
  // обработчик события - открываем форму редактирования изображения
  uploadFile.addEventListener('change', onUploadFormOpenChange);

  /*
  var fileChooser = imgUploadPreview.querySelector('input[type=file]');
  var preview = imgUploadPreview.querySelector('');

  fileChooser.addEventListener('change', onChangePhoto);

  var onChangePhoto = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };
  */

  window.form = {
    imgUpload: imgUpload,
    imgUploadPreview: imgUploadPreview,
    imgUploadOverlay: imgUploadOverlay,
    ESC_KEYCODE: ESC_KEYCODE
  };

})();
