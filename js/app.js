var page = 1
const baseUrl = "https://rickandmortyapi.com/api/character"
const cardContainer = document.querySelector(".card-list-character")
const formSearch = document.querySelector(".form-search")
const iconFilter= document.querySelector(".icon-filter")
const filter= document.querySelector(".filter")
const select = document.querySelector(".contenido-types")
const pagination = document.querySelector(".container-pagination")
const fetchApi= async(page)=>{
    cardContainer.innerHTML = "";
    pagination.style.display = "flex"
    try {
        const response = await fetch(`${baseUrl}?page=${page}`)
        if(!response.ok)throw new Error("Error en la red")
        const {results} = await response.json()
        results.forEach(({id, image, name, species, gender, location, origin }) => {
        cardContainer.innerHTML += `
        <div href="" class="card-character">
            <div class="character-img">
                <img src="${image}" alt="bulbasaur">
            </div>
            <div class="character-info">
                <span class="character-id">N°${id}</span>
                <h3 class="character-name text-capitalize">${name}</h3>
                <div class="character-types">
                    <div class="group-type">
                        <span class="type "><b>Specie:</b>${species}</span>
                    </div>
                    <div class="group-type">
                        <span class="type"><b>Gender:</b>${gender}</span>
                    </div>
                </div>
            </div>
        </div>
        `
        });
    } catch (error) {
        console.log("Error: ", error)
    }
}
const searchInApi = async ()=>{
    try {
        const characterSearch = await document.querySelector(".input-search").value;
        let allCharacters= [];
        for (let page = 1; page < 42; page++) {
            const response = await fetch(`${baseUrl}?page=${page}`)
            if(!response.ok)throw new Error("Error en la red");
            const {results} = await response.json();
            allCharacters = await results.filter(character=>character.name.toLowerCase().includes(characterSearch.toLowerCase()));
            return allCharacters;
        }
    } catch (error) {
        console.log("ERROR: ", error)
    }
}
const getNamesApi = async()=>{
    try {    
        let allNames= [];
        for (let page = 1; page < 42; page++) {
            const response = await fetch(`${baseUrl}?page=${page}`)
            if(!response.ok)throw new Error("Error en la red");
            const {results} = await response.json();
           
            const names = results.map((character)=>{
                    const {name, id}= character
                    return {name, id}
                })
            allNames = allNames.concat(names)
           
        }
        allNames.forEach(({name, id})=>{
            select.innerHTML += `<option value="${id}" id="character">${name}</option>` 
        })
    } catch (error) {
        console.log("ERROR: ", error)
    }
}
const findCharacterApi = async(id)=>{
    try {
        cardContainer.innerHTML = "";
        const response = await fetch(`${baseUrl}/${id}`)
        if(!response.ok)throw new Error("Error en la red")
        const data = await response.json()
        cardContainer.innerHTML += `
        <div href="" class="card-character">
            <div class="character-img">
                <img src="${data.image}" alt="bulbasaur">
            </div>
            <div class="character-info">
                <span class="character-id">N°${data.id}</span>
                <h3 class="character-name text-capitalize">${data.name}</h3>
                <div class="character-types">
                    <div class="group-type">
                        <span class="type "><b>Specie:</b>${data.species}</span>
                    </div>
                    <div class="group-type">
                        <span class="type"><b>Gender:</b>${data.gender}</span>
                    </div>
                </div>
            </div>
        </div>
        `
    } catch (error) {
        console.log("ERROR ",error)
    }
}
const nextPage =()=>{
    page= page + 1
    fetchApi(page)
    
}
const prevPage = ()=>{
    page = page - 1 ;
    fetchApi(page)
}
const changeFilter =()=>{
    filter.classList.toggle("active")
}
select.addEventListener("change", ()=>{
    if(select.value !== "all"){
        findCharacterApi(select.value)
    }else{
        fetchApi()
    }
    
})

formSearch.addEventListener("submit", async(e)=>{
    cardContainer.innerHTML = "";
    e.preventDefault()
    const foundCharacters = await searchInApi()
    foundCharacters.forEach(({id, image, name, species, gender }) => {
        cardContainer.innerHTML += `
        <div href="" class="card-character">
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
        </div>
        `
        pagination.style.display = "none"
        });
})
fetchApi()
getNamesApi()
