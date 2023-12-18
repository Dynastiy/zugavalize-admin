<!-- eslint-disable -->
<template>
  <div class="w-full py-16 px-4">
    Hello
</div>
</template>
<!-- eslint-disable -->

<script>
import axios from "axios";
import * as util from "@/Utils/helper_function";
import { mapGetters } from "vuex";
import Send from "./Send.vue";
import Receive from "./Receive.vue";
import Transaction from "./Users.vue";
export default {
  name: "DashboardComponent",
  data() {
    return {
    
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },
  mounted() {
    // this.getBalance();
    // this.getTransactionHistory();
  },
  methods: {
    handleSendModal() {
      if (this.currentUserData.user_kyc_level == "1") {
        this.isOpenSend = !this.isOpenSend;
      } else {
        this.$router.push("kyc");
      }
    },
    handleReceiveModal() {
      if (this.currentUserData.user_kyc_level == "1") {
        this.isOpenReceive = !this.isOpenReceive;
      } else {
        this.$router.push("kyc");
      }
    },
    hideBalance() {
      this.showBalance = !this.showBalance;
    },
    generateAccountNumber() {
      if (
        this.currentUserData.nll_user_email_address_verified == "yes" &&
        this.currentUserData.phone_verified
      ) {
        this.$router.push("/kyc");
      } else {
        this.Overlay = this.Overlay;
      }
    },
    async handleCopy(item) {
      await navigator.clipboard.writeText(item).then(() => {
        this.$toast.success("Copied");
      });
    },
    getBalance() {
      this.loading = true;
      axios
        .get(
          `https://backend.middey.com/wp-json/rimplenet/v1/user-wallet-balance?user_id=${this.currentUserData.id}&wallet_id=ngn`
        )
        .then((response) => {
          this.acct_balance = response.data.data.ngn;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getTransactionHistory() {
      this.transactionLoader = true;

      axios
        .get(
          `https://backend.middey.com/wp-json/rimplenet/v1/transactions?user_id=${this.currentUserData.id}`
        )
        .then((response) => {
          this.TransactionDetails = response.data.data;
          this.TransactionDetails.forEach((item) => {
            const date = item.post_date.split(" ")[0];
            if (this.transactionMobileData[date]) {
              this.transactionMobileData[date].push(item);
            } else {
              this.transactionMobileData[date] = [item];
            }
          });
          this.transactionLoader = false;
        })
        .catch((err) => {
          console.log(err);
          this.transactionLoader = false;
        });
    },
    digitFormatter(balance) {
      return util.digitFormatter(balance);
    },
  },
  components: { Transaction, Send, Receive },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
.booknow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
}
.copy .icon {
  display: none;
}
.copy:hover .icon {
  display: flex;
}
.card {
  background: url("../assets/card-wallet.jpeg");
  background-size: cover;
  background-position: 50%;
  border-radius: 10px;
  display: flex;
  align-items: start;
  padding: 2rem;
}
</style>
