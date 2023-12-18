=
<!-- eslint-disable -->
<template>
  <div>
    <div class="w-full h-screen overflow-y-auto py-6 px-4">
      <div class="bg-white rounded-lg p-4">
        <div class="max-w-4xl mx-auto">
          <div class="font-bold space-x-2 text-center">
            <div>Admin Debit and Credit - Step {{ step }}</div>
          </div>

          <div v-if="!isUserSelected">
            <div class="p-2 mt-8 mb-1 rounded">
              <form @submit.prevent="getUsers" class="rounded flex space-x-2">
                <input
                  type="search"
                  name="sarch"
                  required
                  placeholder="Search user by email or username "
                  v-model.trim="searchQuery"
                  class="bg-middey-light border w-3/4 rounded outline-none flex-1 p-3"
                  @keypress.enter="getUsers"
                />
                <button
                  class="flex justify-center items-center space-x-3 bg-[#0192ED] text-white px-8 py-3 rounded w-auto"
                  :class="loading ? 'cursor-not-allowed' : ''"
                  :disabled="loading"
                >
                  <ActionLoader v-if="loading" />

                  <div v-else class="font-medium">Search</div>
                </button>
              </form>
            </div>
            <div
              class="md:hidden flex text-black font-bold text-base mb-2 mt-10"
            >
              Searh Users
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
                      Email
                    </th>
                    <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
                      Username
                    </th>

                    <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody
                  v-if="users && users.length > 0"
                  class="text-middey-text overflow-x-auto"
                >
                  <tr
                    v-for="(item, idx) in users"
                    class="text-base font-medium hover:bg-gray-300 border-t border-gray-300"
                    :key="idx"
                  >
                    <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
                      {{ item.ID }}
                    </td>

                    <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
                      {{ item.data.user_email }}
                    </td>
                    <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
                      {{ item.data.user_nicename }}
                    </td>

                    <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
                      <div
                        @click="selectUser(item.ID)"
                        class="flex justify-center items-center space-x-3 bg-[#0192ED] text-white px-2 py-3 rounded w-auto"
                      >
                        Select user
                      </div>
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

          <div v-else>
            <form @submit.prevent="Submit">
              <input
                type="text"
                name="amount"
                required
                placeholder="Request-id"
                v-model="request_id"
                class="p-4 mt-4 font-semibold bg-transparent w-full outline-none border rounded"
              />
              <div class="grid md:grid-cols-3 gap-4 mt-4">
                <div class="w-full">
                  <p class="font-medium mb-2">Amount:</p>
                  <div class="bg-[#f7f7f7]">
                    <div class="">
                      <input
                        type="text"
                        name="amount"
                        required
                        placeholder="Amount"
                        v-model="amount"
                        class="p-4 font-semibold bg-transparent w-full outline-none border"
                      />
                    </div>
                  </div>
                </div>
                <div class="w-full">
                  <p class="font-medium mb-2">Transaction type</p>

                  <div class="gap-2 bg-[#f7f7f7]">
                    <select
                      name="From"
                      required
                      class="p-4 outline-none border bg-white rounded-md w-full"
                      v-model="transaction_type"
                    >
                      <option disabled selected>--Select Txn type--</option>
                      <option value="credits">Credit</option>
                      <option value="debits">Debit</option>
                    </select>
                  </div>
                </div>
                <div class="w-full">
                  <p class="font-medium mb-2">Currency</p>

                  <div class="gap-2 bg-[#f7f7f7]">
                    <select
                      name="From"
                      required
                      class="p-4 outline-none border bg-white rounded-md w-full"
                      v-model="wallet_id"
                    >
                      <option disabled selected>--Select--</option>
                      <option value="szcb">SZCB</option>
                      <option value="zusd">ZUSD</option>
                      <option value="usdt">USDT</option>
                      <option value="szc">SZC</option>
                      <option value="ngn">NGN</option>
                      <option value="susd">SUSD</option>
                    </select>
                  </div>
                </div>
              </div>

              <input
                type="text"
                name="note"
                v-model="note"
                required
                placeholder="Note"
                class="p-4 font-semibold bg-transparent w-full outline-none border rounded mt-2"
              />

              <button
                @click="submit"
                class="flex justify-center items-center max-w-max mx-auto bg-[#F0A500] text-black md:px-20 px-8 py-3 mt-16 rounded"
                :disabled="loading"
              >
                <ActionLoader v-if="loading" />

                <div v-else class="font-medium">Submit</div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import ActionLoader from "../../components/ActionLoader.vue";
import Spinner from "../../components/Spinner.vue";
import axiosInstance from "@/Utils/axios.config.js";
export default {
  name: "Debit-Credit",

  data() {
    return {
      loading: false,

      wallet_id: "",
      amount: 0,
      note: "",
      request_id: "",
      transaction_type: "",
      searchQuery: "",
      users: [],
      loading: false,
      user_id: null,
      isUserSelected: false,
      step: 1,
    };
  },

  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    selectUser(id) {
      this.step += 1;
      this.user_id = id;
      this.isUserSelected = true;
    },
    Submit() {},
    getUsers() {
      const searchParams = {
        rimplenet_search_user: this.searchQuery,
      };
      try {
        this.loading = true;

        axiosInstance
          .post("/users/search/", searchParams, {
            headers: {
              authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJpYXQiOjE2NTcxOTcxNTksImV4cCI6MTY3Mjk3NzE1OSwidXNlciI6eyJJRCI6MSwidXNlcm5hbWUiOiJCcnVpeiIsInVzZXJfZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQWRleWVtaSIsImxhc3RfbmFtZSI6IkF5b21pIiwicm9sZXMiOlsiYWRtaW5pc3RyYXRvciJdfX0.4mOg8AWJHBqKzsikPJcTilJcJOILh6keqh1MQUgJWWg",
            },
          })
          .then((res) => {
            this.$toast.success("Users Retrieved Succesfully");
            this.loading = false;
            this.users = res.data;

            console.log(res.data);
          });
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    submit() {
      this.loading = true;
      const payload = {
        request_id: this.request_id,
        amount: parseFloat(this.amount),
        wallet_id: this.wallet_id,
        user_id: +this.user_id,
        note: this.note,
        admin_id: +this.currentUser.user_id,
      };

      let url;
      // if (this.transaction_type == "debit") {
      //   url = "https://admin-middleware.zugavalize.io/debit/user";
      // } else {
      //   url = "https://admin-middleware.zugavalize.io/credit/user";
      // }
      url = `https://backend.zugavalize.io/wp-json/rimplenet/v1/${this.transaction_type}`
      axios
        .post(url, payload, {
          // headers: {
          //   Authorization: `Bearer ${this.currentUser.access_token}`,
          // },
          headers: {
            Authorization: `Bearer YWRtaW5fenVnYXZhbGl6ZTpQQmdXIDIwSTMgNlQzeCBLMzA0IERmM2sgcnIzSiA5SVRkIFA=`,
          },
        })
        .then((res) => {
          this.loading = false;
          this.$toast.success("Action Successful");
          this.request_id = "";
          this.amount = "";
          this.wallet_id = "";
          this.user_id = "";
          this.note = "";
          this.admin_id = "";
          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error(err.response.data.message);

          console.log(err);
        });
    },
  },
  components: {
    Spinner,
    ActionLoader,
  },
};
</script>
