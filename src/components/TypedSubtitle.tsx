"use client";

import React, { useState, useEffect } from "react";

export default function TypedSubtitle() {
  const phrases = [
    "Co-Founder & CTO @ Stack Education",
    "AI/ML Engineer & Full-Stack Developer",
    "4x Hackathon Winner",
    "Building the Future with Generative AI",
    "General Secretary @ GM University",
  ];

  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const curPhrase = phrases[phraseIdx];

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          // Deleting
          setText(curPhrase.substring(0, charIdx - 1));
          setCharIdx((prev) => prev - 1);

          if (charIdx - 1 < 0) {
            setIsDeleting(false);
            setPhraseIdx((prev) => (prev + 1) % phrases.length);
          }
        } else {
          // Typing
          setText(curPhrase.substring(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);

          if (charIdx + 1 > curPhrase.length) {
            // Wait 2 seconds before starting deletion
            setTimeout(() => setIsDeleting(true), 2000);
          }
        }
      },
      isDeleting ? 30 : 55
    );

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  return (
    <>
      <span>{text}</span>
      <span className="typed-cursor">|</span>
    </>
  );
}
