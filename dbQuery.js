import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

const db = await open({
    filename: 'database.sqlite',
    driver: sqlite3.Database
  })

async function getAllBooksDetails(){
    var result = await db.all('SELECT * FROM BookDB')
    return result
}

async function getBookByBookName(bookName){

    let bookReviewList = await getBooksReviews(bookName)
    //console.log(bookReviewList);
    let averageStar = await returnAverageReview(bookReviewList)
    let allReviews = await getBooksReviews(bookName)

    let result = await db.get('SELECT * FROM BookDB WHERE BookName = ?', [bookName])
    result["averageStar"] = averageStar
    result["allReviews"] = allReviews
       
    return result
}

async function returnAverageReview(reviewList){
    
    let result = 0
    
    for(let i = 0 ; i < reviewList.length; i++){
        let number = reviewList[i]["ReviewStar"]
        result += number
    }

    result = result / reviewList.length

    return result + ""
}

async function getBooksReviews(bookName){
    let res = await db.all('SELECT * FROM BookReviews WHERE BookName = ?', [bookName])
    return res
}

async function addReviewForBook(bookName, reviewObject){
    
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