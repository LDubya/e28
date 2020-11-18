
<template>
    <div>
        <h2>Neutralizing Map <br/><span class="light">2020 US Presidential Election</span></h2>

        <div id="map">
            <div id="containerContainerContainer">
                <div id="containerContainer">
                    <div id="container">
                        <p> Processing county-level vote data... </p>
                        <p v-if="downloaded">
                            Generating map...
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="downloaded">
            <p>Note: Alaska borough-level vote data not yet available</p>
            <h3>
                Information about the Neutralizing Map:
            </h3>
            <p><a href="https://medium.com/matter/the-trouble-with-the-purple-election-map-31e6cb9f1827" target="_blank">The Trouble with the Purple Election Map</a></p>
        </div>

    </div>
</template>

<script>
// import { axios } from '@/app.js';


const Highcharts = require('highcharts/highmaps');
require('highcharts/modules/data')(Highcharts);

export default {
    data() {
        return {
            mapData : {},
            downloaded : false,
        };
    },
    methods: {
        generateMap() {
            const self = this;
            Highcharts.getJSON( // This is my self-hosted API server. 
                                //Accepts GET requests. 
                                // Highcharts' getJSON sends an HTTP GET request.
                                // So using highcharts.getJSON instead of Axios
                'https://stemlounge.oss.nodechef.com/neutral.json',
                function (data) {
                    self.downloaded = true;
                    self.$emit('render-map', data);
                }
            );
        },
    },
    mounted: function () {
        // this.mapData = "";
        this.generateMap();
    },
};
</script>

<style lang='scss' scoped>
#map {
}
</style>