<template>
  <div>
    <v-card  class="mx-auto" outlined>
      <v-toolbar flat dense>
        <v-toolbar-title>
          <span class="subheading">Orders For {{ meName || "This Node"}}</span>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>
<!-- mePrivate and mePublic are set in .env* files of the root of the webapp project and read in at runtime -->
<div v-if="mePrivate == 'true' && mePublic == 'false'">
        <v-chip class="ma-2" outlined @click="cancelAllOrders()">
          Cancel All
        </v-chip>
</div>
      </v-toolbar>
      <v-divider class="mx-4"></v-divider>
      <div v-if="myOrders !== undefined && Object.keys(myOrders).length > 0">
        <v-table fixed-header>
          <thead>
            <tr>
              <th class="text-left">Pair</th>
              <th class="text-left">Can Cancel</th>
              <th class="text-left">Order Price</th>
              <th class="text-left">Amount</th>
<!-- mePrivate and mePublic are set in .env* files of the root of the webapp project and read in at runtime -->
<div v-if="mePrivate == 'true' && mePublic == 'false'">
              <th class="text-left">Shortcut</th>
</div>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in Object.keys(tidyMarketOrders)" v-bind:key="row.ticker">
              <td>
                <a style="text-decoration: underline;" @click="gotoMarket(tidyMarketOrders[row].base,tidyMarketOrders[row].rel)">{{ tidyMarketOrders[row].base }} / {{ tidyMarketOrders[row].rel }}</a>              
                  <v-chip  v-if="tidyMarketOrders[row].highlight" class="ma-2" x-small color="purple" dark >
                    <v-icon left>mdi-server-plus</v-icon>*
                  </v-chip>
              </td>
              <td>{{ tidyMarketOrders[row].cancellable ? 'YES' : 'NO' }}</td>
              <td>{{ roundedPrice(tidyMarketOrders[row].price) }}</td>
              <td>{{ roundedPrice(tidyMarketOrders[row].max_base_vol) }}</td>
              <td>
                <div class="text-right">
                  <!-- <v-chip class="ma-2" color="success" @click="gotoMarket(row.base, row.rel)">
                <v-icon left>mdi-server-plus</v-icon>Go to market
                  </v-chip>-->
<!-- mePrivate and mePublic are set in .env* files of the root of the webapp project and read in at runtime -->
<div v-if="mePrivate == 'true' && mePublic == 'false'">
                  <v-chip class="ma-2" dark @click="cancelOrder(tidyMarketOrders[row].uuid)">
                    Cancel
                  </v-chip>
</div>
                </div>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div v-else>Not implemented fully yet. Place a single order.</div>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["myOrders", "myOrdersThisMarket"],
  data: function() {
    return {
      meName: import.meta.env.VITE_VUE_APP_MENAME,
      mePrivate: import.meta.env.VITE_VUE_APP_MEPRIVATE,
      mePublic: import.meta.env.VITE_VUE_APP_MEPUBLIC,
      customerrors: []
    };
  },
  methods: {
    gotoMarket: function(base, rel) {
      console.log("Go to market");
      window.location.href = "/traderview/" + base + "/" + rel
      this.$router.push(this.$router.currentRoute);
    },
    cancelAllOrders: function() {
      this.$emit("cancel-all-orders")
    },
    cancelOrder: function(uuid) {
      console.log("Cancel order: " + uuid)
      this.$emit("cancel-order", uuid)
    }
  },
  created: function() {
    console.log("MyOrders Created");
    console.log("MyOrders Finished");
  },
  computed: {
    tidyMarketOrders: function(){
      const testArr = [...this.myOrdersThisMarket, ...this.myOrders]
// from https://stackoverflow.com/a/23080662
      let testx = testArr.filter((item, pos) => testArr.indexOf(item) === pos)
      console.log("Test array: " + testArr.length + testx.length)
      return testx
    },
    roundedPrice() {
        return price => {
          return Number((Math.round(price * 1e8) / 1e8).toFixed(8))
        }
    }
  }
};
</script>
<style scoped>

tr:hover{
  background-color: lightgray;
}
a:hover
{
  cursor:pointer;
}

</style>
