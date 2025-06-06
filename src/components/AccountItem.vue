<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineEmits } from 'vue';
import { Account, TypeAcc } from '../type/main.ts';
import Trash from '../assets/trash.png';
import Eye from '../assets/eye.png';
import Closed_eye from '../assets/closed-eye.png';

const props = defineProps<{
  account: Account,
}>();
const emit = defineEmits(['delete', 'update']);

const account = ref<Account>(props.account);
const tempLogin = ref<string>(account.value.login); // Временное хранилище для логина
const tempPassword = ref<string | null>(account.value.password); // Временное хранилище для пароля
const labelString = ref((account.value.label || []).map(item => item.text).join(';'));
const types = ['LDAP', 'Локальная'];
const showPassword = ref(false);
const isValid = computed(() => validateAccount(account.value, tempLogin.value, tempPassword.value, labelString.value));

const onLabelBlur = () => {
  if (isValid.value) {
    account.value.label = labelString.value.split(';').map(text => ({ text }));
    emit('update', account.value);
  }
}

const onChange = () => {
  if (isValid.value) {
    if (account.value.type == 'LDAP') {
      account.value.password = null;
      tempPassword.value = null;
    }
    emit('update', account.value);
  }
}

const onBlur = () => {
  if (isValid.value) {
    account.value.login = tempLogin.value;
    account.value.password = tempPassword.value;
    emit('update', account.value);
  }
}

const onDelete = () => {
  emit('delete');
}

const validateAccount = (account: Account, tempLogin: string, tempPassword: string | null, tempLabel: string | null): boolean => {
  if (!tempLabel || tempLabel.length === 0 || tempLabel.length > 50) {
    return false;
  }
  if (!tempLogin || tempLogin.length === 0 || tempLogin.length > 100) {
    return false;
  }
  if (account.type === TypeAcc.LOCAL && (!tempPassword || tempPassword.length === 0 || tempPassword.length > 100)) {
    return false;
  }
  return true;
}
</script>

<template>
  <v-card :class="{'invalid': !isValid}" outlined>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model.lazy="labelString"
            @blur="onLabelBlur"
            label="Метки"
            placeholder="Необязательно"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="account.type"
            @update:modelValue="onChange"
            :items="types"
            label="Тип записи"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            v-model.lazy="tempLogin"
            @blur="onBlur"
            label="Логин"
          ></v-text-field>
        </v-col>
        <v-col v-if="account.type === TypeAcc.LOCAL">
          <v-text-field
            v-model.lazy="tempPassword"
            @blur="onBlur"
            label="Пароль"
            :type="showPassword ? 'text' : 'password'"
          >
            <template v-slot:append>
              <img
                :src="showPassword ? Eye : Closed_eye"
                @click="showPassword = !showPassword"
                style="cursor: pointer; width: 24px; height: 24px;"
              />
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="auto">
          <v-btn @click="onDelete">
            <img :src="Trash" alt="Question icon" style="width: 24px; height: 24px;">
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

  
<style scoped>
.invalid {
  border: 1px solid red;
}
</style>
  