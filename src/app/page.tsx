import fs from 'fs';
import path from 'path';
import AudioPlayer from './audio';

export default async function Page() {

  const filePath = path.join(process.cwd(), 'public', 'editable.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  const audioItems = await Promise.all(
    data.map(async(audioData: any, index:number) => {
      return {
        ...audioData,
        index: index + 1
      }
    })
  )

  return <AudioPlayer audioItems={audioItems}/>
}

