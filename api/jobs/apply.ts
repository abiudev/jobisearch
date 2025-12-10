import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { sql } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };

    const { jobId, jobTitle, company, location, jobType, salary, description, jobUrl } = req.body;

    if (!jobId || !jobTitle || !company) {
      return res.status(400).json({ error: 'Job ID, title, and company are required' });
    }

    const result = await sql`
      INSERT INTO applied_jobs (user_id, job_id, job_title, company, location, job_type, salary, description, job_url)
      VALUES (${decoded.userId}, ${jobId}, ${jobTitle}, ${company}, ${location || null}, ${jobType || null}, ${salary || null}, ${description || null}, ${jobUrl || null})
      ON CONFLICT (user_id, job_id) DO NOTHING
      RETURNING id, job_id, job_title, company, applied_at, status
    `;

    if (result.length === 0) {
      return res.status(409).json({ error: 'Job already applied' });
    }

    return res.status(201).json({
      message: 'Job application saved successfully',
      application: result[0],
    });
  } catch (error: any) {
    console.error('Apply job error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
