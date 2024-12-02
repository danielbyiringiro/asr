import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { $audio } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

async function change_entry(id: number, transcript: string) 
{
    await db.update($audio)
    .set({text: transcript, validated: true})
    .where(
        eq($audio.id, id)
    )
}

export async function POST(req: Request)
{
    const {id, transcript} = await req.json();
    await change_entry(id, transcript);
    return NextResponse.json({success: true}, { status: 200 });
}