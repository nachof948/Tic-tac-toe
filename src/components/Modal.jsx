import React from 'react';
import '../Hojas de estilo/Modal.css'

const Modal = ({resetearJuego, ganador}) => {
    if (ganador === null){
        return null;
    }
    return(
        <section className='modal'>
          <div className='contenedor-modal'>
            <h2>{ganador === false ? 'Empate': null}</h2>
            <h2>{ganador && `Ganador: ${ganador}`}</h2>
            <button className='btn-resetear' onClick={resetearJuego}>Resetear Juego</button>
          </div>
        </section>
    )
}

export { Modal }