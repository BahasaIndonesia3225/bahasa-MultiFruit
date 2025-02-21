export function playAudio(url, playbackRate) {

  console.log(url, playbackRate)

  const audio = new Audio();
  audio.src = url;
  audio.addEventListener('canplaythrough', () => {
    audio.playbackRate = playbackRate;
    audio.play()
  })
  audio.load()
}
