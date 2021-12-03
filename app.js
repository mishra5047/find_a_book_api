import express from 'express'
const app = express()

import {getAllBooksDetails} from './dbQuery.js'
import {getBookByBookName} from './dbQuery.js'
import {addReviewForBook} from './dbQuery.js'

app.get('/allBooks', function (req, res) {

    let result = getAllBooksDetails()
    res.send(result)
})
 
app.get('/bookByName', function (req, res) {

    let bookName = req["bookName"]

    if(bookName == null || bookName == ""){
        res.send("BookName can't be null or empty")
        return
    }
    
    let result = getBookByBookName(bookName)
    res.send(result)
})

app.post('/addReviewForBook', function (req, res) {

    let bookName = req["bookName"]
    let reviewObject = req["reviewObject"]

    if(bookName == null || bookName == "" || reviewObject == null || reviewObject == ""){
        res.send("BookName or review object can't be null or empty")
        return
    }

    let result = getAllBooksDetails()
    res.send(result)
})

app.listen(3000 , () => {
    console.log("Express app running at 3000");
})