<template>
  <!-- <div>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Create Order</v-card-title>
        <v-container grid-list-sm>
          <v-row wrap>
            <v-col xs12 align-center justify-space-between>    
              <v-row align-center>
                <v-avatar size="40px" class="mr-4">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-row>
            </v-col>
            <v-col xs6>
              <v-text-field prepend-icon="business" placeholder="Company"></v-text-field>
            </v-col>
            <v-col xs6>
              <v-text-field placeholder="Job title"></v-text-field>
            </v-col>
            <v-col xs12>
              <v-text-field prepend-icon="mail" placeholder="Email"></v-text-field>
            </v-col>
            <v-col xs12>
              <v-text-field type="tel" prepend-icon="phone" placeholder="(000) 000 - 0000"></v-text-field>
            </v-col>
            <v-col xs12>
              <v-text-field prepend-icon="notes" placeholder="Notes"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>-->

  <v-row justify-center>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">New Order</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-row wrap>
              <v-col xs12 sm6 md6>
                <v-text-field
                  label="PRICE*"
                  hint="example 1.15"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col xs12 sm6 md6>
                <v-text-field
                  label="Amount*"
                  hint="example 42"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col xs12 sm12>
                <v-select :items="['KMD', 'RICK', 'MORTY', 'DGB', 'LTC']" label="COIN*" required></v-select>
              </v-col>
              <v-col xs12 sm6>
                <v-autocomplete
                  :items="['BTC', 'ETH', 'RFOX', 'DOGE']"
                  label="Markets"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Close</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "NewOrderDialog",
  //   components: {
  //     NewOrderDialog
  //   },
  props: {
    dialog: false
  }
  //   methods: {
  //     doAction: function(command) {
  //       console.log("HEY " + command)
  //       window.location.href='#/'+command.toLowerCase().replace(/ /g,'')
  //     }
  //   },
};
</script>