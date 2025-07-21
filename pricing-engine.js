// pricing-engine.js

// Define discount and surcharge rules
const PRICING_RULES = {
  discounts: {
    pwd: 0.7, // 30% off
    indigenous: 0.75, // 25% off
    rural: 0.8, // 20% off
  },
  surcharges: {
    urban: 1.2, // +20%
    funded: 1.1, // +10%
  }
};

// Function to calculate final price
function calculateFinalPrice(basePrice, user) {
  let finalPrice = basePrice;

  // Apply discounts
  if (user.isPWD) {
    finalPrice *= PRICING_RULES.discounts.pwd;
  }

  if (user.isIndigenous) {
    finalPrice *= PRICING_RULES.discounts.indigenous;
  }

  if (user.isRural) {
    finalPrice *= PRICING_RULES.discounts.rural;
  }

  // Apply surcharges
  if (user.isUrban) {
    finalPrice *= PRICING_RULES.surcharges.urban;
  }

  if (user.hasFunder) {
    finalPrice *= PRICING_RULES.surcharges.funded;
  }

  return Math.round(finalPrice);
}

// Function to calculate total from selected services
function calculatePlanPrice(services, user) {
  const totalPrice = services.reduce((sum, service) => sum + service.price, 0);
  const finalPrice = calculateFinalPrice(totalPrice, user);
  return {
    totalPrice,
    finalPrice,
    discount: ((totalPrice - finalPrice) / totalPrice * 100).toFixed(1),
    isDiscountApplied: finalPrice < totalPrice,
  };
}

// Example usage in plan-builder.js
function updatePlan() {
  const services = JSON.parse(localStorage.getItem('selectedServices') || '[]');
  const user = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const plan = calculatePlanPrice(services, user);

  const list = document.getElementById('selectedServices');
  const totalEl = document.getElementById('totalCost');
  const discountEl = document.getElementById('discountInfo');
  list.innerHTML = '';

  let total = 0;

  services.forEach((service) => {
    const li = document.createElement('li');
    li.className = 'summary-item';
    li.textContent = `${service.name} – ₱${service.price}`;
    list.appendChild(li);
    total += service.price;
  });

  const finalPrice = calculateFinalPrice(total, user);

  totalEl.textContent = `Total: ₱${finalPrice}`;
  if (finalPrice < total) {
    discountEl.textContent = `${(100 - (finalPrice / total) * 100).toFixed(1)}% discount applied`;
  } else {
    discountEl.textContent = 'No discounts applied';
  }
}
