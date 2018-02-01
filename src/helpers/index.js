export const ReverseSort = (a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw response;
  }
}
