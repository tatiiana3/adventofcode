const fs = require('fs');

let validPasswords = 0
fs.readFile('./info.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  const splited = data.split('\n')
  splited.forEach((pass) =>{
    if(checkValidPass(pass)) {
      validPasswords++
    }
  })
  console.log("AFTER", validPasswords)
});

const checkValidPass = (password) => {
  const data = password.split(" ")
  let indexes = data[0].split("-")
  let letter = data[1][0]
  let word = data[2]
  if((word[indexes[0] - 1] === letter || word[indexes[1] - 1] === letter) && (word[indexes[0] - 1] !== word[indexes[1] - 1])) return true
  else return false
}