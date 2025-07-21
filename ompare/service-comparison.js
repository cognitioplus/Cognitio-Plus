let compareList = [];

function addToCompare(id) {
  const servicesData = JSON.parse(document.getElementById('servicesData').textContent);
  const service = servicesData.find(s => s.id === id);

  if (!compareList.find(s => s.id === id)) {
    compareList.push(service);
    renderComparison();
  }
}

function renderComparison() {
  const container = document.getElementById('compareCards');
  container.innerHTML = '';

  compareList.forEach(service => {
    const card = document.createElement('div');
    card.className = 'compare-card';
    card.innerHTML = `
      <h4>${service.name}</h4>
      <p><strong>Tier:</strong> ${service.tier}</p>
      <p><strong>Price:</strong> ₱${service.price}</p>
      <p><strong>Duration:</strong> ${service.duration}</p>
      <p><strong>Audience:</strong> ${service.audience.join(', ')}</p>
    `;
    container.appendChild(card);
  });
}
