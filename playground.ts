import { $audio } from "@/lib/db/schema";
import { db } from "@/lib/db";
import fs from 'fs';
import path from 'path'

interface Audio 
{
    mp3_file: string;
    text: string;
    validated: boolean;
    duration: string
}

const filePath = path.join(process.cwd(), 'public', 'editable.json')
const jsonData = fs.readFileSync(filePath, 'utf8')
const data = JSON.parse(jsonData)
data.map(async (entry: Audio) => 
{
    console.log(entry.mp3_file)
    await db.insert($audio).values({
        mp3_file: entry.mp3_file,
        text: entry.text,
        validated: entry.validated,
        duration: entry.duration
    })
})