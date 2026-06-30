<template>
  <div class="mobile-wrapper">  
    <div class="tw:min-h-screen tw:flex tw:flex-col flex" style="background-color: #fafbfc; font-family: Inter, sans-serif; -webkit-font-smoothing: antialiased;">
  
      <!-- Main Content -->
      <main class="tw:flex-1 tw:flex tw:flex-col tw:items-center tw:justify-center tw:relative tw:overflow-hidden tw:px-5 tw:pt-12">
        <!-- Subtle Grid Background -->
        <div class="tw:absolute tw:inset-0 tw:opacity-[0.03] tw:pointer-events-none">
          <img src="@/assets/images/logo/logo.webp" alt="P&P" class="tw:h-8 tw:w-auto" />
        </div>
  
        <!-- Central Content -->
        <div class="tw:relative tw:z-10 tw:w-full tw:max-w-[800px] tw:text-center tw:flex tw:flex-col tw:items-center">
          <!-- Hero Bento Card -->
          <div class="float-animation tw:mb-6">
            <div class="tw:relative tw:w-64 tw:h-64 md:tw:w-80 md:tw:h-80 tw:flex tw:items-center tw:justify-center">
              <!-- Backdrop blur -->
              <div class="tw:absolute tw:inset-0 tw:rounded-full tw:opacity-5 tw:blur-3xl" style="background-color: #162438;"></div>
              <!-- Card -->
              <div class="tw:relative tw:z-20 tw:w-full tw:h-full tw:rounded-xl tw:overflow-hidden tw:shadow-2xl tw:ring-1" style="box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); --tw-ring-color: rgba(0,0,0,0.05);">
                <!-- Gradient background simulating tinted glass -->
                <div class="tw:w-full tw:h-full" style="background: linear-gradient(135deg, rgb(10, 37, 64) 0%, rgb(110 129 151) 40%, rgb(255 255 255) 100%)"></div>
                <!-- Dark overlay -->
                <div class="tw:absolute tw:inset-0" style="background: linear-gradient(to top, rgba(10,37,64,0.6), transparent);"></div>
                <!-- Top-right decorative icon -->
                <div class="tw:absolute tw:top-4 tw:left-4" style="color: rgba(255,255,255,0.3);">
                  <q-icon name="contrast" size="2rem" />
                </div>
                <img src="@/assets/images/logo/logo.webp" alt="P&P" class="tw:w-auto" style="transform: translate(82px, -219px); height: 7rem;" />
                
              </div>
            </div>
          </div>
  
          <!-- Text Content -->
          <div class="tw:max-w-[500px]">
            <!-- 404 -->
            <div class="tw:text-[28px] tw:md:text-[66px]" style="color: #213668; letter-spacing: 1rem; font-weight: bold;">
              404
            </div>
            <div class="tw:text-[28px] tw:md:text-[32px] tw:font-bold tw:leading-tight tw:tracking-tight tw:m-0 tw:mb-2" style="color: #131b2e;">
              {{ $t('error404.title') }}
            </div>
            <p class="tw:text-base tw:leading-relaxed tw:m-0" style="color: #43474c;">
              {{ $t('error404.description') }}
            </p>
          </div>
  
          <!-- Action Buttons -->
          <div class="row tw:w-full tw:mt-5">
            <div class="col-6 tw:px-1">
              <q-btn
                unelevated
                to="/"
                no-caps
                class="group tw:relative tw:flex tw:items-center tw:justify-center tw:px-6 tw:py-4 tw:rounded-lg tw:font-semibold tw:transition-all hover:tw:opacity-90 active:tw:scale-95 tw:shadow-md"
                style="background-color: #162438; color: white; font-size: 14px; height: 48px;"
              >
                <q-icon name="arrow_back" size="xs" class="q-mr-xs tw:transition-transform group-hover:tw:-translate-x-1" />
                {{ $t('error404.back_home') }}
              </q-btn>
            </div>
            <div class="col-6 tw:px-1">
              <q-btn
                unelevated
                @click="router.go(-1)"
                no-caps
                class="tw:flex tw:items-center tw:justify-center tw:px-6 tw:py-4 tw:rounded-lg tw:font-semibold tw:transition-all hover:tw:bg-[#e2e7ff] active:tw:scale-95"
                style="background: transparent; color: #162438; font-size: 14px; height: 48px; border: 1px solid rgba(196,198,205,1);"
              >
                {{ $t('error404.go_back') }}
              </q-btn>
            </div>
          </div>
  
          <!-- Footer Metadata -->
          <div class="tw:mt-10 tw:pt-6 tw:w-full tw:border-t tw:flex tw:flex-col md:tw:flex-row tw:items-center tw:justify-between" style="border-color: rgba(196,198,205,0.1); color: #a5a8aa;">
            <div class="tw:flex tw:items-center tw:gap-2">
              <q-icon name="security" size="xs" style="color: #a5a8aa;" />
              <span class="tw:text-xs tw:font-medium tw:uppercase tw:tracking-widest" style="color: #a5a8aa;">{{ $t('error404.diagnostics') }}</span>
            </div>
            <div class="tw:flex tw:items-center tw:gap-4">
              <span class="tw:text-xs" style="color: #a5a8aa;">{{ $t('error404.copyright') }}</span>
              <div class="tw:flex tw:items-center tw:gap-2">
                <span class="tw:w-2 tw:h-2 tw:rounded-full" style="background-color: #ba1a1a; animation: pulse-404 2s infinite;"></span>
                <span class="tw:text-xs" style="color: #a5a8aa;">{{ $t('error404.session_inactive') }}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Decorative Corner (Desktop only) -->
      <div class="tw:hidden lg:tw:block tw:fixed tw:bottom-0 tw:right-0 tw:p-6 tw:pointer-events-none tw:opacity-20">
        <div class="tw:flex tw:flex-col tw:items-end">
          <span class="tw:text-[36px] tw:font-bold tw:leading-none tw:tracking-tighter" style="color: #162438;">P&amp;P</span>
          <span class="tw:text-xs tw:font-bold tw:uppercase tw:tracking-widest" style="color: #43474c;">{{ $t('error404.precision_core') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style lang="scss">
.float-animation {
  animation: float-404 6s ease-in-out infinite;
}

@keyframes float-404 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-404 {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.mobile-wrapper {
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  @media (min-width: 768px) {
    max-width: 500px;
    min-height: 100vh;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
    background: #f9fafb;
  }
}
</style>

