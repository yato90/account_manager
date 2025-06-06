export enum TypeAcc{
    LDAP = "LDAP",
    LOCAL = 'Локальная'
}

export interface Account {
    id: string
    label: Array<{ text: string }>;
    type: TypeAcc;
    login: string;
    password: string | null;
}