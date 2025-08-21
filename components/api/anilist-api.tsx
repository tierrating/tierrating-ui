import type {RatingItem} from "@/model/types";
import {API_URL} from "@/components/global-config";

export const fetchWithApi = async (token: string, username: string, type: string, logout: () => void): Promise<RatingItem[]> => {
    if (!token) {
        throw new Error("No authentication token")
    }
    const headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        const response = await fetch(`${API_URL}/anilist/${username}/${type}`, {headers});

        if (response.status === 401 || response.status === 403) {
            logout();
            throw new Error("Session expired");
        }

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const text = await response.text();
        if (!text) {
            return [];
        }

        const data = JSON.parse(text);
        const items = Array.isArray(data) ? data : (data.items || []);

        return items.map((item: RatingItem) => ({
            id: item.id.toString(),
            score: item.score,
            title: item.title,
            cover: item.cover,
            tier: item.tier,
        }));
    } catch (error) {
        console.error("API request failed: ", error)
        throw error
    }
}

export const authorize = async(username: string | null, token: string | null, code: string | null)=> {
    if (!username && !token && !code) {
        return new Error("Invalid username, token or code")
    }

    const response = await fetch(`${API_URL}/anilist/auth/${username}`, {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({code})
    })

    if (!response.ok) {
        return new Error('Could not authorize with AniList');
    }

    return await response.json();
}

