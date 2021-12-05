import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import Database from 'better-sqlite3';

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
    if(reviewList == undefined || reviewList == null){
        return -1;
    }
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

async function addReviewForBook(bookName, addedBy, reviewText, reviewStar){
    if(bookName == null){
        console.log("null found");
        return;
    }
    const dbInsert = new Database('database.sqlite', { verbose: console.log });

    let insertQuery = await dbInsert.prepare("INSERT INTO BookReviews(BookName, ReviewAddedBy, ReviewText, ReviewStar) VALUES (?,?,?,?)")
    await insertQuery.run(bookName, addedBy, reviewText, reviewStar)
}

async function addReview(bookName, addedBy, reviewText, reviewStar){
    await addReviewForBook(bookName, addedBy, reviewText, reviewStar)
}
//await addReview("IT", "Hi", "test", 5)
export {getAllBooksDetails, getBookByBookName, addReviewForBook};