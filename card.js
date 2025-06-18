        let minute = document.querySelector(`.minute`);
        let second = document.querySelector(`.second`);
        let seconds = 0;
        let minutes = 0;
       let timer = setInterval(() => {
            if (seconds < 60) {
                minute.innerText = " " + minutes;
                second.innerText = " : " + seconds;
                seconds = seconds + 1;
            }
            if (seconds == 60) {
                seconds = seconds % 60;
                minutes = minutes + 1;
                minute.innerText = " " + minutes;
                second.innerText = " : " + seconds;
            }
        }, 1000);
        let reset = document.querySelector(`.reset`);
        reset.addEventListener(`click`, () => {
            window.location.reload();
        });
        let cards = document.querySelectorAll(`.card`);

        let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];

        const num_array = Array.from({ length: 16 }, (_, index) => index);
        function shuffle_array(arr) {
            for (i = num_array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * i + 1);
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        shuffle_array(num_array);
        const arr = num_array.slice(0, 16);
        for (let a = 0; a < 16; a++) {
            cards[a].innerText = letters[arr[a]];

        }

        let touched_cards = [];
        let submit_cards = [];
           let point = document.getElementById("point");
        let points = 0;
        let count_down = 0 ;
        let submit = document.querySelector(`.submit`);

        cards.forEach(element => {
            element.addEventListener(`click`, () => {
                if (!touched_cards.includes(element)) {
                    touched_cards.push(element);
                    element.style.color = "black";
                }

                if (touched_cards.length > 2) {
                    touched_cards[0].style.color = "transparent";
                    touched_cards.shift();
                }
            });
        });

        submit.addEventListener(`click`, () => {
            if (touched_cards.length === 2) {
                if (touched_cards[0].textContent === touched_cards[1].textContent) {
                    count_down= count_down + 1;
                    points++;
                   point.innerText = points;
                    touched_cards[0].style.backgroundColor = "lightgreen";
                    touched_cards[1].style.backgroundColor = "lightgreen";
                    if(count_down==8){
                        clearInterval(timer);
                    }
                    setTimeout(() => {
                        // You might want to disable further interaction with these cards
                        touched_cards[0].removeEventListener('click', /* your handler */);
                        touched_cards[1].removeEventListener('click', /* your handler */);
                        touched_cards = [];
                    }, 1000);
                } else {
                    setTimeout(() => {
                        touched_cards.forEach(card => card.style.color = "transparent");
                        touched_cards = [];
                    }, 1000);
                }
            }
        });
