<template>
    <div  v-show="!hasAccepted" 
        :class="[isHidden ?  'is_hidden' : '' ]"
        class="cookie-bar py-4 px-8 flex flex-wrap items-center gap-4">
        I use Google Analytics to know how my website is performing, hope that's ok
        <div class="actions flex">
            <div class="cookie-bar-action" @click="() => { acceptCookies(); isHidden.value = true }">
                Yes, that's fine
            </div>
            <div class="cookie-bar-action" @click="() => { rejectCookies(); isHidden.value = true }">
                Please don't do it!
            </div>
        </div>
    </div>
</template>


<script setup>
const {
  hasAccepted,
  acceptCookies,
  rejectCookies,
  initialize
} = useCookieConsent()

const isHidden = ref(false)

onMounted(() => {
    console.log('useRuntimeConfig().public.gaId',useRuntimeConfig().public.gaId)
  initialize()
  if (hasAccepted.value) {
    isHidden.value = true
  }
})
</script>

<style>
.cookie-bar{
    position: sticky;
    bottom:0;
    transition: transform .3s ease-in-out, opacity .1s ease-in .2s;
    border-top:2px solid black;
    background-color: rgb(250,250,249);
    transition-delay: 1s;
    opacity: 1;
}
.cookie-bar.is_hidden{
    transition-delay: .1s;
    transform: translateY(100px);
    opacity: 0;
}
.cookie-bar-action{
    @apply py-3 px-4 bg-gray-800 text-white mx-2 rounded;
    white-space: nowrap;
    cursor: pointer;
    
}
</style>	
    
    