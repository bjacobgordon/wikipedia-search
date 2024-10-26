import { useState } from 'react';

import axios from 'axios';
import { z } from 'zod';

const z_searchResult = z.object({
  pageid: z.number(),
  title: z.string(),
  snippet: z.string(),
});

type SearchResult = z.infer<typeof z_searchResult>;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [presentableResults, setResults] = useState<SearchResult[]>([]);

  const performSearch = async (givenEvent: React.FormEvent) => {
    givenEvent.preventDefault();
    const unparsedResponse = await axios.get('/api/articles', { params: { keyword: searchTerm } });
    const fetchedResults = z_searchResult.array().parse(unparsedResponse.data);
    setResults(fetchedResults);
  };

  return (
    <div className="container">
      <h1>Wikipedia Search</h1>
      <form onSubmit={($0) => void performSearch($0)}>
        <input
          type="text"
          value={searchTerm}
          onChange={($0) => { setSearchTerm($0.target.value); }}
          placeholder="Search Wikipedia"
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {presentableResults.map((eachResult) => (
          <li key={eachResult.pageid}>
            <a href={`https://en.wikipedia.org/?curid=${eachResult.pageid.toString()}`} target="_blank" rel="noopener noreferrer">
              {eachResult.title}
            </a>
            <p dangerouslySetInnerHTML={{ __html: eachResult.snippet }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App
