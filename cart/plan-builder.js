let plan = [];

function addToPlan(service) {
  plan.push(service);
  updatePlan();
}

function updatePlan() {
  const list = document.getElementById('selectedServices');
  const total = document.getElementById('totalCost');
  list.innerHTML = '';

  let totalCost = 0;

  plan.forEach((service, index) => {
    const li = document.createElement('li');
    li.className = 'summary-item';
    li.textContent = `${service.name} – ₱${service.price}`;
    list.appendChild(li);
    totalCost += service.price;
  });

  total.textContent = `Total: ₱${totalCost}`;
}
