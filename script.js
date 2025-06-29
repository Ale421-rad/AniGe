// JavaScript pour gérer la sélection de personnage, confirmation et fiche personnage

// Référence des éléments DOM
const SelectionPage = document.getElementById('selection-header');
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
    ca: 2,
    sc: 0,
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

function resetCharacterStats() {
    characterStats.level = 1;
    characterStats.xp = 0;
    characterStats.pa = 1;
    characterStats.ca = 2;
    characterStats.sc = 0;

    document.getElementById('level').textContent = characterStats.level;
    document.getElementById('xp').textContent = characterStats.xp;
    document.getElementById('pa').textContent = characterStats.pa;
    document.getElementById('ca').textContent = characterStats.ca;
    document.getElementById('sc').textContent = characterStats.sc;
    xpInput.value = '';
}

// Sauvegarder les informations du personnage dans le localStorage
function saveCharacterToLocalStorage() {
    const characterData = {
        name: document.getElementById("confirm-name").textContent,
        special1: document.getElementById("confirm-special").textContent,
        image: document.getElementById("confirm-image").src,
        quote: document.getElementById("confirm-quote").textContent,
        xp: currentXP,
        level: currentLevel
    };

    localStorage.setItem("selectedCharacter", JSON.stringify(characterData));
}

// Récupérer les données sauvegardées au chargement de la page
function loadCharacterFromLocalStorage() {
    const characterData = localStorage.getItem("selectedCharacter");
    if (characterData) {
        const character = JSON.parse(characterData);

        // Recharger les informations sur la page de confirmation
        document.getElementById("confirm-name").textContent = character.name;
        document.getElementById("confirm-special").textContent = character.special1;
        document.getElementById("confirm-image").src = character.image;
        document.getElementById("confirm-quote").textContent = character.quote;

        // Recharger les informations sur la fiche personnage
        document.getElementById("character-name").textContent = character.name;
        document.getElementById("character-image").src = character.image;
        document.getElementById("character-special").textContent = character.special1;

        // Mettre à jour les stats de niveau et XP
        currentXP = character.xp || 0;
        currentLevel = character.level || 1;
        selectedCharacter = character;
        updateCharacterStats();
        document.getElementById("xp").textContent = currentXP;
        document.getElementById("level").textContent = currentLevel;
    }
}

// Vérifier la dernière page consultée
function checkLastPage() {
    const lastPage = localStorage.getItem("lastPage");
    
    if (lastPage === "confirmation") {
        loadCharacterFromLocalStorage();
        hideElement(SelectionPage);
        showElement(confirmationPage);
    } else if (lastPage === "character") {
        loadCharacterFromLocalStorage();
        hideElement(SelectionPage);
        showElement(characterPage);
    } else {
        showElement(SelectionPage); // Revenir à la page de sélection par défaut
    }
}

// Fonction de reset des données du personnage et du localStorage
function resetCharacter() {
    // Effacer les données du personnage dans le localStorage
    localStorage.removeItem("selectedCharacter");
    
    // Réinitialiser les valeurs de niveau, XP et autres stats
    currentXP = 0;
    currentLevel = 1;
    document.getElementById("xp").textContent = currentXP;
    document.getElementById("level").textContent = currentLevel;

    // Réinitialiser les autres informations du personnage (nom, image, etc.)
    document.getElementById("confirm-name").textContent = "";
    document.getElementById("confirm-special").textContent = "";
    document.getElementById("confirm-image").src = "";
    document.getElementById("confirm-quote").textContent = "";

    // Vider également les informations de la fiche personnage
    document.getElementById("character-name").textContent = "";
    document.getElementById("character-image").src = "";
    document.getElementById("character-special").textContent = "";

    // Retourner à la page de sélection de personnage
    hideElement(confirmationPage);
    hideElement(characterPage);
    showElement(SelectionPage);

    // Sauvegarder l'information que l'utilisateur revient à la page de sélection
    localStorage.setItem("lastPage", "selection");
}


