

// const startRecordButton = document.getElementById('start-record');
// const stopRecordButton = document.getElementById('stop-record');
// const audioPlayer = document.getElementById('audio-player');

// let mediaRecorder;
// let audioChunks = [];

// startRecordButton.addEventListener('click', async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         audioChunks.push(event.data); 
//       }
//     };
//     mediaRecorder.onstop = () => {
//       const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
//       audioPlayer.src = URL.createObjectURL(audioBlob);
//     };
//     mediaRecorder.start();
//     startRecordButton.disabled = true;
//     stopRecordButton.disabled = false;
//   } catch (error) {
//       console.error('Erro ao acessar o microfone:', error);
//   }
// });

// stopRecordButton.addEventListener('click', () => {
//     mediaRecorder.stop();
//     startRecordButton.disabled = false;
//     stopRecordButton.disabled = true;
// });

