# Proyecto AhorrADAS - Proyecto JS para Carrera Desarrollo Frontend ADA
<p> Es una aplicación de control de gastos y ganancias realizada con lenguaje (JavaScript). Desarrollado el HTML con tailwind. </p>
<p> Corresponde al módulo III de la carrera de Desarrollo Frontend ADA - por lo cual es parte de un proceso de aprendizaje </p>

[link del proyecto](https://ana-laura-flores.github.io/ahorradas-proyect-javascript/)

## Un poco de la trastienda del proyecto

 - Se utiliza lenguaje HTML desarrollado con tailwind y JavaScript

``` html
 <footer class="bg-[#D22779] w-full h-24 flex justify-center items-center">
        <h2 class="text-white text-lg font-mono	">Realizado por Ana Laura Flores</h2>
    </footer>

 ```     
 fragmento de código HTML      


 - En el desarrollo del proyecto para su funcionamiento se utiliza JavaScript para modificar dinámicamente su contenido y sus propiedades tanto del texto como de la imagen. Utilizando funciones, variables, eventos.

 ``` javascript
 const meme =()=>{
$("#url__image").addEventListener("input", ()=>{
    const urlImage = $("#url__image").value
    $(".meme__image").style.backgroundImage = `url(${urlImage})`
    $(".meme__image").style.backgroundSize ="cover"
    $(".meme__image").style.backgroundPosition ="center"
    })
}
meme()
```
ejemplo de una función realizada en el proyecto (esta función permite que al ingresar una url se visualice la imagen en el gestor de memes)
 
 <br>


## Es una aplicación con la que podrás manipular el texto y la imagen para crear tu propio meme.
<br>

![portada del gestor de memes](./image/portada_gestor_de_meme.jpg)

<p>Podrás poner una imagen a tu elección en el panel de imagen en la url y luego modificar su <em>color, contraste, opacidad y muchas más variables.</em></p> 
<br>

![panel de imagen del gestor de memes](./image/panel_image.jpg)
<br>

<p>Podrás agregarle un texto superior y otro inferior o también podrás elegir que sólo tenga uno de los dos. Todas estas opciones y más las manejas desde el panel de texto. Pudiendo cambiar la <em>tipografía, tamaño, color, alineación, fondo, contorno, espaciado.</em></p>
<br>

![panel de texto del gestor de memes](./image/panel_text.jpg)

<br>
<p> En este proyecto también podrás cambiar el modo de verlo MODO CLARO - MODO OSCURO</p>
<p> <em> Esta parte del proyecto también se realiza con JavaScript </p>

![modo claro - modo oscuro](./image/modo_claro-modo_oscuro.jpg)


### Una vez que lográs el meme que querés podrás descargarlo para compartirlo con quien vos quieras.
<br>

![meme final](./image/meme_final.jpg)

## Espero disfrutes utilizandolo como yo disfruté creandolo!

![nena de pelo negro](./image/logo_krear.png)
<br>
<p style="font-family:Arial; font-size:24px;"> Ana Laura Flores </p>
 <p style="font-family:Arial; font-size:12px; color:#d813be"> (DISEÑADORA GRÁFICA UBA - ESTUDIANTE FRONTEND) </p>



