
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				audio: {
					'dark': '#0A0A0B',
					'light': '#FAFAFA',
					'accent': '#0EA5E9',
					'accent-light': '#38BDF8',
					'muted': '#64748B',
					'surface': 'rgba(255, 255, 255, 0.05)',
					'surface-accent': 'rgba(14, 165, 233, 0.15)',
					// Ajout de la palette synthwave
					'synthwave-pink': '#F97316',
					'synthwave-purple': '#9b87f5',
					'synthwave-blue': '#33C3F0',
					'synthwave-teal': '#0FA0CE',
					'synthwave-neon': '#D946EF'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0)' }
				},
				'wave': {
					'0%': { transform: 'scaleY(1)' },
					'50%': { transform: 'scaleY(0.5)' },
					'100%': { transform: 'scaleY(1)' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 15px rgba(217, 70, 239, 0.5), 0 0 30px rgba(217, 70, 239, 0.3)' },
					'50%': { boxShadow: '0 0 25px rgba(217, 70, 239, 0.8), 0 0 45px rgba(217, 70, 239, 0.5)' }
				},
				'synthwave-grid': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '100% 100%' }
				},
				'hue-rotate': {
					'0%': { filter: 'hue-rotate(0deg)' },
					'100%': { filter: 'hue-rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'fade-out': 'fade-out 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
				'scale-out': 'scale-out 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
				'wave-1': 'wave 1.2s ease-in-out infinite',
				'wave-2': 'wave 1.8s ease-in-out 0.1s infinite',
				'wave-3': 'wave 1.5s ease-in-out 0.25s infinite', 
				'wave-4': 'wave 1.3s ease-in-out 0.3s infinite',
				'wave-5': 'wave 1.7s ease-in-out 0.35s infinite',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'spin-slow': 'spin-slow 12s linear infinite',
				'glow': 'glow 3s ease-in-out infinite',
				'synthwave-grid': 'synthwave-grid 15s linear infinite',
				'hue-rotate': 'hue-rotate 10s linear infinite'
			},
			transitionTimingFunction: {
				'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'bounce': 'cubic-bezier(0.87, 0, 0.13, 1)'
			},
			boxShadow: {
				'soft': '0 8px 30px rgba(0, 0, 0, 0.12)',
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'neon': '0 0 15px rgba(14, 165, 233, 0.5), 0 0 30px rgba(14, 165, 233, 0.3)',
				'neon-pink': '0 0 15px rgba(249, 115, 22, 0.5), 0 0 30px rgba(249, 115, 22, 0.3)',
				'neon-purple': '0 0 15px rgba(155, 135, 245, 0.5), 0 0 30px rgba(155, 135, 245, 0.3)',
				'neon-teal': '0 0 15px rgba(15, 160, 206, 0.5), 0 0 30px rgba(15, 160, 206, 0.3)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-audio': 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
				'gradient-synthwave': 'linear-gradient(135deg, #F97316 0%, #9b87f5 50%, #33C3F0 100%)',
				'synthwave-grid': 'linear-gradient(#9b87f5 1px, transparent 1px), linear-gradient(to right, #9b87f5 1px, transparent 1px)',
				'synthwave-sun': 'radial-gradient(circle at 50% 150%, #F97316 0%, #9b87f5 50%, transparent 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
