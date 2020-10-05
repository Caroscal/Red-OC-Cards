//set up filter state
const filters={
    race: 'any',
    gender: 'any',
    universe: 'any',
    created: 'any'
};

const filterChoices={
    race: ['any','earth pony','pegasus','unicorn','bat pony'],
    gender: ['any','mare','stallion'],
    universe: ['the lost princess','fragile gold','forest lost'],
    created: ['2013','2014','2015','2016','2017','2018','2019','2020'],
}

//set up event listeners
const filterChange = () =>{
    //get updated filter values
    filters.race=document.getElementById('raceFilter').value;
    filters.gender=document.getElementById('genderFilter').value;
    filters.universe=document.getElementById('universeFilter').value;
    filters.created=document.getElementById('createdFilter').value.toString();
    createCards(); //regenerate cards
}

document.getElementById('raceFilter').addEventListener('change', filterChange);
document.getElementById('genderFilter').addEventListener('change', filterChange);
document.getElementById('universeFilter').addEventListener('change', filterChange);
document.getElementById('createdFilter').addEventListener('change', filterChange);

const createCard = (ocData) =>{
    if(ocData === undefined)
    {
        console.log('a');
    }
    let colour= '';
    switch(ocData.race.toLowerCase()){
        case 'earth pony':
            colour='brown';
            break;
        case 'unicorn':
            colour='pink';
            break;
        case 'pegasus':
            colour='blue';
            break;
        case 'bat pony':
            colour='purple';
            break;
        default:
            colour='grey';
    }

    let domString = `
    <div class="card card-${colour}">
        <div class="name name-${colour}"><h1>${ocData.name}</h1></div>
        <div class="image image-${colour}">
            <img src="${ocData.imgLink}" alt="Image of OC">
        </div>
        <div class="basicInfo ${colour}">
            <p class="Field"><b>Race:</b> ${ocData.race}</p>
            <p class="Field"><b>Gender:</b> ${ocData.gender}</p>
            <p class="Field"><b>Age:</b> ${ocData.age}</p>
            <p class="Field"><b>Created:</b> ${ocData.created}</p>
            <p class="Field"><b>Role:</b> ${ocData.rold}</p>
        </div>
        <div class="adinfo ${colour}">
            <p class="adField"><b>Universe:</b> ${ocData.universe}</p>
            <p class="adField"><b>Relationships:</b> ${ocData.relationships}</p>
            <p class="adField"><b>Additional Info:</b> ${ocData.info}</p>
        </div>
    </div>`
    return domString;
}

//loop through json results
const createCards = () =>{
    container = document.querySelector('.container');
    container.innerHTML = "";


    //get keys here to save time
    let keys = Object.keys(filters);
    //filter data
    var filtered = data.filter((oc) => {
        //filtering algorithm
        let filterChecks = 0;
        for (let key of keys){
            if(filters[key] === 'any')
                filterChecks++;
            else if(filters[key] === oc[key].toString().toLowerCase())
                filterChecks++;
            else if(key === 'created' && oc[key].toString().toLowerCase().startsWith(filters[key])){
                filterChecks++;
            }
            else if(filters[key] === 'other' && !filterChoices[key].includes(oc[key].toLowerCase()))
                filterChecks++;
        }
        return filterChecks === 4;
    });

    var count = 0;
    for(let i=0; i < filtered.length; i++){

        container.insertAdjacentHTML('beforeend', createCard(filtered[i]));
        //console.log(container);
    }
}

createCards();