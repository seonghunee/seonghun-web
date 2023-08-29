const imageFileElement = document.getElementById('image');
const previewImageFileElement = document.getElementById('preview-image');

function previewImage() {
    const files = imageFileElement.files;

    if(!files || files.length === 0) {
        previewImageFileElement.style.display = 'none';
        return;
    }

    const image = files[0];
    
    previewImageFileElement.src = URL.createObjectURL(image);
    previewImageFileElement.style.display = 'block';
}

imageFileElement.addEventListener('change', previewImage);