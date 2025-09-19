<template>
  <div
    class="reports-page"
    :class="[theme]"
  >
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="page-info">
          <h1>Reports & Analytics</h1>
          <p>Comprehensive data insights and performance metrics</p>
        </div>
        <div class="header-actions">
          <div class="search-box">
            <i class="fas fa-search" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search reports..."
            >
          </div>
          <button
            class="icon-btn"
            @click="exportData"
          >
            <i class="fas fa-download" />
          </button>
          <button
            class="icon-btn"
            @click="refreshData"
          >
            <i
              class="fas fa-sync-alt"
              :class="{ refreshing: loading }"
            />
          </button>
        </div>
      </div>
    </header>

    <!-- Filters -->
    <div class="filters-section">
      <div class="filter-group">
        <label>Date Range:</label>
        <select v-model="dateRange">
          <option value="7">
            Last 7 days
          </option>
          <option value="30">
            Last 30 days
          </option>
          <option value="90">
            Last 90 days
          </option>
          <option value="custom">
            Custom
          </option>
        </select>
      </div>
      <div class="filter-group">
        <label>Report Type:</label>
        <select v-model="reportType">
          <option value="all">
            All Reports
          </option>
          <option value="sales">
            Sales
          </option>
          <option value="users">
            Users
          </option>
          <option value="performance">
            Performance
          </option>
        </select>
      </div>
      <div class="filter-group">
        <label>Sort By:</label>
        <select v-model="sortBy">
          <option value="date">
            Date
          </option>
          <option value="name">
            Name
          </option>
          <option value="value">
            Value
          </option>
        </select>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="stats-overview">
      <div class="stat-card">
        <div
          class="stat-icon"
          style="background: rgba(79, 70, 229, 0.1); color: #4f46e5;"
        >
          <i class="fas fa-file-alt" />
        </div>
        <div class="stat-info">
          <h3>{{ filteredReports.length }}</h3>
          <p>Total Reports</p>
        </div>
      </div>
      <div class="stat-card">
        <div
          class="stat-icon"
          style="background: rgba(16, 185, 129, 0.1); color: #10b981;"
        >
          <i class="fas fa-check-circle" />
        </div>
        <div class="stat-info">
          <h3>{{ completedReports }}</h3>
          <p>Completed</p>
        </div>
      </div>
      <div class="stat-card">
        <div
          class="stat-icon"
          style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;"
        >
          <i class="fas fa-clock" />
        </div>
        <div class="stat-info">
          <h3>{{ pendingReports }}</h3>
          <p>Pending</p>
        </div>
      </div>
      <div class="stat-card">
        <div
          class="stat-icon"
          style="background: rgba(239, 68, 68, 0.1); color: #ef4444;"
        >
          <i class="fas fa-exclamation-circle" />
        </div>
        <div class="stat-info">
          <h3>{{ errorReports }}</h3>
          <p>With Errors</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <div
        v-if="loading"
        class="status-message loading"
      >
        <div class="loading-spinner">
          <div class="spinner-circle" />
          <div class="spinner-circle" />
          <div class="spinner-circle" />
          <div class="spinner-circle" />
        </div>
        <p>Loading reports data...</p>
      </div>

      <div
        v-else-if="error"
        class="status-message error"
      >
        <i class="fas fa-exclamation-triangle" />
        <p>{{ error }}</p>
        <button
          class="retry-btn"
          @click="fetchData"
        >
          Try Again
        </button>
      </div>

      <div
        v-else
        class="reports-content"
      >
        <div
          v-if="filteredReports.length === 0"
          key="no-results"
          class="no-results"
        >
          <i class="fas fa-search" />
          <h3>No reports found</h3>
          <p>Try adjusting your search or filters</p>
        </div>

        <div
          v-else
          key="reports-grid"
          class="reports-grid"
        >
          <div
            v-for="(report, index) in filteredReports"
            :key="index"
            class="report-card"
            :class="getReportStatus(report)"
          >
            <div class="card-header">
              <h3>{{ report.title || `Report #${index + 1}` }}</h3>
              <div class="card-actions">
                <button
                  class="action-btn"
                  @click="downloadReport(report)"
                >
                  <i class="fas fa-download" />
                </button>
                <button
                  class="action-btn"
                  @click="shareReport(report)"
                >
                  <i class="fas fa-share-alt" />
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="report-meta">
                <div class="meta-item">
                  <i class="fas fa-calendar" />
                  <span>{{ formatDate(report.date) }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-user" />
                  <span>{{ report.author || 'System' }}</span>
                </div>
              </div>
              <div class="report-data">
                <div
                  v-for="(value, key) in getFilteredReportData(report)"
                  :key="key"
                  class="data-row"
                >
                  <span class="data-key">{{ formatKey(key) }}:</span>
                  <span class="data-value">{{ value }}</span>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="report-status">
                <i :class="getStatusIcon(report)" />
                <span>{{ getStatusText(report) }}</span>
              </div>
              <button
                class="view-btn"
                @click="viewReport(report)"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { globalTheme, useTheme } from '@/composables/useTheme'
import { computed, onMounted, ref, watch } from 'vue'

// استخدام المتغير العالمي مباشرة
const currentTheme = ref(globalTheme.value)

// مراقبة تغييرات الثيم العالمي
watch(globalTheme, newTheme => {
  currentTheme.value = newTheme
})

const { theme } = useTheme()

const reports = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const dateRange = ref('7')
const reportType = ref('all')
const sortBy = ref('date')
const apiUrl = 'https://api.fitcode.life/api/v1/test/data-1'

// دالة لتصفية بيانات التقرير
const getFilteredReportData = report => {
  const filteredData = {}
  for (const [key, value] of Object.entries(report)) {
    if (!['title', 'date', 'author', 'status'].includes(key)) {
      filteredData[key] = value
    }
  }
  
  return filteredData
}

const filteredReports = computed(() => {
  let filtered = [...reports.value]
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()

    filtered = filtered.filter(report => 
      Object.values(report).some(value => 
        String(value).toLowerCase().includes(query),
      ),
    )
  }
  
  // Sort reports
  if (sortBy.value === 'date' && filtered[0]?.date) {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
  } else if (sortBy.value === 'name' && filtered[0]?.title) {
    filtered.sort((a, b) => a.title.localeCompare(b.title))
  }
  
  return filtered
})

