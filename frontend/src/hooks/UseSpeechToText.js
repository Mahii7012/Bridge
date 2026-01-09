export function startListening(setText) {
  const recognition = new window.webkitSpeechRecognition();
  recognition.onresult = (e) => {
    setText(e.results[0][0].transcript);
  };
  recognition.start();
}
