import { useState } from 'react'
import './App.css'
import { Cuadrado } from './components/Cuadrados'

function App() {
const TURNOS = {
  X: 'X',
  O:'O'
}
const COMBINACIONES =[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

  /* TURNOS */
  const [turno, setTurno] = useState(TURNOS.X)

  /* TABLA DEL JUEGO */
  const [tabla, setTabla] = useState(Array(9).fill(null))
  
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

    /* Revisar si hay un ganador */
    const nuevoGanador = jugadorGanador(nuevaTabla)
    if(nuevoGanador) {
      setGanador(ganador)
    } else if (chequearFinDelJuego(nuevaTabla)) {
      setGanador(false)
    }
  }


  /* RESETEAR JUEGO */
  const resetearJuego = () =>{
    setTabla(Array(9).fill(null))
    setTurno(TURNOS.X)
    setGanador(null)
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
    </main>
  )
}

export default App
