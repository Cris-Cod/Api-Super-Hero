const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e) {
    e.preventDefault();

    let character = document.querySelector('#hero').value;

    if (character === '') {
        console.log('ingrese un personaje');

        return;
    }

    buscarHero();
}


function buscarHero() {

    let character = document.querySelector('#hero').value;

    const url = `https://www.superheroapi.com/api.php/10224579324700210/search/${character}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {

            heros(resultado.results)

        })

}


function heros(dato) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    dato.forEach(data => {

        console.log(data);

        /*Biografia*/
        let biografia = data.biography;
        let valores = Object.values(biografia);
        let fullName = valores[0];
        let alterEgos = valores[1];
        let placeBirth = valores[3];
        let primeraAparicion = valores[4];
        let editor = valores[5];


        let alia = data.biography.aliases;
        let alias = alia.join(', ').toString();

        /*Apariencia*/

        let apareincia = data.appearance;
        let valorAp = Object.values(apareincia);
        let genero = valorAp[0];
        let raza = valorAp[1];
        let altura = data.appearance.height;
        let alturaHero = altura[1];
        let peso = data.appearance.weight;
        let pesoHero = peso[1];


        /*Estadisticas de poder*/

        let poderes = data.powerstats;
        let valorPoder = Object.values(poderes);
        let inteligencia = valorPoder[0];
        let fuerza = valorPoder[1];
        let velocidad = valorPoder[2];
        let durabilidad = valorPoder[3];
        let poder = valorPoder[4];
        let combate = valorPoder[5];


        /*conexiones*/

        let conexion = data.connections;
        let valorConexion = Object.values(conexion);
        let afilacion = valorConexion[0];


        /*Ocupacion*/

        let trabajo = data.work;
        let valorWork = Object.values(trabajo);
        let ocupation = valorWork[0];





        const { name, image } = data;


        resultado.innerHTML += `
        <div class="nombre"><h2>${name}</h2></div>
        <div class="imagen"><img src=${image.url} alt=${name}></div>
        <div class="biografia"><table>
            <h2>Biografia</h2>
            <tr>
                <td> Nombre Completo: </td>
                <td>${fullName}</td>
            </tr>
            <tr>
                <td> Alteregos: </td>
                <td>${alterEgos}</td>
            </tr>
            <tr>
                <td> Lugar de Nacimiento: </td>
                <td>${placeBirth}</td>
            </tr>
            <tr>
                <td> Genero: </td>
                <td> ${genero} </td>
            </tr>
            <tr>
                <td> Raza: </td>
                <td> ${raza} </td>
            </tr>
            <tr>
                <td> Altura: </td>
                <td> ${alturaHero} </td>
            </tr>
            <tr>
                <td> Peso: </td>
                <td> ${pesoHero} </td>
            </tr>
            <tr>
                <td> Primera Aparicion: </td>
                <td>${primeraAparicion}</td>
            </tr>
            <tr>
                <td> Editor: </td>
                <td>${editor}</td>
            </tr>
        </table></div>
        <div class="poderes">
            <table>
            <h2>Estadisticas de poder</h2>
               <tr>
                    <td> Inteligencia: </td>
                    <td> ${inteligencia} </td>
                </tr>
                <tr>
                    <td> Fuerza: </td>
                    <td> ${fuerza} </td>
                </tr>
                <tr>
                    <td> Velocidad: </td>
                    <td> ${velocidad} </td>
                </tr>
                <tr>
                    <td> Durabilidad: </td>
                    <td> ${durabilidad} </td>
                </tr>
                <tr>
                    <td> Poder: </td>
                    <td> ${poder} </td>
                </tr>
                <tr>
                    <td> Combate: </td>
                    <td> ${combate} </td>
                </tr>
            </table>
        </div>
        <div class="alias"><h4>Alias</h4><p>${alias}</p></div>
        <div class="afilacion"><h4>Afilacion Grupal</h4><p>${afilacion}</p></div>
        <div class="ocupacion"><h4>Ocupacion</h4><p>${ocupation}</p></div>
        `

    });
}