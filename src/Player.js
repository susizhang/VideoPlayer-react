import { useEffect, useState } from "react";
import mp4 from "./video/sintel-short.mp4";
import webm from "./video/sintel-short.webm";

export const Player = () => {
  const [hideControl, setHideControl] = useState(false);
  const media = document.querySelector("video");
  const controls = document.querySelector(".controls");

  const play = document.querySelector(".play");
  const stop = document.querySelector(".stop");
  const rwd = document.querySelector(".rwd");
  const fwd = document.querySelector(".fwd");

  const timerWrapper = document.querySelector(".timer");
  const timer = document.querySelector(".timer span");
  const timerBar = document.querySelector(".timer div");

  useEffect(() => {
    setHideControl(true);
  }, []);

  // media.removeAttribute("controls");
  // controls.style.visibility = "visible";

  // play.addEventListener("click", playPauseMedia);
  // stop.addEventListener("click", stopMedia);
  // media.addEventListener("ended", stopMedia);
  // rwd.addEventListener("click", mediaBackward);
  // fwd.addEventListener("click", mediaForward);
  // media.addEventListener("timeupdate", setTime);

  function playPauseMedia() {
    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    if (media.paused) {
      play.setAttribute("data-icon", "u");
      media.play();
    } else {
      play.setAttribute("data-icon", "P");
      media.pause();
    }
  }

  function stopMedia() {
    media.pause();
    media.currentTime = 0;
    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    play.setAttribute("data-icon", "P");
  }

  let intervalFwd;
  let intervalRwd;

  function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove("active");

    if (rwd.classList.contains("active")) {
      rwd.classList.remove("active");
      clearInterval(intervalRwd);
      media.play();
    } else {
      rwd.classList.add("active");
      media.pause();
      intervalRwd = setInterval(windBackward, 200);
    }
  }

  function mediaForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove("active");

    if (fwd.classList.contains("active")) {
      fwd.classList.remove("active");
      clearInterval(intervalFwd);
      media.play();
    } else {
      fwd.classList.add("active");
      media.pause();
      intervalFwd = setInterval(windForward, 200);
    }
  }

  function windBackward() {
    if (media.currentTime <= 3) {
      stopMedia();
    } else {
      media.currentTime -= 3;
    }
  }

  function windForward() {
    if (media.currentTime >= media.duration - 3) {
      stopMedia();
    } else {
      media.currentTime += 3;
    }
  }

  function setTime() {
    const minutes = Math.floor(media.currentTime / 60);
    const seconds = Math.floor(media.currentTime - minutes * 60);

    const minuteValue = minutes.toString().padStart(2, "0");
    const secondValue = seconds.toString().padStart(2, "0");

    const mediaTime = `${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;

    const barLength =
      timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = `${barLength}px`;
  }

  return (
    <>
      <div className="player">
        <video controls>
          <source src={mp4} autoPlay type="video/mp4" />
          <source src={webm} autoPlay type="video/webm" />
          {/* fallback content here */}
        </video>
        <div className="controls">
          <button
            className="play"
            data-icon="P"
            aria-label="play pause toggle"
          />
          <button className="stop" data-icon="S" aria-label="stop" />
          <div className="timer">
            <div />
            <span aria-label="timer">00:00</span>
          </div>
          <button className="rwd" data-icon="B" aria-label="rewind" />
          <button className="fwd" data-icon="F" aria-label="fast forward" />
        </div>
      </div>
    </>
  );
};
