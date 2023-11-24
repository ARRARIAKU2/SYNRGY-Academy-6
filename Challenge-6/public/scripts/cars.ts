const messageContainer : HTMLElement | null = document.getElementById('message-container');
const formUpload : HTMLFormElement | null = document.getElementById('form-upload') as HTMLFormElement;
const preview : HTMLElement | null = document.getElementById('preview');
const inputFile : HTMLInputElement | null = document.getElementById('input-file') as HTMLInputElement;
const btnSubmit : HTMLElement | null = document.getElementById('btn-submit');

formUpload?.addEventListener('submit', handleSubmitFormUpload);
inputFile?.addEventListener('change', handleChangeInputFile);

function renderMessage(type: string, response: {message: string, url?: string}) {
    const { message, url } = response;
    const messageElement = document.createElement('div');
    const linkElement = document.createElement('a');
    if (type === 'success') {
        messageElement.classList.add('success');
        messageElement.innerText = message;
        linkElement.innerText = "Download File";
        linkElement.setAttribute('href', url || '');
    } else {
        messageElement.classList.add('failed');
        messageElement.innerText = message;
        linkElement.innerText = "Try Again";
    };
    messageContainer?.appendChild(messageElement)
    messageContainer?.appendChild(linkElement);
};

function handleChangeInputFile(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
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
            preview?.appendChild(element);
        } else {
            alert('hanya gambar yang boleh')
            target.value = ``;
        };
    };
};

async function handleSubmitFormUpload(e: Event) {
    e.preventDefault();
    if (btnSubmit) {
      btnSubmit.innerText = 'Loading...';
    }
  
    try {
      const formData = new FormData(formUpload!);
      console.log(formData);
      const response = await fetch('/api/books/', {
        method: 'post',
        body: formData,
      });
      const responseData = await response.json();
      if (btnSubmit) {
        btnSubmit.innerText = 'Upload';
      }
      renderMessage('success', responseData);
    } catch (error) {
      if (btnSubmit) {
        btnSubmit.innerText = 'Submit';
      }
      renderMessage('failed', { message: 'Error submit form nya', url: '' });
    } finally {
      if (btnSubmit) {
        btnSubmit.innerText = 'Submit';
      }
    }
  }

