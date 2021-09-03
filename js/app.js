const mainSection = document.getElementById('main-section')

// search button onclick function 
// clicking search button 
const searchBook = () => {
    // getting value from searchtext box 
    const searchText = document.getElementById('input-field');

    // make custom dynamic url for getting object of books 
    const url = `https://openlibrary.org/search.json?q=${searchText.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data.docs.slice(0, 20), data.numFound)) //call result funtion by giving parameter

    // make search box empty 
    searchText.value = '';
    // start toggle spining of loading circle
    toggleSpinner('yes');
    // make all result hide during spining loading circle
    toggleResult('no');

    
};

// declare funtion for stop and start toogle spining of loading circle 
const toggleSpinner = (spin) => {
    const spiner = document.getElementById('spinner');
    if (spin === 'yes') {
        spiner.style.display = 'block';
    }
    if (spin === 'no') {
        spiner.style.display = 'none';
    }
}

// declare funtion for hide and show results during loading and after loading 
const toggleResult = (result) => {
    const resultContainer = document.getElementById('results-section');
    if (result === 'yes') {
        resultContainer.style.display = 'block';
    }
    if (result === 'no') {
        resultContainer.style.display = 'none';
    }
}


// declare function for showing result according to search 
const displayResults = (books, totalResults) => {
    // get element of total result count of searching 
    const totalResultsDiv = document.getElementById('total-results');
    // get element of results of result
    const results = document.getElementById('results');
    // make all conent of total result count element clear 
    totalResultsDiv.textContent = '';
    // make all content of results clear 
    results.textContent = '';

    // condition for invalid input in search box 
    if (totalResults === 0) {
        totalResultsDiv.innerHTML = `<p class="fs-1 fw-bolder text-danger mb-5 pt-4 pb-5">No result found...</p>`
    }
    // get result for valid input 
    else {
        // total result counts 
        if (totalResults !== books.length) {
            totalResultsDiv.innerHTML = `<p class="fs-4 fw-bold">Total <span class="text-danger">${totalResults}</span> results found...</p>
            <hr>
        <p class="fs-4 fw-bold">But showing you <span class="text-danger">${books.length}
        </span></p>
        <hr>
        <p class="books-title">books...</p>
        `;
        }
        else {
            totalResultsDiv.innerHTML = `<p class="fs-4 fw-bold">Total <span class="text-danger">${totalResults}</span> results found...</p>`;
        }
        // get all element of array of books object 
        books.forEach(book => {
            // get result of author,publiser and publishing year value by using optional caining 
            let author = book?.author_name?.[0];
            let publisher = book?.publisher?.[0];
            let publishingYear = book?.publish_date?.[0];

            // condition for not getting author,publiser and publishing year value 
            if (!author) {
                author = 'Author name is not declared';
            }
            if (!publisher) {
                publisher = 'Publisher name is not declared';
            }
            if (!publishingYear) {
                publishingYear = 'Publishing year is not declared';
            }

            // show the output result after all validation 


            // create new element for each result 
            const result = document.createElement('div');
            // create div for result 
            result.classList.add = 'col';
            // set dynnamic html codes using string templete for result 
            result.innerHTML = `
                    <div class="card">
                        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top book-img" alt="images/book.jpg">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Author of this book:<br><strong>${author}</strong></p>
                            <p class="card-text">Publisher of this book:<br><strong>${publisher}</strong></p>
                            <p class="card-text">Publishing date of this book:<br><strong>${publishingYear}</strong></p>
                        </div>
                    </div>
        `
            // append all element to parent element for final result 
            results.appendChild(result);
        });

    }

    // atlast stop toggle spining of loading circle 
    toggleSpinner('no');
    // make all result visible after loading 
    toggleResult('yes');

    mainSection.style.backgroundColor = '#fff'
}