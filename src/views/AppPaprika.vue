<template>
  <div>
    <h2>{{ appName }}</h2>

    <div v-for="coin in allprices" v-bind:key="coin.id">
      <v-table>
        <thead>
          <tr>
            <th class="text-center" span="2">{{ Object.keys(coin)[0] }}</th>
          </tr>
          <tr>
            <th class="text-left">Pair (base/rel)</th>
            <th class="text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in Object.values(coin)[0]" v-bind:key="row.id">
            <td>{{ Object.keys(row)[0] }}</td>
            <td>{{ Object.values(row)[0] }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "AppAggregators",
  data: function() {
    return {
      allprices: "",
      activeCoins: "",
      paprikaMarketData: "",
      cmcMarketData: "",
      market: null,
      appName: "Aggregator Prices",
      customerrors: ref([])
    };
  },
  methods: {
    getAllPrices: function() {
      axios
        .get(
          "http://" +
            import.meta.env.VITE_VUE_APP_WEBHOST +
            ":" +
            import.meta.env.VITE_VUE_APP_WEBPORT +
            "/" +
            import.meta.env.VITE_VUE_APP_MMBOTHOST +
            ":" +
            import.meta.env.VITE_VUE_APP_MMBOTPORT +
            "/api/v1/getallprice"
        )
        .then(response => {
          this.allprices = response.data;
          // response.data.forEach(function(coin) {
          //   console.log("MYLO: " + JSON.stringify(coin));
          // });
        })
        .catch(e => {
          this.customerrors.push(e);
        });
    },
    showPaprikaMarket: function(base, rel) {
      console.log("Paprika market:" + base + "/BTC");
      this.paprikaMarketData = base + "/BTC";
      axios
        .get(
          "http://" +
            import.meta.env.VITE_VUE_APP_WEBHOST +
            ":7780/getpaprkiamarketprice?base=" +
            base +
            "&rel=BTC"
        )
        .then(response => {
          // if response.data.result == "success"
          console.log(response.data);
          this.paprikaMarketData += " :" + response.data.price;
        })
        .catch(e => {
          this.customerrors.push(e);
        });
    },
    showCMCMarket: function(base, rel) {
      this.cmcMarketData = base + "/BTC";
      axios
        .get(
          "http://" +
            import.meta.env.VITE_VUE_APP_WEBHOST +
            ":7780/getcmcmarketprice?base=" +
            base +
            "&rel=BTC"
        )
        .then(response => {
          // if response.data.result == "success"
          console.log(response.data);
          this.cmcMarketData += " :" + parseFloat(response.data.result.Last);
        })
        .catch(e => {
          this.customerrors.push(e);
        });
    }
  },
  created: function() {
    console.log(this.appName + " Created");
    this.getAllPrices();
    console.log(this.appName + " Finished Created");
  },
  computed: {
    coinCount: function(row) {
      return this.activeCoins.length;
    }
  }
};
</script>