let characters = [];
let next = '';
let prev = '';
let fragment = document.createDocumentFragment();
const container = document.querySelector('.row1');
const single = document.getElementById('single');
const spin = document.getElementById('spinkit');
const btnBack = document.getElementById('btnBack');
const btn = document.querySelector('#btnP');
const btnPrev = document.getElementById('btnPrev');
const all = document.getElementById('all');
const btnNext = document.getElementById('btnSig');
const span = document.getElementById('spanT');
const status = document.getElementsByClassName('status');
const gender = document.getElementsByClassName('gender');

//Add events listeners
for (let i = 0; i < status.length; i++) {
    status[i].addEventListener('click',(e) => {
        //console.log(e.target.id);
        span.innerHTML = e.target.id;
        getCharacters('https://rickandmortyapi.com/api/character/?status='+e.target.id);
    }); 
}
for (let i = 0; i < gender.length; i++) {
    gender[i].addEventListener('click',(e) => {
        //console.log(e.target.id);
        span.innerHTML = e.target.id;
        getCharacters('https://rickandmortyapi.com/api/character/?gender='+e.target.id);
    }); 
}
btnPrev.addEventListener('click',(e) => getCharacters(prev));
btnNext.addEventListener('click',(e) => getCharacters(next));
btnBack.addEventListener('click',(e) => back());
all.addEventListener('click',(e) =>{ 
    span.innerHTML = 'All';
    getCharacters('https://rickandmortyapi.com/api/character/?page=1')
});
    
    
getCharacters('https://rickandmortyapi.com/api/character/?page=1');    

//get list of Characters by url
async function getCharacters(url){
    
    single.style.display = 'none';
    btn.style.display = 'block';
    container.style.display = 'none';
    spin.style.display = 'block';

    await fetch(url)
        .then(res => res.json())
        .then(dat => {
            next = dat.info.next;
            prev = dat.info.prev
            characters = dat.results})
        .catch(error => {
            next = null;
            prev = null;
            characters = [{
                image: 'image/page-not-found.png',
                name: 'Not Found',
                species: 'Sorry'
            }];
            console.log(error);
        });
    //console.log(container.firstElementChild);
    if (next == null) btnNext.setAttribute('disabled','true');
    else btnNext.removeAttribute('disabled');
    if (prev == null) btnPrev.setAttribute('disabled','true');
    else btnPrev.removeAttribute('disabled');

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    for(let character of characters){
        let divItems = document.createElement('div');
        divItems.classList.add('col-6');
        divItems.classList.add('col-md-3');
        let item = document.createElement('div');
        item.classList.add('item');
        item.classList.add('card');
        item.id = character.id;
        item.innerHTML = `<div class="card-body"><img class="${character.status}" src="${character.image}">
                        <h3>${character.name}</h3>
                        <p>${character.species}</p></div>`;
        if (character.name != 'Not Found') {
            item.addEventListener('click',(e) => {
                let id = '';
                for(let p of e.path){
                    if(p.id != '') {
                        id = p.id;
                        break;
                    }
                }
                //console.log(e);
                singleCharacter(id);
            });
        }
        divItems.appendChild(item)
        fragment.appendChild(divItems);
    }

    container.appendChild(fragment);
    container.style.display = 'flex';
    spin.style.display= 'none';
    
        
}

//get a single character by id
async function singleCharacter(id) {
    const sName = document.getElementById('sName');
    const sStatus = document.getElementById('sStatus');
    const sSpecie = document.getElementById('sSpecie');
    const sType = document.getElementById('sType');
    const sGender = document.getElementById('sGender');
    const sOrigin = document.getElementById('sOrigin');
    const sLocation = document.getElementById('sLocation');
    const sImg = document.getElementById('sImg');
    let singleCh = {};

    container.style.display = 'none';
    btn.style.display = 'none';
    spin.style.display= 'block';

    await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(dat => {
            singleCh = dat;
            //console.log("1")
            console.log(dat)})
        .catch(error => console.log(error));

    sName.innerHTML = singleCh.name;
    sStatus.innerHTML = singleCh.status;
    sSpecie.innerHTML = singleCh.species;
    sType.innerHTML = singleCh.type;
    sGender.innerHTML = singleCh.gender;
    sOrigin.innerHTML = singleCh.origin.name;
    sLocation.innerHTML = singleCh.location.name;
    sImg.src = singleCh.image;

    spin.style.display= 'none';
    single.style.display = 'block';
}

//back previous view
function back() {
    single.style.display = 'none';
    container.style.display = 'flex';
    btn.style.display = 'block';
}
    
     