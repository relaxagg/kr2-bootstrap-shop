const forms = document.querySelectorAll('.order-form');
const successAlert = document.getElementById('successAlert');
const orderModal = document.getElementById('orderModal');

forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    form.reset();
    form.classList.remove('was-validated');

    if (orderModal) {
      bootstrap.Modal.getInstance(orderModal).hide();
    }

    successAlert.classList.remove('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

if (orderModal) {
  orderModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const modelSelect = orderModal.querySelector('select[name="model"]');
    modelSelect.value = button.dataset.product;
  });
}

const orderPageSelect = document.getElementById('order-model');

if (orderPageSelect) {
  const params = new URLSearchParams(window.location.search);
  const model = params.get('model');

  if (model) {
    orderPageSelect.value = model;
  }
}
