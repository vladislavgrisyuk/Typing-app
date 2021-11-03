let a = document.querySelectorAll('.card-body')[0]
console.log(a.innerText)
let text = a.innerText.trim().replace(/ /g, '␣').replace(/\?/g, '').replace(/\./g, '').split('')
a.innerHTML = ''
text.forEach((el) => {
  a.innerHTML += '<span>' + el + '</span>'
  if (el == '␣') {
    a.innerHTML += '<wbr>'
  }
})
let spans = a.querySelectorAll('span')
spans[0].classList.toggle('main')
console.log(spans)
let counter = 0
let errors = 0
let errorHeader = document.querySelectorAll('.card-header')[0]
let errorAvailability = true
errorHeader.innerText = 0

var myTimer = window.setInterval(func, 400)
let shouldError = false

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 32 && e.target === document.body) {
    e.preventDefault()
  }
})

document.addEventListener('keydown', (e, o) => {
  if (e.key == spans[counter].innerText.toLowerCase() || (e.key == ' ' && spans[counter].innerText.toLowerCase() == '␣')) {
    {
      spans[counter].classList.remove('main')
      if (shouldError) {
        spans[counter].classList.add('error')
      } else {
        spans[counter].classList.add('gray')
      }
      shouldError = false
      spans[++counter].classList.toggle('main')
      window.clearInterval(myTimer)
      myTimer = window.setInterval(func, 400)
    }
  } else {
    // spans[counter].classList.add('error')
    shouldError = true
    spans[counter].classList.remove('main')
    if (shouldError) {
      spans[counter].classList.add('error')
    } else {
      spans[counter].classList.add('gray')
    }
    shouldError = false
    spans[++counter].classList.toggle('main')
    window.clearInterval(myTimer)
    myTimer = window.setInterval(func, 400)
    addError()
  }
})

function addError() {
  errors++
  errorHeader.innerText = errors
}

function func() {
  spans[counter].classList.toggle('main')
  console.log(spans[counter].innerText.charCodeAt(0))
}

console.log(a)
