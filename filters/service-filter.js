document.addEventListener('DOMContentLoaded', () => {
  const servicesData = JSON.parse(document.getElementById('servicesData').textContent);
  const servicesList = document.getElementById('servicesList');

  const categoryFilter = document.getElementById('categoryFilter');
  const tierFilter = document.getElementById('tierFilter');
  const audienceFilter = document.getElementById('audienceFilter');

  function renderServices(services) {
    servicesList.innerHTML = '';
    services.forEach(service => {
      const div = document.createElement('div');
      div.className = 'service';
      div.innerHTML = `
        <div>
          <strong>${service.name}</strong> – ${service.description}<br>
          <small>Tier: ${service.tier} | Price: ₱${service.price} | Duration: ${service.duration}</small>
        </div>
        <div>
          <button onclick="addToPlan(${JSON.stringify(service)})">Add to Plan</button>
          <button onclick="addToCompare('${service.id}')">Compare</button>
        </div>
      `;
      servicesList.appendChild(div);
    });
  }

  function filterServices() {
    const category = categoryFilter.value;
    const tier = tierFilter.value;
    const audience = audienceFilter.value;

    let filtered = servicesData;

    if (category) {
      filtered = filtered.filter(s => s.category === category);
    }

    if (tier) {
      filtered = filtered.filter(s => s.tier === tier);
    }

    if (audience) {
      filtered = filtered.filter(s => s.audience.includes(audience));
    }

    renderServices(filtered);
  }

  categoryFilter.addEventListener('change', filterServices);
  tierFilter.addEventListener('change', filterServices);
  audienceFilter.addEventListener('change', filterServices);

  renderServices(servicesData);
});
