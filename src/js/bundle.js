import '../styles/style.scss';

const canvas = document.getElementById('canvas');
const clearBtn = document.getElementById('clear');
const undoBtn = document.getElementById('undo');
const colorPick = document.getElementById('color-pick');
const widthPick = document.getElementById('range');

canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.75;

let context = canvas.getContext('2d');
context.fillStyle = '#ffffff';
context.fillRect(0, 0, canvas.width, canvas.height);

let penColor = '#000000';
let penWidth = '3';
let isDrawing = false;
let drawStorage = [];
let i = -1;

canvas.addEventListener('mousedown', drawStart, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener('mouseup', drawStop, false);
canvas.addEventListener('mouseout', drawStop, false);

clearBtn.addEventListener('click', clear, false);
undoBtn.addEventListener('click', undo, false);

colorPick.addEventListener('input', changeColor, false);
widthPick.addEventListener('input', changeWidth, false);

function drawStart(e) {
    e.preventDefault();
    isDrawing = true;

    context.beginPath();
    context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function draw(e) {
    e.preventDefault();

    if(isDrawing) {
        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.strokeStyle = penColor;
        context.lineWidth = penWidth;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
}

function drawStop(e) {
    e.preventDefault()

    if(isDrawing) {
        context.stroke();
        context.closePath();
        isDrawing = false;
    }

    if(e.type !== 'mouseout') {
        drawStorage.push(context.getImageData(0, 0, canvas.width, canvas.height));
        i += 1;
    }
}

function clear() {
    context.fillStyle = '#ffffff';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawStorage = [];
    i = -1;
}

function undo() {
    if(i <= 0) {
        clear();
    } else {
        i -= 1;
        drawStorage.pop();
        context.putImageData(drawStorage[i], 0, 0);
    }
}

function changeColor(e) {
    penColor = e.target.value;
}

function changeWidth(e) {
    penWidth = e.target.value;
}