<!-- eslint-disable -->
<template>
  <div class="flex min-h-screen">
    <!-- <div
      class="toggle-menu px-4 bg-white fixed top-0 inset-x-0 flex justify-between items-center"
    >
      <a href="/dashboard" class="font-bold text-[#0192ED]">
        <img src="@/assets/Middey_Horizontal.png" class="logo" />
      </a>
      <div class="space-x-6 flex items-center">
        <button class=" ">
          <i class="fa-solid text-xl fa-bell"></i>
        </button>

        <button @click="toggle" class=" ">
          <i class="fa-solid text-xl fa-bars"></i>
        </button>
      </div>
    </div> -->

    <div
      class="md:ml-[300px] px-4 py-3 bg-[#f7f7f7] shadow-md text-[#000000] fixed top-0 inset-x-0 flex justify-between items-center"
    >
      <div class="font-bold capitalize flex gap-4 items-center">
        <button @click="toggle" class="md:hidden block">
          <i class="fa-solid text-xl fa-bars"></i>
        </button>
        <!-- <a href="/dashboard" class="font-bold text-[#0192ED]">
          <img src="@/assets/Middey_Horizontal.png" class="logo" />
        </a> -->
      </div>
      <div class="space-x-6 flex items-center">
        <button class=" ">
          <i class="fa-solid text-xl fa-bell"></i>
        </button>

        <button class=" ">
          <router-link to="/"
            ><img
              src="@/assets/Svg/user.svg"
              class="object-fit md:h-10 h-8 md:w-10 w-8"
          /></router-link>
        </button>
      </div>
    </div>

    <div
      v-if="isMobile"
      class="inset-0 bg-[#00000090] z-[3] absolute"
      @click="toggle"
    ></div>
    <div
      :class="[isMobile ? 'isOpen' : null, 'sidebar']"
      class="sidebar text-gray-400 transform duration-500 md:w-[300px] w-[280px] z-10 h-screen md:flex flex-col justify-between bg-white pb-10"
    >
      <div>
        <!-- <div
          class="grid place-content-center mx-auto uppercase text-white font-bold text-xl bg-[#0192ED] rounded-full h-28 w-28 mt-4 mb-3"
        >
          {{ currentUserData.first_name.charAt(0)
          }}{{ currentUserData.last_name.charAt(0) }}
        </div>
        <h2 class="font-medium mb-6 text-center">
          <span class="font-semibold">
            {{ currentUserData.first_name }} {{ currentUserData.last_name }}
          </span>
        </h2> -->
        <div class="ml-7 my-5">
          <a href="/dashboard" class="font-bold text-3xl text-yellow-500">
            Zugavalize
          </a>
        </div>

        <div
          class="flex items-center mt-14 mx-5 bg-[#95959533] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
        >
          <span class="w-2/12">
            <img src="../../assets/Svg/search_admin.svg" alt="" />
          </span>
          <div class="w-10/12">
            <input
              type="search"
              name="search"
              placeholder="Search.."
              class="bg-transparent outline-none px-2 py-1"
            />
          </div>
        </div>

        <div class="mt-4 px-5 space-y-2" @click="isMobile = false">
          <!-- Dashboard -->

          <router-link
            to="/dashboard"
            class="flex items-center mt-14 hover:bg-[#0092EC] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('/dashboard')
                ? 'bg-[#0092EC] text-[#ffffffdb]'
                : 'text-gray-400'
            "
          >
            <span class="w-2/12">
              <img src="../../assets/Svg/home.svg" alt="" />
            </span>
            <div class="w-10/12">Home</div>
          </router-link>

          <!-- Transaction -->

          <router-link
            to="/transactions"
            class="flex items-center mb-4 hover:bg-[#0092EC] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 mt-6 py-2"
            :class="
              isActiveRoute('transaction')
                ? 'bg-[#0092EC] text-[#ffffffdb]'
                : 'text-gray-400'
            "
          >
            <span class="w-2/12">
              <img src="../../assets/Svg/transaction.svg" alt=""
            /></span>
            <div class="w-10/12">Transactions</div>
          </router-link>
          <!-- Kyc -->

          <router-link
            to="#"
            class="flex items-center hover:bg-[#f3f4f1] hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('kyc')
                ? 'bg-[#f3f4f1] text-[#000]'
                : 'text-gray-400'
            "
          >
            <span class="w-2/12">
              <img src="../../assets/Svg/kyc.svg" alt="" />
            </span>

            <div class="w-10/12">KYC/Compliance</div>
          </router-link>

          <!-- Transaction -->

          <!-- Monitors -->

          <!-- Employee -->

          <router-link
            to="#"
            class="flex items-center hover:bg-[#0092EC] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('user')
                ? 'bg-[#0092EC] text-[#ffffffdb]'
                : 'text-gray-400'
            "
          >
            <span class="w-2/12">
              <img src="../../assets/Svg/users.svg" alt=""
            /></span>
            <div class="w-10/12">Users</div>
          </router-link>
          <router-link
            to="/admin/crdr"
            class="flex items-center hover:bg-[#0092EC] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('crdr')
                ? 'bg-[#0092EC] text-[#ffffffdb]'
                : 'text-gray-400'
            "
          >
            <span class="w-2/12">
              <img src="../../assets/Svg/users.svg" alt=""
            /></span>
            <div class="w-10/12">Admin Action</div>
          </router-link>
        </div>

        <!-- <div class="mt-4 py-2">
          <div
            class="flex items-center transform duration-500 transition-all font-medium text-base rounded-md hover:bg-[#0092EC] hover:text-[#ffffffdb] mx-5 px-5 py-2 mt-2 cursor-pointer"
          >
            <div class="w-2/12">
              <img src="../../assets/Svg/admin.svg" alt="" />
            </div>
            <div
              @click="toggleIntegration"
              class="w-10/12 flex justify-between items-center"
            >
              <div>Admin Actions</div>
              <div><i class="fa-solid fa-angle-down"></i></div>
            </div>
          </div>
        </div> -->
      </div>

      <div
        @click="logout"
        class="flex items-center transform duration-500 transition-all font-medium text-base rounded-md bg-[#0092EC33] text-[#0092EC] mx-5 px-5 mt-10 py-2 cursor-pointer"
      >
        <span class="w-2/12">
          <i class="fa-solid fa-arrow-right-from-bracket"></i
        ></span>
        <div class="w-10/12">Logout</div>
      </div>
    </div>
    <div class="main">
      <div class="w-full py-16 px-4">
        <router-view />
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { mapGetters } from "vuex";
export default {
  name: "admin",
  data() {
    return {
      isMobile: false,
      isIntegrationActive: false,
    };
  },
  watch: {
    // checkActivity() {
    //   if (this.checkActivity) {
    //     this.logout();
    //     this.$swal("Timeout, Your session has expired");
    //   }
    // },
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    pageHeader() {
      return this.$route.name;
    },
    checkMobile() {
      return this.isMobile;
    },
    checkActivity() {
      return this.$store.state.idleVue.isIdle;
    },
    ...mapGetters(["currentUser"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      localStorage.clear();
    },
    toggle() {
      this.isMobile = !this.isMobile;
    },
    toggleIntegration() {
      this.isIntegrationActive = !this.isIntegrationActive;
    },
    isActiveRoute(route) {
      if (this.currentPath.toLowerCase().includes(route)) {
        return true;
      }
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
.toggle-menu {
  display: none;
}
.sidebar {
  position: fixed;
  min-width: 300px;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background: rgb(11, 11, 36);
  @apply overflow-x-hidden shadow-sm;
}
.sidebar::-webkit-scrollbar {
  width: 4px;
}
.sidebar::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background: #999;
}
.main {
  margin-left: 300px;
  width: 100%;
  background: #f7f7f7;
}

.logo {
  width: 200px;
  height: 40px;
  object-fit: contain;
}
@media screen and (max-width: 640px) {
  .logo {
    width: 100px;
    height: 20px;
    object-fit: contain;
  }
  .toggle-menu {
    display: flex;
  }

  .main {
    margin-left: 0;
  }

  .sidebar {
    left: -100vw;
    transition: all 0.2s linear;
  }
  .sidebar.isOpen {
    left: 0;
  }
}
</style>
