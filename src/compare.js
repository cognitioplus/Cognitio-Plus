<script>
let compareMap = new Map();

// Load from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('compareList')) || [];
  saved.forEach(service => compareMap.set(service.id, service));
  renderComparison();
});

function addToCompare(id) {
  const servicesData = JSON.parse(document.getElementById('servicesData').textContent);
  const service = servicesData.find(s => s.id === id);

  if (service && !compareMap.has(id)) {
    compareMap.set(id, service);
    saveToStorage();
    renderComparison();
  }
}

function removeFromCompare(id) {
  compareMap.delete(id);
  saveToStorage();
  renderComparison();
}

function saveToStorage() {
  const services = Array.from(compareMap.values());
  localStorage.setItem('compareList', JSON.stringify(services));
}

function renderComparison() {
  const container = document.getElementById('compareCards');
  container.innerHTML = '';

  if (compareMap.size === 0) {
    container.innerHTML = `<p role="alert" aria-live="polite">No services selected for comparison. Click "Compare" to begin.</p>`;
    return;
  }

  compareMap.forEach(service => {
    const card = document.createElement('div');
    card.className = 'compare-card';
    card.setAttribute('role', 'region');
    card.setAttribute('aria-label', `Service Comparison Card for ${service.name}`);

    card.innerHTML = `
      <h4>${service.name}</h4>
      <p><strong>Tier:</strong> ${service.tier}</p>
      <p><strong>Price:</strong> ₱${service.price}</p>
      <p><strong>Duration:</strong> ${service.duration}</p>
      <p><strong>Audience:</strong> ${service.audience.join(', ')}</p>
      <button onclick="removeFromCompare('${service.id}')" aria-label="Remove ${service.name} from comparison">❌ Remove</button>
    `;

    container.appendChild(card);
  });
}
</script>
