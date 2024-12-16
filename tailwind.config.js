/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          light: '#ebf0f8', // 밝은 톤의 남색 (배경)
          medium: '#c7d7e5', // 중간 톤 (보조 색상)
          deep: '#5b738b', // 깊은 남색 (포인트 색상)
        },
        text: {
          primary: '#3a506b', // 어두운 글씨 색 (자연스러운 남색)
          secondary: '#627d98', // 중간 밝기의 글씨 색
        },
      },
      fontFamily: {
        'faculty-glyphic': ['"Faculty Glyphic"', 'sans-serif'],
        'nanum-gothic': ['"Nanum Gothic"', 'sans-serif'],
      },
    },
  }
}

