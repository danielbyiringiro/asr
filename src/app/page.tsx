import fs from 'fs';
import path from 'path';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} 
from "@/components/ui/card"

export default async function Page() {
  const filePath = path.join(process.cwd(), 'public', 'results.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(jsonData);

  const oneAudio = data[0]

  return (
    <div>
      <h1>Audio Player</h1>
      <pre>{JSON.stringify(oneAudio, null, 2)}</pre>
      <Card className="w-40">
      <CardHeader>
        <CardTitle>Audio</CardTitle>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter className="">
        <Button className="">Open</Button>
      </CardFooter>
    </Card>
    </div>
  );
}

