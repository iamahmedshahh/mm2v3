<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-toolbar flat dense>
        <v-toolbar-title>
          <span class="subheading">Single Order {{wallets.base.ticker}}</span>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>
      </v-toolbar>

      <v-divider class="mx-4"></v-divider>

      <v-form ref="form">
        <v-text-field v-model="price" :label="priceInOtherCoinLabel()" required></v-text-field>
        <v-text-field v-model="amount" :label="amountInBaseCoinLabel()" required></v-text-field>
        <v-card-text>
          <v-chip-group   
            class="justify-space-around"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip @click="ordersize_pc(5)">5%</v-chip>
            <v-chip @click="ordersize_pc(10)">10%</v-chip>
            <v-chip @click="ordersize_pc(25)">25%</v-chip>
            <v-chip @click="ordersize_pc(50)">50%</v-chip>
            <v-chip @click="ordersize_pc(100)">100%</v-chip>
          </v-chip-group>
        </v-card-text>
        <v-text-field v-model="total" :label="totalInOtherCoinLabel()" required></v-text-field>
        <div class="text-center">
          <v-chip class="ma-2" @click="buyBase(wallets.base.ticker)">
            
            Buy {{ amount }} {{ wallets.base.ticker }}
          </v-chip>
          <v-chip class="ma-2" dark @click="sellBase(wallets.base.ticker)">
            
            Sell {{ amount }} {{ wallets.base.ticker }}
          </v-chip>
        </div>
      </v-form>
      <v-overlay :opacity="0.88" :absolute="true" :model-value="orderSentOverlay">
          <v-progress-circular :size="70" :width="7" indeterminate></v-progress-circular>
      </v-overlay>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import {ref} from "vue";

export default {
  name: "SingleOrder",
  components: {},
  props: { wallets: { type: Object } },
  data: function() {
    return {
      absoluteOverlay: ref(true),
      orderSentOverlay: ref(false),
      currentStrategyInfo: "na...",
      price: "",
      amount: "",
      trade: { base: "", rel: "", price: "", amount: "0" }
    };
  },
  methods: {
    ordersizeResponse: function(amount) {
      this.amount = Number(Math.round(amount+'e8')+'e-8') 
    },
    priceInOtherCoinLabel: function() {
      return "Price in rel (quote) coin (" + this.wallets.rel.ticker + ")"
    },
    amountInBaseCoinLabel: function() {
      return "Amount in base coin (" + this.wallets.base.ticker + ")"
    },
    totalInOtherCoinLabel: function() {
      return "Total in rel (quote) coin (" + this.wallets.rel.ticker + ")"
    },
    ordersize_pc: function(pc) {
      this.$emit('ordersize-pc', pc)
    },
    handleOrderResponse: function(){
      this.orderSentOverlay = false
    },
    sellBase: function() {
      console.log("SingleOrder sell (base): " + this.wallets.base.ticker )
      let orderDetails = {}
      orderDetails.price = this.price
      orderDetails.amount = this.amount
      this.orderSentOverlay = true 
      this.$emit("sell-base", orderDetails)
      this.price = ""
      this.amount = ""
    },
    buyBase: function() {
      console.log("SingleOrder buy base: " + this.wallets.base.ticker )
      let orderDetails = {}
      orderDetails.price = this.price
      orderDetails.amount = this.amount
      this.orderSentOverlay = true 
      this.$emit("buy-base", orderDetails)
      this.price = ""
      this.amount = ""
    }
  },
  created: function() {
    console.log("SingleOrder Created");
  },
  computed: {
    total: function() {
      return this.price * this.amount;
    }
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
.v-text-field {
  background-color: white;
  color: black;
}
</style>

