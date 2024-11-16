#!/bin/bash

# Function to calculate audio duration using ffmpeg
get_audio_duration() {
    local audio_file=$1
    ffmpeg -i "$audio_file" 2>&1 | grep "Duration" | awk '{print $2}' | tr -d ,
}

# Function to clean text (remove punctuation and convert to lowercase)
clean_text() {
    local text=$1
    echo "$text" | tr -d '[:punct:]' | tr '[:upper:]' '[:lower:]'
}

# Function to process each entry
process_entry() {
    local mp3_file=$1
    local txt_file=$2
    local text=$3
    local transcript=$4
    local wer=$5

    # Calculate audio duration
    duration=$(get_audio_duration "$mp3_file")

    # Clean the text and transcript
    cleaned_text=$(clean_text "$text")
    cleaned_transcript=$(clean_text "$transcript")

    # Initially set validated to False
    validated="False"

    # Validation logic: if WER is below 0.4, mark as validated
    if (( $(echo "$wer < 0.4" | bc -l) )); then
        validated="True"
    fi

    # Output the results in JSON-like format
    echo "{
      \"mp3_file\": \"$mp3_file\",
      \"txt_file\": \"$txt_file\",
      \"text\": \"$cleaned_text\",
      \"transcript\": \"$cleaned_transcript\",
      \"WER\": $wer,
      \"duration\": \"$duration\",
      \"validated\": \"$validated\"
    }"
}

# Read the editable.json file
file_path="public/editable.json"
if [[ ! -f "$file_path" ]]; then
  echo "Error: File $file_path not found!"
  exit 1
fi

# Parse and process each entry in the JSON file
jq -c '.[]' "$file_path" | while read entry; do
  mp3_file=$(echo "$entry" | jq -r '.mp3_file')
  txt_file=$(echo "$entry" | jq -r '.txt_file')
  text=$(echo "$entry" | jq -r '.text')
  transcript=$(echo "$entry" | jq -r '.transcript')
  wer=$(echo "$entry" | jq -r '.WER')

  # Process the entry
  process_entry "$mp3_file" "$txt_file" "$text" "$transcript" "$wer"
done

