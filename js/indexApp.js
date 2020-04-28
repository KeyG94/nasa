//clock app
window.onload = function() {
    gmt_clock()
};

function gmt_clock() {
    let time = new Date();
    let hours = time.getUTCHours();
    let min = time.getUTCMinutes();
    let sec = time.getUTCSeconds();
    //add a 0 in front of number if its less than 2 digits
    hours = ('0' + hours).slice(-2);
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);
    //output to document
    document.getElementById('gmt').innerHTML = 
        'GMT: ' + hours + ':' + min + ':' + sec;
    //tick 2 times every second for accurate timer
    setTimeout(gmt_clock, 500);
}

//people in space API request
