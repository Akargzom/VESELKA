import axios from "axios";
export const instance = axios.create({
    baseURL: 'https://raduga.anebopro.com/DB-TEST/php/backend.php',
});
const API = {
    setKat: async (kat: string) => {
        return await instance.post('/', JSON.stringify({ content: kat, post: 'kat' }))
    }, 
    setSkip: async (skip: string) => {
        return await instance.post('/', JSON.stringify({ content: skip, post: 'skip' }))
    }, 
    SetWhenB: async (whenB: string) => {
        return await instance.post('/', JSON.stringify({ content: whenB, post: 'whenB' }))
    }, 
    SetRNum: async (rNum: number) => {
        return await instance.post('/', JSON.stringify({ content: rNum, post: 'rcount' }))
    }, 
    SetRDate: async (rDate: { mode: string, date: string }) => {
        return await instance.post('/', JSON.stringify({ content: rDate, post: 'lastr' }))
    },
    SetRMass: async (mass: Array<{ mode: string, date: string }>) => {
        return await instance.post('/', JSON.stringify({ content: mass, post: 'rdates' }))
    },
    SetPrg: async (prg: string) => {
        return await instance.post('/', JSON.stringify({ content: prg, post: 'prg' }))
    },
    fetchWhenB: async () => {
        return await instance.get('/').then(r => r.data.whenB)
    },
    fetchKat: async () => {
        return await instance.get('/').then(r => r.data.kat)
    },
    fetchSkip: async () => {
        return await instance.get('/').then(r => r.data.skip)
    },
    fetchRDate: async () => {
        return await instance.get('/').then(r => r.data.lastr.date)
    },
    fetchRMode: async () => {
        return await instance.get('/').then(r => r.data.lastr.mode)
    },
    fetchRNum: async () => {
        return await instance.get('/').then(r => r.data.rcount)
    },
    fetchRMass: async () => {
        return await instance.get('/').then(r => r.data.rdates)
    },
    fetchDialogs: async () => {
        return await instance.get('/').then(r => r.data.dialogs)
    },
    fetchSkipidar: async () => {
        return await instance.get('/').then(r => r.data.skipidar)
    },
    fetchKatarsis: async () => {
        return await instance.get('/').then(r => r.data.katarsis)
    },
    fetchTimezone: async () => {
        return await instance.get('/').then(r => r.data.timezone)
    },
    fetchPrg: async () => {
        return await instance.get('/').then(r => r.data.prg)
    }
}
export default API