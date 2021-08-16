const popcornBtn = document.getElementById("popcornBtn");
const popcornImg = document.getElementById("popcornImg");

const nameInput = document.getElementById("nameInput");
const popcornNameEl = document.getElementById("popcornName");

const nameBankSection = document.getElementById("nameBank");
const addNameBtn = document.getElementById("addNameBtn");

const names = [];
            
/**
 * Initialize the UI components of the application.
 */ 
(function initUI() {
    // listen for button clicks on the add name button
    addNameBtn.onclick = addName;

    // listen for enter keypresses when focused on the add name input
    nameInput.onkeypress = e => {
        if (e.key == "Enter")
        {
            addName();
        }
    }

    // listen for button clicks on the popcorn button
    popcornBtn.onclick = popcorn;
})();

/**
 * Choose a random person and display their name.
 */
function popcorn() {
    // change the image to show a popped corn
    popcornImg.src = "img/popcorn.png";

    // after a second, go back to the kernel image
    setTimeout(() => popcornImg.src = "img/kernel.png", 1000);

    // if the user has added any people's names, run
    const pool = names.filter(x => x.inRotation);
    if (pool.length)
    {
        // get the a random person whose name is still in rotation
        const person = pool[Math.floor(Math.random() * pool.length)];

        // set the popcorn jumbotron to the randomly selected name
        popcornNameEl.innerText = person.name;

        // take the person out of popcorn rotation
        person.inRotation = false;

        // get the index of the person in the names array (to get their card)
        const index = names.findIndex(x => x == person);
        document.querySelectorAll(".card")[index].classList.add("text-decoration-line-through");
    }
}

/**
 * Add a name to the name bank.
 */
function addName() {
    // get what the user typed in the name input
    const name = nameInput.value;

    // add to our names array
    names.push({
        name: name,
        inRotation: true
    });

    // add a column so we can use the bootstrap grid system for sizing
    const col = document.createElement("div");
    col.className = "col";

    // add a card to the grid column
    const card = document.createElement("div");
    card.className = "card";
    col.appendChild(card);

    // add a body to the card
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);
    card.onclick = () => {
        // get the index of the name by where it is displayed
        const index = Array.from(nameBankSection.children).indexOf(col);

        // flip the boolean value
        names[index].inRotation = !names[index].inRotation;

        // toggle a strikethrough to show that person is not in rotation
        card.classList.toggle("text-decoration-line-through");
    }

    // add a close button to the name card
    const closeBtn = document.createElement("button");
    closeBtn.className = "btn-close";
    cardBody.appendChild(closeBtn);
    closeBtn.onclick = e => {
        e.stopPropagation();

        // remove name card from name bank
        col.remove();

        // delete the name from the names array
        names.splice(Array.from(nameBankSection.children).indexOf(col), 1);
    }

    // add the name as a card title header
    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = name;
    cardBody.appendChild(cardTitle);

    // add the grid column to the name bank
    nameBankSection.appendChild(col);

    // clear input
    nameInput.value = "";
}