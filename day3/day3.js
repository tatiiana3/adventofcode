const fs = require("fs");

fs.readFile("./info.txt", "utf8", (err,data) => {
    if(err){
        console.log(err)
        return
    }
    const matrix = data.split('\n')
    console.log(checkTrees(matrix))
})

const checkTrees = (arr) => {
    let totalTrees = 1
    totalTrees *= checkTreesHelper(arr, 1, 1)
    totalTrees *= checkTreesHelper(arr, 3, 1)
    totalTrees *= checkTreesHelper(arr, 5, 1)
    totalTrees *= checkTreesHelper(arr, 7, 1)
    totalTrees *= checkTreesHelper(arr, 1, 2)

    return totalTrees
}

const checkTreesHelper = (arr, colChange, rowChange) => {
    let trees = 0
    let col = 0
    for(let row = 0; row < arr.length; row+=rowChange){
       if(arr[row][col] === "#") trees++
       col+= colChange 
       if(col >= arr[0].length){
           col = col % arr[0].length
       }
    }
    return trees
}