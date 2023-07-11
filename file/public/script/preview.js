const imageFileElement = document.getElementById('image');
const previewElement = document.getElementById('preview-image');

function previewImage() {
    const files = imageFileElement.files;

    if(!files || files.length === 0) {
        previewElement.style.display = 'none';
        return;
    }

    const image = files[0];

    previewElement.src = URL.createObjectURL(image);
    previewElement.style.display = 'block';
}

imageFileElement.addEventListener('change', previewImage);