// State holders
const state = { engagements:0, badges:0 };
function updateEngagement() {
  state.engagements++;
  if (state.engagements % 3 === 0) state.badges++;
  document.getElementById('engageCount').innerText = state.engagements;
  document.getElementById('badgeCount').innerText = state.badges;
  const level = state.badges >=5 ? 'Advanced' : state.badges>=2 ? 'Intermediate' : 'Beginner';
  document.getElementById('engageLevel').innerText = level;
}
document.getElementById('engageBtn').addEventListener('click', updateEngagement);

// Pricing logic
document.getElementById('proceed').addEventListener('click', () => {
  const selected = Array.from(document.querySelectorAll('#step-3 input:checked')).map(i => i.value);
  let price = selected.length * 1000;
  const seg = document.getElementById('segment').value;
  const urban = document.getElementById('urban').checked;
  const funder = document.getElementById('hasFunder').checked;
  if (seg==='lowIncome') price *= 0.7;
  if (seg==='indigenous') price *= 0.75;
  if (seg==='pwds') price *= 0.8;
  if (seg==='youth') price *= 0.85;
  if (urban) price *= 1.15;
  if (funder) price *= 1.1;
  document.getElementById('price').innerText = price.toFixed(2);
  document.getElementById('collabSuggestion').innerText = seg && selected.length
    ? '✅ You can apply for a collaboration subsidy.'
    : '';
  window.location.href = `https://checkout.xendit.co/od/customized-services?amount=${Math.round(price)}`;
});
