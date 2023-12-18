<!-- eslint-disable -->
<template>
  <div class="w-full text-xs md:text-base">
    <!-- <div
      class="p-2 mt-8 mb-1 bg-gray-100 rounded hidden md:grid grid-cols-2 items-center"
    >
      <div class="font-bold text-lg">All Clients</div>
     
    </div> -->
    <button
      @click="$router.go(-1)"
      class="mt-2 font-bold text-sm flex space-x-2 items-center"
    >
      <i class="fa fa-angle-left"></i>
      <span>Back</span>
    </button>
    <div
      v-if="loading"
      class="bg-middey-light rounded-xl flex justify-center items-center mt-10 py-28"
    >
      <Spinner />
    </div>
    <div
      v-else
      class="mb-5 w-full bg-middey-light rounded-xl shadow-xl pb-6 mt-2 font-medium"
    >
      <div
        class="flex font-bold rounded-t-xl text-xs md:text-base bg-[#0B0B24] text-middey-light p-4"
      >
        Client Profile
      </div>

      <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">ID</div>
          <div class="col-span-8">{{ user.id }}</div>
        </div>
      </div>
      <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">Full Name</div>
          <div class="col-span-8">
            {{ user.first_name }} {{ user.last_name }}
          </div>
        </div>
      </div>
      <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">Email</div>
          <div class="col-span-8">{{ user.user_email }}</div>
        </div>
      </div>
      <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">Username</div>
          <div class="col-span-8">{{ user.username }}</div>
        </div>
      </div>
      <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">Phone Number</div>
          <div class="col-span-8">{{ user.phone_number || "null" }}</div>
        </div>
      </div>
      <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">Phone Verified</div>
          <div class="col-span-8">{{ user.phone_verified || "False" }}</div>
        </div>
      </div>
      <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">Email Verified</div>
          <div class="col-span-8">
            {{ user.nll_user_email_address_verified || "False" }}
          </div>
        </div>
      </div>
      <!-- <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">Account Status</div>
          <div
            class="col-span-8"
            :class="
              user.rimplenet_account_status == 'Blocked'
                ? 'text-red-500'
                : 'text-green-600'
            "
          >
            {{ user.rimplenet_account_status || "Unblocked" }}
          </div>
        </div>
      </div> -->
      <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">KYC level</div>
          <div class="col-span-8">{{ user.user_kyc_level || "0" }}</div>
        </div>
      </div>
      <div class="border-b p-4">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-4">User Created On</div>
          <div class="col-span-8">{{ user.user_created_at }}</div>
        </div>
      </div>
      <div
        class="flex font-bold text-sm md:text-base bg-[#0B0B24] text-white p-4"
      >
        Client Transaction Details
      </div>

      <div class="border-b">
        <UserTransaction :user_id="userId" />
      </div>

      <div
        class="flex font-bold text-sm md:text-base bg-[#0B0B24] text-white p-4"
      >
        Client Merchant Account
      </div>

      <div class="p-4 flex gap-4">
        <button
          v-if="!user.is_user_merchant || user.is_user_merchant === 'no'"
          @click="handlerUserMerchant(user.id, 'yes')"
          class="flex justify-center items-center space-x-3 bg-green-500 text-white md:px-8 px-4 md:py-3 py-2 text-xs md:text-base rounded w-auto"
          :class="loading ? 'cursor-not-allowed' : ''"
          :disabled="loading"
        >
          <ActionLoader v-if="mloading && meta_value == 'yes'" />

          <div v-else class="">Enable</div>
        </button>
        <button
          v-else
          @click="handlerUserMerchant(user.id, 'no')"
          class="flex justify-center items-center space-x-3 bg-red-500 text-white md:px-8 px-4 md:py-3 py-2 text-xs md:text-base rounded w-auto"
          :class="loading ? 'cursor-not-allowed' : ''"
          :disabled="loading"
        >
          <ActionLoader v-if="mloading && meta_value == 'no'" />

          <div v-else class="">Disable</div>
        </button>
      </div>
      <div
        class="flex font-bold text-sm md:text-base bg-[#0B0B24] text-white p-4"
      >
        Client Account Status Action
      </div>

      <div class="p-4 flex gap-4">
        <button
          v-if="user.rimplenet_withdrawal_status === 'enabled'"
          @click="blockUser(user.id)"
          class="flex justify-center items-center space-x-3 bg-red-500 text-white md:px-8 px-4 md:py-3 py-2 text-xs md:text-base rounded w-auto"
          :class="loading ? 'cursor-not-allowed' : ''"
          :disabled="loading"
        >
          <ActionLoader v-if="loading" />

          <div v-else class="">Block user</div>
        </button>
        <button
          v-else
          @click="UnblockUser(user.id)"
          class="flex justify-center items-center space-x-3 bg-green-500 text-white md:px-8 px-4 md:py-3 py-2 text-xs md:text-base rounded w-auto"
          :class="loading ? 'cursor-not-allowed' : ''"
          :disabled="loading"
        >
          <ActionLoader v-if="loading" />

          <div v-else class="">Unblock user</div>
        </button>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import moment from "moment";
