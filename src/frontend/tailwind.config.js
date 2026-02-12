import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'oklch(var(--sidebar))',
                    foreground: 'oklch(var(--sidebar-foreground))',
                    primary: 'oklch(var(--sidebar-primary))',
                    'primary-foreground': 'oklch(var(--sidebar-primary-foreground))',
                    accent: 'oklch(var(--sidebar-accent))',
                    'accent-foreground': 'oklch(var(--sidebar-accent-foreground))',
                    border: 'oklch(var(--sidebar-border))',
                    ring: 'oklch(var(--sidebar-ring))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)'
            },
            fontFamily: {
                sans: [
                    'Inter',
                    'system-ui',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'sans-serif'
                ],
                heading: [
                    'Poppins',
                    'Inter',
                    'system-ui',
                    'sans-serif'
                ]
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'forest-drift': {
                    '0%, 100%': { transform: 'translateX(0) scale(1)' },
                    '50%': { transform: 'translateX(20px) scale(1.05)' }
                },
                'leaf-fall': {
                    '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '0' },
                    '10%': { opacity: '0.7' },
                    '90%': { opacity: '0.7' },
                    '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0' }
                },
                'fade-in': {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' }
                },
                'infinity-fall': {
                    '0%': { transform: 'translateY(0) scale(1)' },
                    '100%': { transform: 'translateY(50px) scale(1.1)' }
                },
                'castle-drift': {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0.3' },
                    '50%': { transform: 'translateY(-30px) rotate(180deg)', opacity: '0.6' }
                },
                'fall-line': {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '50%': { opacity: '1' },
                    '100%': { transform: 'translateY(100vh)', opacity: '0' }
                },
                'muzan-appear': {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' }
                },
                'screen-glitch': {
                    '0%, 100%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-5px, 5px)' },
                    '40%': { transform: 'translate(5px, -5px)' },
                    '60%': { transform: 'translate(-5px, -5px)' },
                    '80%': { transform: 'translate(5px, 5px)' }
                },
                'glitch-flash': {
                    '0%, 100%': { opacity: '0' },
                    '50%': { opacity: '0.8' }
                },
                'glitch-text': {
                    '0%': { transform: 'translate(0)', filter: 'blur(0)' },
                    '20%': { transform: 'translate(-10px, 0)', filter: 'blur(2px)' },
                    '40%': { transform: 'translate(10px, 0)', filter: 'blur(0)' },
                    '60%': { transform: 'translate(0, -10px)', filter: 'blur(3px)' },
                    '80%': { transform: 'translate(0, 10px)', filter: 'blur(1px)' },
                    '100%': { transform: 'translate(0)', filter: 'blur(0)' }
                },
                'fire-wheel-rotate': {
                    '0%': { transform: 'rotate(0deg) scale(1)', opacity: '0.8' },
                    '50%': { opacity: '1' },
                    '100%': { transform: 'rotate(360deg) scale(1.1)', opacity: '0.8' }
                },
                'fire-particle': {
                    '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
                    '100%': { transform: 'translateY(-100px) scale(0)', opacity: '0' }
                },
                'blackout-fade': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'forest-drift': 'forest-drift 20s ease-in-out infinite',
                'leaf-fall': 'leaf-fall linear infinite',
                'fade-in': 'fade-in 0.5s ease-out',
                'infinity-fall': 'infinity-fall 3s ease-in-out infinite alternate',
                'castle-drift': 'castle-drift linear infinite',
                'fall-line': 'fall-line linear infinite',
                'muzan-appear': 'muzan-appear 1s ease-out',
                'screen-glitch': 'screen-glitch 0.3s ease-in-out infinite',
                'glitch-flash': 'glitch-flash 0.2s ease-in-out infinite',
                'glitch-text': 'glitch-text 0.5s ease-in-out infinite',
                'fire-wheel-rotate': 'fire-wheel-rotate linear infinite',
                'fire-particle': 'fire-particle linear infinite',
                'blackout-fade': 'blackout-fade 2s ease-in'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
