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
  let counter = 0
  let minMax = data[0].split("-")
  for(let i = 0; i < data[2].length; i++){
    if(data[2][i] === data[1][0])counter++
  }
  return (counter >= minMax[0] && counter <= minMax[1])
}