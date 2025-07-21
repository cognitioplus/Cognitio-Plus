function savePlanToStorage(plan) {
  localStorage.setItem('userPlan', JSON.stringify(plan));
}
