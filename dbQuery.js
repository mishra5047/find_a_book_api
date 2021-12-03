import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

const db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database
  })

function getAllBooksDetails(){
    var result = db.all('SELECT * FROM BookDB')
    result.then( (data) => {
        return data
    })
}

function getBookByBookName(bookName){
    db.get('SELECT * FROM BookDB WHERE BookName = ?', [bookName]).then((res) => {
       
       res["averageStar"] = returnAverageReview(getBooksReviews(bookName))
       res["allReviews"] = getBooksReviews(bookName)
        return res
    })
}

function returnAverageReview(reviewList){

    let result = 0

    for(item in reviewList){
        result += reviewList["ReviewStar"]
    }

    result = result / reviewList.length()
}

function getBooksReviews(bookName){
    db.get('SELECT * FROM BookReviews WHERE BookName = ?', [bookName]).then((data) => {
        return data
    })
}

function addReviewForBook(bookName, reviewObject){
    
    db.run('INSERT INTO BookReviews (BookName) VALUES (?)',bookName)
    db.run('UPDATE BookReviews SET ReviewAddedBy = ? WHERE BookName = ?',reviewObject["ReviewAddedBy"],bookName)
    db.run('UPDATE BookReviews SET ReviewText = ? WHERE BookName = ?',reviewObject["ReviewText"],bookName)
    db.run('UPDATE BookReviews SET ReviewStar = ? WHERE BookName = ?',reviewObject["ReviewStar"],bookName).then((res) => {
        return "Review added sucessfully"
    }).catch( (err) => {
        return err + ""
    })
}

export {getAllBooksDetails, getBookByBookName, addReviewForBook};