import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Account, TypeAcc } from '../type/main.ts';

export const useAccountStore = defineStore('accountStore', ()=>{
    const accounts = ref<Account[]>([])

    const addAccount = ()=> {
            accounts.value.push({ id: crypto.randomUUID(),label: [], type: TypeAcc.LDAP, login: 'Значение', password: null });
        }

    const deleteAccount = (id: string)=> {
        const index = accounts.value.findIndex(account => account.id === id);
        if (index !== -1) {
            accounts.value.splice(index, 1);
        }
    }

    const updateAccount = (id: string, updatedAccount: Account)=> {
        const index = accounts.value.findIndex(account => account.id === id);
        if (index !== -1) {
            accounts.value[index] = updatedAccount;
        }
    }

    return {
        accounts,
        addAccount,
        deleteAccount,
        updateAccount
    }
}, {
  persist: true,
});
