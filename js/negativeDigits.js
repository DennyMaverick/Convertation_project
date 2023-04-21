const inputForm = document.getElementById("input")

inputForm.addEventListener("blur", function () {
  if (+inputForm.value < 1) {
    inputForm.value = ""
    inputForm.style.backgroundColor = "white"
  }
})

inputForm.addEventListener("wheel", inputWheel)

function inputWheel(event) {
  event.preventDefault()

  if (event.deltaY > 0) {
    this.value = +this.value - 1
  } else {
    this.value = +this.value + 1
    inputForm.style.backgroundColor = "white"
  }
  if (this.value < 0) {
    this.value = 0
  }
}

inputForm.addEventListener("change", function () {
  if (this.value < 0) {
    inputForm.style.backgroundColor = "red"
  } else {
    inputForm.style.backgroundColor = "white"
  }
})
