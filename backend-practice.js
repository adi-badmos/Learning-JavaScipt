const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();

// 18 a
const greet = new XMLHttpRequest();

greet.addEventListener('load', () => {
    console.log('18 a');
    console.log(greet.response);
});

greet.open('GET', 'https://supersimplebackend.dev/greeting');
greet.send();

// 18 b
fetch(
    'https://supersimplebackend.dev/greeting'
).then((response) => {
    return response.text();
}).then((text) => {
    console.log('18 b');
    console.log(text);
});

// 18 c
async function fetchAsyncAwait() {
    const response = await fetch('https://supersimplebackend.dev/greeting');
    const text = await response.text();

    console.log('18 c');
    console.log(text);
}

fetchAsyncAwait();

// 18 d
async function post() {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'adi-badmos'
        })
    });

    const text = await response.text();
    console.log('18 d');
    console.log(text);
}

post();

// 18 e
async function amazon() {
    try {
        const response = await fetch('https://amazon.com');

        const text = await response.text();
        console.log('18 e');
        console.log(text);
    } catch(error) {
        console.log('18 f');
        console.log('CORS error. Your request was blocked by the backend');
    }
}

amazon();

// 18 g
async function errors() {
    try {
        const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'POST',
        });

        if(response.status >= 400) {
            throw response;
        }
    } catch(error) {
        if(error.status === 400) {
            const result = await error.json();
            console.log('18 g');
            console.log(result);
        } else {
            console.log('18 g');
            console.log('Network error. Please try again later');
        }
    }
}

errors();