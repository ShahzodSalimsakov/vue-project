<template>
    <v-app>
        <v-navigation-drawer
                v-model="drawer"
                fixed
                app
        >
            <v-list>
                <v-list-tile
                        v-for="link in links"
                        :key="link.title"
                        :to="link.url"
                >
                    <v-list-tile-action>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title v-text="link.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile
                        v-if="isAuthorized"
                        @click="onLogout"
                >
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar color="indigo" dark fixed app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>
                <router-link to="/" tag="span" class="pointer">Ad application</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                        flat
                        v-for="link in links"
                        :key="link.title"
                        :to="link.url"
                >
                    <v-icon left>{{link.icon}}</v-icon>
                    {{link.title}}
                </v-btn>
                <v-btn
                        v-if="isAuthorized"
                        flat
                        @click="onLogout"
                >
                    <v-icon left>exit_to_app</v-icon>
                    Logout
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-container fluid fill-height>
                <v-layout
                        justify-center
                        align-center
                >
                    <router-view></router-view>
                </v-layout>
            </v-container>
        </v-content>
        <template v-if="error">
            <v-snackbar
                    color="error"
                    :multi-line="true"
                    :timeout="5000"
                    @input="closeError"
                    :value="true"
            >
                {{error}}
                <v-btn
                        dark
                        flat
                        @click.native="closeError"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </template>
        <v-footer color="indigo" app>
            <span class="white--text text-xs-right">&copy; {{new Date().getFullYear()}}</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false,
            }
        },
        computed: {
            error() {
                return this.$store.getters.error
            },
            isAuthorized() {
                return this.$store.getters.isAuthorized
            },
            links() {
                if (this.isAuthorized) {
                    return [
                        {title: 'Orders', icon: 'bookmark_border', url: '/orders'},
                        {title: 'New ad', icon: 'note_add', url: '/new'},
                        {title: 'My ads', icon: 'list', url: '/list'},
                    ]
                }
                return [
                    {title: 'Login', icon: 'lock', url: '/login'},
                    {title: 'Registration', icon: 'face', url: '/registration'},
                ]
            }
        },
        methods: {
            closeError() {
                this.$store.dispatch('clearError')
            },
            onLogout() {
                this.$store.dispatch('logoutUser');
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }
</style>