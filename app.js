var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

//connect to mongoose
//mongoose.connect('mongodb://localhost/bookstore');
mongoose.connect('mongodb://sk_farhad:skfarhadmay12@ds061076.mlab.com:61076/bookstore');

var db = mongoose.connection;

app.use(express.static(__dirname + '/client')); // put double underscore before dirname
//otherwise won't work!!!!!

//routes
app.get('/', function(req, res){
	res.send("hello world!")

});

// just test

app.get('/api/genres', function(req, res){
	console.log("from app.js")
	Genre.getGenres(function(blah, genres){
		if(blah){
			throw blah;
		}
		console.log("executing callback!!")
		res.json(genres);
		
	});

});


app.post('/api/genres', function(req, res){

	var genre = req.body;
	console.log("trying here from app.js!");
	Genre.addGenre(genre);
	res.send("updated!");

});

app.put('/api/genres/:_id', function(req, res){

	var id = req.params._id;

	var genre = req.body;
	//console.log("trying here from app.js!");
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
		
	});

});

app.get('/api/books', function(req, res){
	Book.getBooks(function(err, newBook){
		if(err){
			throw err;
		}
		res.json(newBook);
		
	});

});

app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
		
	});

});


app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
		
	});

});

app.put('/api/books/:_id', function(req, res){

	var id = req.params._id;

	var book = req.body;
	//console.log("trying here from app.js!");
	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
		
	});

});

app.delete('/api/books/:_id', function(req, res){

	var id = req.params._id;

	//console.log("trying here from app.js!");
	Book.deleteBook(id, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
		
	});

});



app.listen(3001);
console.log('Runing on port 3001');
