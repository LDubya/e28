
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
            
            <div v-if="user">
                <hr />
                <h3>
                    Muddy Map specification:
                </h3>
                <p><a href="https://stemlounge.com/muddy-america-color-balancing-trumps-election-map-infographic/"
                        target="_blank">Muddy America : Color Balancing The Election Map - Infographic</a></p>
                <h2>
                    Cite this:
                </h2>

                <p>
                    <em>
                        "Muddy America: Color Balancing the Election Map &mdash; Infographic" (STEM Lounge, 2019) by Larry Weru
                        - https://stemlounge.com/muddy-america-color-balancing-trumps-election-map-infographic/
                    </em>
                </p>
            </div>
        </div>

        

    </div>
</template>

<script>

const Highcharts = require('highcharts/highmaps');
require('highcharts/modules/data')(Highcharts);

export default {
    data() {
        return {
            downloaded: false,
        };
    },
    computed : {
        user() {
            return this.$store.state.user;
        }
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
        this.generateMap();
    },
};
</script>

<style lang='scss' scoped>
#map {
}
</style>