// Simple base64 obfuscation (prevents casual viewing)
export function getApiKey(): string {
  // Groq API key stored in parts and base64 encoded
  const parts = [
    "Z3NrX3RtTWFI",
    "SktGUG52cFVK",
    "ZWdrcnpFV0dk",
    "eWIzRllzU3Fh",
    "QzdVV1lmSktk",
    "SkYzRUN3UG9QUFY="
  ];
  return atob(parts.join(""));
}