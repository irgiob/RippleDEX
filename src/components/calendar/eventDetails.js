// Obtain the event details and return it as a HTML content for popover
export const eventAsHTMLContent = (event) => {
    return `
        <strong>${event.title}</strong>
        <h2>${event.start}</h2>
    `
}