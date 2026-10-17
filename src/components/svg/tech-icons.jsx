import React from "react";

export function ReactIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-11.5 -10.23174 23 20.46348"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

export function TypeScriptIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="128" height="128" rx="16" fill="#3178C6" />
      <path
        d="M68.5 86.8c1.8 1.8 4.2 2.8 7.2 2.8 3.8 0 6.5-1.7 6.5-5.3 0-3.3-2.1-4.7-6.9-6.8l-3.3-1.4c-6.8-2.9-10.7-7-10.7-14.7 0-9.6 7.6-16.4 19.3-16.4 7.2 0 13.5 2.5 17.6 6.7l-5.6 6.8c-3.1-2.9-7.1-4.6-11.8-4.6-5 0-7.8 2.5-7.8 5.4 0 3 1.9 4.3 6.6 6.4l3.3 1.4c7.6 3.2 11.4 7.4 11.4 15.3 0 10.7-8.3 17-21.2 17-8.6 0-16.1-3.2-20.4-8.1l5.8-6.5zM22 55.4h37v9.4H45.7v45.8H35V64.8H22v-9.4z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PythonIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M63.5 11c-14.3 0-24.1 6.2-24.1 18.2v13.7h24.7v3.5H24.3c-12 0-22.3 7.3-22.3 21.3 0 14.2 9.7 21.6 22.3 21.6h7.1v-10.2c0-11.7 9.8-22 22.3-22h24.5V43.4c0-11.8-10.4-20.7-22.2-21.4l-12.5-11zm-9.3 6.9c2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2-2.3 0-4.2-1.9-4.2-4.2 0-2.3 1.9-4.2 4.2-4.2z"
        fill="#3776AB"
      />
      <path
        d="M64.5 117c14.3 0 24.1-6.2 24.1-18.2v-13.7H63.9v-3.5h39.8c12 0 22.3-7.3 22.3-21.3 0-14.2-9.7-21.6-22.3-21.6h-7.1v10.2c0 11.7-9.8 22-22.3 22H39.8v12.7c0 11.8 10.4 20.7 22.2 21.4l12.5 11zm9.3-6.9c-2.3 0-4.2-1.9-4.2-4.2 0-2.3 1.9-4.2 4.2-4.2 2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2z"
        fill="#FFD43B"
      />
    </svg>
  );
}

export function PyTorchIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M66.4 15.6a5.7 5.7 0 0 0-4.7 0L24.8 32.8a5.7 5.7 0 0 0-3.5 5.3v42.9a43.5 43.5 0 0 0 71.9 33.2 5.7 5.7 0 0 0-7.3-8.8 32 32 0 0 1-53.1-24.4V41.4l31.2-13.6 31.2 13.6v33.7l-9.8-4.3a5.7 5.7 0 0 0-7.7 2.7 5.7 5.7 0 0 0 2.7 7.7l16.1 7a5.7 5.7 0 0 0 8.1-5.2V38.1a5.7 5.7 0 0 0-3.5-5.3L66.4 15.6z"
        fill="#EE4C2C"
      />
      <circle cx="86.9" cy="22.5" r="5.7" fill="#EE4C2C" />
    </svg>
  );
}

export function TanStackIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="64" cy="64" r="60" fill="#000000" />
      <circle cx="64" cy="64" r="56" fill="url(#tanstack-grad)" />
      <path d="M34 46h60v12H69v36H53V58H34V46z" fill="#FFFFFF" />
      <defs>
        <linearGradient
          id="tanstack-grad"
          x1="0"
          y1="0"
          x2="128"
          y2="128"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF4154" />
          <stop offset="0.5" stopColor="#FFB340" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function TailwindIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32 44c6.7-10 16.7-14.7 30-14 18.7 1 27.7 12.3 35.7 23.3 6.5 9 13.5 18.7 26.3 18.7 10.7 0 19-5.7 26-17-6.7 10-16.7 14.7-30 14-18.7-1-27.7-12.3-35.7-23.3C77.8 36.7 70.8 27 58 27 47.3 27 39 32.7 32 44zm-32 40c6.7-10 16.7-14.7 30-14 18.7 1 27.7 12.3 35.7 23.3 6.5 9 13.5 18.7 26.3 18.7 10.7 0 19-5.7 26-17-6.7 10-16.7 14.7-30 14-18.7-1-27.7-12.3-35.7-23.3C45.8 76.7 38.8 67 26 67 15.3 67 7 72.7 0 84z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export function ViteIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M117.8 19.3 68.3 118a5.2 5.2 0 0 1-9.4.1L10.2 20.3a5.2 5.2 0 0 1 6.8-7.1l49.8 22.9a5.2 5.2 0 0 0 4.4 0l40.1-22.9a5.2 5.2 0 0 1 6.5 6.1z"
        fill="url(#vite-grad-1)"
      />
      <path
        d="m84.7 9.8-49 24.8a2.6 2.6 0 0 0-1.4 2.8l7.5 45a2.6 2.6 0 0 0 4.3 1.5L62.7 67a2.6 2.6 0 0 1 4.2 2.3l-2.4 23a2.6 2.6 0 0 0 4.6 2l32.4-44.5a2.6 2.6 0 0 0-2.4-4.1l-18.4.3a2.6 2.6 0 0 1-2.4-3.5L84.7 9.8z"
        fill="url(#vite-grad-2)"
      />
      <defs>
        <linearGradient
          id="vite-grad-1"
          x1="16.5"
          y1="12"
          x2="89.5"
          y2="105"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#41D1FF" />
          <stop offset="1" stopColor="#BD34FE" />
        </linearGradient>
        <linearGradient
          id="vite-grad-2"
          x1="57"
          y1="18.5"
          x2="90"
          y2="92"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFEA83" />
          <stop offset="0.08" stopColor="#FFDD35" />
          <stop offset="1" stopColor="#FFA800" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FramerMotionIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h128v64H64zM0 64h64l64 64H0zM64 64h64v64z" fill="#0055FF" />
    </svg>
  );
}