// Gestion de la sélection de personnage
document.addEventListener("DOMContentLoaded", function () {
    checkLastPage();
    const characters = document.querySelectorAll(".character");

    characters.forEach(character => {
        character.addEventListener("click", function () {
            resetCharacterStats();
            // Extraire le nom du personnage à partir de l'élément span
            const characterName = character.querySelector(".character-name").textContent;
            const characterSpecial1 = character.getAttribute("data-special1");
            const characterSpecial2 = character.getAttribute("data-special2");
            const characterQuote = character.getAttribute("data-quote");
            const characterImage = character.querySelector("img").src;
            const bpName = character.getAttribute("data-bp-name");
            const bpValue = character.getAttribute("data-bp-value");
            const bpLimited = character.getAttribute("data-bp-limited") === "true";

            // Mettre à jour la page de confirmation avec les informations du personnage
            document.getElementById("confirm-name").textContent = characterName;
            document.getElementById("confirm-special").innerHTML = `${characterSpecial1}<br>${characterSpecial2}`;
            document.getElementById("confirm-quote").textContent = `"${characterQuote}"`;
            document.getElementById("confirm-image").src = characterImage;

            // Stockage des informations de BP
            selectedCharacter = {
                name: characterName,
                bpName: bpName,
                bpValue: bpValue,
                bpLimited: bpLimited
            };

            // Affiche ou cache le BP selon qu'il est défini ou non
            if (bpName && bpValue) {
                document.getElementById("bp-container").style.display = "block";
                document.getElementById("bp-name").textContent = bpName;
                document.getElementById("bp").textContent = bpValue;
            } else {
                document.getElementById("bp-container").style.display = "none";
            }
        
        localStorage.setItem("lastPage", "confirmation");
        saveCharacterToLocalStorage();
        hideElement(SelectionPage);
        showElement(confirmationPage);
    });
});
});

// Bouton de confirmation
confirmButton.addEventListener('click', function() {
    
 // Transférer les données vers la page fiche personnage
 document.getElementById("character-name").textContent = document.getElementById("confirm-name").textContent;
 document.getElementById("character-image").src = document.getElementById("confirm-image").src;
 document.getElementById("character-special").innerHTML = document.getElementById("confirm-special").innerHTML;

    resetCharacterStats(); // Reset stats when confirming

    localStorage.setItem("lastPage", "character");
    saveCharacterToLocalStorage();
    hideElement(confirmationPage);
    showElement(characterPage);
});

// Bouton retour
backButton.addEventListener('click', function() {

    localStorage.setItem("lastPage", "selection");
    saveCharacterToLocalStorage();
    hideElement(confirmationPage);
    showElement(SelectionPage);
});

// Bouton reset
resetButton.addEventListener('click', function() {

    resetCharacterStats();
    resetCharacter();

    localStorage.setItem("lastPage", "selection");
    hideElement(characterPage);
    showElement(SelectionPage);
});

// Bouton changement XP
xpAddButton.addEventListener('click', function() {
    const newXP = parseInt(xpInput.value);
    if (!isNaN(newXP)) {
        addXP(newXP);
    }

    saveCharacterToLocalStorage();
});

// Liste des XP nécessaires pour passer chaque niveau
const xpRequiredForLevelUp = {
    1: 10,
    2: 40,
    3: 70,
    4: 125,
    5: 250,
    6: null // Pas de niveau au-delà de 6
};

// Fonction pour mettre à jour les statistiques du personnage
let currentXP = 0;
let currentLevel = 1;
let selectedCharacter = null; // Nouvelle variable pour stocker le personnage sélectionné

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
    } else if (currentLevel === 2 && currentXP >= 40) {
        currentLevel = 3;
        levelChanged = true;
    } else if (currentLevel === 3 && currentXP >= 70) {
        currentLevel = 4;
        levelChanged = true;
    } else if (currentLevel === 4 && currentXP >= 125) {
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
        updateCharacterBP();
        updateCharacterDetails();
        saveCharacterToLocalStorage();
    }
}

function updateCharacterStats() {
    let pa = 1, ca = 2, sc = 0;
    let xpMax = xpRequiredForLevelUp[currentLevel] || "Max"; // Affiche "Max" au niveau 6

    switch (currentLevel) {
        case 2:
            pa = 2; ca = 2; sc = 1; break;
        case 3:
            pa = 3; ca = 3; sc = 1; break;
        case 4:
            pa = 4; ca = 3; sc = 2; break;
        case 5:
            pa = 5; ca = 3; sc = 3; break;
        case 6:
            pa = 8; ca = 4; sc = 4; break;
    }

    // Mettre à jour le localStorage
    localStorage.setItem("currentLevel", currentLevel);
    localStorage.setItem("currentXP", currentXP);

    // Mettre à jour le DOM
    document.getElementById("level").textContent = currentLevel;
    document.getElementById("pa").textContent = pa;
    document.getElementById("ca").textContent = ca;
    document.getElementById("sc").textContent = sc;

    // Mettre à jour l'affichage des XP
    document.getElementById("xp").textContent = currentXP;
    document.getElementById("xp-max").textContent = xpMax;
}

