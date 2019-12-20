<template>
    <div class="artists-main-wapper">
        <b-container>
            <b-row>
                <b-col lg="12">
                    <div class="component-content-wrapper">
                        <b-button v-if="!results" variant="primary" v-b-modal.modal-artists size="md">Search Artists</b-button>
                        <template v-if="results">
                            <div class="w-100">
                                <b-tabs content-class="" justified>
                                    <b-tab  v-for="result in results" ref="tab-worker" :key="result.artistId" @click.prevent="fetchArtist(result.artistName)">
                                        <template v-slot:title>
                                            <b-img :src="result.artworkUrl30" /> {{ result.artistName }}
                                        </template>
                                        <div class="content">
                                           
                                            <template v-if="singleArtist">
                                                
                                                <div class="our-team">
                                                    <div class="picture">
                                                        <b-img class="img-fluid" :src="singleArtist.artworkUrl100" />
                                                    </div>
                                                    <div class="team-content">
                                                        <h3 class="name">{{singleArtist.artistName}}</h3>
                                                        <h4 class="title">{{singleArtist.trackName}}</h4>
                                                         <b-link target="_blank" :href="singleArtist.artistViewUrl">View collection</b-link>
                                                    </div>
                                                </div>
                                            
                                            </template>
                                        </div>
                                    </b-tab>
                                    
                                </b-tabs>
                            </div>
                        </template>
                    </div>
                    <b-modal ref="modal-artists" id="modal-artists" hide-footer>
                        <template v-slot:modal-title>
                          Search Artists
                        </template>
                        <b-form>
                            <b-form-group
                                    
                                    label="Name:"
                                    label-for="txt_name"
                                    
                                >
                                <b-form-input
                                        id="txt_name"
                                        v-model="name"
                                        type="text"
                                        required
                                        placeholder="Enter name"
                                        ></b-form-input>
                            </b-form-group>
                             <b-form-group
                                    
                                    label="No. of Artists"
                                    label-for="txt_noOfArtists"
                                    
                                >
                                <b-form-input
                                        id="txt_noOfArtists"
                                        v-model="noOfTracks"
                                        type="text"
                                        required
                                        placeholder="Enter No. of artists"
                                        ></b-form-input>
                            </b-form-group>
                            <b-button class="mt-3" block @click.prevent="validateArtists">Submit</b-button>
                        </b-form>
                    </b-modal>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
import { configUri } from "../variables";
export default {
    name: "Artists",
    data() {
        return {
            name: null,
            noOfTracks: null,
            results: null,
            singleArtist: null

        }
    },
    methods: {
        fetchArtist: function(artistName) {
           
            axios
                .post(`${configUri}/search?term=${artistName}&limit=1`)
                .then(response => {
                    this.singleArtist = response.data.results[0];
                    
                    
                })
                .catch(error => {
                   this.makeAlert("oops something went wrong try again");
                })
        },
        validateArtists: function() {
            if(this.name == "jack" && this.noOfTracks == "4") {
              
               axios
                .post(`${configUri}/search?term=${this.name}&limit=${this.noOfTracks}`)
                .then(response => {
                    this.results = response.data.results;
                     this.$refs['modal-artists'].hide();
                    
                })
                .catch(error => {
                    this.makeAlert("oops something went wrong try again");
                })
            }
            else {
                this.makeAlert("Name & No. of Tracks are incorrect please try again");
                
            }
        },
       
        makeAlert: function(title) {
            this.$swal({
                toast: true,
                title: title,
               
            });
        }
    }
}
</script>
