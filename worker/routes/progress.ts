import { Env } from '../env';
import { getSupabaseClient } from '../lib/supabase';
import { json } from '../lib/response';

export async function handleProgress(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST' && request.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader) {
    return json({ error: 'Missing Authorization header' }, 401);
  }

  const token = authHeader.replace('Bearer ', '');
  const supabase = getSupabaseClient(env, token);

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) {
    return json({ error: 'Unauthorized' }, 401);
  }

  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('user_progress')
      .select('completed_lessons, last_lesson')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      return json({ error: error.message }, 500);
    }
    return json(data || { completed_lessons: [], last_lesson: null });
  }

  if (request.method === 'POST') {
    const body = await request.json() as { completedLessons?: string[]; lastLesson?: string };
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
      return json({ error: error.message }, 500);
    }
    return json({ success: true });
  }

  return json({ error: 'Method not allowed' }, 405);
}
