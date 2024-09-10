document.addEventListener('DOMContentLoaded', function() {
  var characterSelection = document.getElementById('character-selection');
// Sélection de Personnage
document.addEventListener("DOMContentLoaded", () => {
  const characters = document.querySelectorAll('.character');

  characters.forEach(character => {
    character.addEventListener('click', () => {
      const characterName = character.getAttribute('data-name');
      const characterImage = character.getAttribute('src');
      
      // Sauvegarde les informations du personnage sélectionné dans le stockage local
      localStorage.setItem('selectedCharacterName', characterName);
      localStorage.setItem('selectedCharacterImage', characterImage);
      
      // Redirige vers la fiche de personnage
      window.location.href = 'character.html';
    });
  });

  // Affichage de la fiche de personnage
  if (window.location.pathname.includes('character.html')) {
    const name = localStorage.getItem('selectedCharacterName');
    const image = localStorage.getItem('selectedCharacterImage');

    if (name && image) {
      document.getElementById('character-name').textContent = name;
      document.getElementById('character-image').src = image;
    }
  }
});

// Gestion de l'ajout d'XP
document.getElementById("add-xp-button").addEventListener("click", () => {
  let xp = parseInt(document.getElementById("character-xp").textContent);
  let level = parseInt(document.getElementById("character-level").textContent);

  xp += 10; // Ajoute 10 XP

  if (xp >= 100 && level < 6) {
    level++;
    xp = 0; // Réinitialise XP après changement de niveau
  }

  document.getElementById("character-xp").textContent = xp;
  document.getElementById("character-level").textContent = level;

  // Réajuster d'autres attributs (PA, CA, SP) en fonction du niveau
});
});