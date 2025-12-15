import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the user's JWT from the Authorization header
  const authHeader = req.headers['authorization'] as string;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');

  // Create a Supabase client with the user's token
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  // Verify the user with the token
  const { data: { user }, error: userError } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    // Fetch progress
    const { data, error } = await supabase
      .from('user_progress')
      .select('completed_lessons, last_lesson')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data || { completed_lessons: [], last_lesson: null });
  }

  if (req.method === 'POST') {
    // Update progress
    const body = req.body as { completedLessons?: string[]; lastLesson?: string };
    const { completedLessons, lastLesson } = body;

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        completed_lessons: completedLessons,
        last_lesson: lastLesson,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  }
}

