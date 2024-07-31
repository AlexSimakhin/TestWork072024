import {root} from './config';

export const api = Object.freeze({
  getContacts: {
    fetch: () => {
      return fetch(`${root}/contacts`, {
        method: "GET",
        credentials:'include'
      })
    }
  },
  getContact: {
    fetch: (id) => {
      return fetch(`${root}/contact/${id}`, {
        method: "GET",
        credentials:'include'
      })
    }
  },
  createContact: {
    fetch: (kind, body) => {
      return fetch(`${root}/contact/${kind}`, {
        method: "POST",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(body),
      })
    }
  },
  updateContact: {
    fetch: (kind, body, hash) => {
      return fetch(`${root}/records/${hash}?kind=${kind}`, {
        method: "PUT",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify(body),
      })
    }
  },
  removeContact: {
    fetch: () => {
      return fetch(`${root}/reports`, {
        method: "GET",
        credentials:'include'
      })
    }
  }
});