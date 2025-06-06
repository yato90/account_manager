<script setup lang="ts">
import { computed } from 'vue';
import { useAccountStore } from '../store/accountStore';
import AccountItem from './AccountItem.vue';
import Question from '../assets/question.png';

const accountStore = useAccountStore();
const accounts = computed(() => accountStore.accounts);


const addAccount = () => {
  accountStore.addAccount();
}

const deleteAccount = (index: string) => {
  accountStore.deleteAccount(index);
}

const updateAccount = (index: string, account: any) => {
  accountStore.updateAccount(index, account);
}
</script>

<template>
    <v-app>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="4"><h1>Учетные записи</h1></v-col>
              <v-col cols="1"><v-btn @click="addAccount">+</v-btn></v-col>
            </v-row>
            <v-alert type="info" textclass="mt-4">
              <template v-slot:prepend>
                <img :src="Question" alt="Question icon" style="width: 24px; height: 24px;">
              </template>
              Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
            </v-alert>
            <v-row v-for="(account) in accounts" :key="account.id" class="mt-4">
              <v-col cols="12">
                <AccountItem
                  :account="account"
                  @delete="deleteAccount(account.id)"
                  @update="updateAccount(account.id, $event)"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
</template>

<style scoped>
</style>
  