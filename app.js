import express from 'express'
const app = express()

import {getAllBooksDetails} from './dbQuery.js'
import {getBookByBookName} from './dbQuery.js'
import {addReviewForBook} from './dbQuery.js'

app.get('/allBooks', async function (req, res) {

    let result = await getAllBooksDetails()
    console.log("res is " + result);
    res.send(result)
})
 
app.get('/bookByName', async function (req, res) {

    let bookName = req.query["bookName"]

    if(bookName == null || bookName == ""){
        res.send("BookName can't be null or empty")
        return
    }
    
    let result = await getBookByBookName(bookName)
    console.log("res is " + result);
    res.send(result)
})

app.post('/addReviewForBook', async function (req, res) {

    let bookName = req["bookName"]
    let reviewObject = req["reviewObject"]

    if(bookName == null || bookName == "" || reviewObject == null || reviewObject == ""){
        res.send("BookName or review object can't be null or empty")
        return
    }

    let result = await addReviewForBook(bookName, reviewObject)
    console.log(result);
    res.send(result)
})

app.listen(3001 , () => {
    console.log("Express app running at 3001");
})