export const getFlowers = async (limit = 0) => {
    const origin = process.env.ORIGIN || 'http://localhost:3000';
    let path = (limit > 0) ? `${origin}/api/flower?limit=${limit}` : `${origin}/api/flower`;
    console.log('Fetching URL:', path);

    try {
        const response = await fetch(path, {
            next: {
                revalidate: 0
            }
        });

        const responseText = await response.text();

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}, message: ${responseText}`);
            return [];
        }

        try {
            const data = JSON.parse(responseText);
            return data;
        } catch (jsonError) {
            console.error('JSON parsing failed:', jsonError.message);
            return [];
        }
    } catch (error) {
        console.error('Fetch failed:', error.message);
        return [];
    }
};


export const getFlower = async (slug) => {
    const origin = process.env.ORIGIN;
    const url = `${origin}/api/flower/${slug}`;
    try {
        const response = await fetch(url, {
            next: {
                revalidate: 0
            }
        });

        const responseText = await response.text(); // Lire la réponse comme texte

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}, message: ${responseText}`);
            throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
        }

        try {
            const data = JSON.parse(responseText); // Parser le JSON après vérification
            return data;
        } catch (jsonError) {
            console.error('JSON parsing failed:', jsonError.message);
            throw new Error(`JSON parsing failed: ${jsonError.message}`);
        }
    } catch (error) {
        console.error('Fetch failed:', error.message);
        return null; // Retourne null en cas d'erreur
    }
};

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

