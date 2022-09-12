<template>
  <div class="v-contact-user-info">
    <div class="info__avatar"></div>
    <div class="info__content">
      <div class="info__name">
        <span>{{  contact_info.phone  }}</span>
      </div>
      <div class="info__tools">
        <button class="start-call">Call</button>
        <button class="start-chat" @click="checkChats">
          Start chat
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "v-contact-user-info",
    data() {
      return {
        contact_info: {}
      }
    },
    computed: {
      ...mapState([
        'contacts',
        'chats'
      ])
    },
    methods: {
      ...mapActions([
        'FETCH_CHATS'
      ]),
      checkChats() {
        if(!this.chats.length) {
          this.FETCH_CHATS()
          .then(() => {
            this.toChat()
          })
        } else {
          this.toChat()
        }
      },
      toChat() {
        this.chats.map((chat) => {
          if (chat.id === this.contact_info.id) {
            this.$router.push({
              name: 'user',
              params: {
                id: this.contact_info.id,
                login: this.contact_info.name
              },
            })
          }
        })
      }
    },
    mounted() {
      this.contacts.find((contact) => {
        if (contact.id == this.$route.query.id) {
          this.contact_info = contact;
        }
      })
    },
  }
</script>
<style lang="scss">
</style>
