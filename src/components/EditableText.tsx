import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Check, X } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EditableTextProps {
  id: string;
  defaultValue: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  className?: string;
  multiline?: boolean;
}

export function EditableText({ 
  id, 
  defaultValue, 
  as: Component = "span", 
  className = "",
  multiline = false 
}: EditableTextProps) {
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [tempValue, setTempValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Load saved value from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`editable_${id}`);
    if (saved) {
      setValue(saved);
      setTempValue(saved);
    }
  }, [id]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    setValue(tempValue);
    localStorage.setItem(`editable_${id}`, tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (!isAdmin) {
    return <Component className={className}>{value}</Component>;
  }

  return (
    <span className="relative inline-flex items-center group">
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.span
            key="editing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            {multiline ? (
              <Textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`min-w-[200px] ${className}`}
                rows={4}
              />
            ) : (
              <Input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`min-w-[150px] h-auto py-1 ${className}`}
              />
            )}
            <button
              onClick={handleSave}
              className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
            >
              <Check className="h-3 w-3" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.span>
        ) : (
          <motion.span
            key="display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2"
          >
            <Component className={className}>{value}</Component>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 bg-primary/10 text-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
            >
              <Pencil className="h-3 w-3" />
            </button>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
