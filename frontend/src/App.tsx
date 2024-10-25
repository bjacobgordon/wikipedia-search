import { useState } from 'react';

import axios from 'axios';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [presentableResults, setResults] = useState([]);

  const performSearch = async (givenEvent: React.FormEvent) => {
    givenEvent.preventDefault();
    const searchResults = await axios.get('/api/articles', { params: { keyword: searchTerm } });
    setResults(searchResults.data);
  };

  return (
    <div className="container">
      <h1>Wikipedia Search</h1>
      <form onSubmit={performSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={($0) => { setSearchTerm($0.target.value); }}
          placeholder="Search Wikipedia"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {presentableResults.map((result: any) => (
          <li key={result.pageid}>
            <a href={`https://en.wikipedia.org/?curid=${result.pageid}`} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
            <p dangerouslySetInnerHTML={{ __html: result.snippet }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App
