export function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
        day: 'numeric',
    });
}