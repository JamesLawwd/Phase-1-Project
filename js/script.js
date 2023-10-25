const input = document.getElementById('input');
const searchBtn = document.getElementById('btn');
const notFoundWord = document.querySelector('.cant_find_word');
const definationBox = document.querySelector('.defination');
const audioBox = document.querySelector('.audio') ;

searchBtn.addEventListener('click',e =>{
    e.preventDefault();
    
    const searchedWord = input.value;
    if (searchedWord === ""){
        alert('Please enter the searched Word');
        return;
    }

    getSearchedWord(searchedWord);
    notFoundWord.innerText="";
    audioBox.innerText="";
    definationBox.innerText="";
});


async function getSearchedWord(searchedWord){
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=696bb10c-9957-46a7-a71d-ebdc6368e23d`);
    const data = await response.json();
    console.log(data);
    

    if (!data.length){
        notFoundWord.innerText="No results Found";
        return;
    }

    if (typeof data[0] === 'string'){ // if result is suggestion
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?';
        notFoundWord.appendChild(heading);

        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFoundWord.appendChild(suggestion);
        })
        return;
    }
    // To revisit
    let definations = data[0].shortdef[0]; // find the results and give it back
    definationBox.innerText = definations;

    let soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName){ // if sound is available
        getSound(soundName);

    }
}

// To get sound of the searched word

function getSound(soundName){
    let box=soundName.charAt(0);
    let soundSrc=`https://media.merriam-webster.com/soundc11/${box}/${soundName}.wav?key=696bb10c-9957-46a7-a71d-ebdc6368e23d`;

    let audioSound = document.createElement('audio');
    audioSound.src = soundSrc;
    audioSound.controls = true;
    audioBox.appendChild(audioSound);
};