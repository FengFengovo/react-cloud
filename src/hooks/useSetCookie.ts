//存储cookie方法
export function useSetCookie(cookie:string){
    localStorage.setItem("cookie", cookie);
}