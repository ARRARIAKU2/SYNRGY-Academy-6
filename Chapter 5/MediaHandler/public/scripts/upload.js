const messageContainer = document.getElementById('message-container');
const formUpload = document.getElementById('form-upload');
const preview = document.getElementById('preview');
const inputFile = document.getElementById('input-file');
const btnSubmit = document.getElementById('btn-submit');

formUpload.addEventListener('submit', handleSubmitFormUpload);
inputFile.addEventListener('change', handleChangeInputFile);

function renderMessage(type, response) {
  const { message, url } = response;
  const messageElement = document.createElement('div');
  const linkElement = document.createElement('a');
  if (type === 'success') {
    messageElement.classList.add('success');
    messageElement.innerText = message;
    linkElement.innerText = "Download File";
    linkElement.setAttribute('href', url);
  } else {
    messageElement.classList.add('failed');
    messageElement.innerText = message;
    linkElement.innerText = "Try Again";
  };
  messageContainer.appendChild(messageElement)
  messageContainer.appendChild(linkElement);
};

function handleChangeInputFile(e) {
  const files = e.target.files;
  if (files && files.length > 0) {

    const file = files[0];
    // const imgTypes = {
    //   'image/jpeg': true,
    //   'image/png': true,
    //   'image/jpg': true
    // };

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const element = document.createElement('img');
      element.setAttribute('src', URL.createObjectURL(files[0]));
      element.setAttribute('style', "width: 200px");
      preview.appendChild(element);
    } else {
      alert('hanya gambar yang boleh')
      e.target.value = ``;
    };
  };
};

async function handleSubmitFormUpload(e) {
  e.preventDefault();
  btnSubmit.innerText = 'Loading...';
  try {
    const formData = new FormData(formUpload);
    const response = await fetch('/upload', {
      method: 'post',
      body: formData
    });
    const responseData = await response.json();
    btnSubmit.innerText = 'Upload';
    renderMessage('success', responseData);
  } catch (error) {
    btnSubmit.innerText = 'Submit';
    renderMessage('failed', { message: "Error submit form nya", url: '' });
  } finally {
    btnSubmit.innerText = 'Submit';
  };
};
