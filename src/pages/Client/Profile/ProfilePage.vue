<template>
    <div class="profile-page tw:h-full bg-primary tw:flex tw:flex-col" >
        <div class="tw:pt-4 tw:w-full bg-primary">
            <div class="avatarProfile tw:mx-auto">
                {{ user?.name.charAt(0).toUpperCase() }}
            </div>
            <div class="tw:text-center tw:mt-4">
                <h5 class="tw:text-lg tw:font-semibold tw:text-white">{{ user?.name }}</h5>
                <p class="tw:text-white">{{ user?.email }}</p>
            </div>
        </div>
        <div class="content__profile tw:pt-2 tw:px-5 tw:flex tw:flex-col tw:flex-1 tw:pb-10" style="overflow: auto;" >

            <div class="optionContent tw:py-0 tw:mt-4 tw:py-2">
                <div class="flex justify-between items-center optionContent__item tw:py-4 tw:px-4">
                    {{ t('profile.my_vehicles') }}
                    <q-icon name="arrow_forward" />
                </div>
            </div>
            <div class="optionContent tw:py-0 tw:mt-4 tw:py-2">
                <div class="flex justify-between items-center optionContent__item tw:py-4 tw:px-4">
                    {{ t('profile.service_history') }}
                    <q-icon name="arrow_forward" />
                </div>
                <div class="flex justify-between items-center optionContent__item tw:py-4 tw:px-4 tw:mt-5">
                    {{ t('profile.schedule') }}
                    <q-icon name="arrow_forward" />
                </div>
            </div>
             <div class="optionContent tw:py-0 tw:mt-4 tw:py-2 ">
                <div class="flex justify-between items-center optionContent__item tw:py-4 tw:px-4">
                    {{ t('profile.my_data') }}
                    <q-icon name="arrow_forward" />
                </div>
                <!-- <div class="flex justify-between items-center optionContent__item tw:py-4 tw:px-4 tw:mt-5">
                    Planes
                    <q-icon name="arrow_forward" />
                </div> -->
                <div class="flex justify-between items-center optionContent__item tw:py-4 tw:px-4 tw:mt-5">
                    {{ t('profile.terms_conditions') }}
                    <q-icon name="arrow_forward" />
                </div>
                <div class="flex justify-between items-center optionContent__item tw:py-4 tw:px-4 tw:mt-5">
                    {{ t('profile.customer_support') }}
                    <q-icon name="arrow_forward" />
                </div>
            </div>
            <div class="optionContent tw:py-0  tw:mt-5 tw:text-red-600 tw:cursor-pointer"
            @click="logout()"
            >
                <div class="flex justify-between items-center optionContent__item tw:py-6 tw:px-4" v-if="!loadingLogout">
                    {{ t('profile.logout') }}
                    <q-icon name="logout" />
                </div>
                <div v-else class="flex justify-center">
                    <q-spinner color="primary" size="1.5em" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const {user}= storeToRefs(useAuthStore())
const router = useRouter()
const loadingLogout = ref(false);
const logout = () => {
    loadingLogout.value = true;
    authStore.logout()
    .then(() =>{
        router.push('/login')
    })
}

</script>

<style lang="scss" scoped>
.profile-page{

}
.optionContent{
    background: rgb(241, 241, 241);
    border-radius: 1rem;
    font-weight: 500;
    font-size: 16px;
    &__item{
        transition: all 0.2s ease-in;
        border-radius: 1rem;

        &:hover{
            background: rgba(97, 97, 97, 0.062);
        }
    }
}
.avatarProfile{
    height: 5rem; 
    width: 5rem; 
    border-radius: 15px; 
    background: white;
    color: $primary;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 40px;
}
.content__profile{
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 -5px 5px 0px rgba(243, 243, 243, 0.089);
    background: #f9fafb;
}
</style>