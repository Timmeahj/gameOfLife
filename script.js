let checkboxArray = [];

let tic = 50;

const width = 25;
const height = 25;

let pause = true;
let checkArray = [];

const horizontalAmount = Math.floor(document.body.clientWidth / width)+1;
const verticalAmount = Math.floor(document.body.clientHeight / height)+1;

for(let i = 0; i < horizontalAmount; i++){
    for(let j = 0; j < verticalAmount; j++){
        let checkbox = document.createElement('input');
        checkbox.classList.add("check");
        checkbox.setAttribute("type", "checkbox");
        checkbox.style.width = width+"px";
        checkbox.style.height = height+"px";
        checkbox.style.left = width*i+'px'
        checkbox.style.top = height*j+'px';
        document.body.appendChild(checkbox);
        checkboxArray.push({element: checkbox, x: i, y: j});
    }
}

function gameOfLife(){
    if(!pause) {
        for (let i = 0; i < checkboxArray.length; i++) {
            check(checkboxArray[i].element, i);
        }
        for (let i = 0; i < checkboxArray.length; i++) {
            checkboxArray[i].element.checked = checkArray[i];
        }
        checkArray = [];
    }
    setTimeout(function (){
        gameOfLife();
    }, tic)
}

function randomFill(){
    clear();
    for (let i = 0; i < checkboxArray.length; i++) {
        if(Math.floor(Math.random() * 3) === 1){
            checkboxArray[i].element.checked = true;
        }
    }
}

function clear(){
    for (let i = 0; i < checkboxArray.length; i++) {
        checkboxArray[i].element.checked = false;
    }
}

function pauseGame(){
    pause = !pause;
    if(pause){
        return "play";
    }
    return "pause";
}

function changeSpeed(speed){
    tic = speed;
}


function check(checkbox, index){
    let neighbours = getNeighbours(index);
    let alive = 0;
    for (let i = 0; i < neighbours.length; i++) {
        if(neighbours[i].element.checked){
            alive++;
        }
    }
    if(checkbox.checked){
        checkArray.push(alive < 4 && alive > 1);

    }else{
        checkArray.push(alive === 3);
    }


}

function getNeighbours(index){
    let neighbours = [];
    let checkbox = checkboxArray[index];
    //left
    if(checkbox.x !== 0){
        neighbours.push(checkboxArray[index-verticalAmount])
    }
    //right
    if(checkbox.x !== horizontalAmount-1){
        neighbours.push(checkboxArray[index+verticalAmount])
    }
    //top
    if(checkbox.y !== 0){
        neighbours.push(checkboxArray[index-1]);
    }
    //bottom
    if(checkbox.y !== verticalAmount-1){
        neighbours.push(checkboxArray[index+1]);
    }
    //top left
    if(checkbox.y > 0 && checkbox.x > 0){
        neighbours.push(checkboxArray[index-verticalAmount-1]);
    }
    //top right
    if(checkbox.y !== 0 && checkbox.x !== horizontalAmount-1){
        neighbours.push(checkboxArray[index+verticalAmount-1]);
    }
    //bottom left
    if(checkbox.y !== verticalAmount-1 && checkbox.x > 0){
        neighbours.push(checkboxArray[index-verticalAmount+1]);
    }
    //bottom right
    if(checkbox.y !== verticalAmount-1 && checkbox.x !== horizontalAmount-1){
        neighbours.push(checkboxArray[index+verticalAmount+1]);
    }

    return neighbours;
}

document.getElementById('pause').addEventListener("click", function (){
    document.getElementById('pause').innerText = pauseGame();
});

document.getElementById('fill').addEventListener("click", function (){
    randomFill();
});

document.getElementById('clear').addEventListener("click", function (){
    clear();
});

document.getElementById("slider").onchange = function() {
    changeSpeed(this.value);
}

gameOfLife();