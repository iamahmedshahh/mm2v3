

<template>
  <v-app class="container">
    <v-app-bar color="green" class="app-bar">
      <v-toolbar-title class="ml-0 pl-4">
        <span class="hidden-sm-and-down">{{ appName }}</span>
      </v-toolbar-title>
      <v-btn rounded depressed dark large @click="gotoHome()">
        <h3>Dashboard</h3>
        <v-icon class="px-2">mdi-ballot</v-icon>
      </v-btn>
      <v-btn rounded depressed dark large @click="dialog = !dialog">
        <h3>Markets</h3>
        <v-icon class="px-2">mdi-apps</v-icon>
      </v-btn>
      <v-btn rounded depressed dark large @click="gotoSettings()">
        <h3>Settings</h3>
        <v-icon class="px-2">settings</v-icon>
      </v-btn>
      <v-btn rounded depressed dark large @click="gotoVerus()">
        <h3>Verus</h3>
        <v-icon class="px-2">mdi-apps</v-icon>
      </v-btn>
    </v-app-bar>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar>
          <v-btn dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Markets</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">back</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-list-subheader>Go to markets</v-list-subheader>
          <v-list-item>
              <v-list-item-title>Informational Section</v-list-item-title>
              <v-list-item-subtitle>Please wait for the available market links to load</v-list-item-subtitle>
              <AppMarkets v-on:gotoMarket="gotoMarket" :key="componentKey" />
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
        v-model="drawer"
        location="left"
        temporary
      >
        <v-list
          :items="items"
        ></v-list>
      </v-navigation-drawer>
      <Loading v-if="loading"></Loading>
      <router-view v-else>
      </router-view>
  </v-app>
</template>


<script>
import AppMarkets from './views/AppMarkets.vue'
import {ref, onMounted, onBeforeMount} from 'vue'
import Loading from './Loading.vue'


export default {
  name: 'App',
  components: {
    AppMarkets,
    Loading
},
  props: {
    source: String,
    base: String,
    rel: String
  },
  setup() {
    const loading = ref(true);
    onMounted(() => {
      setTimeout(() => {
        loading.value = false;
      }, 2000);
  });
    return {
      loading,
    };
  },

  methods: {
    gotoHome() {
      this.$router.push('/')
    },
    gotoSettings() {
      this.$router.push('/settings')
    },
    gotoVerus() {
      this.$router.push('/verus')
    },
    gotoMarket: function(base, rel) {
      console.log("Going to new market..." + base + "/")// + rel)
      console.log(this.componentKey)
      this.componentKey += 1
      this.dialog = !this.dialog
      window.location.href='/traderview/'+base+'/'+rel;
    },
    doAction: function(command) {
      window.location.href = "/" + command.toLowerCase().replace(/ /g, "");
    }
  },
  data: () => ({
    appName: 'OrderBook Live',
    base: '',  
    componentKey: ref(0),
    dialog: ref(false),
    drawer: ref(false),
    items: [
      { icon: "play_circle_outline", text: "Coins" },
      { icon: "blur_linear", text: "Orderbooks" },
      { icon: "swap_horiz", text: "Completed Swaps" },
      { icon: "swap_horizontal_circle", text: "Current Swap Status" },
      { icon: "save_alt", text: "Refill" },
      { icon: "eject", text: "Withdraw" },
      { icon: "control_camera", text: "Marketmaking" },
      { icon: "settings", text: "Settings" },
      { icon: "account_balance", text: "Antara Market Cap" },
      { icon: "trending_up", text: "CEX Prices" },
      { icon: "timeline", text: "Aggregator Prices" },
      { icon: "chat_bubble", text: "Send feedback" },
      { icon: "help", text: "Help" },
      { icon: "phonelink", text: "App downloads" }
    ]
  }),
  
  
}
</script>
<style>


</style>