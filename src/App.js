import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function App() {
    const [repositories, setRepositories] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(async () => {
        const response = await fetch(
            "https://api.github.com/users/jchirindza/repos"
        );

        const data = await response.json();

        setRepositories(data);
    }, []);

    useEffect(() => {
        const filtered = repositories.filter((repo) => repo.favorite);
        document.title = `Voce tem ${filtered.length} favoritos`;
    }, [repositories]);

    function handleFavorite(id) {
        const newRepositories = repositories.map((repo) => {
            return repo.id === id
                ? { ...repo, favorite: !repo.favorite }
                : repo;
        });

        setRepositories(newRepositories);
    }

    return (
        <>
            <ul>
                {repositories.map((repo) => (
                    <li key={repo.id}>
                        <a key={repo.id} href={repo.html_url}>
                            {repo.name} ( {repo.stargazers_count} )
                        </a>

                        <label htmlFor="">{repo.description}</label>

                        {repo.favorite && <span>(Favorito)</span>}
                        <button onClick={() => handleFavorite(repo.id)}>
                            Favoritar
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}
