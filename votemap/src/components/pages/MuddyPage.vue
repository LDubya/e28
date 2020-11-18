
<template>
    <div>
        <h2>Muddy Map <br/><span class="light">2020 US Presidential Election</span></h2>

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
                Information about the Muddy Map:
            </h3>
            <p><a href="https://stemlounge.com/muddy-america-color-balancing-trumps-election-map-infographic/" target="_blank">Muddy America : Color Balancing The Election Map - Infographic</a></p>
        </div>
    </div>
</template>

<script>

const Highcharts = require('highcharts/highmaps');
require('highcharts/modules/data')(Highcharts);

export default {
    data() {
        return {
            mapData: {},
            downloaded: false,
        };
    },
    methods: {
        generateMap() {
            const self = this;
            Highcharts.getJSON( // This is my self-hosted API server. 
                                //Accepts GET requests. 
                                // Highcharts' getJSON sends an HTTP GET request.
                                // So using highcharts.getJSON instead of Axios
                'https://stemlounge.oss.nodechef.com/muddy.json',
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