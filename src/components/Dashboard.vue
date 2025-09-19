<template>
  <div class="dashboard" :class="[theme]">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="user-info">
          <div class="avatar">
            <img src="https://i.imgur.com/UWEhpvu.jpeg" alt="User Avatar">
            <span class="status-indicator" />
          </div>
          <div class="user-details">
            <h2>Welcome back, <span class="user-name">AlHassan</span></h2>
            <p>Here's what's happening today</p>
          </div>
        </div>
        <div class="header-actions">
          <button class="icon-btn" @click="toggleNotifications">
            <i class="fas fa-bell" />
            <span v-if="unreadNotifications" class="notification-count">{{ unreadNotifications }}</span>
          </button>
          <button class="icon-btn" @click="toggleSearch">
            <i class="fas fa-search" />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="content">
      <!-- Stats Overview -->
      <div class="stats-grid">
        <div v-for="(stat, index) in stats" :key="index" class="stat-card">
          <div class="stat-icon" :style="{ background: stat.color + '20', color: stat.color }">
            <i :class="stat.icon" />
          </div>
          <div class="stat-info">
            <h3>{{ stat.value }}</h3>
            <p>{{ stat.title }}</p>
          </div>
          <div class="stat-trend" :class="stat.trend > 0 ? 'positive' : 'negative'">
            <i :class="stat.trend > 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'" />
            <span>{{ Math.abs(stat.trend) }}%</span>
          </div>
        </div>
      </div>

      <!-- Dashboard Cards -->
      <div class="cards-grid">
        <!-- Analytics Card -->
        <div class="card" :style="{ animationDelay: '0.1s' }">
          <div class="card-header">
            <h2>Analytics</h2>
            <button class="card-action">
              <i class="fas fa-ellipsis-h" />
            </button>
          </div>
          <p>View all analytics metrics and insights.</p>
          
          <!-- بيانات Analytics -->
          <div class="card-data-container">
            <div class="metric-row">
              <div class="metric-item">
                <div class="metric-value">+24%</div>
                <div class="metric-label">This Month</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">12.5K</div>
                <div class="metric-label">Visits</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">3.2M</div>
                <div class="metric-label">Impressions</div>
              </div>
            </div>
            
            <!-- رسم بياني مصغر -->
            <div class="chart-container">
              <div class="mini-chart">
                <div class="chart-bar" style="height: 30%; background: #10b981;"></div>
                <div class="chart-bar" style="height: 65%; background: #3b82f6;"></div>
                <div class="chart-bar" style="height: 45%; background: #10b981;"></div>
                <div class="chart-bar" style="height: 80%; background: #3b82f6;"></div>
                <div class="chart-bar" style="height: 60%; background: #10b981;"></div>
                <div class="chart-bar" style="height: 75%; background: #3b82f6;"></div>
                <div class="chart-bar" style="height: 50%; background: #10b981;"></div>
              </div>
              <div class="chart-labels">
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <div class="card-metric">
              <i class="fas fa-chart-line" />
              <span>+24% this month</span>
            </div>
            <button class="card-btn">
              View Details
            </button>
          </div>
        </div>

        <!-- Sales Card -->
        <div class="card" :style="{ animationDelay: '0.2s' }">
          <div class="card-header">
            <h2>Sales</h2>
            <button class="card-action">
              <i class="fas fa-ellipsis-h" />
            </button>
          </div>
          <p>Track daily, weekly, and monthly sales.</p>
          
          <!-- بيانات Sales -->
          <div class="card-data-container">
            <div class="sales-stats">
              <div class="sales-metric">
                <div class="sales-value">$12.4K</div>
                <div class="sales-label">Total Revenue</div>
              </div>
              <div class="sales-comparison">
                <div class="comparison-item">
                  <span class="comparison-label">Online</span>
                  <span class="comparison-value">$8.2K</span>
                </div>
                <div class="comparison-item">
                  <span class="comparison-label">Offline</span>
                  <span class="comparison-value">$4.2K</span>
                </div>
              </div>
            </div>
            
            <!-- رسم بياني للمبيعات -->
            <div class="sales-chart">
              <div class="progress-container">
                <div class="progress-info">
                  <span>Monthly Target</span>
                  <span>85%</span>
                </div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 85%; background: linear-gradient(90deg, #8b5cf6, #7c3aed);"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <div class="card-metric">
              <i class="fas fa-shopping-bag" />
              <span>$12.4k total</span>
            </div>
            <button class="card-btn">
              View Details
            </button>
          </div>
        </div>

        <!-- Users Card -->
        <div class="card" :style="{ animationDelay: '0.3s' }">
          <div class="card-header">
            <h2>Users</h2>
            <button class="card-action">
              <i class="fas fa-ellipsis-h" />
            </button>
          </div>
          <p>Manage your user base and activity.</p>
          
          <!-- بيانات Users -->
          <div class="card-data-container">
            <div class="user-stats">
              <div class="user-metric">
                <div class="user-value">1.2K</div>
                <div class="user-label">Active Users</div>
              </div>
              <div class="user-growth">
                <div class="growth-indicator positive">
                  <i class="fas fa-arrow-up" />
                  <span>8.2%</span>
                </div>
                <div class="growth-label">vs last month</div>
              </div>
            </div>
            
            <!-- توزيع المستخدمين -->
            <div class="user-distribution">
              <div class="distribution-item">
                <div class="distribution-info">
                  <span class="distribution-label">New Users</span>
                  <span class="distribution-value">356</span>
                </div>
                <div class="distribution-bar">
                  <div class="distribution-fill" style="width: 65%; background: #3b82f6;"></div>
                </div>
              </div>
              <div class="distribution-item">
                <div class="distribution-info">
                  <span class="distribution-label">Returning</span>
                  <span class="distribution-value">844</span>
                </div>
                <div class="distribution-bar">
                  <div class="distribution-fill" style="width: 80%; background: #10b981;"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card-footer">
            <div class="card-metric">
              <i class="fas fa-users" />
              <span>1.2k active</span>
            </div>
            <button class="card-btn">
              View Details
            </button>
          </div>
        </div>

        <!-- Quick Actions Card -->
        <div class="card actions" :style="{ animationDelay: '0.4s' }">
          <div class="card-header">
            <h2>Quick Actions</h2>
          </div>

          <!-- الأيقونات المحسنة -->
          <div class="enhanced-actions-grid">
            <div class="action-item">
              <div class="action-icon-wrapper">
                <div class="icon-circle" style="background: rgba(16, 185, 129, 0.15);">
                  <i class="fas fa-plus-circle" style="color: #10b981;"></i>
                </div>
              </div>
              <span class="action-title">Add Product</span>
            </div>

            <div class="action-item">
              <div class="action-icon-wrapper">
                <div class="icon-circle" style="background: rgba(59, 130, 246, 0.15);">
                  <i class="fas fa-chart-pie" style="color: #3b82f6;"></i>
                </div>
              </div>
              <span class="action-title">Advanced Reports</span>
            </div>

            <div class="action-item">
              <div class="action-icon-wrapper">
                <div class="icon-circle" style="background: rgba(245, 158, 11, 0.15);">
                  <i class="fas fa-paper-plane" style="color: #f59e0b;"></i>
                </div>
              </div>
              <span class="action-title">Send Message</span>
            </div>

            <div class="action-item">
              <div class="action-icon-wrapper">
                <div class="icon-circle" style="background: rgba(139, 92, 246, 0.15);">
                  <i class="fas fa-file-alt" style="color: #8b5cf6;"></i>
                </div>
              </div>
              <span class="action-title">View Reports</span>
            </div>
          </div>

          <!-- زر التقارير المميز داخل البطاقة -->
          <div class="reports-card-section">
            <div class="reports-card-highlight">
              <div class="reports-card-content">
                <div class="reports-icon">
                  <i class="fas fa-chart-bar" style="padding: 10px;"></i>
                </div>
                <div class="reports-info">
                  <h3>Advanced Reports</h3>
                </div>
                <button class="reports-card-btn" @click="goToReports">
                  View Reports
                  <i class="fas fa-arrow-right" />
                </button>
              </div>
            </div>
          </div>

          <div class="theme-toggle-container">
            <button class="btn primary" @click="toggle">
              <i :class="theme === 'light' ? 'fas fa-moon' : 'fas fa-sun'" />
              {{ theme === 'light' ? 'Dark' : 'Light' }} Mode
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom Navigation Menu -->
    <NavigationMenu @navigate="handleNavigation" />
  </div>
</template>

<script setup>
import NavigationMenu from '@/components/NavigationMenu.vue'
import { useTheme } from '@/composables/useTheme'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const { theme, toggle } = useTheme()
const router = useRouter()

const unreadNotifications = ref(3)

const stats = ref([
  { title: 'Total Revenue', value: '$24,563', icon: 'fas fa-dollar-sign', trend: 12.5, color: '#10b981' },
  { title: 'New Users', value: '1,243', icon: 'fas fa-users', trend: 8.2, color: '#3b82f6' },
  { title: 'Orders', value: '356', icon: 'fas fa-shopping-cart', trend: -3.4, color: '#f59e0b' },
  { title: 'Conversion Rate', value: '4.73%', icon: 'fas fa-chart-pie', trend: 5.1, color: '#8b5cf6' },
])

const handleNavigation = route => {
  console.log('Navigating to:', route)
}

const toggleNotifications = () => {
  console.log('Toggle notifications')
}

const toggleSearch = () => {
  console.log('Toggle search')
}

const goToReports = () => {
  localStorage.setItem('currentTheme', theme.value)
  router.push('/reports')
}

onMounted(() => {
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    document.head.appendChild(link)
  }
})
</script>

<style scoped>
@import '@/assets/css/dashboard.css';
</style>