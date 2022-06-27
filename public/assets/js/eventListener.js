const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deletePhilo)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deletePhilo(){
  const objectId= this.parentNode.parentNode.childNodes[7].innerText
  try{
        const response = await fetch('deletePhilo', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'objectIdReq': objectId,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const tLikes = Number(this.parentNode.childNodes[1].innerText) //grabs likes from ejs <span>
    const objectId= this.parentNode.parentNode.childNodes[7].innerText
    try{
        const res = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'objectIdReq': objectId,
              'likesReq': tLikes
            })
          })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}