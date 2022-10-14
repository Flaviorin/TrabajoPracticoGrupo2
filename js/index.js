var hed=`
<nav class="nav">
	<div class="nav_title">
		<a href="./index.html">
			<img id="imagen_home_logo_camion" src="./img/Logofede.png" alt="">
		</a>
	</div>
	<!-- Nuevo cuadrito Temperatura -->
	<div class="weather-box">
		<h4 id="muestraProvincia2" class="tituloProvincia"></h4>
		<table id="tablitaTemperatura">
			<th class="thtemp">
				<img src="" id="iconoTemperatura"/>
			</th>
			<th class="thtemp">
				<p id="muestraEstadoClima" class="parrafoEstadoClima"></p>
			</th>
		</table>
	</div>
	<!-- FIN Nuevo cuadrito Temperatura -->
	<div class="nav_list_menu">
		<ul>
			<li class="nav_item"><a href="#" class="nav_item_stilo">Ver Categorías</a></li>
			<li class="nav_item"><a href="#eres_transportista_home" class="nav_item_stilo">¿Eres transportista?</a></li>
			<li class="nav_item"><a href="#" class="nav_item_stilo">Buscar envíos</a></li>
			<li class="nav_item"><a href="#como_funciona_home" class="nav_item_stilo">¿Cómo funciona?</a></li>
			<li class="nav_item"><a href="#" class="nav_item_stilo">Ayuda</a></li>
			<li class="nav_item"><a href="#" class="nav_item_stilo">Iniciar sesión</a></li>
		</ul>
	</div>
</nav>
`

document.getElementById("idheader").innerHTML=hed;

function obtenerPais(callback) {
	var request = new XMLHttpRequest();
		request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			var json = JSON.parse(request.responseText);
			//console.log('Your country is ' + json['location']['country']['name']);
			var latitud = json['location']['latitude'];
			//console.log(latitud);
			var longitud = json['location']['longitude'];
			//console.log(longitud);
			var coordenadas = [latitud,longitud];
			//console.log(coordenadas);
			//provincia = json['location']['country']['capital'];
			callback(coordenadas);
			//return (coordenadas);
		}
	};
	request.open('GET', 'https://api.ipregistry.co/?key=o4ie2fwo690290mu', true);
	request.send(null);
}


function obtenerClima(coordenadas) {
	//setTimeout(function() {
	var city = document.getElementById("muestraProvincia2");
	var latitud = (coordenadas[0]);
	var longitud = (coordenadas[1]);
	var ico = document.getElementById("iconoTemperatura");
	var estadoClima = document.getElementById("muestraEstadoClima");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var json2 = JSON.parse(xhttp.responseText);
			//console.log('La temperatura de ' +json2['name']+' es '+ json2['main']['temp']+'°');
			//console.log('y esta '+ json2['weather'][0]['description']);
			city.innerHTML = (json2['name']); //+' (Temp: ' + Math.floor(json2['main']['temp'])+'°)');
			estadoClima.innerHTML = (Math.floor(json2['main']['temp'])+'°');//('('+ json2['weather'][0]['description'] +')');
			var iconcode = json2['weather'][0]['icon'];
			var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
			ico.src = (iconurl);
		}
	};
	var url = new URL('https://api.openweathermap.org/data/2.5/weather?lat=1&lon=1&units=metric&lang=es&appid=b044f07656da438fa995eabf7380b67b');
	url.searchParams.set('lat', latitud);
	url.searchParams.set('lon', longitud);
	xhttp.open('GET',url , true);
	xhttp.send(null);
	// }, 2000);
}
//obtenerPais(obtenerClima);

var fot=`
<p>Copyright 2022</p>
`

document.getElementById("idfooter").innerHTML=fot;