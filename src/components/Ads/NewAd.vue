<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h1 class="text--secondary mb-3">Create new ad</h1>
                <v-form v-model="valid" ref="form" validation class="mb-3">
                    <v-text-field
                            prepend-icon="person"
                            name="title"
                            label="Ad title"
                            type="text"
                            v-model="title"
                            :rules="[v => !!v || 'Title is required']"
                    ></v-text-field>
                    <v-textarea
                            id="password"
                            prepend-icon="lock"
                            name="description"
                            label="Ad description"
                            type="text"
                            v-model="description"
                            :rules="[v => !!v || 'Description is required']"
                    ></v-textarea>
                </v-form>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn class="mb-3"
                               @click="triggerUpload"
                        >
                            Upload image
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <input
                                type="file"
                                accept="image/*"
                                style="display: none"
                                ref="fileInput"
                                @change="onFileChange"
                        >
                        <v-flex
                                xs12
                                sm6
                                md4
                        >
                            <v-card>
                                <v-img
                                        v-if="imageSrc"
                                        class="white--text"
                                        height="200px"
                                        :src="imageSrc"
                                >
                                </v-img>
                            </v-card>
                        </v-flex>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img src="" alt="" height="200px">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-switch
                                v-model="promo"
                                label="Add to promo?"
                        ></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn
                                :loading="loading"
                                class="success"
                                @click="createAd"
                                :disabled="(!valid || !image) || loading"
                        >Create ad
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                description: '',
                valid: false,
                promo: false,
                image: null,
                imageSrc: ''
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            createAd() {
                if (this.$refs.form.validate() && this.image) {
                    const ad = {
                        title: this.title,
                        description: this.description,
                        promo: this.promo,
                        img: this.image
                    };
                    this.$store.dispatch('createAd', ad)
                        .then(() => {
                            this.$router.push('/list')
                        })
                        .catch(() => {
                        })
                }
            },
            triggerUpload() {
                this.$refs.fileInput.click();
            },
            onFileChange(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = e => {
                    this.imageSrc = reader.result
                };
                reader.readAsDataURL(file);
                this.image = file
            }
        }
    }
</script>

<style>

</style>
