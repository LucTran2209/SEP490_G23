import { environment } from '../../environments/environment.development';

const cookiePrf = 'ERMS_';

const getCookie = (name: string) => {
  //Encode the cookie name to ensure special character are handle
  const nameEQ = `${cookiePrf}${name}` + '=';
  const listCookies = document.cookie.split(';');

  for (const element of listCookies) {
    let c = element;
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);

    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const removeCookie = (cookieName: string) => {
  let name = cookieName.startsWith(cookiePrf)
    ? cookieName
    : `${cookiePrf}${cookieName}`;

  //set expires time to past date
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};
/**
 *
 * @param excludes
 * remove all otherwhise some value
 */
const removeAllCookies = (excludes: Array<string> = []) => {
  const cookies = document.cookie.split(';');

  for (const element of cookies) {
    const [cookieName] = element.split('=');

    !excludes.includes(cookieName.trim()) && removeCookie(cookieName);
  }
};

const replaceCookie = (
  cookieName: string,
  cookieValue: string,
  expireTime: number | null,
  path: string
) => {
  let name = cookieName.startsWith(cookiePrf)
    ? cookieName
    : `${cookiePrf}${cookieName}`;
  const date = expireTime ? new Date(expireTime * 1000) : new Date();
  if (!expireTime) {
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000); //test 1 year
  }

  /** Tạo cookie */
  document.cookie = `${name}=${cookieValue};expires=${date.toUTCString()}; domain=${
    environment.baseDomain
  }; path=${path ?? '/'}`;
};
export { getCookie, removeAllCookies, removeCookie, replaceCookie };
