// index.js

const container = document.querySelector(".data-container");

// Define image source
const imgSource = '/sundalang.jpg';

// Function untuk shuffle array
function shuffleArray(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// function to generate bars
function generatebars(num = 20) {
    const img = new Image();
    img.src = imgSource;

    img.onload = () => {
        // Hitung aspect ratio gambar asli
        const aspectRatio = img.naturalWidth / img.naturalHeight;

        // Hitung lebar container (responsive: 90vw, max 1000px)
        let containerWidth = Math.min(window.innerWidth * 0.9, 1000);
        
        // Hitung tinggi container berdasarkan aspect ratio gambar asli
        const containerHeight = containerWidth / aspectRatio;

        // Terapkan dimensi ke container
        container.style.width = `${containerWidth}px`;
        container.style.height = `${containerHeight}px`;
        container.innerHTML = ""; // Clear existing

        // Buat array index yang di-shuffle untuk randomize gambar
        const shuffledIndices = shuffleArray(Array.from({length: num}, (_, i) => i));
        const barWidth = containerWidth / num;

        //for loop to generate bars
        for (let i = 0; i < num; i += 1) {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            
            // Set dimensi dan background agar gambar rapi sesuai ukuran asli
            bar.style.height = `${containerHeight}px`;
            bar.style.width = `${barWidth}px`;
            bar.style.backgroundImage = `url(${imgSource})`;
            bar.style.backgroundSize = `${containerWidth}px ${containerHeight}px`;
            bar.style.backgroundPosition = `${-shuffledIndices[i] * barWidth}px 0`;
            
            // Store shuffled index untuk swap nanti
            bar.dataset.imgIndex = shuffledIndices[i];
            bar.style.transform = `translateX(${i * barWidth}px)`;

            // Tambahkan label angka di atas bar
            const barLabel = document.createElement("label");
            barLabel.classList.add("bar_id");
            barLabel.innerHTML = shuffledIndices[i] + 1;
            bar.appendChild(barLabel);

            container.appendChild(bar);
        }
    };
}

// asynchronous function to perform "Selection Sort"
async function SelectionSort(delay = 300) {
    let bars = document.querySelectorAll(".bar");
    // Assign 0 to min_idx
    let min_idx = 0;
    for (let i = 0; i < bars.length; i += 1) {

        // Assign i to min_idx
        min_idx = i;

        for (let j = i + 1; j < bars.length; j += 1) {

            // To store the integer value of jth bar to var1
            let val1 = parseInt(bars[j].dataset.imgIndex);

            // To store the integer value of (min_idx)th bar to var2
            let val2 = parseInt(bars[min_idx].dataset.imgIndex);

            // Compare val1 & val2
            if (val1 < val2) {
                min_idx = j;
            }
        }

        // To swap ith and (min_idx)th bar
        let tempBgPos = bars[min_idx].style.backgroundPosition;
        let tempImgIndex = bars[min_idx].dataset.imgIndex;
        
        // Swap background-position untuk puzzle effect
        bars[min_idx].style.backgroundPosition = bars[i].style.backgroundPosition;
        bars[i].style.backgroundPosition = tempBgPos;
        
        // Swap image index
        bars[min_idx].dataset.imgIndex = bars[i].dataset.imgIndex;
        bars[i].dataset.imgIndex = tempImgIndex;

        // Swap label text (angka)
        let tempLabel = bars[min_idx].querySelector(".bar_id").innerHTML;
        bars[min_idx].querySelector(".bar_id").innerHTML = bars[i].querySelector(".bar_id").innerHTML;
        bars[i].querySelector(".bar_id").innerHTML = tempLabel;

        // To pause the execution of code for 300 milliseconds
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 300)
        );
    }

    // To enable the button "Generate New Array" after final(sorted)
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button1").style.backgroundColor = "#89b4fa";

    // To enable the button "Selection Sort" after final(sorted)
    document.getElementById("Button2").disabled = false;
    document.getElementById("Button2").style.backgroundColor = "#89b4fa";
}

// Call "generatebars" function
generatebars();

// function to generate new random array 
function generate() {
    window.location.reload();
}

//  function to disable the button
function disable() {
    // To disable the button "Generate New Array"
    document.getElementById("Button1").disabled = true;
    document.getElementById("Button1").style.backgroundColor = "#585b70";

    // To disable the button "Selection Sort"
    document.getElementById("Button2").disabled = true;
    document.getElementById("Button2").style.backgroundColor = "#585b70";
}