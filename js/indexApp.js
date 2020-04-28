//clock app
window.onload = function() {
    gmt_clock()
};

function gmt_clock() {
    let time = new Date();
    let hours = time.getUTCHours();
    let min = time.getUTCMinutes();
    let sec = time.getUTCSeconds();
    let date = time.getUTCDay();
    
    let day = new Array();
    day[0] = "Sun";
    day[1] = "Mon";
    day[2] = "Tue";
    day[3] = "Wed";
    day[4] = "Thu";
    day[5] = "Fri";
    day[6] = "Sat";

    let today = day[date];
    //add a 0 in front of number if its less than 2 digits
    hours = ('0' + hours).slice(-2);
    min = ('0' + min).slice(-2);
    sec = ('0' + sec).slice(-2);

    //output to document
    document.getElementById('gmt').innerHTML = 
        'GMT: ' + hours + ':' + min + ':' + sec + ' ' + today;
    //tick 2 times every second for accurate timer
    setTimeout(gmt_clock, 500);
}

//people in space API request
