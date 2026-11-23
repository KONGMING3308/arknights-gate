/** 用途：Tailwind 主题扩展。输入：无。输出：配置对象。依赖：tailwindcss */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0b0e13',
          800: '#121722',
          700: '#1a2130',
          600: '#242d40',
        },
        gold: {
          500: '#c8a45c',
          400: '#d9bb7c',
          300: '#e6d2a3',
        },
        danger: '#e8483c',
        trust: '#5ec8a0',
        safety: '#7aa7e8',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        panel: '0 12px 40px rgba(0,0,0,0.55)',
        seal: '0 2px 0 rgba(0,0,0,0.35)',
      },
      keyframes: {
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%,60%': { transform: 'translateX(-6px)' },
          '40%,80%': { transform: 'translateX(6px)' },
        },
        flash: {
          '0%': { opacity: '0.9' },
          '100%': { opacity: '0' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        muzzle: {
          '0%': { opacity: '1', transform: 'scale(0.6)' },
          '35%': { opacity: '0.9', transform: 'scale(1.15)' },
          '100%': { opacity: '0', transform: 'scale(1.35)' },
        },
        recoil: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '30%': { transform: 'translateY(26px) rotate(-6deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
        impact: {
          '0%': { opacity: '1', filter: 'brightness(2.4)' },
          '40%': { opacity: '0.85', filter: 'brightness(1.3)' },
          '100%': { opacity: '0', filter: 'brightness(1)' },
        },
        blood: {
          '0%': { opacity: '0.95', transform: 'scale(0.5)' },
          '100%': { opacity: '0', transform: 'scale(1.9)' },
        },
        lunge: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-3deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
        flicker: {
          '0%,100%': { opacity: '0.04' },
          '48%': { opacity: '0.22' },
          '50%': { opacity: '0.06' },
          '52%': { opacity: '0.18' },
        },
        reach: {
          '0%': { transform: 'scale(0.82) translateY(6%)', opacity: '0.75' },
          '50%': { transform: 'scale(1.06) translateY(0%)', opacity: '1' },
          '100%': { transform: 'scale(0.82) translateY(6%)', opacity: '0.75' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(232,72,60,0.55)' },
          '100%': { boxShadow: '0 0 0 24px rgba(232,72,60,0)' },
        },
        glitch: {
          '0%,100%': { transform: 'translate(0,0)', filter: 'none' },
          '18%': { transform: 'translate(-2px,1px)', filter: 'hue-rotate(18deg) saturate(1.5)' },
          '22%': { transform: 'translate(2px,-1px)', filter: 'none' },
          '58%': { transform: 'translate(-1px,0)', filter: 'hue-rotate(-14deg) contrast(1.2)' },
          '62%': { transform: 'translate(1px,1px)', filter: 'none' },
        },
      },
      animation: {
        shake: 'shake 320ms ease-in-out',
        flash: 'flash 420ms ease-out forwards',
        rise: 'rise 240ms ease-out both',
        muzzle: 'muzzle 140ms ease-out forwards',
        recoil: 'recoil 220ms ease-out',
        impact: 'impact 420ms ease-out forwards',
        blood: 'blood 520ms ease-out forwards',
        lunge: 'lunge 900ms ease-in-out infinite',
        flicker: 'flicker 2.6s steps(1, end) infinite',
        reach: 'reach 5s ease-in-out infinite',
        pulseRing: 'pulseRing 1.4s ease-out infinite',
        glitch: 'glitch 2.4s steps(1, end) infinite',
      },
    },
  },
  plugins: [],
}
