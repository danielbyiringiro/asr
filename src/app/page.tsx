"use client"

import { useState } from 'react';
import AudioCard from '../components/AudioCard';
import { Button } from '@/components/ui/button';
import {Input} from '@/components/ui/input'

const Home = () => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>("Sample transcript");
  const [prediction, setPrediction] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);

      // Simulate ASR request
      fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioData: file }),
      })
        .then((res) => res.json())
        .then((data) => setPrediction(data.prediction));
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Audio Transcription Analysis</h1>
      <Input type="file" accept="audio/*" onChange={handleFileChange} />
      <div className="mt-5"></div>
      {audioUrl && <AudioCard audioUrl={audioUrl} transcript={transcript} prediction={prediction} />}
    </div>
  );
};

export default Home;
