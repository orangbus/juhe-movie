import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// 自定义主题
const orangbusTheme = {
	dark: false,
	colors: {
		background: '#FFFFFF',
		surface: '#FFFFFF',
		primary: '#2196F3',
		'primary-darken-1': '#42A5F5',
		secondary: '#03DAC6',
		'secondary-darken-1': '#018786',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	},
}

export default createVuetify({
	components,
	directives,
	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		},
	},
	theme:{
		defaultTheme: 'orangbusTheme',
		themes:{
			orangbusTheme
		}
	}
})