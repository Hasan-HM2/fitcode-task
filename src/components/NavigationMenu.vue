<template>
  <div class="nav-wrapper">
    <nav class="nav-menu">
      <button
        v-for="(item, index) in navItems"
        :key="item.name"
        class="nav-item"
        :class="{ active: active === item.name }"
        :aria-label="item.label"
        @click="setActive(item.name, index)"
      >
        <div class="icon-container">
          <component
            :is="item.icon"
            class="icon"
          />
          <span
            v-if="item.notification"
            class="notification-badge"
          >{{ item.notification }}</span>
        </div>
        <span class="label">{{ item.label }}</span>
        <div
          v-if="active === item.name"
          class="active-pulse"
        />
      </button>

      <!-- مؤشر متحرك -->
      <div
        class="indicator"
        :style="indicatorStyle"
      />
    </nav>
  </div>
</template>

<script setup>
import { Droplets, Heart, Home, ShoppingCart, Store } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const emit = defineEmits(['navigate'])
const active = ref('Home')
const activeIndex = ref(0)

const navItems = [
  { name: 'Home', label: 'Home', icon: Home },
  { name: 'Drop', label: 'Drop', icon: Droplets },
  { name: 'Store', label: 'Store', icon: Store, notification: 3 },
  { name: 'Wishlist', label: 'Wishlist', icon: Heart },
  { name: 'Cart', label: 'Cart', icon: ShoppingCart, notification: 2 },
]

const setActive = (name, index) => {
  active.value = name
  activeIndex.value = index
  emit('navigate', name)
}

// لإعطاء المؤشر حركة Elastic عند التحرك
const indicatorStyle = computed(() => ({
  transform: `translateX(calc(${activeIndex.value * 100}%))`,
  width: `${100 / navItems.length}%`,
  transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}))
</script>

<style scoped>
.nav-wrapper {
  width: 100%;
  max-width: 480px;
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--nav-bg, rgba(255, 255, 255, 0.95));
  backdrop-filter: blur(14px);
  border-radius: 32px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
  padding: 10px 0;
  z-index: 1000;
}

.dashboard.dark .nav-wrapper {
  --nav-bg: rgba(30, 41, 59, 0.95);
  --nav-color: #cbd5e1;
  --nav-active: #60a5fa;
  --notification-bg: #ef4444;
  --pulse-color: rgba(96, 165, 250, 0.4);
}

.nav-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.nav-item {
  flex: 1;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--nav-color, #64748b);
  font-size: 13px;
  font-weight: 500;
  padding: 8px 0;
  transition: all 0.3s ease;
  position: relative;
  background: none;
  border: none;
  outline: none;
}

.nav-item.active {
  color: var(--nav-active, #3b82f6);
  transform: translateY(-6px) scale(1.15);
}

.icon-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
}

.nav-item .icon {
  width: 26px;
  height: 26px;
  transition: all 0.3s ease;
}

.nav-item.active .icon,
.nav-item:hover .icon {
  transform: scale(1.3);
  color: var(--nav-active, #3b82f6);
}

.notification-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--notification-bg, #ef4444);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
}

.active-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--pulse-color, rgba(59, 130, 246, 0.4));
  animation: pulse 2s infinite;
  z-index: -1;
  opacity: 0;
}

.nav-item.active .active-pulse {
  opacity: 1;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.7;
  }
  70% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
  }
}

.indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: var(--nav-active, #3b82f6);
  border-radius: 4px;
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* تأثيرات النقر */
.nav-item:active {
  transform: scale(0.95);
}

.nav-item.active:active {
  transform: translateY(-6px) scale(1.1);
}

/* تحسينات للوضع الداكن */
.dashboard.dark .nav-item:hover {
  color: #e2e8f0;
}

/* تحسينات للهواتف */
@media (max-width: 480px) {
  .nav-wrapper {
    max-width: 90%;
    bottom: 12px;
  }
  
  .nav-item {
    font-size: 12px;
    padding: 6px 0;
  }
  
  .nav-item .icon {
    width: 22px;
    height: 22px;
  }
}
</style>
