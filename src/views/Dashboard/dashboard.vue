<!-- eslint-disable -->
<template>
  <div class="w-full">
    <div class="p-2 mt-8 mb-1 rounded  md:grid grid-cols-2 items-center">
      <div class="font-bold text-lg md:block hidden text-black ">All Clients</div>
      <form @submit.prevent="getUsers" class="rounded flex space-x-2">
        <input
          type="search"
          name="sarch"
          required
          placeholder="Search by Email or Username or Name"
          v-model.trim="searchQuery"
          class="bg-middey-light border w-3/4 rounded  outline-none flex-1 p-3"
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
    <div class="md:hidden flex text-black font-bold text-base mb-2 mt-10">All Clients</div>

    <div v-if="loading" class="flex bg-middey-light justify-center items-center py-28">
      <Spinner />
    </div>
    <div
      v-else
      class="block  bg-middey-light table-wrapper mb-5 w-full rounded-xl shadow-xl  overflow-x-auto pb-6"
    >
      <table class="w-full items-center table-auto">
        <thead>
          <tr class="font-bold bg-[#DBEBFF] text-dark">
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">ID</th>
           
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
        <tbody v-if="users && users.length > 0" class="text-middey-text overflow-x-auto">
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
              <router-link
                :to="`/user/${item.ID}`"
                class="flex justify-center items-center space-x-3 bg-[#0192ED] text-white px-2 py-3 rounded w-auto"
              >
                View user
              </router-link>
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
</template>
<!-- eslint-disable -->
<script>
import moment from "moment";
import ActionLoader from "../../components/ActionLoader.vue";
import Spinner from "../../components/Spinner.vue";
import axiosInstance from "@/Utils/axios.config.js";
import axios from "axios";

export default {
  name: "Admin",
  components: {
    Spinner,
    ActionLoader,
  },
  data() {
    return {
      searchQuery: "",
      users: [],
      loading: false,
    };
  },
  computed: {
    filteredTransaction() {
      if (typeof this.transactions == "object") {
        return this.transactions.filter((item) =>
          item.note.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return [];
      }
    },
  },
  mounted() {
    // this.getData();
  },
  methods: {
    getDate(Format, date) {
      return moment(date).format(Format);
    },
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
    handleUser(id, action_value) {
      this.loading = true;
      const action = {
        user_id: id,
        meta_value: action_value,
      };
      axios
        .put(
          "https://middey-interface.herokuapp.com/monitoring/update-user-account-status",
          action
        )
        .then((res) => {
          this.loading = false;
          if (action_value == "Blocked") {
            this.$toast.success("User Blocked Succesfully");
          } else {
            this.$toast.success("User Unblocked Succesfully");
          }
          console.log(res);
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

</style>
