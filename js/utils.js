function highlight(text, search) {

    if (!text) return "";

    const regex = new RegExp(`(${search})`, "gi");

    return text.replace(regex, "<mark>$1</mark>");

}