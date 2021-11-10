const correo = "alberchauc@m.com";


function imagenPerfil(img){
    if(img){
        return img;
    }
    else{
        var listaImagenes= ['/Imagenes_de_perfil/sfg.png', 
        '/Imagenes_de_perfil/roberto.png', '/Imagenes_de_perfil/nico.png',
        '/Imagenes_de_perfil/marta.png', '/Imagenes_de_perfil/kuroko.png',
        '/Imagenes_de_perfil/defecto3.png', '/Imagenes_de_perfil/defecto2.png',
        '/Imagenes_de_perfil/defecto1.png', '/Imagenes_de_perfil/amy.png'];
        var numero= Math.floor(Math.random() * (listaImagenes.length - 0));
        return listaImagenes[numero];
    }
}
var correoE = imagenPerfil(null);
var correoE2 = imagenPerfil('foto');
