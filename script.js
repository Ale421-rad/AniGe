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

// Gestion de la sélection de personnage
document.querySelectorAll('.character').forEach(character => {
    character.addEventListener('click', function() {
        const name = this.dataset.name;
        const special = this.dataset.special;
        const quote = this.dataset.quote;
        const imageSrc = this.querySelector('img').src;

        document.getElementById('confirm-image').src = imageSrc;
        document.getElementById('confirm-name').textContent = name;
        document.getElementById('confirm-special').textContent = special;
        document.getElementById('confirm-quote').textContent = `"${quote}"`;

        characterSelection.style.display = 'none';
        confirmationPage.style.display = 'block';
    });
});

// Bouton de confirmation
confirmButton.addEventListener('click', function() {
    const name = document.getElementById('confirm-name').textContent;
    const imageSrc = document.getElementById('confirm-image').src;

    document.getElementById('character-name').textContent = name;
    document.getElementById('character-image').src = imageSrc;

    confirmationPage.style.display = 'none';
    characterPage.style.display = 'block';

    resetCharacterStats(); // Reset stats when confirming
});

// Bouton retour
backButton.addEventListener('click', function() {
    confirmationPage.style.display = 'none';
    characterSelection.style.display = 'block';
});

// Bouton reset
resetButton.addEventListener('click', function() {
    characterPage.style.display = 'none';
    characterSelection.style.display = 'block';
    resetCharacterStats();
});

// Bouton changement XP
xpChangeButton.addEventListener('click', function() {
    const newXP = parseInt(xpInput.value);
    if (!isNaN(newXP)) {
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