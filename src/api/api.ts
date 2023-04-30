import axios from "axios";
export const instance = axios.create({
    baseURL: 'https://raduga.anebopro.com/php/backend.php',
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
    SetRMass: async (mass: Array<{ mode: string, date: string }>) => {
        return await instance.post('/', JSON.stringify({ content: mass, post: 'rdates' }))
    },
    SetPrg: async (prgPng: string) => {
        return await instance.post('/', JSON.stringify({ content: prgPng, post: 'prgPng' }))
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
    fetchRNum: async () => {
        return await instance.get('/').then(r => r.data.rcount)
    },
    fetchRMass: async () => {
        return await instance.get('/').then(r => r.data.rdates)
    },
    fetchDialogs: async () => {
        return await instance.get('/').then(r => r.data.dialogs)
    },
    fetchPrg: async () => {
        return await instance.get('/').then(r => r.data.prgPng)
    }
}
export default API