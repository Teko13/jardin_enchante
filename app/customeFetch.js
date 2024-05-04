// This is a wrapper for the fetch function that will be used for client-side API requests, to centralize authentication or unauthorized error handling and redirections.

"use client";
import { useRouter } from "next/navigation";

export function customFetch() {
    const router = useRouter();
    const custom = async (url, options) => {
    return fetch(url, options)
    .then(res => {
        if(res.status === 401) {
            router.push("/login");
            return;
        }
        return res.json();
    })
    .catch(e => {
        log("Une erreur est survenue");
    })
    }
    return {custom};
}