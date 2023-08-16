import { useState } from 'react'
import './App.css'
import { Cuadrado } from './components/Cuadrados'
import { Modal } from './components/Modal'
import confetti from 'canvas-confetti'
import { TURNOS, COMBINACIONES } from './constantes'

function App() {

  /* TURNOS */
  const [turno, setTurno] = useState(()=> {
    const turnoDeAlmacenamiento = window.localStorage.getItem('turno')
    return turnoDeAlmacenamiento ? turnoDeAlmacenamiento : TURNOS.X
  })

  /* TABLA DEL JUEGO */
  const [tabla, setTabla] = useState(() =>{
    const tablaDeAlmacenamiento = window.localStorage.getItem('tabla')
    return tablaDeAlmacenamiento? JSON.parse(tablaDeAlmacenamiento) : Array(9).fill(null)
  })
  
  const [ganador, setGanador] = useState(null)
  
  const jugadorGanador = (chequearGanador) =>{
    for(const combo of COMBINACIONES){
      const [a,b,c] = combo
      if(chequearGanador[a]&& 
        chequearGanador[a] === chequearGanador[b] &&
        chequearGanador[a] === chequearGanador[c])
        return chequearGanador[a]
    } 
    return null
  }

  const chequearFinDelJuego = (nuevaTabla) =>{
    return nuevaTabla.every((cuadrado) => cuadrado !== null)
  }

  /* ACTUALIZAR TABLA DEL JUEGO */
  const actualizarJuego = (index)=>{

    /* Para evitar que se sobreescriba en el cuadrado */
    if(tabla[index] || ganador) return

    /* Nueva tabla con el elemento seleccionado */
    const nuevaTabla = [...tabla]
    nuevaTabla[index] = turno
    setTabla(nuevaTabla)
    
    /* Actualizacion de turno */
    const nuevoTurno = (turno === TURNOS.X ? TURNOS.O : TURNOS.X)
    setTurno(nuevoTurno)

    /* Guardar partida */
    /* Cada vez que se actualiza el juego, ya sea al hacer clic en un cuadrado o al reiniciar el juego, se guarda el estado actual de la tabla y el turno en el localStorage */
    window.localStorage.setItem('tabla',  JSON.stringify(nuevaTabla))
    window.localStorage.setItem('turno',  nuevoTurno)

    /* Revisar si hay un ganador */
    const nuevoGanador = jugadorGanador(nuevaTabla)
    if(nuevoGanador) {
      confetti()
      setGanador(nuevoGanador)
    } else if (chequearFinDelJuego(nuevaTabla)) {
      setGanador(false)
    }
  }


  /* RESETEAR JUEGO */
  const resetearJuego = () =>{
    setTabla(Array(9).fill(null))
    setTurno(TURNOS.X)
    setGanador(null)
    window.localStorage.removeItem('tabla')
    window.localStorage.removeItem('turno')
  }

  return (
    <main className='app'>
      <h1 className='titulo'>Tic Tac Toe</h1>
      <button className='btn-resetear' onClick={resetearJuego}>Resetear Juego</button>
      <div className='contenedor-juego'>
        {
        tabla.map((_, i) =>{
          return(
            <Cuadrado 
            key={i}
            index={i}
            actualizarJuego={actualizarJuego}
            > 
              {tabla[i]}
          </Cuadrado>
          )
        })
        }
      </div>
      <section className='turnos'>
        <Cuadrado seleccionado={turno === TURNOS.X}>{TURNOS.X}</Cuadrado>
        <Cuadrado seleccionado={turno === TURNOS.O}>{TURNOS.O}</Cuadrado>
      </section>
       <Modal resetearJuego={resetearJuego} ganador={ganador}/>
    </main>
  )
}

export default App