const completedReports = computed(() => {
  return reports.value.filter(r => r.status === 'completed').length
})

const pendingReports = computed(() => {
  return reports.value.filter(r => r.status === 'pending').length
})

const errorReports = computed(() => {
  return reports.value.filter(r => r.status === 'error').length
})

onMounted(async () => {
  await fetchData()
  
  // تأكد من تحميل Font Awesome إذا لم يكن محملاً
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    document.head.appendChild(link)
  }
})

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(apiUrl)
    if (!res.ok) throw new Error('Failed to fetch data')
    const data = await res.json()
    
    // Process data based on different possible structures
    if (Array.isArray(data)) {
      reports.value = data.map((item, index) => ({
        ...item,
        title: item.title || `Report ${index + 1}`,
        date: item.date || new Date().toISOString(),
        status: item.status || (index % 3 === 0 ? 'completed' : index % 3 === 1 ? 'pending' : 'error'),
      }))
    } else if (Array.isArray(data.data)) {
      reports.value = data.data
    } else if (Array.isArray(data.payload)) {
      reports.value = data.payload
    } else {
      reports.value = []
      error.value = 'Unexpected data format'
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const refreshData = () => {
  fetchData()
}

const exportData = () => {
  // Implementation for exporting data
  console.log('Exporting data...')
}

const downloadReport = report => {
  // Implementation for downloading a report
  console.log('Downloading report:', report)
}

const shareReport = report => {
  // Implementation for sharing a report
  console.log('Sharing report:', report)
}

const viewReport = report => {
  // Implementation for viewing report details
  console.log('Viewing report:', report)
}

const formatDate = dateString => {
  if (!dateString) return 'N/A'
  
  return new Date(dateString).toLocaleDateString()
}

const formatKey = key => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

const getReportStatus = report => {
  return `status-${report.status || 'pending'}`
}

const getStatusIcon = report => {
  const status = report.status || 'pending'
  switch(status) {
  case 'completed': return 'fas fa-check-circle'
  case 'error': return 'fas fa-exclamation-circle'
  default: return 'fas fa-clock'
  }
}

const getStatusText = report => {
  const status = report.status || 'pending'
  switch(status) {
  case 'completed': return 'Completed'
  case 'error': return 'Error'
  default: return 'Pending'
  }
}
</script>

<style scoped>
@import '@/assets/css/reports.css';
</style>
