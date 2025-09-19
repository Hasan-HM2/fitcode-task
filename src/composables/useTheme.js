// composables/useTheme.js
import { onMounted, ref, watch } from 'vue'

// متغير عالمي لتخزين الثيم
export const globalTheme = ref('light')

// دالة لتطبيق الثيم على document
const applyThemeToDocument = theme => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
  }
}

export function useTheme() {
  const theme = ref('light')

  const toggle = () => {
    globalTheme.value = globalTheme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', globalTheme.value)
    theme.value = globalTheme.value
    applyThemeToDocument(globalTheme.value)
  }

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      globalTheme.value = savedTheme
      theme.value = savedTheme
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      globalTheme.value = prefersDark ? 'dark' : 'light'
      theme.value = globalTheme.value
    }
    applyThemeToDocument(globalTheme.value)
  })

  watch(globalTheme, newTheme => {
    theme.value = newTheme
    applyThemeToDocument(newTheme)
  })

  return {
    theme,
    toggle,
    globalTheme,
  }
}

// دالة لتعيين الثيم (مهمة لاستخدامها في main.js)
export const setTheme = newTheme => {
  globalTheme.value = newTheme
  localStorage.setItem('theme', newTheme)
  applyThemeToDocument(newTheme)
}

// دالة للحصول على الثيم الحالي
export const getCurrentTheme = () => {
  return globalTheme.value
}
