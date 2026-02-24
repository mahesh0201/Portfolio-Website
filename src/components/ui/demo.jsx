import React from "react";
import CelestialMatrixShader from "./martrix-shader";

/**
 * Demo component showcasing the CelestialMatrixShader component
 *
 * This is an example of how to integrate the matrix shader into your React application.
 * The shader creates an interactive, animated matrix rain effect with mouse interaction.
 */
export default function MatrixShaderDemo() {
  return (
    <div className="app-container">
      {/* Shader Background */}
      <CelestialMatrixShader />

      {/* Overlay Content */}
      <div
        className="overlay-content"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          color: "#fff",
          fontFamily: '"Share Tech Mono", monospace',
        }}
      >
        <h1
          className="title"
          style={{
            fontSize: "3rem",
            fontWeight: 900,
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #ffffff 30%, #00f0ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Celestial Matrix
        </h1>
        <p
          className="description"
          style={{
            fontSize: "1.2rem",
            color: "#00f0ff",
            marginBottom: "2rem",
            opacity: 0.8,
          }}
        >
          An Interactive WebGL Shader Experience
        </p>
        <p
          style={{
            fontSize: "0.95rem",
            maxWidth: "600px",
            lineHeight: 1.8,
            opacity: 0.7,
          }}
        >
          This shader demonstrates real-time WebGL rendering with Three.js. Move
          your mouse to interact with the matrix effect. The shader creates a
          dynamic, animated background that responds to user input.
        </p>
      </div>
    </div>
  );
}
