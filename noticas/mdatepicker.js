var baseUrl = "https://raw.githubusercontent.com/one-inadem2015/repositorio-one/master/noticias/";
var picker = ""; 
$(document).ready(function () {
  // Set current date
    var date = new Date(2018,09,24);
    picker = new Pikaday({
      field: document.getElementById('datepicker'),
      format: 'DD/MM/YYYY',
      maxDate: date,
      toString(date, format) {
          const day = date.getDate() ;
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const monthName = this.i18n.months[month - 1];
          cargarArticulo(day, month, year); 
          return `${day} de ${monthName} de ${year}`;
      },
      parse(dateString, format) {
          const parts = dateString.split('/');  
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1] - 1, 10);
          const year = parseInt(parts[1], 10);
          return new Date(year, month, day);
      }
    });
	cargarArticulo(date.getDate(), date.getMonth()+1, date.getFullYear());
});

function existeUrl(day, month, year) {
		var http = new XMLHttpRequest();
		var url = baseUrl + year + '/' + mMonth + '/' + fileID + ".json"
		http.open('HEAD', url, false);
		http.send();
		if (http.status!=404){
			cargarArticulo(day, month, year);
		}
	}
	
function cargarArticulo(day, month, year) {
  var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto',
  'Septiembre','Octubre','Noviembre','Diciembre'];            
  let mDay = day < 10? "0" + day.toString(): day.toString();
  let mMonth = month < 10 ? "0" + month.toString(): month.toString();
  let fileID = year.toString()  + mMonth.toString() + mDay.toString();
  let label = day.toString() + " de " + months[month-1].toString() + " de " + year.toString();
  $("#datepicker").val(label);
  $.ajax({
    url: baseUrl + year + '/' + mMonth + '/' + fileID + ".json",
    dataType: "JSON",
    success: function (data) {
      cargarTabla(data.noticias);
    },
    statusCode: {
      404: function() {
		  
        $(".body-row").remove();
        $("#tabla").append('<tr class="body-row"><td style="padding: 100px 0 200px 0; text-align: center;">'+
          '<h4>Estamos trabajando en ello...</h4>' +
        '</td></tr>');
      }
    }
  });
}

function cargarTabla(noticias) {
  var row = '';
  var index = 0;
  $(".body-row").remove();
  noticias.forEach(element => {
    row += '<tr  class="body-row" style="background-color: #ffffff;">' +
      '<td style="background-color: #ffffff;">' +
      '<a href="' + element.url + '" target="_blank" onclick="alert(\'Está saliendo de la página del Observatorio, Clik en Aceptar para continuar.\');return true;">' +
        '<div class="col-md-12 news-row" id="new-row-' + index + '" onmouseover="hoverNews(' + index + ')"'+
        ' onmouseout="newsOut(' + index + ')">' +
          '<div class="com-md-12 news-title">' +
            '<p>' + element.titulo + '</p>' +
          '</div>' +
          '<div class="col-md-3 col-sm-12 news-fuente-container" id="fuente-' + index + '" style="margin-left: 15px;">' +
            '<p class="news-fuente"> ' + element.autor + ' </p>' +
          '</div>' +
        '</div>' +
        '</a>' +
      '</td>' +
    '</tr>';
    $("#tabla").append(row);
    row = '';
    index += 1;
  });
}

function hoverNews(id) {
    $("#new-row-" + id).css("background", "#edeef0");
    $("#fuente-" + id).css("background", "#ff8000");
}

function newsOut(id) {
  $("#new-row-" + id).css("background", "#ffffff");
  $("#fuente-" + id).css("background", "#5bc0de");
}
