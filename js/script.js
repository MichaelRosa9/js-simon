$(document).ready(function(){
  //1 generare 5 numeri random dal computer
  //2 il display dei numeri dura 5 secondi 
  //3 l'utente deve indovinare 5 numeri
  // vengono mostrati i numeri indovinati

  reset();
  var npc_numbers = [];
  var player_numbers = [];

  $('#start').click(function(){

    while (npc_numbers.length < 5){    
      npc_numbers.push(randomNumber(1, 100));
    }

    printOutput(npc_numbers, display);

    $(this).hide();

    setTimeout(function(){
      printOutput('Indovina i 5 numeri', display);
      $('#game').show();
    }, 5000);
  });//END $('#start').click(function


  $('#submit').click(function(){ 
    var player_input = $('input').val();
    player_numbers.push(player_input);
    player_input = $('input').val('');

    if(player_numbers.length === npc_numbers.length){
      $('#game').hide();
      $('#display').text('Verifica numeri selezionati...');

      setTimeout(function(){
        compare(player_numbers, npc_numbers);
        if(compare === false){
          $('#display').text('Hai perso');
        }else{
          $('#display').text('hai vinto')
        }
        reset()
      }, 3000);
  
    }
    console.log(player_numbers);
  });


});//END $(document).ready()

//FUNCTIONS
function reset(){
  $('#game').hide();
  $('#start').show();
}

function printOutput(text, target){
  $(target).text(text);
}

function randomNumber(min, max){
  return Math.floor(Math.random()* (max - min + 1) + min);
}

function compare(arr1, arr2){  
  for(i = 0; i < arr1.length; i++){
    if(arr1[i] !== arr2[i]){
      return false;
    }else{
      return true;
    }
  }  
}