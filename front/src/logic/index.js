import {getState} from "../api";
import EventBus from "js-event-bus";

export const statuses = {
  created: {
    order: 1,
    name: 'created'
  },
  audio: {
    order: 2,
    name: 'audio'
  },
  transcription: {
    order: 3,
    name: 'transcription'
  },
  summary: {
    order: 4,
    name: 'summary'
  },
  terms: {
    order: 5,
    name: 'terms'
  },
  died: {
    order: -1,
    name: 'died'
  }
}

export const pullState = (id, status, timing = 1000) => {
  return new Promise((resolve, reject) => {
    let isPulling = true;

    eventBus.once(events.onSummaryExit, (() => {
      isPulling = false;
      reject(events.onSummaryExit);
    }).bind(this));
    const pull = async () => {
      try {
        const state = await getState(id);

        if (state === 'died') {
          reject('died');
          return;
        }

        if (statuses[state]?.order >= statuses[status]?.order) {
          resolve(state);
        } else if (isPulling) {
          setTimeout(pull, timing);
        }
      } catch (err) {
        console.log(err, 'here');
        reject(err);
      }
    }

    pull()
  });
}

export const eventBus = new EventBus();

export const events = {
  onSummaryExit: 'onSummaryExit'
}

export const getSummariesHistory = () => {
  return JSON.parse(localStorage.getItem('history') || '[]');
}

export const setSummariesHistory = (history) => {
  return localStorage.setItem('history', JSON.stringify(history));
}