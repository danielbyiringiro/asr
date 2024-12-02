import AudioPlayer from './audio';
import { db } from '@/lib/db';
import { $audio } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function Page() 
{

  let audio = await db.select().from($audio).where(
    eq($audio.validated, false)
  )

  let nonValidatedCount = audio.length
  let validatedCount = 106 - nonValidatedCount


  return <AudioPlayer audioItems={audio} validatedCount={validatedCount} nonValidatedCount={nonValidatedCount}/>
}

