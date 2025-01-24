
export const useDarkMode = () => {
  const isDarkMode = ref(false)

  const initDarkMode = () => {
    const savedTheme = localStorage.getItem('theme')
    isDarkMode.value = savedTheme === 'dark'
    updateDarkMode()
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    updateDarkMode()
  }

  const updateDarkMode = () => {
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDarkMode.value)
  }

  return {
    isDarkMode,
    toggleDarkMode,
    initDarkMode
  }
}