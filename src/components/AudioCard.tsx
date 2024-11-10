// components/AudioCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AudioCardProps {
  audioUrl: string;
  transcript: string;
  prediction: string;
}

const AudioCard: React.FC<AudioCardProps> = ({ audioUrl, transcript, prediction }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Audio Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <audio controls src={audioUrl} className="w-full mb-4" />
        <div>
          <h3 className="text-lg font-semibold">Transcript</h3>
          <p>{transcript}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">ASR Prediction</h3>
          <p>{prediction}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioCard;
