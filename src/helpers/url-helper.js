export function artist(permalink) {
    return `/artist/${permalink}`;
}

export function playlist(artistPermalink, playlistPermalink) { 
    return `${artist(artistPermalink)}/sets/${playlistPermalink}`;
}

export function track(artistPermalink, trackPermalink) { 
    return `${artist(artistPermalink)}/tracks/${trackPermalink}`;
}