document.addEventListener("DOMContentLoaded", function() {
    // Restaurer les niveaux et XP à partir du localStorage
    const savedLevel = localStorage.getItem("currentLevel");
    const savedXP = localStorage.getItem("currentXP");

    if (savedLevel) {
        currentLevel = parseInt(savedLevel);
        currentXP = parseInt(savedXP);
        updateCharacterStats();
    }
});

function updateCharacterBP() {
    if (selectedCharacter && selectedCharacter.bpName && selectedCharacter.bpValue) {
        // Si le BP est limité au niveau 1 et que le personnage n'est plus au niveau 1, masquer le BP
        if (selectedCharacter.bpLimited && currentLevel > 1) {
            document.getElementById("bp-container").style.display = "none";
        } else {
            document.getElementById("bp-container").style.display = "block";
            document.getElementById("bp-name").textContent = selectedCharacter.bpName;
            document.getElementById("bp").textContent = selectedCharacter.bpValue;
        }
    } else {
        document.getElementById("bp-container").style.display = "none";
    }
}

// Fonction pour mettre à jour l'image et le niveau du personnage
function updateCharacterDetails() {
    const characterImages = {
        "Monkey D. Luffy": [
            "Ch1/Ch1-L1.png",
            "Ch1/Ch1-L2.png",
            "Ch1/Ch1-L3.png",
            "Ch1/Ch1-L4.png",
            "Ch1/Ch1-L5.png",
            "Ch1/Ch1-L6.png"
        ],
        "Uzumaki Naruto": [
            "Ch2/Ch2-L1.png",
            "Ch2/Ch2-L2.png",
            "Ch2/Ch2-L3.png",
            "Ch2/Ch2-L4.png",
            "Ch2/Ch2-L5.png",
            "Ch2/Ch2-L6.png"
        ],
        "Kurosaki Ichigo": [
            "Ch3/Ch3-L1.png",
            "Ch3/Ch3-L2.png",
            "Ch3/Ch3-L3.png",
            "Ch3/Ch3-L4.png",
            "Ch3/Ch3-L5.png",
            "Ch3/Ch3-L6.png"
        ],
        "Goku": [
            "Ch4/Ch4-L1.png",
            "Ch4/Ch4-L2.png",
            "Ch4/Ch4-L3.png",
            "Ch4/Ch4-L4.png",
            "Ch4/Ch4-L5.png",
            "Ch4/Ch4-L6.png"
        ],
        "Dragneel Natsu": [
            "Ch5/Ch5-L1.png",
            "Ch5/Ch5-L2.png",
            "Ch5/Ch5-L3.png",
            "Ch5/Ch5-L4.png",
            "Ch5/Ch5-L5.png",
            "Ch5/Ch5-L6.png"
        ],
        "Pegasus Seiya": [
            "Ch6/Ch6-L1.png",
            "Ch6/Ch6-L2.png",
            "Ch6/Ch6-L3.png",
            "Ch6/Ch6-L4.png",
            "Ch6/Ch6-L5.png",
            "Ch6/Ch6-L6.png"
        ],
        "Saeba Ryo": [
            "Ch7/Ch7-L1.png",
            "Ch7/Ch7-L2.png",
            "Ch7/Ch7-L3.png",
            "Ch7/Ch7-L4.png",
            "Ch7/Ch7-L5.png",
            "Ch7/Ch7-L6.png"
        ],
        "Kirigaya Kazuto": [
            "Ch8/Ch8-L1.png",
            "Ch8/Ch8-L2.png",
            "Ch8/Ch8-L3.png",
            "Ch8/Ch8-L4.png",
            "Ch8/Ch8-L5.png",
            "Ch8/Ch8-L6.png"
        ],
        "Jäger Eren": [
            "Ch9/Ch9-L1.png",
            "Ch9/Ch9-L2.png",
            "Ch9/Ch9-L3.png",
            "Ch9/Ch9-L4.png",
            "Ch9/Ch9-L5.png",
            "Ch9/Ch9-L6.png"
        ],
        "Midoriya Izuku": [
            "Ch10/Ch10-L1.png",
            "Ch10/Ch10-L2.png",
            "Ch10/Ch10-L3.png",
            "Ch10/Ch10-L4.png",
            "Ch10/Ch10-L5.png",
            "Ch10/Ch10-L6.png"
        ],
        "Kamado Tanjiro": [
            "Ch11/Ch11-L1.png",
            "Ch11/Ch11-L2.png",
            "Ch11/Ch11-L3.png",
            "Ch11/Ch11-L4.png",
            "Ch11/Ch11-L5.png",
            "Ch11/Ch11-L6.png"
        ],
        "Itadori Yuji": [
            "Ch12/Ch12-L1.png",
            "Ch12/Ch12-L2.png",
            "Ch12/Ch12-L3.png",
            "Ch12/Ch12-L4.png",
            "Ch12/Ch12-L5.png",
            "Ch12/Ch12-L6.png"
        ],
        "Asta": [
            "Ch13/Ch13-L1.png",
            "Ch13/Ch13-L2.png",
            "Ch13/Ch13-L3.png",
            "Ch13/Ch13-L4.png",
            "Ch13/Ch13-L5.png",
            "Ch13/Ch13-L6.png"
        ],
        "Makino Tsukushi": [
            "Ch14/Ch14-L1.png",
            "Ch14/Ch14-L2.png",
            "Ch14/Ch14-L3.png",
            "Ch14/Ch14-L4.png",
            "Ch14/Ch14-L5.png",
            "Ch14/Ch14-L6.png"
        ],
        "Makunouchi ippo": [
            "Ch15/Ch15-L1.png",
            "Ch15/Ch15-L2.png",
            "Ch15/Ch15-L3.png",
            "Ch15/Ch15-L4.png",
            "Ch15/Ch15-L5.png",
            "Ch15/Ch15-L6.png"
        ],
        "Hinata Shoyo": [
            "Ch16/Ch16-L1.png",
            "Ch16/Ch16-L2.png",
            "Ch16/Ch16-L3.png",
            "Ch16/Ch16-L4.png",
            "Ch16/Ch16-L5.png",
            "Ch16/Ch16-L6.png"
        ],
        "Death Note Owner": [
            "Ch17/Ch17-L1.png",
            "Ch17/Ch17-L2.png",
            "Ch17/Ch17-L3.png",
            "Ch17/Ch17-L4.png",
            "Ch17/Ch17-L5.png",
            "Ch17/Ch17-L6.png"
        ],
        "Guts": [
            "Ch18/Ch18-L1.png",
            "Ch18/Ch18-L2.png",
            "Ch18/Ch18-L3.png",
            "Ch18/Ch18-L4.png",
            "Ch18/Ch18-L5.png",
            "Ch18/Ch18-L6.png"
        ],
        "Shinichi Kudo": [
            "Ch19/Ch19-L1.png",
            "Ch19/Ch19-L2.png",
            "Ch19/Ch19-L3.png",
            "Ch19/Ch19-L4.png",
            "Ch19/Ch19-L5.png",
            "Ch19/Ch19-L6.png"
        ],
        "Elric Brothers": [
            "Ch20/Ch20-L1.png",
            "Ch20/Ch20-L2.png",
            "Ch20/Ch20-L3.png",
            "Ch20/Ch20-L4.png",
            "Ch20/Ch20-L5.png",
            "Ch20/Ch20-L6.png"
        ],
        "Sakata Gintoki": [
            "Ch21/Ch21-L1.png",
            "Ch21/Ch21-L2.png",
            "Ch21/Ch21-L3.png",
            "Ch21/Ch21-L4.png",
            "Ch21/Ch21-L5.png",
            "Ch21/Ch21-L6.png"
        ],
        "JoJo": [
            "Ch22/Ch22-L1.png",
            "Ch22/Ch22-L2.png",
            "Ch22/Ch22-L3.png",
            "Ch22/Ch22-L4.png",
            "Ch22/Ch22-L5.png",
            "Ch22/Ch22-L6.png"
        ],
        "Freecss Gon": [
            "Ch23/Ch23-L1.png",
            "Ch23/Ch23-L2.png",
            "Ch23/Ch23-L3.png",
            "Ch23/Ch23-L4.png",
            "Ch23/Ch23-L5.png",
            "Ch23/Ch23-L6.png"
        ],
        "Forger Anya": [
            "Ch24/Ch24-L1.png",
            "Ch24/Ch24-L2.png",
            "Ch24/Ch24-L3.png",
            "Ch24/Ch24-L4.png",
            "Ch24/Ch24-L5.png",
            "Ch24/Ch24-L6.png"
        ],
        "Gundam Pilot": [
            "Ch25/Ch25-L1.png",
            "Ch25/Ch25-L2.png",
            "Ch25/Ch25-L3.png",
            "Ch25/Ch25-L4.png",
            "Ch25/Ch25-L5.png",
            "Ch25/Ch25-L6.png"
        ],
        "Satoshi": [
            "Ch26/Satoshi/Ch26-S-L1.png",
            "Ch26/Satoshi/Ch26-S-L2.png",
            "Ch26/Satoshi/Ch26-S-L3.png",
            "Ch26/Satoshi/Ch26-S-L4.png",
            "Ch26/Satoshi/Ch26-S-L5.png",
            "Ch26/Satoshi/Ch26-S-L6.png"
        ],
        "Hikari": [
            "Ch26/Hikari/Ch26-H-L1.png",
            "Ch26/Hikari/Ch26-H-L2.png",
            "Ch26/Hikari/Ch26-H-L3.png",
            "Ch26/Hikari/Ch26-H-L4.png",
            "Ch26/Hikari/Ch26-H-L5.png",
            "Ch26/Hikari/Ch26-H-L6.png"
        ],
        "Inuyasha": [
            "Ch27/Ch27-L1.png",
            "Ch27/Ch27-L2.png",
            "Ch27/Ch27-L3.png",
            "Ch27/Ch27-L4.png",
            "Ch27/Ch27-L5.png",
            "Ch27/Ch27-L6.png"
        ],
        "Shin": [
            "Ch28/Ch28-L1.png",
            "Ch28/Ch28-L2.png",
            "Ch28/Ch28-L3.png",
            "Ch28/Ch28-L4.png",
            "Ch28/Ch28-L5.png",
            "Ch28/Ch28-L6.png"
        ],
        "Atom": [
            "Ch29/Ch29-L1.png",
            "Ch29/Ch29-L2.png",
            "Ch29/Ch29-L3.png",
            "Ch29/Ch29-L4.png",
            "Ch29/Ch29-L5.png",
            "Ch29/Ch29-L6.png"
        ],
        "Tsukino Usagi": [
            "Ch30/Ch30-L1.png",
            "Ch30/Ch30-L2.png",
            "Ch30/Ch30-L3.png",
            "Ch30/Ch30-L4.png",
            "Ch30/Ch30-L5.png",
            "Ch30/Ch30-L6.png"
        ],
    };

    const characterName = document.getElementById("character-name").textContent;
    const level = parseInt(document.getElementById("level").textContent);
    const newImage = characterImages[characterName][level - 1];
    const characterImageElement = document.getElementById("character-image");

    // Appliquer une transition douce
    characterImageElement.style.opacity = 0; 

    setTimeout(() => {
        characterImageElement.src = newImage; 
        characterImageElement.style.opacity = 1; 
    }, 500); 
}

