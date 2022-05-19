import { quotesBank } from './quotesBank.js';

const colors = [
    '#87A9FF',
    '#37B7B7',
    '#8EEAEA',
    '#775DBF',
    '#F3C66F',
    '#F39C12',
    '#DD7267',
    '#FB6964'
];

const quoteAuthor = (index) => {
    let quote = quotesBank[index].quote;
    let author = quotesBank[index].author;

    $('#text').html(quote);
    $('#author').html('&#8212 ' + author);
    $('#tweet-quote').attr('href', `https://twitter.com/intent/tweet?text=${quote}%20—${author}`);
}

const randomNum = (type) => {
    if (type === 'colors') {
        return Math.floor(Math.random() * colors.length);
    }
    return Math.floor(Math.random() * quotesBank.length);
}

const styleBg = () => {
    let color = randomNum('colors');

    $('.bg').css('background-color', colors[color]);
    $('#tweet-quote').hover(function () {
        $(this).css('background-color', 'rgba(230, 243, 255, 0.5)');
    }, function () {
        $(this).css('background-color', colors[color]);
    });
}

const newQuote = $('#new-quote');
let lastIndex;

const getQuote = () => {
    let quoteAt = randomNum();
    lastIndex = quoteAt;
    quoteAuthor(quoteAt);
}

// Get a quote as soon as the page loads.
$(() => getQuote());

newQuote.click(function getNewQuote() {
    let newQuoteAt = randomNum();

    if (newQuoteAt === lastIndex){
        getNewQuote();
    } else {
        quoteAuthor(newQuoteAt);
        lastIndex = newQuoteAt;
        styleBg();
    }
});

newQuote.on('mousedown', function() {
    let defaultShadow = '0 1px 3px rgba(0, 0, 0, 0.65)';

    $(this).css('box-shadow', 'inset 0 0 3px rgba(0, 0, 0, 0.65)');
    newQuote.on('mouseup', function() {
        $(this).css('box-shadow', defaultShadow);
    });
    newQuote.on('mouseleave', function() {
        $(this).css('box-shadow', defaultShadow);
    });
});

