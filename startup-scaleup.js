var contenido = [];
$(document).ready(function () {
  getData();
});

function getData() {
  $.ajax({
    url: "https://raw.githubusercontent.com/one-inadem2015/repositorio-one/master/startup-scaleup/data.json",
    dataType: "JSON",
    success: function (response) {
      if ( $("#select-fil").val() == 'articulos') {
        contenido = response.articulos;
      }
      if ( $("#select-fil").val() == 'finanzas') {
          contenido = response.finanzas;
      }
      if ( $("#select-fil").val() == 'videos') {
          contenido = response.videos;
      }
      if ( $("#select-fil").val() == 'herramientas') {
          contenido = response.herramientas;
          filtrarHerramientas('todos');
      }
      if ( $("#select-fil").val() == 'glosario') {
          contenido = response.glosario;
      }
    },
    complete: function () { 
      verTodos();
    }
  });
}

function verTodos() {
  $("#fil-todos, #fil-startup, #fil-scaleup ").removeClass("fil-selected-" +  $("#select-fil").val());
  $("#fil-todos").addClass("fil-selected-" +  $("#select-fil").val());

  filtrar(2);
}

function verStartup() {
  $("#fil-todos, #fil-startup, #fil-scaleup ").removeClass("fil-selected-" +  $("#select-fil").val());
  $("#fil-startup").addClass("fil-selected-" +  $("#select-fil").val());

  filtrar(0);
}

function verScaleup() {
  $("#fil-todos, #fil-startup, #fil-scaleup ").removeClass("fil-selected-" +  $("#select-fil").val());
  $("#fil-scaleup").addClass("fil-selected-" +  $("#select-fil").val());

  filtrar(1);
}

function filtrar(fil) {
  var fil_cards = [];
  var startup = [];
  var scaleup = [];
  var both = [];
  contenido.forEach(element => {
    switch (fil) {
      case 2:
      if (element.tipo == 0) {
        startup.push(element);
      } else  if (element.tipo == 1) {
        scaleup.push(element);
      }else if (element.tipo == 2) {
        both.push(element);
      }
      return;
      case 1:
        if (element.tipo == 1) {
          scaleup.push(element);
        } else if (element.tipo == 2) {
          both.push(element);
        }
      return;
      case 0:
        if (element.tipo == 0) {
          startup.push(element);
        } else if (element.tipo == 2) {
          both.push(element);
        }
      return;
    }        
  });
  
  fil_cards = startup.concat(scaleup, both);
  switch ( $("#select-fil").val()) {
    case 'articulos':
      insertarArticulos(fil_cards);
      return;
    case 'finanzas':
      insertarArticulos(fil_cards);
      return;
    case 'videos':
      insertarVideos(fil_cards);
      return;
    case 'glosario':
      InsertarGlosario(fil_cards);
      return;
  }
}

/**
 *  INSERTANDO TARJETAS
 */

function removerCards() {
  $(".card").remove();
} 

function insertarArticulos(info) {
  var cards = '';
  removerCards();
  var index = 0;
  info.forEach(element => {
    cards += '<div class="card col-md-2 col-sm-3 col-xs-12">' +
      '<div class="card-fil-' +  $("#select-fil").val() +'" id="card-' + index + '"></div>' +
      '<div class="card-title" style="background-image: url(\'images/startup/interior-'+  $("#select-fil").val() +'.png\');">' +
      '<h4>' + element.titulo +'</h4> </div>' +
      '<div class="card-bottom">' +
      '<a href="' + element.url + '" target="_blank">' +
      '<button type="button"><h5>Ir a la nota</h5></button>' +
      '</a> </div> </div>';
      
    $("#card-container").append(cards);

    if (element.tipo == 0 || element.tipo == 2) {
      let icon2 = '';
      icon2 += '<i class="fas fa-rocket "></i>';
      $("#card-" + index).append(icon2);
    }
    if (element.tipo == 1 || element.tipo == 2) {
      let icon1 = '';
      icon1 += '<i class="fas fa-chart-line "></i>';
      $("#card-" + index).append(icon1);
    }
          
    index += 1;
    cards = '';
  });
}

