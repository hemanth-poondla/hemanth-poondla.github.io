import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export const TypingText = ({ 
  text, 
  className = "", 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000 
}: TypingTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const typeSpeed = isDeleting ? deleteSpeed : speed;
    
    if (!isDeleting && displayText === text) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }
    
    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      return;
    }
    
    const timeout = setTimeout(() => {
      setDisplayText(prev => 
        isDeleting 
          ? prev.slice(0, -1) 
          : text.slice(0, prev.length + 1)
      );
    }, typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, text, speed, deleteSpeed, pauseTime]);
  
  // Fixed height container to prevent layout shift
  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};
