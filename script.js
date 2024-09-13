// JavaScript pour gérer la sélection de personnage, confirmation et fiche personnage

// Référence des éléments DOM
const characterSelection = document.getElementById('character-selection');
const confirmationPage = document.getElementById('confirmation-page');
const characterPage = document.getElementById('character-page');

const confirmButton = document.getElementById('confirm-button');
const backButton = document.getElementById('back-button');
const resetButton = document.getElementById('reset-button');
const xpChangeButton = document.getElementById('xp-change-button');
const xpInput = document.getElementById('xp-input');

const characterStats = {
    level: 1,
    xp: 0,
    pa: 1,
    ca: 3,
    sp: 0,
    bp: 0
};

function showElement(element) {
    element.classList.remove('fade-out');
    element.classList.add('fade-in');
    element.style.display = 'block';
}

function hideElement(element) {
    element.classList.remove('fade-in');
    element.classList.add('fade-out');
    setTimeout(() => {
        element.style.display = 'none';
    }, 500); // Correspond à la durée de l'animation CSS (0.5s)
}

// Gestion de la sélection de personnage
document.addEventListener("DOMContentLoaded", function () {
    const characters = document.querySelectorAll(".character");

    characters.forEach(character => {
        character.addEventListener("click", function () {
            // Extraire le nom du personnage à partir de l'élément span
            const characterName = character.querySelector(".character-name").textContent;
            const characterSpecial1 = character.getAttribute("data-special1");
            const characterSpecial2 = character.getAttribute("data-special2");
            const characterQuote = character.getAttribute("data-quote");
            const characterImage = character.querySelector("img").src;

            // Mettre à jour la page de confirmation avec les informations du personnage
            document.getElementById("confirm-name").textContent = characterName;
            document.getElementById("confirm-special").innerHTML = `${characterSpecial1}<br>${characterSpecial2}`;
            document.getElementById("confirm-quote").textContent = `"${characterQuote}"`;
            document.getElementById("confirm-image").src = characterImage;

        hideElement(characterSelection);
        showElement(confirmationPage);
    });
});
});

// Bouton de confirmation
confirmButton.addEventListener('click', function() {
    
 // Transférer les données vers la page fiche personnage
 document.getElementById("character-name").textContent = document.getElementById("confirm-name").textContent;
 document.getElementById("character-image").src = document.getElementById("confirm-image").src;

    resetCharacterStats(); // Reset stats when confirming

    hideElement(confirmationPage);
    showElement(characterPage);
});

// Bouton retour
backButton.addEventListener('click', function() {

    hideElement(confirmationPage);
    showElement(characterSelection);
});

// Bouton reset
resetButton.addEventListener('click', function() {

    resetCharacterStats();

    hideElement(characterPage);
    showElement(confirmationPage);
});

// Bouton changement XP
xpChangeButton.addEventListener('click', function() {
    const newXP = parseInt(xpInput.value);
    if (!isNaN(newXP) && newXP >= 0) {
        updateCharacterStats(newXP);
    }
});

// Fonction pour mettre à jour les statistiques du personnage
function updateCharacterStats(newXP) {
    characterStats.xp = newXP;

    if (newXP >= 250) {
        characterStats.level = 6; characterStats.pa = 10; characterStats.ca = 7; characterStats.sp = 3;
    } else if (newXP >= 130) {
        characterStats.level = 5; characterStats.pa = 5; characterStats.ca = 7; characterStats.sp = 3;
    } else if (newXP >= 70) {
        characterStats.level = 4; characterStats.pa = 4; characterStats.ca = 7; characterStats.sp = 1;
    } else if (newXP >= 30) {
        characterStats.level = 3; characterStats.pa = 3; characterStats.ca = 5; characterStats.sp = 1;
    } else if (newXP >= 10) {
        characterStats.level = 2; characterStats.pa = 2; characterStats.ca = 5; characterStats.sp = 0;
    } else {
        characterStats.level = 1; characterStats.pa = 1; characterStats.ca = 3; characterStats.sp = 0;
    }

    document.getElementById('level').textContent = characterStats.level;
    document.getElementById('xp').textContent = characterStats.xp;
    document.getElementById('pa').textContent = characterStats.pa;
    document.getElementById('ca').textContent = characterStats.ca;
    document.getElementById('sp').textContent = characterStats.sp;
}

// Fonction pour réinitialiser les statistiques du personnage
function resetCharacterStats() {
    characterStats.level = 1;
    characterStats.xp = 0;
    characterStats.pa = 1;
    characterStats.ca = 3;
    characterStats.sp = 0;
    characterStats.bp = 0;

    document.getElementById('level').textContent = characterStats.level;
    document.getElementById('xp').textContent = characterStats.xp;
    document.getElementById('pa').textContent = characterStats.pa;
    document.getElementById('ca').textContent = characterStats.ca;
    document.getElementById('sp').textContent = characterStats.sp;
    xpInput.value = '';
}