// Gestion Personnage 26
document.addEventListener("DOMContentLoaded", function () {
    const characters = document.querySelectorAll(".character");

    characters.forEach(character => {
        character.addEventListener("click", function () {
            const characterName = character.querySelector(".character-name").textContent;

            // Si c'est Character 26, ne pas agir sur le clic principal
            if (character.classList.contains("character-26")) return;

            goToConfirmation(character);
        });
    });

    // Sélection spécifique pour Satoshi & Hikari
    document.getElementById("select-satoshi").addEventListener("click", function (event) {
        event.stopPropagation(); // Empêche la sélection du personnage de base
        selectCharacter26("Satoshi");
    });

    document.getElementById("select-hikari").addEventListener("click", function (event) {
        event.stopPropagation();
        selectCharacter26("Hikari");
    });

    function selectCharacter26(version) {
        let characterData = {
            name: version === "Satoshi" ? "Satoshi" : "Hikari",
            image: version === "Satoshi" ? "Ch26/Satoshi/Ch26-S-L1.png" : "Ch26/Hikari/Ch26-H-L1.png",
            special1: version === "Satoshi" ? "+5XP for questions about Pokémon" : "+5XP for questions about Pokémon",
            special2: version === "Satoshi" ? "Start the game with a Master Ball" : "Start the game with a Master Ball",
            quote: version === "Satoshi" ? "ゲットだぜ！" : "ち・が・い・ま・す！"
        };

        goToConfirmation(characterData);
    }

    function goToConfirmation(character) {
        let characterName = character.name || character.querySelector(".character-name").textContent;
        let characterImage = character.image || character.querySelector("img").src;
        let characterSpecial1 = character.special1 || character.getAttribute("data-special1");
        let characterSpecial2 = character.special2 || character.getAttribute("data-special2");
        let characterQuote = character.quote || character.getAttribute("data-quote");

        document.getElementById("confirm-name").textContent = characterName;
        document.getElementById("confirm-image").src = characterImage;
        document.getElementById("confirm-special").innerHTML = `${characterSpecial1}<br>${characterSpecial2}`;
        document.getElementById("confirm-quote").textContent = `"${characterQuote}"`;

        let characterData = {
            name: characterName,
            image: characterImage,
            special1: characterSpecial1,
            special2: characterSpecial2,
            quote: characterQuote
        };
        localStorage.setItem("selectedCharacter", JSON.stringify(characterData));

        hideElement(document.getElementById("selection-header"));
        showElement(document.getElementById("confirmation-page"));
    }
});