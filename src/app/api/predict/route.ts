import { NextResponse } from "next/server";
export async function POST(req: Request) 
{
    return NextResponse.json({audio_id: 5})
}
