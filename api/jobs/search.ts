import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, country = 'us', page = '1', num_pages = '1', date_posted = 'all' } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    if (!process.env.JOBS_API) {
      console.error('JOBS_API is not set');
      return res.status(500).json({ error: 'API configuration error' });
    }

    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: query as string,
        page: page as string,
        num_pages: num_pages as string,
        country: country as string,
        date_posted: date_posted as string,
      },
      headers: {
        'x-rapidapi-key': process.env.JOBS_API,
        'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);

    return res.status(200).json(response.data);
  } catch (error: any) {
    console.error('Job search error:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'Failed to fetch jobs',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
