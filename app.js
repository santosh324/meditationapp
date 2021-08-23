const app = ()=>{
    const timeSelect = document.querySelectorAll(".time-select button");
    const playing = document.querySelector(".play");
    const replay = document.querySelector(".replay");
    const soundPicker = document.querySelectorAll(".sound-picker button");
    const song = document.querySelector(".song ");
    const video = document.querySelector(".vid-container video");
    const timeDisplay = document.querySelector(".time-display");
    const outline = document.querySelector(".moving-outline circle");
    const outlineLength = outline.getTotalLength();

    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;
    

   let totalTime =  600;
   timeDisplay.textContent = `${Math.floor(totalTime / 60)}:${Math.floor(
    totalTime % 60  )}`;

    timeSelect.forEach(function(time){
        time.addEventListener("click", function(){
            totalTime = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(totalTime / 60)}:${Math.floor(
                totalTime % 60  )}`;
        })
    })

   playing.addEventListener("click", function (){
       checkPlaying(song);
   });

   replay.addEventListener("click", function(){
       restartSong(song);
   });

   const restartSong = (song)=>{
       let currentTime = song.currentTime;
       song.currentTime = 0;
   }
    
   const checkPlaying = (song)=> {
       if(song.paused) {
           song.play();
           video.play();
           playing.src = "./svg/pause.svg";
           

        //    timeDisplay.textContent = `${Math.floor(totalTime / 60)}:${Math.floor(
        //     totalTime % 60  )}`;
       }
       else {
           song.pause();
           video.pause();
           playing.src = "./svg/play.svg";
        //    timeDisplay.textContent = `${Math.floor(totalTime / 60)}:${Math.floor(
        //     totalTime % 60  )}`;
       }
   }

 //sound picker
    soundPicker.forEach(sound =>{
        sound.addEventListener("click", function(){
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);

        })
    })

    song.ontimeupdate = function() {
        let currentTime = song.currentTime;
        let elapsed = totalTime - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        timeDisplay.textContent = `${minutes}:${seconds}`;
        let progress = outlineLength - (currentTime / totalTime) * outlineLength;
        outline.style.strokeDashoffset = progress;
      
        if (currentTime >= fakeDuration) {
          song.pause();
          song.currentTime = 0;
          play.src = "./svg/play.svg";
          video.pause();
        }
      };

}


app();