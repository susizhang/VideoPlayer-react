import { useRef, useEffect } from "react";
import mp4 from "./video/sintel-short.mp4";
import webm from "./video/sintel-short.webm";

export const Player = () => {
  const videoRef = useRef();
  const playRef = useRef();
  const stopRef = useRef();
  const rwdRef = useRef();
  const fwdRef = useRef();
  const timerWrapperRef = useRef();
  const timerRef = useRef();
  const timerBarRef = useRef();

  // console.log(videoRef.current);/
  useEffect(() => {
    console.log(
      videoRef.current,
      playRef.current,
      stopRef.current,
      rwdRef.current,
      fwdRef.current,
      timerWrapperRef.current,
      timerRef.current,
      timerBarRef.current
    );
  }, []);

  function playPauseMedia() {
    rwdRef.current.classList.remove("active");
    fwdRef.current.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    if (videoRef.current.paused) {
      playRef.current.setAttribute("data-icon", "u");
      videoRef.current.play();
    } else {
      playRef.current.setAttribute("data-icon", "P");
      videoRef.current.pause();
    }
  }
  function stopMedia() {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    rwdRef.current.classList.remove("active");
    fwdRef.current.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    videoRef.current.setAttribute("data-icon", "P");
  }

  let intervalFwd;
  let intervalRwd;

  function mediaBackward() {
    clearInterval(intervalFwd);
    fwdRef.current.classList.remove("active");

    if (rwdRef.current.classList.contains("active")) {
      rwdRef.current.classList.remove("active");
      clearInterval(intervalRwd);
      videoRef.current.play();
    } else {
      rwdRef.current.classList.add("active");
      videoRef.current.pause();
      intervalRwd = setInterval(windBackward, 200);
    }
  }

  function mediaForward() {
    clearInterval(intervalRwd);
    rwdRef.current.classList.remove("active");

    if (fwdRef.current.classList.contains("active")) {
      fwdRef.current.classList.remove("active");
      clearInterval(intervalFwd);
      videoRef.current.play();
    } else {
      fwdRef.current.classList.add("active");
      videoRef.current.pause();
      intervalFwd = setInterval(windForward, 200);
    }
  }

  function windBackward() {
    if (videoRef.current.currentTime <= 3) {
      stopMedia();
    } else {
      videoRef.current.currentTime -= 3;
    }
  }

  function windForward() {
    if (videoRef.current.currentTime >= videoRef.current.duration - 3) {
      stopMedia();
    } else {
      videoRef.current.currentTime += 3;
    }
  }

  function setTime() {
    const minutes = Math.floor(videoRef.current.currentTime / 60);
    const seconds = Math.floor(videoRef.current.currentTime - minutes * 60);

    const minuteValue = minutes.toString().padStart(2, "0");
    const secondValue = seconds.toString().padStart(2, "0");

    const mediaTime = `${minuteValue}:${secondValue}`;
    timerRef.current.textContent = mediaTime;

    const barLength =
      timerWrapperRef.current.clientWidth *
      (videoRef.current.currentTime / videoRef.current.duration);
    timerBarRef.current.style.width = `${barLength}px`;
  }

  return (
    <>
      <div className="player">
        <video ref={videoRef} controls={false} onTimeUpdate={setTime}>
          <source src={mp4} autoPlay type="video/mp4" />
          <source src={webm} autoPlay type="video/webm" />/
        </video>
        <div className="controls">
          <button
            ref={playRef}
            onClick={playPauseMedia}
            className="play"
            data-icon="P"
            aria-label="play pause toggle"
          />
          <button
            ref={stopRef}
            onClick={stopMedia}
            className="stop"
            data-icon="S"
            aria-label="stop"
          />
          <div ref={timerWrapperRef} className="timer">
            <div ref={timerBarRef} />
            <span ref={timerRef} aria-label="timer">
              00:00
            </span>
          </div>
          <button
            ref={rwdRef}
            onClick={mediaBackward}
            className="rwd"
            data-icon="B"
            aria-label="rewind"
          />
          <button
            ref={fwdRef}
            onClick={mediaForward}
            className="fwd"
            data-icon="F"
            aria-label="fast forward"
          />
        </div>
      </div>
    </>
  );
};
