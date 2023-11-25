export const uploadFile = (file) => {
  const formdata = new FormData();
  formdata.append("file", file, file.fileName);

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  return fetch(`${process.env.REACT_APP_SERVER_API}/upload`, requestOptions)
    .then((res) => {
      return res.json()
    });
}

export const getTerms = (id) => {
  return fetch(`${process.env.REACT_APP_SERVER_API}/uploads/${id}/terms`)
    .then((res) => res.json())
    .then((arr) => {
      return [...arr.map((el) => ({ ...el, timeStart: el?.time_start || '-', timeEnd: el?.time_end || '-' }))];
    });
}

export const getTranscription = (id) => {
  return fetch(`${process.env.REACT_APP_SERVER_API}/uploads/${id}/transcription`)
    .then((res) => res.text());
}

export const getState = (id) => {
  return fetch(`${process.env.REACT_APP_SERVER_API}/uploads/${id}/state`)
    .then((res) => {
      if (res.status === 404) {
        throw new Error('Not found');
      }

      return res.json();
    });
}