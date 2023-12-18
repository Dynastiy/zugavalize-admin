<!-- eslint-disable -->
<template>
  <div class="h-screen">
    <div class="grid md:grid-cols-12">
      <div
        class="col-span-5 hidden h-screen bg-[#0B0B24] text-white  md:grid place-content-center"
      >
        <div class="flex flex-col items-center">
          <img
            src="@/assets/vertical_trans_fff.png"
            alt=""
            class="h-[170px] w-[170px] object-contain"
          />
          <h5 class="text-white mt-4">
            Zugavalize | Crypto Wallets, Exchange, Utility & a breath of fresh air
          </h5>
          <div class="w-[100px] h-[3px] bg-white my-1"></div>
          <!-- <div class="text-center text-white px-10 font-medium mt-4">
            Welcome to the future of banking with Middey.
            <div>Middey offers world class-banking services,</div>
            <div>made just for you.</div>
          </div> -->
        </div>
      </div>
      <div
        class="col-span-7 h-screen overflow-y-auto bg-[#0B0B24]   flex flex-col justify-center items-center"
      >
        <div class="mx-auto block md:hidden">
          <img
          src="@/assets/vertical_trans_fff.png"
            alt=""
            class="h-[200px] w-[200px] object-contain"
          />
        </div>
        <div class="login_box">
          <h2 class="  font-bold md:text-3xl text-xl">Sign In</h2>
          <small>Enter your details to Login</small>
          <div class="mt-4">
            <label>Username</label>

            <div class="mb-4 rounded flex border">
              <input
                type="text"
                name="identifier"
                v-model.trim="user_email"
                class="bg-transparent w-full border-none outline-none flex-1 p-3"
              />
            </div>
            <div class="text-red-500 w-full text-xs md:text-base">
              <p
                v-if="!$v.user_email.required && $v.user_email.$dirty"
                class=""
              >
                user_email is required!
              </p>
            </div>

            <label>Password</label>
            <div class="mb-4 rounded flex border items-center">
              <input
                :type="type"
                name="password"
                v-model.trim="password"
                @keypress.enter="submitForm"
                class="bg-transparent border-none outline-none flex-1 p-3"
              />
              <div
                class="text-blue-500 px-2 text-xs md:text-xl font-medium icon cursor-pointer"
                @click="showPassword"
              >
                <span v-if="showPasswordtoggle"
                  ><i class="fas fa-eye-slash"></i
                ></span>
                <span v-else><i class="fas fa-eye"></i></span>
              </div>
            </div>
            <div class="flex items-center justify-between mt-2">
              <div class="flex gap-4 items-center">
                <div>
                  <input
                    type="checkbox"
                    name="remember"
                    id="rememberMe"
                    class="transform scale-125"
                    @change="saveMyDetails"
                    :checked="rememberMe"
                  />
                </div>
                <label for="rememberMe" class="text-sm md:text-base font-medium"
                  >Remember me</label
                >
              </div>
            </div>
            <div class="text-red-500 w-full text-xs md:text-base">
              <p v-if="!$v.password.required && $v.password.$dirty" class="">
                Password is required!
              </p>
              <p v-if="!$v.password.minLength" class="">
                Password must be between 6 characters and above
              </p>
            </div>

            <div class="w-full mt-6 flex gap-4 items-center">
              <button
                @click="submitForm"
                class="flex justify-center items-center space-x-3 bg-[#0B0B24] text-white px-8 py-3 rounded"
                :class="getClass()"
                :disabled="loading"
              >
                <ActionLoader v-if="loading" />

                <div v-else class="font-medium">Sign In</div>
              </button>
              <a
                href="https://app.middey.com/?app_action=BIOMETIRCS_AUTH_ACTIVITY"
                :class="webview ? 'w-2/12' : 'hidden'"
              >
                <img src="@/assets/biometric.jpg" class="w-11 h-11" alt="" />
              </a>
            </div>

            <div
              class="text-sm font-medium mt-5 flex flex-col items-center space-x-1"
            >
              <span
                ><router-link
                  to="/forgotpassword"
                  class="text-[#0192ED] font-semibold"
                  >Forgot Password
                </router-link></span
              >
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
// import { reactive, computed  } from "@vue/composition-api"; // "from '@vue/composition-api'" if you are using Vue 2.x
// import useVuelidate from "@vuelidate/core";
// import { required, email } from "@vuelidate/validators";
import Cookies from "js-cookie";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import { useLogin } from "@/Utils/useAuth";
import ActionLoader from "./ActionLoader.vue";

