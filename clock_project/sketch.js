particles_sec = [];
particles_min = [];
// setup() is called once at page-load
function setup() {
    createCanvas(800, 660); // make an HTML canvas element width x height pixels

}

// draw() is called 60 times per second
function draw() {
    let hr = hour(); //gives in 24 hr
    let min = minute();
    let sec = second();
    let hr_12 = hr;

    //background color depends on am/pm
    if (hr > 12) { //ie, pm
        hr_12 = hr / 2; //12 and 24 are 0
        background(71, 16, 0);
    }
    else { //am, between midnight and noon
        background(255, 244, 230);
    }

    //rectangle sizes show sec/min/hour
    stroke(240, 162, 2);
    fill(240, 162, 2);
    line(0, 120, 800, 120); //seconds above this
    let sec_height = map(sec, 0, 60, 0, 120)
    rect(0, 120 - sec_height, 800, sec_height)

    stroke(241, 136, 5);
    fill(241, 136, 5);
    line(0, 360, 800, 360); //min above this
    let min_height = map(min, 0, 60, 0, 240)
    rect(0, 360 - min_height, 800, min_height)

    stroke(217, 93, 57); //for hours, 12 is considered 0
    fill(217, 93, 57);
    line(0, 659, 800, 659); //hours above this
    let hr_height = map(hr_12, 0, 12, 0, 300)
    rect(0, 660 - hr_height, 800, hr_height)


    //particles "spill" when the second or minute section gets filled up
    //adapted from particle system waterfall by zahrak
    //https://editor.p5js.org/zahrak/sketches/B1FV3hKDf
    if (sec == 59 | sec == 0) {
        for (let i = 0; i < 3; i++) {
            let p = new Particle_Sec();
            particles_sec.push(p);
        }
    }
    for (let i = particles_sec.length - 1; i >= 0; i--) {
        particles_sec[i].update();
        particles_sec[i].show();
        if (particles_sec[i].finished()) {
            // remove this particle
            particles_sec.splice(i, 1);
        }
    }

    if ((min == 0 & sec == 0) | (min == 59 & sec == 59)) {
        for (let i = 0; i < 3; i++) {
            let p = new Particle_Min();
            particles_min.push(p);
        }
    }

    for (let i = particles_min.length - 1; i >= 0; i--) {
        particles_min[i].update();
        particles_min[i].show();
        if (particles_min[i].finished()) {
            // remove this particle
            particles_min.splice(i, 1);
        }
    }

}

//adapted from particle system waterfall by zahrak
//https://editor.p5js.org/zahrak/sketches/B1FV3hKDf
class Particle_Sec {
    constructor() {
        this.x = random(0, 800);
        this.y = 127;
        this.vx = random(-1, 1);
        this.vy = random(5, 1);
        this.alpha = 255;
    }

    finished() {
        // return this.alpha < 0;
        return this.y > 352;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 4;
    }

    show() {
        noStroke();
        //stroke(255);
        fill(240, 162, 2, this.alpha);
        ellipse(this.x, this.y, 8);
    }
}
class Particle_Min {
    constructor() {
        this.x = random(0, 800);
        this.y = 369;
        this.vx = random(-1, 1);
        this.vy = random(5, 1);
        this.alpha = 255;
    }

    finished() {
        // return this.alpha < 0;
        return this.y > 650;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 5;
    }

    show() {
        noStroke();
        //stroke(255);
        fill(240, 162, 2, this.alpha);
        ellipse(this.x, this.y, 10);
    }

}

