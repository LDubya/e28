
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
    


            <div v-if="user">
                <hr />
                <h3>
                    Neutralizing Map Specification:
                </h3>
                <p><a href="https://medium.com/matter/the-trouble-with-the-purple-election-map-31e6cb9f1827"
                        target="_blank">The Trouble with the Purple Election Map</a></p>
                <h2>
                    Cite this:
                </h2>

                <p>
                    <em>
                        "The Trouble with the Purple Election Map" (MATTER, 2014) by Larry Weru -
                        https://medium.com/matter/the-trouble-with-the-purple-election-map-31e6cb9f1827
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
            downloaded : false,
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
                'https://stemlounge.oss.nodechef.com/neutral.json',
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