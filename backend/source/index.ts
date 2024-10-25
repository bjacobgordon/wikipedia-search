import express from 'express';

import axios from 'axios';

const isString = (givenSubject: unknown): givenSubject is string => {
  return (typeof givenSubject === 'string');
}

const isEmpty = (givenSubject: string): boolean => {
  return (givenSubject.length === 0);
}

const isTrivial = (givenSubject: string): boolean => {
  const trimmedSubject = givenSubject.trim();
  return isEmpty(trimmedSubject);
}

function asError(givenSubject: unknown): Error {
  if (givenSubject instanceof Error) return givenSubject;
  
  if (typeof givenSubject === 'string') return new Error(givenSubject);

  return new Error(JSON.stringify(givenSubject));
}

const app = express();

const isSearchTerm = (givenSubject: unknown): givenSubject is string => {
  return isString(givenSubject) && !isTrivial(givenSubject);
}

app.get('/api/articles', async (incomingRequest, outgoingResponse) => {
  const { keyword } = incomingRequest.query;

  if (!isSearchTerm(keyword)) return void outgoingResponse.status(400).send('Valid search term is required');

  try {
    const searchResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        list: 'search',
        srsearch: keyword,
        format: 'json',
      },
    });

    const articlesForSearch = searchResponse.data.query.search;
    outgoingResponse.json(articlesForSearch);
  } catch (exception) {
    const error = asError(exception);
    outgoingResponse.status(500).send(error.message);
  }
});

app.listen(3001);
