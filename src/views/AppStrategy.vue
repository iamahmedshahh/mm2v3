<template>
 <v-card>
    <v-row>
      <!-- <v-btn color="success" class="mt-12" @click="overlay = !overlay">Show Overlay</v-btn> -->

      <v-overlay :absolute="true" :model-value="overlay" contained persistent class="align-center justify-center">
        <v-btn color="warning" @click="setOverlay(false)">No Automation</v-btn>
      </v-overlay>
    </v-row>

    <v-toolbar flat dense color="indigo" style="height: 80px;">
      <v-toolbar-title style="padding-top: 40px;">
        Active Strategies
      </v-toolbar-title>
    </v-toolbar>
    <v-divider class="mx-4"></v-divider>
    <v-table fixed-header height="auto">
      <thead>
        <tr>
          <th class="text-left">Assetpair</th>
          <th class="text-left">Strategy</th>
          <th class="text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in strategies" v-bind:key="row.ticker">
          <td>{{ row.assetpair }}</td>
          <td>{{ row.strategy }}</td>
          <td>
            <div class="text-left">
              <v-chip class="ma-2" color="red" dark @click="stopStrategy(127)">
                <v-icon left>mdi-server-plus</v-icon>Stop  Strategy
              </v-chip>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<script>
import axios from 'axios'
// import StrategyProvider from "../lib/strategy.js";
import { ref } from 'vue'


export default {
  // props: ["strategies"],
  data: function() {
    return {
      overlay: ref(true),
      strategies: [],
    };
  },
  methods: {
    setOverlay: function(v){
      this.overlay = v
    },
    stopStrategy: function(){
      console.log("stop strategy")
    },
    isEnabled: function(coin) {
      console.log("isEnabled(): Checking " + coin);
      if (this.activeCoins.some(e => e.ticker === coin)) {
        return true;
      }
    },
    getServiceConfig: function() {
      axios
        .get("http://" + process.env.VITE_VUE_APP_WEBHOST + ":7780/config2")
        .then(response => {
          // console.log(response.data);
          // JSON responses are automatically parsed.
          if (response.data !== undefined) {
            // console.log(response.data.result)
            this.configService = response.data;
            console.log(
              "getServiceConfig(): configService: " +
                JSON.stringify(this.configService)
            );
            this.supportedCoins = this.configService;
            // this.supportedCoins = Object.keys(this.configService)
            console.log(this.supportedCoins);
          }
        })
        .catch(e => {
          this.customerrors.push(e);
        });
    },
    mockStrategies: function(){
      this.strategies = [
        {assetpair: 'KMD/BTC', strategy: 'Trade both ways.  Position 10%, Spread 2%'},
        {assetpair: 'KMD/USDC', strategy: 'Only BUY KMD.  Position 5%, Spread 2.5%'},
        {assetpair: 'ETH/BTC', strategy: 'ONly SELL ETH.  Position 20%, Spread 1%'},
        {assetpair: 'KMD/ETH', strategy: 'Trade both ways.  Position 5%, Spread 4%'},
        {assetpair: 'ETH/USDC', strategy: 'Trade both ways.  Position 5%, Spread 4%'}
      ]
    }
  },
  created: function() {
    this.mockStrategies()
    console.log("Strategy Created");
  }
};
</script>
<style scoped>
.v-overlay {
  opacity: 0.88;
}
</style>