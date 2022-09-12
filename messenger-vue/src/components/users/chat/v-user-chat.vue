<template>
  <div class="v-user-chat">
    <div class="v-user-chat_wrapper">
      <v-message
        v-for="message in messages.chat"
        :key="message.id"
        :message="message"
      />
    </div>
    <div class="input__field">
      <input
        type="text"
        class="v-user-chat__textfield"
        v-model="textValue"
        @keypress.enter="sendMessage"
      >
      <i class="material-icons send-btn" @click="sendMessage">send</i>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import vMessage from './v-message'

  import axios from "axios";

  export default {
    name: "v-user-chat",
    components: {
      vMessage
    },
    props: {
      // передача props из роутера
      id: {type: Number, required: true}
    },
    data() {
      return {
        textValue: '',
        messages: []
      }
    },
    computed: {
      ...mapState([
        'chats'
      ]),
    },
    methods: {
      sendMessage() {
        let user = {...this.messages};
        let chat = {
          id: this.messages.chat.length + 1,
          time: new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: 'numeric',
            minute: 'numeric'
          }),
          text: this.textValue,
          type: 'own'
        };
        this.textValue = '';

        user.chat.push(chat);

        this.postMsg(user)

      },
      postMsg(user) {
        return axios.put( 'http://localhost:3000/chats/' + user.id, user )
        .then((response) => {
          return response;
        })
      },
    },
    created() {
      this.chats.find((chat) => {
        if (chat.id == this.id) {
          this.messages = chat;
        }
      })
    },
  }

</script>

<style lang="scss">
</style>
<!-- @keypress.enter - по клику на enter -->
