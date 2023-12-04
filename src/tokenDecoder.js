function decodeToken(token) {
    if (!token) {
        console.error("Brak tokena do dekodowania");
        return null;
    }

    const tokenParts = token.split(".");

    if (tokenParts.length !== 3) {
        console.error("Nieprawidłowy format tokenu");
        return null;
    }

    const payloadBase64 = tokenParts[1];
    let decodedPayload;
    try {
        decodedPayload = atob(payloadBase64);
    } catch (error) {
        console.error("Błąd podczas dekodowania zawartości tokenu", error);
        return null;
    }

    let payloadData;
    try {
        payloadData = JSON.parse(decodedPayload);
    } catch (error) {
        console.error("Błąd podczas parsowania danych tokenu", error);
        return null;
    }

    return payloadData;
}

// Export funkcji, aby była dostępna z innego pliku
module.exports = decodeToken;