import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/repositories");
      setRepositories(response.data);
    };

    fetchData();
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Repository ${Date.now()}`,
      url: `http://www.github.com/frfontoura`,
      techs: ["ReactJs", "NodeJs", "React Native"],
    };

    const response = await api.post("/repositories", repository);

    if (response.status === 201 || response.status === 200) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if(response.status === 204) {
      setRepositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
