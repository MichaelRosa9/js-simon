var npc_numbers, player_numbers, correct_numbers;
var limit = 5;

$(document).ready(function(){

  reset();
  //inizia il gioco
  $('#start').click(function(){

    //faccio un ciclo while per generare array npc_numbers
    while (npc_numbers.length < limit){    
      var randNum = randomNumber(1, 100);
      //se il numero non e' presente nell'array lo inserisco nell'array
      if(!npc_numbers.includes(randNum))
      npc_numbers.push(randNum);
    }

    printOutput('I numeri estratti sono ' + npc_numbers.join(' - '), display);

    $(this).hide();

    setTimeout(function(){
      printOutput('Indovina i 5 numeri', display);
      $('#game').show();
    }, 2000);
  });//END $('#start').click(function


  //inizio della partita
  $('#submit').click(function(){ 
   
    //definisco una variabile l'input del giocatore
    var player_input =parseInt($('input').val());
      
    //verifico se il numero e' gia stato messo
    if(player_numbers.includes(player_input)){
      
      printOutput(player_input + ' é gia stato messo', '#display');
    }else{
      //pusho il numero messo del giocatore dentro l'array
      player_numbers.push(player_input);
      printOutput('I numeri inseriti sono: ' + player_numbers.join(' - '), '#display');
    }


    //azzero il testo dell'input
    player_input = $('input').val('');
    //metto il focus nell'inputo cosi da non dover cliccarci nuovamente per scrivere un altro numero
    $('input').focus();


    if(player_numbers.length === limit){
      //verifica del punteggio
      for(var num of player_numbers){
        if(npc_numbers.includes(parseInt(num))){
          correct_numbers.push(num);
        }
      }

      //loading screen
      setTimeout(function(){
        printOutput('Verifica numeri selezionati...', '#display');
        $('#game').hide();
      },500)

      //risultato del gioco
      setTimeout(function(){
        if(correct_numbers.length === 0){          
          printOutput('hai perso!', '#display');
        }else{      
          printOutput('I numeri indovinati sono: ' + correct_numbers.join(' - '), '#display');
         
        }
        $('#restart').show();
        
      },2000)
      
      //quando clicco il bottone restart mi riavvia il gioco
      $('#restart').click(function(){
        reset();        
      });
             
    }
  });



});//END $(document).ready()

//FUNCTIONS
//funzione che mi resetta tutte le impostazioni per inizio partita
function reset(){
  limit = parseInt(prompt('Segli quanti numeri inserire'));
  npc_numbers = [];
  player_numbers = [];
  correct_numbers = [];
  $('#game').hide();
  $('#restart').hide();
  $('#start').show();
  $('#display').show();
  printOutput('Per iniziare il gioco premi Play', '#display')
}

function printOutput(text, target){
  $(target).text(text);
}

function randomNumber(min, max){
  return Math.floor(Math.random()* (max - min + 1) + min);
}
