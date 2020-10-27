import React from "react";
import api from './services/api'
import "./styles.css";
import { useEffect, useState } from "react";

function App() {
  const [repositories, setRepository] = useState([])
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepository(response.data)
    }).catch(error => {
      console.log(error);
    })
  }, [])
  async function handleAddRepository() {
    const body = {
      title: `Desafio Node.js ${Date.now()}`,
      url: "http://github.com/...",
      techs: ["Node.js", "..."]
    }
    api.post('/repositories',body).then(response => {
      const newRepository = response.data
      setRepository([...repositories, newRepository])
    }).catch(error => {
      console.log(error);
    })

  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      const elementIndex = repositories.findIndex((repository) => (repository.id === id))
      const array = [...repositories]
      array.splice(elementIndex, 1)
      setRepository(array)
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