export default {
  props: [],
  mixins: [validationMixin],
  data() {
    return {
      password: "",
      user_email: "",
     

      savedEmail: null,
      displayedEmail: "",
      type: "password",
      showPasswordtoggle: false,
      loading: false,
      webview: false,
      rememberMe: false,
    };
  },

  watch: {
    rememberMe() {
      if (!this.rememberMe) {
        Cookies.remove("user_email");
        this.savedEmail = null;
        this.email = "";
      }
    },
    // email() {
    //   if (this.rememberMe) {
    //     //if rememberMe is checked then store user email input at very click
    //     Cookies.set("user_email", this.email);
    //   }
    // },
  },
  mounted() {
    this.rememberMyDetails();
    const getDetails = Cookies.get("user_email");
    if (getDetails) {
      this.rememberMe = true;
    }

    let standalone = window.navigator.standalone,
      userAgent = window.navigator.userAgent.toLowerCase(),
      safari = /safari/.test(userAgent),
      ios = /iphone|ipod|ipad/.test(userAgent);

    if (ios) {
      if (!standalone && safari) {
        // Safari
      } else if (!standalone && !safari) {
        // iOS webview
        this.webview = true;
      }
    } else {
      if (userAgent.includes("wv")) {
        this.webview = true;
      } else {
        // Chrome
      }
    }
  },
  methods: {
    maskEmail(email) {
      const censorWord = function (str) {
        return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
      };

      const censorEmail = function (email) {
        const arr = email.split("@");
        return censorWord(arr[0]) + "@" + censorWord(arr[1]);
      };

      return censorEmail(email);
    },
    newAccount() {
      this.email = "";
      this.password = "";
      this.rememberMe = !this.rememberMe;
    },
    rememberMyDetails() {
      const getDetails = Cookies.get("user_email");
      if (getDetails) {
        this.displayedEmail = this.maskEmail(getDetails);
        this.email = getDetails;
        this.savedEmail = getDetails;

        this.rememberMe = true;
      }
    },
    saveMyDetails() {
      this.rememberMe = !this.rememberMe;
      Cookies.set("user_email", this.email);
    },
    showPassword() {
      this.showPasswordtoggle = !this.showPasswordtoggle;
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    handleLoading(state) {
      this.loading = state;
    },
    getClass() {
      if (this.webview) {
        return "w-10/12 ";
      }
      if (!this.webview) {
        return "w-full";
      }
      if (!this.webview && this.loading) {
        return "w-full cursor-not-allowed";
      }
    },
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        //Login Logic
        const credentials = {
          user_email: this.user_email,
          user_password: this.password,
          token_expiration: "persistent",
        };
        useLogin(
          credentials,
          this.$store,
          this.$router,
          this,
          this.handleLoading
        );
      } else {
      }
      //  this.$router.push('/dashboard')
    },
  },
  validations: {
    user_email: { email, required },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  components: { ActionLoader },
};
</script>
<!-- eslint-disable -->

<style scoped>
label {
  font-weight: 500;
  font-size: 14px;
}
.login_box {
  background-color: #fff;
  width: 80%;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 9%);
}
@media screen and (max-width: 768px) {
  .login_box {
    background-color: #fff;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0 5px 10px rgb(0 0 0 / 9%);
  }
}
</style>
