import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, updateRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const { data: repositories } = await api.get('repositories');

      updateRepositories(repositories);
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `Repository ${new Date()}`,
      author: 'Róger Araújo',
      techs: ["ReactJS", "Node"]
    }

    const { data: repository } = await api.post('repositories', newRepository);

    updateRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    updateRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
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
