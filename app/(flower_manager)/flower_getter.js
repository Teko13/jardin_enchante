export const getFlowers = async (limit = 0) => {
    let path = (limit > 0) ? "http://localhost:3000/api/flower?limit=" + limit : "http://localhost:3000/api/flower"
    const flowers = await fetch(path, {
        next: {
            revalidate: 0
        }
    });
    return await flowers.json();
}
export const getFlower  = async (slug) => {
    const url = "http://localhost:3000/api/flower/" + slug;
    const data = await fetch(url, {
        nex: {
            revalidate: 0
        }
    });
    return await data.json();
}
export const getFlowersById = async (ids) => {
    const url = "http://localhost:3000/api/flower/";
    const body = JSON.stringify({ids});
    const data = await fetch(url, {
        next: {
            revalidate: 0
        },
        method: "POST",
        body
    });
    return await data.json();
}