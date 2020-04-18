import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

const techs = ['ReactJS', 'NodeJS', 'React Native', 'Ruby on Rails', 'Python'];
const getRandomTech = () => techs[Math.floor(Math.random() * techs.length)];
const buildNewRepository = () => {
  const repository = {
    title: `Novo projeto ${Date.now()}`,
    url: 'https://urldeexemplo.com.br',
    techs: [getRandomTech(), getRandomTech()],
  };

  return repository;
};

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = buildNewRepository();
    const response = await api.post('repositories', repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id))
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
