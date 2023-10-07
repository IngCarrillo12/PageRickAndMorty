var pagination = {prev: "", next: ""}
const cardContainer = document.querySelector(".card-list-character")
const fetchApi= async()=>{
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character")
        if(!response.ok)throw new Error("Error en la red")
        const {results, info} = await response.json()
        const {prev,next} = await info
        pagination = {prev, next}
        results.forEach(({id, image, name, species, gender }) => {
        cardContainer.innerHTML += `
        <a href="" class="card-character">
            <div class="character-img">
                <img src="${image}" alt="bulbasaur">
            </div>
            <div class="character-info">
                <span class="character-id">${id}</span>
                <h3 class="character-name text-capitalize">${name}</h3>
                <div class="character-types">
                    <span class="type grass">${species}</span>
                    <span class="type poison">${gender}</span>
                </div>
            </div>
        </a>
        `
        });
    } catch (error) {
        console.log("Error: ", error)
    }
}
const nextPage = async ()=>{
  cardContainer.innerHTML = "";
  try {
    const page= pagination;
    const response = await fetch(page.next);
    if(!response.ok)throw new Error("Error en la red")
    const {results, info} = await response.json()
    const {prev, next} = await info
    pagination = {prev, next}
    results.forEach(({id, image, name, species, gender }) => {
    cardContainer.innerHTML += `
    <a href="" class="card-character">
        <div class="character-img">
            <img src="${image}" alt="bulbasaur">
        </div>
        <div class="character-info">
            <span class="character-id">${id}</span>
            <h3 class="character-name text-capitalize">${name}</h3>
            <div class="character-types">
                <span class="type grass">${species}</span>
                <span class="type poison">${gender}</span>
            </div>
        </div>
    </a>
    `
    });
  } catch (error) {
    console.log("Error: ", error)
  }
}
const prevPage = async ()=>{
  cardContainer.innerHTML = "";
  try {
    const page= pagination
    const response = await fetch(page.prev);
    if(!response.ok)throw new Error("Error en la red")
    const {results, info} = await response.json()
    const {prev, next} = await info
    pagination = {prev, next}
    results.forEach(({id, image, name, species, gender }) => {
    cardContainer.innerHTML += `
    <a href="" class="card-character">
        <div class="character-img">
            <img src="${image}" alt="bulbasaur">
        </div>
        <div class="character-info">
            <span class="character-id">${id}</span>
            <h3 class="character-name text-capitalize">${name}</h3>
            <div class="character-types">
                <span class="type grass">${species}</span>
                <span class="type poison">${gender}</span>
            </div>
        </div>
    </a>
    `
    });
  } catch (error) {
    console.log("Error: ", error)
  }
}

fetchApi()
