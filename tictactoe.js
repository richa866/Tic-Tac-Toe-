//getting the elements
let  textWinner=document.querySelector(".winner");
let modal=document.querySelector(".modal");
let resets=document.querySelectorAll(".resetGame");
let no= document.querySelector(".no");
let boxes = document.querySelectorAll(".box");
//setting the turn to O
let turnO = true;
//creating and array of the possible win patterns
const patterns=[
    [0,1,2],                
    [3,4,5],               
    [6,7,8],               
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];
// adding en event listner for each box of all boxes
boxes.forEach((box)=>{
box.addEventListener("click",()=>{
    console.log("box was clicked");// to keep a track of the program 
    if(turnO==true){
       box.innerText= "O"; 
       box.style.border=" 8px solid #ff0054";
       turnO=false // once O plays , setting the flag to false , so that next chance X plays 
    }
else{
    box.innerText= "X";
    box.style.border=" 8px solid #ffbd00";
    turnO=true;
}
box.disabled=true;   // restricts the user from changing the choice
winner();   //calling the winner function
})
})


//deciding the winner
const winner=()=>{
     let winnerFound= false;  // creating a winnerfound flag to check if the winner is found or no
    for( let  pattern of patterns){  

  let box1val = boxes[pattern[0]].innerText;
  let box2val= boxes[pattern[1]].innerText;
let box3val = boxes[pattern[2]].innerText; 
 
if(box1val!=""&& box2val!="" && box3val!=""){ 

    if(box1val===box2val && box2val===box3val){     
        console.log ("winner", box1val);
        displayWinner(box1val, 1000); // calling the display function with a delay of 1000ms

//adding some styling 
     boxes[pattern[0]].style.border= "8px solid yellow";       
    boxes[pattern[1]].style.border= "8px solid yellow";
    boxes[pattern[2]].style.border= "8px solid yellow";
    boxes[pattern[0]].style.color="yellow";
    boxes[pattern[1]].style. color="yellow";
    boxes[pattern[2]].style.color="yellow";

winnerFound=true;  // if the winner if found it will return the value 
break;
    }
  if (!winnerFound && [...boxes].every(box => box.innerText !== "")){
    // ensures that the game is declared draw only after all the boxes are filled and no winner is found
    displayWinner( 0 ,1000); //calling displaWinner function
 }
}
 }
}

//displaying the winner using a modal box 
  const displayWinner=(box1val,delay)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
                modal.style.display="block";
                console.log("modal is printed");

                if( box1val && box1val!==0 ){
                   textWinner.innerText= `CONGRATULATIONS! ${box1val} is the winner!`;
                   resolve(`Winner is ${box1val}`);
                }
                else{
                  textWinner.innerText= "OOPS IT'S A DRAW !";
                  reject("Game is a draw");
                }
            }, delay);  
    })
  }

resets.forEach((reset)=>{
  reset.addEventListener("click",()=>{  //on clicking the reset button
    for( let box of boxes){
    box.disabled=false;  // allows us to change the vallues of the button
    box.innerText=""; // sets the value to blank
    modal.style.display="none"; 
    box.style.border="3px solid white";
}
  })
})
  no.addEventListener("click",()=>{
    modal.style.display="none";
  })


// instead of writing the complete for loop you can use this 
// console.log(pattern[0],pattern[1],pattern[2]);  // pattern is also an array therefore accessing each index of it 
 // will only check the pattern array 