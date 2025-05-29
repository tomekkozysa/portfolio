<template>
    
	<ContentQuery path="/footer" find="one" v-slot="{ data }">
        <footer class="footer w-full flex justify-center">
            <ContentRenderer :value="data" class="footer-content w-full flex flex-col justify-start" />
            
        </footer>
        <!-- <NuxtLink to="/privacy-cookie-policy">privacy-cookie-policy</NuxtLink> -->
	</ContentQuery>
    <CookieBar></CookieBar>
</template>
<script setup>
</script>
	
    
    