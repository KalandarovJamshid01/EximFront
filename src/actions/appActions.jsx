import axios from 'axios';
import { responses, waitingResponses } from '../data/responses';
import user from '../data/user';
import admin from '../data/admin';
const AppAPIAsProxyAPI = 'http://localhost:3000';

export async function getServerStatus() {
    const serverStatus = await axios.get(AppAPIAsProxyAPI);
    return serverStatus ? { status: true } : { status: false };
}

export async function getResponses() {
    const { status } = await getServerStatus();
    if (status) return responses;
}

export async function getWaitingResponses() {
    const { status } = await getServerStatus();
    if (status) return waitingResponses;
}

export async function getUser() {
    const { status } = await getServerStatus();
    if (status) return user;
}

export async function getAdmin() {
    const { status } = await getServerStatus();
    if (status) return admin;
}