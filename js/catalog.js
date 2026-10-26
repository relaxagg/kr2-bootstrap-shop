const filtersForm = document.getElementById('filters');
const items = document.querySelectorAll('[data-model]');
const emptyAlert = document.getElementById('emptyAlert');

filtersForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const checkedBoxes = filtersForm.querySelectorAll('input[name="model"]:checked');
  const checkedModels = Array.from(checkedBoxes).map((box) => box.value);

  const priceFrom = Number(filtersForm.elements['price-from'].value) || 0;
  const priceTo = Number(filtersForm.elements['price-to'].value) || Infinity;

  let visibleCount = 0;

  items.forEach((item) => {
    const model = item.dataset.model;
    const price = Number(item.dataset.price);

    const modelMatches = checkedModels.length === 0 || checkedModels.includes(model);
    const priceMatches = price >= priceFrom && price <= priceTo;

    if (modelMatches && priceMatches) {
      item.classList.remove('d-none');
      visibleCount++;
    } else {
      item.classList.add('d-none');
    }
  });

  emptyAlert.classList.toggle('d-none', visibleCount > 0);
});

filtersForm.addEventListener('reset', () => {
  items.forEach((item) => {
    item.classList.remove('d-none');
  });
  emptyAlert.classList.add('d-none');
});
