import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        citations: ["a","b","c","d"], // will have a "citations" list, that allows users to cite my infographics. 
    },
    mutations : {
        addCitation : (state, infographic) => {
            if( state.citations.indexOf(infographic) == -1 ){
                state.citations.push(infographic);
            }
        },
        removeCitation : (state, infographic) => {
            let citationIndex = state.citations.indexOf(infographic);
            if(citationIndex > -1){
                delete state[citationIndex]
            }
        }
    }
})