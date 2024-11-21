import fs from 'fs';
import path from 'path';
import AudioPlayer from './audio';

export default async function Page() {

  const filePath = path.join(process.cwd(), 'public', 'editable.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  let validatedCount = 0
  let nonValidatedCount = 0

  const audioItems = await Promise.all(
    data.map(async(audioData: any, index:number) => 
    {
      if (audioData.validated)
      {
        validatedCount ++;
        return null;
      }
      else
      {
        nonValidatedCount ++;
        return {
          ...audioData,
          index: index + 1
        }
      }
    })
  )

  const nonValidatedAudioItems = audioItems.filter(item => item !== null)

  return <AudioPlayer audioItems={nonValidatedAudioItems} validatedCount={validatedCount} nonValidatedCount={nonValidatedCount}/>
}

