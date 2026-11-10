"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  Share2,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import { PushableButton } from "@/components/common/pushable-button";

interface AudioRecorderWidgetProps {
  jobTitle?: string;
  candidateName?: string;
}

export function AudioRecorderWidget({
  jobTitle = "Staf Produksi Makanan Beku",
  candidateName = "Budi Santoso",
}: AudioRecorderWidgetProps) {
  const [recorderState, setRecorderState] = useState<
    "idle" | "recording" | "recorded" | "playing"
  >("idle");
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  // References
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const MAX_DURATION = 60; // 60 seconds (1 minute)

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [audioUrl]);

  // Waveform visualizer effect (pure and bound to recording state lifecycle)
  useEffect(() => {
    if (recorderState !== "recording") return;

    let animId: number;

    const renderFrame = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      let dataArray: Uint8Array<ArrayBuffer> | Uint8Array;
      if (analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const buffer = new ArrayBuffer(bufferLength);
        const uint8 = new Uint8Array(buffer);
        analyserRef.current.getByteFrequencyData(uint8);
        dataArray = uint8;
      } else {
        // Deterministic simulated frequencies using time & sine wave (no impure Math.random during render or frame)
        const now = Date.now();
        const buffer = new ArrayBuffer(32);
        const uint8 = new Uint8Array(buffer);
        for (let i = 0; i < 32; i++) {
          uint8[i] = Math.floor(Math.sin(now / 120 + i * 0.8) * 50 + Math.cos(now / 200 + i * 0.5) * 40) + 90;
        }
        dataArray = uint8;
      }

      ctx.clearRect(0, 0, width, height);

      const barCount = 28;
      const barWidth = 3;
      const totalBarsWidth = barCount * 6;
      const startX = (width - totalBarsWidth) / 2;

      for (let i = 0; i < barCount; i++) {
        const index = Math.floor((i / barCount) * dataArray.length);
        const val = dataArray[index] || 30;
        const percent = val / 255;
        const barHeight = Math.max(6, percent * (height * 0.65));

        const x = startX + i * 6;
        const y = (height - barHeight) / 2;

        // Color gradient for active waveform
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, "#EF4444");
        gradient.addColorStop(0.5, "#C12121");
        gradient.addColorStop(1, "#7F1D1D");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(renderFrame);
    };

    animId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [recorderState]);

  // Start recording
  const startRecording = async () => {
    setErrorMessage(null);
    audioChunksRef.current = [];
    setRecordDuration(0);
    setPlaybackTime(0);

    try {
      if (typeof window !== "undefined" && navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Setup Web Audio Analyser
        try {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const audioCtx = new AudioCtx();
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          audioContextRef.current = audioCtx;
          analyserRef.current = analyser;
        } catch (e) {
          console.warn("AudioContext init error:", e);
        }

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          setRecorderState("recorded");

          // Stop all stream tracks to turn off mic light
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start(250);
        setIsSimulated(false);
      } else {
        // Fallback simulation mode
        setIsSimulated(true);
      }
    } catch (err) {
      console.warn("Mic permission denied or not available, using simulated practice mode:", err);
      setIsSimulated(true);
    }

    setRecorderState("recording");

    // Start Timer
    let seconds = 0;
    timerIntervalRef.current = setInterval(() => {
      seconds += 1;
      setRecordDuration(seconds);

      if (seconds >= MAX_DURATION) {
        stopRecording();
      }
    }, 1000);
  };

  // Stop recording
  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    } else {
      // In simulation mode, create a dummy audio representation
      setRecorderState("recorded");
    }
  };

  // Handle Playback Toggle
  const togglePlayAudio = () => {
    if (!audioElementRef.current && audioUrl) {
      audioElementRef.current = new Audio(audioUrl);
      audioElementRef.current.ontimeupdate = () => {
        if (audioElementRef.current) {
          setPlaybackTime(Math.floor(audioElementRef.current.currentTime));
        }
      };
      audioElementRef.current.onended = () => {
        setRecorderState("recorded");
        setPlaybackTime(0);
      };
    }

    if (recorderState === "playing") {
      audioElementRef.current?.pause();
      setRecorderState("recorded");
    } else {
      if (audioElementRef.current) {
        audioElementRef.current.play().then(() => {
          setRecorderState("playing");
        }).catch((e) => {
          console.warn("Playback error:", e);
        });
      } else {
        // Simulation playback
        setRecorderState("playing");
        let simulatedSecs = 0;
        const dur = recordDuration || 45;
        const playTimer = setInterval(() => {
          simulatedSecs += 1;
          setPlaybackTime(simulatedSecs);
          if (simulatedSecs >= dur) {
            clearInterval(playTimer);
            setRecorderState("recorded");
            setPlaybackTime(0);
          }
        }, 1000);
      }
    }
  };

  // Reset recording
  const resetRecording = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecorderState("idle");
    setRecordDuration(0);
    setPlaybackTime(0);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // WhatsApp share link for Timedoor coach
  const getWhatsAppLink = () => {
    const text = `Halo Admin Timedoor, saya ${candidateName}. Saya sudah merekam latihan Jikoshoukai 1 menit untuk persiapan Interview TSK lowongan "${jobTitle}". Mohon bimbingan dan masukannya. Terima kasih!`;
    return `https://wa.me/6281234567890?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-2.5">
      <h3 className="text-base font-bold text-[#0A0A0A]">
        Rekam latihan jikoshoukai
      </h3>

      <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 shadow-xs space-y-4">
        {/* Dark Screen Recording Area */}
        <div className="relative bg-[#18181B] rounded-[12px] h-[160px] flex flex-col items-center justify-center p-4 border border-neutral-800 overflow-hidden select-none">
          {/* Top Status & Timer Badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-400">
            {recorderState === "recording" ? (
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold text-red-400 tracking-wider">REC</span>
              </div>
            ) : recorderState === "recorded" || recorderState === "playing" ? (
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Rekaman Siap</span>
              </div>
            ) : (
              <span className="text-neutral-500 font-mono">00:00 / 01:00</span>
            )}

            <div className="font-mono text-neutral-300 font-semibold">
              {recorderState === "recording"
                ? `${formatTime(recordDuration)} / 01:00`
                : recorderState === "playing"
                ? `${formatTime(playbackTime)} / ${formatTime(recordDuration || 45)}`
                : recorderState === "recorded"
                ? `${formatTime(recordDuration || 45)}`
                : "Maks. 60 dtk"}
            </div>
          </div>

          {/* Central Visualizer / Big Mic Button */}
          {recorderState === "idle" && (
            <div className="flex flex-col items-center justify-center gap-2 mt-2">
              <button
                type="button"
                onClick={startRecording}
                className="w-14 h-14 rounded-full bg-[#C12121] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                aria-label="Mulai rekam"
              >
                <Mic className="w-7 h-7" />
              </button>
              <span className="text-[11px] text-neutral-400 font-medium">
                Ketuk mikrofon untuk mulai
              </span>
              {errorMessage && (
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-medium mt-0.5">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  {errorMessage}
                </span>
              )}
            </div>
          )}

          {recorderState === "recording" && (
            <div className="flex flex-col items-center justify-center w-full h-full pt-4">
              <canvas
                ref={canvasRef}
                width={260}
                height={70}
                className="w-full max-w-[260px] h-[70px]"
              />
              <span className="text-[11px] text-red-300/80 animate-pulse mt-1">
                Sedang merekam... Berbicaralah dengan jelas
              </span>
              {isSimulated && (
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-medium bg-amber-950/60 px-2 py-0.5 rounded-full mt-1 border border-amber-800/60">
                  <AlertCircle className="w-2.5 h-2.5" />
                  Mode simulasi mic
                </span>
              )}
            </div>
          )}

          {(recorderState === "recorded" || recorderState === "playing") && (
            <div className="flex flex-col items-center justify-center gap-2.5 w-full pt-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlayAudio}
                  className="w-12 h-12 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center shadow-md hover:bg-neutral-100 active:scale-95 transition-all cursor-pointer"
                  aria-label={recorderState === "playing" ? "Jeda rekaman" : "Putar rekaman"}
                >
                  {recorderState === "playing" ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={resetRecording}
                  className="w-9 h-9 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 flex items-center justify-center transition-all cursor-pointer"
                  title="Rekam ulang"
                  aria-label="Rekam ulang"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Scrubber */}
              <div className="w-full max-w-[200px] h-1.5 bg-neutral-800 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{
                    width: `${
                      recordDuration
                        ? (playbackTime / recordDuration) * 100
                        : (playbackTime / 45) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Button Below Screen */}
        <div className="space-y-2">
          {recorderState === "idle" && (
            <PushableButton
              onClick={startRecording}
              size="lg"
              fullWidth
              className="w-full"
            >
              <div className="flex items-center justify-center gap-2">
                <Mic className="w-4 h-4" />
                <span>Mulai rekam (1 menit)</span>
              </div>
            </PushableButton>
          )}

          {recorderState === "recording" && (
            <PushableButton
              onClick={stopRecording}
              size="lg"
              variant="secondary"
              fullWidth
              className="w-full border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
            >
              <div className="flex items-center justify-center gap-2">
                <Square className="w-4 h-4 fill-current" />
                <span>Selesai & Simpan Rekaman</span>
              </div>
            </PushableButton>
          )}

          {(recorderState === "recorded" || recorderState === "playing") && (
            <div className="space-y-2">
              <PushableButton
                href={getWhatsAppLink()}
                size="lg"
                fullWidth
                className="w-full"
              >
                <div className="flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span>Kirim ke Timedoor via WA</span>
                </div>
              </PushableButton>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={resetRecording}
                  className="text-xs font-semibold text-[#64748B] hover:text-[#C12121] flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rekam ulang</span>
                </button>

                {audioUrl && (
                  <a
                    href={audioUrl}
                    download={`Jikoshoukai_${candidateName.replace(/\s+/g, "_")}.webm`}
                    className="text-xs font-semibold text-[#64748B] hover:text-[#0A0A0A] flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh audio</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Caption text */}
        <p className="text-xs text-[#64748B] text-center leading-relaxed">
          Rekaman bisa dikirim ke tim Timedoor untuk dapat masukan.
        </p>
      </div>
    </div>
  );
}
