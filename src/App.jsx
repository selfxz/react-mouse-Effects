import { useState,useEffect } from "react"

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x:0,y:0})
  
  // nunca poner dentro de una condicionar un hook
  // sea useEffect o useState etc
  
  // pointer move 
  useEffect(() => {
    console.log("useEffect", {enabled})

    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handleMove',{clientX, clientY})
      setPosition({x:clientX, y:clientY})
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // getEventListener(window) para ver si esta borrando y comenzando denuevo
    // cleanup
    // -> cuando el componete se destruye
    // -> cuando se cambia la dependencias antes de ejecutar el estado
    return () => {
      console.log("cleanup")
      window.removeEventListener('pointermove', handleMove)
    }
  },[enabled])
  
  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  },[enabled])
  // [] -> solo se ejecuta una vez cuando se renderiza el componente
  // [enabled] -> solo se ejecuta cuando cambia la dependencia enabled y se renderiza el componente
  // undefined -> se ejecuta cada vez que se renderiza el componente

  return (
    <>
      <div style={{
        position: "absolute",
        backgroundColor: "rgb(0,0,0,0.5)",
        border: '1px solid #fff',
        borderRadius: "50%",
        opacity: 0.8,
        pointerEvents: 'none',
        left:-20,
        top:-20,
        width: 40,
        height: 40,
        transform: `translate(${position.x}px,${position.y}px)`,
      }} />
      <button onClick={()=> setEnabled(!enabled)}> 
        {enabled ? "Desactivar" : "Activar"}
        seguir puntero
      </button>
    </>
  )
}

function App() {

  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
