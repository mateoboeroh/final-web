function toggleLike(btn) {
  const icon = btn.querySelector('.material-symbols-outlined');
  const countSpan = btn.querySelector('span:not(.material-symbols-outlined)');
  let count = parseInt(countSpan.innerText.replace(',', ''));
  
  if (icon.style.color === 'red') {
    icon.style.color = '';
    icon.style.fontVariationSettings = "'FILL' 0";
    count--;
  } else {
    icon.style.color = 'red';
    icon.style.fontVariationSettings = "'FILL' 1";
    count++;
  }
  countSpan.innerText = count.toString();
}

function toggleFollow(btn) {
  if (btn.innerText === 'Seguir') {
    btn.innerText = 'Siguiendo';
    btn.classList.remove('btn-outline-primary');
    btn.classList.add('btn-primary');
  } else {
    btn.innerText = 'Seguir';
    btn.classList.add('btn-outline-primary');
    btn.classList.remove('btn-primary');
  }
}

function selectFeedCategory(category, element) {
  const buttons = document.querySelectorAll('#feed-categories button, #mobile-feed-categories button');
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-light', 'text-muted');
  });
  
  buttons.forEach(btn => {
    if (btn.innerText.trim().toLowerCase() === category.trim().toLowerCase()) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-light', 'text-muted');
    }
  });
  
  const posts = document.querySelectorAll('article');
  posts.forEach(post => {
    const text = post.innerText.toLowerCase();
    let match = false;
    if (category === 'Naturaleza' && (text.includes('ballena') || text.includes('lobos') || text.includes('pinguinos'))) match = true;
    else if (category === 'Aventura' && (text.includes('buceo') || text.includes('excursión') || text.includes('snorkel') || text.includes('aventura'))) match = true;
    else if (category === 'Gastronomía' && (text.includes('cordero') || text.includes('comer') || text.includes('almuerzo') || text.includes('gastronómico'))) match = true;
    else if (category === 'Alojamiento' && (text.includes('hotel') || text.includes('estancia') || text.includes('hospedaje') || text.includes('alojamiento'))) match = true;
    
    if (match) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}
