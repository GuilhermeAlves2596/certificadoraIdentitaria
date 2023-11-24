export function setUserAuth(user: any) {
  if (!!window) {
    window.localStorage.setItem(
      process.env.NEXT_PUBLIC_USER,
      JSON.stringify(user)
    );
  }
}

export function getUserAuth() {
  if (!!window) {
    const temp = window.localStorage.getItem(process.env.NEXT_PUBLIC_USER);
    return JSON.parse(temp);
  }
}

export function removeUserAuth() {
  if (!!window) {
    window.localStorage.removeItem(process.env.NEXT_PUBLIC_USER);
  }
}
