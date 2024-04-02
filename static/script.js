// Array to store book data
const books = [];

// Function to add a book to the list and send it to the server
function addBook() {
    const bookTitle = document.getElementById('bookTitle').value;
    const publicationYear = document.getElementById('publicationYear').value;
    const authorName = document.getElementById('authorName').value; //Author name is set

    // Create a JSON object with book data
    const bookData = {
        title: bookTitle,
        publication_year: publicationYear,
        author: authorName // added author variable
    };

    // Send the book data to the server via POST request
    fetch('/api/add_book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
        .then(response => response.json())
        .then(data => {
            // Display a success message or handle errors if needed
            console.log(data.message);

            // Add the new book data to the books array
            books.push(bookData);
            console.log(books)

            // Refresh the book list
            displayBooks();
        })
        .catch(error => {
            console.error('Error adding book:', error);
        });
}
function addField()
{
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	document.ready(function() {
				let fieldCount = 1;

				// Add input field on button click
				('addField').click(function() {
					fieldCount++;
					const newInputField = `<input type="text" id="authorName ${fieldCount}" placeholder="Author Name ${fieldCount}">`;
					('addBook').append(newInputField);
				});
			});
}

// Function to display books in the list
function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Clear book list

    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
            <h2>Added Successfully: ${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Publication Year: ${book.publication_year}</p>
        `;//Added the Author field.
        bookList.appendChild(bookElement);
    });
}

// Function to fetch and display all books from the server
function showAllBooks() {
    fetch('/api/books')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('allbooks');
            bookList.innerHTML = ''; // Clear existing book list
            console.log(data)
            data.books.forEach(book => { // Access the 'books' key in the JSON response
                const bookElement = document.createElement('div');
                bookElement.innerHTML = `
                    <h2>${book.title}</h2>
                    <p>Author: ${book.author}</p> 
                    <p>Publication Year: ${book.publication_year}</p>
                `;//Added the 'Author' value
                bookList.appendChild(bookElement);
            });
        })
        .catch(error => {
            console.error('Error fetching all books:', error);
        });
}

function searchBook() {
    const searchYear = document.getElementById('searchYear').value; //Set value to search for
    fetch(`/api/books?year=${searchYear}`) //search in the api
        .then(response => response.json()) //json response
        .then(data => {
            const bookList = document.getElementById('bookList');
            bookList.innerHTML = ''; // Clear existing book list
            console.log(searchYear); //display the year in console

            data.books.forEach(book => {
                // Check if the publication year matches the search year
                if (book.publication_year == searchYear) {
                    const bookElement = document.createElement('div');//create the element
                    bookElement.innerHTML = `
                        <h2>${book.title}</h2>
                        <p>Author: ${book.author}</p>
                        <p>Publication Year: ${book.publication_year}</p>
                    `;//Add book data, including Author value 
                    bookList.appendChild(bookElement);//add book
                }
            });
        })
        .catch(error => { //Error message
            console.error('Error fetching books by year:', error);
        });
    }