import ActionLoader from "../../components/ActionLoader.vue";
import Spinner from "../../components/Spinner.vue";
import axiosInstance from "@/Utils/axios.config.js";
import axios from "axios";
import * as util from "@/Utils/helper_function";
import UserTransaction from "../../components/UserTransaction.vue";

export default {
  name: "UserDetails",
  components: {
    Spinner,
    ActionLoader,
    UserTransaction,
    UserTransaction,
  },
  data() {
    return {
      user: null,
      acct_balance: null,
      loading: true,
      meta_value: "",
      mloading: false,
    };
  },
  computed: {
    userId() {
      return +this.$route.params.id;
    },
  },

  mounted() {
    this.getUserDetails();
    this.getBalance();
  },
  methods: {
    getDate(Format, date) {
      return moment(date).format(Format);
    },
    digitFormatter(balance) {
      return util.digitFormatter(balance);
    },
    getBalance() {
      this.loading = true;
      axios
        .get(
          `https://backend.middey.com/wp-json/rimplenet/v1/user-wallet-balance?user_id=${this.userId}&wallet_id=ngn`
        )
        .then((response) => {
          this.acct_balance = response.data.data.wallet_balance_formatted;
        })
        .catch((err) => {});
    },
    getUserDetails() {
      try {
        this.loading = true;
        axiosInstance
          .get(`/users/?user_id=${+this.userId}`, {
            headers: {
              authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJpYXQiOjE2ODcyNTg0NzksImV4cCI6MTcwMzAzODQ3OSwidXNlciI6eyJpZCI6MywidXNlcm5hbWUiOiJIb3JwZXloZXJtaSIsInJvbGVzIjpbImFkbWluaXN0cmF0b3IiXX19.xTsdL7O8CZPOMpVqb8EoAxqcc1FiSswDhSzp0jSRnkw`,
            },
          })
          .then((res) => {
            this.$toast.success("User Retrieved Succesfully");
            this.loading = false;
            this.user = res.data.data;

            console.log(res.data.data);
          });
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    blockUser(id) {
      this.loading = true;
      axios
        .get(
          `https://middleware.zugavalize.io/withdrawal-status/disabled/${id}`
        )
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.getUserDetails();

          this.$toast.success("User blocked succesfully");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    UnblockUser(id) {
      this.loading = true;
      axios
        .get(`https://middleware.zugavalize.io/withdrawal-status/enabled/${id}`)
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.getUserDetails();

          this.$toast.success("User unblocked succesfully");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
    handlerUserMerchant(id, meta_value) {
      this.mloading = true;
      this.meta_value = meta_value;
      const payload = {
        entity_type: "user",
        entity_id: id,
        meta_key: "is_user_merchant",
        meta_value,
      };
      axios
        .put(
          `https://backend.zugavalize.io/wp-json/nellalink/v1/smart-meta-manager`,
          payload
        )
        .then((res) => {
          console.log(res);
          this.mloading = false;
          this.getUserDetails();
          if (meta_value == "yes") {
            this.$toast.success("User Merchant account activated");
          } else {
            this.$toast.success("User Merchant account deactivated");
          }
        })
        .catch((error) => {
          this.mloading = false;
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
