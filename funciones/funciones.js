function saludo() {
  console.log('Hola Mundo 1')
}

saludo()

function saludo2() {
  return console.log('Hola Mundo 2 ')
}

saludo4()

function saludo3() {
  var frase = 'Hola mundo 3'
  return frase
}

saludo2()
console.log(saludo3())

function saludo4() {
  return 'Hola mundo 4'
}

function saludo5() {
  return 2 + 3
}

saludo5()

var string = prompt("Introduce un número") // 3 en string
console.log(typeof(string))  // cadena
console.log(typeof(parseInt(string)))  /numero