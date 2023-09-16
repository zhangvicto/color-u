function logCondition(condition, sonaID) {
    fetch("http://127.0.0.1:5000/api/upload/", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'condition_table', condition: condition, sona_id: sonaID })
    })
        .then(response => response.json())
        .catch(error => console.log('error', error));
}