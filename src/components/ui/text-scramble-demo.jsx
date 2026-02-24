import React, { useState } from "react";
import { TextScramble } from "./text-scramble";
import { Box } from "@mui/material";

export function BasicDemo() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <TextScramble
        sx={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: "0.9rem",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        Text Scramble
      </TextScramble>
    </Box>
  );
}

export function CustomTriggerDemo() {
  const [isTrigger, setIsTrigger] = useState(false);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="a"
        href="#"
        onMouseEnter={() => setIsTrigger(true)}
        sx={{
          color: "rgba(0, 240, 255, 0.6)",
          transition: "color 0.3s",
          cursor: "pointer",
          textDecoration: "none",
          "&:hover": {
            color: "#00f0ff",
          },
        }}
      >
        <TextScramble
          sx={{
            fontSize: "0.95rem",
            fontFamily: '"Share Tech Mono", monospace',
          }}
          as="span"
          speed={0.01}
          trigger={isTrigger}
          onScrambleComplete={() => setIsTrigger(false)}
        >
          Cybersecurity Engineer
        </TextScramble>
      </Box>
    </Box>
  );
}

export function CustomCharacterDemo() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <TextScramble
        sx={{
          fontFamily: '"Share Tech Mono", monospace',
          fontSize: "0.85rem",
          color: "#00ff88",
        }}
        duration={1.2}
        characterSet=". "
      >
        Generating the interface...
      </TextScramble>
    </Box>
  );
}
