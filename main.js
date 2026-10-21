
let arr = [
    {
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=90",
        title: "Beautiful Mountain",
        description: "Enjoy the beautiful view of the mountains."
    },
    {
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90",
        title: "Amazing Beach",
        description: "Relax and enjoy the peaceful beach."
    },
    {
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=90",
        title: "Green Forest",
        description: "Explore the beauty of nature and forests."
    },
    {
        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=90",
        title: "Beautiful City",
        description: "Experience the lights and beauty of the city."
    },
    {
        image: "https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=2400&q=90",
        title: "Wonderful Sunset",
        description: "Watch the beautiful sunset and enjoy the moment."
    }
];

let accordion = document.getElementById("accordion");
let dots = document.getElementById("dots");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let index = 0;
let autoplayTimer;

function createinsidelement() {
    accordion.innerHTML = "";

    arr.forEach((e, i) => {
        let div = document.createElement("div");
        div.className = "Eachdiv";
        div.style.backgroundImage = `url("${e.image}")`;
        div.setAttribute("role", "button");
        div.setAttribute("tabindex", "0");
        div.setAttribute("aria-label", e.title);

        let content = document.createElement("div");
        content.className = "content";

        content.innerHTML = `
            <h2>${e.title}</h2>
            <span>${e.description}</span>
        `;

        div.addEventListener("click", () => {
            index = i;
            showimageaccordion(index);
        });

        div.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                index = i;
                showimageaccordion(index);
            }
        });

        div.append(content);
        accordion.append(div);
    });
}

function showimageaccordion(i) {
    let takedivelement =
        document.querySelectorAll(".Eachdiv");

    takedivelement.forEach((r, n) => {
        r.classList.toggle("active", n === i);
        r.setAttribute(
            "aria-pressed",
            String(n === i)
        );
    });

    let dotbtn = document.querySelectorAll(".dotbtn");

    dotbtn.forEach((r, n) => {
        r.classList.toggle("activebtn", n === i);
        r.setAttribute(
            "aria-current",
            n === i ? "true" : "false"
        );
    });
}

function createdots() {
    dots.innerHTML = "";

    arr.forEach((d, i) => {
        let btn = document.createElement("button");
        btn.className = "dotbtn";
        btn.setAttribute(
            "aria-label",
            `Show image ${i + 1}: ${d.title}`
        );

        btn.addEventListener("click", () => {
            index = i;
            showimageaccordion(index);
        });

        dots.append(btn);
    });
}

function autoplay() {
    autopause();

    autoplayTimer = setInterval(() => {
        nextfunc();
    }, 3500);
}

function autopause() {
    clearInterval(autoplayTimer);
}

prev.addEventListener("click", () => {
    prevfunc();
});

next.addEventListener("click", () => {
    nextfunc();
});

function nextfunc() {
    index++;

    if (index >= arr.length) {
        index = 0;
    }

    showimageaccordion(index);
}

function prevfunc() {
    index--;

    if (index < 0) {
        index = arr.length - 1;
    }

    showimageaccordion(index);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextfunc();
    } else if (e.key === "ArrowLeft") {
        prevfunc();
    }
});

accordion.addEventListener("mouseenter", () => {
    autopause();
});

accordion.addEventListener("mouseleave", () => {
    autoplay();
});

accordion.addEventListener("focusin", () => {
    autopause();
});

accordion.addEventListener("focusout", (e) => {
    if (!accordion.contains(e.relatedTarget)) {
        autoplay();
    }
});

// Create elements before selecting active classes.
createinsidelement();
createdots();
showimageaccordion(index);
autoplay();
