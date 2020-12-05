const fs = require('fs');

let validPasswords = 0
fs.readFile('./info.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  const info = data.split('\n\n')
  let value = 0
  info.forEach(pass => {
      if(validatePassport(pass)) value++
  })
  console.log("VAL", value)
});

function validatePassport(info){
    const obj = {}
    let fields = ["byr", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"]
    let nextWord = 0
    for(let k = 0; k < info.length; k++){
        if(info[k] === " " || info[k] === "\n" || k === info.length - 1){
            let key = `${info[nextWord]}${info[nextWord + 1]}${info[nextWord + 2]}`
            let end = (k === info.length - 1) ? k + 1 : k
            obj[key] = info.slice(nextWord + 4, end)
            nextWord = k + 1
        }
    }
    for(let i = 0; i < fields.length; i++){
        if(!obj[fields[i]]) return false
        else if(!validateField(fields[i], obj[fields[i]])) {
            console.log("ISNIDE", fields[i], obj[fields[i]])
            return false
        }
    }
    return true
    
}


const validateField = (field, input) => {
    console.log(field)
    if(field === "hgt"){
        let size = input[input.length - 2] + input[input.length - 1]
        if(size === "cm") {
            let number = input[0] + input[1] + input[2]
            return (input.length === 5 && (number >= 150 && number <=193))
        }
        else if(size ==="in"){
            let number = input[0] + input[1]
            console.log(number)
            return (input.length === 4 && (number >= 59 && number <=76))
        }
    }
    if(field === "byr"){
        return (input.length === 4 && (input >= 1920 && input <=2002))
    }
    if(field === "iyr"){
        return (input.length === 4 && (input >= 2010 && input <=2020))
    }
    if(field === "eyr"){
        return (input.length === 4 && (input >= 2020 && input <=2030))
    }
    if(field === "hcl"){
        if(input[0] !== "#" || input.length !== 7) return false
        for(let k = 1; k < input.length; k++){
            if(input[k].search(/[a-f]/) === -1 && input[k].search(/[0-9]/) === -1) return false
        }
    }
    if(field === "ecl"){
        let validInputs = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
        return validInputs.includes(input)
    }
    if(field === "pid"){
        if(input.length !== 9) return false
        for(let k = 0; k < input.length; k++){
            if(input[k].search(/[0-9]/) === -1) return false
        }
    }
    return true
}
// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID)