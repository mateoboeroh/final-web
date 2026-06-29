let adults = 2;
let children = 0;
const priceAdultRate = 2600.0;
const priceChildRate = 1200.0;
const baseServiceFee = 85.0;

function incrementAdults() {
  adults++;
  document.getElementById('adults-count').innerText = adults;
  recalculatePrice();
}

function decrementAdults() {
  if (adults > 1) {
    adults--;
    document.getElementById('adults-count').innerText = adults;
    recalculatePrice();
  }
}

function incrementChildren() {
  children++;
  document.getElementById('children-count').innerText = children;
  recalculatePrice();
}

function decrementChildren() {
  if (children > 0) {
    children--;
    document.getElementById('children-count').innerText = children;
    recalculatePrice();
  }
}

function recalculatePrice() {
  const adultsBaseTotal = adults * priceAdultRate;
  const childrenBaseTotal = children * priceChildRate;
  
  document.getElementById('lbl-base-adults').innerText = `Precio Base Adultos (x${adults})`;
  document.getElementById('price-base-adults').innerText = `$${adultsBaseTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;

  const rowChildren = document.getElementById('row-base-children');
  if (children > 0) {
    rowChildren.classList.remove('d-none');
    document.getElementById('lbl-base-children').innerText = `Precio Base Niños (x${children})`;
    document.getElementById('price-base-children').innerText = `$${childrenBaseTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  } else {
    rowChildren.classList.add('d-none');
  }

  let addonsTotal = 0;
  const guideChecked = document.getElementById('addon-guide').checked;
  const shuttleChecked = document.getElementById('addon-shuttle').checked;

  const rowGuide = document.getElementById('row-addon-guide');
  if (guideChecked) {
    rowGuide.classList.remove('d-none');
    addonsTotal += 450.0;
  } else {
    rowGuide.classList.add('d-none');
  }

  const rowShuttle = document.getElementById('row-addon-shuttle');
  if (shuttleChecked) {
    rowShuttle.classList.remove('d-none');
    addonsTotal += 120.0;
  } else {
    rowShuttle.classList.add('d-none');
  }

  const finalTotal = adultsBaseTotal + childrenBaseTotal + addonsTotal + baseServiceFee;
  document.getElementById('price-total').innerText = `$${finalTotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
}

function submitReservation(e) {
  e.preventDefault();
  
  const modal = document.getElementById('success-modal');
  const modalId = document.getElementById('success-modal-card');
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  modalId.style.transform = 'scale(1)';
}

function dismissSuccess() {
  window.location.href = '/index.html';
}

recalculatePrice();
