<template>
  <section class="ads-carousel tw:px-5">
    <div class="ads-carousel__header">
      <h2 class="ads-carousel__title">{{ t('dashboard.ads.title') }}</h2>
    </div>
    <div v-if="loading" class="ads-carousel__loading">
      <q-spinner-dots color="primary" size="30px" />
    </div>
    <q-carousel
      v-else-if="ads.length > 0"
      v-model="slide"
      swipeable
      animated
      :navigation="false"
      infinite
      :autoplay="5000"
      transition-prev="slide-right"
      transition-next="slide-left"
      class="ads-carousel__qcarousel"
      control-color="primary"
      navigation-icon="radio_button_unchecked"
    >
      <q-carousel-slide
        v-for="ad in ads"
        :key="ad.id"
        :name="ad.id"
        class="ads-carousel__slide"
      >
        <div class="ads-carousel__banner" :style="{ backgroundColor: ad.bg_color || '#162438' }">
          <div class="ads-carousel__banner-text">
            <p class="ads-carousel__label" :style="{ color: ad.text_color ? ad.text_color + 'aa' : '#ffffffaa' }">
              {{ t('dashboard.ads.label') }}
            </p>
            <h3 class="ads-carousel__heading" :style="{ color: ad.text_color || '#ffffff' }">
              {{ ad.title }}
            </h3>
            <p v-if="ad.description" class="ads-carousel__desc" :style="{ color: ad.text_color ? ad.text_color + 'cc' : '#ffffffcc' }">
              {{ ad.description }}
            </p>
            <q-btn
              v-if="ad.target_url"
              unelevated
              no-caps
              class="ads-carousel__btn"
              :style="{ backgroundColor: ad.text_color || '#ffffff', color: ad.bg_color || '#162438' }"
              :label="t('dashboard.ads.learn_more')"
              icon-right="arrow_forward"
              @click="openTarget(ad.target_url)"
            />
          </div>
          <div class="ads-carousel__banner-image">
            <img
              v-if="ad.image_path"
              :src="ad.image_path"
              :alt="ad.title"
              class="ads-carousel__img"
            />
            <div v-else class="ads-carousel__placeholder">
              <q-icon
                name="campaign"
                size="56px"
                :style="{ color: ad.text_color ? ad.text_color + '33' : '#ffffff22' }"
              />
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  ads: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

const { t } = useI18n()

const slide = ref(null)

const openTarget = (url) => {
  window.open(url, '_blank')
}
</script>

<style scoped lang="scss">
.ads-carousel {
  margin-top: 24px;

  &__header {
    margin-bottom: 14px;
  }

  &__title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #111827;
    margin: 0;
  }

  &__loading {
    display: flex;
    justify-content: center;
    padding: 32px 0;
  }

  &__qcarousel {
    background: transparent;
    height: auto;

    :deep(.q-carousel__navigation) {
      position: relative;
      justify-content: flex-start;
      padding: 10px 0 0;
      gap: 6px;
    }

    :deep(.q-carousel__navigation-icon) {
      font-size: 6px !important;
      opacity: 0.3;
      transition: all 0.3s ease;
    }

    :deep(.q-carousel__navigation-icon--active) {
      opacity: 1;
      transform: scale(1.3);
    }
  }

  &__slide {
    padding: 0;
  }

  &__banner {
    display: flex;
    align-items: center;
    border-radius: 16px;
    overflow: hidden;
    max-height: 150px;
    position: relative;
  }

  &__banner-text {
    flex: 1;
    padding: 20px 16px 20px 20px;
    z-index: 1;
  }

  &__label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin: 0 0 6px;
  }

  &__heading {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.2;
    margin: 0 0 8px;
  }

  &__desc {
    font-size: 13px;
    line-height: 1.4;
    margin: 0 0 14px;
  }

  &__btn {
    font-weight: 600;
    font-size: 13px;
    padding: 8px 16px;
    border-radius: 8px;
    text-transform: none;
  }

  &__banner-image {
    width: 120px;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
