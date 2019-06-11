<template>
    <v-container fluid>
        <v-container fluid v-if="!loading">
            <v-carousel fluid>
                <v-carousel-item
                        v-for="(item,i) in promoAds"
                        :key="i"
                        :src="item.imgSrc"
                >
                    <div class="car-link">
                        <v-btn class="error" :to="'/ad/' + item.id">
                            {{item.title}}
                        </v-btn>
                    </div>
                </v-carousel-item>
            </v-carousel>
            <v-container grid-list-lg>
                <v-layout row wrap>
                    <v-flex
                            xs12
                            sm6
                            md4
                            v-for="ad of ads"
                            :key="ad.id"
                    >
                        <v-card>
                            <v-img
                                    class="white--text"
                                    height="200px"
                                    :src="ad.imgSrc"
                            >
                            </v-img>
                            <v-container fill-height fluid>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="headline">{{ad.title}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-card-title>
                                <div>
                                    <span>{{ad.description}}</span>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn flat :to="'/ad/' + ad.id">Open</v-btn>
                                <app-buy-modal :ad="ad"></app-buy-modal>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-container>
        <v-container fluid v-else>
            <v-progress-circular
                    :size="70"
                    :width="7"
                    color="black"
                    indeterminate
                    class="loader"
            ></v-progress-circular>
        </v-container>
    </v-container>
</template>

<script>
    export default {
        computed: {
            promoAds() {
                return this.$store.getters.promoAds
            },
            ads() {
                return this.$store.getters.ads
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>
    .car-link {
        position: absolute;
        bottom: 50px;
        left: 50%;
        background: rgba(0, 0, 0, 0.5);
        transform: translate(-50%, 0);
        padding: 5px 15px;
        border-radius: 5px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
    }
    .loader {
        margin: 200px auto;
        display: flex;
        padding: 24px;
    }
</style>
