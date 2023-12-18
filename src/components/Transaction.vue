<!-- eslint-disable -->
<template>
  <div class="py-16 px-4">
    <div class="w-full">
      <div class="md:hidden flex text-black font-bold text-base mb-2 mt-10">
        All Transactions
      </div>

      <div
        v-if="loading"
        class="flex bg-middey-light justify-center items-center py-28"
      >
        <Spinner />
      </div>
      <div
        v-else
        class="block bg-middey-light table-wrapper mb-5 w-full rounded-xl shadow-xl overflow-x-auto pb-6"
      >
        <table class="w-full items-center table-auto">
          <thead>
            <tr class="font-bold bg-[#DBEBFF] text-dark">
              <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
                ID
              </th>
              <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
                Naration
              </th>
              <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
                Amount
              </th>
              <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
                Date
              </th>

              <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody
            v-if="TransactionDetails && TransactionDetails.length > 0"
            class="text-middey-text overflow-x-auto"
          >
            <tr
              v-for="(item, idx) in TransactionDetails"
              class="text-base font-medium hover:bg-gray-300 border-t border-gray-300"
              :key="idx"
            >
              <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
                {{ item.transaction_id }}
              </td>
              <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
                {{ item.note || "No naration" }}
              </td>
              <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
                <div
                  :class="
                    item.txn_type == 'CREDIT'
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                >
                  <span v-if="item.txn_type == 'CREDIT'">+</span
                  ><span v-else>-</span>
                  {{ item.amount_formatted_disp }}
                </div>
              </td>
              <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
                {{ getDate("lll", item.post_date) }}
              </td>

              <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
                <button
                  @click="reverseTransaction(item.transaction_id)"
                  class="flex justify-center items-center space-x-3 text-white px-2 py-3 rounded w-auto"
                  :disabled="isLoading"
                  :class="[isLoading ? 'bg-blue-200' : 'bg-[#0192ED]']"
                >
                  <span v-if="isLoading"> Reversing.... </span>
                  <span v-else> Reverse </span>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else class="flex justify-center">
            <h1 class="text-center py-4 text-lg font-medium text-red-500">
              No result found
            </h1>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between">
      <button
        :class="page !== 1 ? 'opacity-100' : 'opacity-0'"
        @click="prevHandler"
        class="flex justify-center items-center space-x-3 bg-[#F0A500] text-white px-8 py-3 rounded w-auto"
      >
        Prev {{ page }}
      </button>
      <button
        @click="paginationHandler"
        class="flex justify-center ml-auto items-center space-x-3 bg-[#F0A500] text-white px-8 py-3 rounded w-auto"
      >
        Next
        {{ page + 1 }}
      </button>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import moment from "moment";

import { mapGetters } from "vuex";

import axios from "axios";
import Spinner from "../components/Spinner.vue";
export default {
  name: "Transaction",
  components: {
    Spinner,
  },
  data() {
    return {
      searchQuery: "",
      loading: false,
      isLoading: false,
      page: 1,
      TransactionDetails: [],
      transactionMobileData: {},
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },
  mounted() {
    this.getTransactionHistory();
  },
  methods: {
    paginationHandler() {
      this.page++;
      this.getTransactionHistory();
    },
    prevHandler() {
      this.page--;
      this.getTransactionHistory();
    },
    async getTransactionHistory() {
      this.loading = true;
      await axios
        .get(
          `https://backend.zugavalize.io/wp-json/rimplenet/v1/transactions?pageno=${this.page}`
        )
        .then((response) => {
          this.loading = false;
          this.TransactionDetails = response.data;
          // this.TransactionDetails.forEach((item) => {
          //   const date = item.post_date.split(" ")[0];
          //   if (this.transactionMobileData[date]) {
          //     this.transactionMobileData[date].push(item);
          //   } else {
          //     this.transactionMobileData[date] = [item];
          //   }
          // });
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
      console.log(this.TransactionDetails);
    },
    getDate(Format, date) {
      return moment(date).format(Format);
    },
    async reverseTransaction(id) {
      this.isLoading = true;
      await axios
        .get(
          `https://backend.zugavalize.io/wp-json/rimplenet-wallet-addon/v1/reverse-transaction?transaction_id=${id}&reversed_by=admin`,
          {
            transaction_id: id,
            reversed_by: "admin",
          }
        )
        .then((response) => {
          this.isLoading = false;
          console.log(response);
          this.$toast.success("Transaction successfully reversed");
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
      console.log(this.TransactionDetails);
    },
  },
};
</script>
