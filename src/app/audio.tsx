'use client'; // Ensure this component runs on the client side

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

// Define props type
interface AudioPlayerProps {
  audioItems: {
    index: number;
    mp3_file: string;
    duration: number;
    text: string;
    validated: boolean;
  }[];
  validatedCount: number;
  nonValidatedCount: number;
}

export default function AudioPlayer({ audioItems, validatedCount, nonValidatedCount }: AudioPlayerProps) {
  const [selectedAudioIndex, setSelectedAudioIndex] = useState<number | null>(null);
  const [transcriptText, setTranscriptText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);


  // Function to open dialog with selected index
  const openDialog = (index: number) => {
    setSelectedAudioIndex(index);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setSelectedAudioIndex(null);
  };

  const change_entry = async (index: number, transcript: string) =>
    {
      
      try
      {
        const response = await fetch("/api/changeEntry", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            index: selectedAudioIndex,
            transcript: transcriptText
          })
        })

        if (response.ok)
        {
          console.log("Succesful")
          closeDialog()
          window.location.reload()
        }
      }
      catch (error)
      {
        console.log(error)
        closeDialog()
        window.location.reload()
      }
    }

    const validate = async (index: number) =>
      {
        try
        {
          const response = await fetch("/api/validate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              index: selectedAudioIndex,
            })
          })
  
          if (response.ok)
          {
            console.log("Succesful")
            closeDialog()
            window.location.reload()

          }
        }
        catch (error)
        {
          console.log(error)
          closeDialog()
          window.location.reload()
        }
      }

  // Adjust textarea height based on content
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
  };

  // Handle text change and adjust height
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranscriptText(e.target.value);
  };

  // Set height when text changes or dialog opens
  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight(); // Adjust height when the component mounts or transcript changes
    }
  }, [transcriptText]);



  // Load transcript text when an audio item is selected
  useEffect(() => {
    if (selectedAudioIndex !== null) {
      setTranscriptText(audioItems[selectedAudioIndex - 1].text);
    }
  }, [selectedAudioIndex, audioItems]);

  
    
  return (
    <div className="flex flex-col w-full items-center justify-between">
      <div>
        <h1 className="mt-5 font-bold text-xl">Audio Player</h1>
        <p>Validated: {validatedCount}</p>
        <p>Unvalidated: {nonValidatedCount} </p>
      </div>
      <div className="flex flex-row flex-wrap w-full mt-10">
        {audioItems.map((audioItem) => (
          <Card key={audioItem.index} className="w-[calc(25%-2rem)] ml-4 mt-4 mr-4 mb-4">
            <CardHeader className="flex justify-center items-center">
              <CardTitle>{audioItem.index}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Duration: {audioItem.duration?.toFixed(2)} seconds</p>
            </CardContent>
            <CardFooter className="flex w-full items-center justify-center">
              <Button onClick={() => openDialog(audioItem.index)}>Open</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedAudioIndex !== null && (
        <Dialog open={true} onOpenChange={closeDialog}>
          <DialogContent className="flex flex-col">
            <DialogHeader className="flex items-center justify-between">
              <DialogTitle>Audio Details for Audio {selectedAudioIndex}</DialogTitle>
            </DialogHeader>
            <audio controls>
              <source src={`/noella/Noella/${audioItems[selectedAudioIndex - 1].mp3_file}`} type="audio/mpeg" />
            </audio>
            <div>
              <p>Transcript</p>
              <textarea
                ref={textareaRef}
                value={transcriptText}
                onChange={handleTextChange}
                className="w-full p-2 border outline-blue-500 mt-2"
                spellCheck={false}
                style={{ resize: 'none', overflow: 'hidden' }}
              />
            </div>
            <div className='flex flex-row items-center justify-center'>
              <Button onClick={() => change_entry(selectedAudioIndex, transcriptText)}>Validate</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
