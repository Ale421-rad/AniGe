// JavaScript pour gérer la sélection de personnage, confirmation et fiche personnage

// Référence des éléments DOM
const characterSelection = document.getElementById('character-selection');
const confirmationPage = document.getElementById('confirmation-page');
const characterPage = document.getElementById('character-page');

const confirmButton = document.getElementById('confirm-button');
const backButton = document.getElementById('back-button');
const resetButton = document.getElementById('reset-button');
const xpAddButton = document.getElementById('xp-add-button');
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
xpAddButton.addEventListener('click', function() {
    const newXP = parseInt(xpInput.value);
    if (!isNaN(newXP) && newXP >= 0) {
        addXP(newXP);
    }
});

// Fonction pour mettre à jour les statistiques du personnage
let currentXP = 0;
let currentLevel = 1;

function addXP(amount) {
    if (currentLevel < 6) {
        currentXP += amount;
        document.getElementById("xp").textContent = currentXP;
        checkLevelUp();
    }
}

function checkLevelUp() {
    let levelChanged = false;

    if (currentLevel === 1 && currentXP >= 10) {
        currentLevel = 2;
        levelChanged = true;
    } else if (currentLevel === 2 && currentXP >= 30) {
        currentLevel = 3;
        levelChanged = true;
    } else if (currentLevel === 3 && currentXP >= 70) {
        currentLevel = 4;
        levelChanged = true;
    } else if (currentLevel === 4 && currentXP >= 130) {
        currentLevel = 5;
        levelChanged = true;
    } else if (currentLevel === 5 && currentXP >= 250) {
        currentLevel = 6;
        levelChanged = true;
    }

    if (levelChanged) {
        currentXP = 0;
        document.getElementById("xp").textContent = currentXP;
        updateCharacterStats();
    }
}

function updateCharacterStats() {
    let pa = 1, ca = 3, sp = 0, bp = 0;

    switch (currentLevel) {
        case 2:
            pa = 2; ca = 5; sp = 0; break;
        case 3:
            pa = 3; ca = 5; sp = 1; break;
        case 4:
            pa = 4; ca = 7; sp = 1; break;
        case 5:
            pa = 5; ca = 7; sp = 3; break;
        case 6:
            pa = 10; ca = 7; sp = 3; break;
    }

    document.getElementById("level").textContent = currentLevel;
    document.getElementById("pa").textContent = pa;
    document.getElementById("ca").textContent = ca;
    document.getElementById("sp").textContent = sp;
    document.getElementById("bp").textContent = bp; // Default, adjust based on the character
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