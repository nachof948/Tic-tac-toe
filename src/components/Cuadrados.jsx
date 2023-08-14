import React from 'react';
import '../Hojas de estilo/Cuadrados.css'
const Cuadrado = ({ children, seleccionado, actualizarJuego,index }) => {
  const manejarClick = ()=>{
    actualizarJuego(index)
  }
  const className = `cuadrado ${ seleccionado ? 'seleccionado' :''}`

  return(
    <div className={className} onClick={manejarClick}>
        {children}
    </div>
  )
}

export { Cuadrado }