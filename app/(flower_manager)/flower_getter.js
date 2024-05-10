export const getFlowers = async (limit = 0) => {
    const origin = process.env.ORIGIN;
    let path = (limit > 0) ? `${origin}/api/flower?limit=${limit}` : `${origin}/api/flower`
    const flowers = await fetch(path, {
        next: {
            revalidate: 0
        }
    });
    return await flowers.json();
}
export const getFlower  = async (slug) => {
    const origin = process.env.ORIGIN;
    const url = `${origin}/api/flower/${slug}`;
    const data = await fetch(url, {
        next: {
            revalidate: 0
        }
    });
    return await data.json();
}
export const getFlowersById = async (ids) => {
    let origin = process.env.ORIGIN;
    if(origin === undefined) {
        origin = window.location.origin;
    }
    const url = `${origin}/api/flower`;
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

