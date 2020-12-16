<template>
    <div id="app">

        <img
            alt="MuddyMaps logo"
            id="logo"
            src="@/assets/images/muddymaps-logo.png"
        />

        <nav>
            <ul>
                <li>
                    <router-link
                        v-for="link in links"
                        v-bind:key="link"
                        v-bind:to="paths[link]"
                        exact
                        >{{ link }}</router-link
                    >
                </li>
            </ul>
        </nav>

        <router-view
            v-on:render-map='renderMap($event)'
        ></router-view>

    </div>
</template>

<script>

const Highcharts = require('highcharts/highmaps');
require('highcharts/modules/data')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);

import { usAllAll } from '@/us-all-all.js'; // US map county-level SVG

export default {
    name: 'App',
    data() {
        return {
            /* Store links in an array to maintain order */
            links: [
                'home', 
                'neutralizing map',
                'muddy map',
                'account'
                ],

            /* Map links to the appropriate component */
            paths: {
                home: '/',
                'purple map' : '/purple', // maybe later?
                'neutralizing map' : '/neutralizing',
                'muddy map' : '/muddy',
                'account' : '/account'
            },
            usAllAll: usAllAll
        };
    },
    methods: {
        renderMap(data) {
            this.downloaded = true;

            var countiesMap = Highcharts.geojson(
                this.usAllAll
            );

            // Add state acronym for tooltip
            countiesMap.forEach(function (mapPoint) {
                mapPoint.name = mapPoint.name + ', ' +
                    mapPoint.properties['hc-key'].toUpperCase().substr(3, 2);
            });


            // Create the map
            setTimeout(function () { // Otherwise innerHTML doesn't update
                Highcharts.mapChart('container', {
                    chart: {
                        borderWidth: 0,
                        marginRight: 0 // for the legend
                    },

                    title: {
                        useHTML: false,
                        text: ""
                    },


                    legend: {
                        align: 'right',
                        x: 0,
                        floating: true,
                    },

                    mapNavigation: {
                        enabled: true
                    },

                    colorAxis: false,

                    plotOptions: {
                        mapline: {
                            showInLegend: false,
                            enableMouseTracking: false
                        }
                    },

                    series: [{
                        type: "map",
                        mapData: countiesMap,
                        data: data,
                        joinBy: ['fips', 'fips'],
                        name: '© Lawrence Weru',
                        tooltip: {
                            useHTML: true,
                            headerFormat: '',
                            format: '{value}'
                        },
                        borderWidth: 0.2,
                        states: {
                            hover: {
                                color: '#a4edba'
                            }
                        },
                        shadow: false,
                        events: {
                            legendItemClick: function () {
                                return false;
                            }
                        }
                    }],

                    exporting: {
                        scale: .5,
                        allowHTML: true,
                        buttons: {
                            contextButton: {
                                menuItems: [
                                    'viewFullscreen'
                                ]
                            }
                        }
                    }
                });
            }, 0);
        },
    },
    mounted() {
        this.$store.dispatch('authUser');
    }
};
</script>

<style lang='scss'>
@import '@/assets/scss/muddymaps.scss';
</style>
