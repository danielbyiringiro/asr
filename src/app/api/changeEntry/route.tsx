import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const change_entry = (index_file: number, transcript: string) =>
{
    const filePath = path.join(process.cwd(), 'public', 'editable.json')
    const jsonData = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(jsonData)
    const entry = data[index_file - 1]
    entry.text = transcript
    entry.validated = true
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function POST(req: Request)
{
    const {index, transcript} = await req.json();
    change_entry(index, transcript)
    return NextResponse.json({success: true}, { status: 200 });
}