// test.js
function runTests() {
  const testUser1 = { isPWD: true, isRural: true, isUrban: false, hasFunder: false };
  const testServices = [
    { name: 'Teletherapy', price: 800 },
    { name: 'Resilience Navigator', price: 350 },
  ];

  const plan = calculatePlanPrice(testServices, testUser1);
  console.log('Plan:', plan);
}
runTests();