function insertarVideos(info) {
  const base_url = 'images/startup/videos/';
  var cards = '';
  removerCards();
  var index = 0;
  info.forEach(element => {
    cards += '<div class="card col-md-2 col-sm-12 col-xs-12">' +
      '<div class="card-video col-md-2 col-sm-12 col-xs-12">' +
      '<button type="button" onclick="verVideo(\'' + element.url + '\');">' +
      '<img class="video-img img-responsive" src="' + base_url + element.img +'" alt=""> ' +
      '<div class="video-mask col-md-2 col-sm-12 col-xs-12"> <img src="' + base_url + 'marscara_player-12.png" alt=""> </div> </button>' +
      '</div>' +
      '<div class="card-fil-' +  $("#select-fil").val() +'" id="card-' + index + '" style="margin-top:130px;"></div>' +
      '<div class="card-title-video"><h4>' +
          element.titulo +
      '</h4></div></div> </div>';
        
      $("#card-container").append(cards);

      if (element.tipo == 0  || element.tipo == 2) {
        let label1 = '';
        label1 += '<button class="label-fil-st" type="button" disabled>Startup</button>';
        $("#card-" + index).append(label1);
      }
      if (element.tipo == 1  || element.tipo == 2) {
        let label2 = '';
        label2 += '<button class="label-fil-sc" type="button" disabled>Scaleup</button>';
        $("#card-" + index).append(label2);
      }
      
      index += 1;
      cards = '';
  });
}

function InsertarGlosario(info) {
  var cards = '';
  removerCards();
  var index = 0;
  info.forEach(element => {
    cards += '<div class="card col-md-2 col-sm-3 col-xs-12">' +
          '<div class="card-fil-' +  $("#select-fil").val() +'" id="card-' + index + '"></div>' +
          '<div class="card-title">' +
          '<h4>' + element.titulo +'</h4> </div>' +
          '<div class="card-bottom">' +
          '<a href="' + element.url + '" target="_blank">' +
          '<button type="button"><h5>IR A LA NOTA</h5></button>' +
          '</a> </div> </div>';
          
          $("#card-container").append(cards);

          if (element.tipo == 0) {
            let icon1 = '';
            icon1 += '<i class="fas fa-chart-line "></i>';
            $("#card-" + index).append(icon1);
          }
          if (element.tipo == 1) {
            let icon2 = '';
            icon2 += '<i class="fas fa-rocket "></i>';
            $("#card-" + index).append(icon2);
          }
          index += 1;
          cards = '';
  });
}

function insertarHerramientas(info) {
  const base_url = 'images/startup/herramientas/';
  var cards = '';
  removerCards();
  var index = 0;
  info.forEach(element => {
    cards += '<div class="card col-md-2 col-sm-3 col-xs-12"> ' +
      '<div class="card-top" id="card-' +  index + '"></div>' +
      '<div class="card-img">' +
        '<img src="' + base_url + element.img +'" alt=""></div>' +
      '<div class="card-title-app">' +
        '<h4>'+ element.titulo + '</h4>' +
        '<p>'+ element.descripcion +'</p>' +
      '</div>' +
      '<div class="card-bottom">' +
        '<a href="' + element.url +  '" target="_blank">' +
          '<button type="button"><h5>Conocer más</h5></button>' +
        '</a></div> </div> ';

    $("#card-container").append(cards);
    index += 1;
    cards = '';
  });
}

function verVideo(url) {
  $("#modal-video").attr("role", "img");
  $("#modal-video").attr("tabindex", "-1");
  $("#modal-video").modal("show");
  $("#iframe").attr("src", url);
}

function filtrarHerramientas(idTipo) {
  var info = [];
  contenido.forEach(element => {
    if (idTipo == "todos") {
      info.push(element);
    } else if (element.tipo == idTipo){
      info.push(element);
    }
  });
  insertarHerramientas(info);
}

function overIco(element, file) {
  const img_url = 'images/startup/';
  $(element).attr("src", img_url + file);
}

function outIco(element, file) {
  const img_url = 'images/startup/';
  $(element).attr("src", img_url + file);
}