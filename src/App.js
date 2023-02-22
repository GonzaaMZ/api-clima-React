import { Fragment, useEffect, useState } from "react";
import Clima from "./components/Clima";
import Error from "./components/Error";
import Formulario from "./components/Formulario";
import Header from "./components/Header";

function App() {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = process.env.REACT_APP_OPEN_WHEATER_API;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}
        `;
        const response = await fetch(url);
        const result = await response.json();
        setResultado(result);
        setConsultar(false);

        //Valida si hay resultados
        if (result.cod === '404') {
          setError(true)
        } else {
          setError(false);
        }
      }
    };
    consultarAPI();
    //eslint-disable-next-line
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados"/>
  } else {
    componente =  <Clima resultado={resultado} />
  }

  return (
    <Fragment>
      <Header title="ClimApp" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
              </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
