
// --------------- Funciones principales ----------------- \\

function generar (){
  
  var datos = get_datos();
  var p = datos.p;
  var a = datos.a;
  var k = datos.k;
  var x = datos.x;
  var m = datos.m;

  var cifrado = elGamal(p,a,k,x,m)
  var descifrado = descifrar(cifrado.K,p,cifrado.C)

  imprimirSalida(cifrado,descifrado,datos)
}

// --------------------------------------------------------- \\

function get_datos (){

    var p = parseInt(document.getElementById("p").value);
    var a = parseInt(document.getElementById("a").value);
    var k = parseInt(document.getElementById("k").value);
    var x = parseInt(document.getElementById("x").value);
    var m = parseInt(document.getElementById("m").value);
        
	var datos = { 
		p: p,
    a: a,
    k: k,
    x: x,
    m: m
	};
	return datos;
}

// --------------- Funciones ElGamal  ----------------- \\

function elGamal(p,a,k,x,m){
  var claves = diffieHellman(p,a,k,x)
  var mensajeCifrado = (claves.K*m) % p
  
  var resultados = {
    yA: claves.yA,
    yB: claves.yB,
    K: claves.K,
    C: mensajeCifrado
  }
  return resultados
}

function descifrar(K,p,mensajeCifrado) {
  var Kinv = inverso(K,p)
  var descifrado = (Kinv*mensajeCifrado)%p

  var resultados = {
    Kinv: Kinv,
    M: descifrado
  }
  
  return resultados
}

// ----------------- Diffie-Hellman  ------------------ \\

function diffieHellman(p,a,k,x){
  var clavePubA = fastModExp(a,k,p)
  var clavePubB = fastModExp(a,x,p)

  //se toma cualquiera de los 2 porque es la misma
  var clavePriv = fastModExp(clavePubB,k,p)

  var claves = {
    yA: clavePubA,
    yB: clavePubB,
    K: clavePriv
  }
  return claves
}

function fastModExp(base,exp,mod){

  var x = 1;
  var y = base%mod;

  while (exp > 0 && y > 1){
    if (exp % 2 !== 0){
      x = (x * y) % mod;
      exp = exp-1;
    } else {
      y = (y * y) % mod;
      exp = exp / 2;
    }
  }

  return x
}

// ----------------- Calcular Inverso ------------------ \\

//calculado con algoritmo euclideo extendido

function inverso(a,b){
  var x = 0;
  if (mcd(a,b) == 1){
    var y = []
    var g = [b,a]
    var u = [1,0]
    var v = [0,1]

    var i = 1

    while (g[i] != 0) {
      y.push(Math.floor(g[i-1]/g[i]))
      g.push(g[i-1] - (y[i-1] * g[i]))
      u.push(u[i-1] - (y[i-1] * u[i]))
      v.push(v[i-1] - (y[i-1] * v[i]))
      i = i+1
    }
    if (v[i-1] < 0) {
      v[i-1] = v[i-1] + b
    }

    x = v[i-1]
  }
  return x  
}

function mcd(a, b) {
  return(b==0) ? a : mcd(b,a%b);
}

// -------------- Funcion para Imprimir ---------------- \\

function imprimirSalida(cifrado,descifrado,datos){

  var txt = ""

  //"Entrada: p = 13, a = 4, k = 5, x = 2, m= 8"
  //"Salida: yA =10, yB =3, K = 9, C= 7, K-1= 3, M=8"

  txt = txt + "Entrada: p = "+ datos.p +", a = " + datos.a +", k = " + datos.k +", x = " + datos.x +", m = "+ datos.m +`<br>`
  txt = txt + "Salida: yA = "+ cifrado.yA +", yB = " + cifrado.yB +", K = " + cifrado.K  +", C = " + cifrado.C +", K-1 = "+ descifrado.Kinv +", M = "+ descifrado.M +`<br>`
  document.getElementById("s_salida").innerHTML = txt;

 
 var checkBox = document.getElementById("candado");
 var mostrar = document.getElementById("salida");

 if (checkBox.checked == true){
  mostrar.style.display = "block";
 } else {
  mostrar.style.display = "none";
 }

}
