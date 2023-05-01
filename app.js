
window.addEventListener("load", displayActors())

document.getElementById('input-form').addEventListener('submit', addActor)

document.getElementById('clear-entries').addEventListener('click', clearActors)

function addActor(e) {
  e.preventDefault()
  let nameInput = document.getElementById('input-text').value.toLowerCase()
  let numberInput = document.getElementById('input-number').value

  if (!nameInput || !numberInput) {
    alert('Please fill in both name and number!')
    return false
  }

  const actor = {
    name: nameInput,
    value: numberInput,
    currentTurn: false
  }

  if (localStorage.getItem('actors') === null) {
    let actors = []
    actors.push(actor)
    localStorage.setItem('actors', JSON.stringify(actors))
  } else {
    let actors = JSON.parse(localStorage.getItem('actors'))
    actors.push(actor)
    actors.sort(function(a, b){return b.value-a.value})
    localStorage.setItem('actors', JSON.stringify(actors))
  }

  document.getElementById('input-form').reset()
  document.getElementById('input-text').focus()
  displayActors()
}

function deleteActor(value) {
  let actors = JSON.parse(localStorage.getItem('actors'))
  for (let i = 0; i < actors.length; i++) {
    if (actors[i].value == value) {
      actors.splice(i, 1)
    }
  }
  localStorage.setItem('actors', JSON.stringify(actors))
  displayActors()
}

function displayActors() {
  let actors = JSON.parse(localStorage.getItem('actors'))
  const actorsList = document.getElementById('actors-list')

  if (localStorage.getItem('actors') !== null) {
    actorsList.innerHTML = ''
    for (let i=0; i < actors.length; i++) {
      let name = actors[i].name
      let value = actors[i].value
      // let currentActor = actors[i].currentTurn

      actorsList.innerHTML +=
      `<tr class="table-row">
        <td>${value}</td>
        <td>${name}</td>
        <td class="del-btn-cell"><button onclick="deleteActor(${value})" class="btn del-btn">X</button></td>
      </tr>`
    }
  }

  // HIGHLIGHT CURRENT ACTOR

  let activeActors = document.querySelectorAll('#actors-list tr'),
      nextBtn = document.getElementById('next-actor'),
      currentItem = -1

  function clearPrevious() {
    for (let i = 0; i < activeActors.length; i++) {
      activeActors[i].classList.remove('active')
    }
  }

  function nextItem() {
    clearPrevious();
    activeActors[currentItem + 1].classList.add('active')
    currentItem++
  }

  nextBtn.addEventListener("click", () => {
    if (currentItem === activeActors.length - 1) {
      currentItem = -1
    }
    nextItem()
  })

}

function clearActors() {
  localStorage.clear()
  location.reload()
}
