import React, { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import * as d3 from "d3";

// Cyber attack locations - showing attacks and defenses in progress
const cyberAttackPoints = [
  { coords: [-74.006, 40.7128], city: "New York", type: "attacked" },
  { coords: [139.6917, 35.6895], city: "Tokyo", type: "attacked" },
  { coords: [2.3522, 48.8566], city: "Paris", type: "defending" },
  { coords: [-43.1729, -22.9068], city: "Rio de Janeiro", type: "defended" },
  { coords: [0, 51.5074], city: "London", type: "attacked" },
  { coords: [77.1025, 28.6139], city: "Delhi", type: "defending" },
  { coords: [-118.2437, 34.0522], city: "Los Angeles", type: "defended" },
  { coords: [151.2093, -33.8688], city: "Sydney", type: "attacked" },
  { coords: [114.0688, 22.3193], city: "Hong Kong", type: "defending" },
  { coords: [-0.1278, 51.5074], city: "London", type: "attacked" },
];

export function WireframeGlobe({ width = 420, height = 420, className = "" }) {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set up responsive dimensions
    const containerWidth = width;
    const containerHeight = height;
    const radius = Math.min(containerWidth, containerHeight) / 2.5;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    // Create projection and path generator for Canvas
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point, polygon) => {
      const [x, y] = point;
      let inside = false;

      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }

      return inside;
    };

    const pointInFeature = (point, feature) => {
      const geometry = feature.geometry;

      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        // Check if point is in outer ring
        if (!pointInPolygon(point, coordinates[0])) {
          return false;
        }
        // Check if point is in any hole (inner rings)
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) {
            return false; // Point is in a hole
          }
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        // Check each polygon in the MultiPolygon
        for (const polygon of geometry.coordinates) {
          // Check if point is in outer ring
          if (pointInPolygon(point, polygon[0])) {
            // Check if point is in any hole
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) {
              return true;
            }
          }
        }
        return false;
      }

      return false;
    };

    const generateDotsInPolygon = (feature, dotSpacing = 16) => {
      const dots = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;

      const stepSize = dotSpacing * 0.08;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }

      return dots;
    };

    const allDots = [];
    let landFeatures = null;

    const render = () => {
      // Clear canvas
      context.clearRect(0, 0, containerWidth, containerHeight);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Draw ocean (globe background) - Cyan themed
      context.beginPath();
      context.arc(
        containerWidth / 2,
        containerHeight / 2,
        currentScale,
        0,
        2 * Math.PI,
      );
      context.fillStyle = "#0a0a0f";
      context.fill();
      context.strokeStyle = "#00f0ff";
      context.lineWidth = 2 * scaleFactor;
      context.globalAlpha = 0.6;
      context.stroke();
      context.globalAlpha = 1;

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "#00f0ff";
        context.lineWidth = 0.8 * scaleFactor;
        context.globalAlpha = 0.15;
        context.stroke();
        context.globalAlpha = 1;

        // Draw land outlines
        context.beginPath();
        landFeatures.features.forEach((feature) => {
          path(feature);
        });
        context.strokeStyle = "#00ff88";
        context.lineWidth = 1.2 * scaleFactor;
        context.globalAlpha = 0.8;
        context.stroke();
        context.globalAlpha = 1;

        // Draw halftone dots - Cyan themed
        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath();
            context.arc(
              projected[0],
              projected[1],
              1.5 * scaleFactor,
              0,
              2 * Math.PI,
            );
            context.fillStyle = "#00f0ff";
            context.globalAlpha = 0.7;
            context.fill();
            context.globalAlpha = 1;
          }
        });

        // Draw cyber attack points with lifecycle
        const time = Date.now() / 1000;
        cyberAttackPoints.forEach((point, pointIndex) => {
          const projected = projection(point.coords);

          // Check if point is visible on the globe
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            // Cycle through states: attacked → defending → defended (6 second cycle)
            const cycleTime = (time + pointIndex * 1.5) % 6;
            let state = "attacked";
            if (cycleTime > 2) state = "defending";
            if (cycleTime > 4) state = "defended";

            const stateProgress = cycleTime % 2; // 0-2 second progress within current state

            if (state === "attacked") {
              // RED ATTACK STATE - Blasts and explosions
              const blastPulse =
                Math.sin(stateProgress * Math.PI * 2) * 0.5 + 0.5;

              // Outer blast ring
              context.beginPath();
              context.arc(
                projected[0],
                projected[1],
                15 * scaleFactor * blastPulse,
                0,
                2 * Math.PI,
              );
              context.strokeStyle = `rgba(255, 0, 0, ${(1 - blastPulse) * 0.7})`;
              context.lineWidth = 2 * scaleFactor;
              context.stroke();

              // Inner blast ring
              context.beginPath();
              context.arc(
                projected[0],
                projected[1],
                8 * scaleFactor * blastPulse,
                0,
                2 * Math.PI,
              );
              context.strokeStyle = `rgba(255, 100, 0, ${(1 - blastPulse) * 0.6})`;
              context.lineWidth = 1.5 * scaleFactor;
              context.stroke();

              // Core attack point
              context.beginPath();
              context.arc(
                projected[0],
                projected[1],
                4 * scaleFactor,
                0,
                2 * Math.PI,
              );
              context.fillStyle = `rgba(255, 0, 0, ${0.8})`;
              context.fill();

              // Attack indicator text
              context.globalAlpha = 0.8;
              context.font = `${10 * scaleFactor}px Arial`;
              context.fillStyle = "#ff0000";
              context.textAlign = "center";
              context.textBaseline = "bottom";
              context.fillText(
                "⚠",
                projected[0],
                projected[1] - 10 * scaleFactor,
              );
              context.globalAlpha = 1;
            } else if (state === "defending") {
              // YELLOW/ORANGE DEFENDING STATE - Shield appearing
              const shieldGrowth = stateProgress / 2; // 0-1 during the 2 second defending phase

              // Outer shield ring growing
              context.beginPath();
              context.arc(
                projected[0],
                projected[1],
                12 * scaleFactor * shieldGrowth,
                0,
                2 * Math.PI,
              );
              context.strokeStyle = `rgba(255, 200, 0, ${0.7 * (1 - shieldGrowth * 0.5)})`;
              context.lineWidth = 2 * scaleFactor;
              context.stroke();

              // Core staying red but brightening
              context.beginPath();
              context.arc(
                projected[0],
                projected[1],
                4 * scaleFactor,
                0,
                2 * Math.PI,
              );
              context.fillStyle = `rgba(255, 100, 0, ${0.7})`;
              context.fill();

              // Transition indicator
              context.globalAlpha = 0.8;
              context.font = `${10 * scaleFactor}px Arial`;
              context.fillStyle = "#ffcc00";
              context.textAlign = "center";
              context.textBaseline = "bottom";
              context.fillText(
                "◐",
                projected[0],
                projected[1] - 10 * scaleFactor,
              );
              context.globalAlpha = 1;
            } else if (state === "defended") {
              // GREEN DEFENDED STATE - Shield active and pulsing
              const defensePulse =
                Math.sin(stateProgress * Math.PI * 2) * 0.3 + 0.7;

              // Shield halo (outer pulsing ring)
              context.beginPath();
              context.arc(
                projected[0],
                projected[1],
                16 * scaleFactor * defensePulse,
                0,
                2 * Math.PI,
              );
              context.strokeStyle = `rgba(0, 255, 136, ${(1 - defensePulse * 0.3) * 0.6})`;
              context.lineWidth = 2 * scaleFactor;
              context.stroke();

              // Main shield ring
              context.beginPath();
              context.arc(
                projected[0],
                projected[1],
                12 * scaleFactor,
                0,
                2 * Math.PI,
              );
              context.strokeStyle = `rgba(0, 255, 136, 0.8)`;
              context.lineWidth = 1.5 * scaleFactor;
              context.stroke();

              // Protected point - glowing green
              context.beginPath();
              context.arc(
                projected[0],
                projected[1],
                4 * scaleFactor,
                0,
                2 * Math.PI,
              );
              context.fillStyle = `rgba(0, 255, 136, 0.9)`;
              context.fill();

              // Inner glow
              context.beginPath();
              context.arc(
                projected[0],
                projected[1],
                2 * scaleFactor,
                0,
                2 * Math.PI,
              );
              context.fillStyle = `rgba(255, 255, 255, 0.6)`;
              context.fill();

              // Shield indicator text
              context.globalAlpha = 0.9;
              context.font = `${10 * scaleFactor}px Arial`;
              context.fillStyle = "#00ff88";
              context.textAlign = "center";
              context.textBaseline = "bottom";
              context.fillText(
                "✓",
                projected[0],
                projected[1] - 10 * scaleFactor,
              );
              context.globalAlpha = 1;
            }
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json",
        );
        if (!response.ok) throw new Error("Failed to load land data");

        landFeatures = await response.json();

        // Generate dots for all land features
        landFeatures.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach(([lng, lat]) => {
            allDots.push({ lng, lat, visible: true });
          });
        });

        render();
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load globe data");
        setIsLoading(false);
      }
    };

    // Set up rotation and interaction
    const rotation = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.5;

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      }
    };

    // Auto-rotation timer
    const rotationTimer = d3.timer(rotate);

    const handleMouseDown = (event) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...rotation];

      const handleMouseMove = (moveEvent) => {
        const sensitivity = 0.5;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        setTimeout(() => {
          autoRotate = true;
        }, 10);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const newRadius = Math.max(
        radius * 0.5,
        Math.min(radius * 3, projection.scale() * scaleFactor),
      );
      projection.scale(newRadius);
      render();
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("wheel", handleWheel);

    // Load the world data
    loadWorldData();

    // Cleanup
    return () => {
      rotationTimer.stop();
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [width, height]);

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(10, 10, 15, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 240, 255, 0.2)",
          borderRadius: 2,
          p: 3,
          minHeight: 300,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        background: "rgba(10, 10, 15, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1.5px solid rgba(0, 240, 255, 0.3)",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow:
          "0 20px 60px rgba(0, 240, 255, 0.15), inset 0 0 40px rgba(0, 240, 255, 0.05)",
      }}
    >
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <CircularProgress sx={{ color: "#00f0ff" }} />
        </Box>
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          cursor: "grab",
          width: "100%",
          height: "auto",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: 16,
          fontSize: "0.75rem",
          color: "rgba(0, 240, 255, 0.6)",
          fontFamily: '"Share Tech Mono", monospace',
          background: "rgba(10, 10, 15, 0.8)",
          px: 1.5,
          py: 0.75,
          borderRadius: 1,
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 240, 255, 0.2)",
        }}
      >
        Drag to rotate • Scroll to zoom
      </Box>
    </Box>
  );
}

export default WireframeGlobe;
