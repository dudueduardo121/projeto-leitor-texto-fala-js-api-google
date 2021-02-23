const main = document.querySelector('main')
const btnInsertText = document.querySelector('.btn-toggle')
const btnReadText = document.querySelector('#read')
const divTextBox = document.querySelector('.text-box')
const closeTextBox = document.querySelector('.close')
const select = document.querySelector('select')
const textArea = document.querySelector('textarea')

const humanExpressions = [
    {img: './img/drink.jpg', text: 'Estou com sede'},
    {img: './img/food.jpg', text: 'Estou com fome'},
    {img: './img/angry.jpg', text: 'Estou com raiva'},
    {img: './img/grandma.jpg', text: 'Quero ver a vovó'},
    {img: './img/happy.jpg', text: 'Estou feliz'},
    {img: './img/home.jpg', text: 'Quero ir para casa'},
    {img: './img/hurt.jpg', text: 'Estou machucado'},
    {img: './img/outside.jpg', text: 'Quero ir lá fora'},
    {img: './img/sad.jpg', text: 'Estou triste'},
    {img: './img/scared.jpg', text: 'Estou assustado'},
    {img: './img/school.jpg', text: 'Quero ir para a escola'},
    {img: './img/tired.jpg', text: 'Estou cansado'}
]

const utterance = new SpeechSynthesisUtterance()

const setTextMessage = text =>{
    utterance.text = text
}

const speakText = () => {
    speechSynthesis.speak(utterance)
}

//Seleciona tipo de vozes
const setVoice = event =>{
    const selectedVoice = voices.find(voice => voice.name === event.target.value)
    utterance.voice = selectedVoice
}

// interar por esse array e indserir div no DOW com os parametro img e text
const createExpressionBox = ({ img, text }) => {
    const div = document.createElement('div')

    div.classList.add('expression-box')
    div.innerHTML = `
        <img src="${img}" alt="${text}">
        <P class="info">${text}</p>
    `

    div.addEventListener('click', ()=>{

        setTextMessage(text)
        speakText()

        div.classList.add('active')

        setTimeout(()=>{
            div.classList.remove('active')
        }, 1000)
    })

    // adicionar elemento como ultimo filho
    main.appendChild(div);

}

humanExpressions.forEach(createExpressionBox)

let voices = []

speechSynthesis.addEventListener('voiceschanged', ()=>{
    voices = speechSynthesis.getVoices() 

    voices.forEach(({ name, lang}) => {
        const option = document.createElement('option')

        option.value = name

        // define a voz do google como padrão
        const googleVoice = voices.find(voice =>
        voice.name === 'Google português do Brasil'
        )

        if(googleVoice && option.value === googleVoice.name){
            utterance.voice = googleVoice
            option.selected = true
        }  

        option.textContent = `${lang} | ${name}`
        select.appendChild(option)
    })
})


// Le os botões
btnInsertText.addEventListener('click', ()=>{
    divTextBox.classList.add('show')
})

closeTextBox.addEventListener('click', ()=> {
    divTextBox.classList.remove('show')
})

select.addEventListener('change', setVoice)

btnReadText.addEventListener('click', ()=> {
    setTextMessage(textArea.value)
    speakText()
})