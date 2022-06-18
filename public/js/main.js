document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const philoName = document.querySelector('input').value
    try{
        const response = await fetch(`https://philosophers-fullstack-api.herokuapp.com/api/${philoName}`)
        const data = await response.json()

        console.log(philoName)
        document.querySelector('h2').innerText = data['Full Name']
    }catch(error){
        console.log(error)
    }
}