export function DockerIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M125.7 54.8c-2.4-1.7-8-1.5-12.4.6-2.5-7.7-8.8-12.1-17.7-12.2-.6 0-1.2 0-1.8.1-1.3-9.5-8.4-15.1-18.7-15.1-1.5 0-3 .1-4.5.4a43.5 43.5 0 0 0-4.7 8.3H56.5V25H42.7v11.9H29.1V25H15.3v11.9H2V51h64.1c1.5 0 3 .1 4.5.3 4.2.6 8.3 2.1 11.8 4.4 7.5 4.9 12.3 12.8 13.4 22.3 7.8 3.7 17.6 2.3 23.3-3.4 3.9-3.9 6.2-9.6 6.6-15.2.1-1.6 0-3.3 0-4.6zM29.1 51H15.3V39.2h13.8V51zm13.6 0H29.1V39.2h13.6V51zm13.8 0H42.7V39.2h13.8V51zm13.7 0H56.5V39.2h13.7V51zm13.7 0H70.2V39.2h13.7V51zm-70.1 0H0v13.5h13.8V51z"
        fill="#2496ED"
      />
      <path
        d="M114.2 70.8c-2.7 15.6-16.7 27.2-32.9 27.2-2.3 0-4.6-.2-6.9-.7-10.4-2.2-19.1-8.5-25.1-17.3-6.1-9-8.4-19.6-6.6-30H2v6.6c0 24.3 19.8 44.1 44.1 44.1 19.3 0 35.8-12.4 41.8-29.9z"
        fill="#2496ED"
      />
    </svg>
  );
}

export function FastApiIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="64" cy="64" r="60" fill="#009688" />
      <path d="M66.5 24 37 71.5h23.5L54 104l37-47.5H67.5L74 24h-7.5z" fill="#FFFFFF" />
    </svg>
  );
}

export function PostgreSQLIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52S92.7 12 64 12zm25.8 45.4c-.6 4.3-2.6 8.3-5.7 11.3l-.2.2c1.9 4.3 2.1 9.2.4 13.6-1.5 3.9-4.7 7-8.7 8.5-4 1.5-8.6 1.3-12.4-.7l-.3.2c-3.1 6.3-9.5 10.3-16.5 10.3-4.4 0-8.6-1.5-12-4.3l-.3.3c-2.4 2.4-5.6 3.7-9 3.7h-.2c-3.4 0-6.6-1.3-9-3.7l-.3-.3c-4.9-4.9-4.9-12.8 0-17.7l.2-.2c-.3-1.6-.4-3.3-.4-5 0-9.4 4.5-18.1 12.2-23.6 7.7-5.5 17.5-7.3 26.8-4.8l.2-.2c3.4-3.4 8.1-5.3 12.9-5.3h.2c4.8 0 9.5 1.9 12.9 5.3 4.2 4.2 6.3 9.9 5.9 15.6l.2.2c2.6 1.8 4.6 4.5 5.5 7.6.7 3.3.4 6.7-.8 9.7z"
        fill="#4169E1"
      />
    </svg>
  );
}

export function NodeJsIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M64 10.5 16 38.2v55.6L64 121.5l48-27.7V38.2L64 10.5zm26.6 69.4c0 8.4-5.9 13.4-15.6 13.4-8.8 0-14.7-4.6-15.4-11.5h8.6c.4 3 2.7 5.1 6.8 5.1 4.2 0 6.9-2 6.9-5.7 0-4-2.8-5.3-9.1-6.8-8.2-1.9-14-4.8-14-12.3 0-7.8 5.8-12.7 14.8-12.7 8.3 0 13.8 4.4 14.4 11h-8.5c-.4-2.7-2.4-4.6-6-4.6-3.8 0-6.1 1.8-6.1 5.1 0 3.6 2.4 4.8 8.6 6.3 8.8 2 15 4.8 15 12.7z"
        fill="#5FA04E"
      />
    </svg>
  );
}

export function GraphQLIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M64 12.5 19.4 38.2v51.6L64 115.5l44.6-25.7V38.2L64 12.5zm0 13.9 32.5 18.8v37.6L64 101.6 31.5 82.8V45.2L64 26.4z"
        fill="#E10098"
      />
      <circle cx="64" cy="12.5" r="9.5" fill="#E10098" />
      <circle cx="19.4" cy="38.2" r="9.5" fill="#E10098" />
      <circle cx="19.4" cy="89.8" r="9.5" fill="#E10098" />
      <circle cx="64" cy="115.5" r="9.5" fill="#E10098" />
      <circle cx="108.6" cy="89.8" r="9.5" fill="#E10098" />
      <circle cx="108.6" cy="38.2" r="9.5" fill="#E10098" />
    </svg>
  );
}

export function GitIcon({ size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M124.7 57.7 70.3 3.3a9.4 9.4 0 0 0-13.3 0L39.8 20.5l16.8 16.8a11.2 11.2 0 0 1 14.1 14.1l16.2 16.2a11.2 11.2 0 1 1-6.6 6.7L65.4 59.4a11.2 11.2 0 0 1-13.4-3.5L35.7 72.2a11.2 11.2 0 1 1-6.7-6.7L45.4 49a11.2 11.2 0 0 1-3.6-13.4L25 18.8 3.3 40.5a9.4 9.4 0 0 0 0 13.3l54.4 54.4a9.4 9.4 0 0 0 13.3 0l53.7-53.7a9.4 9.4 0 0 0 0-13.3z"
        fill="#F05032"
      />
    </svg>
  );
}
