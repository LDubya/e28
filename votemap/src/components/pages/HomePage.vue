<template>
    <div>
        <p>
            MuddyMaps is the first draft of what may become a webpage containing all sorts of data visualizations. 
            It currently features two of my original maps, each attempting to propose a solution to a design problem.
        </p>

        <homepage-callout></homepage-callout>
    </div>
</template>

<script>
import MapsInfo from '@/components/MapsInfo.vue';

export default {
    name: '',
    components: {
        'homepage-callout': MapsInfo,
    },
    data: function () {
        return {};
    },
};
</script>

<style scoped>
</style>