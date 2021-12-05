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

    let bookName = req.query["bookName"]
    let reviewAddedBy = req.query["addedBy"]
    let reviewText = req.query["reviewText"]
    let reviewStar = req.query["reviewStar"]

    if(bookName == null || bookName == "" || reviewAddedBy == null || reviewAddedBy == ""
    || reviewText == null || reviewText == undefined || reviewStar == null || reviewStar == undefined){
        res.send("BookName or review object can't be null or empty")
        return
    }
    let result = await addReviewForBook(bookName, reviewAddedBy, reviewText, reviewStar)
    res.send(result)
})

app.listen(3001 , () => {
    console.log("Express app running at 3001");
})