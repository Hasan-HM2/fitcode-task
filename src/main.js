import { createApp } from 'vue'
import App from '@/App.vue'
import { setTheme } from '@/composables/useTheme' // تأكد من المسار الصحيح
import router from '@/router'

// Styles
import '@/assets/css/dashboard.css'
import './assets/css/reports.css'

// 👇 استدعاء الدالة هنا
setTheme()

const app = createApp(App)
app.use(router)
app.mount('#app')
