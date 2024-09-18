$(document).ready(function () {
  const $caveira = $('.caveira');
  const $lapide = $('.lapide');

  var duracao = 2000; // Duração inicial em milissegundos

  setInterval(function() {
      duracao -= 5; // Diminui a duração em 10ms a cada intervalo
      if (duracao <= 500) {
          duracao = 500; // Limita a duração mínima para evitar animações muito rápidas
      }
      $lapide.css('animation-duration', duracao + 'ms');
  }, 2000); //intervalo


  // Função para controlar o pulo da caveira 
  function pulo() {
    $caveira.addClass('pulo');
    setTimeout(function () {
      $caveira.removeClass('pulo');
    }, 500);
  }

  iniciarContador();


  // Função para controlar a posição final da caveira e mudança de imagem
  function PosicaoFinal() {
    const posicaoLapide = $lapide.offset().left;
    const posicaoCaveira = parseInt($caveira.css('bottom').replace('px', ''));

    if (posicaoLapide <= 120 && posicaoLapide > 0 && posicaoCaveira < 120) {
      $lapide.css({ animation: 'none', left: `${posicaoLapide}px` });
      $caveira.css({ animation: 'none', bottom: `${posicaoCaveira}px` });
      $caveira.attr('src', 'images/caveira_end.gif');
      $caveira.css({ width: '350px', marginLeft: '-40px' });
      setTimeout(function() {
        $caveira.attr('src', 'images/caveira_endi.png');
        $caveira.css({ width: '145px', marginLeft: '-10px' });
      }, 980);

      
      clearInterval(loop); // Para o loop depois que a posição final for alcançada
      pararContador(); //Para o contador do score quando a posição final for alcançada
      
      $('link[rel="shortcut icon"]').attr('href', 'images/icone_caveiraM.png');

      $(document).keydown(function (event) {
        if (event.which === 40) { // Verifica se a tecla da seta pra baixo de espaço foi pressionada, se sim reinicia a página
          location.reload();
        }
      });
    }
  }

  // Keydown event listener usando o jQuery 
  $(document).keydown(function (event) {
    if (event.which === 38) { // Verifica se a tecla da seta pra cima foi pressionada, se sim pula 
      pulo();
    }
  });

  // Loop para verificar e atualizar constantemente as posições da caveira e do lapide
  const loop = setInterval(function () {
    PosicaoFinal();
  }, 10);
});


// score/contador
let score = 0;
let scoreElement = document.getElementById('score');
let scoreIntervalo;

function Score() {
  score++;
  scoreElement.textContent = `${score}`;
}

function iniciarContador() {
  scoreIntervalo = setInterval(Score, 500);
}

function pararContador() {
  clearInterval(scoreIntervalo);
}
