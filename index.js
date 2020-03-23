const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();// create server

const url = "mongodb+srv://Vlad:qmQV2beZZdQthAvy@cluster0-i2gpt.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function(err) {
    if (err) throw err;
    console.log('Successfully connected');
    app.listen(3000, () => {
        console.log('Server is runing on port 3000')
    });
    
})

// password ="qmQV2beZZdQthAvy"
// "mongodb+srv://Vlad:<password>@cluster0-i2gpt.mongodb.net/test?retryWrites=true&w=majority"



var authorSchema = mongoose.Schema({
    name: {
            firstName: String,
            lastName: String
    },
});

var bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    summary: String,
    isbn: String,
    thumbnail: Buffer,
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Author'
    },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: { 
                type: Date,
                default: Date.now
            }
        }
    ],
    created: { 
        type: Date,
        default: Date.now
    }
});


var Author = mongoose.model('Author', authorSchema);
var Book = mongoose.model('Book', bookSchema);

var jamieAuthor = new Author ({
    _id: new mongoose.Types.ObjectId(),
    name: {
        firstName: 'Jamie',
        lastName: 'Munro'
    },
    biography: 'Jamie is the author of ASP.NET MVC 5 with Bootstrap and Knockout.js.',
    twitter: 'https://twitter.com/endyourif',
    facebook: 'https://www.facebook.com/End-Your-If-194251957252562/'
});
 
jamieAuthor.save(function(err) {
    if (err) throw err;
     
    console.log('Author successfully saved.');
     
    var mvcBook = new Book ({
            _id: new mongoose.Types.ObjectId(),
            title: 'ASP.NET MVC 5 with Bootstrap and Knockout.js',
            author: jamieAuthor._id,
            ratings:[{
                summary: 'Great read'
            }]
    });
     
    mvcBook.save(function(err) {
        if (err) throw err;
     
        console.log('Book successfully saved.');
    });
     
    var knockoutBook = new Book( {
            _id: new mongoose.Types.ObjectId(),
            title: 'Knockout.js: Building Dynamic Client-Side Web Applications',
            author: jamieAuthor._id
    });
     
    knockoutBook.save(function(err) {
        if (err) throw err;
     
        console.log('Book successfully saved.');
    });
});