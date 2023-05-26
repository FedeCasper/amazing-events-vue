module.exports = {
     devServer: {
          proxy: {
               // Configuraciones del proxy aquí
          },
          stats: 'errors-only' // Esto evita que se muestren los mensajes de proxy en la consola
     },
     configureWebpack: {
          performance: {
               hints: false,
          },
     }
}