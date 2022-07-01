const containers = document.querySelectorAll('.input-container');
const form = document.querySelector('form');
const tl = gsap.timeline({ defaults: { duration: 1 } });

//Line
const start = "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end = "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

//Elastic Effect
//Loop over each 3 containers and check if the input is focused
//if it's focused to the effect
containers.forEach(container => {
    const input = container.querySelector('.input');
    const line = container.querySelector('.elastic-line');
    const placeholder = container.querySelector(".placeholder");

    input.addEventListener('focus', () => {
        //check if there is any text in the input
        //tl attr start in order to bounce back from end to start

        if (!input.value) {
            tl.fromTo(line, { attr: { d: start } }, { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 });
            tl.to(line, { attr: { d: start }, ease: 'elastic.out(3,0.5)' }, '<50%');

            //Placeholder shift
            tl.to(placeholder, { top: -15, left: 0, scale: 0.7, duration: 0.5, ease: 'Power2.easeOut' }, "<15%");
        }
    })
});

//Revert back if it is not focused

form.addEventListener('click', () => {
    containers.forEach(container => {
        const input = container.querySelector('.input');
        const line = container.querySelector('.elastic-line');
        const placeholder = container.querySelector(".placeholder");

        if (document.activeElement !== input) {
            if (!input.value) {
                gsap.to(placeholder, {
                    top: 0,
                    left: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "Power2.easeOut"
                });
            }
        }
        // Name Validation

        input.addEventListener('input', (e) => {
            if (e.target.type === 'text') {
                //extract value that the user types in
                let inputText = e.target.value;
                if (inputText.length > 2) {
                    //Colorize
                    colorize('#6391E8', line, placeholder);
                } else {
                    colorize('#FE8C99', line, placeholder);
                }
            }
            //Email validation
            if (e.target.type === 'email') {
                //extract value that the user types in
                let valid = validateEmail(e.target.value);
                if (valid) {
                    //Colorize
                    colorize('#6391E8', line, placeholder);
                } else {
                    colorize('#FE8C99', line, placeholder);
                }
            }
            //Phone validation
            if (e.target.type === 'tel') {
                //extract value that the user types in
                let valid = validatePhone(e.target.value);
                if (valid) {
                    //Colorize
                    colorize('#6391E8', line, placeholder);
                } else {
                    colorize('#FE8C99', line, placeholder);
                }
            }
        });

    });
});

//Checking Email validation

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
}

//Colorize Function

function colorize(color, line, placeholder) {
    gsap.to(line, { stroke: color, duration: 0.75 });
    gsap.to(placeholder, { color: color, duration: 0.75 });
}

//Checkbox Animation Fill
const checkbox = document.querySelector('.checkbox');
const tl2 = gsap.timeline({ defaults: { duration: 0.5, ease: "Power2.easeOut" } });

const tickMarkPath = document.querySelector('.tick-mark path');
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath, { strokeDashoffset: pathLength, strokeDasharray: pathLength });

checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
        tl2.to('.checkbox-fill', { top: '0%' });
        //strokedashoffset pathlength is hidden
        tl2.fromTo(tickMarkPath, { strokeDashoffset: pathLength }, { strokeDashoffset: 0 }, "<50%");
        tl2.to('.checkbox-label', { color: '#6391e8' }, "<");
    } else {
        tl2.to('.checkbox-fill', { top: '100%' });
        tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength }, "<50%");
        tl2.to('.checkbox-label', { color: '#c5c5c5' }, "<");
    }
});

//Character Animation
gsap.set('#eye', { transformOrigin: 'center' });

gsap.fromTo('#eye', { scaleY: 1 }, { scaleY: 0.3, repeat: -1, yoyo: true, repeatDelay: 0.7, ease: "Power2.easeOut" });
gsap.fromTo('#eyebrow', { y: 0 }, { y: -1, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: "Power2.easeOut" });

//Submit button

const button = document.querySelector('button');
const tl3 = gsap.timeline({ defaults: { duration: 0.75, ease: "Power2.easeOut" } });

button.addEventListener('click', (e) => {
    e.preventDefault();
    tl3.to('.contact-right,.contact-left', { y: 30, opacity: 0, pointerEvents: 'none' });
    tl3.to('form', { scale: 0.8 }, "<");

    tl3.fromTo('.submitted', { opacity: 0, y: 30 }, { opacity: 1, y: 0 });

    //Hand wave
    gsap.set('#hand', { transformOrigin: 'left' });
    gsap.fromTo('#hand', { rotation: 0, y: 0 }, { rotation: -10, y: 2, ease: 'elastic(3,0.3)', duration: 2, delay: 1 });
});