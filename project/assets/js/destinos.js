const mapFrame = document.getElementById('google-map-frame');
const infoOverlay = document.getElementById('info-overlay');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');

let currentLat = -42.76;
let currentLng = -65.03;
let currentZoom = 10;
let mobileViewMode = 'list'; // 'list' o 'map'

function updateMapFrame(query, zoom) {
  currentZoom = zoom;
  mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
}

function toggleMobileView() {
  const sidebar = document.getElementById('sidebar-panel');
  const mapPanel = document.getElementById('map-panel');
  const switchBtn = document.getElementById('mobile-switch-btn');
  
  if (mobileViewMode === 'list') {
    mobileViewMode = 'map';
    
    sidebar.classList.remove('d-flex');
    sidebar.classList.add('d-none');
    
    mapPanel.classList.remove('d-none', 'd-md-block');
    mapPanel.classList.add('d-block');
    
    switchBtn.innerHTML = `
      <span class="material-symbols-outlined fs-5">list</span>
      Ver Lista
    `;
  } else {
    mobileViewMode = 'list';
    
    sidebar.classList.remove('d-none');
    sidebar.classList.add('d-flex');
    
    mapPanel.classList.remove('d-block');
    mapPanel.classList.add('d-none', 'd-md-block');
    
    switchBtn.innerHTML = `
      <span class="material-symbols-outlined fs-5">map</span>
      Ver Mapa
    `;
  }
}

function zoomMap(delta) {
  currentZoom = Math.max(6, Math.min(16, currentZoom + delta));
  updateMapFrame(`${currentLat},${currentLng}`, currentZoom);
}

function resetMap() {
  currentLat = -42.76;
  currentLng = -65.03;
  updateMapFrame('Puerto Madryn, Chubut, Argentina', 10);
  closePopup();
}

function focusMap(lat, lng, name, zoom = 12) {
  currentLat = lat;
  currentLng = lng;
  updateMapFrame(`${lat},${lng} (${name})`, zoom);

  let desc = "";
  if (name.includes("Valdés")) {
    desc = "Santuario de ballenas francas, orcas, elefantes marinos y aves patagónicas. Un ecosistema único protegido mundialmente.";
  } else if (name.includes("Doradillo")) {
    desc = "La joya oculta de Puerto Madryn. Una playa calma donde las ballenas reposan pacíficamente con sus crías a orillas del mar.";
  } else if (name.includes("Loma")) {
    desc = "Acantilados escarpados que sirven como apostadero permanente de lobos marinos de un pelo. Hermosas vistas escénicas.";
  } else if (name.includes("Madryn")) {
    desc = "La vibrante ciudad costera conocida como la capital nacional del buceo, ofreciendo excelente gastronomía y comodidades.";
  }
  
  showPopup(name, desc);

  if (window.innerWidth < 768 && mobileViewMode === 'list') {
    toggleMobileView();
  }
}

function showPopup(title, desc) {
  infoTitle.innerText = title;
  infoDesc.innerText = desc;
  infoOverlay.classList.remove('opacity-0', 'pointer-events-none');
  infoOverlay.style.transform = 'translateY(0)';
}

function closePopup() {
  infoOverlay.classList.add('opacity-0', 'pointer-events-none');
  infoOverlay.style.transform = 'translateY(10px)';
}

function filterBy(category, element) {
  // Toggle chips style
  const buttons = document.querySelectorAll('#filter-chips button');
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-light', 'text-muted');
  });
  
  element.classList.remove('btn-light', 'text-muted');
  element.classList.add('btn-primary');
  
  // Filter card items
  const cards = document.querySelectorAll('#destinations-list .card');
  cards.forEach(card => {
    if (category === 'Todos' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterDestinations(query) {
  const q = query.toLowerCase().trim();
  const cards = document.querySelectorAll('#destinations-list .card');
  cards.forEach(card => {
    const title = card.querySelector('h4').innerText.toLowerCase();
    if (title.includes(q)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

function resetListFilter() {
  const cards = document.querySelectorAll('#destinations-list .card');
  cards.forEach(card => card.style.display = 'block');
  const buttons = document.querySelectorAll('#filter-chips button');
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-light', 'text-muted');
  });
  buttons[0].classList.add('btn-primary');
  buttons[0].classList.remove('btn-light', 'text-muted');
}

function handleMapSearch(e) {
  if (e.key === 'Enter') {
    triggerMapSearch();
  }
}

function triggerMapSearch() {
  const input = document.getElementById('map-search-input');
  const term = input.value.trim().toLowerCase();
  if (term) {
    if (term.includes('ballena') || term.includes('doradillo')) {
      focusMap(-42.66, -65.01, 'Playa El Doradillo', 13);
    } else if (term.includes('lobo') || term.includes('loma') || term.includes('pets') || term.includes('animal')) {
      focusMap(-42.84, -64.88, 'Reserva Punta Loma', 13);
    } else if (term.includes('peninsula') || term.includes('valdes') || term.includes('patrimonio')) {
      focusMap(-42.5, -63.9, 'Península Valdés', 10);
    } else if (term.includes('madryn') || term.includes('ciudad')) {
      focusMap(-42.76, -65.03, 'Puerto Madryn', 12);
    } else {
      // Búsqueda libre: se delega la geolocalización al propio motor de Google Maps
      updateMapFrame(`${term}, Puerto Madryn, Chubut, Argentina`, 12);
      showPopup('Resultado de Búsqueda', 'Mostrando en el mapa los resultados de Google Maps para "' + term + '" en la zona de Puerto Madryn.');
    }
  }
}
